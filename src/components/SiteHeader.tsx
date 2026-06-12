"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allLessons } from "@/lib/curriculum";
import { useProgress } from "@/hooks/useProgress";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { isCompleted, isLoaded } = useProgress();

  const completedCount = isLoaded ? allLessons.filter((lesson) => isCompleted(lesson.id)).length : 0;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-mono text-sm font-bold text-white">
            {"</>"}
          </span>
          <span className="hidden text-lg font-bold text-gray-900 sm:block dark:text-white">
            Fullstack Roadmap
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex" title={`${completedCount}/${allLessons.length} μαθήματα`}>
            <div className="h-2 w-28 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{progressPercent}%</span>
          </div>

          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m20 20-3.5-3.5" />
            </svg>
            <span className="hidden lg:block">Αναζήτηση</span>
            <kbd className="hidden rounded border border-gray-200 px-1.5 text-xs lg:block dark:border-gray-700">Ctrl K</kbd>
          </button>

          <ThemeToggle />
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
