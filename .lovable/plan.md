# Branding-ID im Checkout ändern

## Ziel
Bestellungen aus dem Checkout werden künftig mit der neuen Branding-Kennung `def740bf-9e8a-4dd1-acf0-bc82afbd8570` an die Panel-Bestellfunktion übermittelt, damit sie im Panel dem richtigen Shop/Branding zugeordnet werden.

## Umsetzung
- `src/lib/panel-orders.ts` (Zeile 6): `BRANDING_ID` von `6e0ae941-5466-4946-afaf-7d44edf6da04` auf `def740bf-9e8a-4dd1-acf0-bc82afbd8570` ändern.
- Das ist die einzige Stelle im Code, an der die Kennung vorkommt — alle Bestellungen (`brandingId` im Payload) nutzen sie automatisch.
- Panel-Endpunkt, Bestellablauf und Zahlungsmethoden bleiben unverändert.

## Prüfung
- Build-Kontrolle (build-errors.log).
- Einmaliger Testaufruf der Panel-Funktion mit der neuen Kennung, um zu bestätigen, dass sie dort bekannt ist und die Bestellung angenommen wird (Hinweis: eine echte Testbestellung erscheint im Panel und löst die Telegram-Nachricht aus).

## Hinweis
Ist die neue Kennung im Panel-Projekt noch nicht angelegt, meldet die Funktion einen Fehler, der im Bestellformular als Hinweis erscheint — dann müsste das Branding zuerst im Panel-Projekt eingerichtet werden.
