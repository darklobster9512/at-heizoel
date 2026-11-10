# Zahlungsarten im Bestellformular anpassen

## Änderungen (Schritt 2, /bestellen)
1. **Vorkasse → Rechnung**: Bezeichnung wird „Rechnung", Beschreibung „Bequem per Rechnung bezahlen."
2. **Hinweis entfernen**: „50% Anzahlung sichert Tagespreis" verschwindet bei Barzahlung und EC-Karte.
3. **Reihenfolge**: EC-Karte steht ganz oben, danach Barzahlung, dann Rechnung.
4. **Vorauswahl**: EC-Karte ist beim Öffnen automatisch ausgewählt.

Preise, Bestellabsendung und die ausgeblendeten Klarna-Optionen bleiben unverändert.

## Technische Details
- `src/routes/bestellen.tsx`: `PAYMENT_OPTIONS` umsortieren (ec, bar, vorkasse), `hint` bei bar/ec entfernen, Label/Desc bei `vorkasse` ändern.
- Interne Kennung `vorkasse` bleibt, damit die Panel-Anbindung weiter funktioniert (nur die Anzeige ändert sich).
- `useState("vorkasse")` → `useState("ec")`.
- Prüfung im Browser: Schritt 2 zeigt EC-Karte oben und vorausgewählt, keine Anzahlungshinweise.
