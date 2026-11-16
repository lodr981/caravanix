---
id: K-VODIC-0007
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Kalkulačka počítá jen s čistou mědí a kabel CCA nedoporučuje: pro stejný úbytek by CCA potřeboval asi 1,6× větší průřez, o jeden stupeň větší kabel to často nevyrovná. Pro automobilová lanka CCA jsme zatížitelnost nedohledali; NEC dává CCA hodnoty hliníku."
hodnota: 1.59
jednotka: "potřebný násobek průřezu"
rozsah: [1.55, 1.59]
podminky: "Úbytek napětí, CCA 10–15 % mědi podle ASTM B566, řada průřezů kalkulačky MM (0,5 až 120 mm²). Pro CCA 15 % stačí 1,55×, pro CCA 10 % 1,59×. Pro automobilová lanka CCA (FLRY a podobná) zatížitelnost ani jištění v otevřených zdrojích nedohledány. NEC (NFPA 70, USA, stavební vodiče) uvádí zatížitelnost v Table 310.16 ve společných sloupcích „Aluminum or copper-clad aluminum“, tedy CCA = hliník, nižší než měď. Kalkulačka CCA nepočítá, CCA do vozu nepoužívat (rozhodnutí Radka 16. 11. 2026)."
zdroje:
  - typ: datasheet
    nazev: "MWS Wire: Copper Clad Aluminum and Other Clad Metals"
    url: "https://mwswire.com/wp-content/uploads/2024/03/MWS-copper-clad-aluminum-other-clad-metals.pdf"
    misto: "tabulka Clad Metals: CCA 10 % 62,9 % IACS; CCA 15 % 64,4 % IACS"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Ulbrich: Lite Weight CCA & SPCCA Capability Sheet"
    url: "https://www.ulbrich.com/uploads/data-sheets/Ulbrich-Lite-Weight-Copper-Clad-Aluminum-Data-Sheet.pdf"
    misto: "CCA 10 % 62,85 % IACS; CCA 15 % 64,42 % IACS"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: texty průřezu – CCA nedoporučovat; přepínač CCA ve skupině B (mimo alfu), 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 16. 11. 2026 o textech průřezu; docs/KALKULACKA_PRUREZU.md, Nápady skupiny B: „CCA se nedoporučuje“"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 – pole MM (řada průřezů, v2 beze změny)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "pole MM"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "NFPA 70 (NEC) 2023, Table 310.16 – veřejný dokument NFPA Proposed TIA 1691 NFPA 70"
    url: "https://docinfofiles.nfpa.org/files/AboutTheCodes/70/Proposed_TIA_1691_NFPA_70.pdf"
    misto: "s. 1, Table 310.16 Ampacities of Insulated Conductors …: zatížitelnosti ve sloupcích „COPPER“ a „ALUMINUM OR COPPER-CLAD ALUMINUM“ (CCA má hodnoty hliníku)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: rozhodnutí sporu po druhém vrácení, 16. 11. 2026 (platí znění ověřovatele)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „Spory po druhém vrácení: platí znění ověřovatele. 0007: „Pro automobilová lanka CCA jsme zatížitelnost nedohledali; NEC dává CCA hodnoty hliníku.“ CCA do vozu nepoužívat.“"
    datum-overeni: 2026-11-16
vypocet: "Potřebný poměr průřezů pro stejný odpor = 1/IACS: 1/0,629 = 1,590; 1/0,6442 = 1,552. Poměr sousedních průřezů MM: 0,5→0,75 1,50; 0,75→1 1,33; 1→1,5 1,50; 1,5→2,5 1,67; 2,5→4 1,60; 4→6 1,50; 6→10 1,67; 10→16 1,60; 16→25 1,56; 25→35 1,40; 35→50 1,43; 50→70 1,40; 70→95 1,36; 95→120 1,26. Jeden stupeň stačí jen u 1,5→2,5, 2,5→4, 6→10, 10→16 a u 16→25 jen pro CCA 15 % (1,5625 ≥ 1,552, ale < 1,590). Nestačí u 0,5→0,75, 0,75→1, 1→1,5, 4→6 a u všech kroků od 25 mm² (chybí 12–26 %: 1,590/1,40 = 1,136; 1,590/1,263 = 1,259). Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0007-2026-11-16-kolo2.md
schvalil: "Radek, 2026-11-16 (rozhodnutí sporu)"
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** Ověřovatel shledal kartu věcně v pořádku, nesouhlasil text webu (rada „o stupeň větší“). Radek 16. 11. 2026 rozhodl CCA nedoporučovat, rada „o stupeň větší“ se vypouští. Tvrzení teď odpovídá novému textu: kalkulačka jen pro měď, CCA ne, s důvody. Opraveno podle nálezu: `rozsah` [1,55; 1,59]; výčet kroků doplněn o 0,5→0,75, 0,75→1, 1→1,5; u 16→25 rozlišeno CCA 10 % a 15 %.

Chybí druhý nezávislý primární zdroj k zatížitelnosti CCA (bezpečnostní část). Proto tvrzení neříká nic o tom, kolik CCA snese, jen že to doloženo není; doporučení „jen měď“ stojí na rozhodnutí Radka.

**Spor po 2. vrácení rozhodl Radek 16. 11. 2026.** Ověřovatel v kole 2 (NESEDÍ) doložil, že zatížitelnost CCA v otevřeném zdroji je: NEC Table 310.16 ji uvádí ve sloupci společném s hliníkem. Platí znění ověřovatele, které Radek převzal: „Pro automobilová lanka CCA jsme zatížitelnost nedohledali; NEC dává CCA hodnoty hliníku.“ Tvrzení je upravené přesně takto, přidán zdroj NEC (dokument NFPA jsem stáhl a sloupec ověřil) a rozhodnutí sporu. Stav `overeno`, `schvalil` podle rozhodnutí sporu; jako karta třídy A ještě projde schválením v KE_SCHVALENI.
