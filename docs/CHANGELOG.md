# Änderungsprotokoll

## 2026-09-10 — ostolz.de Prüfstand und vollständige Freigabelogik

- Markenclaim auf `OST. — VON HIER.` umgestellt und Domain, Footer, Hero, Seiteninhalte, OSTFRAU-Seite sowie alle zehn Produktbeschreibungen und Zielpreise überarbeitet.
- Produkt- und Warenkorbzustände `waitlist`, `preorder`, `live`, `sold_out` und `archived` mit gesperrten Fehlzuständen umgesetzt. Vorbestellung bleibt bis zu Selling Plan, App-, Lieferfenster-, Checkout- und Supply-Chain-Prüfung gesperrt.
- Native Newsletter-Anmeldung um Einwilligung, Linienpräferenz und Produktinteresse ergänzt; Aktivierung bleibt bis zum echten Double-Opt-in-Test gesperrt.
- Zentrale Produktdatenbank mit 20 Produkten und 63 Varianten angelegt; vorhandene Shopify-IDs übernommen, fehlende Lieferanten-/Kostendaten bewusst leer gelassen. Editierbare Master-Arbeitsmappe erzeugt und visuell/formal geprüft.
- Neues unveröffentlichtes Prüf-Theme `205894418769` hochgeladen. Das Live-Theme `205871546705` blieb unverändert.
- Sicheres Admin-Updateskript und validierte GraphQL-Operationen für vorhandene Draft-Produkte/unveröffentlichte Seiten ergänzt. Der Remote-Datenlauf blieb aus, weil die Shopify-OAuth-Bestätigung ablief.
- Betriebs-, Muster-, Newsletter-, Preorder-, Zahlungs- und Veröffentlichungschecklisten ergänzt.

## 2026-09-10 — Blonde Editorial-Varianten

- OSTFRAU-Aufnahme mit natürlich hellblondem Haar und blauen Augen; OSTMANN mit dunkelblondem Haar und dezent angepasstem Bart.
- Kleidung, Wortmarken, Bildaufbau und kalte Editorial-Gestaltung beibehalten. Ursprüngliche PNGs als Alternativen erhalten; neue PNGs und genaue Edit-Prompts ergänzt.
- Aktuelle Hero-WebPs ersetzt und lokale Vorschau neu erzeugt. Bildvarianten visuell geprüft; 29 Vorschauseiten und 868 lokale Referenzen erfolgreich geprüft. Theme-ZIP neu erzeugt.
- Beide Bilddateien gezielt auf Theme `205871546705` hochgeladen; Rolle vor und nach Upload `unpublished`. Lokaler Vorschau-Server bedient nun direkt `preview/dist/` dieses Repositorys.

## 2026-09-10 — Initialer OST-Projektstand

- Eigenes Shopify OS 2.0 Theme mit zwei Markenwelten, Header/Switch, Hero, Produktbereichen und Editorial-Sections gebaut.
- Waitlist als Default, gesonderte Freigaben für Newsletter, Kontakt, Commerce und Preorder.
- Produkt-, Collection-, Cart-, Seiten-, Such-, Passwort-, 404- und Metaobject-Templates.
- Zehn Produktentwürfe, 13 neue Seiten, drei Collections, vier Metaobject-Definitionen und zehn Produkt-Metafields im Shopify-Shop angelegt.
- OST Theme `205871546705` unveröffentlicht hochgeladen; Horizon unverändert live.
- Sieben KI-Konzeptbilder erzeugt, optimierte WebP-Assets und lokal eingebundene Archivo-Schrift.
- Kalkulationsdatei mit Annahmen, Deckungsbeiträgen, Break-even und Quellen erstellt.
- Portable Projektbasis und Übergabe für andere KI-Modelle erfolgreich nach `johanr-blip/ostc` übertragen, mit `main` und `develop`.
- Frisch entpacktes Projekt ohne ursprünglichen Arbeitsordner installiert, geprüft und als Shopify-Theme paketiert.
- Keine Bestellungen, Zahlungen, Werbeschaltungen, Newsletter-Sendungen oder Markenanmeldungen ausgeführt.
