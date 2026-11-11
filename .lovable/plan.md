# Zahlungsarten im Seitenfuß: Vorauskasse → Rechnung

- Im Seitenfuß unter „Zahlungsarten“ das Bild „Vorauskasse“ durch das bereits erstellte „Rechnung“-Bild ersetzen (gleiche Größe, gleicher Platz).
- Reihenfolge wie im Bestellformular: EC-Karte, Barzahlung, Rechnung.
- In der Preis-Übersicht-Karte steht noch „Zahlungsarten: Vorkasse, Bar, EC-Karte“ — wird zu „EC-Karte, Bar, Rechnung“.

## Technisch
- `src/components/landing/sections.tsx`: Asset auf `/img/rechnung.png`, alt „Rechnung“; Zeile 40 Text anpassen. Alte Datei `vorauskasse.png` bleibt liegen.
