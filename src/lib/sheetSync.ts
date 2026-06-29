// Best-effort sync της προόδου σε Google Sheet μέσω Apps Script Web App.
// Η κλήση γίνεται απευθείας από τον browser (δες google-apps-script/README.md για setup).
//
// Το NEXT_PUBLIC_SHEET_SYNC_URL γίνεται inline στο bundle κατά το build, οπότε η
// αναφορά πρέπει να είναι ΣΤΑΤΙΚΗ (όχι μέσω μεταβλητής) για να αντικατασταθεί σωστά.
const SYNC_URL = process.env.NEXT_PUBLIC_SHEET_SYNC_URL;

const EMAIL_KEY = "syncEmail";

export type SheetSyncPayload = {
  email: string;
  completed: string[];
  count: number;
  updatedAt: string;
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
 * Στέλνει την τρέχουσα λίστα ολοκληρωμένων μαθημάτων στο Google Sheet.
 * Χρησιμοποιεί "simple request" (text/plain) ώστε ο browser να ΜΗΝ κάνει CORS
 * preflight προς το Apps Script — αλλιώς η κλήση θα μπλοκαριζόταν.
 * Επιστρέφει true αν το request στάλθηκε επιτυχώς.
 */
export async function syncProgressToSheet(email: string, completed: string[]): Promise<boolean> {
  if (!SYNC_URL || !email) return false;

  const payload: SheetSyncPayload = {
    email: email.trim(),
    completed,
    count: completed.length,
    updatedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(SYNC_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
      keepalive: true,
    });
    return res.ok;
  } catch {
    // π.χ. offline ή CORS στο response — το write μπορεί να πέτυχε ούτως ή άλλως.
    return false;
  }
}

/**
 * Κατεβάζει τη λίστα ολοκληρωμένων μαθημάτων ενός email από το Google Sheet.
 * GET με query param → "simple request" (χωρίς CORS preflight) και το response
 * είναι αναγνώσιμο. Χρησιμοποιείται στο login για cross-browser restore + merge.
 *
 * Επιστρέφει:
 *   - string[]  → η αποθηκευμένη λίστα (μπορεί να είναι κενή αν δεν υπάρχει γραμμή)
 *   - null      → απέτυχε το fetch (offline/σφάλμα) — ΜΗΝ το θεωρήσεις "κενή πρόοδος"
 */
export async function fetchProgressFromSheet(email: string): Promise<string[] | null> {
  if (!SYNC_URL || !email) return null;

  try {
    const url = `${SYNC_URL}?email=${encodeURIComponent(email.trim())}`;
    const res = await fetch(url, { method: "GET", redirect: "follow" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.ok === false) return null;
    return Array.isArray(data.completed)
      ? data.completed.filter((id: unknown): id is string => typeof id === "string")
      : [];
  } catch {
    return null;
  }
}
