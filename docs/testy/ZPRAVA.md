# Zpráva testera

## Golden test kalkulačky průřezu (16. 11. 2026)

### Soubory

- `packages/engine/tests/vodic.golden.test.ts`: samotný test.
- `packages/engine/tests/golden/reference.ts`: spouští referenci `docs/reference/kalkulacka-prurezu-v1.html` v Node.
- `packages/engine/tests/golden/grid.ts`: mřížka vstupů.
- `packages/engine/tests/golden/porovnani.ts`: porovnání výsledku enginu s referencí (tolerance 1e-9).

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
npx vitest run packages/engine/tests/vodic.golden.test.ts
```

Celá sada testů se spustí příkazem `npm test`. Golden test trvá asi 15 s.

### Aktuální výsledek (16. 11. 2026, 18:35)

**Všech 153 testů prochází** (`Test Files 1 passed, Tests 153 passed`):
- 8 kontrol samotného testu,
- 48 × 3 testy `navrhVodice` (mřížka, hrany úbytku, neplatné vstupy),
- 1 test `referencniTabulka`.

Engine se na celé mřížce (167 184 případů) i v tabulce (14 řádků) shoduje s referencí.

Na začátku práce engine vyhazoval „neimplementováno“. Hlavní vlákno ho během psaní testu implementovalo (`vodic.ts` změněn v 18:27), takže stav „padá jen kvůli neimplementováno“ už nešlo ověřit proti enginu. Že test opravdu odhalí chyby, dokládá kontrola „porovnání odhalí odchylku v každém poli“. Implementaci enginu jsem nečetl, test je napsaný jen podle zadání, typů a reference.

`npx tsc --noEmit -p packages/engine` hlásí jen chybějící typy pro `node:fs`, `node:url` a `node:vm` (TS2307), protože v repu není `@types/node`. Vitest tím ovlivněn není.

### Otázky pro Radka

1. **Kódy „rozhodlo“ v hláškách.** První zelená hláška reference („Rozhodl úbytek…“ / „Rozhodlo oteplení…“, spolu s max. délkou) je v testu v `hlasky` jako první kód `ROZHODL_UBYTEK` / `ROZHODLO_OTEPLENI` a zároveň v poli `rozhodlo`. Tak to vyplývá z `KodHlasky` a z komentáře „v pořadí, v jakém je ukazuje reference“. Souhlasí to?
2. **Proud u `ANI_120_NESTACI`.** Reference proud nezobrazuje, a test ho proto u této chyby neporovnává. Engine ho může, ale nemusí vracet. Porovnává se jen u `MIMO_ROZSAH`, kde ho reference ukazuje.
3. **Příkon v režimu P.** Reference příkon v režimu P nezobrazuje. Test podle dokumentace typu čeká zadanou hodnotu.
4. **Nekonečno a obří čísla.** Reference vstup „Infinity“ bere jako kladné číslo: proud ∞ dá `MIMO_ROZSAH`, délka ∞ dá `ANI_120_NESTACI`. Komentář u `NEPLATNY_VSTUP` („není kladné číslo“) by mohl svádět k jinému chování. V mřížce to není. Má se to testovat a jak? Navrhuji řešit hlavně v UI, kde vstup jde přes `num()`.
5. **Typy pro Node.** Pro čistý `tsc` nad testy chybí `@types/node` (dev závislost s licencí MIT). Nic jsem neinstaloval, protože `npm install` souběžně běží u jiného agenta.
