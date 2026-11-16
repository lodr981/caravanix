# Ruční příklady: kalkulačka průřezu, verze 2

Podle `docs/KALKULACKA_PRUREZU.md`, kapitola „Verze 2: co platí“. Body „bod N“ odkazují na číslovaný seznam v podkapitole „Výpočet“. Mezivýsledky jsou spočítané kódem (nezávislá reference `packages/engine/tests/golden-v2/reference-v2.ts`) a zaokrouhlené pro čtení. Test `tests/priklady/vodic-v2.test.ts` ověřuje přesné hodnoty proti enginu.

Parametry uložení (tabulka „Uložení“):

| Uložení | n | k | ρ [Ω·mm²/m] | strop |
| --- | --- | --- | --- | --- |
| `par` | 2 | 0,8 | 0,0191 | CAPN |
| `kostra` | 1 | 1,0 | 0,0191 | CAPN |
| `svazek` | 2 | 0,53 | 0,0236 | CAPH |
| `motor` | 2 | 0,5 | 0,0236 | CAPH |

`maxFuse(a)` = největší pojistka z řady (bez 300 A) ≤ min(amp(a) × k, interp(strop, a)) + 1e-9 (bod 5). Hodnoty amp() a interp() pro průřezy z `MM` jsou přímo čísla z tabulek `AMP`, `CAPN` a `CAPH` (log-log interpolace v uzlu vrací uzel, až na zaokrouhlení v 15. číslici; proto je v bodu 5 tolerance 1e-9).

## Příklad 1: lednice 60 W, 5 m, plus a mínus vedle sebe (`par`)

Vstup: 12 V, příkon 60 W, délka 5 m, úbytek 3 %, uložení `par`.

1. Vstup je platný (60 > 0, 5 > 0).
2. I = 60 / 12 = **5 A**.
3. dU = 12 × 3 / 100 = 0,36 V. Areq = 0,0191 × 5 × 2 × 5 / 0,36 = **2,6528 mm²**.
4. 1,25 × 5 = 6,25 A → pojistka **7,5 A** (první z řady ≥ 6,25).
5. a 6. Průřezy z `MM` od nejmenšího:
   - 2,5 mm² < Areq, nevyhoví.
   - 4 mm² ≥ Areq; maxFuse(4) = min(42 × 0,8 = 33,6; CAPN 30) = 30 → **30 A ≥ 7,5 A**. Průřez **4 mm²**.
7. iDrop = index 4 mm² (5), iFuse = index 0,5 mm² (0; maxFuse(0,5) = min(9,6; 7,5) → 7,5 A ≥ 7,5 A). 5 ≥ 0 → **rozhodl úbytek**.
8. AWG: 14 (2,08 mm²) < Areq; **AWG 12 (3,31 mm²)** ≥ Areq a maxFuse(3,31) = 25 A ≥ 7,5 A.
9. ΔU = 0,0191 × 5 × 2 × 5 / 4 = **0,23875 V**, tj. 1,9896 %; napětí u spotřebiče 11,76125 V; ztráta 0,23875 × 5 = 1,19375 W; max. pojistka 30 A; příkon 60 W; max. délka = 0,36 × 4 / (0,0191 × 2 × 5) = **7,5393 m**.
10. Hlášky: `ROZHODL_UBYTEK`.

## Příklad 2: měnič 1 200 W, 2 m, mínus přes kostru (`kostra`)

Vstup: 12 V, příkon 1 200 W, délka 2 m, úbytek 3 %, uložení `kostra`.

2. I = 1 200 / 12 = **100 A**.
3. dU = 0,36 V. Areq = 0,0191 × 2 × 1 × 100 / 0,36 = **10,611 mm²**.
4. 1,25 × 100 = 125 A → pojistka **125 A**.
5. a 6. maxFuse pro `kostra` (k = 1, strop CAPN):
   - 16 mm²: min(98; 80) → 80 A < 125 A, nevyhoví.
   - 25 mm²: min(129; 100) → 100 A < 125 A, nevyhoví.
   - 35 mm²: min(158; 125) → **125 A ≥ 125 A**. Průřez **35 mm²**.
7. iDrop = index 16 mm² (8), iFuse = index 35 mm² (10). 8 < 10 → **rozhodlo oteplení**.
8. AWG: 2 (33,6 mm²) má maxFuse 100 A < 125 A; **AWG 1 (42,4 mm²)** má maxFuse 125 A.
9. ΔU = 0,0191 × 2 × 1 × 100 / 35 = **0,10914 V** (0,9095 %); napětí u spotřebiče 11,8909 V; ztráta 10,914 W; max. pojistka 125 A; příkon 1 200 W; max. délka = 0,36 × 35 / (0,0191 × 1 × 100) = **6,5969 m**.
10. Hlášky: `ROZHODLO_OTEPLENI`, `MINUS_PRES_KOSTRU`, `MENIC_OD_1000W` (režim P a 1 200 ≥ 1 000). Proud 100 A není > 150 A, `NAD_150A_12V` ne.

## Příklad 3: 20 A na 24 V, 8 m ve svazku (`svazek`)

Vstup: 24 V, proud 20 A, délka 8 m, úbytek 5 %, uložení `svazek`.

2. I = **20 A** (režim I).
3. dU = 24 × 5 / 100 = 1,2 V. Areq = 0,0236 × 8 × 2 × 20 / 1,2 = **6,2933 mm²**.
4. 1,25 × 20 = 25 A → pojistka **25 A**.
5. a 6. maxFuse pro `svazek` (k = 0,53, strop CAPH):
   - 6 mm²: min(54 × 0,53 = 28,62; 35) → 25 A, ale 6 < Areq, nevyhoví.
   - 10 mm²: min(73 × 0,53 = 38,69; 50) → **35 A ≥ 25 A** a 10 ≥ Areq. Průřez **10 mm²**.
7. iDrop = index 10 mm² (7), iFuse = index 6 mm² (6; 4 mm² má min(22,26; 25) → 20 A). 7 ≥ 6 → **rozhodl úbytek**.
8. AWG: 10 (5,26 mm²) < Areq; **AWG 8 (8,37 mm²)** ≥ Areq a maxFuse = min(34,83; 44,16) → 30 A ≥ 25 A.
9. ΔU = 0,0236 × 8 × 2 × 20 / 10 = **0,7552 V** (3,1467 %); napětí u spotřebiče 23,2448 V; ztráta 15,104 W; max. pojistka 35 A; příkon 20 × 24 = **480 W**; max. délka = 1,2 × 10 / (0,0236 × 2 × 20) = **12,7119 m**.
10. Hlášky: `ROZHODL_UBYTEK`.

## Příklad 4: 40 A, 1,5 m v motorovém prostoru (`motor`)

Vstup: 12 V, proud 40 A, délka 1,5 m, úbytek 10 %, uložení `motor`.

2. I = **40 A**.
3. dU = 12 × 10 / 100 = 1,2 V. Areq = 0,0236 × 1,5 × 2 × 40 / 1,2 = **2,36 mm²**.
4. 1,25 × 40 = 50 A → pojistka **50 A**.
5. a 6. maxFuse pro `motor` (k = 0,5, strop CAPH):
   - 10 mm²: min(36,5; 50) → 35 A.
   - 16 mm²: min(49; 60) → 40 A.
   - 25 mm²: min(64,5; 80) → **60 A ≥ 50 A**. Průřez **25 mm²**.
7. iDrop = index 2,5 mm² (4), iFuse = index 25 mm² (9). 4 < 9 → **rozhodlo oteplení**.
8. AWG: 6 (13,3 mm²) má maxFuse min(43,64; 55,85) → 40 A; **AWG 4 (21,2 mm²)** má min(58,27; 71,93) → 50 A ≥ 50 A.
9. ΔU = 0,0236 × 1,5 × 2 × 40 / 25 = **0,11328 V** (0,944 %); napětí u spotřebiče 11,88672 V; ztráta 4,5312 W; max. pojistka 60 A; příkon 40 × 12 = **480 W**; max. délka = 1,2 × 25 / (0,0236 × 2 × 40) = **15,8898 m**.
10. Hlášky: `ROZHODLO_OTEPLENI`, `MOTOR_VYSSI_TRIDA`.

## Příklad 5: chyby

- **3 000 W na 12 V, `par`:** I = 250 A, 1,25 × 250 = 312,5 A, v řadě bez 300 A taková pojistka není (nejvyšší 250 A) → `HLAVNI_VEDENI`, proud **250 A** (bod 4).
- **160 A na 24 V, 0,2 m, 10 %, `motor`:** Areq = 0,0236 × 0,2 × 2 × 160 / 2,4 = 0,629 mm², ale pojistka 200 A (≥ 1,25 × 160 = 200) a maxFuse(120, motor) = min(344 × 0,5 = 172; 225) → 150 A < 200 A → `ANI_120_NESTACI`, proud **160 A** (bod 6).
- **Příkon 0 W:** `NEPLATNY_VSTUP` (bod 1).
