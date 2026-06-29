"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useProgress } from "./useProgress";
import {
  clearSyncEmail,
  fetchProgressFromSheet,
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
  const { completedLessons, mergeCompleted } = useProgress();
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
  // Guard: ΠΟΤΕ μην κάνεις push άδεια λίστα — ένας φρέσκος browser (count 0) δεν
  // πρέπει να σβήσει το backup. Το restore γίνεται στο connect (pull + merge).
  useEffect(() => {
    if (!email || !isSyncConfigured()) return;
    if (completedLessons.length === 0) return;

    const payload = JSON.stringify(completedLessons);
    if (payload === lastSentRef.current) return;

    const id = window.setTimeout(() => {
      lastSentRef.current = payload;
      push(email, completedLessons);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(id);
  }, [email, completedLessons, push]);

  // Login: κατέβασε την πρόοδο του email από το sheet και ΣΥΓΧΩΝΕΥΣΕ με το τοπικό
  // ΠΡΙΝ οριστεί το email — έτσι το auto-push που ακολουθεί στέλνει το ενωμένο
  // superset (κανείς δεν χάνει πρόοδο, και ο άδειος browser δεν σβήνει το backup).
  const connect = useCallback(
    async (value: string) => {
      const clean = value.trim();
      if (!clean) return;

      if (isSyncConfigured()) {
        setStatus("syncing");
        const remote = await fetchProgressFromSheet(clean);
        if (remote === null) {
          // Το fetch απέτυχε (offline/CORS/timeout) — μην προχωρήσεις σιωπηλά σαν
          // να μην υπάρχει πρόοδος. Δείξε error και μη συνδέσεις.
          setStatus("error");
          return;
        }
        if (remote.length) mergeCompleted(remote);
        // Το restore ολοκληρώθηκε. ΠΑΝΤΑ κλείσε το status — αλλιώς αν το remote ήταν
        // κενό (και ο guard κόψει το auto-push) θα έμενε κολλημένο στο "syncing".
        setStatus("success");
        setLastSyncedAt(Date.now());
      }

      setSyncEmail(clean);
      setEmailState(clean);
      lastSentRef.current = ""; // ανάγκασε resync με τη νέα ταυτότητα
    },
    [mergeCompleted],
  );

  const disconnect = useCallback(() => {
    clearSyncEmail();
    setEmailState(null);
    setStatus("idle");
    setLastSyncedAt(null);
    lastSentRef.current = "";
  }, []);

  const syncNow = useCallback(() => {
    if (!email) return;
    if (completedLessons.length === 0) return; // μην σβήσεις το backup με άδεια λίστα
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
