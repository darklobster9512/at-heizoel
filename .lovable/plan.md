# Meta-Pixel-ID ändern

## Ziel
Das siteweite Meta-Pixel wird künftig mit der neuen ID `2326726354768212` geladen (bisher `1078017144584283`).

## Umsetzung
Datei `src/routes/__root.tsx` — die alte ID kommt nur dort vor (2 Stellen):
1. Zeile 136 (Inline-Script im head): `fbq('init', '1078017144584283')` → `fbq('init', '2326726354768212')`
2. Zeile 186 (noscript-Fallback-Bild): `facebook.com/tr?id=1078017144584283` → `...?id=2326726354768212`

Alle anderen Pixel-Aufrufe (PageView, Lead-Track) bleiben unverändert — sie nutzen automatisch die neue ID.

## Prüfung
- Build-Kontrolle (build-errors.log).
- Browser-Check: Pixel-Script im Seitenquelltext enthält nur die neue ID, `fbq('init', '2326726354768212')` und PageView-Track sind vorhanden.
