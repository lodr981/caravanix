# Kalkulačky alfy: zadání výpočtů

Platí pro alfu (16. 11. 2026). Kalkulačka průřezu má vlastní zadání v `docs/KALKULACKA_PRUREZU.md`. Každé číslo počítá engine (`packages/engine/src/`), čisté funkce. Engine vrací čísla a kódy hlášek, texty jsou v `content/cs/`.

**Předpoklady** (výchozí hodnoty, kalkulačka je vždy ukáže a dovolí změnit): účinnost měniče 90 % (K-VODIC-0019, `docs/ZADANI.md`), účinnost indukce 85 % a využitelná kapacita LiFePO4 90 % (příklad v `docs/ZADANI.md`, kapitola Průvodce zásadami). Jmenovité napětí LiFePO4: 3,2 V na článek, tedy 12,8 V pro 12 V systém (4S) a 25,6 V pro 24 V systém (8S). Konstanta: měrné teplo vody 4,186 kJ/(kg·K), 1 l vody = 1 kg.

Vstup `undefined`, `null` nebo `{}` vrací `NEPLATNY_VSTUP` (pole podle prvního chybějícího vstupu), nikdy výjimku. Tabulka měst se předává jako pole `data` ve vstupu.

Obecně: výsledek je `{ stav: "ok", …pole…, hlasky: string[] }`, nebo `{ stav: "chyba", hlasky: ["NEPLATNY_VSTUP"], pole: "<název vstupu>" }`, když vstup není konečné číslo nebo je mimo uvedený rozsah (u seznamů pole ve tvaru `polozky[2].prikonW`). Žádná funkce nevyhazuje výjimku. Funkce se exportují z `@caravanix/engine` pod uvedenými jmény; `Unom` je exportovaná funkce `jmenoviteNapeti(napeti)`.

## A. Spotřebiče (`spotrebice.ts`)

`bilanceSpotrebicu({ napeti: 12 | 24, ucinnostMenice = 0.9, polozky: [{ prikonW, hodinDenne, na230V }] })`

- Rozsahy: prikonW 0 až 10 000, hodinDenne 0 až 24, ucinnostMenice 0,5 až 1, aspoň jedna položka.
- Pro každou položku: `WhSpotrebic = prikonW × hodinDenne`; z baterie `WhZBaterie = na230V ? WhSpotrebic / ucinnostMenice : WhSpotrebic`; proud z baterie `proud = (na230V ? prikonW / ucinnostMenice : prikonW) / Unom`, kde `Unom` = 12,8 nebo 25,6 V; `AhDenne = WhZBaterie / Unom`.
- Souhrn: `WhDenne` = součet `WhZBaterie`, `AhDenne` = `WhDenne / Unom`, `proudSoucasne` = součet proudů všech položek (všechno zapnuté najednou), `vykon230V` = součet `prikonW` položek na 230 V.
- Hlášky: `NAD_150A` když `proudSoucasne > 150` (odkaz na kalkulačku průřezu a měniče); `BEZ_MENICE` když žádná položka není na 230 V (informace, žádný měnič není potřeba).

## B. Vaření (`vareni.ts`)

`ohrevVody({ litry, tStart = 15, tCil = 100, ucinnostVareni = 0.85, ucinnostMenice = 0.9 })`

- Rozsahy: litry 0,1 až 50; tStart −10 až 99; tCil > tStart a ≤ 100; účinnosti 0,3 až 1.
- `WhTeplo = litry × 4,186 × (tCil − tStart) / 3,6` (kJ → Wh); `WhZBaterie = WhTeplo / (ucinnostVareni × ucinnostMenice)`.
- Příklad ze zadání: 1 l z 15 na 100 °C → teplo ≈ 98,8 Wh, z baterie ≈ 129,2 Wh.

`kolikUvarim({ kapacitaAh, napeti: 12 | 24, vyuzitelnost = 0.9, prikonW, minutNaJidlo, ucinnostMenice = 0.9 })`

- Rozsahy: kapacitaAh 1 až 2 000, vyuzitelnost 0,5 až 1, prikonW 1 až 10 000, minutNaJidlo 1 až 600.
- `WhVyuzitelne = kapacitaAh × Unom × vyuzitelnost`; `WhNaJidlo = prikonW × minutNaJidlo / 60 / ucinnostMenice`; `jidel = floor(WhVyuzitelne / WhNaJidlo)`; `litruVody = WhVyuzitelne / ohrevVody({ litry: 1 }).WhZBaterie` (výchozí teploty a účinnosti) a `hodinChodu = WhVyuzitelne / (prikonW / ucinnostMenice)`.
- Příklad ze zadání: 200 Ah, 12 V, 90 % → 2 304 Wh; 1 000 W, 20 min → 370,4 Wh na jídlo → 6 jídel.
- Hláška `PROUD_VELKY` když `prikonW / ucinnostMenice / Unom > 150`.

## C. Baterie (`baterie.ts`)

`potrebnaBaterie({ WhDenne, dnyAutonomie, napeti: 12 | 24, vyuzitelnost = 0.9 })`

- Rozsahy: WhDenne 1 až 50 000, dnyAutonomie 0,5 až 14, vyuzitelnost 0,5 až 1.
- `WhPotreba = WhDenne × dnyAutonomie / vyuzitelnost`; `Ah = WhPotreba / Unom`; `AhZaokrouhleno` = Ah zaokrouhlené nahoru na celých 10 Ah.

`vydrzBaterie({ kapacitaAh, napeti: 12 | 24, vyuzitelnost = 0.9, WhDenne })`

- `dny = kapacitaAh × Unom × vyuzitelnost / WhDenne`; `hodin = dny × 24`.

## D. Měnič (`menic.ts`)

`navrhMenice({ napeti: 12 | 24, ucinnostMenice = 0.9, spotrebice: [{ prikonW, rozbehNasobek = 1, soucasne = true }], spotrebaNaprazdnoW = 0, hodinZapnutoDenne = 0 })`

- Rozsahy: prikonW 0 až 10 000, rozbehNasobek 1 až 10, spotrebaNaprazdnoW 0 až 200, hodinZapnutoDenne 0 až 24.
- `trvalyVykonW` = **větší** z (součet `prikonW` spotřebičů se `soucasne = true`) a (největší `prikonW` spotřebiče se `soucasne = false`); bez spotřebičů dané skupiny se počítá 0. (Upřesněno 16. 11. 2026 po nálezu testera Q7: spotřebič, který běží samostatně, musí měnič také utáhnout.)
- `spickaW` = větší z (součet současných + největší `prikonW × (rozbehNasobek − 1)` mezi současnými) a (největší `prikonW × rozbehNasobek` mezi samostatnými); rozbíhá se vždy jen jeden spotřebič.
- Doporučení: měnič s **trvalým** výkonem aspoň `trvalyVykonW` a špičkovým aspoň `spickaW` (žádná vymyšlená rezerva; text řekne, že rezerva je na uživateli a počítá se trvalý výkon, ne špička na krabici).
- `proudZBaterie = trvalyVykonW / ucinnostMenice / Unom`; `WhNaprazdno = spotrebaNaprazdnoW × hodinZapnutoDenne`.
- Hlášky: `NAD_150A` když `proudZBaterie > 150` (zvažte 24 V); `ODKAZ_PRUREZ` vždy (proud jde do kalkulačky průřezu, odkaz s předvyplněným proudem).

## E. Booster (`booster.ts`)

`nabitiZJizdy({ napeti: 12 | 24, proudBoosteruA, hodinJizdyDenne })`

- Rozsahy: proudBoosteruA 1 až 100, hodinJizdyDenne 0 až 24.
- `AhDenne = proudBoosteruA × hodinJizdyDenne`; `WhDenne = AhDenne × Unom`.
- Hláška `LITHIUM_BOOSTER` vždy (lithiovou baterii nabíjet z alternátoru jen přes booster; bezpečnostní text, třída A).

## F. Solár – zapojení panelů (`solar.ts`)

`zapojeniPanelu({ panel: { Voc, Isc, Vmp, Imp, Wp, koefVocProcNaK }, serie, paralel, tMin = -20, regulator: { maxVstupV, maxVstupA } })`

- Rozsahy: Voc, Vmp 1 až 100 V; Isc, Imp 0,1 až 30 A; Wp 1 až 1 000; koefVocProcNaK −1 až 0 (%/K, záporné); serie 1 až 10; paralel 1 až 10; tMin −40 až 25 °C; maxVstupV 10 až 500; maxVstupA 1 až 200.
- `VocMraz = serie × Voc × (1 + koefVocProcNaK / 100 × (tMin − 25))`; `VmpPole = serie × Vmp`; `IscPole = paralel × Isc`; `ImpPole = paralel × Imp`; `WpPole = serie × paralel × Wp`.
- Hlášky: `VOC_NAD_MAX` (**blok**) když `VocMraz > maxVstupV`; `ISC_NAD_MAX` (varování) když `IscPole > maxVstupA`; `POJISTKA_VETVE` (varování) když `paralel ≥ 3` (každá větev vlastní pojistku); `RUZNE_PANELY` (informace) vždy jako text u volby (různé panely na samostatný regulátor) – není kód.
- Výchozí `tMin = −20 °C` je předpoklad (uživatel zadá nejnižší teplotu v místě, kde vůz stojí).

## G. Soběstačnost (`sobestacnost.ts`)

Data: `packages/data/src/solar-mesta.json` – pro každé město a měsíc průměrný denní výnos panelu uloženého **vodorovně** v kWh na 1 kWp za den (`kWhNaKWpDen[12]`), zaokrouhleno na 0,1, se zdrojem (karta). Ztráty systému (regulátor, teplota, nečistoty, kabely) jeden koeficient `ztratySystemu` (výchozí z karty v datech, `vychoziZtraty`).

`sobestacnost({ mesto, mesic (1–12), panelyWp, stineniProc = 0, ztratySystemu = vychozi, kapacitaAh, napeti: 12 | 24, vyuzitelnost = 0.9, WhDenne, jizda: { hodinDenne = 0, proudBoosteruA = 0 }, pripojkaKazdychDni = 0, dniSimulace = 30 })`

- Rozsahy: panelyWp 0 až 5 000, stineniProc 0 až 90, ztratySystemu 0,5 až 1, kapacitaAh 10 až 2 000, WhDenne 1 až 50 000, pripojkaKazdychDni 0 (nikdy) až 30.
- `vyrobaWhDen(mesic) = panelyWp / 1000 × kWhNaKWpDen[mesic] × 1000 × ztratySystemu × (1 − stineniProc / 100)`; `boosterWhDen = proudBoosteruA × hodinDenne × Unom`; `bilanceWhDen = vyrobaWhDen + boosterWhDen − WhDenne`.
- `kapacitaWh = kapacitaAh × Unom × vyuzitelnost`. Simulace po dnech d = 1 … dniSimulace: začíná se plnou baterií (`stav = kapacitaWh`); každý den `stav = min(kapacitaWh, stav + bilanceWhDen)`; když `stav ≤ 0`, je to **den vybití** (první takový den je výsledek `dnyBezPripojky = d − 1`, stav se zapíše jako 0 a simulace pokračuje od 0); když `pripojkaKazdychDni > 0` a `d` je jeho násobek, na konci dne `stav = kapacitaWh`. Výstup `prubeh` je pole délky `dniSimulace`: `prubeh[d − 1]` = stav v % kapacity na konci dne d (upřesněno 16. 11. 2026, Q2). Index měsíce: `kWhNaKWpDen[mesic − 1]`.
- `dnyBezPripojky`: první den vybití − 1; když za `dniSimulace` k vybití nedojde, `null` (= vydrží celou dobu) a příznak `vydrzi = true`.
- `bilancePoMesicich[12]` = `bilanceWhDen` pro každý měsíc daného města (ostatní vstupy stejné).
- **Co pomůže nejvíc** (bez cen): spočítat `dnyBezPripojky` (null = dniSimulace + 1 pro porovnání) pro varianty: baterie +100 Ah, panely +100 Wp, booster +10 A (jen když `hodinDenne > 0`), spotřeba −10 %. Výstup `coPomuze: [{ varianta: "BATERIE_100AH" | "PANELY_100WP" | "BOOSTER_10A" | "SPOTREBA_MINUS_10", dnyBezPripojky, prinosDni }]` seřazený podle `prinosDni` sestupně, při shodě v uvedeném pořadí.
- Hlášky: `BILANCE_KLADNA` když `bilanceWhDen ≥ 0` (solár a jízda pokryjí spotřebu); `ZIMA_MALO_SLUNCE` když `kWhNaKWpDen[mesic] < 1`.

## Testy (píše `tester`)

Pro každou funkci: příklady spočítané ručně (`tests/priklady/kalkulacky-alfa.md`), neplatné vstupy, hrany rozsahů, hlášky. Příklady ze zadání (vaření, baterie) musí sedět. U soběstačnosti test s vlastní malou tabulkou měst (funkce bere tabulku jako volitelný parametr `data`), aby nezávisel na hodnotách, které ještě ověřuje rešeršér.
