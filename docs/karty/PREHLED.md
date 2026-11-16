# Přehled karet tvrzení

Aktualizováno rešeršérem 16. 11. 2026 po 2. kole ověření a po **2. kole Radkových rozhodnutí** o výpočtu verze 2 (`docs/ROZHODNUTI.md`, `docs/KALKULACKA_PRUREZU.md`, kapitola „Verze 2: co platí“). Karty kalkulačky průřezu platí pro verzi 2 po 2. kole; reference v1 je jen historie. Výpočet, engine ani reference rešeršér neměnil.

Souhrn: 39 karet, z toho A: 15, B: 19, C: 5. Stav: `overeno` 23 (z toho 0007, 0012 a 0016 rozhodnutím sporu Radkem), `navrh` 13 (9 změněných, 4 nové), `k-prezkoumani` 3.

Datové tabulky (plní rešeršér, ověřuje ověřovatel): `packages/data/src/odpor-vodicu.json` (15 průřezů, karty 0001 a 0037), `packages/data/src/pojistky.json` (22 pojistek, karta 0038).

| ID | Třída | Tvrzení (zkráceně) | Stav |
| --- | --- | --- | --- |
| [K-VODIC-0001](K-VODIC-0001.md) | B | Odpor vodiče podle průřezu 0,5–70 mm²: max. odpor FLRY-B při 20 °C (ρ 0,0181–0,0191). | navrh (2. kolo Radka) |
| [K-VODIC-0002](K-VODIC-0002.md) | B | ρ 0,0236 pro svazek a motorový prostor. Nepoužito od 2. kola. | k-prezkoumani |
| [K-VODIC-0003](K-VODIC-0003.md) | A | Základní zatížitelnost jednožilového kabelu, 30 °C (VDE 0298-4 tab. 11 sl. 2); 0,5 mm² 12 A podle Lapp. | navrh (2. kolo Radka) |
| [K-VODIC-0004](K-VODIC-0004.md) | A | Koeficient uložení: vedle sebe 0,76, kostra 1,0, svazek ≤ 3 obvody 0,53; 4+ obvody hláška; motorový prostor se nepočítá. | navrh (2. kolo Radka) |
| [K-VODIC-0005](K-VODIC-0005.md) | A | FLRY v PVC výrobci deklarují obvykle do 105 °C; kalkulačka hodnoty nezvyšuje. | overeno |
| [K-VODIC-0006](K-VODIC-0006.md) | B | CCA: asi o 60 % vyšší odpor, vodivost zhruba o třetinu nižší, do vozu jen čistá měď. | overeno |
| [K-VODIC-0007](K-VODIC-0007.md) | A | Kalkulačka jen pro měď; CCA ~1,6× průřez; „Pro automobilová lanka CCA jsme zatížitelnost nedohledali; NEC dává CCA hodnoty hliníku.“ | overeno (spor rozhodl Radek) |
| [K-VODIC-0008](K-VODIC-0008.md) | B | Rychlý vzorec 10 × A ÷ I. Vypuštěno. | k-prezkoumani |
| [K-VODIC-0009](K-VODIC-0009.md) | A | Stropy CAPN (vedle sebe, kostra) a CAPH (svazek); CAPH dnes nic nemění, zůstává jako pojistka. | navrh (2. kolo Radka) |
| [K-VODIC-0010](K-VODIC-0010.md) | B | Nabízené pojistky: ATOF 1–30 A, MIDI 40–125 A, MEGA 150–250 A; bez MINI, MAXI, 35 A a zkratových ochran. | navrh (2. kolo Radka) |
| [K-VODIC-0011](K-VODIC-0011.md) | B | Pojistka ≥ 1,25 × proud. Nepoužito od 2. kola (nahrazuje 0038). | k-prezkoumani |
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
| [K-VODIC-0026](K-VODIC-0026.md) | C | Výsledek je nejmenší vyhovující průřez; silnější nevadí, pokud se vejde do svorek. | overeno (přepočten jen příklad) |
| [K-VODIC-0027](K-VODIC-0027.md) | C | Orientační pomůcka, ne revize; EN 1648-1/-2, ISO 13297, ABYC E-11. | overeno |
| [K-VODIC-0028](K-VODIC-0028.md) | B | ΔU = ρ(A) × L × n × I ÷ A, ztráta P = ΔU × I; ruční příklad v2 (6 mm², 15 A ATOF). | navrh (2. kolo Radka) |
| [K-VODIC-0029](K-VODIC-0029.md) | B | ATOF 1–40 A: při 20 °C 90–100 % jmenovitého proudu, poměr ≥ 1,11 (20 °C), 1,33 (65 °C). | navrh (1. vrácení) |
| [K-VODIC-0030](K-VODIC-0030.md) | B | MINI 2–30 A: poměr ≥ 1,20 (20 °C), 1,39 (60 °C). Nenabízí se. | overeno |
| [K-VODIC-0031](K-VODIC-0031.md) | B | MAXI 20–80 A: poměr ≥ 1,08 (20 °C), 1,29 (65 °C). Nenabízí se. | overeno |
| [K-VODIC-0032](K-VODIC-0032.md) | B | MIDI: přetížení jen 30–125 A, poměr ≥ 1,07 (20 °C), 1,25 (65 °C). | overeno |
| [K-VODIC-0033](K-VODIC-0033.md) | B | MEGA: přetížení jen 40–250 A, 80–250 A ≥ 1,29 / 1,52; 40 A 1,29, 60 A 1,40. | navrh (2. kolo Radka) |
| [K-VODIC-0034](K-VODIC-0034.md) | B | Pravidlo 75 % z Fuseology platí pro UL 248-14, ne pro automobilové pojistky. | overeno |
| [K-VODIC-0035](K-VODIC-0035.md) | A | „V motorovém prostoru použijte kabel pro vyšší teplotu (třída C 125 °C nebo D 150 °C) a dimenzujte podle tabulky jeho výrobce.“ | navrh (2. kolo Radka) |
| [K-VODIC-0036](K-VODIC-0036.md) | A | Nad 199,9 A (tabulka MEGA 250 A) hlavní vedení: pojistka u baterie s dostatečnou vypínací schopností, typicky Class T. | navrh (1. vrácení) |
| [K-VODIC-0037](K-VODIC-0037.md) | B | Odpor 95 a 120 mm²: IEC 60228 třída 5 (Lapp T11) 0,206 a 0,161 Ω/km. | navrh (nová) |
| [K-VODIC-0038](K-VODIC-0038.md) | B | Pojistka podle tabulky Littelfuse: nejmenší nabízená s I30 ≥ proud (interpolace 20–65 °C). | navrh (nová) |
| [K-VODIC-0039](K-VODIC-0039.md) | A | „Vede-li kabel teplým místem …, zvolte o stupeň silnější.“ Jeden stupeň vyrovná faktor 0,74–0,85 (okolí ~40 °C). | navrh (nová) |

Souhrnná tabulka rodin pojistek: [POJISTKY_RODINY.md](POJISTKY_RODINY.md).

## Obsah datových tabulek

`packages/data/src/odpor-vodicu.json` (verze 2026-11-16): ρ = odporOhmKm × průřez / 1000, zaokrouhleno na 4 desetinná místa (polovina nahoru).

| Průřez [mm²] | 0,5 | 0,75 | 1 | 1,5 | 2,5 | 4 | 6 | 10 | 16 | 25 | 35 | 50 | 70 | 95 | 120 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Odpor [Ω/km] | 37,1 | 24,7 | 18,5 | 12,7 | 7,6 | 4,71 | 3,14 | 1,82 | 1,16 | 0,743 | 0,527 | 0,368 | 0,259 | 0,206 | 0,161 |
| ρ [Ω·mm²/m] | 0,0186 | 0,0185 | 0,0185 | 0,0191 | 0,0190 | 0,0188 | 0,0188 | 0,0182 | 0,0186 | 0,0186 | 0,0184 | 0,0184 | 0,0181 | 0,0196 | 0,0193 |
| Karta | 0001 | 0001 | 0001 | 0001 | 0001 | 0001 | 0001 | 0001 | 0001 | 0001 | 0001 | 0001 | 0001 | 0037 | 0037 |

`packages/data/src/pojistky.json` (verze 2026-11-16, všechny položky karta K-VODIC-0038): tabulka I20 / I65 je v [POJISTKY_RODINY.md](POJISTKY_RODINY.md).

Kontrola kódem (Node a Python): oba soubory jsou validní JSON; 15 průřezů v pořadí `MM`, 22 pojistek vzestupně (ATOF 10, MIDI 7, MEGA 5); každé `rho` sedí s výpočtem; každá pojistka má I65 ≤ I20 ≤ jmenovitá; I30 roste s jmenovitou hodnotou.

## Co se změnilo ve 2. kole Radka (stručně)

- **Odpor vodiče:** jedno ρ 0,0191 nahrazeno tabulkou podle průřezu (0001), nová karta pro 95 a 120 mm² (0037); teplý přepočet 0,0236 se nepoužívá (0002 → `k-prezkoumani`).
- **Uložení:** vedle sebe 0,76, kostra 1,0, svazek 0,53 jen do 3 obvodů, 4+ obvody hláška, motorový prostor se nepočítá, okolí do 30 °C (0003, 0004, 0035); text o teplém místě (nová 0039); CAPH jen pro svazek, dnes nic nemění (0009).
- **Pojistky:** výběr podle tabulek Littelfuse a I30 (nová 0038), nabízené rodiny a hodnoty (0010), poměr 1,25 zrušen (0011 → `k-prezkoumani`), mez rozsahu 199,889 A z tabulky (0036), opravy podle nálezů kola 2 (0029, 0033, POJISTKY_RODINY).
- **Spory po druhém vrácení:** 0007, 0012, 0016 přesně podle Radkova znění, `overeno`, `schvalil` „Radek, 2026-11-16 (rozhodnutí sporu)“; třída A (0007, 0012) ještě projde schválením v KE_SCHVALENI.
- **Příklady:** 0028 přepočten pro v2 (vrácen na `navrh`), 0026 přepočten jen kontrolní příklad.

## Co se nepodařilo doložit

- **Jeden vodič připevněný k povrchu = plná základní zatížitelnost (k = 1,0, 0003/0004).** Bayka a Lapp uvádějí základní hodnotu jen pro „volně ve vzduchu“; faktor pro jednotlivý vodič na povrchu je v tab. 10 DIN VDE 0298-4, kterou jsem veřejně nenašel. Zůstává jako rozhodnutí Radka.
- **„Obvod“ v Lapp Table 12-6 = dvojice plus–mínus jednoho DC spotřebiče (0004):** Lapp to pro DC výslovně neříká.
- **Teplota „teplého místa“ (0039):** žádný zdroj ji nečísluje. Jeden stupeň průřezu vyrovná okolí zhruba 41–48 °C (vodič 70 °C), při 50 °C nestačí.
- **Tabulky zatížitelnosti automobilových kabelů třídy C/D (0035):** nenalezeny; „dimenzujte podle tabulky jeho výrobce“ je rada. Třída D pro motorový prostor má dál jen jeden zdroj (Prysmian).
- **Věta „CAPH zůstává jako pojistka pro budoucí změny koeficientů“ (0009)** v `docs/ROZHODNUTI.md` doslova není; převzal jsem ji ze zadání úkolu.
- Texty norem neotevřeny (placené): DIN VDE 0298-4 (tab. 10, 11, 17, 18, 21), IEC 60228 (tab. 3), ISO 6722-1, ISO 8820-3/-5, ASTM B566, EN 1648-1/-2, ISO 13297.
- Littelfuse.com vrací 403; datasheety z kopií u distributorů (chipdip.ru, eicom.ru, enika.eu, components.ru), stejné dokumenty a revize. Sloupec 30 °C v tabulkách Littelfuse není, I30 je odvozený.
- Datasheet FLRY-B: řádek pro každý průřez 0,5–70 mm² je, nic nechybí.

## Otázky pro Radka

1. **Zaokrouhlení ρ pro 1,5 mm²:** 12,7 × 1,5 / 1000 = 0,01905 přesně. Polovina nahoru dává 0,0191 (v souboru, konzervativní), zaokrouhlení v plovoucí čárce (Python `round`, JS `toFixed`) může dát 0,0190. Platí 0,0191? Tester to musí v referenci udělat stejně.
2. **Jeden vodič na povrchu (0003, 0004):** k = 1,0 pro vodič připevněný ke karoserii zdroj nedokládá (zdroje mluví o vodiči volně ve vzduchu). Necháš jako své rozhodnutí odborníka, nebo hledat tab. 10 normy?
3. **Teplé místo (0039):** „o stupeň silnější“ vyrovná okolí asi do 40 °C u všech průřezů, při 50 °C už ne. Stačí text tak, jak je, nebo doplnit „u velmi teplých míst kabel pro vyšší teplotu“?
4. **Důsledky výběru podle I30 (0038):** spotřebič 30 A dostane šroubovací MIDI 40 A (ATOF 30 A dovoluje při 30 °C jen 26,1 A), spotřebič 5 A dostane 7,5 A. Je to v pořádku?
5. **CAPH (0009):** doplníš do `docs/ROZHODNUTI.md` větu, že CAPH zůstává jako pojistka pro budoucí změny koeficientů?
6. **95 a 120 mm² (0037):** Lapp T11 má pro pocínovaný vodič třídy 5 vyšší odpor (0,210 a 0,164 Ω/km). Platí hodnoty holé mědi podle tvého rozhodnutí i pro pocínovaná lanka?
7. Otevřené z 1. kola beze změny: pojistka 17,5 cm bez normy pro obytná vozidla (0013), vlastní mínus u měniče a nabíječky (0023), Class T jako „typicky“, ne povinnost (0036).

## K ověření (3. kolo)

**Datové tabulky:** `packages/data/src/odpor-vodicu.json` (proti 0001, 0037 a datasheetům), `packages/data/src/pojistky.json` (proti 0038 a datasheetům ATOF, MIDI, MEGA).

**Změněné karty:** K-VODIC-0001, 0003, 0004, 0009, 0010, 0028, 0033, 0035 (2. kolo Radka); K-VODIC-0029, 0036 (1. vrácení po kole 2 a 2. kolo Radka). U 0029 a 0036 jde o 2. kolo ověření této verze; další NESEDÍ jde podle pravidel k Radkovi.

**Nové karty:** K-VODIC-0037, 0038, 0039.

**Jen kontrola přepočtu příkladu (tvrzení beze změny):** K-VODIC-0026 (pole `vypocet`).

Neověřují se: 0002, 0008, 0011 (`k-prezkoumani`); 0007, 0012, 0016 (spor rozhodl Radek; 0007 a 0012 jdou ke schválení třídy A přes KE_SCHVALENI).
