# Bild „Vorauskasse" zu „Rechnung" ändern

## Änderung
- Im Zahlungsbild der Option „Rechnung" wird der Schriftzug „Vorauskasse" unten im dunklen Balken durch „Rechnung" ersetzt.
- Symbol (Dokument mit Stift und Münzen), Farben, Größe und Schriftstil bleiben 1:1 gleich — passend zu den Bildern „EC-Karte" und „Barzahlung".

## Technische Details
- Neue Datei `public/img/rechnung.png` (256×160) aus `vorauskasse.png` erzeugen: unteren Balken mit derselben Balkenfarbe übermalen, „Rechnung" in weißer, fetter Schrift zentriert neu setzen (Pillow, ähnliche Schrift wie bei den anderen Bildern).
- `src/routes/bestellen.tsx`: Bildpfad der Rechnung-Option auf `/img/rechnung.png` umstellen; Original bleibt als Backup erhalten.
- Prüfung: Bild ansehen und Schritt 2 im Browser kontrollieren.
