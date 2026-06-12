"use client";

import { useProgress } from "../hooks/useProgress";

export function CompleteLessonButton({ lessonId }: { lessonId: string }) {
  const { markCompleted, isCompleted, isLoaded } = useProgress();

  if (!isLoaded) return null;

  if (isCompleted(lessonId)) {
    return (
      <span className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-6 py-2.5 font-medium text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        Ολοκληρωμένο μάθημα
      </span>
    );
  }

  return (
    <button
      onClick={() => markCompleted(lessonId)}
      className="rounded-lg bg-green-600 px-6 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-green-700 hover:shadow"
    >
      Ολοκλήρωση μαθήματος ✓
    </button>
  );
}
