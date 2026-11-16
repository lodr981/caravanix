# Zpráva testera

## Souhrn (16. 11. 2026, 21:25)

| Sada | Soubor | Testů | Výsledek |
|---|---|---|---|
| Golden v1 (historie) | `packages/engine/tests/vodic-v1.golden.test.ts` | 153 | **153 prochází** (soubor beze změny) |
| Golden v2 (platná, 2. kolo) | `packages/engine/tests/vodic-v2.golden.test.ts` | 300 | 11 kontrol testu prochází, 289 padá **jen** na „neimplementováno“ |
| Ruční příklady v2 | `tests/priklady/vodic-v2.test.ts` | 24 | 12 kontrol zápisu prochází, 12 testů enginu padá **jen** na „neimplementováno“ |
| **Celkem `npm test`** | 4 soubory | **545** | 244 prochází, 301 padá (všech 301 na `navrhVodice v2 (2. kolo)` / `referencniTabulka v2 (2. kolo): zatím neimplementováno`) |

Spuštění: `npm test` (vše, asi 15 s), nebo jednotlivě:

```
npx vitest run packages/engine/tests/vodic-v1.golden.test.ts
npx vitest run packages/engine/tests/vodic-v2.golden.test.ts tests/priklady/vodic-v2.test.ts
npx vitest run packages/engine/tests/vodic-v2.golden.test.ts -t "kontrola testu"
```

Poslední příkaz spustí jen kontroly samotného testu. `npx tsc --noEmit -p packages/engine` projde bez chyb.

## Golden test kalkulačky průřezu, verze 2 (platná, 2. kolo, 16. 11. 2026)

Reference v2 z prvního kola (ρ 0,0191 / 0,0236, k 0,8, pojistka ≥ 1,25 × I, motor jako počítané uložení) je **nahrazená**. Nová reference odpovídá kapitole „Verze 2: co platí“ po druhém kole a řádkům druhého kola v `docs/ROZHODNUTI.md`.

### Soubory

- `packages/engine/tests/golden-v2/reference-v2.ts`: **nezávislá reference v2**, napsaná jen z textu zadání (body 1–12), každý krok s komentářem „bod N“. Tabulky `MM`, `AMP`, `AWG`, `CAPN`, `CAPH` a funkce `amp()`, `interp()`, `nearestAwg()` jsou opsané z `docs/reference/kalkulacka-prurezu-v1.html`. ρ(a) a pojistky (I20, I65, rodina) čte z `@caravanix/data`. Kód enginu jsem nečetl, z `src/vodic.ts` jsou převzaté jen typy.
- `packages/engine/tests/golden-v2/grid-v2.ts`: mřížka vstupů.
- `packages/engine/tests/golden-v2/porovnani-v2.ts`: porovnání výsledku a řádku tabulky (tolerance 1e-9).
- `packages/engine/tests/vodic-v2.golden.test.ts`: golden test a kontroly testu.
- `tests/priklady/vodic-v2.md` a `tests/priklady/vodic-v2.test.ts`: 12 ručních příkladů s postupem krok za krokem.

Reference je parametrizovaná: n, k a strop pro každé uložení, tabulka ρ, pravidlo pro ρ AWG, seznam pojistek, výpočet dovoleného proudu a prahy hlášek. Platí jen `PARAMETRY_V2`, ostatní sady slouží jako mutanty.

### Co test pokrývá

Kombinace: 12 a 24 V × režim P a I × úbytek 3, 5 a 10 % × uložení `par`, `kostra`, `svazek`, `motor` = **48 kombinací**. Uložení `motor` dává vždy jen chybu `MOTOR_NEPOCITA`. V režimu P se proud převede na příkon (proud × napětí).

| Sada | Obsah (na kombinaci) | Případů celkem |
|---|---|---|
| Mřížka | 149 proudů × 20 délek | 143 040 |
| Hrany pojistek přesně na I30 | I30 každé z 22 pojistek × 20 délek (viz otázka 1) | 21 120 |
| Hrany úbytku ±1e-9 | proudy 1, 5, 10, 20, 50, 100, 150, 199 A × 15 průřezů × délka těsně pod a nad hranou ΔU(a) = dU | 11 520 |
| Hrany úbytku přesně | totéž, délka přesně na hraně (bod 7: ΔU zleva doprava, bez tolerance, závazné) | 5 760 |
| Prahy hlášek | P: 999,99 / 1 000 / 1 000,01 W, 1 799,88 / 1 800 / 1 800,12 W, 3 599,76 / 3 600 / 3 600,24 W; I: 149,99 / 150 / 150,01 A; × 0,2, 1, 5 m | 864 |
| Neplatné vstupy | hodnota, délka, obojí = 0, −0, −1, −0,5, −200, NaN, −∞ (i u `motor`) | 1 008 |
| **Celkem `navrhVodice`** | | **183 312** |
| `referencniTabulka()` | průřez, ρ, AWG, max. pojistka `par` / `kostra` / `svazek`, délka 3 % a 10 % | 14 řádků |

**Proudy (149).**
- 139 hodnot v rozsahu 0,5 A až mez 199,889 A (I30 pojistky 250 A):
  - 53 rovnoměrně rozložených, včetně 149,99 / 150 / 150,01,
  - hrany **každé** z 22 nabízených pojistek: I30 × (1 ± 1e-9) a I30 ± 0,01 A.
- Přesně na I30 je zvláštní sada.
- Nad mezí 10 hodnot (199,9 až 1 000 A, `HLAVNI_VEDENI`).

**Délky (20).** 0,2, 0,3, 0,5, 0,75, 1, 1,5, 2, 3, 4, 5, 6, 8, 10, 12, 15 a 20 m (16 hodnot) a navíc 30, 50, 100 a 200 m pro `ANI_120_NESTACI`.

**Co se porovnává.**
- Přesně: stav, průřez, AWG (označení i plocha, případně `null`), pojistka, rodina pojistky, max. pojistka, co rozhodlo, kódy hlášek a jejich pořadí.
- U `HLAVNI_VEDENI` a `ANI_120_NESTACI` proud (tolerance 1e-9). U `MOTOR_NEPOCITA` test kontroluje, že proud chybí (bod 2: „bez proudu“).
- S tolerancí 1e-9: proud, příkon, úbytek ve V a v %, napětí u spotřebiče, ztráta, max. délka; v tabulce délka 3 % a 10 %. ρ v tabulce přesně.

**Jak často mřížka v referenci zasáhne jednotlivé větve** (jeden případ může mít víc hlášek):

| Výsledek nebo hláška | Případů |
|---|---|
| Stav ok | 111 163 (ATOF 55 208, MIDI 35 659, MEGA 20 296) |
| `ROZHODL_UBYTEK` | 59 456 |
| `ROZHODLO_OTEPLENI` | 51 707 |
| `MINUS_PRES_KOSTRU` | 40 277 |
| `SVAZEK_NEJVYS_3_OBVODY` | 32 529 |
| `MENIC_OD_1000W` | 19 345 |
| `NAD_150A_12V` | 4 336 |
| AWG `null` | 4 898 |
| `MOTOR_NEPOCITA` | 45 576 |
| `ANI_120_NESTACI` | 18 284 (i kvůli oteplení na 0,2 m, např. 150 A ve svazku) |
| `HLAVNI_VEDENI` | 7 281 |
| `NEPLATNY_VSTUP` | 1 008 |

**Kontroly samotného testu.** Je jich 11, nezávisí na enginu a procházejí:
1. Tabulky `MM`, `AMP`, `AWG`, `CAPN` a `CAPH` se shodují se skriptem `kalkulacka-prurezu-v1.html` spuštěným v Node.
2. `amp()`, `interp()` (CAPN i CAPH) a `nearestAwg()` dávají bit po bitu totéž co reference v1, a to na zhruba 800 plochách.
3. **`odpor-vodicu.json`:**
   - 15 položek v pořadí `MM`,
   - `rho` = odporOhmKm × prurez / 1000 na 4 desetinná místa, zaokrouhleno polovinou nahoru a počítáno přesně v celých číslech (1,5 mm²: 0,01905 → 0,0191; 25 mm²: 0,018575 → 0,0186),
   - 95 a 120 mm²: 0,206 Ω/km → 0,0196 a 0,161 Ω/km → 0,0193,
   - každá položka má kartu a soubor `docs/karty/<karta>.md` existuje.
4. **`pojistky.json`:**
   - přesně 22 nabízených hodnot v pořadí ATOF 1–30, MIDI 40–125, MEGA 150–250, každá se správnou rodinou,
   - bez 35 A a 300 A,
   - I20 a I65 jsou kladná čísla, položka má jen pole podle zadání,
   - každá položka má existující kartu.
5. Parametry uložení odpovídají tabulce „Uložení“ (k 0,76 / 1,0 / 0,53, n 2 / 1 / 2, strop CAPN / CAPN / CAPH). I30 sedí s ručním výpočtem (5 A: 43/9; 250 A: 1799/9; 225 A: 169).
6. Mřížka splňuje bod 1 kapitoly Golden test: ≥ 40 proudů do meze, pod, na i nad I30 každé pojistky, ≥ 5 proudů nad mezí, ≥ 15 délek, 48 kombinací.
7. a 8. Ruční případy (viz níže).
9. Mřížka v referenci zasáhne:
   - všech 10 kódů a obě hodnoty „rozhodlo“,
   - všechny tři rodiny a **každou** z 22 pojistek jako doporučenou,
   - každý průřez z `MM` (i 95 a 120 mm²),
   - AWG `null` a `ANI_120_NESTACI` kvůli oteplení.

   Pod I30 a na I30 vyjde pojistka f, nad I30 další (nad 250 A `HLAVNI_VEDENI`).
10. `porovnej` odhalí **podvrženou odchylku v každém poli**: rodinu, pořadí hlášek, chybějící nebo navíc vrácený proud u chyb, odchylku 2e-9. V řádku tabulky odhalí i ρ a klíč `motor` navíc. Odchylku pod 1e-9 toleruje.
11. **Mřížka odhalí každého z 28 mutantů výpočtu:**
    - uložení: `par` s k = 0,8 (1. kolo), `kostra` s k = 0,76, `kostra` s n = 2, `svazek` s k = 0,7 (v1), `svazek` s n = 1, `par` a `kostra` se stropem CAPH;
    - odpor: jedno ρ 0,0191 místo tabulky (1. kolo), nezaokrouhlené ρ, ρ(1,5) zaokrouhlené v double na 0,019, ρ pro 95 a 120 mm² jako pro 70 mm², AWG s **menším** ρ ze sousedů;
    - pojistky: poměr 1,25 místo tabulky (1. kolo), I20, I65 nebo jmenovitá hodnota místo I30, interpolace k 25 °C, 35 A v řadě, nabídnutá MINI 4 A, MAXI 120 A nebo MEGA 300 A (zkratová), chybějící 7,5 A, záměna rodiny u 125 A;
    - pravidla: úbytek ostře „<“, „rozhodlo“ ostře „>“, práh 150 A jako „≥“, práh měniče jako „>“, motor počítaný jako `par`.

    U mutantů s pojistkami navíc (35 A, MINI, MAXI, MEGA 300 A) jsou I20 a I65 vymyšlená čísla, jen pro mutant.

### Co reference vrací (vybrané případy)

| Vstup | Výsledek reference |
|---|---|
| 60 W, 12 V, 5 m, 3 %, `par` | I = 5 A, **4 mm²**, AWG 12, pojistka **7,5 A ATOF**, max. 30 A, úbytek 0,235 V (1,958 %), 11,765 V, ztráta 1,175 W, max. délka 7,660 m; `ROZHODL_UBYTEK` |
| 1 200 W, 12 V, 2 m, 3 %, `kostra` | I = 100 A, **35 mm²**, AWG 1, pojistka **125 A MIDI**, max. 125 A, úbytek 0,1051 V, max. délka 6,848 m; `ROZHODLO_OTEPLENI`, `MINUS_PRES_KOSTRU`, `MENIC_OD_1000W` |
| 20 A, 24 V, 8 m, 5 %, `svazek` | **6 mm²**, AWG 10, pojistka **25 A ATOF**, max. 25 A, úbytek 1,0027 V (4,178 %), příkon 480 W, max. délka 9,574 m, rozhodl úbytek (iDrop = iFuse); `ROZHODL_UBYTEK`, `SVAZEK_NEJVYS_3_OBVODY` |
| 150 A, 12 V, 1 m, 10 %, `par` | **95 mm²**, AWG 3/0, pojistka **200 A MEGA**, max. 200 A, úbytek 0,0619 V, max. délka 19,388 m; `ROZHODLO_OTEPLENI` (150 A není > 150 A) |
| 100 A, 12 V, 10 m, 3 %, `par` | **120 mm²**, AWG `null`, pojistka 125 A MIDI, max. 250 A, úbytek 0,3217 V; `ROZHODL_UBYTEK` |
| 5 A, 12 V, 5 m, 3 %, `kostra` | **1,5 mm²**, AWG **14** (AWG 16 s větším ρ 0,0191 nevyhoví: 0,3645 V > 0,36 V), pojistka 7,5 A, max. 15 A |
| 180 A, 12 V, 0,5 m, 10 %, `kostra` | **95 mm²**, AWG 4/0, pojistka **250 A MEGA**; `ROZHODLO_OTEPLENI`, `MINUS_PRES_KOSTRU`, `NAD_150A_12V` |
| 205 A, 24 V (počítané uložení) | `HLAVNI_VEDENI`, proud 205 A (mez 199,889 A) |
| 150 A, 24 V, 0,2 m, 10 %, `svazek` | `ANI_120_NESTACI`, proud 150 A (pojistka 200 A, ale maxFuse(120, svazek) = 175 A) |
| `motor` (např. 40 A, 12 V) | `MOTOR_NEPOCITA`, bez proudu |

**Referenční tabulka v2:**

| Průřez [mm²] | ρ | AWG | Max. pojistka par / kostra / svazek [A] | Délka 3 % | Délka 10 % |
|---|---|---|---|---|---|
| 0,5 | 0,0186 | 20 | 7,5 / 7,5 / 5 | 0,645 m | 2,151 m |
| 0,75 | 0,0185 | 18 | 10 / 10 / 7,5 | 0,730 m | 2,432 m |
| 1 | 0,0185 | 18 | 10 / 15 / 10 | 0,973 m | 3,243 m |
| 1,5 | 0,0191 | 16 | 15 / 15 / 10 | 0,942 m | 3,141 m |
| 2,5 | 0,019 | 14 | 20 / 20 / 15 | 1,184 m | 3,947 m |
| 4 | 0,0188 | 12 | 30 / 30 / 20 | 1,277 m | 4,255 m |
| 6 | 0,0188 | 10 | 40 / 40 / 25 | 1,436 m | 4,787 m |
| 10 | 0,0182 | 8 | 50 / 60 / 30 | 1,978 m | 6,593 m |
| 16 | 0,0186 | 6 | 70 / 80 / 50 | 2,212 m | 7,373 m |
| 25 | 0,0186 | 4 | 80 / 100 / 60 | 3,024 m | 10,081 m |
| 35 | 0,0184 | 2 | 100 / 125 / 80 | 3,424 m | 11,413 m |
| 50 | 0,0184 | 1/0 | 150 / 150 / 100 | 3,261 m | 10,870 m |
| 70 | 0,0181 | 2/0 | 175 / 200 / 125 | 3,978 m | 13,260 m |
| 95 | 0,0196 | 3/0 | 200 / 250 / 150 | 4,362 m | 14,541 m |

### Výsledek (16. 11. 2026, 21:25)

- 11 kontrol testu a 12 kontrol zápisu ručních příkladů **prochází**.
- **Padá jen kvůli neimplementovanému enginu:**
  - 288 testů `navrhVodice` (48 kombinací × 6 sad),
  - 1 test `referencniTabulka`,
  - 12 ručních příkladů proti enginu.

  Všechny končí na `Error: navrhVodice v2 (2. kolo): zatím neimplementováno` nebo `referencniTabulka v2 (2. kolo): zatím neimplementováno`. Ověřeno seskupením chybových zpráv z JSON reportu Vitestu, jiná chyba se nevyskytuje.
- Golden v1 dál prochází (153 / 153).
- Až bude engine v2 hotový, test vypíše prvních 15 rozdílů v každé sadě.

### Otázky pro Radka (v2, 2. kolo)

Test všude drží doslovný výklad zadání. Kde na výkladu záleží, je v kódu komentář „DOSLOVNÝ VÝKLAD“.

1. **Pořadí operací v bodu 4 (I30).** Reference počítá I20 + ((I65 − I20) × 10) / 45 zleva doprava. Jiný zápis (např. × (10/45) nebo / 4,5) se může lišit o 1 ulp a proud přesně rovný I30 pak dá jinou pojistku. Tyto případy jsou proto ve zvláštní sadě „hrany pojistek přesně na I30“. Sady ±1e-9 na pořadí nezávisí. U úbytku zadání pořadí určuje (bod 7), u I30 ne. Je pořadí v bodu 4 závazné, nebo má test přesné hrany I30 vypustit?
2. **Neplatný vstup v motorovém prostoru.** Bod 1 je před bodem 2, takže např. 0 A v uložení `motor` dá `NEPLATNY_VSTUP`, ne `MOTOR_NEPOCITA`. Platí to?
3. **Hlášky u chyb.** Test chápe bod 11 tak, že hlášky patří jen k výsledku ok a chyba má v `hlasky` jen svůj kód. `HLAVNI_VEDENI` ve svazku je tedy bez `SVAZEK_NEJVYS_3_OBVODY` a 3 000 W bez `MENIC_OD_1000W`. Platí to?
4. **Strop CAPH ve svazku nic nemění.** S k = 0,53 je amp(a) × k na všech plochách z `MM` i `AWG` pod stropem CAPH, nebo vede na stejnou pojistku. Záměna CAPH za CAPN u svazku nezmění v mřížce žádný výsledek (ověřeno, 0 rozdílů), takže ji test nemůže odhalit. Výpočet tím není špatně, jen strop ve svazku ve v2 nehraje roli. Je to záměr?
5. **Pořadí `SVAZEK_NEJVYS_3_OBVODY` a `NAD_150A_12V` nejde ověřit.** Ve svazku vychází při I > 150 A vždy `ANI_120_NESTACI`: pojistka je aspoň 200 A, ale maxFuse(120, svazek) = 175 A. Obě hlášky tedy nikdy nejsou zároveň. Jen pro informaci.
6. **ρ(a) = pole `rho` (zaokrouhlené).** Reference bere ρ(a) z pole `rho`, ne odporOhmKm × a / 1000. Mutant s nezaokrouhleným ρ test odhalí. Je to správný výklad?
7. **Proud u `NEPLATNY_VSTUP`.** Zadání to neurčuje a typ proud nepožaduje, takže ho test u této chyby nekontroluje. U `MOTOR_NEPOCITA` test podle bodu 2 („bez proudu“) vyžaduje, aby proud chyběl.
8. **Nekonečno.** Podmínka `!(v > 0) || !(L > 0)` propustí +∞: příkon ∞ dá `HLAVNI_VEDENI` s proudem ∞, délka ∞ dá `ANI_120_NESTACI`. V mřížce to není, stejně jako ve v1. Navrhuji řešit v UI.


## Golden test kalkulačky průřezu, verze 1 (historie, 16. 11. 2026)

Testuje `v1` z `@caravanix/engine` (`packages/engine/src/vodic-v1.ts`) proti `docs/reference/kalkulacka-prurezu-v1.html`. V 19:45 přesměrován z `vodic.ts` na `v1` a přejmenován (`vodic.golden.test.ts` → `vodic-v1.golden.test.ts`, `golden/` → `golden-v1/`); jinak beze změny.

### Soubory

- `packages/engine/tests/vodic-v1.golden.test.ts`: samotný test.
- `packages/engine/tests/golden-v1/reference.ts`: spouští referenci `docs/reference/kalkulacka-prurezu-v1.html` v Node.
- `packages/engine/tests/golden-v1/grid.ts`: mřížka vstupů.
- `packages/engine/tests/golden-v1/porovnani.ts`: porovnání výsledku enginu s referencí (tolerance 1e-9).

### Jak se reference spouští

1. Z HTML se programově vytáhne jediný `<script>` a spustí se **beze změny** v `node:vm` s podvrženým `document`. Podvrh obsahuje jen prvky, které skript volá: `getElementById` pro přepínače, `val`, `len`, `valLbl`, `out` a `querySelector("#tab tbody")`.
2. Po načtení se v kontextu nahradí jen funkce `fmt`, která formátuje čísla pro zobrazení. Nová verze vrací číslo v plné přesnosti ve značce `⟨…⟩`. Funkce `calc()`, `amp()`, `interp()`, `maxFuse()`, `nearestAwg()` ani tabulky se nemění.
3. Pro každý vstup se nastaví `st` (U, mode, drop, ret, env) a hodnoty polí `val` a `len` (`String(číslo)`) a zavolá se původní `calc()`. Z vráceného HTML se přečte:
   - stav,
   - průřez, AWG (označení i plocha), pojistka,
   - řádky „det“: proud, příkon (jen v režimu I), úbytek ve V a v %, napětí u spotřebiče, ztráta a max. pojistka,
   - max. délka z hlášky „ok“,
   - hlášky v pořadí podle pořadí v HTML.
4. Tabulka: původní blok `(function(){…})();` se vytáhne ze skriptu a spustí znovu, už s přesnou `fmt`.

Mapování hlášek reference na `KodHlasky` (podle textu a podmínky v `calc()`):

| Text reference začíná | Podmínka v referenci | Kód |
|---|---|---|
| „Zadejte kladné číslo…“ | `!(v>0)\|\|!(L>0)` | `NEPLATNY_VSTUP` |
| „Proud … je mimo rozsah…“ | `!fuse` | `MIMO_ROZSAH` |
| „Ani 120 mm² nestačí.“ | `idx<0` | `ANI_120_NESTACI` |
| „Rozhodl úbytek napětí…“ | `iDrop>=iFuse` | `ROZHODL_UBYTEK` (a `rozhodlo: "ubytek"`) |
| „Rozhodlo oteplení…“ | jinak | `ROZHODLO_OTEPLENI` (a `rozhodlo: "oteplen"`) |
| „Počítáno s mínusem přes kostru…“ | `st.ret===1` | `MINUS_PRES_KOSTRU` |
| „Přes 150 A na 12 V…“ | `I>150 && U===12` | `NAD_150A_12V` |
| „Měnič: počítejte…“ | `mode==="P" && v>=1000` | `MENIC_OD_1000W` |

Neznámý text hlášky shodí test, takže změna reference se nepřehlédne.

### Co test pokrývá

Kombinace přepínačů: 12 a 24 V × režim P a I × úbytek 3, 5 a 10 % × zpětný vodič 1 a 2 × prostředí n a h, celkem **48 kombinací**. V režimu P se proud převede na příkon (proud × napětí).

| Sada | Obsah | Případů |
|---|---|---|
| Mřížka | 175 proudů × 18 délek na kombinaci | 151 200 |
| Hrany úbytku | proudy 1, 5, 10, 20, 50, 100 a 200 A × 15 průřezů z `MM` × 3 délky (pod, na a nad hranou) na kombinaci | 15 120 |
| Neplatné vstupy | hodnota nebo délka je 0, −0, −1, −0,5, −240 nebo NaN, zvlášť i obojí, na kombinaci | 864 |
| **Celkem `navrhVodice`** | | **167 184** |
| `referencniTabulka()` | řádek po řádku | 14 řádků |

**Proudy.** 164 hodnot v rozsahu 0,5–240 A:
- rovnoměrně rozložené hodnoty,
- práh 150 A (149,99, 150 a 150,01),
- strop svazku 120 mm² (204,5 a 204,55),
- hrany **každé** pojistky z `FUSES`: f/1,1 × (1 − 1e-9), f/1,1, f/1,1 × (1 + 1e-9) a f/1,1 ± 0,01 A.

Navíc 272,7 až 1 000 A pro `MIMO_ROZSAH`.

**Délky.** 0,2, 0,3, 0,5, 0,75, 1, 1,5, 2, 3, 4, 5, 6, 8, 10, 12, 15 a 20 m (16 hodnot) a navíc 30 a 50 m pro `ANI_120_NESTACI`.

**Hrany úbytku.** Délka, při které je požadovaný průřez `Areq` přesně roven průřezu z `MM`, a délky o 1e-9 relativně pod a nad ní.

**Co se porovnává.**
- Přesně: stav, průřez, AWG (označení i plocha, případně `null`), pojistka, max. pojistka, co rozhodlo a kódy hlášek včetně pořadí.
- S absolutní tolerancí 1e-9: proud, příkon, úbytek ve V a v %, napětí u spotřebiče, ztráta a max. délka.
- U `MIMO_ROZSAH` také proud.

**Jak často mřížka v referenci zasáhne jednotlivé větve** (počty případů; jeden případ může mít víc hlášek):

| Výsledek nebo hláška | Případů |
|---|---|
| Stav ok | 146 610 |
| `ROZHODL_UBYTEK` | 76 387 |
| `ROZHODLO_OTEPLENI` | 70 223 |
| `MINUS_PRES_KOSTRU` | 74 692 |
| `MENIC_OD_1000W` | 27 005 |
| `NAD_150A_12V` | 10 540 |
| AWG `null` | 8 326 |
| `ANI_120_NESTACI` | 13 662 |
| `MIMO_ROZSAH` | 6 048 |
| `NEPLATNY_VSTUP` | 864 |

**Kontroly samotného testu.** Tyto kontroly nezávisí na enginu a musí procházet vždy:
- Kopie `FUSES` v mřížce odpovídá referenci. Mřížka má ≥ 40 proudů a ≥ 15 délek.
- Ručně ověřené případy (viz níže).
- Mřížka v referenci zasáhne všech 8 kódů, obě hodnoty „rozhodlo“ i AWG `null`.
- Pod hranou každé pojistky vyjde právě ta pojistka a nad hranou vyšší.
- Tabulka přečtená s přesnou `fmt` po zpětném naformátování původní `fmt` (cs-CZ) dá znak po znaku stejné HTML, jaké reference vykreslí při načtení.
- Funkce `porovnej` odhalí odchylku v každém poli (včetně pořadí hlášek a odchylky 2e-9) a odchylku pod 1e-9 toleruje.

### Ručně ověřené případy (co reference skutečně vrací)

**120 W, 12 V, 4 m, 3 %, vlastní mínus, kabel samostatně.** Reference vrací **4 mm²**, ne 2,5 mm².

Ruční výpočet:
- I = 120 / 12 = 10 A
- ΔU = 12 × 0,03 = 0,36 V
- Areq = 0,0175 × (4 × 2) × 10 / 0,36 = **3,89 mm²**, takže nejmenší vyhovující průřez z `MM` je 4 mm².

Výsledek reference:
- AWG 10 (5,26 mm²): AWG 12 má jen 3,31 mm², méně než Areq.
- Pojistka 15 A (nejbližší ≥ 11 A), max. pojistka pro 4 mm² je 30 A.
- Úbytek 0,35 V (2,9 %), napětí u spotřebiče 11,65 V, ztráta 3,5 W.
- Max. délka 0,36 × 4 / (0,0175 × 2 × 10) = 4,11 m.
- Hláška: „Rozhodl úbytek napětí“.

Tak to vidí i uživatel v původním zobrazení: „4 mm²“, „nebo AWG 10 (5,26 mm²)“, „15 A“, „0,35 V (2,9 %)“, „4,1 m“.

**Další případy:**
- **1 200 W, 12 V, 2 m, 3 %, mínus přes kostru:** 35 mm², pojistka 125 A, max. 125 A. Rozhodlo oteplení. Hlášky v pořadí: oteplení, kostra, měnič.
- **Proud 300 A:** `MIMO_ROZSAH`, proud 300.
- **Proud 220 A ve svazku:** `ANI_120_NESTACI`, protože max. pojistka pro 120 mm² ve svazku je 225 A < 250 A.
- **Hodnota nebo délka 0, −1 nebo NaN:** `NEPLATNY_VSTUP`.

### Jak spustit

```
npx vitest run packages/engine/tests/vodic-v1.golden.test.ts
```

Celá sada testů se spustí příkazem `npm test`. Golden test trvá asi 15 s.

### Výsledek (16. 11. 2026, 18:35; po přesměrování na `v1` znovu 19:51: stejně, 153 / 153)

**Všech 153 testů prochází** (`Test Files 1 passed, Tests 153 passed`):
- 8 kontrol samotného testu,
- 48 × 3 testy `navrhVodice` (mřížka, hrany úbytku, neplatné vstupy),
- 1 test `referencniTabulka`.

Engine se na celé mřížce (167 184 případů) i v tabulce (14 řádků) shoduje s referencí.

Na začátku práce engine vyhazoval „neimplementováno“. Hlavní vlákno ho během psaní testu implementovalo (`vodic.ts` změněn v 18:27), takže stav „padá jen kvůli neimplementováno“ už nešlo ověřit proti enginu. Že test opravdu odhalí chyby, dokládá kontrola „porovnání odhalí odchylku v každém poli“. Implementaci enginu jsem nečetl, test je napsaný jen podle zadání, typů a reference.

`npx tsc --noEmit -p packages/engine` hlásí jen chybějící typy pro `node:fs`, `node:url` a `node:vm` (TS2307), protože v repu není `@types/node`. Vitest tím ovlivněn není.

### Otázky pro Radka (v1)

1. **Kódy „rozhodlo“ v hláškách.** První zelená hláška reference („Rozhodl úbytek…“ / „Rozhodlo oteplení…“, spolu s max. délkou) je v testu v `hlasky` jako první kód `ROZHODL_UBYTEK` / `ROZHODLO_OTEPLENI` a zároveň v poli `rozhodlo`. Tak to vyplývá z `KodHlasky` a z komentáře „v pořadí, v jakém je ukazuje reference“. Souhlasí to?
2. **Proud u `ANI_120_NESTACI`.** Reference proud nezobrazuje, a test ho proto u této chyby neporovnává. Engine ho může, ale nemusí vracet. Porovnává se jen u `MIMO_ROZSAH`, kde ho reference ukazuje.
3. **Příkon v režimu P.** Reference příkon v režimu P nezobrazuje. Test podle dokumentace typu čeká zadanou hodnotu.
4. **Nekonečno a obří čísla.** Reference vstup „Infinity“ bere jako kladné číslo: proud ∞ dá `MIMO_ROZSAH`, délka ∞ dá `ANI_120_NESTACI`. Komentář u `NEPLATNY_VSTUP` („není kladné číslo“) by mohl svádět k jinému chování. V mřížce to není. Má se to testovat a jak? Navrhuji řešit hlavně v UI, kde vstup jde přes `num()`.
5. **Typy pro Node.** Pro čistý `tsc` nad testy chybí `@types/node` (dev závislost s licencí MIT). Nic jsem neinstaloval, protože `npm install` souběžně běží u jiného agenta.
