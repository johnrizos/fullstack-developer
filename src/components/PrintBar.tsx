"use client";

import Link from "next/link";
import { useEffect } from "react";

/* Μπάρα εκτύπωσης μαθήματος (μόνο στην οθόνη). Ο διακόπτης «με απαντήσεις» διαβάζεται
   από το print.css με body:has(#print-answers:checked), οπότε δεν χρειάζεται re-render. */

export type PrintLink = { href: string; label: string };

export function PrintBar({ links = [] }: { links?: PrintLink[] }) {
  useEffect(() => {
    let wasDark = false;
    let closedDetails: HTMLDetailsElement[] = [];

    // Στο χαρτί πάντα light θέμα, και ανοιχτά όλα τα <details> του μαθήματος.
    const before = () => {
      const root = document.documentElement;
      wasDark = root.classList.contains("dark");
      root.classList.remove("dark");
      closedDetails = Array.from(document.querySelectorAll<HTMLDetailsElement>("article details:not([open])"));
      closedDetails.forEach((d) => (d.open = true));
    };
    const after = () => {
      if (wasDark) document.documentElement.classList.add("dark");
      closedDetails.forEach((d) => (d.open = false));
      closedDetails = [];
    };

    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-2M6 14h12v7H6z" />
        </svg>
        Εκτύπωση A4
      </button>
      <label htmlFor="print-answers" className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <input id="print-answers" type="checkbox" className="h-4 w-4 accent-blue-600" />
        Με απαντήσεις/λύσεις
      </label>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
