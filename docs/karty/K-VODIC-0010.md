---
id: K-VODIC-0010
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Kalkulačka vybírá pojistku z řady běžných jmenovitých hodnot automobilových pojistek 1 až 300 A (1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 250, 300 A)."
hodnota: null
jednotka: "A"
rozsah: null
podminky: "Nožové pojistky (ISO 8820-3) 1–40 A, šroubovací vysokoproudé (ISO 8820-5, např. MEGA, MIDI, ANL) nad 40 A. Dostupnost jednotlivých hodnot se liší podle typu pojistky."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: ATOF Blade Fuses, Rated 32V (rev. 08/18/2022), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/614/DOC034614307.pdf"
    misto: "tabulka Ratings: 1, 2, 3, 4, 5, 7,5, 10, 15, 20, 25, 30, 35, 40 A; Complies with SAE J1284, ISO 8820-3"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MEGA and MEGA Clear Top Fuse, Rated 32V (rev. 04/08/2024), kopie eicom.ru"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "s. 1: 40–250 A SLO-BLO, 300–500 A jen ochrana proti zkratu; Comply ISO 8820-5; s. 4 tabulka: 40, 60, 80, 100, 125, 150, 175, 200, 225, 250, 300 … 500 A"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "pole FUSES"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Hodnoty 1–40 A (kromě 4 A, kterou kalkulačka nepoužívá) jsou v řadě ATOF. 40–250 A pokrývá MEGA (bez 50 a 70 A). Hodnoty 50 a 70 A existují u jiných řad (MIDI, ANL), ale datasheet jsem neotevřel – ověřovatel ať doplní (např. Littelfuse MIDI nebo ANL).

**Nález pro Radka:** u řady MEGA jsou hodnoty 300 A a výš podle výrobce určené **jen jako ochrana proti zkratu**, ne pro trvalý provoz s přetížením. Kalkulačka nabízí 300 A jako běžnou pojistku (120 mm², CAPN). Pro 300 A by bylo vhodné uvést typ pojistky (např. ANL nebo Class T) nebo hlášku. Výpočet neměním.

Pozn.: ISO 8820-3 a -5 jsem neotevřel (placené).
