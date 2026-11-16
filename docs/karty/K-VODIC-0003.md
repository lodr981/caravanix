---
id: K-VODIC-0003
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Základní zatížitelnost jednožilového měděného kabelu volně ve vzduchu při okolí 30 °C s jednou zatíženou žílou (DIN VDE 0298-4 tab. 11, sloupec 2) je: 0,75 mm² 15 A, 1 mm² 19 A, 1,5 mm² 24 A, 2,5 mm² 32 A, 4 mm² 42 A, 6 mm² 54 A, 10 mm² 73 A, 16 mm² 98 A, 25 mm² 129 A, 35 mm² 158 A, 50 mm² 198 A, 70 mm² 245 A, 95 mm² 292 A, 120 mm² 344 A; pro 0,5 mm² kalkulačka používá 12 A podle rozšíření výrobce Lapp. Tabulka platí pro PVC kabel 70 °C; kalkulačka ji používá pro automobilový kabel FLRY 105 °C (rozhodnutí odborníka, v1.1) a násobí ji koeficientem uložení 1,0 nebo 0,7 (K-VODIC-0004)."
hodnota: null
jednotka: "A"
rozsah: null
podminky: "Tabulka: jednožilové kabely do 1 000 V, volně ve vzduchu, jedna zatížená žíla, okolí 30 °C, dovolená teplota vodiče 70 °C (PVC). Kalkulačka v1.1 počítá s okolím do 30 °C a s automobilovým kabelem FLRY s izolací 105 °C (K-VODIC-0005). Protože zatížitelnost roste s odmocninou dovoleného oteplení, snese kabel 105 °C při okolí 30 °C asi 1,37× hodnotu tabulky; z toho vycházejí koeficienty uložení 1,0 (samostatně) a 0,7 (ve svazku), K-VODIC-0004. Použití tabulky pro FLRY 105 °C je rozhodnutí Radka (v1.1), ne údaj zdroje: tab. 11 sl. 2 výslovně nejmenuje automobilové kabely (Lapp vyjmenovává LiY, H05V-K, H07V-K …). Hodnota 0,5 mm² = 12 A není v tab. 11 sl. 2 normy (Bayka tam uvádí „–“); je to rozšíření výrobce Lapp „v návaznosti na“ vydání 2003-08. Platné vydání normy je DIN VDE 0298-4:2023-06 (nahrazuje 2013-06); výtahy Lapp jsou z vydání 2003-08 a 2013-06, Bayka 07/2022. Zda se tab. 11 ve vydání 2023-06 změnila, neověřeno (norma neotevřena; podle seznamu změn DIN Media se měnila tab. 9, příloha C a redakční úpravy). Uložení vodiče na povrchu (karoserie) řeší koeficient v K-VODIC-0004."
zdroje:
  - typ: datasheet
    nazev: "Bayka (Bayerische Kabelwerke): TD06DE 07/2022, Strombelastbarkeit flexible Kupferkabel und -leitungen nach DIN VDE 0298-4"
    url: "https://www.bayka.de/wp-content/uploads/2022/03/TD06DE-Strombelastbarkeit-flexible-Kupferkabel-und-Leitungen.pdf"
    misto: "s. 2, tabulka (hodnoty podle VDE 0298-4 tab. 11), první sloupec hodnot „frei in Luft, einadrige Leitungen“ (tab. 11 sl. 2), počet zatížených žil 1: 0,5 mm² „–“, 0,75 → 15 A … 120 → 344 A"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Selection Table T12 Power Rating – Basic Table (výtah z DIN VDE 0298-4:2003-08)"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Miltronic_Denmark/2_produkter/Stroemvaerdib_T12.pdf"
    misto: "Table 12-1, sloupec A „Single core cable“, zdroj DIN VDE 0298-4, 2003-08, Table 11 Column 2; řádky 0,5–120 mm²; poznámka 2): „extended range for size 0.5 mm²“"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 1, Table 12-1, sloupec A (jen řádky do 4 mm²); poznámka 2): „Extended range for 0.5 mm² in line with VDE 0298-4, 2003-08, table 11“; s. 2, Table 12-2 (z tab. 17), sloupec vodič 70 °C: okolí 40 °C 0,87, 50 °C 0,71, 60 °C 0,50 (kontrola vzorce v poli vypocet)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: kalkulačka průřezu v1.1, tabulka AMP (VDE 0298-4, PVC 70 °C) použitá pro FLRY 105 °C"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „Kalkulačka průřezu v1.1 … Zdůvodnění: VDE 0298-4 je pro PVC 70 °C, FLRY-B snese 105 °C, zatížitelnost roste s √((105 − 30) / (70 − 30)) ≈ 1,37 …“; docs/reset/KALKULACKA_V1_1.md, Základ: verze 1 platí; docs/KALKULACKA_PRUREZU.md, Verze 1.1, Proč platí v1 a Beze změny z v1 (tabulka AMP)"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "DIN VDE 0298-4:2023-06 (nahrazuje 2013-06), tab. 11 sloupec 2 – text normy neotevřen, jen odkaz"
    url: "https://www.dinmedia.de/en/standard/din-vde-0298-4/365464693"
    misto: "tab. 11, sloupec 2; stránka DIN Media: stav platné, nahrazuje DIN VDE 0298-4:2013-06 (podle nálezu ověřovatele K-VODIC-0004, kolo 4)"
    datum-overeni: 2026-11-16
vypocet: "Pole AMP reference porovnáno řádek po řádku: s Lapp 2003 sloupec A shoda ve všech 15 řádcích (0,5–120 mm²); s Bayka (tab. 11 sl. 2) shoda ve 14 řádcích (0,75–120 mm²). Základ v1.1: zatížitelnost ∝ √(dovolená teplota vodiče − teplota okolí). FLRY 105 °C proti tabulce 70 °C při okolí 30 °C: √((105 − 30) / (70 − 30)) = √(75 / 40) = 1,3693 ≈ 1,37. Kontrola, že stejný vzorec dává koeficienty IEC/VDE pro PVC 70 °C (Lapp Table 12-2): okolí 40 °C √((70 − 40) / 40) = 0,866 → 0,87; okolí 50 °C √(20 / 40) = 0,707 → 0,71; okolí 60 °C √((70 − 60) / 40) = 0,500 → 0,50; shoda ve všech třech. Přepočteno v Node."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Tabulka hodnot je beze změny (VDE 0298-4 tab. 11 sl. 2, 0,5 mm² podle Lapp). Nový je základ: tabulka platí pro PVC 70 °C a kalkulačka ji používá pro FLRY 105 °C jako rozhodnutí odborníka (Radek, v1.1). Výpočet √(75 / 40) ≈ 1,37 je v poli `vypocet` i s kontrolou proti Lapp Table 12-2 (0,87 / 0,71 / 0,50). Pasáž o neověřeném k = 1,0 pro vodič na povrchu je nahrazená odkazem na K-VODIC-0004: koeficient 1,0 tam plyne z výpočtu 0,76 × 1,37 ≈ 1,04. Vydání normy je opravené na platné 2023-06 (nahrazuje 2013-06). Odkazy na verzi 2 jsou nahrazené odkazem na v1.1. Stav `navrh`, `overil` vynulováno.

Pro ověřovatele (jedno kolo): jen výpočet 1,37 a kontrola 0,87 / 0,50. To, že FLRY-B je kabel 105 °C podle výrobců, dokládá K-VODIC-0005.

„PVC 70 °C“ je v tvrzení na základě rozhodnutí Radka (v1.1). Přímý zdroj, že tab. 11 sl. 2 je pro vodič 70 °C, jsem nově nehledal (zadání: stačí rozhodnutí odborníka). Nepřímo to podporuje, že Lapp Table 12-2 (sloupec vodič 70 °C) se k Table 12-1 vztahuje jako přepočet na jinou teplotu okolí.

### Historie (před přepisem na v1.1)

**1. vrácení: co se změnilo.** (1) Druhý nezávislý zdroj: Bayka TD06DE (dohledal ověřovatel, otevřel jsem a porovnal). (2) 0,5 mm² = 12 A už netvrdím jako hodnotu normy, ale jako rozšíření výrobce Lapp; tak to Radek ve verzi 2 potvrdil. (3) Do tvrzení a podmínek doplněno „jedna zatížená žíla“ a že kalkulačka hodnotu násobí koeficientem podle uložení (v2: 0,8 vedle sebe, 1,0 kostra, 0,53 svazek, 0,5 motorový prostor). Tím odpadá nález, že text tvrdí víc než karta. (4) „PVC 70 °C“ z tvrzení vypuštěno, nemám pro něj zdroj; autor textu ho nemá používat.

Na bezpečnost nemá 0,5 mm² dopad: max. pojistka 0,5 mm² je ve všech uloženích nejvýš 7,5 A (strop CAPN/CAPH nebo AMP × k).

Tab. 10 normy (převodní faktory pro jednožilové kabely) jsem neotevřel; Bayka i Lapp na ni jen odkazují.

**2. kolo Radka 16. 11. 2026: co se změnilo.** Hodnoty tabulky se nemění. Mění se podmínky použití: koeficienty uložení jsou teď 0,76 / 1,0 / 0,53 (K-VODIC-0004), motorový prostor se nepočítá, okolí do 30 °C. Úkol zněl ověřit zdrojem, že základní tabulka platí i pro jeden vodič připevněný na povrchu. **Nepodařilo se:** Bayka uvádí sloupec 2 jen pro „frei in Luft“ (sloupec „auf oder an Flächen“ má jen pro vícežilové kabely), Lapp 2003 dává pro povrch jen faktor 0,76 pro jednožilové kabely, které se **dotýkají nebo jsou ve svazku**, a pro jednotlivý kabel na povrchu nic. Lapp 2013 i Bayka odkazují na tab. 10 normy, kterou jsem nikde veřejně nenašel. Proto v podmínkách výslovně: k = 1,0 pro připevněný vodič je rozhodnutí Radka. Protože se mění podmínky, ke kterým se tvrzení vztahuje, vracím kartu na `navrh`. Otázka pro Radka je v PREHLED.md.

**Poznámka mistra (16. 11. 2026):** přepíše se na základ v1.1 podle zadání v docs/STAV.md (rozhodnutí odborníka + √((105 − 30) / (70 − 30)) ≈ 1,37). Otázka „k = 1,0 pro jeden vodič na povrchu“ se zavírá: v1.1 ji řeší výpočtem 0,76 × 1,37 ≈ 1,04 → 1,0. Tab. 10 normy se nehledá.
