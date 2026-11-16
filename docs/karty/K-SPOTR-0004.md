---
id: K-SPOTR-0004
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Katalog spotřebičů, skupina vaření: příkon indukčního vařiče, kávovaru, varných konvic, mikrovlnné trouby a topinkovače podle tabulky v těle karty."
hodnota: null
jednotka: "W"
rozsah: null
podminky: "Spotřebiče 230 V, jmenovitý příkon ze štítku nebo technických údajů. Plný příkon jen po dobu ohřevu (minuty); obvyklou dobu použití výrobci neuvádějí, proto hodinDenne null. U mikrovlnky je rozhodující příkon ze sítě, ne mikrovlnný výkon."
zdroje:
  - typ: datasheet
    nazev: "Dometic CVI1350 (jednoplotýnkový indukční vařič), technická data prodejce"
    url: "https://en.comptoirnautique.com/hob-gas-stove/67440-dometic-cvi1350-induction-cooktop-4015704291735.html"
    misto: "Technical data: Power 2000 W; BOOST mode power 2300 W; průměr zóny 180 mm"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Dometic CVI1525 (dvouplotýnkový), produktová stránka"
    url: "https://www.dometic.com/en-gb/product/dometic-cvi1525-9600050571"
    misto: "Popis / technická data: 2 zóny, 1000 / 1300 W, 10 A"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Nespresso Essenza Mini, produktová stránka Nespresso Pro"
    url: "https://www.nespresso.com/pro/ch/en/order/machines/original/nespresso-essenza-mini-grey-coffee-machine"
    misto: "Specifications: Power (in watts) 1260 W. Variantu De'Longhi EN85.B s 1150 W uvádí https://uae.sharafdg.com/product/delonghi-nespresso-essenza-mini-capsule-coffee-maker-en85b"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Kempinkové konvice: Quest Rocket 1 l, Milenco 1 l, Outdoor Revolution 1 l"
    url: "https://towsure.com/products/quest-rocket-cordless-kettle"
    misto: "Specifikace: 1000 W, 1 l. Milenco 1000 W: https://shop.highbridgecaravans.co.uk/products/milenco-cordless-white-kettle-1000w-white; Outdoor Revolution 1000–1200 W: https://redcoteleisure.co.uk/product/outdoor-revolution-1l-premium-low-wattage-electric-kettle"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Philips Daily Collection HD9350, list výrobku (Philips)"
    url: "https://www.philips.co.za/c-p/HD9350_90/daily-collection-kettle"
    misto: "Specifications, Technical specifications: Power 1850–2200 W; 220–240 V; 1,7 l. Běžné domácí konvice 2800–3000 W: https://www.caravanguard.co.uk/news/low-wattage-appliances-for-caravanning-and-motorhoming-34704/"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Mikrovlnné trouby 20 l / 800 W: ECG MTD 206 VSS, Beko MOF20110X, Caso M20, Smeg FME120 – návody, technická data"
    url: "https://www.manualslib.de/manual/429089/Ecg-Mtd-206-Vss.html?page=66"
    misto: "ECG MTD 206 VSS: Rated power input 1250 W, output 800 W. Beko MOF20110X 1250 W / 800 W (https://www.manualslib.de/manual/595455/Beko-Mof20110X.html?page=11); Caso M20 1200 W / 800 W (https://manualslib.es/manual/202331/Caso-M20.html?page=77); Smeg FME120 1200 W / 800 W (https://www.manualslib.com/manual/1224545/Smeg-Fme120.html?page=21)"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Philips Daily Collection HD2581, technické údaje"
    url: "https://bigbuy.eu/en/toaster-philips-hd2581-830-w_693719.html"
    misto: "Specifications: Power 830 W; 2 plátky"
    datum-overeni: 2026-11-17
vypocet: "Mikrovlnka: medián {1200, 1200, 1250, 1250} = 1225 W, zvolen běžný model 1250 W (horní, na bezpečné straně). Ostatní typické hodnoty = běžný model."
pouzito-v: [katalog-spotrebicu, kalkulacka-sobestacnost, kalkulacka-vareni]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

| Položka (id) | Typ. W | Rozsah W | Modely → hodnota |
| --- | --- | --- | --- |
| indukce | 2000 | 1000–2300 | Dometic CVI1350 2000 W (boost 2300 W); CVI1525 1000 / 1300 W na zónu |
| kavovar-kapsle | 1260 | 1150–1260 | Nespresso Essenza Mini 1260 W; De'Longhi EN85.B 1150 W |
| konvice-nizkoprikonova | 1000 | 1000–1200 | Quest Rocket 1000 W; Milenco 1000 W; Outdoor Revolution 1000–1200 W |
| konvice-bezna | 2200 | 1850–3000 | Philips HD9350 1850–2200 W; běžné domácí 2800–3000 W (článek Caravan Guard) |
| mikrovlnka | 1250 | 1200–1250 | ECG MTD 206 VSS, Beko MOF20110X 1250 W; Caso M20, Smeg FME120 1200 W |
| toustovac | 830 | 830–830 | Philips HD2581 830 W |

**Na co si dát pozor / co se nepodařilo.**
- Topinkovač: doložen jen jeden model, rozsah zatím není rozsah. Doplnit druhý model při ověření.
- Obvyklá doba použití (minuty na kávu, na litr vody) není v datasheetech; `hodinDenne` null. Fyzikálně jde dobu ohřevu konvice spočítat z objemu a příkonu, to ale patří do enginu, ne do katalogu.
- Mikrovlnky do obytných vozů (Dometic MWO 240) uvádějí jen mikrovlnný výkon 700 W, příkon ze sítě v našich zdrojích není. Dometic MWO 24 (24 V) má příkon 900 W při výkonu 500 W.
- Indukce: příkon při regulaci (nižší stupně) je menší; katalog uvádí plný výkon plotny.
- Hodnoty čteny z výpisů stránek ve vyhledávání; ověřovatel ať otevře odkazy.
