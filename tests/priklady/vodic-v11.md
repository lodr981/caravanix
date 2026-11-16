# Ruční příklady: kalkulačka průřezu, verze 1.1 (platná, 16. 11. 2026)

Podle `docs/KALKULACKA_PRUREZU.md`, kapitola „Verze 1.1: co platí“, a `docs/reset/KALKULACKA_V1_1.md`. Výpočet je v1 (`docs/reference/kalkulacka-prurezu-v1.html`) se čtyřmi změnami: pojistka ≥ 1,25 × I, řada pojistek bez 300 A (i v max. pojistce), nad 200 A chyba `HLAVNI_VEDENI`, nad 150 A hláška `NAD_150A_MENIC`. Mezivýsledky jsou zaokrouhlené pro čtení. Přesné hodnoty ověřuje `tests/priklady/vodic-v11.test.ts`: nejdřív proti nezávislé referenci `packages/engine/tests/golden-v11/reference-v11.ts` (kontrola zápisu), potom proti enginu.

## Vzorce a tabulky

- I = P / U (režim příkon), nebo zadaný proud.
- Samostatně (`n`): ρ = 0,0175 Ω·mm²/m, k = 1, strop CAPN. Ve svazku (`h`): ρ = 0,0216, k = 0,7, strop CAPH.
- n = 2 (vlastní mínus), n = 1 (mínus přes kostru). Dovolený úbytek dU = U × úbytek % / 100.
- Areq = ρ × L × n × I / dU.
- **Pojistka** = první z řady 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 125, 150, 175, 200, 225, 250 A, která je **≥ 1,25 × I**. Když žádná není (I > 200 A): chyba `HLAVNI_VEDENI` s proudem.
- maxFuse(a, k) = největší pojistka z řady ≤ min(amp(a) × k, strop(a)). Pro průřezy z `MM`:

| a [mm²] | 0,5 | 0,75 | 1 | 1,5 | 2,5 | 4 | 6 | 10 | 16 | 25 | 35 | 50 | 70 | 95 | 120 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| amp (VDE) [A] | 12 | 15 | 19 | 24 | 32 | 42 | 54 | 73 | 98 | 129 | 158 | 198 | 245 | 292 | 344 |
| CAPN [A] | 7,5 | 10 | 15 | 15 | 20 | 30 | 40 | 60 | 80 | 100 | 125 | 150 | 200 | 250 | 300 |
| CAPH [A] | 7,5 | 10 | 10 | 15 | 20 | 25 | 35 | 50 | 60 | 80 | 100 | 125 | 150 | 200 | 225 |
| maxFuse samostatně [A] | 7,5 | 10 | 15 | 15 | 20 | 30 | 40 | 60 | 80 | 100 | 125 | 150 | 200 | 250 | **250** (v1: 300) |
| maxFuse ve svazku [A] | 7,5 | 10 | 10 | 15 | 20 | 25 | 35 | 50 | 60 | 80 | 100 | 125 | 150 | 200 | 225 |

- Průřez = nejmenší z `MM`, který má a ≥ Areq a zároveň maxFuse(a) ≥ pojistka. Rozhodl úbytek, když index prvního a ≥ Areq je ≥ index prvního a s maxFuse ≥ pojistka; jinak oteplení.
- AWG = první z řady AWG, který splní totéž (plocha ≥ Areq a maxFuse(plocha) ≥ pojistka; maxFuse se interpoluje log-log).
- Úbytek ΔU = ρ × L × n × I / A, v % = ΔU / U × 100, napětí u spotřebiče = U − ΔU, ztráta = ΔU × I, max. délka = dU × A / (ρ × n × I).
- Hlášky v pořadí: rozhodlo; `MINUS_PRES_KOSTRU` (n = 1); `NAD_150A_12V` (I > 150 A a 12 V); `NAD_150A_MENIC` (I > 150 A); `MENIC_OD_1000W` (režim příkon, P ≥ 1 000 W).

## Příklad 1: lednice, kabel vedený samostatně

60 W, 12 V, 5 m, úbytek 3 %, vlastní mínus, samostatně.

1. I = 60 / 12 = **5 A**.
2. dU = 12 × 0,03 = 0,36 V; ρ = 0,0175; n = 2.
3. Areq = 0,0175 × 5 × 2 × 5 / 0,36 = 0,875 / 0,36 = **2,43 mm²** → první a ≥ Areq je 2,5 mm².
4. Pojistka: 1,25 × 5 = 6,25 A → **7,5 A**.
5. maxFuse ≥ 7,5 A má už 0,5 mm². Úbytek (2,5 mm²) je dál než oteplení (0,5 mm²) → **rozhodl úbytek**, průřez **2,5 mm²**, max. pojistka 20 A.
6. AWG: AWG 14 (2,08 mm²) < 2,43 mm²; **AWG 12** (3,31 mm²) vyhoví.
7. ΔU = 0,0175 × 5 × 2 × 5 / 2,5 = **0,35 V** (2,92 %), u spotřebiče **11,65 V**, ztráta 0,35 × 5 = **1,75 W**.
8. Max. délka = 0,36 × 2,5 / (0,0175 × 2 × 5) = 0,9 / 0,175 = **5,14 m**.
9. Hlášky: `ROZHODL_UBYTEK`.

## Příklad 2: měnič, mínus přes kostru

1 200 W, 12 V, 2 m, úbytek 3 %, mínus přes kostru, samostatně.

1. I = 1 200 / 12 = **100 A**.
2. dU = 0,36 V; n = 1.
3. Areq = 0,0175 × 2 × 1 × 100 / 0,36 = **9,72 mm²** → první a ≥ Areq je 10 mm².
4. Pojistka: 1,25 × 100 = 125 A → **125 A**.
5. maxFuse(25) = min(129; 100) = 100 A < 125 A; maxFuse(35) = min(158; 125) = 125 A ✓. Oteplení (35 mm²) je dál než úbytek (10 mm²) → **rozhodlo oteplení**, průřez **35 mm²**, max. pojistka 125 A.
6. AWG: AWG 2 (33,6 mm²) leží pod 35 mm², strop tam vychází pod 125 A → maxFuse 100 A ✗; **AWG 1** (42,4 mm²) mezi 35 a 50 mm² → maxFuse 125 A ✓.
7. ΔU = 0,0175 × 2 × 1 × 100 / 35 = **0,10 V** (0,83 %), u spotřebiče **11,90 V**, ztráta **10 W**.
8. Max. délka = 0,36 × 35 / (0,0175 × 1 × 100) = 12,6 / 1,75 = **7,2 m**.
9. Hlášky: `ROZHODLO_OTEPLENI`, `MINUS_PRES_KOSTRU`, `MENIC_OD_1000W`.

## Příklad 3: ve svazku

20 A, 24 V, 8 m, úbytek 5 %, vlastní mínus, ve svazku (příkon 480 W).

1. I = **20 A**; ρ = 0,0216; k = 0,7; strop CAPH.
2. dU = 24 × 0,05 = 1,2 V; n = 2.
3. Areq = 0,0216 × 8 × 2 × 20 / 1,2 = 6,912 / 1,2 = **5,76 mm²** → první a ≥ Areq je 6 mm².
4. Pojistka: 1,25 × 20 = 25 A → **25 A**.
5. Ve svazku: maxFuse(2,5) = min(32 × 0,7 = 22,4; 20) = 20 A ✗; maxFuse(4) = min(29,4; 25) = 25 A ✓. Úbytek (6 mm²) je dál → **rozhodl úbytek**, průřez **6 mm²**; max. pojistka = min(54 × 0,7 = 37,8; 35) → **35 A**.
6. AWG: AWG 10 (5,26 mm²) < 5,76 mm²; **AWG 8** (8,37 mm²) vyhoví.
7. ΔU = 0,0216 × 8 × 2 × 20 / 6 = **1,152 V** (4,8 %), u spotřebiče **22,848 V**, ztráta 1,152 × 20 = **23,04 W**.
8. Max. délka = 1,2 × 6 / (0,0216 × 2 × 20) = 7,2 / 0,864 = **8,33 m**.
9. Hlášky: `ROZHODL_UBYTEK`.

## Příklad 4: nad 150 A

160 A, 12 V, 1 m, úbytek 10 %, vlastní mínus, samostatně (příkon 1 920 W).

1. I = **160 A**; dU = 1,2 V; n = 2.
2. Areq = 0,0175 × 1 × 2 × 160 / 1,2 = 5,6 / 1,2 = **4,67 mm²** → první a ≥ Areq je 6 mm².
3. Pojistka: 1,25 × 160 = 200 A → **200 A**.
4. maxFuse(50) = min(198; 150) = 150 A ✗; maxFuse(70) = min(245; 200) = 200 A ✓ → **rozhodlo oteplení**, průřez **70 mm²**, max. pojistka 200 A.
5. AWG: AWG 2/0 (67,4 mm²) pod 70 mm² → strop pod 200 A ✗; **AWG 3/0** (85 mm²) mezi 70 a 95 mm² → maxFuse 225 A ✓.
6. ΔU = 0,0175 × 1 × 2 × 160 / 70 = **0,08 V** (0,67 %), u spotřebiče **11,92 V**, ztráta 0,08 × 160 = **12,8 W**.
7. Max. délka = 1,2 × 70 / (0,0175 × 2 × 160) = 84 / 5,6 = **15 m**.
8. Hlášky: `ROZHODLO_OTEPLENI`, `NAD_150A_12V` (160 > 150 a 12 V), `NAD_150A_MENIC` (160 > 150). Na 24 V by vyšlo totéž bez `NAD_150A_12V`.

## Příklad 5: hlavní vedení

205 A, 24 V, 1 m, úbytek 10 %, vlastní mínus, samostatně.

1. I = **205 A**.
2. 1,25 × 205 = 256,25 A. Největší pojistka v řadě je 250 A < 256,25 A → žádná nevyhoví.
3. Výsledek: chyba **`HLAVNI_VEDENI`**, proud **205 A**. Žádné další hlášky (chybový výsledek nese jen svůj kód).
4. Pro srovnání: ve v1 by vyšla pojistka 250 A (1,1 × 205 = 225,5 A) a normální výsledek.

## Příklad 6: co mění 1,25 × I proti v1

9 A, 12 V, 2 m, úbytek 10 %, vlastní mínus, samostatně (příkon 108 W).

1. I = **9 A**; dU = 1,2 V; n = 2.
2. Areq = 0,0175 × 2 × 2 × 9 / 1,2 = 0,63 / 1,2 = **0,525 mm²** → první a ≥ Areq je 0,75 mm².
3. Pojistka: 1,25 × 9 = 11,25 A → **15 A** (ve v1: 1,1 × 9 = 9,9 A → 10 A).
4. maxFuse(0,75) = 10 A ✗; maxFuse(1) = min(19; 15) = 15 A ✓ → **rozhodlo oteplení**, průřez **1 mm²**, max. pojistka 15 A (ve v1: 0,75 mm² s pojistkou 10 A).
5. AWG: AWG 20 (0,52 mm²) < 0,525 mm²; AWG 18 (0,82 mm²) → maxFuse 10 A ✗; **AWG 16** (1,31 mm²) → strop 15 A ✓.
6. ΔU = 0,0175 × 2 × 2 × 9 / 1 = **0,63 V** (5,25 %), u spotřebiče **11,37 V**, ztráta **5,67 W**.
7. Max. délka = 1,2 × 1 / (0,0175 × 2 × 9) = 1,2 / 0,315 = **3,81 m**.
8. Hlášky: `ROZHODLO_OTEPLENI`.

## Příklad 7: hrana meze, přesně 200 A

200 A, 12 V, 0,5 m, úbytek 10 %, vlastní mínus, samostatně (příkon 2 400 W).

1. 1,25 × 200 = 250 A → pojistka **250 A** (≥, ne >; je to ještě v rozsahu).
2. Areq = 0,0175 × 0,5 × 2 × 200 / 1,2 = **2,92 mm²**.
3. maxFuse(70) = 200 A ✗; maxFuse(95) = min(292; 250) = 250 A ✓ → **rozhodlo oteplení**, průřez **95 mm²**, max. pojistka 250 A.
4. AWG: 3/0 (85 mm²) → 225 A ✗; **AWG 4/0** (107 mm²) → 250 A ✓.
5. ΔU = 0,0175 × 0,5 × 2 × 200 / 95 = 3,5 / 95 = **0,0368 V** (0,31 %), u spotřebiče **11,963 V**, ztráta **7,37 W**.
6. Max. délka = 1,2 × 95 / (0,0175 × 2 × 200) = 114 / 7 = **16,29 m**.
7. Hlášky: `ROZHODLO_OTEPLENI`, `NAD_150A_12V`, `NAD_150A_MENIC`. Při 200,01 A by vyšlo `HLAVNI_VEDENI`.
