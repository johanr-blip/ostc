# OST. — VON HIER.

Gemeinsame, modellunabhängige Projektbasis für die Modemarke OST und ihr Shopify-Theme. Dieses Repository enthält den vollständigen Entwicklungsstand einschließlich Bildern, Inhalten, Datenmodellen und Übergabe. Kein Codex-, Claude- oder Gemini-Abonnement ist zum lokalen Start erforderlich.

**Status: Entwicklungsstand, kein verkaufsfertiger Launch.** Das bisherige OST-Theme ist im verbundenen Shopify-Shop live, Verkauf und Newsletter bleiben jedoch im Theme gesperrt. Die weitere Entwicklung erfolgt auf einer getrennten, unveröffentlichten Prüfversion. Produkte und neue Seiten sind Entwürfe. Siehe [aktuellen Status](docs/STATUS.md).

## Für einen neuen Agenten

1. [AGENTS.md](AGENTS.md) lesen.
2. [STATUS.md](docs/STATUS.md) und [BACKLOG.md](docs/BACKLOG.md) prüfen.
3. `npm ci` und `npm run check` ausführen.
4. `npm run preview:build` und `npm run preview` starten.
5. Die gewünschte Aufgabe bearbeiten; Status und Testergebnisse aktualisieren.

Der Originalauftrag steht vollständig in [PROJECT_BRIEF.md](docs/PROJECT_BRIEF.md). Bereits getroffene Entscheidungen stehen in [DECISIONS.md](docs/DECISIONS.md). Die Daten in `config/shopify-resources.json` sind Ressourcen-IDs, keine Zugangsdaten.

## Lokal starten

Voraussetzungen: Node.js 22.12+ oder 24 LTS, npm, Python 3.10+, Git.

```sh
git clone https://github.com/johanr-blip/ostc.git
cd ostc
npm ci
npm run check
npm run preview:build
npm run preview
```

Vorschau: `http://localhost:4173`. Sie verwendet die tatsächlichen Liquid-Sections mit lokalen Beispieldaten. Sie bildet Shopify-Checkout, echte Formulare, App-Blocks und Liquid-Runtime nicht vollständig ab. In der Vorschau werden keine Anmeldungen oder Käufe verarbeitet.

## Shopify

- Shop: `ajfwfu-ih.myshopify.com`
- Prüf-Theme: `205894418769`, **unpublished**
- [Theme-Editor](https://ajfwfu-ih.myshopify.com/admin/themes/205894418769/editor)
- [Shopify-Theme-Vorschau](https://ajfwfu-ih.myshopify.com?preview_theme_id=205894418769)
- Live-Theme: `205871546705`, **OST — Founding Drop 001**
- Horizon: `205868663121`, **unpublished am 10.09.2026**

Authentifizierung erfolgt je Rechner und Benutzer. Eine Plugin-Verbindung oder Chat-Authentifizierung ist nicht automatisch auf andere Modelle/Rechner übertragbar. Niemals Tokens aus einer bestehenden Sitzung exportieren.

```sh
npm run shopify -- theme list --store ajfwfu-ih.myshopify.com --json
npm run shopify -- theme dev --store ajfwfu-ih.myshopify.com --theme 205894418769 --path theme
```

Für Admin-Datenzugriff und sichere Übertragung siehe [SHOPIFY.md](docs/SHOPIFY.md). Der vollständige Muster-, Newsletter-, Preorder-, Zahlungs- und Veröffentlichungsablauf steht in [OPERATIONS.md](docs/OPERATIONS.md). `npm run theme:push` aktualisiert ausschließlich das festgelegte unveröffentlichte OST-Theme und prüft dessen Rolle zuvor. Der Befehl veröffentlicht das Theme nicht.

## Dateien

| Pfad | Inhalt |
|---|---|
| `theme/` | Shopify Online Store 2.0: Liquid, Sections, JSON-Templates, CSS, Vanilla JS |
| `content/` | Zentraler Produkt-Master, Produkttexte, Seiten, Metafields und Metaobject-Definitionen |
| `assets/` | Ursprüngliche KI-Konzeptbilder, Prompt-Nachweise und Schriftlizenz |
| `theme/assets/` | Optimierte WebP-Bilder und lokal geladene Schrift |
| `tools/` | Vorschau, Prüfungen, Upload und Admin-Datenwerkzeuge |
| `config/` | Nicht geheime Shop- und Ressourcen-Zuordnung |
| `preview/dist/` | Erzeugte lokale Designvorschau |
| `docs/` | Brief, Marke, Launch, Kalkulation, Architektur und Übergabe |
| `reports/` | Tatsächlich ausgeführte Prüfungen |

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm run check` | Shopify Theme Check, JS-Syntax, statische Struktur und Sicherheitsprüfungen |
| `npm run preview:build` | Vorschau aus Theme und Inhalten neu erzeugen |
| `npm run preview` | Lokalen Server starten |
| `npm run test:preview` | Links, Bilder, IDs und Kauf-/Formularsperre in der Vorschau prüfen |
| `npm run theme:package` | Nur Shopify-Theme-Dateien als ZIP unter `release/` erzeugen |
| `npm run theme:push` | Geprüftes Theme auf das bekannte unveröffentlichte Theme übertragen |

## Zusammenarbeit

`main` enthält den geprüften gemeinsamen Stand; `develop` dient der integrierten Entwicklung. Neue Feature-Branches von `develop` abzweigen und dorthin zurückführen; geprüfte Zwischenstände nach `main` übernehmen. Ein Agent pro Branch/Arbeitsverzeichnis, keine parallelen Uploads auf dieselbe Theme-ID. Vor einem Upload den aktuellen Remote-Stand prüfen und Änderungen aus dem Theme-Editor sichern. Keine Force-Pushes und keine unaufgeforderten Live-Veröffentlichungen. [CONTRIBUTING.md](CONTRIBUTING.md) beschreibt die Übergabe.

## Rechte und Bilder

Die Bilder sind **KI-generierte Designkonzepte**, keine dokumentierten Produkte, Kunden oder historischen Personen. Archivporträts sind nicht enthalten. Die Wortmarken OST, OSTMANN und OSTFRAU sind nicht markenrechtlich freigegeben. Es wird keine Open-Source-Lizenz für die Marke oder die Projektinhalte erteilt. Die Schrift Archivo steht unter SIL OFL; siehe `assets/Archivo-OFL.txt`.

## Wirtschaftlichkeit

[OST-Kalkulation.xlsx](docs/OST-Kalkulation.xlsx) enthält veränderbare Kostenannahmen, Deckungsbeiträge und Break-even. Aktuelle Katalogpreise sind von unbestätigten Versand-, Payment-, Retouren- und Lizenzkosten getrennt. Fehlende Kosten erzeugen keine scheinbar positiven Margen. Die Berechnungen sind auch in [ECONOMICS.md](docs/ECONOMICS.md) nachvollziehbar.
