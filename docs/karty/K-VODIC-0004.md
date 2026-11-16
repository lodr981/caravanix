---
id: K-VODIC-0004
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Zatížitelnost kabelu závisí na uložení; kalkulačka násobí základní hodnotu (K-VODIC-0003) koeficientem: plus a mínus vedle sebe 0,8, jeden vodič s mínusem přes kostru 1,0, ve svazku 0,53, v motorovém prostoru 0,5."
hodnota: null
jednotka: "násobek zatížitelnosti"
rozsah: [0.5, 1.0]
podminky: "Stejnosměrný obvod, jednožilové měděné kabely, základ DIN VDE 0298-4 tab. 11 sl. 2 (okolí 30 °C). 0,8: dva jednožilové kabely, které se dotýkají, volně ve vzduchu (Lapp 2003, pozn. 3). 1,0: jeden zatížený vodič. 0,53: jednožilové kabely na povrchu nebo ve svazku (0,76) × svazek 3 obvodů (0,70); při 4 obvodech by vyšlo 0,49, při 6 obvodech 0,43. 0,5: vodič s dovolenou teplotou 70 °C při okolí 60 °C (bez koeficientu svazku). Motorový prostor nad 60 °C a kombinaci svazku s motorovým prostorem kalkulačka nepokrývá; v motorovém prostoru navíc hláška o kabelu třídy C nebo D (K-VODIC-0035). O max. pojistce rozhoduje menší z AMP × k a stropu CAPN/CAPH (K-VODIC-0009)."
zdroje:
  - typ: datasheet
    nazev: "Lapp: Selection Table T12 Power Rating – Basic Table (výtah z DIN VDE 0298-4:2003-08)"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Miltronic_Denmark/2_produkter/Stroemvaerdib_T12.pdf"
    misto: "poznámka 3) pod Table 12-1: jednožilové kabely, které se dotýkají nebo jsou ve svazku: na površích pro 1~AC a DC faktor 0,76, volně ve vzduchu nebo na roštech pro 1~AC a DC faktor 0,8; použít před faktorem z Table 12-6 (resp. 12-8)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 2, Table 12-2 (z tab. 17): vodič 70 °C, okolí 40 °C 0,87, 50 °C 0,71, 60 °C 0,50; s. 3, Table 12-6 (z tab. 21) „Bundled directly on the wall … in pipes or ducts“: 2 obvody 0,80, 3 obvody 0,70, 4 obvody 0,65, 6 obvodů 0,57; s. 1 poznámka 3): seskupení jednožilových kabelů podle tab. 10"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Bayka: TD06DE 07/2022, Strombelastbarkeit flexible Kupferkabel und -leitungen nach DIN VDE 0298-4"
    url: "https://www.bayka.de/wp-content/uploads/2022/03/TD06DE-Strombelastbarkeit-flexible-Kupferkabel-und-Leitungen.pdf"
    misto: "s. 2, řádky Umrechnungsfaktoren: pro jednožilové kabely volně ve vzduchu (tab. 11 sl. 2) se teplota okolí i seskupení řeší podle tab. 10 normy (hodnoty tab. 10 Bayka neuvádí)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.5 Cable runs: kabel v uzavřené liště nemůže odvádět teplo, řešením je silnější kabel"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: výpočet verze 2, uložení se čtyřmi volbami, schváleno 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 16. 11. 2026 „uložení se čtyřmi volbami (vedle sebe 0,8; mínus přes kostru 1,0; svazek 0,53; motorový prostor 0,5)“; docs/KALKULACKA_PRUREZU.md, tabulka Uložení"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "DIN VDE 0298-4:2013-06, tab. 10, 17 a 21 – text normy neotevřen, jen odkaz"
    url: ""
    misto: "tab. 10 (jednožilové kabely: teplota a seskupení), tab. 17, tab. 21"
    datum-overeni: 2026-11-16
vypocet: "0,76 × 0,70 = 0,532 → v2 používá 0,53 (o 0,4 % níž, na bezpečné straně). 0,76 × 0,65 = 0,494 (4 obvody); 0,76 × 0,57 = 0,433 (6 obvodů). Teplotní faktor vodiče 70 °C: √((70 − 60)/(70 − 30)) = 0,50 (tabulka 0,50). Kombinace vedle sebe a 60 °C podle Lapp: 0,8 × 0,50 = 0,40. Max. pojistka v2 v bodech řady (min(AMP × k, strop) → nejbližší nižší z FUSES): vedle sebe rozhoduje AMP × 0,8 u 10, 16, 70, 95, 120 mm² (50, 70, 175, 225, 250 A), jinak CAPN; kostra vždy CAPN, kromě 120 mm² (300 není v řadě → 250 A); svazek rozhoduje AMP × 0,53 u všech průřezů kromě 1 mm² (CAPH 10 A); motorový prostor vždy AMP × 0,5 (např. 2,5 mm² 15 A, 16 mm² 40 A, 50 mm² 80 A, 120 mm² 150 A). Přepočteno v Pythonu (reprodukce bodu 5 výpočtu v2)."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0004-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** Karta popisovala v1 (jediný faktor 0,7 pro „svazek / motorový prostor“). Podle nálezu ověřovatele a Radkova rozhodnutí 16. 11. 2026 popisuje čtyři uložení verze 2. Faktor 0,70 už nepřiřazuji jednožilovým kabelům samotný: pro ně Lapp 2003 předepisuje nejdřív 0,76 / 0,8 a teprve potom tab. 12-6, Lapp 2013 a Bayka odkazují na tab. 10. Svazek 0,53 = 0,76 × 0,70. Motorový prostor má vlastní koeficient 0,5 (60 °C) a v podmínkách je výslovně, že nad 60 °C a v kombinaci se svazkem ho kalkulačka nepokrývá.

**Nález pro Radka (výpočet neměním):** Uložení „motorový prostor“ počítá s vlastním mínusem (n = 2), ale koeficient 0,5 je jen teplotní. Podle Lapp 2003 by pro dva dotýkající se vodiče při 60 °C vyšlo 0,8 × 0,50 = 0,40. V praxi to zmírňuje doporučený kabel třídy C/D (dovolená teplota 125–150 °C, K-VODIC-0035), pro který je faktor při 60 °C vyšší než 0,50 (Lapp Table 12-4: teplu odolné kabely 1,00 do 50 °C). Kvantifikaci pro třídu C jsem nedělal, tab. 12-4 pro 125 °C nemá sloupec.

Hodnoty tab. 10 samotné normy nemám; „svazek 0,53“ je proto doložen přes Lapp 2003 (0,76) a Lapp 2013 (0,70), ne přes tab. 10. Bayka a Lapp jsou dva nezávislí výrobci, ale oba jen vyňatky z normy.
