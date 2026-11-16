---
id: K-VODIC-0037
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Pro průřezy 95 a 120 mm² kalkulačka počítá s maximálním odporem jemně lanovaného měděného vodiče třídy 5 podle IEC 60228 při 20 °C: 95 mm² 0,206 Ω/km a 120 mm² 0,161 Ω/km (ρ 0,0196 a 0,0193 Ω·mm²/m)."
hodnota: null
jednotka: "Ω/km; ρ v Ω·mm²/m"
rozsah: [0.0193, 0.0196]
podminky: "Holá (nepocínovaná) žíhaná měď, jemně lanovaný vodič třídy 5 (sloupec „Class 5 + 6“ pro holý drát), 20 °C, maximální hodnota, stejnosměrný proud. Datasheet FLRY-B (K-VODIC-0001) končí na 70 mm². Pro pocínovaný (metal coated) vodič třídy 5 Lapp uvádí vyšší hodnoty 0,210 a 0,164 Ω/km; kalkulačka bere hodnoty holé mědi podle rozhodnutí Radka. Konkrétní kabel 95 nebo 120 mm² může mít podle svého datasheetu jiný (nižší) maximální odpor."
zdroje:
  - typ: datasheet
    nazev: "Lapp: Selection Table T11 Conductor Resistances and Conductor Make-up (metric), katalog s. 1026 (kopie Lapp Miltronic Denmark)"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Miltronic_Denmark/4_servicecenter/T11.pdf"
    misto: "tabulka Conductor Resistances, řádky 95 a 120 mm², sloupec „of bare copper wire – Class 5 + 6“: 0,206 a 0,161 Ω/km (sloupec metal coated Class 5 + 6: 0,210 a 0,164); hlavička: maximální hodnoty při 20 °C podle DIN EN 60228 (VDE 0295)"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp USA: Extracts from Technical Tables, T11 Conductor Resistances and Conductor Make-up (metric), s. 141"
    url: "https://t3.lappcdn.com/fileadmin/DAM/Lapp_USA/Brochures/Cable_Guide/Conductor_Resistance.pdf"
    misto: "s. 141, stejná tabulka: 95 mm² 0,206, 120 mm² 0,161 Ω/km (bare copper, Class 5 + 6); s. 142: jemně lanovaný vodič (Class 5) podle DIN EN 60228 (VDE 0295), Table 3"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "IEC 60228:2004 (DIN EN 60228, VDE 0295), tabulka 3 (třída 5); v IEC 60228:2023 (ed. 4.0) je třída 5 v tabulce 5 – text normy neotevřen, jen odkaz"
    url: ""
    misto: "IEC 60228:2004 tabulka 3 (na toto vydání odkazuje Lapp); IEC 60228:2023 tabulka 5 (podle obsahu v bezplatné ukázce, hodnoty neověřeny)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: odpor vodiče tabulkou podle průřezu, 2. kolo 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „… 95 a 120 mm² max. odpor třídy 5 podle IEC 60228 (Lapp T11): 0,206 a 0,161 Ω/km, tj. 0,0196 a 0,0193 Ω·mm²/m“"
    datum-overeni: 2026-11-16
vypocet: "ρ = R × a / 1000: 95 mm²: 0,206 × 95 / 1000 = 0,01957 → 0,0196; 120 mm²: 0,161 × 120 / 1000 = 0,01932 → 0,0193. Pro srovnání pocínovaný vodič: 0,210 × 95 / 1000 = 0,01995; 0,164 × 120 / 1000 = 0,01968. Proti IACS (0,017241): 1,135× a 1,121×. Přepočteno v Pythonu (Decimal), kontrola v Node proti packages/data/src/odpor-vodicu.json."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0037-2026-11-16-kolo4.md
schvalil: null
---

Poznámky rešeršéra:

Nová karta po 2. kole Radka 16. 11. 2026 (odpor vodiče podle průřezu, 95 a 120 mm²).

Oba dokumenty Lapp jsem stáhl a sloupce ověřil podle souřadnic slov (řádky 95 a 120 mm² mají čtyři hodnoty: Class 2 coated, Class 5+6 coated, Class 2 bare, Class 5+6 bare). Hodnoty 0,206 a 0,161 jsou sloupec holé mědi; shodují se s Radkovým rozhodnutím.

Oba zdroje jsou od jednoho výrobce (Lapp), jde o výtah z normy. Text IEC 60228 jsem neotevřel (placená). Karta je třídy B, druhý nezávislý zdroj se nevyžaduje.

**Vrácení po 3. kole (nález K-VODIC-0037-2026-11-16-kolo3): co se změnilo.** Věta „Class 5 = DIN EN 60228, Table 3“ přesunuta z prvního zdroje (Miltronic T11, s. 1026, kde není) do druhého zdroje (Lapp USA, **s. 142**). U normy doplněno vydání: tabulka 3 platí pro IEC 60228:2004 / DIN EN 60228, v IEC 60228:2023 (ed. 4.0) je třída 5 v tabulce 5; zda ed. 4.0 hodnoty 0,206 a 0,161 Ω/km nemění, jsem neověřil (text normy neotevřen). Ověřovatel jako další nezávislý zdroj uvádí tabulku Bayka „Conductor Resistance“ (třída 5: 0,206 a 0,161 Ω/km); kartu jsem o ni nerozšiřoval, stránku jsem sám neotevřel. Hodnoty a přepočet beze změny (ρ 0,01957 → 0,0196, 0,01932 → 0,0193, znovu v Pythonu).
