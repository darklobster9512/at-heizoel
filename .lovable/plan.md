# E-Mail-Platzhalter auf .at umstellen

Zwei Formular-Platzhalter zeigen Beispiel-E-Mails mit `.de`-Endung. Diese werden auf `.at` geändert:

1. **Bestellformular (/bestellen, Schritt „Ihre Daten")**
   - `z.B. max@mustermann.de` → `z.B. max@mustermann.at` (src/routes/bestellen.tsx, Zeile 802)

2. **Kontaktformular (/kontakt)**
   - `ihre@email.de` → `ihre@email.at` (src/routes/kontakt.tsx, Zeile 401)

Nur die Beispiel-Platzhalter ändern sich — echte Absenderangaben (z. B. info@heizoel-deutschland.com in Impressum/Fußnote) bleiben unverändert.

## Verifikation
- Build prüfen (build-errors.log)
- Beide Formulare im Browser öffnen und die Platzhalter sichtbar bestätigen
