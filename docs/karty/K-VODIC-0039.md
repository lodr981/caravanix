---
id: K-VODIC-0039
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Pro automobilový kabel s izolací 105 °C (FLRY) vyrovná jeden stupeň průřezu pokles zatížitelnosti v teplejším okolí u všech průřezů asi do 55 °C (u některých až do 67 °C). Na tom stojí text u výsledku kalkulačky „Počítáno pro automobilový kabel s izolací 105 °C (FLRY) a okolí do 30 °C. V teplém místě volte o stupeň silnější.“ (znění Radka, v1.1)."
hodnota: 55
jednotka: "°C (okolí, do kterého jeden stupeň průřezu stačí u všech průřezů; nejhorší přechod 95 → 120 mm²)"
rozsah: [54.7, 67.1]
podminky: "Kalkulačka v1.1 počítá s okolím do 30 °C a s koeficienty uložení 1,0 samostatně a 0,7 ve svazku (K-VODIC-0004), odvozenými z kabelu 105 °C (K-VODIC-0003, 0005). V okolí T má kabel 105 °C proti tabulce AMP zatížitelnost k_VDE × √((105 − T) / 40), kde k_VDE je faktor uložení pro kabel 70 °C: 0,76 samostatně, 0,53 ve svazku (Lapp). Jeden stupeň stačí, když k_VDE × √((105 − T) / 40) × AMP(a + 1) ≥ k × AMP(a), tj. teplý silnější kabel unese aspoň to, s čím kalkulačka počítá u původního průřezu (pojistka ≤ max. pojistka ≤ AMP × k). Mez je 54,7–67,1 °C podle průřezu a uložení; nejhorší je přechod 95 → 120 mm², nejlepší 6 → 10 mm². S třídou B podle normy (100 °C místo 105 °C, K-VODIC-0005) je mez o 5 °C nižší: 49,7–62,1 °C. Pro mínus přes kostru (jeden zatížený vodič) je 0,76 na bezpečné straně. Stropy CAPN/CAPH (K-VODIC-0009) dávají ještě větší rezervu, výpočet je nebere. Jakou teplotu má konkrétní teplé místo, žádný zdroj neuvádí. Pro výsledek 120 mm² silnější průřez v nabídce není (nepodstatné podle mistra: uživatel koupí silnější kabel, nad 150 A navíc dostane hlášku o návodu měniče). Motorový prostor řeší text K-VODIC-0035. Faktor teploty je z výtahu Lapp (DIN VDE 0298-4 tab. 17); platné vydání normy je 2023-06 (nahrazuje 2013-06), neotevřeno."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: text u výsledku v1.1 a základ 105 °C"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „v1.1, texty: u výsledku „Počítáno pro automobilový kabel s izolací 105 °C (FLRY) a okolí do 30 °C. V teplém místě volte o stupeň silnější.““; řádek „Kalkulačka průřezu v1.1 … √((105 − 30) / (70 − 30)) ≈ 1,37 …“; docs/KALKULACKA_PRUREZU.md, Verze 1.1, Texty u kalkulačky"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 2, Table 12-2 conversion factors for ambient temperatures other than +30 °C (z tab. 17), sloupec vodič 70 °C: 30 °C 1,00; 40 °C 0,87; 50 °C 0,71; 60 °C 0,50 (kontrola vztahu √, K-VODIC-0003); s. 3, Table 12-6: 3 obvody 0,70"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Selection Table T12 Power Rating – Basic Table (výtah z DIN VDE 0298-4:2003-08)"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Miltronic_Denmark/2_produkter/Stroemvaerdib_T12.pdf"
    misto: "Table 12-1, sloupec A (AMP 0,5–120 mm², poměry sousedních průřezů); poznámka 3) faktor 0,76 (na povrchu, DC)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Bayka: TD06DE 07/2022, Strombelastbarkeit flexible Kupferkabel und -leitungen nach DIN VDE 0298-4"
    url: "https://www.bayka.de/wp-content/uploads/2022/03/TD06DE-Strombelastbarkeit-flexible-Kupferkabel-und-Leitungen.pdf"
    misto: "s. 2, sloupec 2 „frei in Luft, einadrige Leitungen“ (AMP 0,75–120 mm²); řádek Umrechnungsfaktoren: teplota okolí pro tento sloupec podle tab. 10 normy (hodnoty neuvádí)"
    datum-overeni: 2026-11-16
vypocet: "Mez T = 105 − 40 × (k × AMP(a) / (k_VDE × AMP(a + 1)))². Samostatně (k 1,0, k_VDE 0,76), přechod → T [°C]: 0,5→0,75 60,7; 0,75→1 61,8; 1→1,5 61,6; 1,5→2,5 66,0; 2,5→4 64,8; 4→6 63,1; 6→10 67,1; 10→16 66,6; 16→25 65,0; 25→35 58,8; 35→50 60,9; 50→70 59,8; 70→95 56,2; 95→120 55,1. Ve svazku (k 0,7, k_VDE 0,53): 60,3; 61,5; 61,3; 65,8; 64,5; 62,8; 66,8; 66,3; 64,7; 58,5; 60,6; 59,4; 55,9; 54,7 (s k_VDE 0,532 = 0,76 × 0,70 vychází totéž co samostatně). Nejhorší průřez: 95 → 120 mm², 55,1 °C samostatně, 54,7 °C ve svazku. Nejlepší: 6 → 10 mm², 67,1 / 66,8 °C. Se 100 °C (T = 100 − 40 × (…)²): nejhorší 50,1 / 49,7 °C, nejlepší 62,1 / 61,8 °C. Kontrola při 30 °C: 0,76 × 1,369 = 1,04 ≥ 1,0; 0,53 × 1,369 = 0,726 ≥ 0,7. Faktor kabelu 105 °C proti tabulce samostatně / ve svazku: okolí 40 °C 0,969 / 0,676; 50 °C 0,891 / 0,621; 55 °C 0,850 / 0,593; 60 °C 0,806 / 0,562. Přepočteno v Node."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0039-2026-11-16-v11.md
schvalil: "Radek, 2026-11-16 (docs/RYCHLA_ALFA.md, krok 0)"
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Text u výsledku je teď znění Radka v1.1: „Počítáno pro automobilový kabel s izolací 105 °C (FLRY) a okolí do 30 °C. V teplém místě volte o stupeň silnější.“ (bez příkladů u topení a pod plechem). Výpočet stál na vodiči 70 °C s koeficienty v2 a je přepočtený pro kabel 105 °C a koeficienty v1.1. Vzorec je ze zadání mistra: k_VDE × √((105 − T) / 40) × AMP(a + 1) ≥ k × AMP(a). Výsledek: jeden stupeň stačí u všech průřezů asi do 55 °C (přesně 54,7 °C ve svazku a 55,1 °C samostatně, přechod 95 → 120 mm²), u nejlepšího přechodu (6 → 10 mm²) do 67 °C. Se 100 °C je to asi 50 °C. Odhad mistra (asi 55 °C, se 100 °C asi 50 °C) tedy sedí. Místo ve zdroji Lapp je opravené (nález kolo 4, bod 3). Lapp 2013 je citovaný jen pro Table 12-2 a 12-6, poměry AMP stojí na Lapp DK 2003 sl. A a Bayka sl. 2. Vydání normy je opravené na 2023-06 (nález kolo 4, bod 4). Victron je vypuštěný (ve v1.1 nemá úlohu). Stav `navrh`, `overil` vynulováno.

Test podstatnosti, „teplé místo“ nad 55 °C: text neříká, kde teplé místo končí. Při okolí nad asi 55 °C (u nejsilnějších průřezů) jeden stupeň nestačí. V běžné vestavbě obytného vozu (pod podlahou, ve skříni, pod plechem) jsem pro takovou teplotu mimo motorový prostor zdroj nenašel a nehledal (zásada 2). Motorový prostor má vlastní text (K-VODIC-0035). Poznámka pro mistra, výpočet ani text neměním.

### Historie (před přepisem na v1.1)

Nová karta po 2. kole Radka 16. 11. 2026 (text u každého výsledku kalkulačky).

Co doloženo je: zatížitelnost v teplejším okolí klesá (Lapp Table 12-2, Bayka odkaz na tab. 10) a silnější kabel se při stejném proudu méně hřeje (Victron 4.5, obecný princip). Kolik teplého okolí jeden stupeň vyrovná, je odvozené níže. Kolik jeden stupeň vyrovná, je odvozené z tabulky AMP a Lapp Table 12-2.

Co doloženo není: (1) jakou teplotu má „teplé místo“ u topení nebo pod plechem na slunci; žádný zdroj ji nedává. (2) Faktor pro jednožilové kabely podle tab. 10 normy (Lapp přebírá tab. 17 pro celou Table 12-1; Bayka pro jednožilové kabely odkazuje na tab. 10 bez hodnot). (3) Že jeden stupeň stačí u topení nebo pod plechem na slunci: stačí jen do zhruba 41–48 °C, při okolí 50 °C a víc nestačí (faktor 0,71 proti nejvýš 0,85 vyrovnání). Text webu by neměl slibovat víc než „o stupeň silnější“ pro mírně teplá místa; pro velmi teplá místa patří odkaz na kabel pro vyšší teplotu (K-VODIC-0035). Otázka pro Radka je v PREHLED.md.

Pozn.: Kalkulačka bere max. pojistku i ze stropu CAPN/CAPH; silnější průřez tedy nemusí zvýšit max. pojistku přesně v poměru AMP. To na smysl rady nemá vliv (silnější kabel snese víc a má menší úbytek).

**Vrácení po 3. kole (nález K-VODIC-0039-2026-11-16-kolo3): co se změnilo.** Čísla beze změny (poměry AMP, faktory 0,740–0,849, teploty 41,2–48,1 °C a √ vztah přepočteny znovu v Pythonu, shoda). (1) Tvrzení zúženo na to, co karta dokládá: jeden stupeň vyrovná okolí asi do 41–48 °C podle průřezu. Radkův text webu je v tvrzení citován beze změny, s omezením, kdy ho karta unese. (2) Z `podminky` odstraněn rozpor: „u topení“ už není uvedeno zároveň jako místo, kde stupeň stačí, i jako místo, kde nestačí. (3) Victron opraven: jen kabely uzavřené v liště a teplo z vlastního úbytku, jako podpůrný zdroj k obecnému principu; svazek ani teplotu okolí Victron neřeší. (4) Doplněn rozpor zdrojů: faktory jsou z Lapp (tab. 17), Bayka pro tento sloupec odkazuje na neveřejnou tab. 10.

**Co karta neunese (pro Radka):** text webu jmenuje „u topení“ a „pod plechem na slunci“ jako místa, kde stačí o stupeň silnější kabel. Žádný zdroj teplotu těchto míst nedává. Podle čísel karty stačí jeden stupeň jen do zhruba 41 °C (u některých průřezů do 48 °C); u topení může být okolí vyšší a pak je rada nedostatečná (třída A). Text jsem neměnil, rozhodne Radek (otázka v PREHLED.md). Ověřovatel navrhl znění: „Vede-li kabel místem teplejším než 30 °C (do zhruba 40 °C), zvolte o stupeň silnější. Kde je tepleji (přímo u topení, v motorovém prostoru), jeden stupeň nestačí: veďte kabel jinudy, nebo použijte kabel pro vyšší teplotu.“

**Poznámka mistra (16. 11. 2026):** spor po druhém vrácení (kolo 3 a 4) se zavírá odkazem na v1.1: text je teď „Počítáno pro automobilový kabel s izolací 105 °C (FLRY) a okolí do 30 °C. V teplém místě volte o stupeň silnější.“ (bez příkladů u topení a pod plechem). Výpočet karty stál na vodiči 70 °C; přepíše se na 105 °C podle zadání v docs/STAV.md. Výsledek 120 mm² (silnější v nabídce není): nepodstatné, uživatel koupí silnější kabel, což je bezpečná strana, a nad 150 A navíc dostane hlášku o návodu měniče.
