/**
 * Google Apps Script Web App για αποθήκευση προόδου μαθημάτων σε Google Sheet.
 *
 * Δέχεται POST από τον browser (text/plain body με JSON) και κάνει "upsert"
 * μία γραμμή ανά email: αν υπάρχει ήδη το email, ενημερώνει τη γραμμή του,
 * αλλιώς προσθέτει νέα.
 *
 * Setup: δες google-apps-script/README.md
 */

const SHEET_NAME = "Progress";

// Προαιρετικό shared secret. Αν το ορίσεις εδώ, πρέπει να στέλνεται και από τον client.
// (Σε browser-direct setup δεν προσφέρει πραγματική ασφάλεια — άφησέ το κενό για απλότητα.)
const SHARED_SECRET = "";

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

    const completed = Array.isArray(data.completed) ? data.completed.map(String) : [];
    const updatedAt = data.updatedAt || new Date().toISOString();

    upsertRow(email, completed, updatedAt);

    return jsonOutput({ ok: true, email: email, count: completed.length });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
}

/**
 * GET:
 *   - χωρίς params      → health check (έλεγξε ότι ζει το deployment στον browser).
 *   - ?email=foo@bar    → επιστρέφει { ok, email, completed: string[], count } για
 *                          cross-browser restore. Αν δεν υπάρχει γραμμή: completed: [].
 */
function doGet(e) {
  const email = String((e && e.parameter && e.parameter.email) || "").trim().toLowerCase();
  if (!email) {
    return jsonOutput({ ok: true, message: "Lesson progress sync endpoint is alive." });
  }

  const completed = readCompleted(email);
  return jsonOutput({ ok: true, email: email, completed: completed, count: completed.length });
}

function readCompleted(email) {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  // Στήλες: A=Email, B=Count, C=Completed Lessons (comma-separated), D=Updated At.
  const rows = sheet.getRange(2, 1, lastRow - 1, 3).getValues();
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0]).trim().toLowerCase() === email) {
      return String(rows[i][2] || "")
        .split(",")
        .map(function (s) { return s.trim(); })
        .filter(function (s) { return s.length > 0; });
    }
  }
  return [];
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Email", "Completed Count", "Completed Lessons", "Updated At"]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function upsertRow(email, completed, updatedAt) {
  const sheet = getSheet();
  const lessonsText = completed.join(", ");
  const lastRow = sheet.getLastRow();

  // Ψάξε υπάρχουσα γραμμή με αυτό το email (στήλη A, αγνοώντας το header).
  if (lastRow > 1) {
    const emails = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).trim().toLowerCase() === email) {
        const rowIndex = i + 2;
        sheet.getRange(rowIndex, 2, 1, 3).setValues([[completed.length, lessonsText, updatedAt]]);
        return;
      }
    }
  }

  sheet.appendRow([email, completed.length, lessonsText, updatedAt]);
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
