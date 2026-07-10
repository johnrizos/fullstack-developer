// Best-effort sync της προόδου σε Google Sheet μέσω Apps Script Web App.
// Η κλήση γίνεται απευθείας από τον browser (δες google-apps-script/README.md για setup).
//
// Το NEXT_PUBLIC_SHEET_SYNC_URL γίνεται inline στο bundle κατά το build, οπότε η
// αναφορά πρέπει να είναι ΣΤΑΤΙΚΗ (όχι μέσω μεταβλητής) για να αντικατασταθεί σωστά.
import {
  type ProgressMap,
  completedIdsToMap,
  isProgressMap,
  mapToCompletedIds,
  MIGRATION_AT,
} from "./progressMap";

const SYNC_URL = process.env.NEXT_PUBLIC_SHEET_SYNC_URL;

const EMAIL_KEY = "syncEmail";

// Όριο για κάθε request ώστε το UI να μην κολλάει σε ατέρμονο "syncing" αν το
// δίκτυο/Apps Script δεν απαντά.
const REQUEST_TIMEOUT_MS = 12000;

function withTimeout(ms: number): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(id) };
}

export type SheetSyncPayload = {
  email: string;
  completed: string[];
  state: ProgressMap;
  count: number;
  updatedAt: string;
};

export type PushResult = {
  /** True αν το request στάλθηκε επιτυχώς (2xx). */
  ok: boolean;
  /** Το server-merged state, αν το (νέο) Apps Script το επέστρεψε — αλλιώς null. */
  merged: ProgressMap | null;
};

/** True μόνο αν έχει οριστεί το Apps Script URL στο .env(.local). */
export function isSyncConfigured(): boolean {
  return Boolean(SYNC_URL);
}

export function getSyncEmail(): string | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(EMAIL_KEY);
  return stored && stored.trim() ? stored : null;
}

export function setSyncEmail(email: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(EMAIL_KEY, email.trim());
}

export function clearSyncEmail(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(EMAIL_KEY);
}

/**
 * Στέλνει το per-lesson state στο Google Sheet. Το (νέο) Apps Script κάνει
 * server-side per-lesson merge, οπότε το push ΔΕΝ μπορεί να σβήσει δεδομένα άλλης
 * συσκευής — και επιστρέφει το merged state για άμεση υιοθέτηση.
 * Χρησιμοποιεί "simple request" (text/plain) ώστε ο browser να ΜΗΝ κάνει CORS
 * preflight προς το Apps Script — αλλιώς η κλήση θα μπλοκαριζόταν.
 * Στέλνει και `completed[]` για backward-compat με παλιό sheet.
 */
export async function pushProgressToSheet(email: string, state: ProgressMap): Promise<PushResult> {
  if (!SYNC_URL || !email) return { ok: false, merged: null };

  const completed = mapToCompletedIds(state);
  const payload: SheetSyncPayload = {
    email: email.trim(),
    completed,
    state,
    count: completed.length,
    updatedAt: new Date().toISOString(),
  };

  const t = withTimeout(REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(SYNC_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
      keepalive: true,
      signal: t.signal,
    });
    if (!res.ok) return { ok: false, merged: null };
    let merged: ProgressMap | null = null;
    try {
      const data = await res.json();
      if (data && data.ok !== false && isProgressMap(data.state)) merged = data.state;
    } catch {
      // response μη αναγνώσιμο (π.χ. CORS) — το write πιθανώς πέτυχε· το merged έρχεται στο επόμενο pull.
    }
    return { ok: true, merged };
  } catch {
    // offline ή σφάλμα — το write δεν στάλθηκε.
    return { ok: false, merged: null };
  } finally {
    t.clear();
  }
}

/**
 * Κατεβάζει το per-lesson state ενός email από το Google Sheet.
 * GET με query param → "simple request" (χωρίς CORS preflight) και το response
 * είναι αναγνώσιμο. Χρησιμοποιείται στο startup/login για cross-device merge.
 *
 * Επιστρέφει:
 *   - ProgressMap → το αποθηκευμένο state (κενό {} αν δεν υπάρχει γραμμή). Αν το
 *                   deployment είναι παλιό-two-way (δίνει μόνο completed[]), το
 *                   μετατρέπει σε map (done@MIGRATION_AT) για συμβατότητα.
 *   - null        → ΑΓΝΩΣΤΟ: fetch failure (offline/σφάλμα) Ή απρόσμενο σχήμα (π.χ.
 *                   πολύ παλιό deployment χωρίς state/completed). ΠΟΤΕ μην το θεωρήσεις
 *                   "μηδέν πρόοδος".
 */
export async function fetchProgressFromSheet(email: string): Promise<ProgressMap | null> {
  if (!SYNC_URL || !email) return null;

  const t = withTimeout(REQUEST_TIMEOUT_MS);
  try {
    const url = `${SYNC_URL}?email=${encodeURIComponent(email.trim())}`;
    const res = await fetch(url, { method: "GET", redirect: "follow", signal: t.signal });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.ok === false) return null;
    if (isProgressMap(data.state)) return data.state;
    // Backward-compat: παλιό two-way deployment → μόνο completed[]. Χτίσε map.
    if (Array.isArray(data.completed)) {
      const ids = data.completed.filter((id: unknown): id is string => typeof id === "string");
      return completedIdsToMap(ids, MIGRATION_AT);
    }
    // Απρόσμενο σχήμα (π.χ. health-only doGet) → άγνωστο, ΟΧΙ κενό.
    return null;
  } catch {
    return null;
  } finally {
    t.clear();
  }
}
