# Awards: Domain-Text auf heizoel-austria.at umstellen

## Ausgangslage
Die vier Hero-Awards (ntv, BILD, WELT, DtGV) sind PNG-Bilder unter `public/img/`. Drei davon zeigen den Text „heizoel-deutschland.com":
- `ntv-gesamtsieger-2025.png` („Anbieter: www.heizoel-deutschland.com")
- `bild-empfehlung-2026.png` („heizoel-deutschland.com" unter HÖCHSTE EMPFEHLUNG)
- `die-welt-service-champion-2025.png` (Band „heizoel-deutschland.com")

Das DtGV-Siegel (`dtgv-testsieger.png`) enthält keine Shop-Domain (nur dtgv.de des Prüfinstituts) und bleibt 1:1 erhalten.

## Umsetzung
1. Drei Bilder einzeln per Bildbearbeitung (edit) anpassen — nicht neu erfinden: Nur der Domain-Text wird in jedem Bild auf „www.heizoel-austria.at" bzw. „heizoel-austria.at" geändert. Layout, Farben, Schriften, Sterne, Logos, Jahreszahlen und Hintergrund bleiben identisch (originaler weißer Hintergrund, kein schwarzer Background, keine Umgestaltung).
2. Dateien unter denselben Pfaden speichern (`public/img/ntv-gesamtsieger-2025.png`, `bild-empfehlung-2026.png`, `die-welt-service-champion-2025.png`), damit der Hero unverändert bleibt.
3. Wenn die Textänderung per Edit nicht sauber lesbar gelingt: Neugenerierung im identischen Design (premium-Qualität für Textschärfe) unter gleichem Dateipfad.
4. Prüfung: Alle drei Siegel im Hero ansehen (Desktop + Mobil), Text lesbar, Hintergrund wie bisher, keine Layout-/Größenänderung; Build-Fehlerlog prüfen.

## Nicht ändern
- DtGV-Siegel, Größe/Anordnung der Awards im Hero, Alt-Texte, restliche Seite.
