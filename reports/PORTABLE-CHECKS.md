# Portable Prüfungen

Ausgeführt am 10.09.2026 im neu zusammengestellten Repository nach Installation aus dem Lockfile (`npm ci --ignore-scripts`). Lokal: macOS, Node.js 26.3.0, Shopify CLI 4.8.0, Python 3.9. Die empfohlene portable Umgebung ist Node.js 24 LTS und Python 3.10+.

| Prüfung | Ergebnis |
|---|---|
| `npm test` | Erfolgreich |
| Shopify Theme Check | 54 Dateien geprüft, keine Beanstandungen |
| Projektprüfung | 66 Theme-Dateien, 10 Produktkonzepte, 13 Seiten, getrennte private Rechteakte |
| Vorschau erzeugen | 29 Routen |
| Vorschau prüfen | 868 lokale Referenzen; eindeutige IDs, ein H1 pro Seite, Bild-Alttexte, deaktivierte E-Mail-/Kaufformulare |
| `npm run theme:package` | Shopify-ZIP unter `release/ost-founding-theme.zip` erzeugt |
| `python3 tools/calculate.py` | Kalkulationsbeispiele mit Excel/Dokumentation abgeglichen |
| `python3 tools/store-setup.py --help` | Hilfetext und explizite `--apply`-Schranke verfügbar |
| Quellen auf lokale Benutzerpfade und typische Token-Muster durchsucht | Keine Treffer in den geteilten Quellen |
| Wortmarken | Sechs SVG-Konzeptvarianten aus der beigefügten Archivo-Schrift erzeugt |
| Frisch entpacktes Projekt-ZIP | Erneut `npm ci --ignore-scripts`, `npm test` und `npm run theme:package` erfolgreich; keine Abhängigkeit vom ursprünglichen Arbeitsordner |
| Store-Hilfe im frisch entpackten Projekt | `--help` ohne vorhandenen temporären Arbeitsordner erfolgreich |

GitHub Actions führt bei Push und Pull Request dieselben Projektprüfungen durch und stellt ein Theme-ZIP als Build-Artefakt bereit. Die Workflow-Datei ist vorbereitet; ihr tatsächlicher Remote-Ausführungsstatus muss in GitHub geprüft werden.

Diese Prüfungen ersetzen keine echte Shopify-Formular-, App-, Checkout- oder Produktionsprüfung. Der Browser wurde lokal bei 390px geprüft; weitere Viewports und echte Shopify-Flows stehen in `docs/BACKLOG.md`. Markenrecht und Unternehmensangaben wurden damit nicht freigegeben.
