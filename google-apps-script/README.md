# Google Sheet sync — Setup

Αποθηκεύει ποια μαθήματα έχεις ολοκληρώσει σε ένα Google Sheet, μέσω ενός Apps Script
Web App. Η εφαρμογή στέλνει την πρόοδο **απευθείας από τον browser** σε αυτό το endpoint.

## 1. Φτιάξε το Google Sheet

1. Πήγαινε στο [sheets.new](https://sheets.new) και φτιάξε ένα νέο spreadsheet.
2. Δώσε του ένα όνομα (π.χ. _Roadmap Progress_). Δεν χρειάζεται να φτιάξεις στήλες —
   το script φτιάχνει μόνο του ένα φύλλο `Progress` με headers.

## 2. Πρόσθεσε το Apps Script

1. Στο spreadsheet: **Extensions → Apps Script**.
2. Σβήσε ό,τι υπάρχει και κάνε paste όλο το περιεχόμενο του [`Code.gs`](./Code.gs).
3. **Save** (το εικονίδιο δισκέτας).

## 3. Deploy ως Web App

1. Πάνω δεξιά: **Deploy → New deployment**.
2. **Select type** (γρανάζι) → **Web app**.
3. Ρυθμίσεις:
   - **Description**: ό,τι θες (π.χ. `progress sync v1`).
   - **Execute as**: **Me** (ο λογαριασμός σου).
   - **Who has access**: **Anyone**.
     > Απαραίτητο για να μπορεί ο browser να καλέσει το endpoint χωρίς login.
     > Σημαίνει ότι όποιος ξέρει το URL μπορεί να γράψει — αποδεκτό για προσωπικό tracker.
4. **Deploy** → δώσε **Authorize access** και αποδέξου τα permissions (μία φορά).
5. Αντίγραψε το **Web app URL** (κάτι σαν
   `https://script.google.com/macros/s/AKfy.../exec`).

> Κάθε φορά που αλλάζεις τον κώδικα, κάνε **Deploy → Manage deployments → Edit → New version**
> για να ενημερωθεί το ίδιο URL.

## 4. Σύνδεσε την εφαρμογή

Στο root του project, στο `.env.local`, βάλε το URL:

```bash
NEXT_PUBLIC_SHEET_SYNC_URL=https://script.google.com/macros/s/AKfy.../exec
```

Ξαναξεκίνα το dev server (`npm run dev`) — οι `NEXT_PUBLIC_*` μεταβλητές διαβάζονται
κατά το build/boot.

## 5. Χρήση

1. Άνοιξε τις **Ρυθμίσεις** (γρανάζι πάνω δεξιά) → ενότητα **Google Sheet sync**.
2. Βάλε το email σου και πάτα **Σύνδεση & αποθήκευση**.
3. Από εκεί και πέρα, κάθε φορά που ολοκληρώνεις/αναιρείς μάθημα, η λίστα στέλνεται
   αυτόματα (debounced) στο sheet. Υπάρχει και κουμπί **Sync τώρα**.

Στο sheet θα δεις μία γραμμή ανά email: `Email | Completed Count | Completed Lessons | Updated At`.

## Πώς δουλεύει (τεχνικά)

- Ο client στέλνει `POST` με `Content-Type: text/plain` — έτσι ο browser **δεν** κάνει
  CORS preflight, που το Apps Script δεν υποστηρίζει. Το body είναι JSON string.
- Το `doPost` διαβάζει `e.postData.contents`, κάνει parse και **upsert** ανά email.
- Το email κρατιέται τοπικά (localStorage, κλειδί `syncEmail`)· η πηγή αλήθειας για την
  πρόοδο παραμένει το localStorage — το sheet είναι αντίγραφο/backup.

## Προαιρετικά: shared secret

Αν θες να μην μπορεί ο καθένας να γράφει, όρισε `SHARED_SECRET` στο `Code.gs` και στείλε
το ίδιο string από τον client. Σημείωση: σε browser-direct setup το secret είναι ορατό στο
bundle, οπότε αποτρέπει μόνο τυχαίες κλήσεις, όχι αποφασισμένο χρήστη.
