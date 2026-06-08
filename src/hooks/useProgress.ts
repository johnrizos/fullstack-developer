"use client";

import { useMemo, useSyncExternalStore } from "react";

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

export function useProgress() {
  const storedProgress = useSyncExternalStore(subscribeToProgress, readStoredProgress, () => "[]");
  const completedLessons = useMemo(() => parseProgress(storedProgress), [storedProgress]);

  const markCompleted = (lessonId: string) => {
    if (completedLessons.includes(lessonId) || typeof window === "undefined") return;

    const updated = [...completedLessons, lessonId];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const isCompleted = (lessonId: string) => completedLessons.includes(lessonId);

  return { completedLessons, markCompleted, isCompleted, isLoaded: true };
}
