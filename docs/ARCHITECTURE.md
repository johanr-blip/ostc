# Architektur

## Auslieferung

`theme/` ist ein natives Shopify OS 2.0 Theme. `layout/theme.liquid` bindet Header-/Footer-Section-Gruppen, Shopify Header-Inhalte und Seitentemplates ein. JSON-Templates stellen modulare Sections zusammen. Gemeinsame Marke und Links liegen in `config/settings_schema.json` und den zugehörigen Einstellungswerten.

`tools/render-preview.mjs` rendert dieselben Sections mit LiquidJS und lokalen Produkt-/Seitendaten. Einige Shopify-Tags und Filter werden nur für die Ansicht nachgebildet. Das ist eine Design- und Navigationstestfläche, kein Headless-Shop. Keine Checkout-API, keine Kundendatenbank und kein eigener E-Mail-Versand.

Die veröffentlichbare Shopify-Quelle liegt ausschließlich in `theme/`. `preview/dist/` kann jederzeit regeneriert werden. Bilder in `theme/assets/` sind optimierte WebP-Dateien. Originale und Provenienz liegen in `assets/`. Archivo wird lokal geladen; keine Google-Fonts-Netzwerkanfrage im Shop.

## Markenwechsel

`snippets/ost-switch.liquid` verlinkt echte Collections. `ost-line.liquid` ermittelt die aktuelle Welt anhand von Collection-Template, zugeordneter Collection oder Produkt-Metafield. Kein automatisches Redirect einer direkt angefragten URL. Die interne Kennung `ostmann`/`ostfrau` ist stabil; sichtbare Namen sind zentral einstellbar. Bei Umbenennung zusätzlich redaktionelle Produkt-/Seitentitel sowie Weiterleitungen in Shopify anpassen.

## Verkaufszustände

Der Produktmodus kommt aus `ost.sale_mode`, mit globalem Fallback. Global `waitlist` oder `commerce_ready=false` erzwingt Warteliste. Im Live-Modus werden Varianten serverseitig mit `?variant=` ausgewählt und Shopify-Produktformulare verwendet. Ohne JavaScript steht ein eigener Varianten-Anwenden-Button bereit.

Im Preorder-Modus werden ausschließlich getestete App-Blöcke ausgegeben, und nur bei gesetztem Lieferfenster sowie `preorder_ready`. Kein normaler Kaufbutton als Ersatz. Das Template unterstützt dadurch die Integration; eine noch nicht installierte App ist nicht implementiert oder getestet.

Der Warenkorb zeigt Shopify-Zeilensummen, Kaufpläne, Produkteigenschaften und Rabatte. Er verweigert den Checkout-Link für Waitlist-Artikel bzw. fehlende Preorder-Pläne. Diese UI-Sperre ist keine serverseitige Checkout-Validierung. Verbindliche Sperre im aktuellen Stand: Produkte DRAFT, Bestand null, Inventar verfolgt, `DENY`.

## Datenmodell

Produktfelder in Namespace `ost`: `line`, `drop`, `sale_mode`, `shipping_window`, `gsm`, `material`, `production_method`, `fit`, `size_guide`, `archive_link`.

Metaobjects:

- `ost_archive_person`: öffentliche redaktionelle Personendaten, Bild, Text, SEO, Produktverweis, `published`.
- `ost_voice`: echte Interviews und freigegebene Porträts, `published`.
- `ost_place`: Orte, Regionen, Koordinaten, Bild und Geschichte, `published`.
- `ost_rights_record`: interne Dokumentation zu Rechteträger, Umfang, Einwilligung, Referenz, Territorien und Ablauf. Storefront-Zugriff **NONE**.

Definitionen sind merchant-owned, damit Shopify, Theme und weitere Integrationen dieselben neutralen Daten benutzen können. Deshalb keine an eine einzelne App gebundenen `$app`-Typen. Öffentliche Typen aktivieren publishable, renderable und onlineStore capabilities. Neue Einträge zusätzlich DRAFT und `published=false`, bis die Redaktion sie freigibt. Interne Verträge/Scans gehören nicht ins Git-Repository.

## Formulare und Datenschutz

Das native Customer-Formular speichert E-Mail-Marketing-Einwilligung in Shopify. Die Checkbox ist nicht vorausgewählt. Der Erfolgszustand fordert zur E-Mail-Bestätigung auf; der echte Double-Opt-in-Mechanismus wird in Shopify konfiguriert. JavaScript ergänzt optional die Markenwelt als Customer-Tag; ohne JS bleiben allgemeine Newsletter-Tags und das native Formular verwendbar.

UTM-Persistenz ist bewusst noch nicht implementiert. Vor Umsetzung eine passende Einwilligungs-/Speicherlogik festlegen. Es gibt keine GA4- oder Meta-Pixel-Einbindung im Theme. Shopify-eigene Plattformskripte werden über `content_for_header` geladen und müssen bei der tatsächlichen Datenschutzkonfiguration berücksichtigt werden.

## Grenzen des aktuellen Standes

Keine realen Samples, Provider-Verbindung, Newsletter-Versandprobe, Zahlungsprobe, reale Produktfotos, lizenzierte Archivporträts oder Endkundentestkäufe. Kein Nachweis vollständiger BFSG-/WCAG-Konformität allein durch die Codeprüfungen. Der lokale Renderer ersetzt keine echten Shopify-Runtime-Tests.
