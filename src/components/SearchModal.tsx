"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { allLessons } from "@/lib/curriculum";
import { useProgress } from "@/hooks/useProgress";

function matchesQuery(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query.toLowerCase());
}

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Το panel γίνεται mount μόνο όσο είναι ανοιχτό, οπότε query/activeIndex
  // μηδενίζονται φυσικά σε κάθε άνοιγμα.
  if (!open) return null;
  return <SearchPanel onClose={onClose} />;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { isCompleted } = useProgress();

  const results = useMemo(() => {
    if (!query.trim()) return allLessons;
    return allLessons.filter(
      (lesson) =>
        matchesQuery(lesson.title, query) ||
        matchesQuery(lesson.description, query) ||
        matchesQuery(lesson.sectionTitle, query) ||
        lesson.skills.some((skill) => matchesQuery(skill, query)),
    );
  }, [query]);

  const highlightedIndex = Math.min(activeIndex, Math.max(results.length - 1, 0));

  const goTo = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") onClose();
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(Math.min(highlightedIndex + 1, results.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(Math.max(highlightedIndex - 1, 0));
    }
    if (event.key === "Enter" && results[highlightedIndex]) {
      goTo(results[highlightedIndex].href);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-gray-200 px-4 dark:border-gray-700">
          <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m20 20-3.5-3.5" />
          </svg>
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder="Ψάξε μάθημα, έννοια ή skill…"
            className="w-full bg-transparent py-3.5 text-gray-900 outline-none placeholder:text-gray-400 dark:text-gray-100"
          />
          <kbd className="hidden shrink-0 rounded border border-gray-200 px-1.5 py-0.5 text-xs text-gray-400 sm:block dark:border-gray-700">
            Esc
          </kbd>
        </div>

        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Δεν βρέθηκε μάθημα για «{query}».
            </li>
          )}
          {results.map((lesson, index) => (
            <li key={lesson.id + lesson.sectionId}>
              <button
                onClick={() => goTo(lesson.href)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left ${
                  index === highlightedIndex ? "bg-blue-50 dark:bg-blue-950/50" : ""
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isCompleted(lesson.id)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {isCompleted(lesson.id) ? "✓" : "•"}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{lesson.title}</span>
                  <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                    {lesson.sectionTitle} · {lesson.description}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
