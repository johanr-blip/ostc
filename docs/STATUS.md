# Aktueller Projektstand

Stand: 10.09.2026. Diese Datei ist die Übergabe für andere Agenten. Nicht aus dem bloßen Vorhandensein eines Templates auf einen abgeschlossenen Geschäftsprozess schließen.

## Gemeinsamer Arbeitsort

Der vollständige Stand wurde erfolgreich nach https://github.com/johanr-blip/ostc übertragen. `main` und `develop` sind angelegt und ihre Remote-Revisionen wurden geprüft. Das Repository ist öffentlich lesbar; zum Ändern sind passende GitHub-Berechtigungen erforderlich. `AGENTS.md` ist der zentrale Einstieg für alle Modelle. Für dateibasierte Übergaben gibt es zusätzlich ein aus den versionierten Dateien erzeugtes Projekt-ZIP.

## Umgesetzt

- Natives Shopify-Theme mit OSTMANN-/OSTFRAU-Collection-Links, Editorial-Hero, Produktkarten, Haltung, Archiv, Stimmen, Orten, Footer und responsiven Ansichten.
- Produkt-, Collection-, Cart-, Seiten-, Such-, Passwort-, 404- und Metaobject-Templates.
- Native Shopify-Formulare vorbereitet. Warteliste und Verkauf im Grundzustand deaktiviert.
- Produktzustände `waitlist`, `preorder`, `live`, `sold_out` und `archived` sind im Theme umgesetzt. Preorder verwendet ausschließlich Shopify-Purchase-Option-App-Blöcke und erfordert Selling Plan, Lieferfenster sowie gesonderte Freigaben; eine App ist noch nicht installiert oder getestet.
- Warenkorb und Produktseite verweigern Kauf/Checkout bei Waitlist, Sold-out, Archiv oder unvollständiger Preorder-Konfiguration. Produkte bleiben zusätzlich serverseitig DRAFT, Bestand null und DENY.
- Sieben ursprüngliche KI-Konzeptbilder plus zwei gewünschte Haar-/Augenfarbenvarianten: OSTFRAU hellblond mit blauen Augen, OSTMANN dunkelblond. Die aktuellen Hero-WebPs verwenden die Varianten; ursprüngliche PNGs bleiben erhalten. Lokale Archivo-Schrift und Provenienzdokumentation liegen bei.
- Shopify: zehn Produktentwürfe, drei Collections, 13 neue Seiten, vier Metaobject-Definitionen und zehn Produkt-Metafield-Definitionen vorhanden. Die Weiterentwicklung wurde als separates Theme `205894418769` unveröffentlicht hochgeladen; das Live-Theme blieb unangetastet.
- Zentrale Produktdatenbank `content/product-master.json` mit 20 Produkten und 63 Varianten, exakten vorhandenen Shopify-IDs, internen SKUs, Status-/Verkaufsmodi, Lieferantenfeldern und kostenabhängigen Deckungsbeiträgen. Zehn spätere Produkte sind nur Planung und wurden nicht in Shopify angelegt.
- Produktbeschreibungen, Damenseite/OSTFRAU, Preise, Domain, Footer, FAQ, Versand- und Drop-Inhalte auf den neuen Stand gebracht. Die frühere Claim-Zeile wird nicht mehr verwendet.
- Native Newsletter-Anmeldung mit Einwilligung, Produktinteresse und Linienpräferenz vorbereitet; bis zum echten Double-Opt-in-Test gesperrt.
- Sicheres Updateskript für die vorhandenen Draft-Produkte und unveröffentlichten Seiten vorbereitet. Es verweigert unerwartet veröffentlichte Ziele und veröffentlicht selbst nichts.
- Separate interne Rechteakte mit Storefront-Zugriff NONE.
- Kalkulation, Markengrundlage, Launchplan, Originalbrief und modellunabhängige Entwicklerübergabe.

## Remote-Stand

`config/store.json` und `config/shopify-resources.json` enthalten die tatsächlichen IDs. `ostolz.de` zeigt auf Shopify. Das bisherige OST-Theme `205871546705` ist live; Horizon `205868663121` ist unveröffentlicht. Für diese Weiterentwicklung wurde das neue Prüf-Theme `205894418769` unveröffentlicht hochgeladen. Neue Produkte sind DRAFT mit Bestand null und DENY. Neue Seiten sind unveröffentlicht. Die vorhandene Standardseite `contact` bleibt erhalten.

Das Theme wurde am 10.09.2026 nach erfolgreicher lokaler und Shopify-Liquid-Prüfung auf die getrennte unveröffentlichte Theme-ID `205894418769` übertragen. Das Live-Theme wurde nicht überschrieben.

Die private lokale Vorschau zeigt diese Inhalte mit Beispieldaten. Die direkte Shopify-Vorschau kann aufgrund von Shop-Passwort und Draft-Sichtbarkeit abweichen. Produktbilder sind noch nicht an die Shopify-Produktressourcen hochgeladen. Nicht alle lokal sichtbaren Seiten sind im echten Storefront aufrufbar.

## Tatsächlich geprüft

- Shopify CLI 4.8.0 Theme Check: 54 Theme-Dateien ohne Fehler und Warnungen im aktuellen Stand.
- Shopify-Liquid-Validator: 14 geänderte Theme-Dateien erfolgreich validiert (Revision 2).
- Verwendete Admin-GraphQL-Operationen vor Ausführung gegen Schema 2026-07 validiert.
- Ressourcen nach Anlage über Admin API gelesen: zehn DRAFT-Produkte, Bestand null; alle neuen Seiten unpublished.
- Lokale Browserprüfung des Markenwechsels: OSTFRAU-URL, Beschriftung, Hero und Produkte wechseln. Bilddateien laden. Mobile 390px hatte keine horizontale Überbreite.
- Produkt-Master-Arbeitsmappe: Formeln ausgewertet, keine Formel-Fehler gefunden; alle vier Blätter visuell geprüft. Gewinne bleiben leer, bis Produkt-, Druck-, Fulfillment-/Verpackungs- und Versandkosten vollständig sind.
- Weitere portable Checks und Repository-Prüfungen: siehe `reports/PORTABLE-CHECKS.md`.

## Nicht abgeschlossen

Keine rechtliche Markenfreigabe oder finalen Unternehmensdaten. Keine physischen Muster oder endgültige Lieferanten-/Varianten-Zuordnung. Keine bestätigten Einkaufskosten, Lieferzeiten oder Ausgabenfreigabe. Keine echte Newsletter-Anmeldung/DOI-Testmail, kein Preorder-App-Test, keine Zahlungs-/Checkoutprobe, keine veröffentlichungsfähigen Archiv-/Stimmen-Beiträge. Rechtstexte sind ausdrücklich Aufbau-Platzhalter. Die Admin-Synchronisation der neuen Texte und Preise konnte nicht ausgeführt werden, weil die Shopify-OAuth-Bestätigung zweimal ablief; lokal und im unveröffentlichten Theme ist der neue Stand vorhanden.

## Sinnvoller nächster Schritt

Für technische Arbeit: Shopify-CLI autorisieren, `node tools/update-existing-store.mjs --apply` ausführen und anschließend die echte Shopify-Vorschau prüfen. Für Geschäftsvorbereitung: Shirtigo-Zuordnung und Muster konkret beauftragen, sobald Budget, Varianten und Lieferdaten feststehen. Die vollständige Reihenfolge steht in `docs/OPERATIONS.md`.

Beim Übernehmen Remote-Stand erneut prüfen. Lokale Authentifizierung ist nicht Bestandteil des Repositorys.
