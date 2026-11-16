---
id: K-SPOTR-0001
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Katalog spotřebičů, skupina chlazení: typický příkon, rozsah a doba chodu kompresorové lednice, absorpční lednice (230 V a 12 V), kompresorového a termoelektrického chladicího boxu podle tabulky v těle karty."
hodnota: null
jednotka: "W, h/den"
rozsah: null
podminky: "Příkon v běhu podle datasheetu nebo štítku výrobce (rated input power). Doba chodu za den jen tam, kde výrobce uvádí denní spotřebu (kWh/24 h): hodinDenne = denní spotřeba / příkon. Podíl doby chodu silně závisí na venkovní teplotě, nastavení termostatu a otevírání dveří."
zdroje:
  - typ: datasheet
    nazev: "Dometic CoolMatic CRX 50 (E), technická data"
    url: "https://dometic.com/en-au/outdoor/boat/boat-refrigerators/dometic-coolmatic-crx-50-e-28560"
    misto: "Technical data: Energy consumption DC@5/25 °C 0,26784 kWh/24h; Average power consumption 40 W. Hodnota 0,556992 kWh/24h (DC@5/32 °C) na https://www.dometic.com/en-us/us/support/dometic-crx-50-_-146543, Technical data. Jmenovitý příkon 45 W: tabulka Technical data v návodu (https://manualslib.fr/manual/34788/Dometic-Coolmatic-Crx50.html?page=34)."
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Dometic CFX3 45, technická data"
    url: "https://epi.dometic.com/en-gb/outdoor/coolers/electric-coolboxes/dometic-cfx3-45-223545"
    misto: "Technical data: Rated input power (AC) 52 W; Energy consumption DC@5/25 °C 0,49 kWh/24h"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Truma Cooler C60, technická data (Reimo) a Truma Cooler brožura 2025"
    url: "https://reimo.com/en/camping-shop/camping-heater-camping-fridge-camping-air-conditioner/12v-cool-box-camping-electric-cool-box/25750/truma-cooler-c60"
    misto: "Reimo: Energy consumption (kWh/year) 53. Brožura https://www.truma.com/wp-content/uploads/truma-cooler-brochure-2025-en.pdf, tabulka technických dat C60: Power consumption 12 V: 5,6 A"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Dometic RM 8400 a RML 8551 (absorpční lednice), produktové listy"
    url: "https://www.dometic.com/en/outdoor/rv-and-van/refrigerators/rv-refrigerators/dometic-rml-8551-117142"
    misto: "RML 8551: Rated input power AC 190 W (230 V), DC 170 W (12 V). RM 8400 (https://www.dometic.com/en/outdoor/rv-and-van/refrigerators/rv-refrigerators/dometic-rm-8400-31117): Rated input power AC 135 W, DC 130 W"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Thetford N4141 a N4142 (absorpční lednice), specifikace prodejců"
    url: "https://www.jacksonsleisure.com/thetford/n4100/motorhome/caravan/fridge/"
    misto: "N4141: max. příkon 12 V 205 W, 230 V 240 W, energie 4,5 kWh/24 h. N4142: asi 3,9 kWh/24 h (https://reimo.com/en/camping-shop/camping-heater-camping-fridge-camping-air-conditioner/thetford-caravan-fridge-thetford-motorhome-fridge/27423/abs.kuehlschr.n4142a-links)"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Dometic TropiCool TCX 21 (termoelektrický box)"
    url: "https://www.dometic.com/en/product/dometic-tropicool-tcx-21-9600013320"
    misto: "Technical data: Rated input power (DC) 46 W @12 V / 50 W @24 V; příkon v režimu Eco 8,8 W"
    datum-overeni: 2026-11-17
vypocet: "Kompresorová lednice: hodinDenne = 267,84 Wh / 45 W = 6,0 h (25 °C); při 32 °C 557 Wh / 45 W = 12,4 h. Absorpční 230 V: 4500 Wh / 240 W = 18,75 h (N4141), zaokrouhleno 19 h; s typickým příkonem 190 W × 19 h = 3,6 kWh, mezi 3,9 a 4,5 kWh/24 h výrobců spíš níž. Box kompresor: typická hodnota 60 W = medián dvou modelů (52 W, 5,6 A × 12 V = 67 W). Denní spotřeba boxu: C60 53 kWh/rok / 365 = 145 Wh/den; CFX3 45 490 Wh/den (jiné podmínky zkoušky), proto hodinDenne = null."
pouzito-v: [katalog-spotrebicu, kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

| Položka (id) | Typ. W | Rozsah W | h/den | Modely → hodnota |
| --- | --- | --- | --- | --- |
| lednice-kompresor | 45 | 40–52 | 6 | CRX 50: jmenovitě 45 W, průměr 40 W, 0,268 kWh/24 h (25 °C), 0,557 kWh/24 h (32 °C); CFX3 45: 52 W (AC) |
| lednice-absorpcni-230v | 190 | 135–240 | 19 | RML 8551 190 W; RM 8400 135 W; N4141 240 W a 4,5 kWh/24 h; N4142 3,9 kWh/24 h |
| lednice-absorpcni-12v | 170 | 130–205 | null | RML 8551 170 W; RM 8400 130 W; N4141 205 W |
| box-kompresor | 60 | 52–67 | null | CFX3 45 52 W; Truma C60 5,6 A při 12 V = 67 W |
| box-termoelektricky | 46 | 9–50 | null | TCX 21 46 W (12 V), 50 W (24 V), Eco 8,8 W |

**Na co si dát pozor.**
- Jmenovitý příkon CRX 50 (45 W) je v tabulce návodu, kde nebylo jednoznačné přiřazení sloupců k modelům (45 / 48 W). Pro výpočet to nevadí: denní spotřebu dává výrobce přímo v kWh/24 h.
- Doba chodu 6 h platí pro 25 °C venku. V létě v rozpáleném voze je reálnější hodnota pro 32 °C (12 h). Kalkulačka podle zadání eviduje „podíl doby chodu podle venkovní teploty“; náš JSON má jen jedno číslo, proto teplotní závislost zatím jen v poznámce. Doporučuji, aby kalkulačka pro léto vzala 32 °C (rozhodne hlavní vlákno nebo mistr).
- Údaj CFX3 45 0,49 kWh/24 h se zdá vysoký proti CRX 50; možná jiná zkušební teplota uvnitř. Proto u boxu `hodinDenne` null.
- Absorpční lednice: hodnoty Thetford jsou ze specifikací prodejců, ne z datasheetu výrobce. Podmínky zkoušky (venkovní teplota) u kWh/24 h neuvedeny.
- Absorpční lednice na 12 V se z baterie na stání nepoužívá (běžně spíná jen za jízdy přes D+). V katalogu je pro úplnost.
- Hodnoty jsem četl z výpisů stránek ve vyhledávání; stránky Dometic a Reimo přímo otevřít nešlo (404 nebo bez technických dat ve výpisu). Ověřovatel ať otevře odkazy v prohlížeči.
