import type { MDXComponents } from 'mdx/types';
import { Exercise } from './components/Exercise';
import { CompleteLessonButton } from './components/CompleteLessonButton';
import { LiveEditor } from './components/LiveEditor';
import { CodeChallenge } from './components/CodeChallenge';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-extrabold mt-8 mb-4 text-gray-900">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900">{children}</h3>,
    p: ({ children }) => <p className="text-lg leading-relaxed text-gray-700 mb-6">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-6 ml-4 text-lg text-gray-700">{children}</ul>,
    li: ({ children }) => <li>{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    code: ({ children }) => <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
    Exercise,
    CompleteLessonButton,
    LiveEditor,
    CodeChallenge,
    ...components,
  }
}
