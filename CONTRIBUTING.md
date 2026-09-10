# Zusammenarbeit

## Arbeitsablauf

1. Repository aktualisieren und `git status` lesen.
2. Eigenen Branch anlegen, etwa `feature/product-gallery`.
3. Aufgabenbereich in der Übergabe benennen. Bei mehreren Agenten getrennte Checkouts verwenden.
4. Kleine, nachvollziehbare Änderungen machen. Keine personenbezogenen Daten oder Secrets committen.
5. `npm run check`, Vorschau erzeugen und passende Tests ausführen.
6. `docs/STATUS.md`, `docs/BACKLOG.md` und `docs/CHANGELOG.md` ergänzen.
7. Commit und Pull Request oder bewusst abgestimmter Merge. Keine unkoordinierten parallelen Shopify-Uploads.

## Was eine Übergabe enthalten muss

- Ausgangsstand und Ziel.
- Geändertes Verhalten mit relevanten Dateien.
- Ausgeführte Prüfungen und Ergebnisse.
- Nicht ausgeführte Prüfungen und Grund.
- Externe Änderungen: Shop, Theme-ID, Ressourcen, Publikationsstatus.
- Offene Fragen und nächste Aufgabe.

## Authentifizierung

GitHub- und Shopify-Sitzungen bleiben auf dem jeweiligen Rechner. Andere Modelle erhalten Quellcode und Dokumentation, nicht automatisch dieselben Berechtigungen. CLI-Logins sind der vorgesehene Weg. Keine Tokens in Issues, PRs, Chat-Nachrichten oder `.env`-Dateien im Repository.

## Konflikte und Theme-Editor

Shopify Theme Editor kann `config/settings_data.json` und JSON-Templates ändern. Vor Uploads auf `205871546705` einen Remote-Abzug in ein separates Arbeitsverzeichnis machen und Unterschiede prüfen. Nie einen fremden Stand durch einen pauschalen Pull oder Push überschreiben. Das Guard-Script prüft die Theme-Rolle, ersetzt aber keine inhaltliche Konfliktprüfung.
