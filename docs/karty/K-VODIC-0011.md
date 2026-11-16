---
id: K-VODIC-0011
trida: B
stav: k-prezkoumani
plati-pro-zeme: [vse]
tvrzeni: "Pojistka se volí jako nejbližší hodnota z řady, která je alespoň 1,25× proud spotřebiče, aby zbytečně nepálila; poměr 1,25 je dočasný, dokud se nerozhodne o typech pojistek."
hodnota: 1.25
jednotka: "násobek proudu spotřebiče"
rozsah: [1.0, 1.4]
podminky: "Trvalý odběr, pojistka při okolí kolem 20 °C. Podle tabulek Littelfuse při 20 °C poměr 1,25 stačí u nožových pojistek ATOF, MINI, MAXI, u MIDI 30–125 A a u MEGA 80–200 A a 250 A; nestačí u MEGA 40 A (potřeba 1,29), 60 A (1,40) a 225 A (1,29). V teple (65 °C) potřebují ATOF až 1,33, MAXI 1,29, MIDI 1,25, MEGA až 1,52 (40 a 60 A 1,54 a 1,67). U spotřebičů s rozběhovým proudem rozhoduje časová charakteristika pojistky (K-VODIC-0015). Řada bez 300 A (K-VODIC-0010)."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: výpočet verze 2, pojistka ≥ 1,25 × proud do rešerše Littelfuse, schváleno 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 16. 11. 2026 o výpočtu verze 2 („pojistka ≥ 1,25 × proud do rešerše Littelfuse“); docs/KALKULACKA_PRUREZU.md, Výpočet bod 4 a kapitola Typ pojistky"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: ATOF Blade Fuses (Revised 08/18/2022), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/614/DOC034614307.pdf"
    misto: "s. 3: Temperature Table (Security Margin 20 %): 20 A → 18 A při 20 °C, 15 A při 65 °C; 40 A → 37 A při 20 °C, 31 A při 65 °C. Time-Current: 110 % → 360 000 s / ∞ jen pro 1–30 A; pro 35 a 40 A až při 100 %"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MEGA and MEGA Clear Top Fuse Rated 32V (Revised 04/08/2024), kopie eicom.ru"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "s. 3: 100 % → min. 14 400 s (40–250 A); s. 4 Temperature Table: 40 A → 31 A, 60 A → 43 A, 225 A → 175 A při 20 °C"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse MINI, MAXI, MIDI (datasheety v K-VODIC-0030, 0031, 0032)"
    url: "https://static.chipdip.ru/lib/675/DOC038675898.pdf"
    misto: "tabulky Temperature Table; souhrn v docs/karty/POJISTKY_RODINY.md"
    datum-overeni: 2026-11-16
vypocet: "Kalkulačka zvolí pojistku f pro proud do f / 1,25. Proti dovolenému trvalému proudu při 20 °C (Littelfuse): ATOF 20 A: 16,0 A ≤ 18 A; ATOF 30 A: 24,0 ≤ 27; MAXI 80 A: 64,0 ≤ 74; MIDI 30 A: 24,0 ≤ 28; MEGA 40 A: 32,0 > 31 (nevyhoví); MEGA 60 A: 48,0 > 43 (nevyhoví); MEGA 225 A: 180,0 > 175 (nevyhoví); MEGA 250 A: 200,0 ≤ 207. Potřebné poměry při 20 °C: ATOF ≤ 1,11, MINI ≤ 1,20, MAXI ≤ 1,08, MIDI 30–125 A ≤ 1,07, MEGA 80–250 A ≤ 1,29, MEGA 40/60 A 1,29/1,40 → `rozsah` [1,0; 1,4]. Přepočteno v Pythonu (POJISTKY_RODINY.md)."
pouzito-v: []
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0011-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** Verze 2 mění poměr z 1,1 na 1,25 (Radek 16. 11. 2026, dočasně do rozhodnutí o rodinách pojistek). Tvrzení i `hodnota` přepsány na 1,25, zdroj `rozhodnuti-odbornika`. Podle nálezu: `rozsah` rozšířen na [1,0; 1,4] (MEGA 60 A dává 1,40); v podmínkách výslovně, u kterých pojistek 1,25 při 20 °C nestačí (MEGA 40, 60, 225 A); opraven popis řádku 110 % u ATOF (platí jen pro 1–30 A). Text „alespoň“ odpovídá výpočtu (f ≥ 1,25 × I).

Důsledek nedostatečného poměru není bezpečnostní (kabel chrání max. pojistka podle K-VODIC-0009), ale pojistka může u trvalé zátěže blízko hranice zbytečně pálit, což tvrzení slibuje opak. Rozhodnutí o rodinách a teplotě: docs/karty/POJISTKY_RODINY.md.

**Nepoužito od 2. kola 16. 11. 2026.** Radek rozhodl volit pojistku podle tabulek Littelfuse (dovolený trvalý proud při 30 °C, interpolace mezi 20 a 65 °C) místo jednoho poměru 1,25 (docs/ROZHODNUTI.md, řádek „Pojistka podle tabulek Littelfuse místo jednoho poměru …“). Nová metoda: K-VODIC-0038. Karta zůstává jako historie ve stavu `k-prezkoumani`, neověřuje se. Text „aspoň 1,25 × proud“ se na webu nesmí použít.

**Poznámka mistra (16. 11. 2026):** ve v1.1 pravidlo platí (změna 1: pojistka ≥ 1,25 × proud, rozhodnutí Radka). Karta se přepíše na v1.1 podle zadání v docs/STAV.md; věta „poměr je dočasný“ odpadá.
