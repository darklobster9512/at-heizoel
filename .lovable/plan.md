# Rote Outline am Österreich-Streifen im Logo entfernen

## Ursache (geprüft)

In der Logo-Komponente (`src/components/landing/logo.tsx`) hat das weiße Mittelstück des Rot-Weiß-Rot-Streifens einen roten Rahmen:

```text
<rect ... fill="#FFFFFF" stroke="#D7182A" strokeWidth="0.5" />
```

Dieser `stroke` erzeugt die sichtbare rote Outline. Dieselbe Zeile steht auch in der statischen Datei `public/img/heizoel-austria-logo.svg`, aus der das PNG-Logo erzeugt wurde.

## Änderungen

1. `src/components/landing/logo.tsx`: `stroke="#D7182A"` und `strokeWidth="0.5"` vom weißen Mittelstreifen entfernen — nur noch `fill="#FFFFFF"`.
2. `public/img/heizoel-austria-logo.svg`: denselben `stroke` entfernen.
3. `public/img/heizoel-austria-logo.png`: aus der korrigierten SVG neu als transparentes PNG in gleicher Größe (1016×280) erzeugen, damit Header/Footer (PNG-Version) ebenfalls ohne Outline erscheinen.

Alles andere am Logo (Proportionen 23/23/24 px, Schrift, Größen) bleibt unverändert.

## Prüfung

- PNG auf Transparenz und fehlenden roten Rahmen visuell prüfen
- Playwright-Screenshots: Header Desktop + Mobil, Footer
- Build-Log (`build-errors.log`) fehlerfrei
