---
id: K-SPOTR-0006
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Katalog spotřebičů, skupina elektronika a světla: příkon notebooku, satelitního internetu, televize 12 V, LED světla, nabíjení telefonu a elektrokola, střešního ventilátoru a fénu podle tabulky v těle karty."
hodnota: null
jednotka: "W, h/den"
rozsah: null
podminky: "Nabíječky a adaptéry: hodnota = jmenovitý výstupní výkon (horní mez, ke konci nabíjení odběr klesá). Satelitní internet: průměrný příkon podle výrobce. Televize: příkon v zapnutém stavu z energetického štítku (kWh/1000 h). Ventilátor: proud × 12 V podle stupně."
zdroje:
  - typ: datasheet
    nazev: "Apple MacBook Air (M2, 2022), technické specifikace"
    url: "https://support.apple.com/en-ug/111867"
    misto: "Battery and Power: 52,6 Wh; 30W USB-C Power Adapter (8jádrové GPU) nebo 35W; Fast-charge capable with 70W USB-C Power Adapter"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Starlink Mini, specifikace (Network Innovations, distributor)"
    url: "https://www.networkinnovations.com/hubfs/docs/product/starlink/NI-Starlink-Mini.pdf"
    misto: "Technical Features: Power Consumption Average 25–40 W; Input Rating 12–48 V 60 W; USB PD 100 W"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Starlink Product Specifications – Standard Kit (Starlink, 2023)"
    url: "https://api.starlink.com/public-files/Starlink Product Specifications_Standard.pdf"
    misto: "s. 1, Dish: Power Consumption Average 50–75 W"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Avtex AV19TS a Alphatronics SL-22 / T-Line 22\" (televize 12 V), energetické údaje"
    url: "https://www.hbh-woolacotts.co.uk/tv-entertainment/television/mobile-leisure-tvs/AV19TS"
    misto: "AV19TS: Power consumption 12 kWh/1000h. Alphatronics SL-22 DSBW+: 15 kWh/1000h (https://www.guenstiger.de/Produkt/Alphatronics/SL_22_DSBW.html); Alphatronics T-Line SBI+ 22\": Power consumption 20 W (https://www.berger-camping.com/item/alphatronics-t-line-camping-tv-led-television-127199)"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "LED bodovky 12 V do obytných vozů, Reimo"
    url: "https://www.reimo.com/camping-shop/elektrik-fuer-wohnmobile-batterien/led-leuchten-12v/17093/edelstahl-led-spot-mit-24-leds"
    misto: "Technische Daten: 12 V, 1,7 W, 180 lm. Carbest mini spot 1 W (https://www.reimo.com/camping-shop/elektrik-fuer-wohnmobile-batterien/led-leuchten-12v/42706/carbest-led-mini-einbauspot-edelstahl); stropní světlo 3 W (https://www.reimo.com/se/16937/led-12v-d.leuchte-3-stufen-schalter-18-smd-led-grau-3w-288-lumen)"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Apple 20W USB-C Power Adapter"
    url: "https://www.apple.com/in/shop/product/MUVR3HN/A/20w-usb-c-power-adapter"
    misto: "Název a popis produktu: 20 W. 30W adaptér pro iPhone 16 (rychlé nabíjení) uvádí listing https://www.target.com (popis 30W USB-C Power Adapter)"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Bosch eBike nabíječky 2A / 4A / 12A, stránka výrobce"
    url: "https://www.bosch-ebike.com/en/products/charger"
    misto: "Tabulka nabíjení: 4A Charger, PowerPack/PowerTube 500: 50 % asi 1,7 h, 100 % asi 4,5 h; 2A Charger 100 % asi 7,3 h; 12A Charger max. 12 A"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Bosch BCS220 (Standard Charger 4A), návod, technické údaje"
    url: "https://www.manualslib.com/manual/1668505/Bosch-Bcs220.html?page=8"
    misto: "Technické údaje: jmenovité napětí 230 V; výstupní napětí 36 V; nabíjecí proud max. 4 A"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Fiamma Turbo-Vent 12 V (Polar Control, 36 W), Reimo; MaxxFan Deluxe, odpověď eTrailer"
    url: "https://www.reimo.com/en/camping-shop/van-windows-caravan-windows-camper-windows-blinds-vents/fiamma-roof-light-fiamma-skylight-fiamma-roof-vent/4488/turbovent-12-v-polar-control-hood-white"
    misto: "Turbo-Vent: 36 W, proud min. 0,2 A, max. 3 A. MaxxFan Deluxe MA00-07500K: asi 5 A v běhu (https://www.etrailer.com/question-377916.html); MA00-06401K: asi 1 A na střední stupeň (https://www.etrailer.com/question-722764.html)"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Philips fény: DryCare HP8108 (1000 W), BHD282 (2000 W), SalonDry Travel HP4829 (2000 W)"
    url: "https://www.philips.co.uk/c-p/HP4829_00/salondry-travel-travel-hairdryer"
    misto: "Specifications: Power 2000 W (HP4829). HP8108 1000 W a BHD282 2000 W podle listů výrobku Philips (documents.philips.com)"
    datum-overeni: 2026-11-17
vypocet: "Elektrokolo: 36 V × 4 A = 144 W (výstup); rozsah 36 × 2 = 72 W až 36 × 12 = 432 W. hodinDenne 4,5 h = jedno plné nabití baterie 500 Wh nabíječkou 4 A (Bosch). Kontrola: 144 W × 4,5 h = 648 Wh ≥ 500 Wh + ztráty, na bezpečné straně. Televize: 12 kWh/1000 h = 12 W; 15 kWh/1000 h = 15 W. Ventilátor: 0,2 A × 12 = 2,4 W; 1 A × 12 = 12 W; 5 A × 12 = 60 W. Starlink: typická 30 W ze středu 25–40 W (Mini); rozsah 25 W (Mini min.) až 75 W (Standard max.); špička 60 W = vstupní jmenovitý výkon Mini."
pouzito-v: [katalog-spotrebicu, kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-SPOTR-0006-2026-11-17.md
schvalil: null
---

Poznámky rešeršéra:

| Položka (id) | Typ. W | Rozsah W | h/den | Modely → hodnota |
| --- | --- | --- | --- | --- |
| notebook | 30 | 30–70 | null | MacBook Air M2: adaptér 30 W, rychlé 70 W, baterie 52,6 Wh |
| satelitni-internet | 30 | 25–75 | null | Starlink Mini 25–40 W (vstup 60 W); Standard 50–75 W |
| televize-12v | 15 | 12–20 | null | Avtex AV19TS 12 W; Alphatronics SL-22 15 W; T-Line 22" 20 W |
| led-bodovka | 1,7 | 1–3 | null | Reimo spot 1,7 W; Carbest 1 W; stropní 3 W |
| nabijeni-telefonu | 20 | 20–30 | null | Apple 20W; 30W adaptér pro rychlé nabíjení |
| nabijeni-elektrokola | 144 | 72–432 | 4,5 | Bosch 4A (36 V); 2A; 12A |
| ventilator-strecha | 12 | 2–60 | null | Fiamma Turbo-Vent 0,2–3 A; MaxxFan ~1 A střední, ~5 A max. |
| fen | 2000 | 1000–2000 | null | Philips HP8108 1000 W; BHD282, HP4829 2000 W |

**Co se nepodařilo / pozor.**
- Notebook: doložen jen Apple. Běžné notebooky s Windows mívají adaptér 45–65 W, zdroj jsme do karty nedali. Skutečný průměrný příkon při práci je nižší než výkon adaptéru, údaj výrobce chybí.
- Telefon: kapacitu baterie iPhonu (Wh) jsme nenašli, denní energii proto nelze podložit; `hodinDenne` null.
- Starlink: oficiální spec. Standard (2023) uvádí 50–75 W, novější zdroje prodejců 75–100 W (Gen 3). Pro Mini je zdrojem list distributora, oficiální stránka starlink.com se nenačetla. Mini lze napájet 12–48 V přímo, proto `napajeni` 12/24V.
- Ventilátor MaxxFan: jen odpovědi prodejce eTrailer, ne datasheet; Dometic Fan-Tastic proud neuvádí. Rozběh MaxxFan asi 9 A (eTrailer, jiný model) nezapsán jako špička.
- Elektrokolo: příkon ze sítě je o ztráty nabíječky vyšší než 144 W; účinnost výrobce neuvádí. `hodinDenne` 4,5 platí za předpokladu jednoho nabití denně – ať kalkulačka nabídne počet nabití.
- Televize Alphatronics SL-22: údaj 15 kWh/1000 h je ze srovnávače cen (energetický štítek), ne z datasheetu výrobce.
- Fén zařazen do skupiny elektronika (zadání nemá skupinu pro drobné spotřebiče 230 V).

Ověření 17. 11. 2026: SEDÍ S POZNÁMKOU; Starlink Mini 35 W.
