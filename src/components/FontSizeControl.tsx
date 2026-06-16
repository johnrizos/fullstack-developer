"use client";

import { useSyncExternalStore } from "react";

const MIN_SCALE = 0.8;
const MAX_SCALE = 1.5;
const STEP = 0.1;
export const DEFAULT_SCALE = 1;
const STORAGE_KEY = "fontScale";
const EVENT = "fontscalechange";

function clamp(scale: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.round(scale * 10) / 10));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function readScale() {
  const stored = Number(window.localStorage.getItem(STORAGE_KEY));
  return stored ? clamp(stored) : DEFAULT_SCALE;
}

export function FontSizeControl() {
  const scale = useSyncExternalStore(subscribe, readScale, () => DEFAULT_SCALE);

  const update = (next: number) => {
    const value = clamp(next);
    document.documentElement.style.fontSize = `${Math.round(value * 100)}%`;
    window.localStorage.setItem(STORAGE_KEY, String(value));
    window.dispatchEvent(new Event(EVENT));
  };

  const percent = Math.round(scale * 100);
  const isDefault = scale === DEFAULT_SCALE;

  return (
    <div className="border-b border-gray-100 p-3 dark:border-gray-800">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Μέγεθος γραμμάτων
        </p>
        <button
          type="button"
          onClick={() => update(DEFAULT_SCALE)}
          disabled={isDefault}
          className="rounded px-1.5 py-0.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent dark:text-blue-400 dark:hover:bg-blue-950/30 dark:disabled:text-gray-600"
        >
          Επαναφορά
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => update(scale - STEP)}
          disabled={scale <= MIN_SCALE}
          aria-label="Μίκρυνε τα γράμματα"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg font-bold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          A−
        </button>
        <span className="flex-1 text-center text-sm font-semibold tabular-nums text-gray-700 dark:text-gray-200">
          {percent}%
        </span>
        <button
          type="button"
          onClick={() => update(scale + STEP)}
          disabled={scale >= MAX_SCALE}
          aria-label="Μεγάλωσε τα γράμματα"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-lg font-bold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          A+
        </button>
      </div>
    </div>
  );
}
