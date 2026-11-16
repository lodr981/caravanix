# Ruční příklady: kalkulačky alfy A–G (16. 11. 2026)

Podle `docs/KALKULACKY_ALFA.md`. Přesné hodnoty ověřuje `packages/engine/tests/kalkulacky-alfa.test.ts` (názvy testů začínají číslem příkladu, např. „P-A1“). Mezivýsledky jsou zaokrouhlené pro čtení, v testu jsou plné (tolerance 1e-9). Čísla jsem ověřil i výpočtem v Node podle vzorců zadání.

Konstanty: Unom = 3,2 V × 4 = **12,8 V** (12 V) a 3,2 V × 8 = **25,6 V** (24 V). Měrné teplo vody 4,186 kJ/(kg·K), 1 kJ = 1/3,6 Wh.

## A. Spotřebiče (`bilanceSpotrebicu`)

**P-A1** (12 V, účinnost měniče výchozí 0,9)

| Položka | WhSpotrebic | WhZBaterie | proud | AhDenne |
|---|---|---|---|---|
| lednice 45 W × 24 h, DC | 45 × 24 = 1 080 | 1 080 | 45 / 12,8 = 3,515625 A | 1 080 / 12,8 = 84,375 |
| notebook 60 W × 3 h, 230 V | 60 × 3 = 180 | 180 / 0,9 = 200 | 60 / 0,9 / 12,8 = 5,2083 A | 200 / 12,8 = 15,625 |

Souhrn: WhDenne 1 280, AhDenne 1 280 / 12,8 = **100**, proudSoucasne 3,515625 + 5,2083 = **8,7240 A**, vykon230V **60 W**. Hlášky žádné (proud ≤ 150 A, jedna položka je na 230 V).

**P-A2** (24 V, účinnost 0,85)

| Položka | WhSpotrebic | WhZBaterie | proud | AhDenne |
|---|---|---|---|---|
| kávovar 1 200 W × 0,25 h, 230 V | 300 | 300 / 0,85 = 352,941 | 1 200 / 0,85 / 25,6 = 55,147 A | 13,787 |
| světla 20 W × 5 h, DC | 100 | 100 | 20 / 25,6 = 0,78125 A | 3,90625 |
| čerpadlo 0 W × 2 h, DC | 0 | 0 | 0 | 0 |

Souhrn: WhDenne **452,941**, AhDenne 452,941 / 25,6 = **17,693**, proudSoucasne **55,928 A**, vykon230V **1 200 W**. Hlášky žádné.

**P-A3** 100 W × 2 h DC, 12 V: WhDenne 200, AhDenne 15,625, proud 7,8125 A; žádná položka na 230 V → **`BEZ_MENICE`**.

**P-A4** k tomu položka 0 W na 230 V → položka na 230 V existuje → bez `BEZ_MENICE` (doslovně, Q14).

**Hrana `NAD_150A`:** 1 920 W DC na 12 V → 1 920 / 12,8 = **150 A přesně → ne**; 1 920,01 W → 150,0008 A → **ano**. Na 24 V totéž s 3 840 W. Dva spotřebiče 1 000 W na 230 V, 12 V: 2 × 1 000 / 0,9 / 12,8 = 173,6 A → ano.

## B. Vaření

**P-B1 (příklad ze zadání)** `ohrevVody({ litry: 1 })`: WhTeplo = 1 × 4,186 × (100 − 15) / 3,6 = 355,81 / 3,6 = **98,836 Wh ≈ 98,8**; WhZBaterie = 98,836 / (0,85 × 0,9) = 98,836 / 0,765 = **129,198 Wh ≈ 129,2**.

**P-B2** 2,5 l z 10 na 95 °C, účinnost vaření 0,6, měnič 1: WhTeplo = 2,5 × 4,186 × 85 / 3,6 = **247,090 Wh**; WhZBaterie = 247,090 / 0,6 = **411,817 Wh**.

**P-B3** 0,5 l z −10 na −5 °C: WhTeplo = 0,5 × 4,186 × 5 / 3,6 = **2,9069 Wh**; z baterie / 0,765 = **3,7999 Wh**.

Hrany: tStart 99 a tCil 100 → 4,186 / 3,6 = 1,16278 Wh (platné). tCil = tStart nebo menší → `NEPLATNY_VSTUP`, pole `tCil` (Q5).

**P-B4 (příklad ze zadání)** `kolikUvarim` 200 Ah, 12 V, 90 %, 1 000 W, 20 min:
- WhVyuzitelne = 200 × 12,8 × 0,9 = **2 304 Wh**
- WhNaJidlo = 1 000 × 20 / 60 / 0,9 = 333,33 / 0,9 = **370,37 Wh ≈ 370,4**
- jidel = floor(2 304 / 370,37) = floor(6,22) = **6**
- litruVody = 2 304 / 129,198 = **17,833 l**
- hodinChodu = 2 304 / (1 000 / 0,9) = 2 304 / 1 111,1 = **2,0736 h**
- proud 1 000 / 0,9 / 12,8 = 86,8 A ≤ 150 → bez hlášky.

**P-B5** 100 Ah, 24 V, 80 %, 2 000 W, 15 min, měnič 0,95:
- WhVyuzitelne = 100 × 25,6 × 0,8 = **2 048 Wh**
- WhNaJidlo = 2 000 × 15 / 60 / 0,95 = 500 / 0,95 = **526,32 Wh** → jidel = floor(3,89) = **3**
- litruVody = 2 048 / 129,198 = **15,852 l** (dělí se ohřevem 1 l s **výchozími** účinnostmi 0,85 a 0,9, ne s 0,95; doslovně, Q8)
- hodinChodu = 2 048 / (2 000 / 0,95) = **0,9728 h**; proud 2 000 / 0,95 / 25,6 = 82,2 A → bez hlášky.

**P-B6 (floor na hraně)** 200 Ah, 12 V, 90 %, 1 152 W, 20 min, měnič 1: WhNaJidlo = 1 152 × 20 / 60 = **384**; 2 304 / 384 = **6** přesně → 6 jídel. Při 20,0001 min je WhNaJidlo 384,0019 → 5,99997 → **5**.

**P-B7** 1 Ah, 12 V, 90 % (11,52 Wh), 1 500 W, 60 min: WhNaJidlo = 1 500 / 0,9 = 1 666,67 → **0 jídel**; hodinChodu = 11,52 / 1 666,67 = 0,006912 h; proud 1 500 / 0,9 / 12,8 = 130,2 A → bez hlášky.

**Hrana `PROUD_VELKY`** (měnič 1): 1 920 W / 12,8 = 150 A → ne; 1 920,01 W → ano; 24 V: 3 840 W ne, 3 840,01 W ano. Výchozí 0,9: 2 000 / 0,9 / 12,8 = 173,6 A → ano.

## C. Baterie

**P-C1** `potrebnaBaterie` 1 280 Wh/den, 3 dny, 12 V, 90 %: WhPotreba = 1 280 × 3 / 0,9 = **4 266,67 Wh**; Ah = 4 266,67 / 12,8 = **333,33** → nahoru na 10 → **340 Ah**.

**P-C2** 2 000 Wh/den, 0,5 dne, 24 V, 100 %: WhPotreba **1 000 Wh**; Ah = 1 000 / 25,6 = **39,0625** → **40 Ah**.

**P-C3** 2 560 Wh/den, 1 den, 24 V, 100 %: Ah = 2 560 / 25,6 = **100 přesně** → zůstane **100** (v plovoucí čárce vyjde přesně 100 při obou pořadích dělení). Při 2 560,01 Wh → 100,0004 → **110**.

Navíc: 1 280 Wh na 1 den, 90 % → 1 422,22 Wh, 111,11 Ah → 120 Ah.

**P-C4** `vydrzBaterie` 200 Ah, 12 V, 90 % = 2 304 Wh, spotřeba 2 304 Wh/den → **1 den, 24 h** (zpětně k příkladu ze zadání).

**P-C5** 100 Ah, 24 V, 80 % = 2 048 Wh, 500 Wh/den → 2 048 / 500 = **4,096 dne**, × 24 = **98,304 h**.

Zpětná kontrola: 333,33 Ah z P-C1 (12 V, 90 % = 3 840 Wh) při 1 280 Wh/den → **3 dny**, 72 h.

## D. Měnič (`navrhMenice`)

**P-D1** 12 V, účinnost 0,9; kávovar 1 000 W, lednice 60 W s rozběhem 5×, nabíječka 30 W; vše současně; naprázdno 10 W × 5 h.
- trvalyVykonW = 1 000 + 60 + 30 = **1 090 W**
- rozběhové přírůstky: 1 000 × 0 = 0; 60 × 4 = **240**; 30 × 0 = 0 → rozbíhá se lednice
- spickaW = 1 090 − 60 + 60 × 5 = **1 330 W**
- proudZBaterie = 1 090 / 0,9 / 12,8 = **94,618 A**; WhNaprazdno = 10 × 5 = **50 Wh**
- hlášky: `ODKAZ_PRUREZ` (vždy).

**P-D2** 24 V, účinnost 0,92; vrtačka 600 W × 3, kompresor 500 W × 4.
- trvalý **1 100 W**; přírůstky 600 × 2 = 1 200, 500 × 3 = **1 500** → kompresor
- spickaW = 1 100 − 500 + 2 000 = **2 600 W**; proud = 1 100 / 0,92 / 25,6 = **46,705 A**.

**P-D3** shoda přírůstků: 600 × 3 (+1 200) a 400 × 4 (+1 200), 12 V → trvalý 1 000 W, špička 1 000 + 1 200 = **2 200 W** (u obou stejně), proud 86,806 A.

Pravidlo po rozhodnutí Q7 (16. 11. 2026): trvalý = max(součet současných; největší samostatný), špička = max(součet současných + největší přírůstek mezi současnými; největší P × rozběh mezi samostatnými).

**P-D4** 100 W současně + 2 000 W samostatně, 12 V → trvalý max(100; 2 000) = **2 000 W**, špička max(100 + 0; 2 000 × 1) = **2 000 W**, proud 2 000 / 0,9 / 12,8 = **173,61 A** → `NAD_150A`.

**P-D5** jen samostatné 1 500 W × 1 a 700 W × 3 → trvalý max(0; 1 500) = **1 500 W**, špička max(0; 1 500; 2 100) = **2 100 W**, proud **130,208 A**.

**P-D6** současně 1 000 W a lednice 60 W × 5, samostatně kompresor 500 W × 4 → trvalý max(1 060; 500) = **1 060 W**, špička max(1 060 + 240 = 1 300; 2 000) = **2 000 W**, proud 1 060 / 0,9 / 12,8 = **92,014 A**.

**P-D7** jako P-D1 plus samostatně 800 W → trvalý max(1 090; 800) = **1 090 W**, špička max(1 330; 800) = **1 330 W**, proud 94,618 A.

**Hrana `NAD_150A`** (účinnost 1): 1 920 W na 12 V = 150 A → ne; 1 920,01 W → ano; 24 V: 3 840 / 3 840,01 W. Výchozí 0,9: 2 000 W → 173,6 A → ano. 0 W → 0 A, jen `ODKAZ_PRUREZ`.

## E. Booster (`nabitiZJizdy`)

- **P-E1** 12 V, 30 A, 2 h → AhDenne 30 × 2 = **60**, WhDenne 60 × 12,8 = **768**.
- **P-E2** 24 V, 20 A, 0,5 h → **10 Ah**, 10 × 25,6 = **256 Wh**.
- **P-E3** 0 h → 0 Ah, 0 Wh. `LITHIUM_BOOSTER` vždy.

## F. Solár (`zapojeniPanelu`)

**P-F1** panel Voc 23 V, Isc 10,5 A, Vmp 19 V, Imp 9,8 A, 180 Wp, −0,3 %/K; 3S2P; tMin výchozí −20 °C; regulátor 100 V / 30 A.
- korekce = 1 + (−0,3 / 100) × (−20 − 25) = 1 + 0,135 = **1,135**
- VocMraz = 3 × 23 × 1,135 = **78,315 V** ≤ 100 → bez `VOC_NAD_MAX`
- VmpPole 3 × 19 = **57 V**; IscPole 2 × 10,5 = **21 A** ≤ 30; ImpPole 2 × 9,8 = **19,6 A**; WpPole 3 × 2 × 180 = **1 080 Wp**. Hlášky žádné.

**P-F2** panel 45 V / 9 A / 37,5 V / 8,5 A / 320 Wp, −0,28 %/K; 1S3P; tMin 25 °C → korekce 1 → VocMraz **45 V**; Isc 27 A, Imp 25,5 A, Wp 960. paralel 3 → **`POJISTKA_VETVE`**.

**P-F3** panel jako P-F1, 4S1P, regulátor 100 V / 10 A: VocMraz = 4 × 23 × 1,135 = **104,42 V > 100 → `VOC_NAD_MAX`** (blok); IscPole 10,5 A > 10 → **`ISC_NAD_MAX`**; Vmp 76 V, Imp 9,8 A, Wp 720.

Hrany: koeficient 0 → VocMraz = 2 × 22,5 = 45 V přesně: limit 45 V → bez hlášky, 44,99 V → `VOC_NAD_MAX`. IscPole 2 × 5 = 10 A: limit 10 A ne, 9,99 A ano. paralel 2 ne, 3 a 10 ano.

## G. Soběstačnost (`sobestacnost`)

Testová tabulka (vymyšlená, předaná jako `data`): město `testov`, kWh/kWp/den po měsících 0,5 / 0,9 / 1,0 / 2,0 / 3,0 / 4,0 / 5,0 / 4,5 / 3,5 / 2,5 / 1,2 / 0,4; město `jinde` 1,5 ve všech měsících; `vychoziZtraty` 0,8.

`prubeh` má délku `dniSimulace`, `prubeh[d − 1]` = stav v % na konci dne d (Q2); měsíc = `kWhNaKWpDen[mesic − 1]`.

Vzorce: výroba = Wp / 1000 × kWh × 1000 × ztráty × (1 − stínění / 100); booster = A × h × Unom; bilance = výroba + booster − spotřeba; K = Ah × Unom × využitelnost. Den: stav = min(K, stav + bilance); stav ≤ 0 → den vybití, stav 0; přípojka v násobcích dne → na konci dne stav = K.

**P-G1** duben (2,0), 300 Wp, ztráty výchozí 0,8, booster 5 A × 1 h, spotřeba 1 235,2 Wh, 100 Ah 12 V 90 %, přípojka každé 3 dny, 5 dní.
- výroba = 0,3 × 2,0 × 1 000 × 0,8 = **480 Wh**; booster = 5 × 1 × 12,8 = **64 Wh**; bilance = 480 + 64 − 1 235,2 = **−691,2 Wh**; K = 100 × 12,8 × 0,9 = **1 152 Wh** (bilance = −0,6 K).

| Den | stav + bilance | vybití? | přípojka? | stav na konci | % |
|---|---|---|---|---|---|
| 1 | 1 152 − 691,2 = 460,8 | ne | ne | 460,8 | **40** |
| 2 | 460,8 − 691,2 = −230,4 | **ano (první)** | ne | 0 | **0** |
| 3 | 0 − 691,2 | ano | **ano** | 1 152 | **100** |
| 4 | 460,8 | ne | ne | 460,8 | **40** |
| 5 | −230,4 | ano | ne | 0 | **0** |

dnyBezPripojky = 2 − 1 = **1**, vydrzi **false**, hlášky žádné. bilancePoMesicich = 0,3 × kWh × 800 + 64 − 1 235,2 = **240 × kWh − 1 171,2** (leden −1 051,2 … červenec +28,8 … prosinec −1 075,2).

Co pomůže (s přípojkou, doslovně Q11): baterie +100 Ah → K = 2 304: 1 612,8 / 921,6 / 230,4 → přípojka → … nevybije se → null = 6 → **+5**. Panely +100 Wp (+160 Wh → bilance −531,2): 620,8 / 89,6 / vybití 3. den → 2 → **+1**. Booster +10 A (+128 Wh → −563,2): 588,8 / 25,6 / vybití → **+1**. Spotřeba −10 % (1 111,68 → −567,68): 584,32 / 16,64 / vybití → **+1**. Pořadí: baterie, panely, booster, spotřeba (shoda tří → pořadí zadání).

**P-G2** totéž bez přípojky: 40 % / 0 / 0 / 0 / 0, dnyBezPripojky 1. Baterie: 1 612,8 / 921,6 / 230,4 / −460,8 → 3 → **+2**; panely, booster, spotřeba vybijí 3. den (jako výše) → **+1** každá. Pořadí baterie, panely, booster, spotřeba.

**P-G3** červenec (5,0), 400 Wp, stínění 25 %, ztráty 0,9, 200 Ah 24 V 90 %, spotřeba 1 000 Wh, bez jízdy, 5 dní.
- výroba = 0,4 × 5,0 × 1 000 × 0,9 × 0,75 = **1 350 Wh**; bilance **+350 Wh**; K = 200 × 25,6 × 0,9 = **4 608 Wh**
- každý den min(4 608; 4 608 + 350) = 4 608 → **100 %** (ořez na kapacitu); nikdy nevybije → dnyBezPripojky **null**, vydrzi **true**, **`BILANCE_KLADNA`**
- bilancePoMesicich = 0,4 × kWh × 675 − 1 000 = **270 × kWh − 1 000**
- co pomůže: bez jízdy není booster; všechno vydrží → 0 dní navíc, pořadí baterie, panely, spotřeba.

**P-G4 (stav přesně 0)** leden (0,5), 0 Wp, 100 Ah 24 V 100 % → K = **2 560 Wh**, spotřeba 1 280 → bilance −1 280. Den 1: 1 280 (50 %); den 2: 0 přesně → **den vybití** (≤ 0) → dnyBezPripojky **1**; den 3: 0. Hlášky: leden 0,5 < 1 → **`ZIMA_MALO_SLUNCE`**. Co pomůže: baterie K = 5 120 → 3 840 / 2 560 / 1 280 → vydrží 3 dny → null = 4 → **+3**; panely +100 Wp → 0,1 × 0,5 × 800 = 40 Wh → bilance −1 240 → 1 320 / 80 / vybití → 2 → **+1**; spotřeba 1 152 → 1 408 / 256 / vybití → **+1**.

**P-G5 (výchozí hodnoty)** duben, 300 Wp (480 Wh), 100 Ah 12 V, výchozí 90 % (1 152 Wh), spotřeba 580, 30 dní: bilance **−100**; stav = 1 152 − 100 d: den 11 → 52 Wh (4,51 %), den 12 → −48 → vybití → dnyBezPripojky **11**; dny 12–30 na 0 %. Co pomůže: panely +100 Wp → +160 → bilance +60 → vydrží → 31 − 11 = **+20**; spotřeba 522 → bilance −42 → 1 152 − 42 × 27 = 18 > 0, den 28 vybití → 27 → **+16**; baterie 2 304 → 2 304 − 100 × 23 = 4 > 0, den 24 vybití → 23 → **+12**. Pořadí **panely, spotřeba, baterie** (jiné než v zadání).

**P-G6 (shoda uprostřed)** duben, 200 Wp (320 Wh), booster 5 A × 2 h (128 Wh), spotřeba 700, 50 Ah 12 V 90 % (576 Wh), 10 dní: bilance **−252**; 324 (56,25 %), 72 (12,5 %), vybití 3. den → dnyBezPripojky **2**.
- booster +10 A → 15 × 2 × 12,8 = 384 → bilance +4 → vydrží → 11 − 2 = **+9**
- baterie 150 Ah → 1 728 Wh: 1 728 − 252 × 6 = 216 > 0, 7. den vybití → 6 → **+4**
- panely 300 Wp → 480 → bilance −92: 576 − 92 × 6 = 24 > 0, 7. den vybití → 6 → **+4**
- spotřeba 630 → bilance −182: 576 − 182 × 3 = 30 > 0, 4. den vybití → 3 → **+1**
- pořadí **booster, baterie, panely, spotřeba** (baterie před panely jen kvůli pořadí v zadání).

**P-G7 (vybití 1. den)** město `jinde` (1,5), únor, 500 Wp → 0,5 × 1,5 × 800 = **600 Wh**, spotřeba 2 000 → **−1 400**; 50 Ah 12 V 90 % = 576 Wh → hned 1. den ≤ 0 → dnyBezPripojky **0**. Co pomůže: baterie 1 728 → 328 → 2. den vybití → 1 → **+1**; panely (+120 → −1 280) a spotřeba (1 800 → −1 200) vybijí 1. den → **0**.

**Hrany hlášek:** bez panelů, booster 10 A × 1 h × 12,8 = 128 Wh, spotřeba 128 → bilance **0 přesně → `BILANCE_KLADNA`** (≥ 0); spotřeba 128,000001 → ne. `ZIMA_MALO_SLUNCE`: leden 0,5, únor 0,9, prosinec 0,4 ano; březen **1,0 ne** (< 1), listopad 1,2 ne. Prosinec, 100 Wp (32 Wh), booster 10 A × 2 h (256 Wh), spotřeba 200 → bilance +88 → obě hlášky.

**Přípojka předejde vybití:** bez panelů, 100 Ah 12 V (1 152 Wh), spotřeba 500, přípojka každý 2. den: 652 (56,6 %), 152 → přípojka 100 %, 56,6 %, 100 %, 56,6 % → nikdy nevybije, vydrzi **true**.
