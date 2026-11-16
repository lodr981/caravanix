---
id: K-VODIC-0005
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Automobilové kabely FLRY v PVC izolaci výrobci obvykle deklarují do 105 °C (existují i automobilové kabely jen do 85 °C). Kabel s vyšší dovolenou teplotou ztrácí v teplém okolí méně zatížitelnosti než kabel 70 °C; hodnoty zatížitelnosti při 30 °C tím kalkulačka nezvyšuje."
hodnota: 105
jednotka: "°C"
rozsah: [85, 105]
podminky: "FLRY-A / FLRY-B v PVC podle datasheetů (−40 až +105 °C, ISO 6722-1 class B podle výrobců). Teplotní třída automobilových kabelů je definována pro stárnutí 3 000 h (Prysmian), ne pro neomezený provoz. Výhoda vyšší dovolené teploty se projeví až při okolí nad 30 °C (Lapp Table 12-2 a 12-4); při 30 °C dávají teplu odolné kabely v tab. 12-1 stejné hodnoty jako PVC. Kalkulačka verze 2 počítá s tabulkou při 30 °C (K-VODIC-0003) a s koeficienty uložení (K-VODIC-0004); vyšší třídu kabelu nezohledňuje."
zdroje:
  - typ: datasheet
    nazev: "Data sheet FLRY-A / FLRY-B (PVC, ISO 6722-1; list s kontaktem firmy Manex, PL; kopie chipdip.ru)"
    url: "https://static.chipdip.ru/lib/604/DOC035604408.pdf"
    misto: "Technical data: Insulation PVC, class B (acc. to ISO 6722-1); Temperature range −40 °C ÷ +105 °C"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Caledonian Cables: FLRY-B ISO 6722 1×25 mm²"
    url: "https://www.caledonian-cables.com/files/datasheet/automotive%20cables/FLRY-B/FLRY-B-ISO%206722-1C25.00.pdf"
    misto: "Standards: ISO 6722 Class B; Operating temperature −40 °C to 105 °C"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Data sheet FLRY-B (ISO 6722-1, DIN 72551-6; kopie rcscomponents.kiev.ua, výrobce na listu neuveden)"
    url: "https://www.rcscomponents.kiev.ua/datasheets/flry-b-2datasheet.pdf"
    misto: "Technical data: Working temperature −40 °C ÷ 105 °C"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Prysmian: Automotive – Single-core Cables (stránka výrobce)"
    url: "https://australia.prysmian.com/products-and-solutions/transportation-and-mobility/automotive/single-core-cables"
    misto: "jednožilové kabely do 105 °C / 3 000 h jsou obvykle v PVC; třída A 85 °C (T1, ISO 6722-1) převážně PVC, pro místa s nízkým tepelným namáháním (dveře, víka)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 2, Table 12-2 (z tab. 17): okolí 50 °C → vodič 70 °C 0,71, 80 °C 0,77, 90 °C 0,82; okolí 60 °C → 70 °C 0,50, 80 °C 0,63, 90 °C 0,71. Table 12-4 (z tab. 18): teplu odolné kabely 90–180 °C faktor 1,00 do 50 °C okolí. s. 1, Table 12-1 sloupec A: jedna hodnota pro pryž, PVC, TPE i teplu odolné kabely při 30 °C"
    datum-overeni: 2026-11-16
vypocet: "Příklad 60 °C okolí: vodič 70 °C 0,50, vodič 90 °C 0,71, tj. o 42 % víc zatížitelnosti (0,71 / 0,50 = 1,42). 50 °C: 0,82 / 0,71 = 1,15. Pro 105 °C Lapp sloupec nemá; hodnotu pro FLRY 105 °C jsem nepočítal."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0005-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** (1) Odstraněn údaj „ISO 6722-1 třída B = 100 °C“; měl jen náhled z vyhledávání, byl neověřitelný. 105 °C je teď výslovně deklarace výrobců (tři datasheety, z toho dva nezávislé: Manex a Caledonian; rcscomponents má stejnou strukturu jako Manex). (2) Druhá část tvrzení přeformulována podle návrhu ověřovatele: místo „hodnoty mají rezervu“ tvrdí jen, že kabel s vyšší dovolenou teplotou ztrácí v teple méně, a že kalkulačka hodnoty nezvyšuje. Doloženo Lapp Table 12-2 a 12-4. (3) Vypuštěn předpoklad „PVC 70 °C“ (viz K-VODIC-0003). (4) Prysmian přidán jako nezávislý zdroj pro „do 105 °C obvykle PVC“ a „třída A 85 °C“.

Text normy ISO 6722-1 jsem neotevřel. Zda třída B v normě končí na 100 °C, nebo 105 °C, nerozhoduji; tvrzení na tom nestojí.
