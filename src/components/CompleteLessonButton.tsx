"use client";

import { useRouter } from "next/navigation";
import { useProgress } from "../hooks/useProgress";

export function CompleteLessonButton({ lessonId }: { lessonId: string }) {
  const { markCompleted, isCompleted, isLoaded } = useProgress();
  const router = useRouter();

  if (!isLoaded) return null;

  const completed = isCompleted(lessonId);

  const handleComplete = () => {
    markCompleted(lessonId);
    router.push("/");
  };

  if (completed) {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="text-green-600 font-medium flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          Ολοκληρωμένο
        </span>
        <button
          onClick={() => router.push("/")}
          className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Επιστροφή στο Roadmap
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleComplete}
      className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm hover:shadow"
    >
      Ολοκλήρωση μαθήματος
    </button>
  );
}
