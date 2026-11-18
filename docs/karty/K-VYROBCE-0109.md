---
id: K-VYROBCE-0109
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Victron Orion-Tr Smart isolated (360–400 W) doporučuje na 12V straně (vstup i výstup) pojistku u baterie 60 A a nejmenší průřez 6 mm² (0,5 m), 10 mm² (1 m a 2 m), 16 mm² (5 m a 10 m)."
hodnota: null
jednotka: null
rozsah: null
podminky: "Orion-Tr Smart 12/12-30 isolated: výstup 30 A trvale (40 A 10 s), účinnost 87 %, vstup 8–17 V, vypnutí 7 V. Tabulka je společná pro 12V stranu všech modelů 360–400 W (24 V: 30 A, 4–10 mm²). Délka bez upřesnění. 16 mm² je největší průřez svorky."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Orion-Tr Smart DC-DC Charger Isolated manual, kap. 4 Installation"
    url: "https://www.victronenergy.com/media/pg/Orion-Tr_Smart_DC-DC_Charger_-_Isolated/en/installation.html"
    misto: "kap. 4.2 Cable and fuse recommendations, Figure 6: Cable and fuse recommendations (řádek 12 V: 60 A; 0,5 / 1 / 2 / 5 / 10 m → 6 / 10 / 10 / 16 / 16 mm²)"
    datum-overeni: 2026-11-18
  - typ: navod
    nazev: "Victron Energy: Orion-Tr Smart DC-DC Charger Isolated manual, kap. 8 Specifications"
    url: "https://www.victronenergy.com/media/pg/Orion-Tr_Smart_DC-DC_Charger_-_Isolated/en/specifications.html"
    misto: "Table 1, sloupec 12/12-30: vstup 8–17 V, vypnutí 7 V, výstup 30 A, max. 40 A (10 s), účinnost 87 %"
    datum-overeni: 2026-11-18
vypocet: "Vstupní proud 30 · 12,2 / (0,87 · 12) = 35 A (při 10 V vstupu 42 A). Úbytek obou vodičů (jedna cesta): 6 mm² 0,5 m 0,9 %; 10 mm² 1 m 1,0 %; 10 mm² 2 m 2,0 %; 16 mm² 5 m 3,2 %; 16 mm² 10 m 6,4 % (strop svorky). Pojistka 60 A = 1,7 × vstupní proud = zkratový proud výstupu."
pouzito-v: [kalkulacka-prurez, doporuceni-vyrobcu]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0109-2026-11-18.md
schvalil: "Radek, 2026-11-18 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra: Do 2 m tabulka drží úbytek do 2 %; na 5 a 10 m ji omezuje největší průřez svorky (16 mm²), takže úbytek roste na 3–6 %. Pojistka 60 A znamená, že 6 mm² na 0,5 m musí snést 60 A; vstup boosteru je navíc buck-boost, úbytek na vstupu se projeví hlavně ztrátou a dřívějším vypnutím při nízkém napětí startovací baterie.
