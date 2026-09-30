# Abstand zwischen Hero und Preis-Übersicht-Karte erhöhen

## Ziel
Die Karte „Heizöl Preis-Übersicht" direkt unter der Hero-Section wird etwas nach unten verschoben, damit zwischen Hero und Karte wieder sichtbarer Abstand entsteht.

## Umsetzung (Nur Abstände, keine Inhalte)
- `src/components/landing/sections.tsx`, Komponente `ConditionsBox` (Desktop-Variante, `hidden md:block`):
  - Wrapper: `pb-12` → `pt-6 pb-12` (Desktop-Oberabstand ergänzen, mobile Variante unangetastet).
- Falls der Abstand in der Vorschau zu gering wirkt, wird der Wert beim Verifizieren in der Vorschau feinjustiert (z. B. `pt-8`).

## Verifizierung
- Build prüfen (build-errors.log).
- Startseite in der Vorschau ansehen: Abstand zwischen Hero-Karte und Preis-Übersicht-Karte sichtbar, alle Inhalte der Karte unverändert.
