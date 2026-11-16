---
id: K-VODIC-0028
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Úbytek napětí v kabelu je ΔU = ρ(A) × L × n × I ÷ A (ρ(A) odpor vodiče podle průřezu, n = 2 pro vlastní mínus, 1 přes kostru) a ztráta (teplo v kabelu) je P = ΔU × I; na dlouhém nebo tenkém kabelu se ztrácí napětí a kabel se hřeje."
hodnota: null
jednotka: "V; W"
rozsah: null
podminky: "Stejnosměrný proud, ustálený stav, odpor spojů a kostry zanedbán, ρ(A) při 20 °C (K-VODIC-0001, K-VODIC-0037)."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.3 Conductivity and resistance (R = ρ × L / A, vzorec jako obrázek, příklad 1,6 mΩ); 2.7 Current, cable resistance and voltage drop (U = I × R, úbytek na kladném i záporném vodiči); 2.5 (P = I² × R)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.5 Cable runs: při 2,5 % úbytku se 2,5 % přenášeného výkonu mění v kabelu na teplo (1 000 W → 25 W)"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.16.1.2.9, pozn. 2 (s. 30–31): vzorec pro průřez podle úbytku CM = K × I × L / E, L tam i zpět"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "kód calc(): dUa = rho × Lc × I / A, Ploss = dUa × I, Lmax = dU × A / (rho × ret × I); verze 2: docs/KALKULACKA_PRUREZU.md, Výpočet body 7 a 10 (ρ(A) podle průřezu)"
    datum-overeni: 2026-11-16
vypocet: "Ruční příklad pro verzi 2 (2. kolo): 120 W, 12 V, L = 4 m, úbytek 3 %, uložení par (plus a mínus vedle sebe, n = 2, k = 0,76, strop CAPN). (1) I = 120 / 12 = 10 A. (2) Pojistka podle tabulky: ATOF 10 A I30 = 10 + (8 − 10) × 10/45 = 9,556 < 10; ATOF 15 A I30 = 14 + (12 − 14) × 10/45 = 13,556 ≥ 10 → 15 A ATOF. (3) dU = 12 × 3 / 100 = 0,36 V. (4) Průřezy: 2,5 mm² ΔU = 0,0190 × 4 × 2 × 10 / 2,5 = 0,608 V > 0,36; 4 mm² ΔU = 0,0188 × 80 / 4 = 0,376 V > 0,36; 6 mm² ΔU = 0,0188 × 80 / 6 = 0,2507 V ≤ 0,36 a maxFuse(6, par) = min(54 × 0,76 = 41,04; CAPN 40) → 40 A ≥ 15 A → průřez 6 mm². (5) Co rozhodlo: iDrop = 6 mm², iFuse = 1,5 mm² (maxFuse 15 A) → rozhodl úbytek. (6) Výstupy: ΔU = 0,2507 V (2,09 %), napětí u spotřebiče 11,749 V, ztráta P = 0,2507 × 10 = 2,51 W, max. pojistka 40 A, max. délka = 0,36 × 6 / (0,0188 × 2 × 10) = 5,74 m. P / příkon = 2,51 / 120 = 2,09 % = procento úbytku (shoda s Victron 4.5). Přepočteno v Pythonu nezávislou implementací kapitoly „Verze 2: co platí“ s daty z packages/data."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0028-2026-11-16-kolo4.md
schvalil: null
---

Poznámky rešeršéra:

Vzorce kalkulačky odpovídají fyzice a zdrojům. Příklad ukazuje i rozhodnutí kalkulačky: rozhodl úbytek, ne oteplení. Ruční příklad poslouží i testerovi jako referenční (brána „každý vzorec má referenční příklad spočítaný ručně“).

Hlavní vlákno 16. 11. 2026: ruční příklad počítá s ρ 0,0175 z verze 1, je potřeba přepočítat pro verzi 2 (stav k-prezkoumani).

**2. kolo Radka 16. 11. 2026: co se změnilo.** Ruční příklad přepočten pro verzi 2 po 2. kole: odpor podle průřezu z tabulky (4 mm² 0,0188, 6 mm² 0,0188), uložení `par` s koeficientem 0,76, pojistka podle tabulky I30 (15 A ATOF). Výsledek 6 mm² (v1: 4 mm²). V tvrzení ρ → ρ(A) a k → n (shodně s KALKULACKA_PRUREZU.md). Stav z `k-prezkoumani` zpět na `navrh`.

**Vrácení po 3. kole (nález K-VODIC-0028-2026-11-16-kolo3): co se změnilo.** Místo ve zdroji Victron opraveno: vzorec R = ρ × L / A je v oddílu **2.3** Conductivity and resistance (ne 2.7), oddíl 2.7 dokládá U = I × R a úbytek na obou vodičích; ověřeno na stránce theory.html 16. 11. 2026. Místo v ABYC E-11 zpřesněno na 11.16.1.2.9, pozn. 2 (doporučení ověřovatele). Vzorce i ruční příklad beze změny (přepočet ověřovatele souhlasí).

**Poznámka mistra (16. 11. 2026):** kolo 4 SEDÍ, ale příklad a ρ(A) jsou z v2. Ve v1.1 je ρ 0,0175 / 0,0216; přepis podle zadání v docs/STAV.md, ověřovatel pak zkontroluje jen výpočet příkladu.
