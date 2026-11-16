---
id: K-VODIC-0004
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Zatížitelnost kabelu závisí na uložení; kalkulačka násobí základní hodnotu (K-VODIC-0003) koeficientem: plus a mínus vedle sebe připevněné k povrchu 0,76, jeden vodič s mínusem přes kostru 1,0, svazek nejvýš 3 obvodů 0,53 (obvod = jeden spotřebič s plusem a mínusem). Pro 4 a více obvodů kalkulačka nepočítá a radí silové kabely vést zvlášť, nebo svazek rozdělit; motorový prostor nepočítá vůbec."
hodnota: null
jednotka: "násobek zatížitelnosti"
rozsah: [0.53, 1.0]
podminky: "Stejnosměrný obvod, jednožilové měděné kabely, základ DIN VDE 0298-4 tab. 11 sl. 2, okolí do 30 °C (vyšší teplota okolí není v koeficientech; viz K-VODIC-0039). 0,76: jednožilové kabely, které se dotýkají nebo jsou ve svazku, na povrchu, DC (Lapp 2003, pozn. 3); dva vodiče jednoho obvodu vedle sebe. 1,0: jeden zatížený vodič, mínus přes kostru; že základní hodnota platí i pro vodič připevněný na povrchu, zdroj nedokládá (K-VODIC-0003), je to rozhodnutí Radka. 0,53: 0,76 × 0,70 (Lapp 2013 Table 12-6, svazek 3 obvodů). 4 obvody by daly 0,76 × 0,65 = 0,49, 6 obvodů 0,76 × 0,57 = 0,43; proto kalkulačka svazek omezuje na 3 obvody a pro víc hlásí „Silové kabely veďte zvlášť, nebo svazek rozdělte.“ (volba počtu obvodů v kalkulačce není). Motorový prostor: jen hláška (K-VODIC-0035). O max. pojistce rozhoduje menší z AMP × k a stropu CAPN (vedle sebe, kostra) nebo CAPH (svazek), K-VODIC-0009."
zdroje:
  - typ: datasheet
    nazev: "Lapp: Selection Table T12 Power Rating – Basic Table (výtah z DIN VDE 0298-4:2003-08)"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Miltronic_Denmark/2_produkter/Stroemvaerdib_T12.pdf"
    misto: "poznámka 3) pod Table 12-1: jednožilové kabely, které se dotýkají nebo jsou ve svazku: na površích (on surfaces) pro 1~AC a DC faktor 0,76, použít před faktorem z Table 12-6; volně ve vzduchu nebo na roštech DC faktor 0,8, před Table 12-8"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 3, Table 12-6 (z tab. 21) „Bundled directly on the wall … in pipes or ducts“: 2 obvody 0,80, 3 obvody 0,70, 4 obvody 0,65, 6 obvodů 0,57; s. 1 poznámka 3): seskupení jednožilových kabelů na površích podle tab. 10"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Bayka: TD06DE 07/2022, Strombelastbarkeit flexible Kupferkabel und -leitungen nach DIN VDE 0298-4"
    url: "https://www.bayka.de/wp-content/uploads/2022/03/TD06DE-Strombelastbarkeit-flexible-Kupferkabel-und-Leitungen.pdf"
    misto: "s. 2, řádky Umrechnungsfaktoren: pro jednožilové kabely volně ve vzduchu (tab. 11 sl. 2) se teplota okolí i seskupení (Häufung) řeší podle tab. 10 normy (hodnoty tab. 10 Bayka neuvádí)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.5 Cable runs: kabely ve svazku nebo v uzavřené liště hůř odvádějí teplo, řešením je silnější kabel"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: uložení kabelu, 2. kolo 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „Uložení kabelu: plus a mínus vedle sebe 0,76 (výchozí, připevněné k povrchu); jeden vodič s mínusem přes kostru 1,0; svazek 0,53 nejvýš pro 3 obvody (pro víc hláška „Silové kabely veďte zvlášť, nebo svazek rozdělte.“, volba počtu obvodů ne). Motorový prostor se v alfě nepočítá … Okolí do 30 °C …“; docs/KALKULACKA_PRUREZU.md, Verze 2, tabulka Uložení"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "DIN VDE 0298-4:2013-06, tab. 10 a 21 – text normy neotevřen, jen odkaz"
    url: ""
    misto: "tab. 10 (jednožilové kabely: teplota a seskupení), tab. 21"
    datum-overeni: 2026-11-16
vypocet: "0,76 × 0,70 = 0,532 → 0,53 (o 0,4 % níž, na bezpečné straně). 0,76 × 0,65 = 0,494 (4 obvody); 0,76 × 0,57 = 0,433 (6 obvodů). Max. pojistka v2 (2. kolo) v bodech řady MM = největší nabízená hodnota (pojistky.json) ≤ min(AMP × k, strop) + 1e-9: vedle sebe (0,76, CAPN): 0,5→7,5; 0,75→10; 1→10; 1,5→15; 2,5→20; 4→30; 6→40; 10→50; 16→70; 25→80; 35→100; 50→150; 70→175; 95→200; 120→250 A. Kostra (1,0, CAPN): 7,5; 10; 15; 15; 20; 30; 40; 60; 80; 100; 125; 150; 200; 250; 250 A. Svazek (0,53, CAPH): 5; 7,5; 10; 10; 15; 20; 25; 30; 50; 60; 80; 100; 125; 150; 175 A. Proti 1. kolu (0,8) klesá max. pojistka vedle sebe u 1 mm² (15→10), 25 mm² (100→80), 35 mm² (125→100) a 95 mm² (225→200 A). Přepočteno v Pythonu nezávislou implementací kapitoly „Verze 2: co platí“."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**2. kolo Radka 16. 11. 2026: co se změnilo.** Karta byla `overeno` pro 1. kolo (0,8 / 1,0 / 0,53 / 0,5). Ve 2. kole: vedle sebe 0,76 (připevněné k povrchu, Lapp „on surfaces“, jak navrhl ověřovatel v kole 2, bod 2), kostra 1,0, svazek 0,53 jen do 3 obvodů s definicí obvodu, motorový prostor se nepočítá, okolí do 30 °C. Tvrzení se mění, stav zpět na `navrh`. Do tvrzení přibyla věta pro 4 a více obvodů (hláška „Silové kabely veďte zvlášť, nebo svazek rozdělte.“); doklad: koeficient by klesl pod 0,53 (Lapp Table 12-6: 4 obvody 0,65 → 0,49).

**Co doloženo není:** (1) Jeden vodič připevněný k povrchu = plná základní hodnota (k = 1,0). Lapp a Bayka uvádějí základ pro „volně ve vzduchu“; faktor pro jednotlivý vodič na povrchu je v tab. 10 normy, kterou nemám. (2) Že „obvod“ v Lapp Table 12-6 odpovídá dvojici plus–mínus jednoho stejnosměrného spotřebiče: Lapp tabulku popisuje pro „circuits“ ze dvou nebo tří zatížených žil, výslovně pro DC dvojici ne. (3) Hodnoty tab. 10 normy samotné. Svazek 0,53 stojí na dvou dokumentech jednoho výrobce (Lapp 2003 a 2013); Bayka jen odkazuje na tab. 10.

Pro text webu: „0,76“ platí pro kabely připevněné k povrchu. Kdo vede plus a mínus volně ve vzduchu, je na bezpečné straně (Lapp 0,8).
