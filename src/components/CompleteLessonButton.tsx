"use client";

import { useProgress } from "../hooks/useProgress";

export function CompleteLessonButton({ lessonId }: { lessonId: string }) {
  const { toggleCompleted, isCompleted, isLoaded } = useProgress();

  if (!isLoaded) return null;

  if (isCompleted(lessonId)) {
    return (
      <button
        onClick={() => toggleCompleted(lessonId)}
        title="Πάτα ξανά για να το βγάλεις από τα ολοκληρωμένα"
        className="group flex items-center gap-2 rounded-lg border border-green-300 bg-green-100 px-6 py-2.5 font-medium text-green-800 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300 dark:hover:border-amber-800 dark:hover:bg-amber-950/40 dark:hover:text-amber-300"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span className="group-hover:hidden">Ολοκληρωμένο μάθημα</span>
        <span className="hidden group-hover:inline">Αναίρεση ολοκλήρωσης</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => toggleCompleted(lessonId)}
      className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-700 hover:shadow"
    >
      Ολοκλήρωση μαθήματος
    </button>
  );
}
