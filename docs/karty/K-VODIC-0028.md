---
id: K-VODIC-0028
trida: B
stav: k-prezkoumani
plati-pro-zeme: [vse]
tvrzeni: "Úbytek napětí v kabelu je ΔU = ρ × L × k × I ÷ A (k = 2 pro vlastní mínus, 1 přes kostru) a ztráta (teplo v kabelu) je P = ΔU × I; na dlouhém nebo tenkém kabelu se ztrácí napětí a kabel se hřeje."
hodnota: null
jednotka: "V; W"
rozsah: null
podminky: "Stejnosměrný proud, ustálený stav, odpor spojů zanedbán."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.7 Current, cable resistance and voltage drop (R = ρ × L / A, U = I × R, úbytek na obou vodičích); 2.5: P = I² × R"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.5 Cable runs: při 2,5 % úbytku se 2,5 % přenášeného výkonu mění v kabelu na teplo (1 000 W → 25 W)"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.16.1.2: vzorec pro průřez podle úbytku, L tam i zpět"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "kód calc(): dUa = rho × Lc × I / A, Ploss = dUa × I, Lmax = dU × A / (rho × ret × I)"
    datum-overeni: 2026-11-16
vypocet: "Kontrolní příklad z výchozích hodnot reference: 120 W, 12 V, 4 m, vlastní mínus, 3 %, samostatně. I = 10 A; Areq = 0,0175 × 8 × 10 / 0,36 = 3,89 mm² → 4 mm² (pojistka 15 A ≤ maxFuse(4) = 30 A). ΔU = 0,0175 × 8 × 10 / 4 = 0,35 V (2,92 %); P = 0,35 × 10 = 3,5 W; Lmax = 0,36 × 4 / (0,0175 × 2 × 10) = 4,11 m. P/(P_zátěže) = 3,5/120 = 2,9 % = procento úbytku (shoda s Victron 4.5)."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0028-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Vzorce kalkulačky odpovídají fyzice a zdrojům. Příklad ukazuje i rozhodnutí kalkulačky: rozhodl úbytek, ne oteplení. Ruční příklad poslouží i testerovi jako referenční (brána „každý vzorec má referenční příklad spočítaný ručně“).

Hlavní vlákno 16. 11. 2026: ruční příklad počítá s ρ 0,0175 z verze 1, je potřeba přepočítat pro verzi 2 (stav k-prezkoumani).
