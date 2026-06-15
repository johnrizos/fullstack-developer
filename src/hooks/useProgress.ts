"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { allLessons } from "@/lib/curriculum";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/lib/supabase/client";

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
  const { user, authReady } = useAuth();

  // Local (signed-out) source of truth, kept reactive across tabs.
  const localStored = useSyncExternalStore(subscribeToProgress, readStoredProgress, () => "[]");
  const localLessons = useMemo(() => parseProgress(localStored), [localStored]);

  // Remote (signed-in) source of truth, tagged with the user it belongs to so a
  // stale value from a previous account is never shown. `null` = nothing loaded.
  const [remote, setRemote] = useState<{ userId: string; lessons: string[] } | null>(null);

  const usingRemote = Boolean(user && supabase);
  const remoteReady = usingRemote && remote?.userId === user!.id;

  // On login: push any local progress up (so nothing is lost), then load from Supabase.
  useEffect(() => {
    if (!user || !supabase) return;

    let cancelled = false;
    (async () => {
      const localIds = parseProgress(readStoredProgress());
      if (localIds.length > 0) {
        await supabase
          .from("progress")
          .upsert(
            localIds.map((lesson_id) => ({ user_id: user.id, lesson_id })),
            { onConflict: "user_id,lesson_id" },
          );
      }

      const { data, error } = await supabase.from("progress").select("lesson_id");
      if (cancelled) return;

      setRemote({ userId: user.id, lessons: !error && data ? data.map((row) => row.lesson_id as string) : [] });
      // Progress now lives in Supabase — drop the local copy so it can't re-merge stale ids.
      if (!error && localIds.length > 0) window.localStorage.removeItem(STORAGE_KEY);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const completedLessons = useMemo(
    () => (remoteReady ? remote!.lessons : usingRemote ? [] : localLessons),
    [remoteReady, remote, usingRemote, localLessons],
  );
  const isLoaded = authReady && (usingRemote ? remoteReady : true);

  const markCompleted = useCallback(
    (lessonId: string) => {
      if (typeof window === "undefined") return;

      if (usingRemote && supabase && user) {
        setRemote((prev) => {
          if (!prev || prev.userId !== user.id || prev.lessons.includes(lessonId)) return prev;
          return { ...prev, lessons: [...prev.lessons, lessonId] };
        });
        void supabase
          .from("progress")
          .upsert({ user_id: user.id, lesson_id: lessonId }, { onConflict: "user_id,lesson_id" });
        return;
      }

      const current = parseProgress(readStoredProgress());
      if (current.includes(lessonId)) return;
      writeStoredProgress([...current, lessonId]);
    },
    [usingRemote, user],
  );

  const resetProgress = useCallback(() => {
    if (typeof window === "undefined") return;

    if (usingRemote && supabase && user) {
      setRemote((prev) => (prev && prev.userId === user.id ? { ...prev, lessons: [] } : prev));
      void supabase.from("progress").delete().eq("user_id", user.id);
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, [usingRemote, user]);

  const isCompleted = useCallback((lessonId: string) => completedLessons.includes(lessonId), [completedLessons]);

  const studiedMinutes = allLessons.reduce(
    (total, lesson) => (completedLessons.includes(lesson.id) ? total + lesson.estimatedMinutes : total),
    0,
  );

  return { completedLessons, markCompleted, resetProgress, isCompleted, studiedMinutes, isLoaded };
}
