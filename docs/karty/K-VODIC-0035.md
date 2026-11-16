---
id: K-VODIC-0035
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "V motorovém prostoru použijte kabel pro vyšší teplotu (třída C 125 °C nebo D 150 °C) a dimenzujte podle tabulky jeho výrobce."
hodnota: 125
jednotka: "°C (horní mez teplotní třídy C)"
rozsah: [125, 150]
podminky: "Jednožilové automobilové kabely; teplotní třídy podle výrobců s odkazem na ISO 6722-1 (stárnutí 3 000 h); běžný PVC kabel FLRY je do 105 °C (K-VODIC-0005). Hláška MOTOR_NEPOCITA v kalkulačce verze 2 (2. kolo): při uložení „motorový prostor“ kalkulačka nic nepočítá a vrátí jen tuto hlášku. Proč tabulka výrobce: zatížitelnost teplu odolných kabelů se v teple přepočítává jinými faktory než u PVC (Lapp Table 12-4 proti 12-2) a kalkulačka počítá jen s okolím do 30 °C. „Dimenzujte podle tabulky jeho výrobce“ je rada podle rozhodnutí Radka; konkrétní tabulky zatížitelnosti automobilových kabelů třídy C/D jsem nedohledal."
zdroje:
  - typ: datasheet
    nazev: "Prysmian: Automotive – Single-core Cables (stránka výrobce)"
    url: "https://australia.prysmian.com/products-and-solutions/transportation-and-mobility/automotive/single-core-cables"
    misto: "oddíly podle teplotních tříd: třída A 85 °C (T1, ISO 6722-1) převážně PVC, pro dveře a víka; do 105 °C / 3 000 h obvykle PVC; do 125 °C / 3 000 h teplu odolné (zesítěný PE), hlavní použití motorový prostor; do 150 °C / 3 000 h určené pro motorové prostory"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Caledonian Cables: FLR2X11Y, ISO 6722 Class C (datasheet 2×0,5 mm²)"
    url: "https://www.caledonian-cables.com/files/datasheet/automotive%20cables/FLR2X11Y/FLR2X11Y-ISO6722CLC-2C0.5.pdf"
    misto: "Applications: kabel pro ABS a vedení uvnitř motorového prostoru; Standards: ISO 6722 Class C; Operating temperature −40 až +125 °C"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Caledonian Cables: FLR2X-A, ISO 6722 Class C, 1×1,5 mm²"
    url: "https://www.caledonian-cables.com/files/datasheet/automotive%20cables/FLR2X-A/FLR2X-A-ISO%206722-1C1.5.pdf"
    misto: "Applications: obvody motoru a kostry baterie s vysokou teplotou, trvale −40 až +125 °C; ISO 6722 Class C; XLPE"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 2, Table 12-2 (vodič 70 °C: okolí 50 °C 0,71, 60 °C 0,50) a Table 12-4 (teplu odolné kabely, z tab. 18: do 50 °C 1,00; vodič 135 °C při 85 °C 1,00, při 105 °C 0,87); hlavička tabulek: maximální teplotu vodiče uvádí technický list konkrétního kabelu"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: motorový prostor se v alfě nepočítá, hláška MOTOR_NEPOCITA, 2. kolo 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "docs/ROZHODNUTI.md, řádek 2026-11-16 „Motorový prostor se v alfě nepočítá (hláška o kabelu třídy C 125 °C nebo D 150 °C a tabulce jeho výrobce).“; docs/KALKULACKA_PRUREZU.md, Verze 2, Výpočet bod 2 a bod 12 (text MOTOR_NEPOCITA)"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0035-2026-11-16-kolo3.md
schvalil: null
---

Poznámky rešeršéra:

Nová karta po 1. kole ověření (nález K-VODIC-0004, bod 2).

Třída C pro motorový prostor: dva nezávislí výrobci (Prysmian, Caledonian). Třída D 150 °C pro motorový prostor: jen Prysmian. Druhý zdroj pro třídu D jsem nedoložil (IEWC a Leoni stránky odmítly spojení nebo vrátily 404). Text normy ISO 6722-1 jsem neotevřel; přiřazení tříd C = 125 °C a D = 150 °C beru od výrobců.

Neplatí, že každý kabel v motorovém prostoru musí být třídy D; teplota se v motorovém prostoru liší podle místa. Kalkulačka radí „C nebo D“, volbu mezi nimi zdroje neupřesňují.

**2. kolo Radka 16. 11. 2026: co se změnilo.** Motorový prostor se už nepočítá (dřív koeficient 0,5). Tvrzení je teď přesně text hlášky MOTOR_NEPOCITA: „V motorovém prostoru použijte kabel pro vyšší teplotu (třída C 125 °C nebo D 150 °C) a dimenzujte podle tabulky jeho výrobce.“ Z podmínek vypuštěna úvaha „koeficient 0,5 je na bezpečné straně“ (koeficient už není). Přidán Lapp Table 12-4 jako doklad, že teplu odolné kabely mají jiné přepočtové faktory. Tvrzení se mění, stav zpět na `navrh`.

Nepodařilo se: tabulku zatížitelnosti konkrétního automobilového kabelu třídy C nebo D (Prysmian, Caledonian, Leoni) jsem nenašel; Caledonian a Prysmian uvádějí teplotní rozsah, ne zatížitelnost. Část „dimenzujte podle tabulky jeho výrobce“ je proto rada (rozhodnutí Radka), nikoli tvrzení o existenci takové tabulky u každého výrobce. Třída D pro motorový prostor má dál jen jeden zdroj (Prysmian).
