# Aktueller Projektstand

Stand: 10.09.2026. Diese Datei ist die Übergabe für andere Agenten. Nicht aus dem bloßen Vorhandensein eines Templates auf einen abgeschlossenen Geschäftsprozess schließen.

## Gemeinsamer Arbeitsort

Der vollständige Stand wurde erfolgreich nach https://github.com/johanr-blip/ostc übertragen. `main` und `develop` sind angelegt und ihre Remote-Revisionen wurden geprüft. Das Repository ist öffentlich lesbar; zum Ändern sind passende GitHub-Berechtigungen erforderlich. `AGENTS.md` ist der zentrale Einstieg für alle Modelle. Für dateibasierte Übergaben gibt es zusätzlich ein aus den versionierten Dateien erzeugtes Projekt-ZIP.

## Umgesetzt

- Natives Shopify-Theme mit OSTMANN-/OSTFRAU-Collection-Links, Editorial-Hero, Produktkarten, Haltung, Archiv, Stimmen, Orten, Footer und responsiven Ansichten.
- Produkt-, Collection-, Cart-, Seiten-, Such-, Passwort-, 404- und Metaobject-Templates.
- Native Shopify-Formulare vorbereitet. Warteliste und Verkauf im Grundzustand deaktiviert.
- Preorder-Integration über App-Blöcke vorgesehen, aber keine App installiert oder getestet.
- Die drei Produktzustände Warteliste, Preorder und Live sind vorgesehen; die Bundle-Section kann echte Shopify-Bundle-Produkte verlinken. Diese Bundle-Produkte sind noch nicht angelegt.
- Sieben KI-Konzeptbilder, optimierte Bilddateien, lokale Archivo-Schrift und Provenienzdokumentation.
- Shopify: Theme `205871546705` unveröffentlicht hochgeladen, zehn Produktentwürfe, drei Collections, 13 neue Seiten, vier Metaobject-Definitionen und zehn Produkt-Metafield-Definitionen erstellt.
- Separate interne Rechteakte mit Storefront-Zugriff NONE.
- Kalkulation, Markengrundlage, Launchplan, Originalbrief und modellunabhängige Entwicklerübergabe.

## Remote-Stand

`config/store.json` und `config/shopify-resources.json` enthalten die tatsächlichen IDs. Horizon `205868663121` ist live und wurde nicht bearbeitet. Neue Produkte sind DRAFT mit Bestand null und DENY. Neue Seiten sind unveröffentlicht. Die vorhandene Standardseite `contact` bleibt erhalten.

Das Theme wurde am 10.09.2026 erneut aus der gemeinsamen Repository-Struktur erfolgreich auf dieselbe unveröffentlichte Theme-ID übertragen.

Die private lokale Vorschau zeigt diese Inhalte mit Beispieldaten. Die direkte Shopify-Vorschau kann aufgrund von Shop-Passwort und Draft-Sichtbarkeit abweichen. Produktbilder sind noch nicht an die Shopify-Produktressourcen hochgeladen. Nicht alle lokal sichtbaren Seiten sind im echten Storefront aufrufbar.

## Tatsächlich geprüft

- Shopify CLI 4.8.0 Theme Check: ohne Fehler und Warnungen im initialen Upload-Stand.
- Shopify-Liquid-Skill-Validator: 56 Quell-/Konfigurationsdateien erfolgreich validiert; Bericht in `reports/theme-validation.txt`.
- Verwendete Admin-GraphQL-Operationen vor Ausführung gegen Schema 2026-07 validiert.
- Ressourcen nach Anlage über Admin API gelesen: zehn DRAFT-Produkte, Bestand null; alle neuen Seiten unpublished.
- Lokale Browserprüfung des Markenwechsels: OSTFRAU-URL, Beschriftung, Hero und Produkte wechseln. Bilddateien laden. Mobile 390px hatte keine horizontale Überbreite.
- Excel: Formeln ausgewertet, keine Formel-Fehler gefunden; alle drei Blätter visuell geprüft. Rechenbeispiele stimmen mit `docs/ECONOMICS.md` überein.
- Weitere portable Checks und Repository-Prüfungen: siehe `reports/PORTABLE-CHECKS.md`.

## Nicht abgeschlossen

Keine rechtliche Markenfreigabe, finale Unternehmensdaten oder Domain. Keine physischen Muster oder endgültige Lieferanten-/SKU-Auswahl. Kein bestätigtes Ausgabenbudget. Keine echte Newsletter-Anmeldung/DOI-Testmail, kein Preorder-App-Test, keine Zahlungs-/Checkoutprobe, keine veröffentlichungsfähigen Archiv-/Stimmen-Beiträge. Rechtstexte sind ausdrücklich Aufbau-Platzhalter.

## Sinnvoller nächster Schritt

Für technische Arbeit: `docs/BACKLOG.md` → vollständige echte Shopify-Vorschau inklusive Produktmedien und kontrollierter Sichtbarkeit im geschützten Shop. Für Geschäftsvorbereitung: Markenprüfung und neun Muster konkret beauftragen, sobald Budget und Lieferdaten feststehen.

Beim Übernehmen Remote-Stand erneut prüfen. Lokale Authentifizierung ist nicht Bestandteil des Repositorys.
