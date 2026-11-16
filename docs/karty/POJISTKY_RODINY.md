# Rodiny pojistek Littelfuse: poměr, rozsah a co kalkulačka nabízí

Podklad připravil rešeršér 16. 11. 2026, aktualizováno po 2. kole Radkových rozhodnutí téhož dne. **Výpočet nemění.**

**Rozhodnuto (Radek, 2. kolo 16. 11. 2026, `docs/ROZHODNUTI.md`):** pojistka se volí podle tabulek Littelfuse, ne jedním poměrem. Nejmenší nabízená hodnota, jejíž dovolený trvalý proud při 30 °C (lineární interpolace mezi sloupci 20 °C a 65 °C) je alespoň proud spotřebiče. Nabízí se jen ATOF 1–30 A, MIDI 40–125 A, MEGA 150–250 A. MINI, MAXI a 35 A ne, zkratové ochrany nikdy. Postup a příklady: [K-VODIC-0038](K-VODIC-0038.md). Data: `packages/data/src/pojistky.json`.

Karty: [K-VODIC-0029](K-VODIC-0029.md) ATOF, [K-VODIC-0030](K-VODIC-0030.md) MINI, [K-VODIC-0031](K-VODIC-0031.md) MAXI, [K-VODIC-0032](K-VODIC-0032.md) MIDI, [K-VODIC-0033](K-VODIC-0033.md) MEGA, [K-VODIC-0034](K-VODIC-0034.md) obecné pravidlo 75 % z Fuseology, [K-VODIC-0038](K-VODIC-0038.md) výběr podle tabulky, [K-VODIC-0010](K-VODIC-0010.md) nabízené hodnoty. Poměr 1,25 ([K-VODIC-0011](K-VODIC-0011.md)) se od 2. kola nepoužívá.

## Jak jsou čísla spočítaná

- Zdroj: tabulka „Temperature Table, max. allowed current load at ambient temperature (typical derating)“ v datasheetu každé rodiny. Littelfuse u ní uvádí „Temperature Security Margin is 20%“ a že křivky se mohou lišit podle svorek a průřezu vodiče.
- Poměr = jmenovitý proud pojistky ÷ dovolený trvalý proud při dané teplotě okolí. Minimální poměr rodiny = největší z poměrů přes hodnoty rodiny.
- Teplota je **teplota okolí pojistky**, ne kabelu. MINI má jiné sloupce (40 °C a 60 °C místo 65 °C).
- Tabulky čteny z PDF podle souřadnic slov (PyMuPDF), přepočet v Pythonu, kontrola v Node proti `pojistky.json`.
- Revize: ATOF 08/18/2022, MINI výtah z katalogu (REV11042021), MAXI 10/26/2022, MIDI 09/13/2023, **MEGA 04/08/2024**. Kopie u distributorů (littelfuse.com vrací 403), MD5 shodné s kopiemi z kol 1 a 2.

## Co kalkulačka nabízí (I20, I65 z tabulky výrobce, I30 odvozené)

| Rodina | Jmenovitá [A] | I20 [A] | I65 [A] | I30 [A] |
| --- | --- | --- | --- | --- |
| ATOF | 1 | 1 | 1 | 1,000 |
| ATOF | 2 | 2 | 2 | 2,000 |
| ATOF | 3 | 3 | 3 | 3,000 |
| ATOF | 5 | 5 | 4 | 4,778 |
| ATOF | 7,5 | 7 | 6 | 6,778 |
| ATOF | 10 | 10 | 8 | 9,556 |
| ATOF | 15 | 14 | 12 | 13,556 |
| ATOF | 20 | 18 | 15 | 17,333 |
| ATOF | 25 | 23 | 19 | 22,111 |
| ATOF | 30 | 27 | 23 | 26,111 |
| MIDI | 40 | 38 | 32 | 36,667 |
| MIDI | 50 | 50 | 45 | 48,889 |
| MIDI | 60 | 58 | 48 | 55,778 |
| MIDI | 70 | 70 | 59 | 67,556 |
| MIDI | 80 | 80 | 72 | 78,222 |
| MIDI | 100 | 100 | 85 | 96,667 |
| MIDI | 125 | 124 | 104 | 119,556 |
| MEGA | 150 | 135 | 114 | 130,333 |
| MEGA | 175 | 149 | 125 | 143,667 |
| MEGA | 200 | 166 | 140 | 160,222 |
| MEGA | 225 | 175 | 148 | 169,000 |
| MEGA | 250 | 207 | 175 | 199,889 |

I30 = I20 + (I65 − I20) × 10 / 45. I30 roste s jmenovitou hodnotou, řada nemá díru. Mez rozsahu kalkulačky: 199,889 A (MEGA 250 A), nad ní hláška hlavní vedení (K-VODIC-0036). Řádek ATOF 7,5 A je v tabulce zaokrouhlený na celé ampéry.

## Souhrn rodin (podklad, všechny hodnoty z datasheetů)

| Rodina | Jmenovité hodnoty (datasheet) | Min. poměr při 20 °C | Min. poměr při 65 °C | V kalkulačce |
| --- | --- | --- | --- | --- |
| ATOF (nožová, ISO 8820-3) | 1–40 A | **1,11** (20 A a 30 A) | **1,33** (20 A) | 1–30 A (bez 4 A) |
| MINI (nožová, ISO 8820-3) | 2–30 A | **1,20** (3 A) | 1,39 při 60 °C (25 A); 1,25 při 40 °C | ne |
| MAXI (nožová Slo-Blo, ISO 8820-3) | 20–80 A | **1,08** (80 A) | **1,29** (80 A) | ne |
| MIDI (šroubovací, ISO 8820-5) | 30–200 A, z toho **150–200 A jen zkratová ochrana** | **1,07** (30 A); 40–125 A: 1,05 | **1,25** (30, 40, 60 A) | 40–125 A |
| MEGA (šroubovací, ISO 8820-5) | 40–500 A, z toho **300–500 A jen zkratová ochrana**; 40 a 60 A „not mentioned in ISO standards“ | 80–250 A: **1,29** (225 A: 225 / 175 = 1,286) | 80–250 A: **1,52** (225 A) | 150–250 A |

**MEGA 40 a 60 A (revize 04/08/2024, s. 4):** 40 A: I20 = 31 A → poměr 40 / 31 = **1,29**; 60 A: I20 = 43 A → poměr 60 / 43 = **1,40**. Při 65 °C 40 / 26 = 1,54 a 60 / 36 = 1,67. 40 A je tedy prakticky stejně jako 225 A (1,290 proti 1,286), 60 A víc. Obě hodnoty nesnesou jmenovitý proud ani při −40 °C (36 a 50 A). Kalkulačka je nenabízí (40–125 A pokrývá MIDI).

## Co se nepodařilo

- Web Littelfuse (littelfuse.com) vrací 403. Použil jsem kopie datasheetů u distributorů (chipdip.ru, eicom.ru, enika.eu), stejné dokumenty a revize.
- Datasheet ATO (stříbřené svorky) jsem zvlášť neotevřel; datasheet ATOF platí i pro „ATO Ag“.
- Littelfuse neříká, co přesně znamená „Temperature Security Margin is 20%“ (zda je rezerva už v tabulce). Čísla beru tak, jak je výrobce uvádí jako „max. allowed current load“.
- Sloupec 30 °C výrobce nemá; I30 je lineární interpolace podle rozhodnutí Radka.
- Druhý nezávislý výrobce (například Eaton Bussmann) nebyl předmětem úkolu.

## Historie

- 1. kolo verze 2 (16. 11. 2026): pojistka ≥ 1,25 × proud, řada FUSES 1–250 A bez 300 A. Poměr 1,25 při 20 °C nestačil u MEGA 40, 60 a 225 A, při 65 °C u většiny ATOF ≥ 20 A, MAXI 60 a 80 A a všech MEGA. **Nahrazeno** 2. kolem téhož dne.
