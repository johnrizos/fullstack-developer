/**
 * Google Apps Script Web App για αποθήκευση προόδου μαθημάτων σε Google Sheet,
 * με per-lesson last-write-wins merge.
 *
 * Κάθε μάθημα κρατά κατάσταση { done: boolean, at: number(epoch ms) }. Το doPost
 * ΔΕΝ κάνει τυφλό overwrite: κατεβάζει την υπάρχουσα κατάσταση της γραμμής και τη
 * ΣΥΓΧΩΝΕΥΕΙ per-lesson με την εισερχόμενη (κερδίζει το μεγαλύτερο `at`). Έτσι:
 *   - καμία συσκευή με λιγότερα μαθήματα δεν σβήνει το backup,
 *   - η αφαίρεση μαθήματος (done:false με νεότερο timestamp) συγχρονίζεται,
 *   - ταυτόχρονες αλλαγές από δύο συσκευές δεν χάνονται.
 *
 * Στήλες sheet: A=Email, B=Completed Count, C=Completed Lessons, D=Updated At, E=State JSON.
 * Το E (State JSON) είναι η αυθεντική πηγή· τα B/C/D είναι για ανθρώπινη ανάγνωση.
 *
 * Setup: δες google-apps-script/README.md. ΠΡΟΣΟΧΗ: μετά από αλλαγή, κάνε
 * Deploy → Manage deployments → Edit → New version (αλλιώς τρέχει το παλιό).
 */

const SHEET_NAME = "Progress";

// Προαιρετικό shared secret. Άφησέ το κενό για απλότητα (browser-direct setup).
const SHARED_SECRET = "";

// Timestamp για migration παλιών δεδομένων χωρίς `at` (πρέπει να ταιριάζει με τον client).
const MIGRATION_AT = 1;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
      return jsonOutput({ ok: false, error: "unauthorized" });
    }

    const email = String(data.email || "").trim().toLowerCase();
    if (!email) {
      return jsonOutput({ ok: false, error: "missing email" });
    }

    const incoming = normalizeState(data.state, data.completed);
    const existing = readState(email);
    const merged = mergeState(existing, incoming);

    writeState(email, merged);

    const ids = doneIds(merged);
    return jsonOutput({ ok: true, email: email, state: merged, completed: ids, count: ids.length });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
}

/**
 * GET:
 *   - χωρίς params      → health check.
 *   - ?email=foo@bar    → { ok, email, state, completed: string[], count } για merge.
 */
function doGet(e) {
  const email = String((e && e.parameter && e.parameter.email) || "").trim().toLowerCase();
  if (!email) {
    return jsonOutput({ ok: true, message: "Lesson progress sync endpoint is alive." });
  }

  const state = readState(email);
  const ids = doneIds(state);
  return jsonOutput({ ok: true, email: email, state: state, completed: ids, count: ids.length });
}

/** Δέχεται είτε ένα state object ({id:{done,at}}) είτε (fallback) ένα completed[] και
 *  επιστρέφει καθαρό/επικυρωμένο state map. */
function normalizeState(stateObj, completedArr) {
  const out = {};
  if (stateObj && typeof stateObj === "object" && !Array.isArray(stateObj)) {
    for (const id in stateObj) {
      const s = stateObj[id];
      if (s && typeof s.done === "boolean" && typeof s.at === "number") {
        out[String(id)] = { done: s.done, at: s.at };
      }
    }
    return out;
  }
  if (Array.isArray(completedArr)) {
    for (let i = 0; i < completedArr.length; i++) {
      const cid = String(completedArr[i]).trim();
      if (cid) out[cid] = { done: true, at: MIGRATION_AT };
    }
  }
  return out;
}

/** Per-lesson last-write-wins. Ισοπαλία `at` → done:true κερδίζει (deterministic). */
function mergeState(a, b) {
  const out = {};
  let id;
  for (id in a) out[id] = a[id];
  for (id in b) {
    const sb = b[id];
    const sa = out[id];
    if (!sa || sb.at > sa.at || (sb.at === sa.at && sb.done && !sa.done)) {
      out[id] = sb;
    }
  }
  return out;
}

function doneIds(state) {
  const ids = [];
  for (const id in state) {
    if (state[id] && state[id].done) ids.push(id);
  }
  ids.sort();
  return ids;
}

function readState(email) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return {};

  const rows = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).trim().toLowerCase() === email) {
      const json = String(rows[i][4] || "").trim();
      if (json) {
        try {
          return normalizeState(JSON.parse(json), null);
        } catch (err) {
          // corrupt JSON — πέσε στο migration από τη στήλη C.
        }
      }
      // Migration παλιάς γραμμής (χωρίς State JSON): χτίσε από τα comma-separated ids.
      const ids = String(rows[i][2] || "")
        .split(",")
        .map(function (s) { return s.trim(); })
        .filter(function (s) { return s.length > 0; });
      return normalizeState(null, ids);
    }
  }
  return {};
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Email", "Completed Count", "Completed Lessons", "Updated At", "State JSON"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function writeState(email, state) {
  const sheet = getSheet();
  const ids = doneIds(state);
  const lessonsText = ids.join(", ");
  const json = JSON.stringify(state);
  const updatedAt = new Date().toISOString();
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    const emails = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).trim().toLowerCase() === email) {
        const rowIndex = i + 2;
        sheet.getRange(rowIndex, 2, 1, 4).setValues([[ids.length, lessonsText, updatedAt, json]]);
        return;
      }
    }
  }

  sheet.appendRow([email, ids.length, lessonsText, updatedAt, json]);
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
