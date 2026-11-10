# Zahlungsart „Rechnung" korrekt an das Bestellsystem senden

## Änderung
- Wählt der Kunde „Rechnung", kommt beim Bestellsystem künftig `rechnung` an statt `vorkasse`.
- EC-Karte (`ec`) und Barzahlung (`bar`) bleiben unverändert.

## Technische Details
- `src/routes/bestellen.tsx`: Kennung der Option von `"vorkasse"` auf `"rechnung"` ändern (wird als `paymentMethod` gesendet).
- Alte gespeicherte Bestellentwürfe mit `vorkasse` beim Laden auf `rechnung` umstellen, damit die Auswahl nicht verloren geht.
- Prüfung: Testbestellung mit Rechnung bis zum Absenden durchspielen und gesendeten Wert kontrollieren.

## Nicht Teil dieser Änderung
Infotexte auf anderen Seiten (Startseite-Konditionen, FAQ, Lieferung & Zahlung, Preisvergleich, AGB) nennen noch „Vorkasse" — auf Wunsch separat anpassbar.
