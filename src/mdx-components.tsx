import type { MDXComponents } from 'mdx/types';
import { Exercise } from './components/Exercise';
import { CompleteLessonButton } from './components/CompleteLessonButton';
import { LiveEditor } from './components/LiveEditor';
import { CodeChallenge } from './components/CodeChallenge';
import { TrainingLab } from './components/TrainingLab';
import { PredictOutput } from './components/PredictOutput';
import { Flashcards } from './components/Flashcards';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-2 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl dark:text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-800 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-bold text-gray-900 dark:text-white">{children}</h3>,
    p: ({ children }) => <p className="mb-5 text-base leading-7 text-gray-700 md:text-lg md:leading-8 dark:text-gray-300">{children}</p>,
    ul: ({ children }) => (
      <ul className="mb-6 ml-5 list-disc space-y-2 text-base leading-7 text-gray-700 md:text-lg dark:text-gray-300">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 ml-5 list-decimal space-y-2 text-base leading-7 text-gray-700 md:text-lg dark:text-gray-300">{children}</ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
    a: ({ children, href }) => (
      <a href={href} className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400">
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-6 rounded-r-lg border-l-4 border-blue-500 bg-blue-50 px-5 py-3 text-gray-700 dark:bg-blue-950/40 dark:text-gray-300 [&>p]:mb-0">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="mb-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="w-full text-left text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-gray-200 bg-gray-50 px-4 py-2.5 font-semibold text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-gray-100 px-4 py-2.5 text-gray-700 dark:border-gray-800/60 dark:text-gray-300">{children}</td>
    ),
    code: (props) => {
      // Block code is handled by rehype-pretty-code (has data attributes); only style inline code.
      if ("data-language" in props || "data-theme" in props) {
        return <code {...props} />;
      }
      return (
        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-pink-600 dark:bg-gray-800 dark:text-pink-400">
          {props.children}
        </code>
      );
    },
    Exercise,
    CompleteLessonButton,
    LiveEditor,
    CodeChallenge,
    TrainingLab,
    PredictOutput,
    Flashcards,
    ...components,
  }
}
