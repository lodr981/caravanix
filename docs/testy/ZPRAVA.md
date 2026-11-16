# Zpráva testera

## Souhrn (16. 11. 2026, 19:51)

| Sada | Soubor | Testů | Výsledek |
|---|---|---|---|
| Golden v1 (historie) | `packages/engine/tests/vodic-v1.golden.test.ts` | 153 | **153 prochází** |
| Golden v2 (platná) | `packages/engine/tests/vodic-v2.golden.test.ts` | 250 | 9 kontrol testu prochází, 241 padá **jen** na „neimplementováno“ |
| Ruční příklady v2 | `tests/priklady/vodic-v2.test.ts` | 14 | 7 kontrol zápisu prochází, 7 testů enginu padá **jen** na „neimplementováno“ |
| **Celkem `npm test`** | | **417** | 169 prochází, 248 padá (všech 248 na `navrhVodice v2` / `referencniTabulka v2: zatím neimplementováno`) |

Spuštění: `npm test` (vše, asi 17 s), nebo jednotlivě:

```
npx vitest run packages/engine/tests/vodic-v1.golden.test.ts
npx vitest run packages/engine/tests/vodic-v2.golden.test.ts tests/priklady/vodic-v2.test.ts
```

## Golden test kalkulačky průřezu, verze 2 (platná, 16. 11. 2026)

### Soubory

- `packages/engine/tests/golden-v2/reference-v2.ts`: **nezávislá reference v2**, napsaná jen z textu `docs/KALKULACKA_PRUREZU.md` („Verze 2: co platí“). Každý krok má komentář s číslem bodu zadání. Tabulky `MM`, `AMP`, `AWG`, `CAPN`, `CAPH`, `FUSES` a funkce `amp()`, `interp()`, `nearestAwg()` jsou opsané z `docs/reference/kalkulacka-prurezu-v1.html`. Kód enginu v1 ani v2 jsem nečetl, z `src/vodic.ts` jsou převzaté jen typy.
- `packages/engine/tests/golden-v2/grid-v2.ts`: mřížka vstupů.
- `packages/engine/tests/golden-v2/porovnani-v2.ts`: porovnání výsledku a řádku tabulky (tolerance 1e-9).
- `packages/engine/tests/vodic-v2.golden.test.ts`: golden test.
- `tests/priklady/vodic-v2.md` a `tests/priklady/vodic-v2.test.ts`: ruční příklady s postupem krok za krokem, ověřené proti enginu.

Reference je parametrizovaná (ρ, n, k a strop pro každé uložení, faktor 1,25, řada pojistek, prahy hlášek). Platí jen `PARAMETRY_V2`, ostatní sady parametrů slouží ke kontrole, že mřížka odhalí podvrženou chybu.

### Co test pokrývá

Kombinace: 12 a 24 V × režim P a I × úbytek 3, 5 a 10 % × uložení `par`, `kostra`, `svazek`, `motor` = **48 kombinací**. V režimu P se proud převede na příkon (proud × napětí).

| Sada | Obsah (na kombinaci) | Případů celkem |
|---|---|---|
| Mřížka | 155 proudů × 19 délek | 141 360 |
| Hrany úbytku ±1e-9 | proudy 1, 5, 10, 20, 50, 100, 150, 200 A × 15 průřezů z `MM` × délka těsně pod a nad hranou Areq = průřez | 11 520 |
| Hrany úbytku přesně | totéž, délka přesně na hraně (viz otázka 1) | 5 760 |
| Prahy hlášek | režim P: 999,99 / 1 000 / 1 000,01 W a 150 A na 12 i 24 V (1 799,88 až 3 600,24 W); režim I: 149,99 / 150 / 150,01 A; × délky 0,2, 1 a 5 m | 864 |
| Neplatné vstupy | hodnota, délka, obojí = 0, −0, −1, −0,5, −200, NaN, −∞ | 1 008 |
| **Celkem `navrhVodice`** | | **160 512** |
| `referencniTabulka()` | 14 řádků, řádek po řádku (průřez, AWG, max. pojistka pro 4 uložení, délka 3 % a 10 %) | 14 řádků |

**Proudy (155).** 146 hodnot v rozsahu 0,5–200 A: 48 rovnoměrně rozložených (včetně 149,99 / 150 / 150,01 a 199,99 / 200) a hrany **každé** z 22 pojistek (řada bez 300 A): f/1,25 × (1 − 1e-9), f/1,25, f/1,25 × (1 + 1e-9), f/1,25 ± 0,01. Nad mezí rozsahu 200,01, 201, 210, 225, 240, 250, 300 a 1 000 A (`HLAVNI_VEDENI`).

**Délky (19).** 0,2, 0,3, 0,5, 0,75, 1, 1,5, 2, 3, 4, 5, 6, 8, 10, 12, 15 a 20 m (16 hodnot) a navíc 30, 50 a 100 m pro `ANI_120_NESTACI`.

**Co se porovnává.**
- Přesně: stav, průřez, AWG (označení i plocha, případně `null`), pojistka, max. pojistka, co rozhodlo, kódy hlášek a jejich pořadí.
- U `HLAVNI_VEDENI` a `ANI_120_NESTACI` i proud (tolerance 1e-9).
- S tolerancí 1e-9: proud, příkon, úbytek ve V a v %, napětí u spotřebiče, ztráta, max. délka; v tabulce délka 3 % a 10 %.

**Jak často mřížka v referenci zasáhne jednotlivé větve** (jeden případ může mít víc hlášek):

| Výsledek nebo hláška | Případů |
|---|---|
| Stav ok | 129 896 |
| `ROZHODL_UBYTEK` | 69 255 |
| `ROZHODLO_OTEPLENI` | 60 641 |
| `MINUS_PRES_KOSTRU` | 36 409 |
| `MOTOR_VYSSI_TRIDA` | 28 625 |
| `MENIC_OD_1000W` | 18 524 |
| `NAD_150A_12V` | 3 488 |
| AWG `null` | 2 690 |
| `ANI_120_NESTACI` | 21 292 (i kvůli oteplení na 0,2 m, např. 160 A v motorovém prostoru) |
| `HLAVNI_VEDENI` | 8 316 |
| `NEPLATNY_VSTUP` | 1 008 |

**Kontroly samotného testu.** Nezávisí na enginu a procházejí:
1. Tabulky reference v2 se shodují s tabulkami skriptu `kalkulacka-prurezu-v1.html` spuštěného v Node. `FUSES` v2 = `FUSES` v1 bez 300 A.
2. `amp()`, `interp()` (CAPN i CAPH) a `nearestAwg()` dávají bit po bitu totéž co funkce reference v1, a to na zhruba 800 plochách 0,05–150 mm².
3. Parametry uložení odpovídají tabulce „Uložení“ v zadání, faktor je 1,25.
4. Mřížka splňuje bod 1 kapitoly Golden test (≥ 40 proudů, hrany všech pojistek, proudy nad mezí, ≥ 15 délek, 48 kombinací).
5. a 6. Ruční případy (viz níže).
7. Mřížka zasáhne všech 9 kódů, obě hodnoty „rozhodlo“, AWG `null` a výsledek ok v každém uložení. Pod hranou f/1,25 i na ní vyjde pojistka f, nad hranou další (nad 250/1,25 `HLAVNI_VEDENI`).
8. `porovnej` odhalí **podvrženou odchylku v každém poli** výsledku (včetně pořadí hlášek, chybějícího proudu u chyby a odchylky 2e-9) i řádku tabulky. Odchylku pod 1e-9 toleruje.
9. **Mřížka odhalí podvrženou chybu výpočtu.** Zkoušeno 14 mutantů reference:
   - ρ 0,0175 a 0,0216 z v1, svazek s ρ 0,0191,
   - faktor 1,1, řada s 300 A,
   - k pro `par` = 1, `kostra` s n = 2 a s k = 0,8, svazek s k = 0,7, motor s k = 0,53,
   - `par` a `kostra` se stropem CAPH,
   - práh 150 A jako ≥, práh měniče > 1 000 W.

   Každý z nich dá v mřížce aspoň jeden rozdíl.

### Ruční příklady (postup v `tests/priklady/vodic-v2.md`)

Co reference v2 vrací (spočítáno kódem, zaokrouhleno):

| Vstup | Výsledek |
|---|---|
| 60 W, 12 V, 5 m, 3 %, `par` | I = 5 A, Areq = 2,653 mm² → **4 mm²**, AWG 12, pojistka **7,5 A**, max. 30 A, úbytek 0,239 V (1,99 %), max. délka 7,54 m, rozhodl úbytek |
| 1 200 W, 12 V, 2 m, 3 %, `kostra` | I = 100 A, Areq = 10,61 mm² → **35 mm²**, AWG 1, pojistka **125 A**, max. 125 A, úbytek 0,109 V, max. délka 6,60 m; hlášky oteplení, kostra, měnič |
| 20 A, 24 V, 8 m, 5 %, `svazek` | Areq = 6,293 mm² → **10 mm²**, AWG 8, pojistka **25 A**, max. 35 A, úbytek 0,755 V (3,15 %), příkon 480 W, max. délka 12,71 m, rozhodl úbytek |
| 40 A, 12 V, 1,5 m, 10 %, `motor` | Areq = 2,36 mm² → **25 mm²**, AWG 4, pojistka **50 A**, max. 60 A, úbytek 0,113 V, max. délka 15,89 m; hlášky oteplení, motor |
| 3 000 W, 12 V, `par` | `HLAVNI_VEDENI`, proud 250 A |
| 160 A, 24 V, 0,2 m, 10 %, `motor` | `ANI_120_NESTACI`, proud 160 A (pojistka 200 A, ale maxFuse(120, motor) = 150 A) |
| 200 A, 24 V, `kostra` | ještě ok, pojistka 250 A (mez rozsahu) |

**Referenční tabulka v2**, max. pojistka pro `par` / `kostra` / `svazek` / `motor` [A]:

| Průřez | Max. pojistka | | Průřez | Max. pojistka |
|---|---|---|---|---|
| 0,5 mm² | 7,5 / 7,5 / 5 / 5 | | 10 mm² | 50 / 60 / 35 / 35 |
| 0,75 mm² | 10 / 10 / 7,5 / 7,5 | | 16 mm² | 70 / 80 / 50 / 40 |
| 1 mm² | 15 / 15 / 10 / 7,5 | | 25 mm² | 100 / 100 / 60 / 60 |
| 1,5 mm² | 15 / 15 / 10 / 10 | | 35 mm² | 125 / 125 / 80 / 70 |
| 2,5 mm² | 20 / 20 / 15 / 15 | | 50 mm² | 150 / 150 / 100 / 80 |
| 4 mm² | 30 / 30 / 20 / 20 | | 70 mm² | 175 / 200 / 125 / 100 |
| 6 mm² | 40 / 40 / 25 / 25 | | 95 mm² | 225 / 250 / 150 / 125 |

AWG se určuje podle logaritmu plochy, například 4 mm² → AWG 12, 50 mm² → AWG 1/0.

### Výsledek (16. 11. 2026, 19:51)

- 9 kontrol testu a 7 kontrol zápisu ručních příkladů **prochází**.
- **Padá jen kvůli neimplementovanému enginu:** 240 testů `navrhVodice` (48 kombinací × 5 sad), 1 test `referencniTabulka` a 7 ručních příkladů proti enginu. Všechny končí na `Error: navrhVodice v2: zatím neimplementováno` nebo `referencniTabulka v2: zatím neimplementováno`. Ověřeno seskupením chybových zpráv z JSON reportu Vitestu, jiná chyba se nevyskytuje.
- Až hlavní vlákno engine v2 implementuje, test vypíše prvních 15 rozdílů v každé sadě.

### Otázky pro Radka (v2)

Ve všech případech test drží doslovný výklad zadání. Kde na výkladu záleží, je v kódu komentář „DOSLOVNÝ VÝKLAD“.

1. **Pořadí operací v bodu 3.** Zadání píše Areq = ρ × L × n × I / dU a reference počítá přesně v tomto pořadí zleva doprava. Engine může počítat jinak, třeba nejdřív L × n jako v1 (`Lc = L*ret`). Na **přesné** hraně (Areq rovné průřezu z `MM`) pak může vyjít o 1 ulp jinak a změní se průřez. Tyto případy jsou proto ve zvláštní sadě „hrany úbytku přesně na hraně“ (5 760 případů). Sady ±1e-9 na pořadí operací nezávisí. Je pořadí operací závazné (doslovně podle zadání), nebo má test přesné hrany vypustit?
2. **Hlášky u chyb.** Test chápe bod 10 tak, že hlášky patří jen k úspěšnému výsledku. Chyba (`NEPLATNY_VSTUP`, `HLAVNI_VEDENI`, `ANI_120_NESTACI`) má v `hlasky` jen svůj kód. Například `HLAVNI_VEDENI` v motorovém prostoru je bez `MOTOR_VYSSI_TRIDA` a 3 000 W bez `MENIC_OD_1000W`. Platí to?
3. **Strop CAPH ve svazku a motorovém prostoru ve v2 nic nemění.** S k = 0,53 a 0,5 je amp(a) × k na všech plochách z `MM` i `AWG` pod stropem, nebo vede na stejnou pojistku (1 mm² ve svazku: 10,07 A proti CAPH 10 A, pojistka 10 A v obou případech). Záměna CAPH za CAPN u svazku i motoru proto nezmění žádný výsledek a test ji nemůže odhalit. Výpočet tím není špatně, jen rozhodnutí odborníka o CAPH ve v2 fakticky nehraje roli. Je to záměr?
4. **Nekonečno.** Podmínka `!(v > 0) || !(L > 0)` propustí +∞: příkon ∞ dá `HLAVNI_VEDENI` s proudem ∞, délka ∞ dá `ANI_120_NESTACI`. V mřížce to není, stejně jako ve v1 (otázka 4 u v1). Navrhuji řešit v UI.
5. **Proud u `NEPLATNY_VSTUP`.** Typ ho nepožaduje, takže test u této chyby proud nekontroluje (ani to, že chybí).


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
