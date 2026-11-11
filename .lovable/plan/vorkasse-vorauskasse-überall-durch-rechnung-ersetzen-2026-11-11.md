# Vorkasse/Vorauskasse überall durch Rechnung ersetzen

Reihenfolge der Zahlungsarten wie im Bestellformular: EC-Karte, Barzahlung, Rechnung.

## Seiten
- **Angebotsseite (Preisrechner-Ergebnis):** Zahlungsart-Bild und Beschriftung „Vorkasse“ → „Rechnung“-Bild.
- **Lieferung & Zahlung:** Karte „Vorauskasse“ wird „Rechnung“ mit Rechnung-Bild und Text „Sie erhalten nach der Lieferung eine Rechnung und überweisen den Betrag bequem auf das angegebene Konto.“ Kurzinfo und Seitenbeschreibung → „EC-Karte, Bar oder Rechnung“.
- **FAQ:**
  - Zahlungsarten-Antworten nennen „Rechnung“ statt Vorkasse/Vorauskasse.
  - Satz „bei Vorauskasse wird der überschüssige Betrag erstattet“ entfällt (bei Rechnung zahlt man ohnehin nur die getankte Menge).
  - Frage „Was ist, wenn bei Vorauskasse die Menge nicht passt?“ wird entfernt, da sie bei Rechnung nicht mehr zutrifft.
  - Kreditkarten-Antwort: „Barzahlung, EC-Karte oder Rechnung“.
- **Preisrechner-Startseite:** „Vorkasse, Rechnung, EC-Karte oder Bar“ → „EC-Karte, Bar oder Rechnung“.
- **Heizölpreise:** „per EC-Karte, bar bei Lieferung oder auf Rechnung“.
- **AGB:** „EC-Karte (Girocard), Barzahlung oder Rechnung“.

## Technisch
Dateien: faq.tsx, preisrechner.ergebnis.tsx, lieferung-zahlung.tsx, preisrechner.index.tsx, heizoelpreise.index.tsx, agb.tsx. Bild `/img/rechnung.png`. Danach per Suche bestätigen, dass kein „Vorkasse/Vorauskasse“ mehr sichtbar ist.
