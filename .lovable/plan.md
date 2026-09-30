# Anzahlungshinweis bei Barzahlung ergänzen

## Hintergrund
Bei den Zahlungsarten auf /bestellen trägt nur EC-Karte den Hinweis „50% Anzahlung sichert Tagespreis". Das Referenzprojekt (heizoel-landing) zeigt denselben Hinweis auch bei Barzahlung.

## Änderung
In `src/routes/bestellen.tsx`, Array `PAYMENT_OPTIONS`, bei der Option `{ id: "bar", label: "Barzahlung", ... }` das Feld ergänzen:

```ts
{ id: "bar", label: "Barzahlung", desc: "Direkt bei Lieferung bezahlen.", icon: barzahlung, hint: "50% Anzahlung sichert Tagespreis" },
```

Sonst nichts ändern — keine Anpassung an Bestelllogik, Zahlungsablauf oder anderen Optionen.

## Verifikation
Build prüfen; auf /bestellen kontrollieren, dass der Hinweis unter Barzahlung erscheint (Desktop und mobil).
