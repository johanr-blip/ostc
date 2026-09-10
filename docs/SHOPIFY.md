# Shopify-Zugriff und Betrieb

## Bestehende Umgebung

Alle nicht geheimen IDs stehen in `config/store.json` und `config/shopify-resources.json`. Vor Änderungen remote verifizieren. Keine neue Umgebung erzeugen, nur weil ein anderer Agent startet.

Die Domain `ostolz.de` zeigt am 10.09.2026 auf Shopify. Das bisherige OST-Theme `205871546705` ist live. Die Weiterentwicklung läuft ausschließlich auf dem unveröffentlichten Prüf-Theme `205894418769`. Die Produkte und Seiten bleiben DRAFT/unpublished. Die bestehende Standardseite `contact` wurde nicht geändert.

## Theme-Zugriff

```sh
npm run shopify -- theme list --store ajfwfu-ih.myshopify.com --json
npm run shopify -- theme dev --store ajfwfu-ih.myshopify.com --theme 205894418769 --path theme
```

Der erste Aufruf kann einen Browser-Login auslösen. Der Kontoinhaber bestätigt selbst. Keine Passwörter oder Tokens in Chat/Git einfügen.

Nach lokalen Prüfungen:

```sh
npm run theme:push
```

Dieses Skript prüft die Remote-Rolle. Keine Verwendung von `--allow-live`, `--publish` oder automatischer Live-Schaltung.

## Admin-Datenzugriff

```sh
npm run shopify -- store auth --store ajfwfu-ih.myshopify.com --scopes write_products,read_products,write_content,read_content,write_online_store_pages,read_online_store_pages
npm run shopify -- store execute --store ajfwfu-ih.myshopify.com --query-file tools/inspect.graphql --json
npm run shopify -- store execute --store ajfwfu-ih.myshopify.com --query-file tools/read.graphql --json
```

Für reine Leseaufgaben die entsprechenden read-Scopes verwenden. Weitere Scopes nur bei tatsächlichem Bedarf. Die vorhandene CLI-Sitzung ist lokal und kann ablaufen.

`tools/store-setup.py` enthält die dokumentierten Erstellungsoperationen und kann den aktuellen Stand lesen. Default ist read-only. Schreibstufen erfordern `--apply` und verwenden die bekannte Ressourcen-Zuordnung. Die Erstinitialisierung ist bereits erledigt. Nicht ungeprüft erneut ausführen. Das Skript erstellt keine bezahlten Dienste und veröffentlicht keine Produkte.

Alle GraphQL-Operationen liegen auch als einzelne Dateien vor. Sie wurden gegen das Shopify Admin Schema 2026-07 geprüft. Bei Änderungen aktuelle offizielle Dokumentation heranziehen und die Operation vor Ausführung validieren.

Für die in diesem Stand vorbereiteten Beschreibungs-, Preis-, Seiten- und `sale_mode`-Updates zuerst den Umfang ohne Schreibzugriff prüfen:

```sh
node tools/update-existing-store.mjs
```

Nach erfolgreicher Autorisierung bewusst mit `--apply` ausführen. Das Skript bricht ab, sobald ein bekanntes Produkt nicht mehr DRAFT oder eine Zielseite bereits veröffentlicht ist; es veröffentlicht nichts und aktiviert keinen Checkout.

## Warteliste aktivieren

1. Betreiber, Kontakt, Datenschutz, Absenderdomain und Versanddienst klären.
2. In Shopify Marketing Double Opt-in einschalten; Bestätigungsmail ohne Werbung prüfen.
3. Test mit freigegebener Testadresse: Anmeldung, Bestätigung, Zustand vor/nach Bestätigung, Abmeldung, erneute Anmeldung und Fehlerfälle.
4. Erst danach `newsletter_ready=true`. `commerce_ready` bleibt false.
5. Importe vorhandener Kontakte nicht pauschal als bestätigt markieren.

Quelle: [Shopify Double Opt-in](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/customer-contact-information#activate-double-opt-in-for-subscribers).

## Produktion und Verkauf

Ein ausgewählter POD-Partner übernimmt Fulfillment über seine offizielle Shopify-Integration. Erst bestätigte Varianten/SKUs zuordnen, dann Bestellfluss mit echten Testfällen prüfen. Anbieter nicht allein wegen nominell niedriger Produktpreise wählen.

Eine Preorder-App muss Shopify Purchase Options verwenden. Theme-App-Block, Lieferfenster, Zahlungsbedingungen, Storno und Erstattung im echten Shop testen. Ein `preorder`-Metafield stellt allein keinen Vorverkauf her. Siehe [Shopify Preorders](https://help.shopify.com/en/manual/products/purchase-options/pre-orders/setup).

Shopify Payments/PayPal, Steuern, Versandzonen, Widerruf und Rücksendeablauf sind noch nicht final eingerichtet oder geprüft. Keine eigene Zahlungslogik ergänzen.
