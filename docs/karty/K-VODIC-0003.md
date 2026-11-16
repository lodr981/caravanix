---
id: K-VODIC-0003
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Zatížitelnost jednožilového měděného kabelu ve vzduchu při okolí 30 °C podle DIN VDE 0298-4 je: 0,5 mm² 12 A, 0,75 mm² 15 A, 1 mm² 19 A, 1,5 mm² 24 A, 2,5 mm² 32 A, 4 mm² 42 A, 6 mm² 54 A, 10 mm² 73 A, 16 mm² 98 A, 25 mm² 129 A, 35 mm² 158 A, 50 mm² 198 A, 70 mm² 245 A, 95 mm² 292 A, 120 mm² 344 A."
hodnota: null
jednotka: "A"
rozsah: null
podminky: "Jednožilové kabely a vodiče (pryž, PVC, TPE, teplu odolné) do 1 000 V, uložení volně ve vzduchu, jedna žíla zatížena, okolí 30 °C; DIN VDE 0298-4 tab. 11, sloupec 2 (vydání 2003-08), převzato i ve vydání 2013-06 (tab. 11 a 15). Hodnota pro 0,5 mm² je z rozšíření tab. 11 vydání 2003-08."
zdroje:
  - typ: norma
    nazev: "DIN VDE 0298-4 (VDE 0298-4), tab. 11, sloupec 2 – text normy neotevřen, jen odkaz"
    url: ""
    misto: "tab. 11, sloupec 2"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Selection Table T12 Power Rating – Basic Table (výtah z DIN VDE 0298-4:2003-08)"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Miltronic_Denmark/2_produkter/Stroemvaerdib_T12.pdf"
    misto: "Table 12-1, sloupec A „Single core cable“, uvedený zdroj: DIN VDE 0298-4, 2003-08, Table 11 Column 2; řádky 0,5–120 mm²"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 1, Table 12-1, sloupec A; poznámka 2): 0,5 mm² podle VDE 0298-4:2003-08 tab. 11; tabulka zobrazuje řádky jen do 4 mm²"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "pole AMP v kódu; patička „jednožilový kabel ve vzduchu, PVC 70 °C, okolí 30 °C“"
    datum-overeni: 2026-11-16
vypocet: "Hodnoty pole AMP v referenci porovnány řádek po řádku s Lapp T12 sloupec A: shoda ve všech 15 řádcích (0,5 až 120 mm²)."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Hodnoty se shodují s Lapp T12 (výtah z normy). Obě Lapp verze jsou od jednoho výrobce, takže nejsou dva nezávislé zdroje – druhým primárním zdrojem musí být samotná norma DIN VDE 0298-4 (placená, neotevřel jsem ji). Ověřovatel ať ověří tab. 11 v aktuálním vydání (existuje vydání 2023-06; podle vyhledávání ho reprodukuje Bayka, PDF se mi ale stáhnout nepodařilo).

Podmínka „PVC 70 °C“ v patičce: tab. 11 v Lapp výtahu je pro pryž, PVC, TPE i teplu odolné vodiče při 30 °C okolí; dovolená teplota vodiče 70 °C pro PVC plyne z převodní tab. 17 (Lapp Table 12-2, sloupec 70 °C). Patička tedy podmínky shrnuje správně.

**Nález:** v kalkulačce o maximální pojistce ve všech 15 tabulkových bodech rozhoduje strop CAPN/CAPH, ne tato tabulka (viz K-VODIC-0009). Tabulka VDE je tedy v praxi horní mez, ne aktivní limit.

Tabulka platí pro pevně uložený jednotlivý kabel ve vzduchu, ne pro kabel v liště, v izolaci stěny nebo v uzavřené trubce (tam jsou nižší hodnoty).
