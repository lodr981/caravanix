---
id: K-VODIC-0039
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Vede-li kabel teplým místem (u topení, pod plechem na slunci), zvolte o stupeň silnější."
hodnota: 0.85
jednotka: "nejvyšší přepočtový faktor zatížitelnosti, který vyrovná jeden stupeň průřezu (95 → 120 mm²)"
rozsah: [0.74, 0.85]
podminky: "Kalkulačka počítá zatížitelnost pro okolí do 30 °C (K-VODIC-0003, -0004). V teplejším okolí zatížitelnost klesá; pro vodič s dovolenou teplotou 70 °C (Lapp Table 12-2, z DIN VDE 0298-4 tab. 17) je faktor při 40 °C 0,87, při 50 °C 0,71 a při 60 °C 0,50. Jeden stupeň průřezu v řadě kalkulačky zvýší základní zatížitelnost 1,18× až 1,35×, tedy vyrovná pokles na 0,74 až 0,85. To pokryje okolí kolem 40 °C (faktor 0,87) u všech průřezů, okolí 50 °C (0,71) u žádného. Pro teplejší místa (u topení, v motorovém prostoru) jeden stupeň nestačí a platí K-VODIC-0035. Silnější kabel zároveň snižuje úbytek. Teplotu „teplého místa“ (u topení, pod plechem na slunci) žádný zdroj nečísluje; věta je rada podle rozhodnutí Radka, číslo v kartě říká, co jeden stupeň vyrovná."
zdroje:
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 2, Table 12-2 conversion factors for ambient temperatures other than +30 °C (z tab. 17), sloupec vodič 70 °C: 30 °C 1,00; 40 °C 0,87; 50 °C 0,71; 60 °C 0,50 (sloupec 90 °C: 0,91; 0,82; 0,71); s. 1, Table 12-1 sloupec A (AMP 0,5–120 mm²)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Bayka: TD06DE 07/2022, Strombelastbarkeit flexible Kupferkabel und -leitungen nach DIN VDE 0298-4"
    url: "https://www.bayka.de/wp-content/uploads/2022/03/TD06DE-Strombelastbarkeit-flexible-Kupferkabel-und-Leitungen.pdf"
    misto: "s. 2, řádek Umrechnungsfaktoren für abweichende Umgebungstemperatur: pro jednožilové kabely volně ve vzduchu podle tab. 10 normy (hodnoty neuvádí; doklad, že teplota okolí zatížitelnost mění)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.5 Cable runs: kabel, který nemůže odvádět teplo (v uzavřené liště, ve svazku), se víc zahřívá; řešením je silnější kabel"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: okolí do 30 °C a text o teplém místě, 2. kolo 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „… Okolí do 30 °C; text „Vede-li kabel teplým místem (u topení, pod plechem na slunci), zvolte o stupeň silnější.““; docs/KALKULACKA_PRUREZU.md, Verze 2, Výpočet bod 12"
    datum-overeni: 2026-11-16
vypocet: "Poměr AMP sousedních průřezů (Lapp/Bayka, sl. A) a faktor, který vyrovná: 0,5→0,75 1,250 (0,800); 0,75→1 1,267 (0,789); 1→1,5 1,263 (0,792); 1,5→2,5 1,333 (0,750); 2,5→4 1,313 (0,762); 4→6 1,286 (0,778); 6→10 1,352 (0,740); 10→16 1,342 (0,745); 16→25 1,316 (0,760); 25→35 1,225 (0,816); 35→50 1,253 (0,798); 50→70 1,237 (0,808); 70→95 1,192 (0,839); 95→120 1,178 (0,849). Rozsah 0,740 až 0,849. Pro vodič 70 °C odpovídá faktor f okolí T = 70 − 40 × f² (vztah f = √((70 − T)/40) dává tabulkové 0,87 / 0,71 / 0,50 pro 40 / 50 / 60 °C): f 0,849 → 41,2 °C, f 0,740 → 48,1 °C. Jeden stupeň tedy vyrovná okolí 41–48 °C podle průřezu; faktor 0,87 (40 °C) vyrovná každý přechod (0,87 ≥ 0,849), faktor 0,71 (50 °C) žádný (0,71 < 0,740). Vztah √ je moje odvození, tabulka má jen kroky po 10 °C. Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Nová karta po 2. kole Radka 16. 11. 2026 (text u každého výsledku kalkulačky).

Co doloženo je: zatížitelnost v teplejším okolí klesá (Lapp Table 12-2, Bayka odkaz na tab. 10, Victron 4.5) a silnější kabel to vyrovná (Victron 4.5). Kolik jeden stupeň vyrovná, je odvozené z tabulky AMP a Lapp Table 12-2.

Co doloženo není: (1) jakou teplotu má „teplé místo“ u topení nebo pod plechem na slunci; žádný zdroj ji nedává. (2) Faktor pro jednožilové kabely podle tab. 10 normy (Lapp přebírá tab. 17 pro celou Table 12-1; Bayka pro jednožilové kabely odkazuje na tab. 10 bez hodnot). (3) Že jeden stupeň stačí: při okolí 50 °C a víc nestačí (faktor 0,71 proti nejvýš 0,85 vyrovnání). Text webu by neměl slibovat víc než „o stupeň silnější“ pro mírně teplá místa; pro velmi teplá místa patří odkaz na kabel pro vyšší teplotu (K-VODIC-0035). Otázka pro Radka je v PREHLED.md.

Pozn.: Kalkulačka bere max. pojistku i ze stropu CAPN/CAPH; silnější průřez tedy nemusí zvýšit max. pojistku přesně v poměru AMP. To na smysl rady nemá vliv (silnější kabel snese víc a má menší úbytek).
