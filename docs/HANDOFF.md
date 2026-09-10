# Einstieg für ein anderes KI-Modell

Dieses Projekt ist ohne die bisherige Chat-Unterhaltung weiterbearbeitbar. Übergib einem Agenten den Repository-Link und beispielsweise diesen Auftrag:

> Arbeite im Repository https://github.com/johanr-blip/ostc. Lies zuerst AGENTS.md, docs/STATUS.md, docs/BACKLOG.md und docs/DECISIONS.md. Prüfe den aktuellen Git- und Shopify-Stand, bevor du etwas überschreibst. Starte die lokale Vorschau mit den Befehlen aus README.md und bearbeite dann die vereinbarte Aufgabe. Bewahre das unveröffentlichte OST-Theme, die Verkaufs-/Newsletter-Sperren und die vorhandenen Shopify-Ressourcen. Hinterlasse Änderungen, tatsächlich ausgeführte Tests und offene Punkte in der Dokumentation. Keine Zugangsdaten ins Repository.

Für eine klar begrenzte Aufgabe den letzten Satz ergänzen, etwa: „Übernimm jetzt den Shopify-Produktmedien-Upload und prüfe die Produktseiten im unveröffentlichten Theme.“

## Was übertragbar ist

Quellcode, optimierte und ursprüngliche Bilder, exakte Bildprompts, Schriftlizenz, alle Produkt-/Seitendaten, Metaobject-/Metafield-Schemata, nicht geheime Ressourcen-IDs, dokumentierte GraphQL-Operationen, Kalkulation, Marken-/Launchkonzept und Prüfberichte.

## Was nicht automatisch übertragen wird

GitHub-/Shopify-Logins, private Browser-Cookies, Kontoberechtigungen und kostenpflichtige Anbieterzugänge. Neue Agenten müssen in ihrer eigenen Umgebung den vorgesehenen Login verwenden. Lokale Dateien unter `work/` sind temporär und nicht notwendig, um Theme und Vorschau zu starten.

## Kalkulation bearbeiten

Die zentrale Produkt- und Kalkulationsquelle ist `content/product-master.json`. Sie enthält Produktstatus, Supplier-Zuordnung, Shopify- und Supplier-IDs, Varianten, SKUs, Preise und Kostenfelder. Die daraus erzeugte Excel-Fassung bleibt normal editierbar; Änderungen müssen anschließend bewusst in den Produkt-Master zurückgeführt werden. `tools/finance-inputs.json` und `docs/OST-Kalkulation.xlsx` sind nur noch historische Ausgangsrechnungen.

## Daten ändern

`content/products.json` und `content/pages.json` enthalten die redaktionellen Texte. Preise, Varianten- und operative Produktdaten kommen aus `content/product-master.json`. Sie synchronisieren nicht automatisch mit Shopify. Ein Agent muss Änderungen gezielt auf vorhandene IDs anwenden, Fehler prüfen und danach den Remote-Stand dokumentieren. Der erneute CSV-Import oder eine komplette Erstinitialisierung ist kein allgemeiner Update-Prozess.
