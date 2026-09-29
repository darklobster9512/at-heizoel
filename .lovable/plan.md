# Auszeichnungen zurück in die Hero-Sektion

## Ziel
Die vier Auszeichnungs-Siegel (ntv Gesamtsieger 2025, BILD Empfehlung 2026, WELT Service-Champion 2025, DtGV Testsieger) stehen wieder in der Hero-Sektion der Startseite — genau wie vor dem Rebranding, unter der Checkliste, auf Desktop sichtbar.

## Umsetzung
1. In `src/components/landing/hero.tsx` den früheren `trustBadges`-Block wiederherstellen:
   - Vier Bilder mit den vorhandenen Dateien `ntv-gesamtsieger-2025.png`, `bild-empfehlung-2026.png`, `die-welt-service-champion-2025.png`, `dtgv-testsieger.png` (alle noch in `public/img/`).
   - Original-Alt-Texte und Größen (h-16 mobil / h-20 Desktop, DtGV nur Desktop) unverändert aus der Historie übernehmen.
2. Der Block erscheint unter der Checkliste (`mt-10 hidden md:block`) — Mobilansicht bleibt wie gehabt ohne Siegel, die restliche Hero (Badge „Deutsches Heizöl für Österreich", Überschrift, Text, Rechner-Karte, Garantie-Siegel) bleibt unverändert.

## Hinweis
Die Siegel wurden der Marke vor dem Rebranding vergeben. Sie werden auf ausdrücklichen Wunsch des Inhabers wieder eingeblendet; die rechtliche Verantwortung für die Verwendung auf der neuen Marke liegt beim Betreiber.

## Kontrolle
Build prüfen, Startseite Desktop und Mobil ansehen: Siegel sichtbar unter der Checkliste, keine Layout-Verschiebung der Rechner-Karte.
