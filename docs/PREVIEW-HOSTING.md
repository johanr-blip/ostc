# Optionale private Designvorschau

`preview/dist/` enthält die vollständige portable statische Vorschau. Alle Agenten können sie mit `npm run preview` lokal ansehen. Für lokale Weiterarbeit ist kein Sites-Zugang erforderlich.

Zusätzlich wurde eine ausschließlich für den Eigentümer zugängliche Sites-Vorschau vorbereitet. Die nicht geheimen Zuordnungen liegen in `config/preview-hosting.json`. Zugangsdaten werden nicht mitgeliefert. Dieser Dienst ersetzt nicht den Shopify-Shop.

Zur Aktualisierung durch einen Agenten mit Sites-Zugang: zuerst `npm run preview:build` und `npm run test:preview` ausführen. Einen separaten Exportordner mit `dist/` aus `preview/dist/` und `.openai/hosting.json` anlegen. In die Manifestdatei nur die bestehende `project_id` aus der Konfiguration sowie `"static":{"directory":"dist"}` übernehmen. Bestehendes Projekt verwenden; keine zweite Site erstellen. Die Quellrevision des separaten Sites-Exports ist von der GitHub-Revision verschieden.

Aktuellen Status und Eigentümerzugriff im Dienst prüfen. Für Upload, Paketierung und private Bereitstellung dessen vorgesehenen Ablauf verwenden. Tokens bleiben außerhalb von Dateien und Repository. Keine automatische Bereitstellung durch diesen GitHub-Workflow: er prüft nur und erstellt das Theme-ZIP.

Die lokale Vorschau deaktiviert Kundendatenerfassung und Checkout. Sie bleibt eine Designvorschau mit Beispieldaten, auch wenn sie privat gehostet wird.
