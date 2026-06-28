"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useProgress } from "./useProgress";
import {
  clearSyncEmail,
  getSyncEmail,
  isSyncConfigured,
  setSyncEmail,
  syncProgressToSheet,
} from "@/lib/sheetSync";

export type SyncStatus = "idle" | "syncing" | "success" | "error";

const DEBOUNCE_MS = 1200;

/**
 * Διαχειρίζεται το sync της προόδου σε Google Sheet:
 * - κρατά το email ταυτότητας (localStorage),
 * - κάνει auto-push (debounced) κάθε φορά που αλλάζουν τα ολοκληρωμένα μαθήματα,
 * - εκθέτει χειροκίνητο sync + status για το UI.
 *
 * Πρέπει να καλείται ΜΙΑ φορά σε always-mounted component (π.χ. SiteHeader),
 * ώστε το auto-sync να τρέχει ανεξάρτητα από το αν είναι ανοιχτό το UI.
 */
export function useSheetSync() {
  const { completedLessons } = useProgress();
  const [email, setEmailState] = useState<string | null>(null);
  const [status, setStatus] = useState<SyncStatus>("idle");
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);

  // Αποτρέπει διπλό push για ίδια δεδομένα (κρατά το τελευταίο σταλμένο payload).
  const lastSentRef = useRef<string>("");

  useEffect(() => {
    setEmailState(getSyncEmail());
  }, []);

  const push = useCallback(async (targetEmail: string, lessons: string[]) => {
    setStatus("syncing");
    const ok = await syncProgressToSheet(targetEmail, lessons);
    setStatus(ok ? "success" : "error");
    if (ok) setLastSyncedAt(Date.now());
  }, []);

  // Auto-sync: όταν αλλάζει η λίστα (ή μόλις οριστεί email), στείλε με debounce.
  useEffect(() => {
    if (!email || !isSyncConfigured()) return;

    const payload = JSON.stringify(completedLessons);
    if (payload === lastSentRef.current) return;

    const id = window.setTimeout(() => {
      lastSentRef.current = payload;
      push(email, completedLessons);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(id);
  }, [email, completedLessons, push]);

  const connect = useCallback((value: string) => {
    const clean = value.trim();
    if (!clean) return;
    setSyncEmail(clean);
    setEmailState(clean);
    lastSentRef.current = ""; // ανάγκασε resync με τη νέα ταυτότητα
  }, []);

  const disconnect = useCallback(() => {
    clearSyncEmail();
    setEmailState(null);
    setStatus("idle");
    setLastSyncedAt(null);
    lastSentRef.current = "";
  }, []);

  const syncNow = useCallback(() => {
    if (!email) return;
    lastSentRef.current = JSON.stringify(completedLessons);
    push(email, completedLessons);
  }, [email, completedLessons, push]);

  return {
    configured: isSyncConfigured(),
    email,
    status,
    lastSyncedAt,
    completedCount: completedLessons.length,
    connect,
    disconnect,
    syncNow,
  };
}
