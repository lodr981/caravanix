# Rodiny pojistek Littelfuse: poměr a rozsah

Podklad pro Radkovo rozhodnutí o typu pojistky (`docs/KALKULACKA_PRUREZU.md`, kapitola „Typ pojistky (připravuje se)“). Připravil rešeršér 16. 11. 2026. **Výpočet nemění.** Verze 2 dál používá f ≥ 1,25 × I, dokud Radek nerozhodne jinak.

Karty: [K-VODIC-0029](K-VODIC-0029.md) ATOF, [K-VODIC-0030](K-VODIC-0030.md) MINI, [K-VODIC-0031](K-VODIC-0031.md) MAXI, [K-VODIC-0032](K-VODIC-0032.md) MIDI, [K-VODIC-0033](K-VODIC-0033.md) MEGA, [K-VODIC-0034](K-VODIC-0034.md) obecné pravidlo 75 % z Fuseology. Všechny jsou ve stavu `navrh`.

## Jak jsou čísla spočítaná

- Zdroj: tabulka „Temperature Table, max. allowed current load at ambient temperature (typical derating)“ v datasheetu každé rodiny. Littelfuse u ní uvádí „Temperature Security Margin is 20%“ a že křivky se mohou lišit podle svorek a průřezu vodiče.
- Poměr = jmenovitý proud pojistky ÷ dovolený trvalý proud při dané teplotě okolí. Minimální poměr rodiny = největší z poměrů přes hodnoty, které jsou v řadě `FUSES` verze 2 (bez 300 A).
- Teplota je **teplota okolí pojistky**, ne kabelu. Sloupec 20 °C odpovídá pojistce v obytné části nebo v bedně s baterií, 65 °C teplé schránce nebo motorovému prostoru. MINI má jiné sloupce (40 °C a 60 °C místo 65 °C).
- Přepočet: `scripts/pojistky.py` ve scratchpadu rešeršéra (Python), čísla z tabulek opsaná z PDF přes `pdftotext` a kontrolně přes souřadnice slov (PyMuPDF).

## Souhrn

| Rodina | Jmenovité hodnoty (datasheet) | Doporučené použití (datasheet) | Min. poměr při 20 °C | Min. poměr při 65 °C | Hodnoty z `FUSES` v2, které pokrývá |
| --- | --- | --- | --- | --- | --- |
| ATOF (nožová, ISO 8820-3) | 1–40 A | ochrana nízkonapěťových obvodů | **1,11** (20 A a 30 A) | **1,33** (20 A) | 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30, 35, 40 |
| MINI (nožová, ISO 8820-3) | 2–30 A | standard pro jištění obvodů vozidla | **1,20** (3 A) | 1,39 při 60 °C (25 A); 1,25 při 40 °C | 2, 3, 5, 7,5, 10, 15, 20, 25, 30 |
| MAXI (nožová Slo-Blo, ISO 8820-3) | 20–80 A | časově zpožděná, malý ztrátový výkon | **1,08** (80 A) | **1,29** (80 A) | 20, 25, 30, 35, 40, 50, 60, 70, 80 |
| MIDI (šroubovací, ISO 8820-5) | 30–200 A, z toho **150–200 A jen zkratová ochrana** | silnoproudé svazky, časové zpoždění | **1,07** (30 A) | **1,25** (30, 40, 60 A) | přetížení: 30, 40, 50, 60, 70, 80, 100, 125; jen zkrat: 150, 175, 200 |
| MEGA (šroubovací, ISO 8820-5) | 40–500 A, z toho **300–500 A jen zkratová ochrana**; 40 a 60 A „not mentioned in ISO standards“ | baterie, alternátory, silné svazky s velkým rozběhem | 80–250 A: **1,29** (225 A); s 40 a 60 A: **1,40** (60 A) | 80–250 A: **1,52** (225 A); s 40 a 60 A: **1,67** | 40, 60, 80, 100, 125, 150, 175, 200, 225, 250 |

Pokrytí řady: každá hodnota z `FUSES` v2 má aspoň jednu rodinu pro přetížení. 1 A jen ATOF, 35 A ATOF a MAXI, 50 a 70 A MAXI a MIDI, 150–250 A jen MEGA (MIDI v tomto rozsahu jen zkratová ochrana).

## Poměr 1,25 (verze 2) proti tabulkám

| Rodina | 1,25 stačí při 20 °C? | 1,25 stačí při 65 °C? |
| --- | --- | --- |
| ATOF | ano, všechny hodnoty | ne u 20 A (16 A proti 15 A), 25 A (20 / 19), 30 A (24 / 23), 40 A (32 / 31) |
| MINI | ano | při 40 °C ano; při 60 °C ne (např. 25 A: 20 A proti 18 A) |
| MAXI | ano | ne u 60 A (48 / 47) a 80 A (64 / 62) |
| MIDI 30–125 A | ano | ano (30, 40 a 60 A přesně na hraně 1,25) |
| MEGA | **ne** u 40 A (32 / 31), 60 A (48 / 43) a 225 A (180 / 175) | ne u žádné hodnoty 40–250 A |

Čísla v závorce: proud, do kterého kalkulačka pojistku zvolí (f ÷ 1,25), proti trvalému proudu z tabulky výrobce.

## Možné rozdělení podle proudu (jen podklad)

| Varianta | Pásmo pojistky | Min. poměr 20 °C | Min. poměr 65 °C |
| --- | --- | --- | --- |
| ATOF | 1–40 A | 1,11 | 1,33 |
| MIDI | 50–125 A | 1,03 | 1,25 |
| MAXI (místo MIDI) | 50–80 A | 1,08 | 1,29 |
| MEGA | 150–250 A | 1,29 | 1,52 |

## Co z toho plyne pro rozhodnutí (bez návrhu změny výpočtu)

1. Poměr se liší podle rodiny a hlavně podle teploty okolí pojistky. Jedno číslo pro všechno buď u MEGA nestačí, nebo je u nožových pojistek zbytečně přísné.
2. U MEGA 225 A je potřeba 1,29 už při 20 °C. MEGA 40 a 60 A potřebují 1,29 a 1,40 a ISO je neuvádí.
3. MIDI 150–200 A a MEGA 300 A a výš jsou podle výrobce jen ochrana proti zkratu. Do řady pro přetížení nepatří.
4. Obecné pravidlo „pojistku zatěžovat nejvýš na 75 %“ (poměr 1,33) Littelfuse uvádí ve Fuseology pro pojistky podle UL/CSA/ANCE 248-14, ne pro automobilové pojistky (karta 0034). U automobilových rodin platí jejich vlastní tabulky.

## Co se nepodařilo

- Web Littelfuse (littelfuse.com) vrací 403. Použil jsem kopie datasheetů u distributorů (chipdip.ru, eicom.ru, enika.eu). Revize jsou uvedeny v kartách.
- Datasheet ATO (stříbřené svorky) jsem zvlášť neotevřel. Datasheet ATOF platí i pro „ATO Ag“ (stejné objednací tabulky), stejná teplotní tabulka.
- Littelfuse neříká, co přesně znamená „Temperature Security Margin is 20%“ (zda je rezerva už v tabulce). Čísla beru tak, jak je výrobce uvádí jako „max. allowed current load“.
- Druhý nezávislý výrobce (například Eaton Bussmann) nebyl předmětem úkolu a neověřoval jsem ho.

## Otázky pro Radka

1. Pro jakou teplotu okolí pojistky má kalkulačka počítat: 20 °C (obytná část), 65 °C (motorový prostor), nebo podle zvoleného uložení?
2. Rozdělení rodin: ATOF 1–40 A, MIDI (nebo MAXI) 50–125 A, MEGA 150–250 A?
3. MEGA 40 a 60 A (mimo ISO, poměr 1,29 a 1,40): vyřadit z doporučení?
