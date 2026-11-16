---
id: K-VODIC-0005
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Automobilové kabely FLRY v PVC výrobci deklarují do 105 °C (ISO 6722-1 je řadí do třídy B). Kalkulačka toho využívá: koeficienty uložení 1,0 a 0,7 (K-VODIC-0004) vycházejí z dovolené teploty 105 °C místo 70 °C."
hodnota: 105
jednotka: "°C"
rozsah: [100, 105]
podminky: "FLRY-A / FLRY-B v PVC podle datasheetů (−40 až +105 °C, ISO 6722-1 class B podle výrobců). Teplotní třída automobilových kabelů je definována pro stárnutí 3 000 h (Prysmian), ne pro neomezený provoz. Existují i automobilové kabely jen do 85 °C (třída A, Prysmian); kalkulačka počítá s FLRY 105 °C a uvádí to u výsledku. Podle ověřovatele má třída B v normě ISO 6722-1 horní mez 100 °C (text normy jsem neotevřel); i se 100 °C koeficienty 1,0 a 0,7 platí (pole vypocet). Na webu nepsat „ISO třída B = 105 °C“; 105 °C je deklarace výrobců kabelu FLRY."
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
  - typ: rozhodnuti-odbornika
    nazev: "Radek: kalkulačka průřezu v1.1, FLRY-B 105 °C jako základ koeficientů"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „Kalkulačka průřezu v1.1 … FLRY-B snese 105 °C, zatížitelnost roste s √((105 − 30) / (70 − 30)) ≈ 1,37 …“; docs/reset/KALKULACKA_V1_1.md, Základ: verze 1 platí"
    datum-overeni: 2026-11-16
vypocet: "Se 105 °C: √((105 − 30) / (70 − 30)) = 1,3693; 0,76 × 1,3693 = 1,041 ≥ 1,0; 0,532 × 1,3693 = 0,729 ≥ 0,7 (K-VODIC-0004). Kontrola se 100 °C (třída B podle normy): √((100 − 30) / 40) = √(70 / 40) = 1,3229 ≈ 1,32; 0,76 × 1,3229 = 1,005 ≥ 1,0; 0,532 × 1,3229 = 0,704 ≥ 0,7 (se zaokrouhleným 0,53: 0,701). Koeficienty 1,0 a 0,7 tedy platí i se 100 °C, rezerva je jen 0,2–0,5 %. Přepočteno v Node."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0005-2026-11-16-v11.md
schvalil: "Radek, 2026-11-16 (docs/RYCHLA_ALFA.md, krok 0)"
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Ve v1.1 je 105 °C u FLRY právě důvod koeficientů 1,0 a 0,7. Věta „kalkulačka hodnoty nezvyšuje“ byla vypuštěná, protože čtenáře plete. Nové tvrzení podle zadání mistra. Do `podminky` a `vypocet` přibyla kontrola se 100 °C (třída B podle ověřovatele): √(70 / 40) ≈ 1,32, koeficienty 1,0 a 0,7 platí také. `rozsah` je změněný z [85, 105] na [100, 105]: 85 °C je jiná třída kabelu (A), ne nejistota hodnoty pro FLRY. Odkaz na verzi 2 je nahrazený odkazem na v1.1. Lapp Table 12-2 / 12-4 tu jako zdroj už není, kontrola vzorce je v K-VODIC-0003. Stav `navrh`, `overil` vynulováno.

Pro ověřovatele (jedno kolo): výpočet se 105 °C a 100 °C a to, že FLRY-B je podle výrobců kabel 105 °C (datasheety výše).

Test podstatnosti, rezerva se 100 °C: koeficienty vycházejí jen o 0,2–0,5 % nad 1,0 a 0,7. Rozdíl je na bezpečné straně, rozhodnutí se nemění.

### Historie (před přepisem na v1.1)

**1. vrácení: co se změnilo.** (1) Odstraněn údaj „ISO 6722-1 třída B = 100 °C“; měl jen náhled z vyhledávání, byl neověřitelný. 105 °C je teď výslovně deklarace výrobců (tři datasheety, z toho dva nezávislé: Manex a Caledonian; rcscomponents má stejnou strukturu jako Manex). (2) Druhá část tvrzení přeformulována podle návrhu ověřovatele: místo „hodnoty mají rezervu“ tvrdí jen, že kabel s vyšší dovolenou teplotou ztrácí v teple méně, a že kalkulačka hodnoty nezvyšuje. Doloženo Lapp Table 12-2 a 12-4. (3) Vypuštěn předpoklad „PVC 70 °C“ (viz K-VODIC-0003). (4) Prysmian přidán jako nezávislý zdroj pro „do 105 °C obvykle PVC“ a „třída A 85 °C“.

Text normy ISO 6722-1 jsem neotevřel. Zda třída B v normě končí na 100 °C, nebo 105 °C, nerozhoduji; tvrzení na tom nestojí.

**Poznámka mistra (16. 11. 2026):** přepíše se pro v1.1 (zadání v docs/STAV.md): ve v1.1 je 105 °C u FLRY právě důvod koeficientů 1,0 a 0,7, takže věta „kalkulačka hodnoty nezvyšuje“ už čtenáře plete. Do přepsání stažena z KE_SCHVALENI.md. ISO 6722-1 třída B má podle ověřovatele 100 °C, 105 °C deklarují výrobci; i se 100 °C vychází √(70/40) ≈ 1,32 a koeficienty 0,70 a 1,00 platí, rozhodnutí se nemění.

Poznámka ověřovatele (v1.1, SEDÍ S POZNÁMKOU): „B“ v názvu FLRY-B podle datasheetu označuje konstrukci vodiče, ne teplotní třídu; na webu to nesměšovat.
