# Betriebs- und Freigabeleitfaden

Stand: 10.09.2026. Dieser Leitfaden trennt den bereits gebauten technischen Stand von den noch erforderlichen Geschäftsfreigaben.

## Sicherer Ausgangszustand

- `ostolz.de` und `www.ostolz.de` zeigen auf Shopify; der Shop ist passwortgeschützt.
- Live bleibt Theme `205871546705` (`OST — Founding Drop 001`). Entwicklung und Abnahme erfolgen auf Theme `205894418769` (`OST — ostolz.de Prüfstand 2026-09-10`), Rolle `unpublished`.
- Produkte bleiben DRAFT, Bestand null und Verkauf bei fehlendem Bestand gesperrt. Neue Seiten bleiben unpublished.
- `newsletter_ready`, `commerce_ready` und `preorder_ready` bleiben false, bis die jeweilige Checkliste vollständig bestanden ist.
- `content/product-master.json` ist die zentrale operative Datenquelle. Fehlende Lieferanten-IDs, Kosten oder Lieferzeiten bleiben leer; sie werden nicht geschätzt.

## Produkt- und Lieferantenprozess

1. Passendes Shirtigo-Produkt im Cockpit auswählen und reale Produkt-, Varianten- und Lieferanten-IDs in `content/product-master.json` und der Arbeitsmappe erfassen.
2. Blank, Farbe, Größen, Druckfläche, Veredelung und Verpackung exakt gegen das OST-Konzept abgleichen.
3. Muster bestellen. Noch ohne Muster bleiben Produkte im Status `SOURCING`; nach Bestellung wechseln sie auf `SAMPLE`.
4. Je Variante tatsächliche Netto-Produktkosten, Druck, Fulfillment/Verpackung und Versand erfassen. Erst dann werden Deckungsbeiträge belastbar.
5. Freigegebene Varianten auf `APPROVED` setzen und Shopify-SKU, Anbieter-SKU sowie Variantenzuordnung gegentesten.
6. Shopify-App/Integration erst verbinden, nachdem Testshop, Abrechnung und Bestellrouting geklärt sind. Keine Zugangsdaten im Repository speichern.

Offizielle technische Referenz: [Shirtigo Cockpit API](https://cockpit.shirtigo.com/docs/).

## Musterabnahme

Für jedes Produkt dokumentieren:

- Produkt, Blank, Farbe, Größe, Druckdatei und Produktionsdatum
- Maße vor der Wäsche und nach mindestens zwei Waschgängen
- Passform, Griff, Gewicht, Nähte, Druckposition, Farbdeckung und Geruch
- Druck-/Waschbeständigkeit und sichtbare Fehler
- Verpackung, Begleitmaterial, Lieferdauer und Tracking
- Foto des Musters und Entscheidung `APPROVED`, Nachbesserung oder Ablehnung

Eine Freigabe gilt nur für die tatsächlich geprüfte Kombination aus Blank, Farbe, Größe, Druckverfahren und Lieferant.

## Newsletter-Freigabe

1. Betreiber, ladungsfähige Anschrift, Kontaktadresse und vollständige Datenschutzerklärung hinterlegen.
2. Absenderdomain einschließlich SPF, DKIM und DMARC einrichten.
3. Shopify Double Opt-in und Abmeldelink konfigurieren.
4. Mit einer freigegebenen Testadresse Anmeldung, unbestätigten Zustand, Bestätigung, Dublette, Abmeldung und Fehlerfall prüfen.
5. Shopify-Kundendatensatz, Einwilligungszeitpunkt, Tags und produktbezogenes Interesse kontrollieren.
6. Erst nach erfolgreichem Protokoll `newsletter_ready=true` setzen.

## Vorbestellung und Zahlung

Shopify-Vorbestellungen benötigen eine kompatible Purchase-Option-/Preorder-App. Die Theme-Seite stellt dafür App-Blöcke bereit; ein Metafield oder umbenannter Kaufbutton allein ist keine Vorbestellung. Referenz: [Shopify Vorbestellungen](https://help.shopify.com/de/manual/products/purchase-options/pre-orders).

Vor der Freigabe müssen erledigt sein:

- alle betroffenen Varianten `APPROVED`, Lieferanten- und Shopify-IDs eindeutig zugeordnet
- reale Kosten, Kapazität, Bestellschluss und belastbares Lieferfenster bestätigt
- Zahlungsart festgelegt: vollständig sofort oder zulässige Teil-/Späterzahlung über die App
- Rechtstexte, Storno, Widerruf, Rücksendung, Erstattung und Supportprozess final geprüft
- Steuern, Versandzonen, Preise, kostenlose Versandgrenze und Benachrichtigungen konfiguriert
- Preorder-App installiert; Selling Plan an jede Testvariante gebunden
- mindestens je ein erfolgreicher und absichtlich abgelehnter Test für Zahlung, Versand, Rabatt, Storno und Erstattung
- Bestellrouting zu Shirtigo zunächst mit isolierter Testbestellung geprüft; keine ungeprüfte automatische Produktion

Danach in dieser Reihenfolge freigeben:

1. Einzelnes internes Testprodukt auf `sale_mode=preorder` setzen.
2. Selling Plan, Lieferfenster und App-Block kontrollieren.
3. `commerce_ready=true` und `preorder_ready=true` nur im unveröffentlichten Prüf-Theme setzen.
4. End-to-End-Test mit echter Testzahlung durchführen und erstatten.
5. Erst nach protokollierter Abnahme Produktstatus `PREORDER` und öffentliche Veröffentlichung freigeben.

Für einen normalen Lager-/POD-Verkauf ohne Selling Plan wird `sale_mode=live` verwendet. Auch dafür muss `commerce_ready=true` gesetzt sein.

## Abnahmetests vor Veröffentlichung

- Desktop und Mobil: Startseite, OSTMANN, OSTFRAU, Produkt, Warenkorb, FAQ, Versand, Retouren und Rechtstexte
- Variantenwahl, nicht verfügbare Variante, Mengenänderung, Gutscheine, Steuern und Versandkosten
- Waitlist-Produkt kann nicht gekauft werden; Sold-out- und archivierte Produkte zeigen keinen Kaufweg
- Preorder ohne Selling Plan blockiert den Checkout; Preorder mit freigegebenem Selling Plan trägt Zahlungs- und Lieferhinweis
- Newsletter ohne Einwilligung wird abgewiesen; Double Opt-in und Abmeldung funktionieren
- Bestell-, Zahlungs-, Storno-, Erstattungs- und Versandmails enthalten korrekte Daten
- Shirtigo erhält nur die erwartete Variante, Druckdatei und Adresse; Fehler erzeugen einen sichtbaren, bearbeitbaren Zustand
- Keine Platzhalter, erfundenen Materialangaben, unbestätigten Lieferzeiten oder leeren Pflichtseiten sind öffentlich

## Sichere Datensynchronisation

Nach erfolgreicher lokaler Shopify-Autorisierung zeigt ein Dry Run den Umfang:

```sh
node tools/update-existing-store.mjs
```

Anschließend kann bewusst angewendet werden:

```sh
node tools/update-existing-store.mjs --apply
```

Das Skript arbeitet ausschließlich gegen bekannte IDs und bricht ab, wenn ein Zielprodukt nicht mehr DRAFT oder eine Zielseite bereits veröffentlicht ist. Es aktualisiert Beschreibungen, Variantenpreise, Seiteninhalte und die erlaubten `sale_mode`-Werte. Es veröffentlicht nichts und schaltet keine Zahlung frei.

## Veröffentlichungs-Gate

Öffentlich schalten erst, wenn Domain/SSL, Betreiberangaben, Rechtstexte, Datenschutz/Consent, Muster, Lieferkette, Kosten, Zahlungsarten, Versand, Retouren, E-Mails und End-to-End-Tests protokolliert freigegeben sind. Das Live-Theme nie automatisiert oder ohne einen letzten Remote-Abgleich überschreiben.
