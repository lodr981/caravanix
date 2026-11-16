# Ruční příklady: kalkulačka průřezu, verze 2 (druhé kolo, 16. 11. 2026)

Podle `docs/KALKULACKA_PRUREZU.md`, kapitola „Verze 2: co platí“. „Bod N“ odkazuje na číslovaný seznam v podkapitole „Výpočet“. Mezivýsledky jsou zaokrouhlené pro čtení. Přesné hodnoty ověřuje test `tests/priklady/vodic-v2.test.ts`: nejdřív proti nezávislé referenci `packages/engine/tests/golden-v2/reference-v2.ts` (kontrola zápisu), potom proti enginu.

## Vstupní tabulky

**Uložení** (tabulka „Uložení“):

| Uložení | n | k | strop |
| --- | --- | --- | --- |
| `par` | 2 | 0,76 | CAPN |
| `kostra` | 1 | 1,0 | CAPN |
| `svazek` | 2 | 0,53 | CAPH |
| `motor` | nepočítá se (bod 2) | | |

**ρ(a)** [Ω·mm²/m] z `packages/data/src/odpor-vodicu.json`:

| a [mm²] | 0,5 | 0,75 | 1 | 1,5 | 2,5 | 4 | 6 | 10 | 16 | 25 | 35 | 50 | 70 | 95 | 120 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ρ | 0,0186 | 0,0185 | 0,0185 | 0,0191 | 0,019 | 0,0188 | 0,0188 | 0,0182 | 0,0186 | 0,0186 | 0,0184 | 0,0184 | 0,0181 | 0,0196 | 0,0193 |

**I30 pojistek** (bod 4: I30 = I20 + (I65 − I20) × 10 / 45, I20 a I65 z `packages/data/src/pojistky.json`):

| Rodina | Jmenovitá [A] → I30 [A] |
| --- | --- |
| ATOF | 1 → 1; 2 → 2; 3 → 3; 5 → 4,778; 7,5 → 6,778; 10 → 9,556; 15 → 13,556; 20 → 17,333; 25 → 22,111; 30 → 26,111 |
| MIDI | 40 → 36,667; 50 → 48,889; 60 → 55,778; 70 → 67,556; 80 → 78,222; 100 → 96,667; 125 → 119,556 |
| MEGA | 150 → 130,333; 175 → 143,667; 200 → 160,222; 225 → 169; 250 → 199,889 |

Mez rozsahu je tedy 199,889 A (MEGA 250 A). Nad ní `HLAVNI_VEDENI`.

**maxFuse(a, uložení)** (bod 6) = největší nabízená hodnota ≤ min(amp(a) × k, interp(strop, a)) + 1e-9. V uzlech `MM` jsou amp() a interp() přímo čísla z `AMP`, `CAPN` a `CAPH`. Například maxFuse(4, par) = min(42 × 0,76 = 31,92; 30) = 30 → **30 A**; maxFuse(120, svazek) = min(344 × 0,53 = 182,32; 225) → **175 A** (200 A je nad 182,32).

## Příklad 1: lednice 60 W, 12 V, 5 m, 3 %, `par` (rodina ATOF)

1. Platný vstup. 2. Uložení se počítá.
3. I = 60 / 12 = **5 A**.
4. a 5. I30(5 A) = 4,778 < 5; I30(7,5 A) = 6,778 ≥ 5 → pojistka **7,5 A ATOF**.
6. a 7. dU = 12 × 3 / 100 = 0,36 V. ΔU(a) = ρ(a) × 5 × 2 × 5 / a:
   - 2,5 mm²: 0,019 × 50 / 2,5 = 0,38 V > 0,36, nevyhoví.
   - 4 mm²: 0,0188 × 50 / 4 = **0,235 V** ≤ 0,36 a maxFuse(4, par) = 30 ≥ 7,5 → průřez **4 mm²**.
8. iDrop = 5 (4 mm²); iFuse = 0 (maxFuse(0,5, par) = min(9,12; 7,5) = 7,5 ≥ 7,5). 5 ≥ 0 → **rozhodl úbytek**.
9. AWG 14 (2,08 mm², ρ = max(ρ(1,5), ρ(2,5)) = 0,0191): ΔU = 0,459 V > 0,36. **AWG 12** (3,31 mm², ρ = max(0,019; 0,0188) = 0,019): ΔU = 0,287 V ≤ 0,36, maxFuse(3,31, par) = 25 A ≥ 7,5.
10. ΔU = 0,235 V (1,958 %), napětí u spotřebiče 11,765 V, ztráta 1,175 W, max. pojistka 30 A, příkon 60 W, max. délka = 0,36 × 4 / (0,0188 × 2 × 5) = **7,660 m**.
11. Hlášky: `ROZHODL_UBYTEK`.

## Příklad 2: měnič 1 200 W, 12 V, 2 m, 3 %, `kostra` (rodina MIDI)

3. I = 1 200 / 12 = **100 A**.
4. a 5. I30(100 A) = 96,667 < 100; I30(125 A) = 119,556 ≥ 100 → **125 A MIDI**.
6. a 7. n = 1, ΔU(a) = ρ(a) × 2 × 1 × 100 / a. Úbytek vyhoví od 16 mm² (10 mm²: 0,364 V > 0,36; 16 mm²: 0,2325 V ≤ 0,36). maxFuse(a, kostra) = min(amp(a), CAPN): 25 mm² → 100 A < 125; **35 mm²** → min(158; 125) = 125 A ≥ 125. Průřez **35 mm²**.
8. iDrop = 8 (16 mm²), iFuse = 10 (35 mm²). 8 < 10 → **rozhodlo oteplení**.
9. AWG 2 (33,6 mm²): maxFuse = 100 A < 125. **AWG 1** (42,4 mm², ρ = max(ρ(35), ρ(50)) = 0,0184): ΔU = 0,0868 V, maxFuse 125 A.
10. ΔU = 0,0184 × 2 × 1 × 100 / 35 = **0,10514 V** (0,876 %), 11,895 V, ztráta 10,514 W, max. pojistka 125 A, příkon 1 200 W, max. délka = 0,36 × 35 / (0,0184 × 1 × 100) = **6,848 m**.
11. Hlášky: `ROZHODLO_OTEPLENI`, `MINUS_PRES_KOSTRU`, `MENIC_OD_1000W` (P ≥ 1 000 W).

## Příklad 3: 20 A, 24 V, 8 m, 5 %, `svazek`

3. I = **20 A** (režim proud).
4. a 5. I30(20 A) = 17,333 < 20; I30(25 A) = 22,111 ≥ 20 → **25 A ATOF**.
6. a 7. dU = 24 × 5 / 100 = 1,2 V. ΔU(a) = ρ(a) × 8 × 2 × 20 / a = ρ(a) × 320 / a:
   - 4 mm²: 0,0188 × 320 / 4 = 1,504 V > 1,2.
   - 6 mm²: 0,0188 × 320 / 6 = **1,0027 V** ≤ 1,2; maxFuse(6, svazek) = min(54 × 0,53 = 28,62; CAPH 35) → **25 A** ≥ 25. Průřez **6 mm²**.
8. iDrop = 6 (6 mm²), iFuse = 6 (4 mm² má maxFuse 20 A). 6 ≥ 6 → **rozhodl úbytek** (shoda indexů).
9. AWG 12 (3,31 mm²): ΔU = 1,837 V. **AWG 10** (5,26 mm², ρ = max(ρ(4), ρ(6)) = 0,0188): ΔU = 1,1437 V ≤ 1,2, maxFuse(5,26, svazek) = 25 A.
10. ΔU = 1,0027 V (4,178 %), 22,997 V, ztráta 20,053 W, max. pojistka 25 A, příkon 20 × 24 = 480 W, max. délka = 1,2 × 6 / (0,0188 × 2 × 20) = **9,574 m**.
11. Hlášky: `ROZHODL_UBYTEK`, `SVAZEK_NEJVYS_3_OBVODY`.

## Příklad 4: 150 A, 12 V, 1 m, 10 %, `par` → 95 mm², rodina MEGA

4. a 5. I30(175 A) = 143,667 < 150; I30(200 A) = 160,222 ≥ 150 → **200 A MEGA**.
6. a 7. dU = 1,2 V. ΔU(6) = 0,0188 × 1 × 2 × 150 / 6 = 0,94 V ≤ 1,2, takže úbytek vyhoví od 6 mm². maxFuse(a, par): 70 mm² → min(245 × 0,76 = 186,2; 200) → 175 A < 200; **95 mm²** → min(292 × 0,76 = 221,92; 250) → **200 A**. Průřez **95 mm²**.
8. iDrop = 6, iFuse = 13 → **rozhodlo oteplení**.
9. AWG 2/0 (67,4 mm²): maxFuse 175 A. **AWG 3/0** (85 mm², mezi 70 a 95 mm², ρ = max(0,0181; 0,0196) = 0,0196): ΔU = 0,0692 V, maxFuse(85, par) = 200 A.
10. ΔU = 0,0196 × 1 × 2 × 150 / 95 = **0,061895 V** (0,516 %), 11,938 V, ztráta 9,284 W, max. pojistka 200 A, příkon 1 800 W, max. délka = 1,2 × 95 / (0,0196 × 2 × 150) = **19,388 m**.
11. Hlášky: `ROZHODLO_OTEPLENI`. `NAD_150A_12V` ne: 150 A není > 150 A.

## Příklad 5: 100 A, 12 V, 10 m, 3 %, `par` → 120 mm², AWG null

4. a 5. → **125 A MIDI** (jako příklad 2).
6. a 7. dU = 0,36 V. ΔU(95) = 0,0196 × 10 × 2 × 100 / 95 = 0,4126 V > 0,36; ΔU(120) = 0,0193 × 2 000 / 120 = **0,32167 V** ≤ 0,36; maxFuse(120, par) = min(344 × 0,76 = 261,44; 300) → **250 A**. Průřez **120 mm²**.
8. iDrop = 14, iFuse = 11 (50 mm², maxFuse 150 A) → **rozhodl úbytek**.
9. Největší AWG 4/0 (107 mm², mezi 95 a 120, ρ = max(0,0196; 0,0193) = 0,0196): ΔU = 0,0196 × 2 000 / 107 = 0,3664 V > 0,36 → **AWG null**.
10. ΔU = 0,32167 V (2,681 %), 11,678 V, ztráta 32,167 W, max. pojistka 250 A, příkon 1 200 W, max. délka = 0,36 × 120 / (0,0193 × 2 × 100) = **11,192 m**.
11. Hlášky: `ROZHODL_UBYTEK`.

## Příklad 6: 5 A, 12 V, 5 m, 3 %, `kostra` → AWG mezi průřezy (bod 9)

4. a 5. → **7,5 A ATOF**.
6. a 7. ΔU(a) = ρ(a) × 5 × 1 × 5 / a: 1 mm² → 0,4625 V > 0,36; **1,5 mm²** → 0,0191 × 25 / 1,5 = 0,31833 V ≤ 0,36; maxFuse(1,5, kostra) = min(24; 15) = **15 A**. Průřez **1,5 mm²**.
8. iDrop = 3, iFuse = 0 → **rozhodl úbytek**.
9. **AWG 16** (1,31 mm², mezi 1 a 1,5 mm²): ρ = **větší** z ρ(1) = 0,0185 a ρ(1,5) = 0,0191, tedy 0,0191. ΔU = 0,0191 × 25 / 1,31 = 0,3645 V > 0,36, **nevyhoví**. (S menším ρ 0,0185 by vyšlo 0,3531 V a AWG 16 by prošel. Proto tento příklad rozliší pravidlo „větší ρ“.) **AWG 14** (2,08 mm², ρ = max(0,0191; 0,019) = 0,0191): ΔU = 0,2296 V, maxFuse 15 A → AWG 14.
10. ΔU = 0,31833 V (2,653 %), 11,682 V, ztráta 1,592 W, max. pojistka 15 A, příkon 60 W, max. délka = 0,36 × 1,5 / (0,0191 × 1 × 5) = **5,654 m**.
11. Hlášky: `ROZHODL_UBYTEK`, `MINUS_PRES_KOSTRU`.

## Příklad 7: 180 A, 12 V, 0,5 m, 10 %, `kostra` → MEGA 250 A, nad 150 A

4. a 5. I30(225 A) = 169 < 180; I30(250 A) = 199,889 ≥ 180 → **250 A MEGA**.
6. a 7. maxFuse(a, kostra) = min(amp(a), CAPN): 70 mm² → 200 A; **95 mm²** → min(292; 250) = **250 A**. Úbytek vyhoví od 1,5 mm². Průřez **95 mm²**.
8. → **rozhodlo oteplení**.
9. AWG 3/0 (85 mm²): maxFuse 225 A < 250. **AWG 4/0** (107 mm²): maxFuse 250 A, ΔU = 0,0165 V.
10. ΔU = 0,0196 × 0,5 × 1 × 180 / 95 = **0,018568 V**, max. délka = 1,2 × 95 / (0,0196 × 1 × 180) = **32,313 m**, příkon 2 160 W.
11. Hlášky: `ROZHODLO_OTEPLENI`, `MINUS_PRES_KOSTRU`, `NAD_150A_12V`.

## Příklad 8: motorový prostor

40 A, 12 V, 1,5 m, 10 %, `motor`. Bod 1 projde, bod 2: **`MOTOR_NEPOCITA`**, bez proudu a bez dalšího výpočtu. (S neplatnou hodnotou, např. 0 A, vyjde `NEPLATNY_VSTUP`, protože bod 1 je první.)

## Příklad 9 a 10: hlavní vedení

- 205 A, 24 V, `par`: žádná nabízená pojistka nemá I30 ≥ 205 (největší 199,889) → **`HLAVNI_VEDENI`**, proud 205 A.
- 3 000 W, 12 V: I = 250 A → **`HLAVNI_VEDENI`**, proud 250 A.

## Příklad 11: ani 120 mm² nestačí kvůli oteplení

150 A, 24 V, 0,2 m, 10 %, `svazek`: pojistka 200 A MEGA (jako příklad 4), ale maxFuse(120, svazek) = 175 A < 200 → **`ANI_120_NESTACI`**, proud 150 A, i když úbytek na 0,2 m vyhoví už od 0,75 mm².

## Příklad 12: neplatný vstup

Příkon 0 W (nebo záporné číslo, NaN): bod 1 → **`NEPLATNY_VSTUP`**, bez proudu.
