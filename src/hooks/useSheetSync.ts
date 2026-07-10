"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useProgress } from "./useProgress";
import { mapToCompletedIds } from "@/lib/progressMap";
import {
  clearSyncEmail,
  fetchProgressFromSheet,
  getSyncEmail,
  isSyncConfigured,
  pushProgressToSheet,
  setSyncEmail,
} from "@/lib/sheetSync";

export type SyncStatus = "idle" | "syncing" | "success" | "error";

const DEBOUNCE_MS = 1200;

/**
 * Διαχειρίζεται το sync της προόδου σε Google Sheet με per-lesson last-write-wins:
 * - κρατά το email ταυτότητας (localStorage),
 * - κάνει auto-push (debounced) κάθε φορά που αλλάζουν τα μαθήματα,
 * - εκθέτει χειροκίνητο sync + status για το UI.
 *
 * ΑΡΧΗ: ΚΑΘΕ εγγραφή περνά από `mergeAndPush`, που κατεβάζει το remote state, το
 * ΣΥΓΧΩΝΕΥΕΙ per-lesson (LWW) με το τοπικό, και στέλνει το αποτέλεσμα. Το (νέο)
 * Apps Script κάνει ΚΑΙ server-side merge, οπότε ούτε ταυτόχρονες αλλαγές από δύο
 * συσκευές χάνονται — και η αφαίρεση μαθήματος συγχρονίζεται (tombstone με timestamp).
 *
 * Πρέπει να καλείται ΜΙΑ φορά σε always-mounted component (π.χ. SiteHeader).
 */
export function useSheetSync() {
  const { completedLessons, getProgressMap, mergeProgressMap } = useProgress();
  const [email, setEmailState] = useState<string | null>(null);
  const [status, setStatus] = useState<SyncStatus>("idle");
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);

  // Το auto-push περιμένει να ολοκληρωθεί το αρχικό pull+merge (bootstrap).
  const [bootstrapped, setBootstrapped] = useState(false);

  // Signature (ταξινομημένα completed ids) του τελευταίου συγχρονισμού — για dedupe.
  const lastSentRef = useRef<string>("");

  const markSent = useCallback(() => {
    lastSentRef.current = JSON.stringify(mapToCompletedIds(getProgressMap()));
  }, [getProgressMap]);

  /**
   * Ο ασφαλής τρόπος να συγχρονίσεις: pull remote → per-lesson merge → push.
   * - Αν το remote είναι null (offline/πολύ παλιό deployment) → σταμάτα (μη ρισκάρεις
   *   clobber σε deployment που δεν κάνει merge).
   * - Μετά το push, υιοθέτησε το server-merged state (φέρνει αλλαγές άλλων συσκευών).
   */
  const mergeAndPush = useCallback(
    async (targetEmail: string) => {
      if (!targetEmail || !isSyncConfigured()) return;

      setStatus("syncing");
      const remote = await fetchProgressFromSheet(targetEmail);
      if (remote === null) {
        setStatus("error");
        return;
      }

      // Per-lesson LWW στο τοπικό (ενημερώνει και το UI) και προετοίμασε το push.
      const localMap = mergeProgressMap(remote);
      // Απόφυγε το να ξαναπυροδοτήσει το auto-push effect ο write του merge.
      lastSentRef.current = JSON.stringify(mapToCompletedIds(localMap));

      const { ok, merged } = await pushProgressToSheet(targetEmail, localMap);
      if (!ok) {
        setStatus("error");
        return;
      }

      // Υιοθέτησε το server-merged state (π.χ. αλλαγές που ήρθαν από άλλη συσκευή).
      if (merged) mergeProgressMap(merged);
      markSent();

      setStatus("success");
      setLastSyncedAt(Date.now());
    },
    [mergeProgressMap, markSent],
  );

  // Startup: αν υπάρχει αποθηκευμένο email, κάνε pull+merge (+push) ΠΡΙΝ επιτραπεί το
  // auto-push — ώστε το UI να δείχνει αμέσως τη σωστή (ενωμένη) πρόοδο.
  useEffect(() => {
    let cancelled = false;
    const stored = getSyncEmail();

    if (!stored) {
      setBootstrapped(true);
      return;
    }

    setEmailState(stored);

    if (!isSyncConfigured()) {
      setBootstrapped(true);
      return;
    }

    (async () => {
      await mergeAndPush(stored);
      if (!cancelled) setBootstrapped(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [mergeAndPush]);

  // Auto-sync: όταν αλλάζει η λίστα, κάνε merge-and-push (debounced). Περιμένει το
  // bootstrap. Το dedupe γίνεται με signature των completed ids.
  useEffect(() => {
    if (!bootstrapped) return;
    if (!email || !isSyncConfigured()) return;

    const sig = JSON.stringify([...completedLessons].sort());
    if (sig === lastSentRef.current) return;

    const id = window.setTimeout(() => {
      mergeAndPush(email);
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(id);
  }, [bootstrapped, email, completedLessons, mergeAndPush]);

  // Χειροκίνητο login: όρισε ταυτότητα και κάνε αμέσως pull+merge+push.
  const connect = useCallback(
    async (value: string) => {
      const clean = value.trim();
      if (!clean) return;

      setSyncEmail(clean);
      setEmailState(clean);
      lastSentRef.current = "";

      if (isSyncConfigured()) {
        await mergeAndPush(clean);
      }
      setBootstrapped(true);
    },
    [mergeAndPush],
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
    mergeAndPush(email);
  }, [email, mergeAndPush]);

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
