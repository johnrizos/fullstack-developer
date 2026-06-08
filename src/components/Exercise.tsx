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
    <div className="bg-white border border-gray-200 rounded-xl p-6 my-8 shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Άσκηση κατανόησης</h3>
      <p className="text-gray-800 mb-6 font-medium">{question}</p>

      <div className="flex flex-col gap-3 mb-6">
        {options.map((option, index) => {
          let buttonClass = "p-4 text-left rounded-lg border transition-all ";

          if (!isSubmitted) {
            buttonClass +=
              selectedOption === index
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50";
          } else if (index === correctOptionIndex) {
            buttonClass += "border-green-500 bg-green-50 text-green-900 font-medium";
          } else if (index === selectedOption) {
            buttonClass += "border-red-500 bg-red-50 text-red-900 line-through";
          } else {
            buttonClass += "border-gray-200 opacity-50";
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
                  className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    selectedOption === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                  }`}
                >
                  {selectedOption === index && <div className="w-2 h-2 rounded-full bg-white" />}
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
          className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
            selectedOption !== null
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Έλεγχος
        </button>
      ) : (
        <div className={`p-4 rounded-lg mt-4 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <p className={`font-bold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
            {isCorrect ? "Σωστή απάντηση." : "Λάθος απάντηση."}
          </p>
          {explanation && <p className="mt-2 text-gray-700 text-sm">{explanation}</p>}
          {!isCorrect && (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedOption(null);
              }}
              className="mt-3 text-sm font-medium text-red-700 underline"
            >
              Προσπάθησε ξανά
            </button>
          )}
        </div>
      )}
    </div>
  );
}
