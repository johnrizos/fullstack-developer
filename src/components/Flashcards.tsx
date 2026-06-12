"use client";

import { useState } from "react";

type Card = {
  question: string;
  answer: string;
};

export function Flashcards({ title = "Interview flashcards", cards }: { title?: string; cards: Card[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());

  const card = cards[index];
  if (!card) return null;

  const go = (next: number) => {
    setIndex((next + cards.length) % cards.length);
    setFlipped(false);
  };

  const markKnown = () => {
    setKnown((prev) => new Set(prev).add(index));
    go(index + 1);
  };

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            Flashcards
          </span>
          <h4 className="font-bold text-gray-900 dark:text-gray-100">{title}</h4>
        </div>
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          {index + 1}/{cards.length} · ✓ {known.size}
        </span>
      </div>

      <button
        onClick={() => setFlipped((value) => !value)}
        className="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-600"
      >
        <span className="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {flipped ? "Απάντηση" : "Ερώτηση συνέντευξης — πάτησε για απάντηση"}
        </span>
        <span className={`text-lg leading-7 ${flipped ? "text-gray-700 dark:text-gray-300" : "font-semibold text-gray-900 dark:text-gray-100"}`}>
          {flipped ? card.answer : card.question}
        </span>
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => go(index - 1)}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          ← Προηγούμενη
        </button>
        <button
          onClick={markKnown}
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Το ξέρω ✓
        </button>
        <button
          onClick={() => go(index + 1)}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Επόμενη →
        </button>
      </div>
    </div>
  );
}
