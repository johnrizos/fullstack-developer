"use client";

import { useState } from "react";

interface ExerciseProps {
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export function Exercise({ question, options, correctOptionIndex, explanation }: ExerciseProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
    }
  };

  const isCorrect = selectedOption === correctOptionIndex;

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          Quiz
        </span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Άσκηση κατανόησης</h3>
      </div>
      <p className="mb-6 font-medium text-gray-800 dark:text-gray-200">{question}</p>

      <div className="mb-6 flex flex-col gap-3">
        {options.map((option, index) => {
          let buttonClass = "p-4 text-left rounded-lg border transition-all text-gray-800 dark:text-gray-200 ";

          if (!isSubmitted) {
            buttonClass +=
              selectedOption === index
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50"
                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-blue-700 dark:hover:bg-gray-800";
          } else if (index === correctOptionIndex) {
            buttonClass += "border-green-500 bg-green-50 font-medium text-green-900 dark:bg-green-950/50 dark:text-green-300";
          } else if (index === selectedOption) {
            buttonClass += "border-red-500 bg-red-50 text-red-900 line-through dark:bg-red-950/50 dark:text-red-300";
          } else {
            buttonClass += "border-gray-200 opacity-50 dark:border-gray-700";
          }

          return (
            <button
              key={option}
              disabled={isSubmitted}
              className={buttonClass}
              onClick={() => setSelectedOption(index)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${
                    selectedOption === index ? "border-blue-500 bg-blue-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {selectedOption === index && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                {option}
              </div>
            </button>
          );
        })}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null}
          className={`rounded-lg px-6 py-2.5 font-medium transition-colors ${
            selectedOption !== null
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
          }`}
        >
          Έλεγχος
        </button>
      ) : (
        <div
          className={`mt-4 rounded-lg p-4 ${
            isCorrect
              ? "border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/40"
              : "border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/40"
          }`}
        >
          <p className={`font-bold ${isCorrect ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}>
            {isCorrect ? "Σωστή απάντηση." : "Λάθος απάντηση."}
          </p>
          {explanation && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{explanation}</p>}
          {!isCorrect && (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedOption(null);
              }}
              className="mt-3 text-sm font-medium text-red-700 underline dark:text-red-400"
            >
              Προσπάθησε ξανά
            </button>
          )}
        </div>
      )}
    </div>
  );
}
