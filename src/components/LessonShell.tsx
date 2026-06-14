"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { curriculum, getAdjacentLessons, getLessonBySlug, isLessonGroup, type Lesson } from "@/lib/curriculum";
import { useProgress } from "@/hooks/useProgress";
import { CompleteLessonButton } from "./CompleteLessonButton";

const SIDEBAR_STORAGE_KEY = "lessons-sidebar-collapsed";

function LessonLink({
  lesson,
  activeSlug,
  completed,
}: {
  lesson: Lesson;
  activeSlug: string;
  completed: boolean;
}) {
  const slug = lesson.href.replace("/lessons/", "");
  const isActive = slug === activeSlug;

  return (
    <Link
      href={lesson.href}
      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
        isActive
          ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
          completed
            ? "bg-green-500 text-white"
            : isActive
              ? "border border-blue-500 text-transparent"
              : "border border-gray-300 text-transparent dark:border-gray-600"
        }`}
      >
        ✓
      </span>
      <span className="truncate">{lesson.title}</span>
    </Link>
  );
}

function SidebarNav({ activeSlug }: { activeSlug: string }) {
  const { isCompleted } = useProgress();

  return (
    <nav className="space-y-5">
      {curriculum.map((section, sectionIndex) => (
        <div key={section.id}>
          <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            {sectionIndex + 1}. {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.lessons.map((item) => {
              if (isLessonGroup(item)) {
                const doneCount = item.lessons.filter((l) => isCompleted(l.id)).length;
                const groupActive = item.lessons.some(
                  (l) => l.href.replace("/lessons/", "") === activeSlug,
                );

                return (
                  <li key={item.id}>
                    <details open={groupActive} className="group">
                      <summary className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100">
                        <span
                          aria-hidden
                          className="text-xs text-gray-400 transition-transform group-open:rotate-90 dark:text-gray-500"
                        >
                          ▶
                        </span>
                        <span className="truncate font-semibold">{item.title}</span>
                        <span className="ml-auto shrink-0 text-[10px] font-medium text-gray-400 dark:text-gray-500">
                          {doneCount}/{item.lessons.length}
                        </span>
                      </summary>
                      <ul className="mt-0.5 ml-2 space-y-0.5 border-l border-gray-200 pl-2 dark:border-gray-800">
                        {item.lessons.map((lesson) => (
                          <li key={lesson.id}>
                            <LessonLink lesson={lesson} activeSlug={activeSlug} completed={isCompleted(lesson.id)} />
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <LessonLink lesson={item} activeSlug={activeSlug} completed={isCompleted(item.id)} />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function LessonShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slug = pathname.replace(/^\/lessons\//, "").replace(/\/$/, "");
  const lesson = getLessonBySlug(slug);
  const { previous, next } = getAdjacentLessons(slug);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem(SIDEBAR_STORAGE_KEY) === "true");
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      return next;
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-6 md:py-8">
      {collapsed ? (
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label="Άνοιγμα περιεχομένων"
          title="Άνοιγμα περιεχομένων"
          className="sticky top-[65px] hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 lg:flex dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        >
          <span aria-hidden className="text-lg leading-none">»</span>
        </button>
      ) : (
        <aside className="sticky top-[65px] hidden max-h-[calc(100vh-81px)] w-72 shrink-0 overflow-y-auto pb-8 pr-2 lg:block">
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Περιεχόμενα
            </p>
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Κλείσιμο περιεχομένων"
              title="Κλείσιμο περιεχομένων"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              <span aria-hidden className="text-lg leading-none">«</span>
            </button>
          </div>
          <SidebarNav activeSlug={slug} />
        </aside>
      )}

      <div className="min-w-0 flex-1">
        <details className="mb-4 rounded-lg border border-gray-200 bg-white lg:hidden dark:border-gray-800 dark:bg-gray-900">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Περιεχόμενα μαθημάτων
          </summary>
          <div className="max-h-80 overflow-y-auto border-t border-gray-200 p-3 dark:border-gray-800">
            <SidebarNav activeSlug={slug} />
          </div>
        </details>

        {lesson && (
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {lesson.sectionTitle}
          </p>
        )}

        <article className="min-w-0">{children}</article>

        <div className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-800">
          {lesson && (
            <div className="mb-6 flex justify-center">
              <CompleteLessonButton lessonId={lesson.id} />
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between">
            {previous ? (
              <Link
                href={previous.href}
                className="group flex-1 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-blue-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
              >
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">← Προηγούμενο</span>
                <span className="mt-1 block font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span className="hidden flex-1 sm:block" />
            )}

            {next ? (
              <Link
                href={next.href}
                className="group flex-1 rounded-xl border border-gray-200 bg-white p-4 text-right transition-colors hover:border-blue-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
              >
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Επόμενο →</span>
                <span className="mt-1 block font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                  {next.title}
                </span>
              </Link>
            ) : (
              <Link
                href="/"
                className="group flex-1 rounded-xl border border-gray-200 bg-white p-4 text-right transition-colors hover:border-blue-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
              >
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Τέλος διαδρομής 🎉</span>
                <span className="mt-1 block font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                  Πίσω στο Roadmap
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
