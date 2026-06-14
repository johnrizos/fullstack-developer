"use client";

import Link from "next/link";
import { allLessons, curriculum, flattenItems, isLessonGroup, type Lesson } from "@/lib/curriculum";
import { useProgress } from "@/hooks/useProgress";

function LessonCard({ lesson, label, completed }: { lesson: Lesson; label: number; completed: boolean }) {
  return (
    <Link
      href={lesson.href}
      className={`group block p-5 transition-colors hover:bg-blue-50/50 dark:hover:bg-blue-950/20 ${
        completed ? "bg-green-50/50 dark:bg-green-950/10" : ""
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                completed ? "bg-green-500 text-white" : "bg-blue-600 text-white"
              }`}
            >
              {completed ? "✓" : label}
            </span>
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 dark:text-gray-100 dark:group-hover:text-blue-400">
              {lesson.title}
            </h4>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{lesson.description}</p>
          <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Mini project: {lesson.project}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {lesson.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <span
          className={`hidden shrink-0 items-center justify-center rounded-lg px-5 py-2.5 font-medium md:inline-flex ${
            completed
              ? "border border-green-200 bg-white text-green-700 dark:border-green-900 dark:bg-gray-900 dark:text-green-400"
              : "bg-blue-600 text-white group-hover:bg-blue-700"
          }`}
        >
          {completed ? "Επανάληψη" : "Άνοιγμα"}
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const { isCompleted, isLoaded } = useProgress();

  const completedCount = isLoaded ? allLessons.filter((lesson) => isCompleted(lesson.id)).length : 0;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);
  const nextLesson = allLessons.find((lesson) => !isCompleted(lesson.id));

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 md:py-12">
      <section className="text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">Learn by building</p>
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-5xl dark:text-white">
          Ο δρόμος σου για <span className="text-blue-600 dark:text-blue-400">Fullstack Developer</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Από HTML και JavaScript μέχρι React, backend, βάσεις, auth, system design και deploy —
          με βάθος που σε προετοιμάζει για πραγματικές συνεντεύξεις.
        </p>

        {isLoaded && nextLesson && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href={nextLesson.href}
              className="rounded-xl bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
            >
              {completedCount === 0 ? "Ξεκίνα το ταξίδι →" : "Συνέχισε: " + nextLesson.title + " →"}
            </Link>
            {completedCount > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {completedCount}/{allLessons.length} μαθήματα ολοκληρωμένα · {progressPercent}%
              </p>
            )}
          </div>
        )}
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-bold text-gray-900 dark:text-gray-100">Συνολική πρόοδος</h3>
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {completedCount}/{allLessons.length} · {progressPercent}%
          </span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-4 grid gap-3 text-center sm:grid-cols-4">
          {["Θεωρία με βάθος", "Live κώδικας", "Predict drills", "Mini projects"].map((item) => (
            <div
              key={item}
              className="rounded-lg bg-gray-50 p-3 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        {curriculum.map((section, sectionIndex) => {
          const sectionLessons = flattenItems(section.lessons);
          const completedInSection = sectionLessons.filter((lesson) => isLoaded && isCompleted(lesson.id)).length;
          const sectionPercent = Math.round((completedInSection / sectionLessons.length) * 100);

          return (
            <article
              key={section.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="border-b border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/60">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                      Ενότητα {sectionIndex + 1}
                    </p>
                    <h3 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">{section.title}</h3>
                    <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">{section.description}</p>
                  </div>
                  <div className="shrink-0 md:text-right">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {completedInSection}/{sectionLessons.length} ολοκληρωμένα
                    </span>
                    <div className="mt-2 h-2 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${sectionPercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {(() => {
                  let counter = 0;
                  return section.lessons.map((item) => {
                    if (isLessonGroup(item)) {
                      const groupDone = item.lessons.filter((l) => isLoaded && isCompleted(l.id)).length;
                      return (
                        <div key={item.id} className="bg-gray-50/40 dark:bg-gray-900/30">
                          <div className="border-l-4 border-blue-500 px-5 pt-4 pb-2">
                            <div className="flex items-center justify-between gap-3">
                              <h4 className="text-sm font-extrabold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                                {item.title}
                              </h4>
                              <span className="shrink-0 text-xs font-semibold text-gray-500 dark:text-gray-400">
                                {groupDone}/{item.lessons.length}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                          </div>
                          <div className="divide-y divide-gray-100 border-l-4 border-blue-500/40 dark:divide-gray-800">
                            {item.lessons.map((lesson) => {
                              counter += 1;
                              return (
                                <LessonCard
                                  key={lesson.id}
                                  lesson={lesson}
                                  label={counter}
                                  completed={Boolean(isLoaded && isCompleted(lesson.id))}
                                />
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    counter += 1;
                    return (
                      <LessonCard
                        key={item.id}
                        lesson={item}
                        label={counter}
                        completed={Boolean(isLoaded && isCompleted(item.id))}
                      />
                    );
                  });
                })()}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
