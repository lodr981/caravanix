---
id: K-SPOTR-0003
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Katalog spotřebičů, skupina topení: elektrický příkon naftového topení 2 kW (běh a start), 12V a 230V části Truma Combi a elektrického přímotopu podle tabulky v těle karty."
hodnota: null
jednotka: "W"
rozsah: null
podminky: "Naftová topení: elektrický příkon ventilátoru, palivového čerpadla a řízení (teplo z nafty se nepočítá). Start: žhavicí svíčka na začátku každého zapálení. Truma Combi: 12 V část = ventilátor a elektronika při topení na plyn; 230 V část = elektrické topné tyče (verze E). Hodiny chodu závisí na venkovní teplotě a izolaci, výrobci je neuvádějí."
zdroje:
  - typ: datasheet
    nazev: "Webasto Air Top 2000 STC, datasheet pro obytná vozidla"
    url: "https://lostontheroute.com/wp-content/uploads/2022/01/Datasheet-Air-Top-Serie-Recreational-Vehicles_ENG.pdf"
    misto: "Tabulka technických dat: Rated power consumption (W) 13–30 (diesel) / 15–30 (benzín); 12 V. Servisní list uvádí 14–29 W: https://cdn.shopify.com/s/files/1/0098/6090/7044/files/vmac_service_manual_airtop2000stc_spec_sheet.pdf"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Webasto Air Top 2000 STC, FAQ (soubor prodejce, kód 053406)"
    url: "https://cdn.shopify.com/s/files/1/0781/6885/0709/files/053406_FAQ.pdf"
    misto: "Odpověď o spotřebě: 6–7 A ve fázi startu, pak 1–2 A při běhu, od 14 W"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Eberspächer Airtronic S2 D2L, technická data (prodejce)"
    url: "https://en.comptoirnautique.com/forced-air-heating-for-boats/68791-15298-eberspacher-forced-air-heater-aitronic-s2-d2l-marine.html"
    misto: "Technical data: příkon 6 W (min.) až 34 W (max.)"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Autoterm Air 2D, leták topení (Air heaters flyer rev.5)"
    url: "https://cdn.shopify.com/s/files/1/0510/2800/0922/files/Air-heaters-flyer-rev.5.pdf"
    misto: "Air 2D: proud 0,8–2,42 A; příkon 10–29 W (12 V)"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Truma Combi 4E, technická data (Reimo)"
    url: "https://www.reimo.com/en/camping-shop/camping-heater-camping-fridge-camping-air-conditioner/truma-heater-truma-caravan-heater-truma-gas-heater/43589/truma-combi-4e"
    misto: "Technical data: 12 V průměrný proud 1,1 A; klidový 0,001 A; 230 V 900 W = 3,9 A, 1800 W = 7,8 A. Max. 12 V proud 5,6 A (starší návod, https://www.manualslib.com/manual/1296324/Truma-Combi-E.html?page=8) / 6,5 A (novější listy, https://berger-camping.com/item/truma-combi-e-lpg-and-electric-heater,-230-v,-with-10-liter-water-heater-507286)"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Truma Eezy, produktová stránka"
    url: "https://www.truma.com/products/heating-systems/varioheat-heaters/eezy/"
    misto: "Technical data: jmenovitý tepelný výkon při 230 V 450 W / 900 W / max. 1800 W; 1,95 / 3,9 / 7,8 A"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Truma Ultraheat, návod, technická data"
    url: "https://www.manualslib.de/manual/364751/Truma-Ultraheat.html?page=5"
    misto: "Technické údaje: 500 W 2,2 A; 1000 W 4,5 A; 2000 W 8,5 A; 230 V 50 Hz"
    datum-overeni: 2026-11-17
vypocet: "Naftové topení běh: rozsahy 13–30, 6–34, 10–29 W; typická hodnota 20 W ≈ střed společného pásma (střední stupeň výkonu). Start: 6–7 A × 12 V = 72–84 W, typicky 80 W. Combi 12 V: 1,1 A × 12 V = 13,2 W; 1,2 A × 12 = 14,4 W; špička 6,5 A × 12 = 78 W (5,6 A → 67 W). Přímotop: typická 900 W = střední stupeň Eezy; medián stupňů {450, 500, 900, 1000, 1800, 2000} = 950 W."
pouzito-v: [katalog-spotrebicu, kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-SPOTR-0003-2026-11-17.md
schvalil: null
---

Poznámky rešeršéra:

| Položka (id) | Typ. W | Rozsah W | Špička W | Modely → hodnota |
| --- | --- | --- | --- | --- |
| topeni-nafta-beh | 20 | 6–34 | 80 | Webasto AT 2000 STC 13–30 W; Eberspächer S2 D2L 6–34 W; Autoterm Air 2D 10–29 W |
| topeni-nafta-start | 80 | 72–84 | null | Webasto AT 2000 STC 6–7 A při startu |
| truma-combi-12v | 13 | 13–15 | 78 | Combi 4E 1,1 A (Reimo), 1,2 A (Berger); max. 5,6 / 6,5 A |
| truma-combi-230v | 900 | 900–1800 | null | Combi 4E: 900 W / 1800 W |
| primotop-230v | 900 | 450–2000 | null | Truma Eezy 450/900/1800 W; Truma Ultraheat 500/1000/2000 W |

**Co se nepodařilo doložit.**
- Délka startu (žhavení) naftového topení: v našich zdrojích není. Údaj 6–7 A je z FAQ souboru u prodejce (Webasto), ne z datasheetu. Pro Eberspächer a Autoterm jsme startovní příkon nenašli. Levná čínská topení mívají podle praxe vyšší žhavicí proud, ale zdroj nemáme.
- Hodiny chodu topení podle teploty výrobci neuvádějí → `hodinDenne` null. Kalkulačka bude potřebovat vlastní model (teplota, izolace) nebo zadání uživatelem.
- Truma Combi 12 V průměr platí pro topení s ohřevem vody; při samotném ohřevu vody (bez topení) Truma uvádí asi 0,4 A.
- Datasheet Webasto od výrobce (eima.it, camperking.co.uk) přímo otevřít nešel (404/403); čteno z výpisu ve vyhledávání.

Ověření 17. 11. 2026: SEDÍ S POZNÁMKOU.
