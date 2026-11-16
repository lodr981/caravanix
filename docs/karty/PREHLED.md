# Přehled karet tvrzení

Aktualizováno rešeršérem 16. 11. 2026 po **přepisu karet na kalkulačku průřezu v1.1** (úkol K-04, zadání mistra v `docs/STAV.md`). Platí výpočet v1.1: reference v1 (`docs/reference/kalkulacka-prurezu-v1.html`) se čtyřmi změnami podle `docs/reset/KALKULACKA_V1_1.md` a `docs/KALKULACKA_PRUREZU.md`, kapitola „Verze 1.1: co platí“. Jde o pojistku ≥ 1,25 × proud, řadu pojistek bez 300 A s mezí 200 A, hlášku nad 150 A a režim „Ve svazku“. Základ koeficientů 1,0 / 0,7: tabulka VDE 0298-4 je pro PVC 70 °C, FLRY snese 105 °C, √((105 − 30) / (70 − 30)) ≈ 1,37 (rozhodnutí Radka). Verze 2 je archiv (`docs/ZASOBNIK.md`). Výpočet, engine, reference ani `docs/ROZHODNUTI.md` rešeršér neměnil.

Všechna čísla v přepsaných kartách jsou přepočtená v Node nezávislým skriptem (reference v1 se změnami v1.1). Ruční příklad (0028), mez 200 A a max. pojistky referenční tabulky souhlasí i s rozpracovaným enginem `packages/engine/src/vodic.ts`.

Souhrn: 39 karet (A: 15, B: 19, C: 5). Platné pro v1.1: 31 karet, z toho `navrh` 12 (přepsané na v1.1, čekají na jedno kolo ověření) a `overeno` 19. Archiv v2 a vypuštěné: 8 karet `k-prezkoumani`.

## Karty v1.1

| ID | Třída | Tvrzení (zkráceně) | Stav |
| --- | --- | --- | --- |
| [K-VODIC-0001](K-VODIC-0001.md) | B | Úbytek se počítá s ρ mědi 0,0175 Ω·mm²/m (samostatně); skutečné lanko FLRY-B 0,0181–0,0191 jen poznámka. | navrh (přepis v1.1) |
| [K-VODIC-0002](K-VODIC-0002.md) | B | Ve svazku ρ 0,0216 Ω·mm²/m, měď asi 80 °C. | navrh (přepis v1.1) |
| [K-VODIC-0003](K-VODIC-0003.md) | A | Základní zatížitelnost VDE 0298-4 tab. 11 sl. 2 (PVC 70 °C, 30 °C), 0,5 mm² 12 A podle Lapp; pro FLRY 105 °C rozhodnutí odborníka, √(75/40) ≈ 1,37. | navrh (přepis v1.1) |
| [K-VODIC-0004](K-VODIC-0004.md) | A | Koeficient uložení: samostatně 1,0, ve svazku 0,7 (0,76 × 1,37 ≈ 1,04; 0,76 × 0,70 × 1,37 ≈ 0,73). | navrh (přepis v1.1) |
| [K-VODIC-0005](K-VODIC-0005.md) | A | FLRY v PVC výrobci deklarují do 105 °C (ISO 6722-1 třída B); z toho vycházejí koeficienty 1,0 a 0,7 (platí i se 100 °C). | navrh (přepis v1.1) |
| [K-VODIC-0006](K-VODIC-0006.md) | B | CCA: asi o 60 % vyšší odpor, vodivost zhruba o třetinu nižší, do vozu jen čistá měď. | overeno |
| [K-VODIC-0007](K-VODIC-0007.md) | A | Kalkulačka jen pro měď; CCA ~1,6× průřez; „Pro automobilová lanka CCA jsme zatížitelnost nedohledali; NEC dává CCA hodnoty hliníku.“ | overeno (spor rozhodl Radek) |
| [K-VODIC-0009](K-VODIC-0009.md) | A | Stropy CAPN (samostatně) a CAPH (svazek) jsou rozhodnutí odborníka; ve v1.1 jsou ve všech průřezech pod AMP × k, max. pojistku určuje strop (120 mm² samostatně řada, 250 A). | navrh (přepis v1.1) |
| [K-VODIC-0010](K-VODIC-0010.md) | B | Řada pojistek 1–250 A (23 hodnot, s 35 A, bez 300 A: MEGA 300 A jen zkrat); rodina jen informativně. | navrh (přepis v1.1) |
| [K-VODIC-0011](K-VODIC-0011.md) | B | Pojistka = nejbližší z řady ≥ 1,25 × proud (nožová pak nepálí zbytečně); mez 200 A. | navrh (přepis v1.1) |
| [K-VODIC-0012](K-VODIC-0012.md) | A | „Pojistka chrání kabel: nesmí být vyšší než max. pojistka kabelu. U jednoho spotřebiče se volí podle jeho proudu a návodu výrobce.“ | overeno (spor rozhodl Radek) |
| [K-VODIC-0013](K-VODIC-0013.md) | A | Pojistka na plusu co nejblíž baterii, nejvýš 17,5 cm (ABYC E-11). | overeno |
| [K-VODIC-0014](K-VODIC-0014.md) | A | Tenčí odbočka potřebuje vlastní, menší pojistku. | overeno |
| [K-VODIC-0015](K-VODIC-0015.md) | A | Rozběhový proud: pomalá pojistka, kabel na tuto pojistku. | overeno |
| [K-VODIC-0016](K-VODIC-0016.md) | B | Úbytek 3 / 5 / 10 %; 5 % rozhodnutí odborníka; „Pro 12/24 V ve vozidle žádný z citovaných zdrojů 5 % neuvádí.“ | overeno (spor rozhodl Radek) |
| [K-VODIC-0017](K-VODIC-0017.md) | B | 120 W = 10 A, 1 200 W = 100 A při 12 V. | overeno |
| [K-VODIC-0018](K-VODIC-0018.md) | B | AWG nesedí na mm²; 12 AWG = 3,3 mm². | overeno |
| [K-VODIC-0019](K-VODIC-0019.md) | B | Měnič ~90 %, 1 000 W výstup ≈ 1 100 W z baterie. | overeno |
| [K-VODIC-0020](K-VODIC-0020.md) | C | Nad ~150 A zvážit 24 V. | overeno |
| [K-VODIC-0021](K-VODIC-0021.md) | A | Krimpovat kleštěmi a bužírkou, ne kroutit a izolepa. | overeno |
| [K-VODIC-0022](K-VODIC-0022.md) | A | Automobilové lanko (FLRY), ne tvrdý drát. | overeno |
| [K-VODIC-0023](K-VODIC-0023.md) | C | Kostra jako zpětný vodič, spoje čisté; lednice přímo na póly; kalkulačka odpor kostry nepočítá. | overeno |
| [K-VODIC-0024](K-VODIC-0024.md) | A | Kabel chráněný, průchodky plechem přes gumovou průchodku. | overeno |
| [K-VODIC-0025](K-VODIC-0025.md) | C | Délka = skutečná trasa, +10–20 % rezerva. | overeno |
| [K-VODIC-0026](K-VODIC-0026.md) | C | Výsledek je nejmenší vyhovující průřez; silnější nevadí, pokud se vejde do svorek. Odkaz změněn na v1.1. | overeno (mistr, kolo 4) |
| [K-VODIC-0027](K-VODIC-0027.md) | C | Orientační pomůcka, ne revize; EN 1648-1/-2, ISO 13297, ABYC E-11. | overeno |
| [K-VODIC-0028](K-VODIC-0028.md) | B | ΔU = ρ × L × n × I ÷ A (ρ 0,0175 / 0,0216), P = ΔU × I; příklad v1.1: 120 W, 12 V, 4 m, 3 % → 4 mm², 15 A. | navrh (přepis v1.1) |
| [K-VODIC-0033](K-VODIC-0033.md) | B | MEGA snese trvale méně než jmenovitou hodnotu (při 20 °C 78–93 %); MEGA 300 A a víc jen zkrat. | navrh (přepis v1.1) |
| [K-VODIC-0035](K-VODIC-0035.md) | A | „V motorovém prostoru použijte kabel pro vyšší teplotu (třída C 125 °C nebo D 150 °C) a dimenzujte podle tabulky jeho výrobce.“ Ve v1.1 text pod volbami. | overeno (jen podmínky srovnány na v1.1) |
| [K-VODIC-0036](K-VODIC-0036.md) | A | Nad 200 A (250 ÷ 1,25) hláška „Hlavní vedení: pojistka Class T u baterie …“; nad 150 A hláška o návodu měniče a MEGA. | navrh (přepis v1.1) |
| [K-VODIC-0039](K-VODIC-0039.md) | A | Kabel 105 °C: jeden stupeň průřezu vyrovná okolí u všech průřezů asi do 55 °C (do 67 °C podle průřezu; se 100 °C asi 50 °C); text „… V teplém místě volte o stupeň silnější.“ | navrh (přepis v1.1) |

## Archiv v2

Karty verze 2 a vypuštěné texty. Ve v1.1 se nepoužívají, neověřují ani neschvalují (poznámky mistra v kartách). Zdroje z nich smějí převzít karty v1.1 (např. tabulka ATOF v 0011).

| ID | Třída | Tvrzení (zkráceně) | Stav |
| --- | --- | --- | --- |
| [K-VODIC-0008](K-VODIC-0008.md) | B | Rychlý vzorec 10 × A ÷ I. Ve v1.1 vypuštěno. | k-prezkoumani |
| [K-VODIC-0029](K-VODIC-0029.md) | B | ATOF 1–40 A: při 20 °C 90–100 % jmenovitého proudu; 1,11× (20 °C), 1,33× (65 °C); výběr podle I30 (v2). | k-prezkoumani (archiv v2) |
| [K-VODIC-0030](K-VODIC-0030.md) | B | MINI 2–30 A: poměr ≥ 1,20 (20 °C), 1,39 (60 °C). | k-prezkoumani (archiv v2) |
| [K-VODIC-0031](K-VODIC-0031.md) | B | MAXI 20–80 A: poměr ≥ 1,08 (20 °C), 1,29 (65 °C). | k-prezkoumani (archiv v2) |
| [K-VODIC-0032](K-VODIC-0032.md) | B | MIDI: přetížení jen 30–125 A, poměr ≥ 1,07 (20 °C), 1,25 (65 °C). | k-prezkoumani (archiv v2) |
| [K-VODIC-0034](K-VODIC-0034.md) | B | Pravidlo 75 % z Fuseology platí pro UL 248-14, ne pro automobilové pojistky. | k-prezkoumani (archiv v2) |
| [K-VODIC-0037](K-VODIC-0037.md) | B | Odpor 95 a 120 mm²: IEC 60228 třída 5 (Lapp T11) 0,206 a 0,161 Ω/km. | k-prezkoumani (archiv v2) |
| [K-VODIC-0038](K-VODIC-0038.md) | B | Pojistka podle tabulky Littelfuse (I30), mez 1799/9 = 199,888… A. | k-prezkoumani (archiv v2) |

Souhrnná tabulka rodin pojistek verze 2: [POJISTKY_RODINY.md](POJISTKY_RODINY.md). Datové soubory verze 2 `packages/data/src/odpor-vodicu.json` (karty 0001 v2 a 0037) a `packages/data/src/pojistky.json` (karta 0038) výpočet v1.1 nepoužívá.

## Co se změnilo při přepisu na v1.1 (stručně)

- **Základ a koeficienty (0003, 0004, 0005):** tabulka AMP beze změny; nový základ PVC 70 °C → FLRY 105 °C (rozhodnutí odborníka, √(75/40) ≈ 1,37, kontrola 0,87 / 0,71 / 0,50 proti Lapp Table 12-2); koeficienty 1,0 a 0,7 (1,04 a 0,73); kontrola se 100 °C (√(70/40) ≈ 1,32 → 1,005 a 0,704). Vydání normy opraveno na 2023-06.
- **ρ (0001, 0002):** 0,0175 samostatně, 0,0216 ve svazku; odpor podle průřezu a 0,0236 jen historie.
- **Pojistky (0009, 0010, 0011, 0033, 0036):** řada bez 300 A, ≥ 1,25 × proud, mez 200 A, hlášky HLAVNI_VEDENI a NAD_150A_MENIC ve znění Radka; strop CAPN/CAPH přepočten pro v1.1 (rozhoduje ve všech průřezech); MEGA zúžena na „snese méně než jmenovitou“ a „300 A jen zkrat“.
- **Příklad (0028):** 120 W, 12 V, 4 m, 3 % → 4 mm², 15 A, ΔU 0,350 V (2,92 %), ztráta 3,50 W, max. délka 4,11 m; ve svazku 6 mm².
- **Teplé místo (0039):** přepočet pro kabel 105 °C a koeficienty v1.1: jeden stupeň stačí u všech průřezů do 54,7 °C (svazek) / 55,1 °C (samostatně), nejlépe do 67 °C; se 100 °C do 49,7 / 50,1 °C. Opraveno místo ve zdroji Lapp (nález kolo 4, bod 3).
- **0026, 0035:** jen odkaz / podmínky na v1.1, stav `overeno` zůstává.
- U každé přepsané karty je v poznámkách odstavec „Přepis na v1.1: co se změnilo“, starší poznámky zůstávají pod nadpisem „Historie (před přepisem na v1.1)“.

## Poznámky k testu podstatnosti (nic se nemění)

- **0001:** věta „mění úbytek o desetiny procentního bodu“ platí pro volby 3 % a 5 %; u 10 % je rozdíl až asi 0,9 bodu. Úbytek nerozhoduje o oteplení ani pojistce, nepodstatné.
- **0011, 0033:** 1,25 × proud nestačí u ATOF 20–30 A při okolí pojistky kolem 65 °C a u MEGA 225 A už při 20 °C pro proud 175–180 A. Pojistka může zbytečně pálit (komfort), kabel chrání max. pojistka. Nepodstatné.
- **0033:** zadání mělo „nejvýš asi 78 %“; přesně je 78 % nejmenší podíl (225 A), ostatní 83–93 %. Tvrzení uvádí rozsah.
- **0039:** text „V teplém místě volte o stupeň silnější“ nemá horní mez; jeden stupeň stačí asi do 55 °C. Zdroj pro teplotu teplých míst ve vestavbě (mimo motorový prostor) jsem nehledal.
- **0004:** svazek 4 obvodů by dal 0,676 místo 0,7 (o 3 %); počet obvodů je v zásobníku.

## Co se nepodařilo doložit

- **„PVC 70 °C“ u tab. 11 sl. 2 (0003):** stojí na rozhodnutí Radka (v1.1); přímý zdroj jsem podle zadání nehledal.
- **Třída B v ISO 6722-1 (0005):** 100, nebo 105 °C, nerozhoduji (text normy neotevřen); koeficienty platí v obou případech.
- **0,76 ve vydání 2013-06 a 2023-06 (0004):** číslo je jen ve výtazích z vydání 2003-08.
- **Teplota „teplého místa“ (0039):** žádný zdroj ji nečísluje.
- **Tabulky zatížitelnosti automobilových kabelů třídy C/D (0035):** nenalezeny; třída D pro motorový prostor má jen jeden zdroj (Prysmian).
- Texty norem neotevřeny (placené): DIN VDE 0298-4, ISO 6722-1, ISO 8820-3/-5, EN 1648-1/-2, ISO 13297. Littelfuse.com vrací 403, datasheety z kopií u distributorů.

## Otázky pro Radka

Žádné nové. Otázky 1–9 z předchozích kol uzavřel mistr 16. 11. 2026 (v1.1 nebo `docs/ZASOBNIK.md`); poznámky jsou v kartách.

## K ověření (v1.1, jedno kolo)

Ověřovatel kontroluje jen to, co je uvedeno. Co vrátí, rozhodne mistr. Karty třídy A s verdiktem SEDÍ jdou přes hlavní vlákno do `docs/karty/KE_SCHVALENI.md`.

**Jen výpočet a třída 105 °C u FLRY-B:**

- [ ] **K-VODIC-0003** (A): √(75 / 40) = 1,369 ≈ 1,37; kontrola √(30 / 40) ≈ 0,87 a √(10 / 40) = 0,50 proti Lapp Table 12-2.
- [ ] **K-VODIC-0004** (A): 0,76 × 1,37 ≈ 1,04 → 1,0; 0,76 × 0,70 × 1,37 ≈ 0,73 → 0,7; max. pojistky v1.1 (samostatně a ve svazku, 15 průřezů).
- [ ] **K-VODIC-0005** (A): FLRY-B je podle výrobců (datasheety v kartě) kabel do 105 °C; kontrola se 100 °C: √(70 / 40) ≈ 1,32 → 1,005 a 0,704.

**Jen to, že tvrzení odpovídá v1.1 a výpočet sedí:**

- [ ] **K-VODIC-0001** (B): ρ 0,0175; 23,8 °C; úbytky 3,10–3,27 / 5,17–5,46 / 10,34–10,91 %.
- [ ] **K-VODIC-0002** (B): ρ 0,0216 ve svazku; 79,6 °C.
- [ ] **K-VODIC-0009** (A): kde rozhoduje strop a kde AMP × k (1,0 / 0,7); max. pojistky se stropem a bez něj.
- [ ] **K-VODIC-0010** (B): řada FUSES v1.1 (23 hodnot, bez 300 A); MEGA 300 A jen zkrat.
- [ ] **K-VODIC-0011** (B): 1,25 × proud, mez 250 ÷ 1,25 = 200 A; podpora ATOF 1,11 / 1,33.
- [ ] **K-VODIC-0028** (B): ruční příklad 120 W, 12 V, 4 m, 3 % (samostatně 4 mm², ve svazku 6 mm²).
- [ ] **K-VODIC-0033** (B): podíly MEGA při 20 °C 78–93 %; 300 A a víc jen zkrat.
- [ ] **K-VODIC-0036** (A): mez 200 A, znění hlášek HLAVNI_VEDENI a NAD_150A_MENIC podle v1.1.
- [ ] **K-VODIC-0039** (A): meze T pro kabel 105 °C (nejhorší 95 → 120 mm² 55,1 / 54,7 °C, nejlepší 6 → 10 mm² 67,1 / 66,8 °C; se 100 °C 50,1 / 49,7 °C) a opravené místo ve zdroji Lapp.

**Neověřují se:** 0026 (overeno, mistr), 0035 (overeno, jen podmínky), ostatní karty `overeno` a archiv v2.
