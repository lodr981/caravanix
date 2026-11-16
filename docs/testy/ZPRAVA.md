# Zpráva testera

## Souhrn (16. 11. 2026, 22:25)

Platí **verze 1.1** (Radek 16. 11. 2026, `docs/reset/KALKULACKA_V1_1.md`). Verze 1 je historie (základ v1.1), verze 2 je nahrazená a její testy jsou archiv.

| Sada | Soubor | Testů | Výsledek |
|---|---|---|---|
| **Golden v1.1 (platná)** | `packages/engine/tests/vodic-v11.golden.test.ts` | 156 | 11 kontrol testu prochází, 145 padá **jen** na „neimplementováno“ |
| **Ruční příklady v1.1** | `tests/priklady/vodic-v11.test.ts` | 15 | 8 kontrol zápisu prochází, 7 testů enginu padá **jen** na „neimplementováno“ |
| Golden v1 (historie) | `packages/engine/tests/vodic-v1.golden.test.ts` | 153 | **153 prochází** (beze změny) |
| Golden v2 (archiv) | `packages/engine/tests/vodic-v2.golden.test.ts` | 300 | **300 prochází** (přesměrováno na `v2`) |
| Ruční příklady v2 (archiv) | `tests/priklady/vodic-v2.test.ts` | 24 | **24 prochází** (přesměrováno na `v2`) |
| Tokeny designu | `packages/ui/tests/tokeny.test.ts` | 68 | 68 prochází |
| **Celkem `npm test`** | 6 souborů | **716** | 564 prochází, 152 padá (všech 152 na `navrhVodice v1.1: zatím neimplementováno` / `referencniTabulka v1.1: zatím neimplementováno`) |

Ověřeno seskupením chybových zpráv z JSON reportu Vitestu (`npx vitest run --reporter=json`): jiná chyba se nevyskytuje. `npx tsc --noEmit -p packages/engine` projde bez chyb.

**Doplněno 16. 11. 2026, 23:45 (kalkulačky alfy):** `packages/engine/tests/kalkulacky-alfa.test.ts`: po rozhodnutí otázek (Q1, Q2, Q4, Q7) a opravě enginu **250 / 250 prochází** (`npx vitest run packages/engine/tests/kalkulacky-alfa.test.ts`). Viz oddíl „Kalkulačky alfy A–G“. Tabulka výše je stav z 22:25.

Spuštění:

```
npm test
npx vitest run packages/engine/tests/kalkulacky-alfa.test.ts
npx vitest run packages/engine/tests/vodic-v11.golden.test.ts tests/priklady/vodic-v11.test.ts
npx vitest run packages/engine/tests/vodic-v11.golden.test.ts -t "kontrola testu"
npx vitest run packages/engine/tests/vodic-v1.golden.test.ts
npx vitest run packages/engine/tests/vodic-v2.golden.test.ts tests/priklady/vodic-v2.test.ts
```

Golden v1.1 trvá asi 35 s (z toho kontroly testu s mutanty asi 30 s), v1 asi 15 s, archiv v2 asi 3 s.

## Kalkulačky alfy A–G (16. 11. 2026, 23:45)

Akceptační testy podle `docs/KALKULACKY_ALFA.md`, psané ze zadání. Kód enginu (`packages/engine/src/`) jsem nečetl. Engine během psaní testů vznikl; jen u věcí, které zadání **nepojmenovává** (jména variant „co pomůže nejvíc“), jsem jména převzal z výstupu enginu zjištěného černou skříňkou (Q1).

### Soubory

- `packages/engine/tests/kalkulacky-alfa.test.ts`: testy všech 10 funkcí (`jmenoviteNapeti`, `bilanceSpotrebicu`, `ohrevVody`, `kolikUvarim`, `potrebnaBaterie`, `vydrzBaterie`, `navrhMenice`, `nabitiZJizdy`, `zapojeniPanelu`, `sobestacnost`).
- `tests/priklady/kalkulacky-alfa.md`: ruční příklady s postupem (P-A1 … P-G7), čísla ověřená výpočtem v Node.
- Soběstačnost běží nad **vlastní malou tabulkou** (`testov`, `jinde`, `vychoziZtraty` 0,8), na skutečných datech nezávisí.

### Co testy pokrývají

| Funkce | Testů | Prochází | Obsah |
|---|---|---|---|
| `jmenoviteNapeti` | 2 | 2 | 12,8 V a 25,6 V |
| `bilanceSpotrebicu` | 29 | 29 | 4 příklady (i položka 0 W), hrany `NAD_150A` (přesně 150 A ne) na 12 i 24 V, `BEZ_MENICE`, prázdný seznam, `pole` ve tvaru `polozky[2].prikonW` |
| `ohrevVody` | 20 | 20 | příklad ze zadání (98,8 / 129,2 Wh), 2 další, tCil vs. tStart, hrany všech rozsahů |
| `kolikUvarim` | 25 | 25 | příklad ze zadání (2 304 Wh, 370,4 Wh, 6 jídel), floor na hraně (přesně 6 / 5), 0 jídel, hrany `PROUD_VELKY` |
| `potrebnaBaterie` | 18 | 18 | 3 příklady, zaokrouhlení nahoru (přesně 100 Ah zůstane, o chlup víc → 110) |
| `vydrzBaterie` | 13 | 13 | 2 příklady + zpětná kontrola k `potrebnaBaterie`; vstupy bez rozsahu (Q6) |
| `navrhMenice` | 30 | 30 | 7 příkladů (rozběh, shoda přírůstků, současné a samostatné spotřebiče podle rozhodnutí Q7), hrany `NAD_150A`, `ODKAZ_PRUREZ` vždy |
| `nabitiZJizdy` | 14 | 14 | 3 příklady, `LITHIUM_BOOSTER` vždy (i při 0 h) |
| `zapojeniPanelu` | 52 | 52 | 3 příklady, hrany `VOC_NAD_MAX` / `ISC_NAD_MAX` (rovnost ne), `POJISTKA_VETVE` (2 ne, 3 ano), všech 11 rozsahů |
| `sobestacnost` | 47 | 47 | 7 ručně spočítaných průběhů po dnech (přípojka, ořez na kapacitu, stav přesně 0 = vybití, vybití 1. den, výchozí 30 dní), `vydrzi`, `bilancePoMesicich`, co pomůže nejvíc (varianta, `dnyBezPripojky` i `prinosDni`; pořadí jiné než v zadání, shody v pořadí zadání, booster jen při jízdě), hrany obou hlášek, neznámé město, měsíc 0 / 13 |
| **Celkem** | **250** | **250** | |

U každého číselného vstupu s rozsahem: obě hrany platné, ± 1e-6 za hranou `NEPLATNY_VSTUP` se správným `pole`, NaN, ±Infinity, záporné, text a (bez výchozí hodnoty) chybějící vstup. U `napeti`: 0, 12,8, 13, 48, −12, NaN, „12“, chybí. Spojitá čísla s tolerancí 1e-9, hlášky jako množina.

**Kontrola testu:** testy jsem pustil proti vlastnímu doslovnému stubu mimo repo (aliasem `@caravanix/engine`): **248 / 248 prochází**. Stub s jedenácti chybami (mutanty: `≥ 150`, vybití jen `< 0`, obrácené pořadí při shodě, litruVody s účinností uživatele, `round` místo `ceil`, posunutý měsíc, přípojka jen bez vybití, `paralel > 3`, průběh od indexu 0, booster i bez jízdy, korekce Voc od 20 °C): **každý odhalen**. `tsc --noEmit -p packages/engine` nad testem bez chyb.

### Co padalo (engine, 16. 11. 2026, 23:45) – vyřešeno

1. **Výjimka pro `undefined` / `null` (9 testů, všechny funkce kromě `jmenoviteNapeti`).** Zadání: „Žádná funkce nevyhazuje výjimku.“ Reprodukce: `ohrevVody(undefined)` → `TypeError: Cannot destructure property 'litry' of 'vstup' as it is undefined`; `sobestacnost(null)` → `TypeError: Cannot read properties of null (reading 'data')`. Prázdný objekt `{}` engine zvládne správně (`NEPLATNY_VSTUP`). Test čeká `{ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole: <libovolný text> }`. Oprava je v kódu.
2. **`prubeh` od indexu 0 (1 test, Q2).** Engine vrací `prubeh` délky `dniSimulace` (den 1 na indexu 0); doslovně podle zadání `prubeh[d]` = den d. Hodnoty po dnech jinak sedí (ostatní testy průběhu na rozložení pole nezávisí). Rozhodne mistr: buď opravit engine, nebo upravit zadání a tento jeden test.

**Stav po rozhodnutí (16. 11. 2026):** engine opravený (žádné výjimky u `undefined` / `null`), zadání upřesněné (oddíly „Obecně“, D a G). Testy upravené jen podle odpovědí níže: P-D4 a P-D5 podle nového pravidla měniče, nové P-D6 a P-D7, `prubeh` délky `dniSimulace` s `prubeh[d − 1]` (test „Q2“), `coPomuze` s `dnyBezPripojky` každé varianty, tabulka měst jen jako pole `data` (druhý argument se netestuje). Výsledek: **250 / 250 prochází**.

Všechna čísla enginu (spotřebiče, vaření, baterie, měnič, booster, solár, simulace po dnech, bilance po měsících, pořadí „co pomůže nejvíc“) se shodují s ručními příklady.

## Kalkulačky alfy – otázky pro mistra

**Odpovědi (16. 11. 2026, zapsané v `docs/KALKULACKY_ALFA.md`):**
- **Q7:** `trvalyVykonW` = větší z (součet současných) a (největší samostatný spotřebič); `spickaW` = větší z (součet současných + největší rozběhový přírůstek mezi současnými) a (největší P × rozběh mezi samostatnými). P-D4: 100 W současně + 2 000 W samostatně → trvalý **2 000 W** (a `NAD_150A`, 173,6 A). Přidány P-D6 a P-D7.
- **Q2, Q3:** `prubeh` má délku `dniSimulace`, `prubeh[d − 1]` = konec dne d; měsíc `kWhNaKWpDen[mesic − 1]`.
- **Q1, Q4:** `coPomuze: [{ varianta, dnyBezPripojky, prinosDni }]` s variantami `BATERIE_100AH`, `PANELY_100WP`, `BOOSTER_10A`, `SPOTREBA_MINUS_10`; tabulka měst jako pole `data` ve vstupu (druhý argument se netestuje). Vstup `undefined`, `null` nebo `{}` → `NEPLATNY_VSTUP`, nikdy výjimka.
- **Q9:** `VOC_NAD_MAX` je blok, stav zůstává `ok` s hláškou (a příznakem blok); test beze změny.
- **Ostatní (Q5, Q6, Q8, Q10–Q16):** platí doslovný výklad, který test už má.

Původní otázky (test drží doslovný výklad; v kódu je u každého místa komentář „DOSLOVNÝ VÝKLAD (Qn)“ nebo „Qn“):

1. **Jména výstupů, která zadání neurčuje.** (a) Hodnoty jednotlivých položek u spotřebičů: test čte `polozky[i].{WhSpotrebic, WhZBaterie, proud, AhDenne}` (engine to tak má). (b) „Co pomůže nejvíc“: test převzal z enginu `coPomuze[{ varianta, prinosDni }]` s variantami `BATERIE_100AH`, `PANELY_100WP`, `BOOSTER_10A`, `SPOTREBA_MINUS_10`. Navrhuji tato jména dopsat do zadání, ať je smlouva psaná.
2. **`prubeh[d]`: index = den, nebo d − 1?** Doslovně index = číslo dne (délka `dniSimulace + 1`); engine má den 1 na indexu 0. Zadání ale stejným zápisem píše `kWhNaKWpDen[mesic]` pro měsíc 1–12, kde doslovné čtení nedává smysl (Q3), takže i `prubeh[d]` může být jen matematický zápis. Doporučuji potvrdit 0-based (engine) a v zadání to napsat; pak se upraví jen test „Q2 doslovně“.
3. **`kWhNaKWpDen[mesic]`** s mesic 1–12 test čte jako měsíc číslo `mesic` (index mesic − 1); `bilancePoMesicich[0]` = leden. Doslovné čtení (index 12 neexistuje) nedává smysl.
4. **Parametr `data`** u soběstačnosti: druhý argument, nebo pole vstupu? Test předává tabulku oběma způsoby; engine ji bere z pole vstupu `data` (druhý argument ignoruje). Stačí dopsat do zadání.
5. **Názvy `pole`:** vnořené vstupy jako `panel.Voc`, `regulator.maxVstupV`, `jizda.hodinDenne`; `tCil ≤ tStart` → `tCil`; prázdný seznam → `polozky`; neznámé město → `mesto`; jiné napětí než 12 / 24 → `napeti`. Engine to tak má; jen potvrdit.
6. **Vstupy bez rozsahu:** všechny vstupy `vydrzBaterie`, `ucinnostMenice` u `kolikUvarim` a `navrhMenice`, `vyuzitelnost`, `jizda.*` a `dniSimulace` u soběstačnosti; neceločíselný měsíc, `serie` a `paralel`; prázdný seznam spotřebičů u měniče. Test žádá jen NaN / ±∞ / text → `NEPLATNY_VSTUP` a u 0 a záporných „žádný nesmysl“ (buď chyba se správným `pole`, nebo konečná nezáporná čísla; např. `WhDenne = 0` nesmí dát `dny = ∞`). Navrhuji rozsahy dopsat (stejné jako jinde: kapacitaAh 1–2 000, WhDenne 1–50 000, účinnosti 0,3 nebo 0,5 až 1, dniSimulace 1–365, serie / paralel celá čísla).
7. **BEZPEČNOST – trvalý výkon měniče.** Doslovně se sčítají jen spotřebiče se `soucasne = true`; nesoučasný spotřebič se započte, jen když žádný není současný. Lednice 100 W současně + varná konvice 2 000 W nesoučasně → **trvalý výkon 100 W** a měnič 100 W konvici neutáhne (test P-D4 to doslovně drží a engine to tak počítá). Navrhuji `trvalyVykonW = max(součet současných, největší nesoučasný)` a obdobně špičku. A když žádný není současný, zadání neurčuje špičku (test žádá jen špička ≥ trvalý). Jde o změnu výpočtu → Radek.
8. **`litruVody` počítá s výchozí účinností měniče 0,9**, i když uživatel zadá jinou (zadání: „výchozí teploty a účinnosti“). Test to doslovně drží. Je to záměr, nebo má platit zadaná účinnost měniče?
9. **`VOC_NAD_MAX` je „blok“**, ale obecný tvar výsledku zná jen `ok` / `chyba`. Test čeká `stav: "ok"` s hláškou a čísly; blok musí vynutit UI. Platí to, nebo má být jiný stav?
10. **Pořadí hlášek** zadání neurčuje; test porovnává jako množinu.
11. **„Co pomůže nejvíc“ s přípojkou a mimo rozsah.** Test počítá varianty se všemi ostatními vstupy stejnými, i s přípojkou (P-G1: baterie +100 Ah pak vydrží → +5 dní). Varianta může vyjít mimo rozsah (2 000 + 100 Ah, spotřeba 1 Wh × 0,9); test to nekontroluje, engine ji spočítá.
12. **`prinosDni`** = dny varianty − dny základu, `null` = `dniSimulace + 1`; když základ vydrží, mají všechny varianty 0 a jsou v pořadí zadání. Doslovně ze zadání; jen potvrdit.
13. **Stav přesně 0 je den vybití** (≤ 0), test P-G4. Doslovně.
14. **`BEZ_MENICE`** se neukáže, když je na 230 V položka s příkonem 0 W (doslovně „žádná položka není na 230 V“). Nepodstatné, jen pro informaci.
15. **Text místo čísla** (např. `"12"`) → `NEPLATNY_VSTUP` („není konečné číslo“). Engine to tak má.
16. **Den vybití zároveň s přípojkou:** v průběhu je ten den 100 % (přípojka na konci dne), ale počítá se jako den vybití (P-G1, den 3; dnyBezPripojky z prvního vybití). Doslovně.

## Golden test kalkulačky průřezu, verze 1.1 (platná, 16. 11. 2026)

Testuje `navrhVodice` a `referencniTabulka` z `@caravanix/engine` (`packages/engine/src/vodic.ts`) proti nezávislé referenci v1.1. Kód enginu jsem nečetl, z `src/vodic.ts` jsou převzaté jen typy a komentáře rozhraní.

### Soubory

- `packages/engine/tests/golden-v11/reference-v11.ts`: **nezávislá reference v1.1**. Z `docs/reference/kalkulacka-prurezu-v1.html` se programově vytáhne `<script>` (stejně jako u v1) a na jeho text se programově uplatní jen čtyři změny. Každá záměna musí ve skriptu najít svůj vzor právě jednou, jinak reference spadne.
- `packages/engine/tests/golden-v11/grid-v11.ts`: mřížka vstupů.
- `packages/engine/tests/golden-v11/porovnani-v11.ts`: porovnání výsledku a řádku tabulky (tolerance 1e-9).
- `packages/engine/tests/vodic-v11.golden.test.ts`: golden test a kontroly testu.
- `tests/priklady/vodic-v11.md` a `tests/priklady/vodic-v11.test.ts`: 7 ručních příkladů s postupem krok za krokem.

### Úpravy skriptu v1 (reference v1.1)

| Změna | Ve skriptu v1 | V referenci v1.1 |
|---|---|---|
| 1. Pojistka ≥ 1,25 × I | `FUSES.find(f=>f>=I*1.1)` | `FUSES.find(f=>f>=I*1.25)` |
| 2. 300 A pryč | `FUSES=[…,250,300]` | `FUSES=[…,250]`; `maxFuse()` čte `FUSES`, takže platí i tam (beze změny jejího kódu) |
| 2. Mez → `HLAVNI_VEDENI` | `if(!fuse)` „Proud … je mimo rozsah kalkulačky (nad 240 A)…“ | `if(!fuse)` „Hlavní vedení: pojistka Class T u baterie, řiďte se návodem výrobce a návrhem odborníka.“ + proud |
| 3. Nad 150 A | — | `if(I>150)` hláška `NAD_150A_MENIC`, vložená hned za hlášku `NAD_150A_12V` (pořadí podle kapitoly „Pořadí hlášek“) |
| 4. „Ve svazku“ | popisek tlačítka v HTML | jen text mimo `<script>`; výpočet (`k=0.7`, `rho=0.0216`) beze změny |

Spouštění, podvrh `document`, přesná `fmt` a parsování výstupu jsou stejné jako u v1 (viz níže). Mapování hlášek navíc: text „Hlavní vedení: …“ → `HLAVNI_VEDENI` (s proudem), text „U měniče platí kabel…“ → `NAD_150A_MENIC`. `MIMO_ROZSAH` ve v1.1 není.

### Co test pokrývá

48 kombinací (12 a 24 V × režim P a I × úbytek 3, 5, 10 % × zpětný 1 a 2 × prostředí n a h). V režimu P se proud převede na příkon (proud × napětí).

| Sada | Obsah (na kombinaci) | Případů celkem |
|---|---|---|
| Mřížka | 164 proudů × 18 délek | 141 696 |
| Prahy příkonu (jen P) | 999,99 / 1 000 / 1 000,01 W; 150 A × U ± 0,01 W; 200 A × U a + 0,01 W; × 0,2, 1 a 5 m | 576 |
| Hrany úbytku | proudy 1, 5, 10, 20, 50, 100, 150, 200 A × 15 průřezů × délka pod, na a nad hranou Areq = průřez | 17 280 |
| Neplatné vstupy | hodnota, délka, obojí = 0, −0, −1, −0,5, −240, NaN | 864 |
| **Celkem `navrhVodice`** | | **160 416** |
| `referencniTabulka()` | řádek po řádku | 14 řádků |

**Proudy (164).** 146 hodnot v rozsahu 0,5–200 A: 47 rovnoměrně rozložených (včetně 149,99 / 150 / 150,01 a 199,99 / 200) a hrany **každé** z 23 pojistek: f/1,25 × (1 ± 1e-9), f/1,25 a f/1,25 ± 0,01 A. Nad mezí 18 hodnot (200,0000001 až 1 000 A, včetně staré meze v1 240 A a 272,73 A).

**Délky (18).** 0,2, 0,3, 0,5, 0,75, 1, 1,5, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20 m a navíc 30 a 50 m pro `ANI_120_NESTACI`.

**Co se porovnává.**
- Přesně: stav, průřez, AWG (označení i plocha, případně `null`), pojistka, max. pojistka, co rozhodlo, kódy hlášek včetně pořadí.
- U `HLAVNI_VEDENI` proud (tolerance 1e-9); chybějící proud je chyba.
- S tolerancí 1e-9: proud, příkon, úbytek ve V a v %, napětí u spotřebiče, ztráta, max. délka; v tabulce délka 3 % a 10 %.

**Jak často vstupy (mřížka, prahy, hrany a neplatné) v referenci zasáhnou větve:**

| Výsledek nebo hláška | Případů |
|---|---|
| Stav ok | 134 606 |
| `ROZHODL_UBYTEK` | 68 726 |
| `ROZHODLO_OTEPLENI` | 65 880 |
| `MINUS_PRES_KOSTRU` | 68 312 |
| `MENIC_OD_1000W` | 22 466 |
| `NAD_150A_12V` | 5 792 |
| `NAD_150A_MENIC` | 12 282 |
| AWG `null` | 4 036 |
| `ANI_120_NESTACI` | 9 322 |
| `HLAVNI_VEDENI` | 15 624 |
| `NEPLATNY_VSTUP` | 864 |

### Kontroly samotného testu (11, nezávisí na enginu, procházejí)

1. Upravený skript se od v1 liší **přesně ve čtyřech řádcích** (FUSES, výběr pojistky, chyba nad mezí, hlášky nad 150 A); hláška `NAD_150A_12V` zůstává beze změny, `NAD_150A_MENIC` je přidaná za ni.
2. `MM`, `AMP`, `AWG`, `CAPN`, `CAPH`, `amp()` a `nearestAwg()` jsou shodné s v1; `FUSES` = v1 bez 300 A. `maxFuse()` dává totéž co v1 všude, kde v1 nedá 300 A; tam dá 250 A (120 mm² samostatně).
3. Změna 4: v HTML je popisek „Ve svazku“, skript slovo „motorový“ neobsahuje a k / ρ svazku jsou beze změny.
4. Mřížka splňuje zadání: ≥ 40 proudů 0,5–200 A, všechny hrany f/1,25, ≥ 5 proudů nad 200 A, ≥ 15 délek 0,2–20 m, 48 kombinací.
5. a 6. Ručně ověřené případy (viz níže a `tests/priklady/vodic-v11.md`).
7. **Varianta „jako v1“** (1,1 × I, 300 A v řadě, bez `NAD_150A_MENIC`) dá na celé mřížce totéž co **nezměněná reference v1** (jen `MIMO_ROZSAH` ↔ `HLAVNI_VEDENI`). Úpravy tedy nezměnily nic dalšího.
8. Mřížka v referenci zasáhne všech 9 kódů, obě „rozhodlo“, AWG `null`, **každou** z 23 pojistek jako doporučenou, pořadí všech čtyř dodatečných hlášek najednou na 12 V (`MINUS_PRES_KOSTRU, NAD_150A_12V, NAD_150A_MENIC, MENIC_OD_1000W`) i `NAD_150A_MENIC` bez `NAD_150A_12V` na 24 V. Pod hranou f/1,25 vyjde pojistka f, nad ní vyšší (nad 250 A `HLAVNI_VEDENI` s proudem).
9. `porovnej` odhalí podvrženou odchylku v každém poli (průřez, pojistka, max. pojistka, rozhodlo, AWG označení / plocha / `null`, prohozené pořadí `NAD_150A_12V` a `NAD_150A_MENIC`, chybějící hláška, odchylka 2e-9, NaN), u `HLAVNI_VEDENI` chybějící nebo jiný proud, jiný kód a hlášku navíc; v řádku tabulky každé pole. Odchylku pod 1e-9 toleruje.
10. **Mřížka odhalí každého ze 14 mutantů:** 1,1 × I (v1), 1,2 × I, 1,3 × I, ostré „>“ místo „≥“, 300 A v řadě, 300 A zapomenutá jen v `maxFuse()`, chybějící `NAD_150A_MENIC`, `NAD_150A_MENIC` jen pro 12 V, jen pro 24 V, od 150 A včetně, od 200 A, podle příkonu místo proudu, `NAD_150A_MENIC` před `NAD_150A_12V`, `HLAVNI_VEDENI` bez proudu.
11. Tabulka přečtená s přesnou `fmt` dá po zpětném naformátování (cs-CZ) znak po znaku stejné HTML, jaké reference vykreslí; tabulka v1.1 = tabulka v1 (14 řádků do 95 mm² 300 A nedosáhne).

### Co reference v1.1 vrací (vybrané případy)

| Vstup | Výsledek reference v1.1 |
|---|---|
| 60 W, 12 V, 5 m, 3 %, vlastní, samostatně | I = 5 A, **2,5 mm²**, AWG 12, pojistka **7,5 A**, max. 20 A, úbytek 0,35 V (2,917 %), 11,65 V, ztráta 1,75 W, max. délka 5,143 m; `ROZHODL_UBYTEK` |
| 1 200 W, 12 V, 2 m, 3 %, kostra, samostatně | I = 100 A, **35 mm²**, AWG 1, pojistka **125 A**, max. 125 A, úbytek 0,1 V (0,833 %), ztráta 10 W, max. délka 7,2 m; `ROZHODLO_OTEPLENI`, `MINUS_PRES_KOSTRU`, `MENIC_OD_1000W` |
| 20 A, 24 V, 8 m, 5 %, vlastní, svazek | **6 mm²**, AWG 8, pojistka **25 A**, max. 35 A, úbytek 1,152 V (4,8 %), 22,848 V, ztráta 23,04 W, příkon 480 W, max. délka 8,333 m; `ROZHODL_UBYTEK` |
| 160 A, 12 V, 1 m, 10 %, vlastní, samostatně | **70 mm²**, AWG 3/0, pojistka **200 A**, max. 200 A, úbytek 0,08 V (0,667 %), ztráta 12,8 W, max. délka 15 m; `ROZHODLO_OTEPLENI`, `NAD_150A_12V`, `NAD_150A_MENIC` |
| 160 A, 24 V, 1 m, 10 % | totéž, hlášky `ROZHODLO_OTEPLENI`, `NAD_150A_MENIC` |
| 205 A, 24 V (i 4 920 W v režimu P) | chyba **`HLAVNI_VEDENI`**, proud 205 A (1,25 × 205 = 256,25 > 250) |
| 200 A, 12 V, 0,5 m, 10 % | **95 mm²**, AWG 4/0, pojistka **250 A**, max. 250 A; `ROZHODLO_OTEPLENI`, `NAD_150A_12V`, `NAD_150A_MENIC` |
| 190 A, 12 V, 0,5 m, 3 %, svazek | `ANI_120_NESTACI` (pojistka 250 A, maxFuse(120, svazek) = 225 A) |
| 9 A, 12 V, 2 m, 10 % | **1 mm²**, pojistka **15 A** (v1: 0,75 mm², 10 A) |
| 120 W, 12 V, 4 m, 3 % | 4 mm², AWG 10, pojistka 15 A (stejně jako v1) |

**Referenční tabulka v1.1** (shodná s v1):

| Průřez [mm²] | AWG | Max. pojistka samostatně / svazek [A] | Délka 3 % | Délka 10 % |
|---|---|---|---|---|
| 0,5 | 20 | 7,5 / 7,5 | 0,686 m | 2,286 m |
| 0,75 | 18 | 10 / 10 | 0,771 m | 2,571 m |
| 1 | 18 | 15 / 10 | 0,686 m | 2,286 m |
| 1,5 | 16 | 15 / 15 | 1,029 m | 3,429 m |
| 2,5 | 14 | 20 / 20 | 1,286 m | 4,286 m |
| 4 | 12 | 30 / 25 | 1,371 m | 4,571 m |
| 6 | 10 | 40 / 35 | 1,543 m | 5,143 m |
| 10 | 8 | 60 / 50 | 1,714 m | 5,714 m |
| 16 | 6 | 80 / 60 | 2,057 m | 6,857 m |
| 25 | 4 | 100 / 80 | 2,571 m | 8,571 m |
| 35 | 2 | 125 / 100 | 2,880 m | 9,600 m |
| 50 | 1/0 | 150 / 125 | 3,429 m | 11,429 m |
| 70 | 2/0 | 200 / 150 | 3,600 m | 12,000 m |
| 95 | 3/0 | 250 / 200 | 3,909 m | 13,029 m |

### Výsledek (16. 11. 2026, 22:24)

- 11 kontrol testu a 8 kontrol zápisu ručních příkladů **prochází**.
- **Padá jen kvůli neimplementovanému enginu:** 144 testů `navrhVodice` (48 kombinací × 3 sady), 1 test `referencniTabulka`, 7 ručních příkladů proti enginu. Všechny končí na `Error: navrhVodice v1.1: zatím neimplementováno` nebo `referencniTabulka v1.1: zatím neimplementováno`.
- Až bude engine hotový, test vypíše prvních 15 rozdílů v každé sadě.

### Otázky pro mistra (v1.1)

Test všude drží doslovný výklad zadání; kde na výkladu záleží, je to v kódu komentované.

1. **Proud u `HLAVNI_VEDENI` v režimu příkon.** Test chce proud = P / U (např. 4 920 W / 24 V → 205 A), stejně jako `MIMO_ROZSAH` ve v1. U ostatních chyb (`NEPLATNY_VSTUP`, `ANI_120_NESTACI`) proud nekontroluje, zadání ho neurčuje. Platí to?
2. **Svazek nad 180 A dává `ANI_120_NESTACI`, ne `HLAVNI_VEDENI`.** Pojistka 250 A, ale maxFuse(120 mm², svazek) = 225 A, takže od 180 A do 200 A ve svazku vyjde „Ani 120 mm² nestačí. Zkraťte trasu…“, i když zkrácení nepomůže. Je to doslovně v1 a výsledek je chyba, ne nebezpečné číslo; podle testu podstatnosti spíš nepodstatné. Jen pro informaci textařům.
3. **Přesně 200 A je ještě v rozsahu** (1,25 × 200 = 250 A, „≥“), 200,0000001 A už je `HLAVNI_VEDENI`. Doslovně podle změn 1 a 2.
4. **Text `HLAVNI_VEDENI` nahrazuje celou hlášku v1** včetně rady „Rozdělte zátěž, použijte paralelní vodiče nebo přejděte na vyšší napětí.“ Doslovně ze zadání; rada se nepřenáší.
5. **`NAD_150A_MENIC` se ukáže při každém proudu nad 150 A**, i když spotřebič není měnič (zadání: „Nad 150 A (při jakémkoli napětí)“). Test to tak drží.
6. **Vysvětlující texty v referenčním HTML** (návod u kalkulačky a poznámka pod tabulkou) dál mluví o „Ve svazku / motorový prostor“ a o „1,1× proudu“. Do výpočtu nevstupují; při psaní `content/cs/` je potřeba je přepsat podle v1.1. Test hlídá jen popisek tlačítka.
7. **Nekonečno** se chová jako ve v1 (∞ A → `HLAVNI_VEDENI` s proudem ∞, délka ∞ → `ANI_120_NESTACI`). V mřížce není; navrhuji řešit v UI.

## Golden test kalkulačky průřezu, verze 1 (historie, základ v1.1, 16. 11. 2026)

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

**Mistr, 16. 11. 2026: uzavřeno.** Odpověděl hlavní vlákno (`docs/OTAZKY.md`, Vyřešené, „Rozhraní enginu průřezu“).

1. **Kódy „rozhodlo“ v hláškách.** První zelená hláška reference („Rozhodl úbytek…“ / „Rozhodlo oteplení…“, spolu s max. délkou) je v testu v `hlasky` jako první kód `ROZHODL_UBYTEK` / `ROZHODLO_OTEPLENI` a zároveň v poli `rozhodlo`. Tak to vyplývá z `KodHlasky` a z komentáře „v pořadí, v jakém je ukazuje reference“. Souhlasí to?
2. **Proud u `ANI_120_NESTACI`.** Reference proud nezobrazuje, a test ho proto u této chyby neporovnává. Engine ho může, ale nemusí vracet. Porovnává se jen u `MIMO_ROZSAH`, kde ho reference ukazuje.
3. **Příkon v režimu P.** Reference příkon v režimu P nezobrazuje. Test podle dokumentace typu čeká zadanou hodnotu.
4. **Nekonečno a obří čísla.** Reference vstup „Infinity“ bere jako kladné číslo: proud ∞ dá `MIMO_ROZSAH`, délka ∞ dá `ANI_120_NESTACI`. Komentář u `NEPLATNY_VSTUP` („není kladné číslo“) by mohl svádět k jinému chování. V mřížce to není. Má se to testovat a jak? Navrhuji řešit hlavně v UI, kde vstup jde přes `num()`.
5. **Typy pro Node.** Pro čistý `tsc` nad testy chybí `@types/node` (dev závislost s licencí MIT). Nic jsem neinstaloval, protože `npm install` souběžně běží u jiného agenta.


## Golden test kalkulačky průřezu, verze 2 (ARCHIV, nahrazená 16. 11. 2026)

> **Archiv.** Verze 2 je nahrazená verzí 1.1 (Radek 16. 11. 2026, `docs/reset/KALKULACKA_V1_1.md`) a leží v `docs/ZASOBNIK.md`. Testy byly ve 22:15 přesměrovány na `packages/engine/src/vodic-v2.ts` (jmenný prostor `v2`, `import { v2 } from "@caravanix/engine"`); do hlaviček je připsáno, že jde o archiv, jinak jsou beze změny. Engine v2 je hotový: **golden v2 300 / 300 a ruční příklady v2 24 / 24 procházejí**. Text níže je původní zpráva z 21:25 (tehdy „platná“, engine neimplementovaný); otázky v ní už nejsou aktuální.

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

**Mistr, 16. 11. 2026: uzavřeno.** Odpověděl hlavní vlákno (`docs/OTAZKY.md`, Vyřešené) a verze 2 je od resetu archiv (`docs/reset/KALKULACKA_V1_1.md`). Pro v1.1 píše tester novou referenci a golden test.

Test všude drží doslovný výklad zadání. Kde na výkladu záleží, je v kódu komentář „DOSLOVNÝ VÝKLAD“.

1. **Pořadí operací v bodu 4 (I30).** Reference počítá I20 + ((I65 − I20) × 10) / 45 zleva doprava. Jiný zápis (např. × (10/45) nebo / 4,5) se může lišit o 1 ulp a proud přesně rovný I30 pak dá jinou pojistku. Tyto případy jsou proto ve zvláštní sadě „hrany pojistek přesně na I30“. Sady ±1e-9 na pořadí nezávisí. U úbytku zadání pořadí určuje (bod 7), u I30 ne. Je pořadí v bodu 4 závazné, nebo má test přesné hrany I30 vypustit?
2. **Neplatný vstup v motorovém prostoru.** Bod 1 je před bodem 2, takže např. 0 A v uložení `motor` dá `NEPLATNY_VSTUP`, ne `MOTOR_NEPOCITA`. Platí to?
3. **Hlášky u chyb.** Test chápe bod 11 tak, že hlášky patří jen k výsledku ok a chyba má v `hlasky` jen svůj kód. `HLAVNI_VEDENI` ve svazku je tedy bez `SVAZEK_NEJVYS_3_OBVODY` a 3 000 W bez `MENIC_OD_1000W`. Platí to?
4. **Strop CAPH ve svazku nic nemění.** S k = 0,53 je amp(a) × k na všech plochách z `MM` i `AWG` pod stropem CAPH, nebo vede na stejnou pojistku. Záměna CAPH za CAPN u svazku nezmění v mřížce žádný výsledek (ověřeno, 0 rozdílů), takže ji test nemůže odhalit. Výpočet tím není špatně, jen strop ve svazku ve v2 nehraje roli. Je to záměr?
5. **Pořadí `SVAZEK_NEJVYS_3_OBVODY` a `NAD_150A_12V` nejde ověřit.** Ve svazku vychází při I > 150 A vždy `ANI_120_NESTACI`: pojistka je aspoň 200 A, ale maxFuse(120, svazek) = 175 A. Obě hlášky tedy nikdy nejsou zároveň. Jen pro informaci.
6. **ρ(a) = pole `rho` (zaokrouhlené).** Reference bere ρ(a) z pole `rho`, ne odporOhmKm × a / 1000. Mutant s nezaokrouhleným ρ test odhalí. Je to správný výklad?
7. **Proud u `NEPLATNY_VSTUP`.** Zadání to neurčuje a typ proud nepožaduje, takže ho test u této chyby nekontroluje. U `MOTOR_NEPOCITA` test podle bodu 2 („bez proudu“) vyžaduje, aby proud chyběl.
8. **Nekonečno.** Podmínka `!(v > 0) || !(L > 0)` propustí +∞: příkon ∞ dá `HLAVNI_VEDENI` s proudem ∞, délka ∞ dá `ANI_120_NESTACI`. V mřížce to není, stejně jako ve v1. Navrhuji řešit v UI.
