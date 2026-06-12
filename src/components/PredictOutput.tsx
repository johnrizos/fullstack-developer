"use client";

import { useState } from "react";

interface PredictOutputProps {
  title?: string;
  code: string;
  options?: string[];
  correctOptionIndex?: number;
  answer: string;
  explanation: string;
}

export function PredictOutput({
  title = "Τι θα τυπώσει;",
  code,
  options,
  correctOptionIndex,
  answer,
  explanation,
}: PredictOutputProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const hasOptions = Array.isArray(options) && options.length > 0;
  const isCorrect = hasOptions && selected === correctOptionIndex;

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-900/50">
        <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          Predict the output
        </span>
        <h4 className="font-bold text-gray-900 dark:text-gray-100">{title}</h4>
      </div>

      <pre className="overflow-x-auto bg-gray-950 p-5 font-mono text-sm leading-7 text-gray-100">
        <code>{code}</code>
      </pre>

      <div className="p-5">
        {hasOptions && (
          <div className="mb-4 flex flex-col gap-2">
            {options.map((option, index) => {
              let cls = "rounded-lg border px-4 py-2.5 text-left font-mono text-sm transition-colors ";
              if (!revealed) {
                cls +=
                  selected === index
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
                    : "border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700";
              } else if (index === correctOptionIndex) {
                cls += "border-green-500 bg-green-50 dark:bg-green-950/50";
              } else if (index === selected) {
                cls += "border-red-500 bg-red-50 dark:bg-red-950/50";
              } else {
                cls += "border-gray-200 opacity-50 dark:border-gray-700";
              }
              return (
                <button
                  key={option}
                  disabled={revealed}
                  onClick={() => setSelected(index)}
                  className={cls + " text-gray-900 dark:text-gray-100"}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            disabled={hasOptions && selected === null}
            className={`rounded-lg px-5 py-2.5 font-medium transition-colors ${
              hasOptions && selected === null
                ? "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {hasOptions ? "Έλεγχος" : "Δείξε την απάντηση"}
          </button>
        ) : (
          <div
            className={`rounded-lg border p-4 ${
              !hasOptions || isCorrect
                ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/40"
                : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40"
            }`}
          >
            {hasOptions && (
              <p className={`mb-2 font-bold ${isCorrect ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}>
                {isCorrect ? "Σωστά." : "Όχι ακριβώς."}
              </p>
            )}
            <p className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100">Output: {answer}</p>
            <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
