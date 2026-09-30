# Bewertungs-Cards im Header wiederherstellen (wie heizoel-landing)

## Hintergrund

Im Referenzprojekt „heizoel-landing" (b304eb11-650b-4000-9d58-b81d047b3099) zeigt die Kopfzeile drei Bewertungs-Cards: Trusted Shops Käuferschutz, Google 4,9/5 (25.000+ Bewertungen) und eKomi 4,9/5 (705 Bewertungen, mit tagesaktuellem „Stand"-Datum). Im aktuellen Projekt (Heizöl Austria) wurden diese beim Rebranding aus dem Header entfernt — Baustein (`src/components/landing/rating-badge.tsx`), die drei Bilder (`public/img/ekomi.webp`, `google-icon.webp`, `trusted-shops-icon.png`) und die Slide-Animation in `src/styles.css` sind aber noch vorhanden und identisch zum Referenzprojekt. Es muss also nur die Einbindung in den Header wiederhergestellt werden.

## Umsetzung

Nur `src/components/landing/site-header.tsx` ändern — 1:1 wie im Referenzprojekt:

1. **Import:** `RatingBadge` aus `./rating-badge` einbinden.
2. **Desktop-Kopfzeile:** Vor dem Link „Preis berechnen" das vollständige Badge (`<RatingBadge />`) plus Trennstrich einfügen (Desktop zeigt die drei Cards nebeneinander, kompakt mit rotierender Anzeige wie bisher).
3. **Mobile-Kopfzeile:** Rechts neben dem Logo das kompakte, rotierende Badge (`<RatingBadge compact />`, nur sichtbar unter md) einfügen — Spaltenlayout des Mobile-Headers bleibt unverändert.
4. **Mobiles Menü (Sheet):** Unten eine abgetrennte Fußzeile (`border-t`, Hintergrund surface) mit dem erweiterten Badge (`<RatingBadge expanded />`) — alle drei Cards untereinander, wie im Referenzprojekt.

Keine Änderungen an `rating-badge.tsx`, Bildern, Styles, Farben oder am Rest des Headers — alle Texte (4,9/5, 25.000+, 705 Bewertungen) und das „Stand"-Datum in de-AT bleiben unverändert vom Baustein geliefert.

## Verifikation

- Build fehlerfrei.
- Playwright: Desktop-Ansicht (1280 px) — drei Cards sichtbar in der Kopfzeile vor „Preis berechnen"; Mobil (390 px) — kompakt rotierendes Badge im Header, erweiterte Cards am Ende des Menüs; keine Konsolenfehler.
