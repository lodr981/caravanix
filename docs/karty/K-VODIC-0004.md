---
id: K-VODIC-0004
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Samostatně vedený kabel (plus a mínus vedle sebe, nebo mínus přes kostru) koeficient 1,0, ve svazku 0,7."
hodnota: null
jednotka: "násobek základní zatížitelnosti (K-VODIC-0003)"
rozsah: [0.7, 1.0]
podminky: "Stejnosměrný obvod, jednožilové měděné automobilové kabely FLRY s izolací 105 °C (K-VODIC-0005), okolí do 30 °C, základ DIN VDE 0298-4 tab. 11 sl. 2 (K-VODIC-0003). Koeficienty jsou rozhodnutí odborníka (Radek, v1, potvrzeno v1.1) se zdůvodněním výpočtem: faktory VDE pro kabel 70 °C (Lapp: 0,76 pro jednožilové kabely, které se dotýkají, na povrchu, DC; 0,70 pro svazek 3 obvodů) vynásobené poměrem 1,37 pro kabel 105 °C (K-VODIC-0003) dávají 1,04 a 0,73, kalkulačka bere 1,0 a 0,7 (o 4 % níž, bezpečná strana). Pro informaci, ne jako hláška kalkulačky: faktor svazku 0,70 platí podle Lapp pro nejvýš 3 obvody z kabelů stejného typu, podobně zatížených, stejně uložených, s průřezy lišícími se nejvýš o jeden stupeň; počet obvodů kalkulačka nezná (volba je v docs/ZASOBNIK.md). Max. pojistka = největší pojistka z řady FUSES v1.1 (K-VODIC-0010) ≤ min(AMP × k, strop), strop CAPN samostatně a CAPH ve svazku (K-VODIC-0009). 0,76 je z výtahů vydání DIN VDE 0298-4:2003-08 (Lapp DK, Lapp USA); výtah z vydání 2013-06 odkazuje na neveřejnou tab. 10 a platné vydání je 2023-06 (nahrazuje 2013-06; změny podle DIN Media jen v tab. 9, příloze C a redakční). Hodnoty vydání 2023-06 neověřeny (norma neotevřena). Motorový prostor kalkulačka nepočítá (K-VODIC-0035)."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: koeficienty uložení 1,0 a 0,7 (v1, schváleno 11. 11. 2026, potvrzeno v1.1 16. 11. 2026)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „Kalkulačka průřezu v1.1 … koeficienty 1,0 / 0,7 … svazek 0,53 × 1,37 ≈ 0,73 → 0,7 platí; vedle sebe na povrchu 0,76 × 1,37 ≈ 1,04 → 1,0 platí.“; docs/reset/KALKULACKA_V1_1.md, Základ: verze 1 platí; kód reference v1: k = hot ? 0.7 : 1"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Selection Table T12 Power Rating – Basic Table (výtah z DIN VDE 0298-4:2003-08)"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Miltronic_Denmark/2_produkter/Stroemvaerdib_T12.pdf"
    misto: "poznámka 3) pod Table 12-1: jednožilové kabely, které se dotýkají nebo jsou ve svazku: na površích (on surfaces) pro 1~AC a DC faktor 0,76, použít před faktorem z Table 12-6; volně ve vzduchu nebo na roštech DC faktor 0,8"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp USA: Cable Guide, T12 Power Rating (výtah z DIN VDE 0298-4:2003-08)"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Lapp_USA/Brochures/Cable_Guide/Power_Rating.pdf"
    misto: "s. 2, poznámka 3) pod Basic Table: na površích faktor 0,76 před Table 12-6; s. 4, Table 12-6 (2003-08 tab. 21) „On floors or walls … bunched directly as well as in conduits“: 1,00; 0,80; 0,70; 0,65; 0,60; 0,57 pro 1–6 obvodů; „Notice“: jen pro podobně zatížené kabely stejného uložení, průřezy nejvýš o jeden stupeň"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 3, Table 12-6 (z tab. 21): 2 obvody 0,80, 3 obvody 0,70, 4 obvody 0,65, 6 obvodů 0,57; poznámka IMPORTANT (stejný typ, stejné zatížení, průřezy nejvýš o jeden stupeň); s. 1 poznámka 3): seskupení jednožilových kabelů na površích podle tab. 10"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "DIN VDE 0298-4:2023-06 (nahrazuje 2013-06), tab. 10 a 21 – text normy neotevřen, jen odkaz"
    url: "https://www.dinmedia.de/en/standard/din-vde-0298-4/365464693"
    misto: "tab. 10 (jednožilové kabely: teplota a seskupení), tab. 21; stránka DIN Media: platné, nahrazuje 2013-06 (nález ověřovatele K-VODIC-0004, kolo 4, bod 1)"
    datum-overeni: 2026-11-16
vypocet: "Poměr pro kabel 105 °C (K-VODIC-0003): √((105 − 30) / (70 − 30)) = 1,3693 ≈ 1,37. Samostatně (plus a mínus vedle sebe na povrchu): 0,76 × 1,3693 = 1,0407 ≈ 1,04 → kalkulačka 1,0. Svazek 3 obvodů: 0,76 × 0,70 = 0,532 ≈ 0,53; 0,532 × 1,3693 = 0,7285 (se zaokrouhleným 0,53: 0,7257) ≈ 0,73 → kalkulačka 0,7. Mínus přes kostru (jeden zatížený vodič) je na tom tepelně lépe než dvojice vedle sebe, 1,0 tam tedy platí také. Max. pojistka v1.1 v bodech řady MM (FUSES bez 300 A, min(AMP × k, strop)): samostatně (1,0, CAPN): 0,5→7,5; 0,75→10; 1→15; 1,5→15; 2,5→20; 4→30; 6→40; 10→60; 16→80; 25→100; 35→125; 50→150; 70→200; 95→250; 120→250 A. Ve svazku (0,7, CAPH): 7,5; 10; 10; 15; 20; 25; 35; 50; 60; 80; 100; 125; 150; 200; 225 A. Proti v1 (FUSES s 300 A) se mění jen 120 mm² samostatně: 300 → 250 A. Přepočteno v Node (reference v1 se změnami v1.1)."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0004-2026-11-16-v11.md
schvalil: "Radek, 2026-11-16 (docs/RYCHLA_ALFA.md, krok 0)"
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Tvrzení je nové: koeficient 1,0 pro samostatně vedený kabel (plus a mínus vedle sebe, nebo mínus přes kostru) a 0,7 ve svazku. Zdroj je rozhodnutí odborníka (Radek, v1, potvrzeno v1.1) a výpočet 0,76 × 1,37 ≈ 1,04 → 1,0 a 0,76 × 0,70 × 1,37 ≈ 0,73 → 0,7. Zdroje 0,76 a 0,70 (Lapp) zůstávají. Koeficienty 0,76 / 0,53 / 1,0 a motorový prostor už nejsou výpočet kalkulačky. Jsou to vstupy zdůvodnění a historie verze 2 (níž). Hláška „Silové kabely veďte zvlášť …“ ve v1.1 není; podmínka svazku (podobné kabely, nejvýš 3 obvody) zůstává v `podminky` jen jako informace, počet obvodů je v zásobníku. Vydání normy je opravené: platné je 2023-06, nahrazuje 2013-06 (nález kolo 4, bod 1). Max. pojistky jsou přepočtené pro v1.1 (FUSES bez 300 A, CAPN/CAPH). Stav `navrh`, `overil` vynulováno.

Pro ověřovatele (jedno kolo): jen výpočet 1,04 a 0,73. Třída 105 °C u FLRY-B je v K-VODIC-0005.

Test podstatnosti, svazek s více než 3 obvody: faktor 0,65 (4 obvody) dává 0,76 × 0,65 × 1,3693 = 0,676, tedy o 3 % méně než 0,7. Max. pojistku ve svazku omezuje strop CAPH, který je 0,53 až 0,685 × AMP (K-VODIC-0009): pod 0,676 je u 13 z 15 průřezů, u 10 a 95 mm² je o 1 % výš (0,685). Rozdíl je v řádu procent, na bezpečnost v běžném případě nemá vliv. Mistr tuto věc uzavřel odkazem na zásobník, poznamenávám jen čísla.

### Historie (před přepisem na v1.1)

**2. kolo Radka 16. 11. 2026: co se změnilo.** Karta byla `overeno` pro 1. kolo (0,8 / 1,0 / 0,53 / 0,5). Ve 2. kole: vedle sebe 0,76 (připevněné k povrchu, Lapp „on surfaces“, jak navrhl ověřovatel v kole 2, bod 2), kostra 1,0, svazek 0,53 jen do 3 obvodů s definicí obvodu, motorový prostor se nepočítá, okolí do 30 °C. Tvrzení se mění, stav zpět na `navrh`. Do tvrzení přibyla věta pro 4 a více obvodů (hláška „Silové kabely veďte zvlášť, nebo svazek rozdělte.“); doklad: koeficient by klesl pod 0,53 (Lapp Table 12-6: 4 obvody 0,65 → 0,49).

**Co doloženo není:** (1) Jeden vodič připevněný k povrchu = plná základní hodnota (k = 1,0). Lapp a Bayka uvádějí základ pro „volně ve vzduchu“; faktor pro jednotlivý vodič na povrchu je v tab. 10 normy, kterou nemám. (2) Že „obvod“ v Lapp Table 12-6 odpovídá dvojici plus–mínus jednoho stejnosměrného spotřebiče: Lapp tabulku popisuje pro „circuits“ ze dvou nebo tří zatížených žil, výslovně pro DC dvojici ne. (3) Hodnoty tab. 10 normy samotné. Svazek 0,53 stojí na dvou dokumentech jednoho výrobce (Lapp 2003 a 2013); Bayka jen odkazuje na tab. 10.

Pro text webu: „0,76“ platí pro kabely připevněné k povrchu. Kdo vede plus a mínus volně ve vzduchu, je na bezpečné straně (Lapp 0,8).

**Vrácení po 3. kole (nález K-VODIC-0004-2026-11-16-kolo3): co se změnilo.** Čísla beze změny (0,532; 0,494; 0,4332 a všechny max. pojistky přepočteny znovu v Pythonu, shoda). (1) Do `podminky` doplněna podmínka platnosti Table 12-6: kabely stejného typu, podobně zatížené, stejně uložené, průřezy se liší nejvýš o jeden stupeň; ověřeno v obou PDF Lapp (2013 s. 3 „IMPORTANT“, Lapp USA 2003 s. 4 „Notice“). (2) Victron u svazku necituji: `misto` zúženo na kabely uzavřené v liště jako obecný princip; svazek dokládá jen Lapp. (3) Doplněno, že 0,76 je z výtahů vydání 2003-08 (Lapp DK, Lapp USA), ve vydání 2013-06 neověřeno; Lapp USA Power_Rating přidán jako samostatný zdroj. Tvrzení se nemění. Zda se podmínka „průřezy nejvýš o stupeň, podobné zatížení“ má promítnout do hlášky `SVAZEK_NEJVYS_3_OBVODY`, je otázka pro Radka (PREHLED.md); text kalkulačky jsem neměnil.

**Poznámka mistra (16. 11. 2026):** spor po druhém vrácení (kolo 3 a 4) se zavírá odkazem na v1.1: koeficienty 0,76 / 0,53 jsou archiv v2; ve v1.1 platí 1,0 a 0,7 ze základu 1,37. Podmínka „podobně zatížené kabely“ a svazek 4+ obvodů: v1.1 nemění, volba počtu obvodů je v docs/ZASOBNIK.md. Vydání normy 2023-06 (nález kolo 4, bod 1): v přepisu uvést správně, čísla nemění. Karta se přepíše podle zadání v docs/STAV.md.
