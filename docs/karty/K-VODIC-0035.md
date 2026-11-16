---
id: K-VODIC-0035
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "V motorovém prostoru použijte kabel pro vyšší teplotu: automobilový kabel teplotní třídy C (125 °C) nebo D (150 °C), ne běžný PVC kabel do 105 °C."
hodnota: 125
jednotka: "°C (horní mez teplotní třídy C)"
rozsah: [125, 150]
podminky: "Jednožilové automobilové kabely; teplotní třídy podle výrobců s odkazem na ISO 6722-1 (stárnutí 3 000 h). Hláška MOTOR_VYSSI_TRIDA v kalkulačce verze 2 při uložení „motorový prostor“. Kalkulačka sama zatížitelnost pro třídu C nebo D nepočítá: koeficient 0,5 (K-VODIC-0004) vychází z vodiče 70 °C při okolí 60 °C, pro kabel 125 °C je tedy na bezpečné straně."
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
  - typ: rozhodnuti-odbornika
    nazev: "Radek: výpočet verze 2, hláška MOTOR_VYSSI_TRIDA (docs/KALKULACKA_PRUREZU.md, docs/ROZHODNUTI.md 16. 11. 2026)"
    url: "docs/KALKULACKA_PRUREZU.md"
    misto: "kapitola Verze 2, Výpočet, bod 10"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Nová karta po 1. kole ověření (nález K-VODIC-0004, bod 2).

Třída C pro motorový prostor: dva nezávislí výrobci (Prysmian, Caledonian). Třída D 150 °C pro motorový prostor: jen Prysmian. Druhý zdroj pro třídu D jsem nedoložil (IEWC a Leoni stránky odmítly spojení nebo vrátily 404). Text normy ISO 6722-1 jsem neotevřel; přiřazení tříd C = 125 °C a D = 150 °C beru od výrobců.

Neplatí, že každý kabel v motorovém prostoru musí být třídy D; teplota se v motorovém prostoru liší podle místa. Kalkulačka radí „C nebo D“, volbu mezi nimi zdroje neupřesňují.
