---
id: K-VYROBCE-0105
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Dometic (Waeco) SinePower MSI1812T předepisuje kabel 35 mm² a pojistku kabelu 228 A na kladném vodiči co nejblíž baterii (MSI912: 25 mm², 115 A); kabely co nejkratší, kratší než 1,8 m."
hodnota: null
jednotka: null
rozsah: null
podminky: "MSI1812T 12 V, 1600 W trvale, 3200 W špička. Délka kabelu pod 1,8 m (s. 15 nad tabulkou: „Keep the cables as short as possible (< 1.8 m)“); opraveno podle nálezu ověřovatele 18. 11. 2026."
zdroje:
  - typ: navod
    nazev: "Dometic: SinePower MSI912, MSI1812T Installation and Operating Manual (kopie návodu výrobce u prodejce)"
    url: "https://www.theboatwarehouse.com.au/content/dometic/dometic-sinepower-msi912-msi1812T-installation-manual.pdf"
    misto: "EN kap. Connecting the inverter, s. 15: tabulka Device / Required cable cross section / Cable fuse. Technical data s. 29: trvalý výkon 1600 W (25 °C), 1800 W 10 min, špička 3200 W, vstup 10,5–16 V, účinnost do 90 %. Technical data s. 31: podpěťové varování 11 V, vypnutí 10,5 V, restart 12,5 V"
    datum-overeni: 2026-11-18
vypocet: "In = 1600 / (0,9 · 12) = 148 A; na mezi 10,5 V 169 A. Pojistka 228 A / In = 1,54. Úbytek na 35 mm² při 1 m jedné cesty: 1,2 % (In), 1,9 % (228 A). Délka, při které by In dal 2,5 %: 2,0 m jedné cesty."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0105-2026-11-18.md
schvalil: "Radek, 2026-11-18 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra: Zdroj je PDF návodu výrobce na webu prodejce (oficiální soubor Dometic se nepodařilo otevřít v rozpočtu). Návod nedává délku; průřez je dimenzovaný na pojistku 228 A (tj. 1,54 × jmenovitý proud). Podpěťové vypnutí 10,5 V.
