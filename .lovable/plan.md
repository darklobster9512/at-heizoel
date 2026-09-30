# Telefonnummer-Platzhalter auf österreichisches Format umstellen

## Ziel
Die Beispiel-Telefonnummern in den Formularen sind deutsche Nummern (0170/0176) und passen nicht zu Österreich. Umstellung auf österreichisches Mobilfunkformat.

## Änderungen

1. **Bestellformular** (`src/routes/bestellen.tsx`, Zeile 813)
   - Platzhalter des Telefonnummer-Felds: `"z.B. 0170 1234567"` → `"z.B. 0664 1234567"`

2. **Kontaktformular** (`src/routes/kontakt.tsx`, Zeile 413)
   - Platzhalter des Telefon-Felds: `"z. B. 0176 12345678"` → `"z. B. 0664 1234567"`

## Nicht geändert (nach Nutzerentscheidung)
- Die angezeigte Shop-Telefonnummer `SITE_PHONE` (`+49 30 5678 9000` in `src/lib/seo.ts`, Kontaktseite/JSON-LD) bleibt unverändert — die Firma sitzt in Berlin.
- Die ausgeblendete Klarna-Fehlermeldung (030 1234567) bleibt unverändert.

## Verifikation
- Build prüfen.
- Playwright: Bestellschritt 2 öffnen und den Platzhalter im Telefonnummer-Feld prüfen; Kontaktseite-Platzhalter prüfen.
