---
id: K-VYROBCE-0004
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Úplný návod Dometic CRX 50–140 určuje průřez podle délky kabelu grafem (12 V přímka asi od 3 mm² při 0 m do asi 20 mm² při 14 m; 24 V asi od 2 mm² do 18 mm² při 28 m), vypínací napětí 10,4 V a zapínací 11,7 V (24 V: 22,8 / 24,2 V), pojistku nejméně 15 A (12 V) nebo 7,5 A (24 V) a jmenovitý proud CRX 50 5,0 A při 12 V; jako příčinu poruchy „start při napětí pod vypínacím“ uvádí mimo jiné příliš malý průřez kabelu."
hodnota: null
jednotka: "mm², m, V, A"
rozsah: null
podminky: "Starší vydání návodu (graf přímky místo schodu); odečet z grafu ±1 mm². Jmenovitý proud 12 V: CRX 50 5,0 A, CRX 65 5,5 A, CRX 80 5,6 A; CRX 110 6,2 A, CRX 140 7,7 A (tabulka technických dat, sloupce ve výpisu posunuté, přiřazení podle pořadí řádků)."
zdroje:
  - typ: navod
    nazev: "Dometic CRX 50–140: Installation and Operating Manual (EN), kopie originálu u prodejce Defender"
    url: "https://defender.ca/assets/pdf/dometic/crx_owner_install_dim.pdf"
    misto: "PDF str. 9: obr. 14 (v textu „fig. d, page 9“), Ø/mm² proti l/m, přímky 12 V a 24 V. Str. 22 (EN, kap. Installing and connecting): tabulka Cut-off voltage 10,4 / 22,8 V, Cut-in voltage 11,7 / 24,2 V; Determine the required cross section of the cable in relation to the cable length according to fig. d; zásuvka jištěná nejméně 15 A (12 V) nebo 7,5 A (24 V). Tabulka poruch (Troubleshooting): Start attempt with UTerm < UOFF → Cable cross section too small → Replace the cable. Str. 35: Technical data, Rated current 12 V."
    datum-overeni: 2026-11-18
vypocet: "12 V: sklon asi 1,2 mm²/m + 3 mm². 5 m → asi 9 mm², R = 0,0175 × 10 / 9 = 0,019 Ω; při 5,0 A úbytek 0,10 V = 0,8 %; při 15 A 0,29 V = 2,4 %; při rozběhu 20 A 0,39 V = 3,2 %. Asymptoticky R = 0,0175 × 2 / 1,2 = 0,029 Ω (při 20 A 4,9 %)."
pouzito-v: [kalkulacka-prurez, doporuceni-vyrobcu]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0004-2026-11-18.md
schvalil: "Radek, 2026-11-18 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra:

Starší vydání je přísnější než aktuální krátký návod (K-VYROBCE-0003). PDF je originál Dometicu, hostovaný prodejcem (oficiální adresa nenalezena v rozpočtu). Hlavní hodnota karty je výslovná vazba průřez ↔ podpěťová ochrana v tabulce poruch: lednice měří napětí na svých svorkách, a když při rozběhu kompresoru úbytkem v kabelu klesne pod 10,4 V, vypne se.
