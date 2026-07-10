"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { allLessons } from "@/lib/curriculum";
import {
  type ProgressMap,
  completedIdsToMap,
  mapToCompletedIds,
  mergeProgressMaps,
  parseProgressMap,
  MIGRATION_AT,
} from "@/lib/progressMap";

// Source of truth: per-lesson state με timestamps ({ id: { done, at } }).
const MAP_KEY = "lessonProgressMap";
// Παράγωγη λίστα ολοκληρωμένων ids — κρατιέται για backward-compat και ως το
// reactive store (useSyncExternalStore) που τροφοδοτεί το UI. Γράφεται ΠΑΝΤΑ μαζί
// με το MAP_KEY ώστε τα δύο να μένουν συνεπή.
const STORAGE_KEY = "completedLessons";
const CHANGE_EVENT = "completed-lessons-change";

function readStoredProgress() {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function subscribeToProgress(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === MAP_KEY) {
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

/** Διαβάζει τον authoritative map. Αν λείπει (παλιός χρήστης), τον χτίζει από το
 *  legacy `completedLessons` array (done στο MIGRATION_AT). */
function readMap(): ProgressMap {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(MAP_KEY);
  if (raw) return parseProgressMap(raw);
  return completedIdsToMap(parseProgress(readStoredProgress()), MIGRATION_AT);
}

/** Γράφει τον map + την παράγωγη λίστα ids και ειδοποιεί τους subscribers. */
function writeMap(map: ProgressMap) {
  if (typeof window === "undefined") return;
  const ids = mapToCompletedIds(map);
  window.localStorage.setItem(MAP_KEY, JSON.stringify(map));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Ορίζει την κατάσταση ενός μαθήματος με ΝΕΟ timestamp (η ενέργεια του χρήστη
 *  είναι πάντα "τελευταία" έναντι παλαιότερων remote τιμών). */
function setLessonState(lessonId: string, done: boolean) {
  const map = readMap();
  map[lessonId] = { done, at: Date.now() };
  writeMap(map);
}

export function useProgress() {
  // Local source of truth, kept reactive across tabs via storage + custom event.
  const stored = useSyncExternalStore(subscribeToProgress, readStoredProgress, () => "[]");

  // Render server-consistent values μέχρι να γίνει mount (αποφυγή hydration mismatch).
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const completedLessons = useMemo(() => (isLoaded ? parseProgress(stored) : []), [isLoaded, stored]);

  const markCompleted = useCallback((lessonId: string) => {
    if (typeof window === "undefined") return;
    if (readMap()[lessonId]?.done) return;
    setLessonState(lessonId, true);
  }, []);

  const markIncomplete = useCallback((lessonId: string) => {
    if (typeof window === "undefined") return;
    const state = readMap()[lessonId];
    if (state && !state.done) return;
    setLessonState(lessonId, false); // tombstone — ώστε η αφαίρεση να συγχρονίζεται
  }, []);

  const toggleCompleted = useCallback((lessonId: string) => {
    if (typeof window === "undefined") return;
    setLessonState(lessonId, !readMap()[lessonId]?.done);
  }, []);

  /** Επιστρέφει αντίγραφο του authoritative per-lesson map (για το sheet sync). */
  const getProgressMap = useCallback((): ProgressMap => ({ ...readMap() }), []);

  /** Συγχωνεύει (per-lesson LWW) έναν remote map με το τοπικό και επιστρέφει το
   *  αποτέλεσμα. Χρησιμοποιείται από το cross-device sync ώστε να μη χάνεται
   *  καμία αλλαγή (ούτε προσθήκη ούτε αφαίρεση) από καμία πλευρά. */
  const mergeProgressMap = useCallback((remote: ProgressMap): ProgressMap => {
    if (typeof window === "undefined") return {};
    const merged = mergeProgressMaps(readMap(), remote);
    writeMap(merged);
    return merged;
  }, []);

  const resetProgress = useCallback(() => {
    if (typeof window === "undefined") return;
    // Tombstone ΟΛΑ τα γνωστά μαθήματα (done:false@now) ώστε το reset να προπαγανδιστεί
    // στις άλλες συσκευές αντί να "επιστρέψει" από το remote.
    const map = readMap();
    const now = Date.now();
    for (const id of Object.keys(map)) map[id] = { done: false, at: now };
    writeMap(map);
  }, []);

  const isCompleted = useCallback((lessonId: string) => completedLessons.includes(lessonId), [completedLessons]);

  const studiedMinutes = allLessons.reduce(
    (total, lesson) => (completedLessons.includes(lesson.id) ? total + lesson.estimatedMinutes : total),
    0,
  );

  return {
    completedLessons,
    markCompleted,
    markIncomplete,
    toggleCompleted,
    getProgressMap,
    mergeProgressMap,
    resetProgress,
    isCompleted,
    studiedMinutes,
    isLoaded,
  };
}
