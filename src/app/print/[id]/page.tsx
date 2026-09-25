import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDuration, getLessonsEstimatedMinutes, getPrintableUnit, printableUnits } from "@/lib/curriculum";
import { PrintBar } from "@/components/PrintBar";
import { StaticModeProvider } from "@/components/StaticMode";

// Ολόκληρη ενότητα (π.χ. JavaScript) ή group (π.χ. React) σε μία σελίδα για εκτύπωση:
// εξώφυλλο με περιεχόμενα και κάθε μάθημα σε νέα σελίδα.

export function generateStaticParams() {
  return printableUnits.map((unit) => ({ id: unit.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const unit = getPrintableUnit(id);
  return { title: unit ? `${unit.title} — Εκτύπωση | Fullstack Roadmap` : "Fullstack Roadmap" };
}

export default async function PrintUnitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = getPrintableUnit(id);
  if (!unit) notFound();

  const chapters = await Promise.all(
    unit.lessons.map(async (lesson) => {
      const slug = lesson.href.replace("/lessons/", "");
      const { default: Content } = await import(`@/app/lessons/${slug}/page.mdx`);
      return { lesson, Content };
    }),
  );

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 md:py-8 print:max-w-none print:p-0">
      <Link
        href="/"
        className="mb-4 inline-block text-sm font-medium text-gray-500 hover:text-gray-900 print:hidden dark:text-gray-400 dark:hover:text-gray-100"
      >
        ← Πίσω στο Roadmap
      </Link>

      <PrintBar />

      <article className="min-w-0">
        <header className="print-cover mb-10 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900 print:border-0 print:p-0">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {unit.sectionTitle ?? "Fullstack Roadmap"}
          </p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">{unit.title}</h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">{unit.description}</p>
          <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            {chapters.length} μαθήματα · {formatDuration(getLessonsEstimatedMinutes(unit.lessons))}
          </p>

          <h2 className="mt-8 mb-3 border-b border-gray-200 pb-2 text-xl font-bold text-gray-900 dark:border-gray-800 dark:text-white">
            Περιεχόμενα
          </h2>
          <ol className="space-y-1.5">
            {chapters.map(({ lesson }, index) => (
              <li key={lesson.id} className="flex items-baseline gap-3 text-gray-700 dark:text-gray-300">
                <span className="w-6 shrink-0 text-right font-semibold text-gray-400">{index + 1}.</span>
                <a href={`#${lesson.id}`} className="min-w-0 flex-1 hover:text-blue-600 dark:hover:text-blue-400">
                  {lesson.title}
                  {!unit.sectionTitle && lesson.groupTitle && (
                    <span className="text-sm text-gray-400"> · {lesson.groupTitle}</span>
                  )}
                </a>
                <span className="shrink-0 text-xs text-gray-400">{formatDuration(lesson.estimatedMinutes)}</span>
              </li>
            ))}
          </ol>
        </header>

        <StaticModeProvider>
          {chapters.map(({ lesson, Content }, index) => (
            <section key={lesson.id} id={lesson.id} className="print-chapter mt-16 border-t-4 border-blue-500 pt-6 print:mt-0 print:border-0 print:pt-0">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Κεφάλαιο {index + 1}
                {lesson.groupTitle && <> · {lesson.groupTitle}</>} · {formatDuration(lesson.estimatedMinutes)}
              </p>
              <Content />
            </section>
          ))}
        </StaticModeProvider>
      </article>
    </div>
  );
}
