// Per-lesson πρόοδος με timestamps — last-write-wins ΑΝΑ μάθημα.
//
// Σε αντίθεση με το απλό union (που μόνο προσθέτει), αυτό το μοντέλο κρατά για κάθε
// μάθημα { done, at }. Έτσι συγχρονίζεται ΚΑΙ η αφαίρεση: ένα "removed at T2" (done:false)
// κερδίζει ένα παλαιότερο "done at T1". Η ίδια merge λογική τρέχει και client-side και
// server-side (Apps Script), ώστε ούτε ταυτόχρονες αλλαγές από δύο συσκευές να χάνονται.

export type LessonState = { done: boolean; at: number }; // at = epoch ms
export type ProgressMap = Record<string, LessonState>;

// Βάση χρόνου για migration παλιών δεδομένων που δεν είχαν timestamp. Οποιαδήποτε
// πραγματική αλλαγή στο μέλλον (Date.now()) υπερισχύει αυτής της βάσης.
export const MIGRATION_AT = 1;

export function isLessonState(value: unknown): value is LessonState {
  return (
    !!value &&
    typeof value === "object" &&
    typeof (value as LessonState).done === "boolean" &&
    typeof (value as LessonState).at === "number"
  );
}

export function isProgressMap(value: unknown): value is ProgressMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value as Record<string, unknown>).every(isLessonState);
}

/** string[] ολοκληρωμένων → ProgressMap (όλα done στο δοσμένο timestamp). */
export function completedIdsToMap(ids: string[], at: number = MIGRATION_AT): ProgressMap {
  const map: ProgressMap = {};
  for (const id of ids) {
    if (typeof id === "string" && id.trim()) map[id] = { done: true, at };
  }
  return map;
}

/** ProgressMap → ταξινομημένη λίστα των ολοκληρωμένων ids (done === true). */
export function mapToCompletedIds(map: ProgressMap): string[] {
  return Object.keys(map)
    .filter((id) => map[id]?.done)
    .sort();
}

/**
 * Per-lesson last-write-wins merge. Για κάθε μάθημα κρατά την εγγραφή με το
 * μεγαλύτερο `at`. Σε ισοπαλία timestamp, το `done: true` υπερισχύει (deterministic,
 * ίδιο αποτέλεσμα σε client & server).
 */
export function mergeProgressMaps(a: ProgressMap, b: ProgressMap): ProgressMap {
  const out: ProgressMap = { ...a };
  for (const id of Object.keys(b)) {
    const sb = b[id];
    if (!isLessonState(sb)) continue;
    const sa = out[id];
    if (!sa || sb.at > sa.at || (sb.at === sa.at && sb.done && !sa.done)) {
      out[id] = sb;
    }
  }
  return out;
}

export function parseProgressMap(raw: string | null): ProgressMap {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return isProgressMap(parsed) ? parsed : {};
  } catch {
    return {};
  }
}
