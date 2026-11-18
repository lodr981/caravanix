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

## Karty pro lekce 3–10 a kalkulačky alfy

Rešeršér 16. 11. 2026. Lekce podle `docs/lekce/NAVRH_10_LEKCI.md`, předpoklady podle `docs/KALKULACKY_ALFA.md`. Všechny karty jsou `navrh` (18 karet: A 10, B 8). ID zatím nejsou v `docs/STAV.md` (podle zadání úkolu se STAV neměnil, zapíše hlavní vlákno).

| ID | Třída | Tvrzení (zkráceně) | Lekce / kalkulačka |
| --- | --- | --- | --- |
| [K-LEKCE-0001](K-LEKCE-0001.md) | A | LiFePO4 z alternátoru jen přes booster: omezí proud a vyrovná napětí chytrého alternátoru Euro 5/6. | lekce 3, booster (LITHIUM_BOOSTER), K2 |
| [K-LEKCE-0002](K-LEKCE-0002.md) | A | LiFePO4 se pod 0 °C nenabíjí; vyšší mez z datasheetu (Victron +5 °C) má přednost; vybíjet lze do −20 °C. | lekce 5, K2 |
| [K-LEKCE-0003](K-LEKCE-0003.md) | A | Nabíjení v mrazu blokuje BMS podle čidla na článcích, ne nabíječ ani uživatel. | lekce 5, K2 |
| [K-LEKCE-0004](K-LEKCE-0004.md) | B | Zkratový proud LiFePO4 12,8 V řádově tisíce A (0,8 mΩ → 16 000 A na pólech, s 2 m 35 mm² asi 7 100 A). | lekce 4, K2 |
| [K-LEKCE-0005](K-LEKCE-0005.md) | A | U lithiové baterie hlavní pojistka s vypínací schopností ≥ zkratový proud (typicky Class T), ostatní za ní. | lekce 4, 10, K2 (blok) |
| [K-LEKCE-0006](K-LEKCE-0006.md) | A | K regulátoru nejdřív baterie, pak panely; odpojit obráceně. | lekce 8, montážní postup |
| [K-LEKCE-0007](K-LEKCE-0007.md) | A | Voc série v mrazu ≤ max. vstupní napětí regulátoru (4 × 22,3 V: 89 V při 25 °C, 103 V při −20 °C). | lekce 8, solár (VOC_NAD_MAX, blok) |
| [K-LEKCE-0008](K-LEKCE-0008.md) | B | Voc roste v mrazu podle součinitele z datasheetu (Victron −0,35 %/K → +15,75 % při −20 °C). | lekce 8, solár (vzorec VocMraz) |
| [K-LEKCE-0009](K-LEKCE-0009.md) | A | Od 3 paralelních větví pojistka na každé větvi (Mersen, NEC 690.9). | lekce 8, solár (POJISTKA_VETVE), K2 |
| [K-LEKCE-0010](K-LEKCE-0010.md) | A | Paralelně jen stejné baterie stejného stáří; olovo s lithiem napřímo ne. | mýtus „Starou baterii přidám“, K2 |
| [K-LEKCE-0011](K-LEKCE-0011.md) | A | Doložená místa požáru: prodřená izolace o hranu, špatný či uvolněný spoj, chybějící pojistka; statistika „nejčastěji“ nedoložena. | lekce 10, kontrolní seznam |
| [K-LEKCE-0012](K-LEKCE-0012.md) | B | Účinnost indukce 85 % je předpoklad; test EPRI 75–78 % (o 10 % víc energie). | lekce 6, vaření (ucinnostVareni) |
| [K-LEKCE-0013](K-LEKCE-0013.md) | A | Proud z baterie ≤ trvalý proud BMS z datasheetu; 100Ah baterie typicky 100 A, indukce 2 000 W ≈ 174 A. | lekce 6, vaření, měnič, K2 |
| [K-LEKCE-0014](K-LEKCE-0014.md) | B | Parkovací klimatizace 12/24 V 2 000 W chladu: max. asi 720 W; 230V FreshJet 2200: 4,1 A (≈ 940 VA). | lekce 9, spotřebiče |
| [K-LEKCE-0015](K-LEKCE-0015.md) | B | Spotřeba měniče naprázdno 8–20 W (Phoenix 12/3000 20 W = 480 Wh/den). | lekce 7, měnič (spotrebaNaprazdnoW), soběstačnost |
| [K-LEKCE-0016](K-LEKCE-0016.md) | B | Trvalý výkon, ne špička: Phoenix 12/3000 = 3 000 VA, 2 400 W trvale (25 °C), 6 000 W špička. | lekce 7, měnič |
| [K-LEKCE-0017](K-LEKCE-0017.md) | B | Využitelnost LiFePO4 90 % je předpoklad mezi 80 % (Victron, životnost) a 100 % (Battle Born); v mrazu méně. | vaření, baterie, soběstačnost |
| [K-LEKCE-0018](K-LEKCE-0018.md) | B | Článek LiFePO4 3,2 V; 12,8 V (4S), 25,6 V (8S). | všechny kalkulačky alfy (Unom) |
| [K-LEKCE-0019](K-LEKCE-0019.md) | A | Každý nabíječ LiFePO4: lithiový profil nebo napětí podle výrobce baterie (Victron 12,8 V: 14,2 / 13,5 V), teplotní kompenzace vypnutá. Stav: schváleno. | lekce 11 |
| [K-LEKCE-0020](K-LEKCE-0020.md) | A | Booster a relé berou ze startovací baterie jen při běžícím motoru; nucené nabíjení ji vybíjí. Stav: schváleno. | lekce 12 |
| [K-LEKCE-0021](K-LEKCE-0021.md) | B | Olověná startovací baterie: plná 12,8 V, pod 12,4 V dobít; při občasném používání dobíjet každé 2 měsíce (VARTA). Stav: ověřeno. | lekce 12 |
| [K-LEKCE-0022](K-LEKCE-0022.md) | A | Mínus aspoň stejného průřezu jako plus (ABYC E-11 čl. 11.5.2.7.3). Stav: schváleno. | lekce 13, průřez |
| [K-LEKCE-0023](K-LEKCE-0023.md) | A | Mínusy za bočník na přípojnici; s kostrou jeden kabel blízko baterie, aspoň na hodnotu hlavní pojistky (Victron WU 7.7, 4.8). Stav: schváleno. | lekce 13 |
| [K-LEKCE-0024](K-LEKCE-0024.md) | A | Přípojka 230 V: kabel 3 × 2,5 mm² nejvýš 25 m, CEE, buben odvinout, nenastavovat; do chrániče nezasahovat (Hobby, návod kap. 7). Stav: návrh. | lekce 14 |
| [K-LEKCE-0025](K-LEKCE-0025.md) | A | Práce na 230 V jen odborně způsobilá osoba (NV 194/2022 Sb.), obsluha není činnost. Stav: návrh. | lekce 14, 17 |
| [K-LEKCE-0026](K-LEKCE-0026.md) | B | Napětí LiFePO4 stav nabití neurčí; monitor s bočníkem počítá Ah a synchronizuje se na 100 % (Battle Born, Victron SmartShunt 5.1, 5.7). Stav: návrh. | lekce 15 |
| [K-LEKCE-0027](K-LEKCE-0027.md) | A | Hlavní vypínač do plusu, pro DC, na proud plné zátěže (Victron WU 4.7). Stav: návrh. | lekce 16 |
| [K-LEKCE-0028](K-LEKCE-0028.md) | A | Klidový odběr vybíjí baterii; při odstavení udržovat nabitou, nebo nabít a odpojit (Victron Lithium NG 5.2.2, 5.4). Stav: návrh. | lekce 16 |
| [K-LEKCE-0029](K-LEKCE-0029.md) | B | Přestavba na obytný automobil: § 73, 74 a 37 zákona 56/2001 Sb.; definice SA nařízení (EU) 2018/858 příl. I A 5.1. Stav: návrh. | lekce 17 |

**Použité existující karty (beze změny):** K-VODIC-0013 (pojistka u baterie, lekce 4 a 10), K-VODIC-0015 (rozběh, lekce 7), K-VODIC-0017 (W → A, lekce 6 a 9), K-VODIC-0019 (účinnost měniče 90 %, lekce 6, 7, 9 a kalkulačky), K-VODIC-0020 (nad 150 A zvážit 24 V, lekce 7), K-VODIC-0021, -0023, -0024 (spoje, kostra, průchodky, lekce 10), K-VODIC-0036 (Class T u baterie, lekce 4), K-VODIC-0010 (vypínací schopnosti pojistek).

**Nálezy pro mistra (test podstatnosti, zadání ani výpočet jsem neměnil):**

1. **Indukce 85 % (0012):** jediný otevřený laboratorní test dává 75–78 %. Mění jen odhad litrů vody o asi 10 %, bezpečnosti se netýká. Zvážit výchozí 80 %.
2. **Klimatizace (0014):** věta „ušetří se pouze ztráta měniče, obvykle kolem 10 %“ nesedí na porovnání konkrétních výrobků (12/24V RTX 2000 má na stejné chlazení menší příkon než 230V FreshJet 2200, kvůli kompresoru). Navrženo upřesnit text lekce 9.
3. **Mráz (0002):** „pod 0 °C“ nestačí u baterií Victron (mez +5 °C). Navrženo doplnit „nebo pod mezí z datasheetu“. Třída A, uživatel by mohl nastavit BMS špatně.
4. **Kde to hoří (0011):** „nejčastěji“ nemá zdroj pro obytná vozidla; navrženo „typicky“.
5. **Regulátor bez baterie (0006):** věta ze zadání o poškození regulátoru a spotřebičů a o BMS, které odpojí při nabíjení, v návodu výrobce nenalezena.

Nepodstatné (jen poznámka v kartě): booster přísnější než Victron (0001), od 3 větví vždy pojistka (0009), 12,8 V jako napětí pro proud (0018).

**Co se nepodařilo doložit:** zkratový proud LiFePO4 přímo v ampérech v datasheetu (jen výpočtem z vnitřního odporu, 0004); umístění čidla na článcích v návodu výrobce baterie (jen článek výrobce BMS Daly, 0003); statistika příčin požárů obytných vozidel (0011); nezávislý zdroj pro 85 % u indukce (0012); výslovný zdroj „olovo s lithiem nespojovat“ od velkého výrobce (0010, Rolls jen „different types“); IEC 62548 (0009, zdroj vykládá NEC); dimenzování boosteru vůči alternátoru (0001); činný příkon 230V klimatizace (0014); spotřeba naprázdno levných měničů bez datasheetu (0015).

**K ověření (jedno kolo):** u všech 18 karet tvrzení proti zdroji a výpočty. Zvlášť: přiřazení sloupců tabulky Phoenix 1200–5000 VA (0015, 0016), čísla z tabulky Victron Smart (0004, 0013, 0017, 0018) a příklady 0007, 0009, 0012.


## Karty pro lekce 18–21 a časté otázky (18. 11. 2026)

Rešeršér 18. 11. 2026. Všechny `navrh`, čekají na jedno kolo ověření; třídy A jsou v `KE_SCHVALENI.md` jako sedmá dávka. Lekce 21 (volty-ampery-watty) používá jen vzorce a existující karty (K-VODIC-0017, -0019, -0020, K-LEKCE-0013, -0017, -0018).

| ID | Třída | Tvrzení (zkráceně) | Lekce / použití |
| --- | --- | --- | --- |
| [K-LEKCE-0030](K-LEKCE-0030.md) | A | BMS odpojí při podpětí, přepětí, nadproudu, zkratu, teplotě; probudit vychladnutím a nabíječkou; po dlouhém hlubokém vybití neobnovovat (Rolls, s. 9, 10, 18–19). Stav: návrh. | lekce 18, otázky |
| [K-LEKCE-0031](K-LEKCE-0031.md) | A | Pojistku měnit bez napětí, po odstranění příčiny, nepřemosťovat, jen předepsaná hodnota; nejčastější porucha = pojistka, hlavní vypínač 12 V, pojistka D+ (Schaudt EBL 501/502, kap. 1.2, 3.3). Stav: návrh. | lekce 18, otázky |
| [K-LEKCE-0032](K-LEKCE-0032.md) | B | Cykly olova podle hloubky vybití (AGM 400/600/1 500, gel 500/750/1 800 při 80/50/30 %), LFP 2 500 při 80 %, účinnost 92 vs. 80 %, až 70 % hmotnosti (Victron datasheety). Stav: návrh. | lekce 19, otázky |
| [K-LEKCE-0033](K-LEKCE-0033.md) | A | Olovo nenechávat vybité (sulfatace, zima); nabíječ podle typu baterie, AGM a gel jiná napětí, teplotní kompenzace u olova (Victron datasheety). Stav: návrh. | lekce 19, otázky |
| [K-LEKCE-0034](K-LEKCE-0034.md) | A | Paralelní banka: diagonálně nebo přípojnice se stejnými kabely; pojistka na plusu každé lithiové baterie a na hlavním kabelu (Victron Lithium Smart 4.5.4, WU 3.3). Stav: návrh. | lekce 20, otázky, K2 |
| [K-LEKCE-0035](K-LEKCE-0035.md) | A | Před spojením stejné napětí (Rolls < 15 mV), nabít každou zvlášť; nespojovat různé série, typy, starou s novou (Rolls s. 7–8, Victron 4.5.3–4.5.5). Stav: návrh. | lekce 20, otázky |

**Nedoloženo:** zamrzání vybité olověné baterie (lekce 19 ho neuvádí); výslovné „nabít do plna před paralelou“ (0035, poznámka).

## Karty pro lekce 22–27 (18. 11. 2026)

Nové karty (všechny třída A, stav `navrh`, ke schválení v osmé dávce v `KE_SCHVALENI.md`):

| ID | Třída | Tvrzení (zkráceně) | Použito |
| --- | --- | --- | --- |
| [K-LEKCE-0040](K-LEKCE-0040.md) | A | Jiskra při připojení měniče = nabíjení kondenzátorů; předbíjecí kabel (Victron Pre-Charge Cable). Stav: návrh. | lekce 22 |
| [K-LEKCE-0041](K-LEKCE-0041.md) | A | Pracovat s odpojenou baterií, izolovaným nářadím, moment z návodu; přepólování škodí (Victron WU 4.3, Phoenix VE.Direct 1, 3.2). Stav: návrh. | lekce 22 |
| [K-LEKCE-0042](K-LEKCE-0042.md) | A | Elektroblok Schaudt EBL 501/502: obsah, výstupy max. 20 A, solár 14 A / 15 A, typ baterie, 230 V neopravovat, pojistky stejné hodnoty (návod 8110322). Stav: návrh. | lekce 22, 23 |
| [K-LEKCE-0043](K-LEKCE-0043.md) | A | Booster s elektroblokem podle schématu výrobce, relé nespojí baterie, D+, typ baterie (Votronic VCC 1212-30). Stav: návrh. | lekce 23, 27 |
| [K-LEKCE-0044](K-LEKCE-0044.md) | A | Výstup měniče nikdy k jinému zdroji AC; přepínač zdrojů (Phoenix VE.Direct 3.4). Stav: návrh. | lekce 24 |
| [K-LEKCE-0045](K-LEKCE-0045.md) | A | Chránič za měničem jen se skutečným nulovým vodičem, kostra uzemněná (Phoenix VE.Direct 1, 3.5). Stav: návrh. | lekce 24 |
| [K-LEKCE-0046](K-LEKCE-0046.md) | A | Absorpční lednice na 12 V jen za jízdy (D+, relé), topné těleso min. 6 mm², pojistka 20 A (Dometic RML 10.4). Stav: návrh. | lekce 25 |
| [K-LEKCE-0047](K-LEKCE-0047.md) | A | Absorpční lednice: větrací mřížky, propan/butan, regulátor EN 12864, těsnost ne plamenem (Dometic RML 10.4). Stav: návrh. | lekce 25 |
| [K-LEKCE-0048](K-LEKCE-0048.md) | A | Regulátor do 3 m od baterie, ne nad ní; pojistka podle tabulky; odpojovač FV (Victron SmartSolar MPPT 4.1–4.3). Stav: návrh. | lekce 26 |
| [K-LEKCE-0049](K-LEKCE-0049.md) | A | Euro 6: napětí 12,6–15,5 V, booster spouštět D+, ne napětím, zapalování jen nouzově (Votronic VCC 1212-30). Stav: návrh. | lekce 27 |

**Použité existující karty (beze změny):** K-LEKCE-0001, -0004, -0005, -0006, -0007, -0008, -0009, -0015, -0016, -0019, -0020, -0024, -0025, -0027; K-VODIC-0013, -0015, -0021, -0023, -0024; K-VYROBCE-0001, -0004; K-SPOTR-0001.

**Nedoloženo:** hodnota odporu a doba předbíjení (výrobce neuvádí, lekce bez čísla); místo odběru D+ v konkrétních vozech (podklady výrobců vozů pro nástavbáře nehledány); české předpisy pro revize plynu v obytném voze; průřez solárních kabelů od výrobce regulátoru; evropská verze návodu absorpční lednice (použit severoamerický RML 10.4).
