"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allLessons, formatDuration, totalEstimatedMinutes } from "@/lib/curriculum";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/components/AuthProvider";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";

export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { isCompleted, isLoaded, resetProgress, studiedMinutes } = useProgress();
  const { user, authReady, configured, signInWithEmail, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [authStatus, setAuthStatus] = useState<{ kind: "idle" | "sending" | "sent" | "error"; message?: string }>({
    kind: "idle",
  });

  const handleSendMagicLink = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setAuthStatus({ kind: "sending" });
    const { error } = await signInWithEmail(email.trim());
    setAuthStatus(
      error ? { kind: "error", message: error } : { kind: "sent", message: "Έλεγξε το email σου για τον σύνδεσμο." },
    );
  };

  const handleSignOut = async () => {
    await signOut();
    setSettingsOpen(false);
  };

  const completedCount = isLoaded ? allLessons.filter((lesson) => isCompleted(lesson.id)).length : 0;
  const progressPercent = Math.round((completedCount / allLessons.length) * 100);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setSettingsOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleResetProgress = () => {
    const confirmed = window.confirm("Να γίνει reset σε όλα τα συμπληρωμένα μαθήματα;");
    if (!confirmed) return;

    resetProgress();
    setSettingsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-mono text-sm font-bold text-white">
            {"</>"}
          </span>
          <span className="hidden text-lg font-bold text-gray-900 sm:block dark:text-white">
            Fullstack Roadmap
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div
            className="hidden items-center gap-2 md:flex"
            title={`${completedCount}/${allLessons.length} μαθήματα · ${formatDuration(studiedMinutes)} από ${formatDuration(totalEstimatedMinutes)}`}
          >
            <div className="h-2 w-28 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div className="h-full rounded-full bg-green-500 transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{progressPercent}%</span>
          </div>

          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m20 20-3.5-3.5" />
            </svg>
            <span className="hidden lg:block">Αναζήτηση</span>
            <kbd className="hidden rounded border border-gray-200 px-1.5 text-xs lg:block dark:border-gray-700">Ctrl K</kbd>
          </button>

          <ThemeToggle />

          <div className="relative">
            <button
              type="button"
              onClick={() => setSettingsOpen((open) => !open)}
              aria-label="Ρυθμίσεις"
              title="Ρυθμίσεις"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.04.04a2 2 0 0 1-2.83 2.83l-.04-.04a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.65V21a2 2 0 0 1-4 0v-.06a1.8 1.8 0 0 0-1.1-1.65 1.8 1.8 0 0 0-1.98.36l-.04.04a2 2 0 1 1-2.83-2.83l.04-.04A1.8 1.8 0 0 0 4.6 15a1.8 1.8 0 0 0-1.65-1.1H3a2 2 0 0 1 0-4h.06A1.8 1.8 0 0 0 4.7 8.8a1.8 1.8 0 0 0-.36-1.98l-.04-.04A2 2 0 1 1 7.13 3.95l.04.04a1.8 1.8 0 0 0 1.98.36 1.8 1.8 0 0 0 1.1-1.65V2.6a2 2 0 0 1 4 0v.06a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 1.98-.36l.04-.04a2 2 0 0 1 2.83 2.83l-.04.04a1.8 1.8 0 0 0-.36 1.98 1.8 1.8 0 0 0 1.65 1.1H21a2 2 0 0 1 0 4h-.06A1.8 1.8 0 0 0 19.4 15Z"
                />
              </svg>
            </button>

            {settingsOpen && (
              <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Ρυθμίσεις</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {completedCount}/{allLessons.length} μαθήματα · {formatDuration(studiedMinutes)} διαβασμένα
                  </p>
                </div>
                {configured && (
                  <div className="border-b border-gray-100 p-3 dark:border-gray-800">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                      Συγχρονισμός
                    </p>
                    {!authReady ? (
                      <p className="text-xs text-gray-500 dark:text-gray-400">Έλεγχος σύνδεσης…</p>
                    ) : user ? (
                      <div className="flex items-center justify-between gap-2">
                        <span className="min-w-0 truncate text-sm text-gray-700 dark:text-gray-300" title={user.email}>
                          {user.email}
                        </span>
                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Αποσύνδεση
                        </button>
                      </div>
                    ) : authStatus.kind === "sent" ? (
                      <p className="text-xs font-medium text-green-600 dark:text-green-400">{authStatus.message}</p>
                    ) : (
                      <form onSubmit={handleSendMagicLink} className="flex flex-col gap-2">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="το email σου"
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                        />
                        <button
                          type="submit"
                          disabled={authStatus.kind === "sending"}
                          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {authStatus.kind === "sending" ? "Αποστολή…" : "Στείλε magic link"}
                        </button>
                        {authStatus.kind === "error" && (
                          <p className="text-xs font-medium text-red-600 dark:text-red-400">{authStatus.message}</p>
                        )}
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Login με email για sync σε όλες τις συσκευές.
                        </p>
                      </form>
                    )}
                  </div>
                )}
                <div className="p-2">
                  <button
                    type="button"
                    onClick={handleResetProgress}
                    disabled={completedCount === 0}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent dark:text-red-400 dark:hover:bg-red-950/30 dark:disabled:text-gray-600"
                  >
                    <span>Reset συμπληρωμένων μαθημάτων</span>
                    <span className="text-xs font-medium">{completedCount}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
