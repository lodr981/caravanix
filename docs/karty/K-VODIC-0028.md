---
id: K-VODIC-0028
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Úbytek napětí v kabelu je ΔU = ρ × L × n × I ÷ A (ρ = 0,0175 Ω·mm²/m samostatně, 0,0216 ve svazku; n = 2 pro vlastní mínus, 1 přes kostru) a ztráta (teplo v kabelu) je P = ΔU × I; na dlouhém nebo tenkém kabelu se ztrácí napětí a kabel se hřeje."
hodnota: null
jednotka: "V; W"
rozsah: null
podminky: "Stejnosměrný proud, ustálený stav, odpor spojů a kostry zanedbán. L je délka jedné cesty, A průřez v mm², I proud spotřebiče. ρ podle K-VODIC-0001 (samostatně) a K-VODIC-0002 (ve svazku). Max. délka na zvoleném průřezu: Lmax = ΔUdov × A ÷ (ρ × n × I)."
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
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026), platí ve v1.1"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "kód calc(): rho = hot ? 0.0216 : 0.0175; Areq = rho × Lc × I / dU; dUa = rho × Lc × I / A; Ploss = dUa × I; Lmax = dU × A / (rho × ret × I); docs/KALKULACKA_PRUREZU.md, Verze 1.1, Beze změny z v1"
    datum-overeni: 2026-11-16
vypocet: "Ruční příklad v1.1: 120 W, 12 V, L = 4 m, úbytek 3 %, vlastní mínus (n = 2), samostatně (ρ 0,0175, k 1,0). (1) I = 120 / 12 = 10 A. (2) Pojistka: nejbližší z řady ≥ 1,25 × 10 = 12,5 A → 15 A. (3) Dovolený úbytek 12 × 3 / 100 = 0,36 V. (4) Potřebný průřez podle úbytku 0,0175 × 4 × 2 × 10 / 0,36 = 3,889 mm². 2,5 mm²: ΔU = 0,0175 × 80 / 2,5 = 0,56 V > 0,36. 4 mm²: ΔU = 0,0175 × 80 / 4 = 0,350 V ≤ 0,36 a max. pojistka 4 mm² = min(42 × 1,0; CAPN 30) → 30 A ≥ 15 A → průřez 4 mm² (AWG 10). (5) Co rozhodlo: podle úbytku 4 mm², podle pojistky by stačil 1 mm² (max. pojistka 15 A) → rozhodl úbytek. (6) Výstupy: ΔU = 0,350 V (2,92 %), napětí u spotřebiče 11,65 V, ztráta P = 0,350 × 10 = 3,50 W, max. pojistka 30 A, max. délka 0,36 × 4 / (0,0175 × 2 × 10) = 4,11 m. P / příkon = 3,50 / 120 = 2,92 % = procento úbytku (shoda s Victron 4.5). Stejný příklad ve svazku (ρ 0,0216, k 0,7): potřeba 0,0216 × 80 / 0,36 = 4,80 mm² → 6 mm² (AWG 10), ΔU = 0,288 V (2,40 %), napětí 11,712 V, ztráta 2,88 W, pojistka 15 A, max. pojistka 6 mm² ve svazku 35 A, max. délka 5,00 m, rozhodl úbytek. Přepočteno v Node (reference v1 se změnami v1.1)."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** ρ(A) podle průřezu z verze 2 je nahrazené hodnotami v1.1: 0,0175 samostatně a 0,0216 ve svazku. Ruční příklad je přepočtený pro v1.1, a to kódem v Node nad referenčním skriptem v1 se změnami v1.1. Pro kontrolu jsem příklad spustil i proti rozpracovanému enginu `packages/engine/src/vodic.ts` (stav souboru 16. 11. 2026). Oba režimy, mez 200 A i max. pojistky referenční tabulky se shodují. Engine ale ještě nemá hotový golden test, proto je hlavní kontrolou nezávislý skript. Výsledek: 4 mm², pojistka 15 A (ve verzi 2 to bylo 6 mm² a 15 A ATOF). Je to stejný výsledek jako ve v1, protože 1,1 × 10 i 1,25 × 10 dávají 15 A. Přibyl příklad pro svazek. Stav `navrh`, `overil` vynulováno.

Pro ověřovatele (jedno kolo): jen výpočet příkladu. Ruční příklad poslouží i testerovi.

### Historie (před přepisem na v1.1)

Vzorce kalkulačky odpovídají fyzice a zdrojům. Příklad ukazuje i rozhodnutí kalkulačky: rozhodl úbytek, ne oteplení. Ruční příklad poslouží i testerovi jako referenční (brána „každý vzorec má referenční příklad spočítaný ručně“).

Hlavní vlákno 16. 11. 2026: ruční příklad počítá s ρ 0,0175 z verze 1, je potřeba přepočítat pro verzi 2 (stav k-prezkoumani).

**2. kolo Radka 16. 11. 2026: co se změnilo.** Ruční příklad přepočten pro verzi 2 po 2. kole: odpor podle průřezu z tabulky (4 mm² 0,0188, 6 mm² 0,0188), uložení `par` s koeficientem 0,76, pojistka podle tabulky I30 (15 A ATOF). Výsledek 6 mm² (v1: 4 mm²). V tvrzení ρ → ρ(A) a k → n (shodně s KALKULACKA_PRUREZU.md). Stav z `k-prezkoumani` zpět na `navrh`.

**Vrácení po 3. kole (nález K-VODIC-0028-2026-11-16-kolo3): co se změnilo.** Místo ve zdroji Victron opraveno: vzorec R = ρ × L / A je v oddílu **2.3** Conductivity and resistance (ne 2.7), oddíl 2.7 dokládá U = I × R a úbytek na obou vodičích; ověřeno na stránce theory.html 16. 11. 2026. Místo v ABYC E-11 zpřesněno na 11.16.1.2.9, pozn. 2 (doporučení ověřovatele). Vzorce i ruční příklad beze změny (přepočet ověřovatele souhlasí).

**Poznámka mistra (16. 11. 2026):** kolo 4 SEDÍ, ale příklad a ρ(A) jsou z v2. Ve v1.1 je ρ 0,0175 / 0,0216; přepis podle zadání v docs/STAV.md, ověřovatel pak zkontroluje jen výpočet příkladu.
