"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { allLessons } from "@/lib/curriculum";

const STORAGE_KEY = "completedLessons";
const CHANGE_EVENT = "completed-lessons-change";

function readStoredProgress() {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function subscribeToProgress(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

function parseProgress(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeStoredProgress(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useProgress() {
  // Local source of truth, kept reactive across tabs via storage + custom event.
  const stored = useSyncExternalStore(subscribeToProgress, readStoredProgress, () => "[]");

  // Render server-consistent values μέχρι να γίνει mount. Το `typeof window` θα ήταν
  // true ήδη στο πρώτο client render (πριν τα effects) και θα προκαλούσε hydration
  // mismatch με το server HTML. Το mounted state γίνεται true ΜΕΤΑ το mount.
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const completedLessons = useMemo(() => (isLoaded ? parseProgress(stored) : []), [isLoaded, stored]);

  const markCompleted = useCallback((lessonId: string) => {
    if (typeof window === "undefined") return;
    const current = parseProgress(readStoredProgress());
    if (current.includes(lessonId)) return;
    writeStoredProgress([...current, lessonId]);
  }, []);

  const markIncomplete = useCallback((lessonId: string) => {
    if (typeof window === "undefined") return;
    const current = parseProgress(readStoredProgress());
    if (!current.includes(lessonId)) return;
    writeStoredProgress(current.filter((id) => id !== lessonId));
  }, []);

  const toggleCompleted = useCallback((lessonId: string) => {
    if (typeof window === "undefined") return;
    const current = parseProgress(readStoredProgress());
    writeStoredProgress(
      current.includes(lessonId) ? current.filter((id) => id !== lessonId) : [...current, lessonId],
    );
  }, []);

  /** Συγχωνεύει (union) μια λίστα ολοκληρωμένων μαθημάτων με το τοπικό state.
   *  Χρησιμοποιείται από το cross-browser sync ώστε να μη χάνεται πρόοδος από
   *  καμία πλευρά. Επιστρέφει true αν προστέθηκε κάτι νέο. */
  const mergeCompleted = useCallback((lessonIds: string[]) => {
    if (typeof window === "undefined") return false;
    const current = parseProgress(readStoredProgress());
    const incoming = lessonIds.filter((id) => typeof id === "string" && id.trim());
    const merged = Array.from(new Set([...current, ...incoming]));
    if (merged.length === current.length) return false;
    writeStoredProgress(merged);
    return true;
  }, []);

  const resetProgress = useCallback(() => {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const isCompleted = useCallback((lessonId: string) => completedLessons.includes(lessonId), [completedLessons]);

  const studiedMinutes = allLessons.reduce(
    (total, lesson) => (completedLessons.includes(lesson.id) ? total + lesson.estimatedMinutes : total),
    0,
  );

  return { completedLessons, markCompleted, markIncomplete, toggleCompleted, mergeCompleted, resetProgress, isCompleted, studiedMinutes, isLoaded };
}
