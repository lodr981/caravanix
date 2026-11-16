---
id: K-SPOTR-0005
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Katalog spotřebičů, skupina voda: příkon vodního čerpadla, bojlerů 230 V a 12 V a vyhřívání nádrže a potrubí podle tabulky v těle karty."
hodnota: null
jednotka: "W"
rozsah: null
podminky: "Čerpadlo: proud při jmenovitém tlaku × 12 V; proud roste s tlakem až k vypínacímu tlaku. Bojler: jmenovitý příkon topné tyče; plný příkon jen při ohřevu náplně. Vyhřívání: termostat spíná jen v mrazu, doba chodu podle teploty."
zdroje:
  - typ: datasheet
    nazev: "Fiamma Aqua 8 (7 l/min a 10 l/min), technická data prodejců"
    url: "https://www.thecampingstore.eu/en/technology/water/fiamma-aqua-8-12v-water-pump-10-lmin-with-filter"
    misto: "Technical specifications: Power consumption 3,4 A (10 l/min). Verze 7 l/min 1,4 A: https://www.thecampingstore.eu/en/brands/fiamma/fiamma-aqua-8-12v-water-pump-7-lmin"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Shurflo Trail King 7, katalog Pentair Shurflo EMEA RV"
    url: "https://www.pentair.com/content/dam/extranet/web/nam/shurflo/catalogs/shurflo-emea-rv-catalog.pdf"
    misto: "Trail King 7: 2095-204-112 (1,4 bar) 3,5 A; 2095-204-113 (2,0 bar) 3,7 A; 7,0 l/min. Max. 4,5 A uvádí https://www.camping-intl.com/products/accessories/water-waste/shurflo-trail-king-7/"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Truma Therme, návod k použití"
    url: "https://www.jacksonsleisure.com/content/pdf/truma/Therme/truma-watersystems-therme-operating-en.pdf"
    misto: "Technical data: 230 V, 300 W, 5 l; doba ohřevu z asi 15 °C na asi 60 °C asi 50 minut"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Elgena KB 3 (230 V / 660 W a 12 V / 200 W), technická data Reimo"
    url: "https://reimo.com/en/camping-shop/camping-heater-camping-fridge-camping-air-conditioner/elgena-boiler-elgena-hot-water/14719/kb-3-boiler-3-l-230-v/660-w"
    misto: "Technical data: 230 V – 660 W (asi 3 A); 3 l; doba ohřevu asi 15 min (55 °C, 660 W). Verze 12 V / 200 W: https://www.reimo.com/en/camping-shop/camping-heater-camping-fridge-camping-air-conditioner/elgena-boiler-elgena-hot-water/14720/elgena-boiler-3l-12v/200w"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Truma elektrický bojler 14 l, návod (Bedienungsanleitung)"
    url: "https://padabo-hu.wpjshop.cz/data/files/old/Boiler Elektro Bedienung (instructions).pdf"
    misto: "Technische Daten: Stromaufnahme 850 W (3,7 A); Aufheizzeit von 15 °C auf etwa 70 °C asi 70 min"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Frostwächter 12 V / 30 W (vyhřívání nádrže s termostatem), Reimo"
    url: "https://www.reimo.com/en/camping-shop/motorhome-caravan-sanitary-water-system-toilets/pipe-freeze-protection/13446/frost-monitor-12-v-30-w"
    misto: "Popis: 30 W při topení, asi 4 A; zapíná pod asi 5 °C, vypíná při asi 10 °C"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Tankheizung 12 V (topná fólie), Reimo"
    url: "https://reimo.com/en/camping-shop/motorhome-caravan-sanitary-water-system-toilets/pipe-freeze-protection/13463/tankheizung-12v-bis-200l?c=933"
    misto: "Technická data: do 80 l 38 W (2,8 A); do 150 l 89 W (6,6 A); topná fólie 91 W (7 A)"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Lilie Ultraheat Rohrheizung 12 V / 40 W, Berger"
    url: "https://www.berger-camping.com/item/lilie-ultraheat-rohrheizung-12-volt-rohrheizung-40-watt-492482"
    misto: "Technische Daten: Betriebsspannung 12 V; Leistung 40 W; Stromaufnahme 3,0 A"
    datum-overeni: 2026-11-17
vypocet: "Čerpadlo: 1,4 A × 12 = 16,8 → 17 W; 3,4 × 12 = 40,8 → 41 W; 3,5–3,7 A × 12 = 42–44 W; max. 4,5 × 12 = 54 W; typická 41 W = medián {17, 41, 42, 44}. Bojler 230 V: medián {300, 660, 850} = 660 W. Nádrž: typická 38 W (nádrž do 80 l, běžná v dodávce). Potrubí: 3,0 A × 12 V = 36 W až štítkových 40 W."
pouzito-v: [katalog-spotrebicu, kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

| Položka (id) | Typ. W | Rozsah W | Modely → hodnota |
| --- | --- | --- | --- |
| cerpadlo | 41 | 17–54 | Fiamma Aqua 8 7 l 1,4 A, 10 l 3,4 A; Shurflo Trail King 7 3,5–3,7 A (max. 4,5 A) |
| bojler-230v | 660 | 300–850 | Truma Therme 300 W (5 l, 50 min); Elgena KB 3 660 W (3 l, 15 min); Truma bojler 14 l 850 W (70 min) |
| bojler-12v | 200 | 200–200 | Elgena KB 3 12 V 200 W |
| vyhrivani-nadrze | 38 | 30–91 | Frostwächter 30 W; Tankheizung 38 W (≤ 80 l), 89 W (≤ 150 l); fólie 91 W |
| vyhrivani-potrubi | 40 | 36–40 | Lilie Ultraheat Rohrheizung 40 W / 3,0 A |

**Co se nepodařilo / pozor.**
- Doba chodu čerpadla (minuty za den) a vyhřívání (podle mrazu) není v datasheetech → `hodinDenne` null. Doba ohřevu bojleru je v tabulce, ale denní počet ohřevů záleží na uživateli.
- Bojler 12 V a vyhřívání potrubí: doložen vždy jen jeden model.
- Vyhřívání potrubí na 230 V se prodává po metrech (asi 10 W/m podle prodejců), do katalogu jsme dali jen 12V hotový kus.
- Truma ani jiný velký výrobce v našich zdrojích nemá datasheet vyhřívání nádrže; hodnoty jsou z popisů prodejce Reimo/Berger.
- Hodnoty kromě Frostwächteru (stránka otevřena přímo) čteny z výpisů ve vyhledávání.
