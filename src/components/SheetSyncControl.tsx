"use client";

import { useState } from "react";
import type { SyncStatus } from "@/hooks/useSheetSync";

type Props = {
  configured: boolean;
  email: string | null;
  status: SyncStatus;
  lastSyncedAt: number | null;
  completedCount: number;
  onConnect: (email: string) => void;
  onDisconnect: () => void;
  onSyncNow: () => void;
};

const statusLabel: Record<SyncStatus, string> = {
  idle: "Σε αναμονή",
  syncing: "Συγχρονισμός…",
  success: "Αποθηκεύτηκε ✓",
  error: "Αποτυχία — δες σύνδεση",
};

const statusColor: Record<SyncStatus, string> = {
  idle: "text-gray-400 dark:text-gray-500",
  syncing: "text-blue-600 dark:text-blue-400",
  success: "text-green-600 dark:text-green-400",
  error: "text-red-600 dark:text-red-400",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function SheetSyncControl({
  configured,
  email,
  status,
  lastSyncedAt,
  completedCount,
  onConnect,
  onDisconnect,
  onSyncNow,
}: Props) {
  const [draft, setDraft] = useState("");

  if (!configured) {
    return (
      <div className="border-b border-gray-100 p-3 dark:border-gray-800">
        <p className="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Google Sheet sync
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Πρόσθεσε το <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">NEXT_PUBLIC_SHEET_SYNC_URL</code> στο
          <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">.env.local</code> για να ενεργοποιηθεί.
        </p>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-100 p-3 dark:border-gray-800">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
        Google Sheet sync
      </p>

      {email ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-700 dark:text-gray-200" title={email}>
              {email}
            </span>
            <span className={`shrink-0 text-xs font-semibold ${statusColor[status]}`}>{statusLabel[status]}</span>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {completedCount} μαθήματα
            {lastSyncedAt ? ` · ${new Date(lastSyncedAt).toLocaleTimeString("el-GR")}` : ""}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSyncNow}
              disabled={status === "syncing"}
              className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Sync τώρα
            </button>
            <button
              type="button"
              onClick={onDisconnect}
              className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              Αποσύνδεση
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isValidEmail(draft)) {
              onConnect(draft);
              setDraft("");
            }
          }}
          className="space-y-2"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Βάλε το email σου για να συγχρονίζεται η πρόοδος σε όλους τους browsers/συσκευές.
            Στη σύνδεση κατεβαίνει η αποθηκευμένη πρόοδος και ενώνεται με την τοπική.
          </p>
          <input
            type="email"
            inputMode="email"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="email@example.com"
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />
          <button
            type="submit"
            disabled={!isValidEmail(draft)}
            className="w-full rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Σύνδεση & αποθήκευση
          </button>
        </form>
      )}
    </div>
  );
}
