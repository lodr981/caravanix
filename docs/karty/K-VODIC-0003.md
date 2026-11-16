---
id: K-VODIC-0003
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Základní zatížitelnost jednožilového měděného kabelu volně ve vzduchu při okolí 30 °C s jednou zatíženou žílou (DIN VDE 0298-4 tab. 11, sloupec 2) je: 0,75 mm² 15 A, 1 mm² 19 A, 1,5 mm² 24 A, 2,5 mm² 32 A, 4 mm² 42 A, 6 mm² 54 A, 10 mm² 73 A, 16 mm² 98 A, 25 mm² 129 A, 35 mm² 158 A, 50 mm² 198 A, 70 mm² 245 A, 95 mm² 292 A, 120 mm² 344 A; pro 0,5 mm² kalkulačka používá 12 A podle rozšíření výrobce Lapp. Kalkulačka tuto hodnotu násobí koeficientem podle uložení (K-VODIC-0004)."
hodnota: null
jednotka: "A"
rozsah: null
podminky: "Jednožilové kabely do 1 000 V (pryž, PVC, TPE, teplu odolné), volně ve vzduchu, **jedna zatížená žíla**, okolí 30 °C. Kalkulačka verze 2 (2. kolo) počítá s okolím do 30 °C. Pro dvojici plus a mínus vedle sebe a pro svazek platí koeficienty uložení (K-VODIC-0004); bez koeficientu (k = 1,0) jen při uložení „jeden vodič, mínus přes kostru“. Zdroje (Bayka, Lapp) uvádějí tuto hodnotu pro jednožilový kabel **volně ve vzduchu**; že platí beze změny i pro jeden vodič **připevněný k povrchu** (karoserie), se mi nepodařilo doložit (tab. 10 normy, která to řeší, je neveřejná). Použití k = 1,0 pro připevněný vodič je proto rozhodnutí Radka, ne údaj zdroje. Hodnota 0,5 mm² = 12 A není v tab. 11 sloupci 2 normy (Bayka tam uvádí „–“); je to rozšíření výrobce Lapp „v návaznosti na“ vydání 2003-08. Tab. 11 sl. 2 výslovně nejmenuje automobilové kabely FLRY (Lapp vyjmenovává LiY, H05V-K, H07V-K …); kalkulačka hodnoty pro FLRY přebírá. Dovolenou teplotu vodiče karta nedokládá."
zdroje:
  - typ: datasheet
    nazev: "Bayka (Bayerische Kabelwerke): TD06DE 07/2022, Strombelastbarkeit flexible Kupferkabel und -leitungen nach DIN VDE 0298-4"
    url: "https://www.bayka.de/wp-content/uploads/2022/03/TD06DE-Strombelastbarkeit-flexible-Kupferkabel-und-Leitungen.pdf"
    misto: "s. 2, tabulka (hodnoty podle VDE 0298-4 tab. 11), první sloupec hodnot „frei in Luft, einadrige Leitungen“ (tab. 11 sl. 2), počet zatížených žil 1: 0,5 mm² „–“, 0,75 → 15 A … 120 → 344 A; řádky převodních faktorů: pro tento sloupec teplota okolí i seskupení podle tab. 10"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Selection Table T12 Power Rating – Basic Table (výtah z DIN VDE 0298-4:2003-08)"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Miltronic_Denmark/2_produkter/Stroemvaerdib_T12.pdf"
    misto: "Table 12-1, sloupec A „Single core cable“, zdroj DIN VDE 0298-4, 2003-08, Table 11 Column 2; řádky 0,5–120 mm²; poznámka 2): „extended range for size 0.5 mm²“; poznámka 3): jednožilové kabely, které se dotýkají nebo jsou ve svazku, DC faktor 0,8 (ve vzduchu) nebo 0,76 (na povrchu)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 1, Table 12-1, sloupec A (řádky do 4 mm²); poznámka 2): „Extended range for 0.5 mm² in line with VDE 0298-4, 2003-08, table 11“; poznámka 3): seskupení jednožilových kabelů podle tab. 10"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "DIN VDE 0298-4, tab. 11 sloupec 2 a tab. 10 – text normy neotevřen, jen odkaz"
    url: ""
    misto: "tab. 11, sloupec 2"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: výpočet verze 2, tabulka AMP beze změny (12 A pro 0,5 mm² se zdrojem Lapp)"
    url: "docs/KALKULACKA_PRUREZU.md"
    misto: "kapitola Verze 2, Tabulky beze změny proti v1"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: uložení kabelu, 2. kolo 16. 11. 2026 (jeden vodič s mínusem přes kostru 1,0; okolí do 30 °C)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „Uložení kabelu: plus a mínus vedle sebe 0,76 (výchozí, připevněné k povrchu); jeden vodič s mínusem přes kostru 1,0 …“; docs/KALKULACKA_PRUREZU.md, Verze 2, tabulka Uložení"
    datum-overeni: 2026-11-16
vypocet: "Pole AMP reference porovnáno řádek po řádku: s Lapp 2003 sloupec A shoda ve všech 15 řádcích (0,5–120 mm²); s Bayka (tab. 11 sl. 2) shoda ve 14 řádcích (0,75–120 mm²), 0,5 mm² v Bayka bez hodnoty."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** (1) Druhý nezávislý zdroj: Bayka TD06DE (dohledal ověřovatel, otevřel jsem a porovnal). (2) 0,5 mm² = 12 A už netvrdím jako hodnotu normy, ale jako rozšíření výrobce Lapp; tak to Radek ve verzi 2 potvrdil. (3) Do tvrzení a podmínek doplněno „jedna zatížená žíla“ a že kalkulačka hodnotu násobí koeficientem podle uložení (v2: 0,8 vedle sebe, 1,0 kostra, 0,53 svazek, 0,5 motorový prostor). Tím odpadá nález, že text tvrdí víc než karta. (4) „PVC 70 °C“ z tvrzení vypuštěno, nemám pro něj zdroj; autor textu ho nemá používat.

Na bezpečnost nemá 0,5 mm² dopad: max. pojistka 0,5 mm² je ve všech uloženích nejvýš 7,5 A (strop CAPN/CAPH nebo AMP × k).

Tab. 10 normy (převodní faktory pro jednožilové kabely) jsem neotevřel; Bayka i Lapp na ni jen odkazují.

**2. kolo Radka 16. 11. 2026: co se změnilo.** Hodnoty tabulky se nemění. Mění se podmínky použití: koeficienty uložení jsou teď 0,76 / 1,0 / 0,53 (K-VODIC-0004), motorový prostor se nepočítá, okolí do 30 °C. Úkol zněl ověřit zdrojem, že základní tabulka platí i pro jeden vodič připevněný na povrchu. **Nepodařilo se:** Bayka uvádí sloupec 2 jen pro „frei in Luft“ (sloupec „auf oder an Flächen“ má jen pro vícežilové kabely), Lapp 2003 dává pro povrch jen faktor 0,76 pro jednožilové kabely, které se **dotýkají nebo jsou ve svazku**, a pro jednotlivý kabel na povrchu nic. Lapp 2013 i Bayka odkazují na tab. 10 normy, kterou jsem nikde veřejně nenašel. Proto v podmínkách výslovně: k = 1,0 pro připevněný vodič je rozhodnutí Radka. Protože se mění podmínky, ke kterým se tvrzení vztahuje, vracím kartu na `navrh`. Otázka pro Radka je v PREHLED.md.
