---
id: K-VYROBCE-0104
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Dometic SinePower DPSI předepisuje kabel a pojistku: DPSI612 25 mm² / 150 A, DPSI1012 35 mm² / 200 A, DPSI1512 50 mm² / 250 A, DPSI2012 70 mm² / 300 A, a DC kabely k baterii co nejkratší (do 1 m); pojistky u baterie."
hodnota: null
jednotka: null
rozsah: null
podminky: "Měniče DPSI 12 V (24 V v téže tabulce: 624 a 1524 25 mm² / 150 A, 1024 25 mm² / 150 A, 2024 35 mm² / 200 A). Délka kabelu do cca 1 m (≤ 1 m, ověřeno)."
zdroje:
  - typ: navod
    nazev: "Dometic: SinePower DPSI612…DPSI2024, Installation and Operating Manual, © 2026"
    url: "https://dometic.com/externalassets/08-0805-080529-080529001_9620017418_118775.pdf"
    misto: "EN, kapitola o připojení, s. 14: varování „Observe the recommended cable cross-sections, cable lengths and fuse“, délka DC kabelů co nejkratší (1 m), krok 1 tabulka Cable cross-section / Cable fuse. Kap. 16, s. 21–22: trvalý výkon 600 / 1000 / 1500 / 2000 W, 1 s špička 2× (1200…4000 W), max. účinnost 90 %, vstup 10,5–16,5 V; 16.2 podpěťové vypnutí 10,3 V (restart 11,8 V)"
    datum-overeni: 2026-11-18
vypocet: "In = výkon / (0,9 · 12): 1012 93 A, 1512 139 A, 2012 185 A. Úbytek na 1 m jedné cesty: 0,8 % (In), 0,9 % (na 10,3 V), 1,2–1,7 % (proud pojistky). Pojistka / In = 2,2 / 1,8 / 1,6."
pouzito-v: [kalkulacka-prurez, doporuceni-vyrobcu]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0104-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra: U Dometicu rozhoduje oteplení, ne úbytek: průřez je dimenzovaný na pojistku (1,6–2,2 × jmenovitý proud, kvůli dvojnásobné špičce), úbytek na 1 m je pod 1 %. Pro delší kabel Dometic tabulku nedává, jen „co nejkratší“. Vysoké podpěťové vypnutí 10,3 V je důvod, proč měnič úbytek špatně snáší.
