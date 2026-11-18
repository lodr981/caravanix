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

Upraveno 17. 11. 2026 na Radkův pokyn (booster nejede celou jízdu na plný proud). Podklad `docs/karty/BOOSTER_REALNE.md`, karty K-BOOST-0001 a 0002.

`nabitiZJizdy({ napeti: 12 | 24, proudBoosteruA, hodinJizdyDenne, koeficient = 0.7, koeficientPlna = 0.2, kapacitaAh?, startProc? })`

- Rozsahy: proudBoosteruA 1 až 100, hodinJizdyDenne 0 až 24, koeficient 0,3 až 1, koeficientPlna 0 až 1, kapacitaAh 10 až 2 000, startProc 0 až 100. `kapacitaAh` a `startProc` jsou volitelné, ale buď obě, nebo žádná (jinak `NEPLATNY_VSTUP` s polem chybějící z nich).
- **Bez stavu baterie** (`kapacitaAh` a `startProc` chybí): `AhDenne = proudBoosteruA × koeficient × hodinJizdyDenne`.
- **Se stavem baterie:** do 90 % nabití nabíjí průměrně `I1 = proudBoosteruA × koeficient`, nad 90 % jen `I2 = proudBoosteruA × koeficientPlna`.
  - `doDevadesati = max(0, kapacitaAh × (0,9 − startProc / 100))`; `t1 = min(hodinJizdyDenne, doDevadesati / I1)` (když `doDevadesati = 0`, `t1 = 0`); `Ah1 = I1 × t1`;
  - `zbyvaDoPlna = kapacitaAh × (1 − max(startProc / 100, 0,9))`; `Ah2 = min(zbyvaDoPlna, I2 × (hodinJizdyDenne − t1))`;
  - `AhDenne = Ah1 + Ah2`; `konecProc = startProc + AhDenne / kapacitaAh × 100`.
- Vždy: `WhDenne = AhDenne × Unom`; `naivniAh = proudBoosteruA × hodinJizdyDenne` (kdyby jel celou dobu naplno); `prumernyProudA = AhDenne / hodinJizdyDenne` (při 0 h je 0).
- Hlášky: `LITHIUM_BOOSTER` vždy; `DOBITO_DO_PLNA` když `konecProc ≥ 100` (jen se stavem baterie).
- Příklady (30 A, 12 V, 100 Ah, koeficienty 0,7 / 0,2): 1 h z 30 % → 21,0 Ah, konec 51 %; 3 h z 30 % → 60,857… Ah, konec 90,857… %; 3 h ze 70 % → 30,0 Ah, konec 100 % (`DOBITO_DO_PLNA`).

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
- `vyrobaWhDen(mesic) = panelyWp / 1000 × kWhNaKWpDen[mesic] × 1000 × ztratySystemu × (1 − stineniProc / 100)`; `boosterWhDen = proudBoosteruA × koeficientBoosteru × hodinDenne × Unom`, kde `koeficientBoosteru` je vstup `jizda.koeficient` (výchozí 0,7, rozsah 0,3 až 1; K-BOOST-0001; upraveno 17. 11. 2026); `bilanceWhDen = vyrobaWhDen + boosterWhDen − WhDenne`.
- `kapacitaWh = kapacitaAh × Unom × vyuzitelnost`. Simulace po dnech d = 1 … dniSimulace: začíná se plnou baterií (`stav = kapacitaWh`); každý den `stav = min(kapacitaWh, stav + bilanceWhDen)`; když `stav ≤ 0`, je to **den vybití** (první takový den je výsledek `dnyBezPripojky = d − 1`, stav se zapíše jako 0 a simulace pokračuje od 0); když `pripojkaKazdychDni > 0` a `d` je jeho násobek, na konci dne `stav = kapacitaWh`. Výstup `prubeh` je pole délky `dniSimulace`: `prubeh[d − 1]` = stav v % kapacity na konci dne d (upřesněno 16. 11. 2026, Q2). Index měsíce: `kWhNaKWpDen[mesic − 1]`.
- `dnyBezPripojky`: první den vybití − 1; když za `dniSimulace` k vybití nedojde, `null` (= vydrží celou dobu) a příznak `vydrzi = true`.
- `bilancePoMesicich[12]` = `bilanceWhDen` pro každý měsíc daného města (ostatní vstupy stejné).
- **Co pomůže nejvíc** (bez cen): spočítat `dnyBezPripojky` (null = dniSimulace + 1 pro porovnání) pro varianty: baterie +100 Ah, panely +100 Wp, booster +10 A (jen když `hodinDenne > 0`), spotřeba −10 %. Výstup `coPomuze: [{ varianta: "BATERIE_100AH" | "PANELY_100WP" | "BOOSTER_10A" | "SPOTREBA_MINUS_10", dnyBezPripojky, prinosDni }]` seřazený podle `prinosDni` sestupně, při shodě v uvedeném pořadí.
- Hlášky: `BILANCE_KLADNA` když `bilanceWhDen ≥ 0` (solár a jízda pokryjí spotřebu); `ZIMA_MALO_SLUNCE` když `kWhNaKWpDen[mesic] < 1`.

## Testy (píše `tester`)

Pro každou funkci: příklady spočítané ručně (`tests/priklady/kalkulacky-alfa.md`), neplatné vstupy, hrany rozsahů, hlášky. Příklady ze zadání (vaření, baterie) musí sedět. U soběstačnosti test s vlastní malou tabulkou měst (funkce bere tabulku jako volitelný parametr `data`), aby nezávisel na hodnotách, které ještě ověřuje rešeršér.

## H. Průvodce zapojením (Radek 17. 11. 2026: „tvorbu zapojení obrázkovou“)

`navrhZapojeni(vstup)` v `packages/engine/src/zapojeni.ts` sestaví z výběru komponent projekt pro živé schéma. Průřez a pojistku každého kabelu pak dává `navrhSchematu` (kalkulačka průřezu v1.1, plus i mínus kabelem, samostatně).

1. **Vstupy:** `napeti` 12 / 24; `baterieAh` 10–2000; `solarWp` 0 nebo 10–3000; `boosterA` 0 nebo 5–100; `nabijeckaA` 0 nebo 2–100; `menicW` 0 nebo 50–5000; `spotrebice` nejvýš 8 (jedinečné `id`, `prikonW` 0,1–3000, `ubytekProc` 3 / 5 / 10, `rezimy`); `delky` podle id kabelu 0,1–100 m. Jinak `{stav:"chyba", hlasky:["NEPLATNY_VSTUP"], pole}`.
2. **Solár:** proud z panelů = `solarWp / U` (U = jmenovité napětí LiFePO4 12,8 / 25,6 V). Regulátor = nejbližší vyšší z řady 10, 15, 20, 30, 40, 50, 60, 70, 85, 100 A; nad 100 A hláška `REGULATOR_NAD_100A` a regulátor 100 A. Kabel regulátor → baterie na jmenovitý proud regulátoru, úbytek 3 %, režim den. Kabel panel → regulátor se nepočítá (`druh: "solar"`).
3. **Booster:** vstup startovací baterie → booster = `boosterA × 1,1` (ztráta 10 %, jako R1), výstup booster → baterie = `boosterA`, úbytek 3 %, režim jízda.
4. **Nabíječka z 230 V:** nabíječka → baterie = `nabijeckaA`, úbytek 3 %, režim kemp. Přívod 230 V se nepočítá (`druh: "ac"`, elektrikář).
5. **Spotřebiče:** každý svým kabelem z pojistkové skříňky (příkon, vlastní úbytek a režimy). Hlavní vedení baterie → skříňka = součet příkonů všech spotřebičů (všechny najednou), úbytek 3 %.
6. **Měnič:** přímo z baterie s vlastní pojistkou, proud = `navrhMenice` (účinnost 0,9, jmenovité napětí); nad 150 A hláška `MENIC_NAD_150A`. Režimy den, noc, kemp.
7. **Výchozí délky:** regulátor 1,5 m, startovací → booster 4 m, booster 1 m, nabíječka 1 m, skříňka 0,5 m, měnič 1 m, spotřebič 3 m.
8. **Rozložení:** zdroje vlevo (každý svým řádkem), baterie ve 3. sloupci uprostřed, skříňka a měnič ve 4., spotřebiče v 5.
9. **Výstup:** `{ stav:"ok", projekt, regulatorA, proudSolaruA, proudMeniceA, hlasky }`.

## I. Doplňky po revizi kalkulaček (Radek 18. 11. 2026: „všechno nalezené oprav“)

Revize `docs/testy/REVIZE_KALKULACEK_A.md` a `_B.md`. Všechno jsou **nové volitelné vstupy a nové výstupy**; bez nich se dosavadní výsledky a hlášky nemění.

1. **bilanceSpotrebicu:** `WhVareniDenne` (0–50 000, výchozí 0) → `WhVareni`, `WhDenneCelkem = WhDenne + WhVareniDenne`, `AhDenneCelkem = WhDenneCelkem / Unom`; `maxProudBmsA` (1–1 000) → `nadBms = proudSoucasne > maxProudBmsA` (bez vstupu false).
2. **kolikUvarim:** `ucinnostVareni` (0,3–1, výchozí 0,85), `jidelDenne` (0–20, výchozí 0) → `litruVodyZadane = WhVyuzitelne / ohrevVody({ litry: 1, ucinnostVareni, ucinnostMenice }).WhZBaterie`, `WhVareniDenne = jidelDenne × WhNaJidlo`, `proudVareni = prikonW / ucinnostMenice / Unom`. Pole `litruVody` zůstává (výchozí účinnosti).
3. **navrhMenice:** `model: "porad-jeden"` – spotřebič `porad` (výchozí true) běží pořád, ostatní jsou velké a běží vždy jen jeden: `trvalyVykonW = Σ pořád + max(velké)`; `spickaW = trvalyVykonW + max(pořád × (rozběh − 1), velký × rozběh − max(velké))`. `maxProudBmsA` → `nadBms`; `nadMezKabelu = proudZBaterie > 200`.
4. **nabitiZJizdy:** `napetiVozu` (12/24, výchozí = napeti) → `vstupniProudA = proud × napeti / napetiVozu × 1,1`; `alternatorA` (20–500) a `podilAlternatoru` (0,1–1, výchozí 0,5) → `nadAlternator = vstupniProudA > alternatorA × podil`; `maxNabijeciA` → `nadNabijeci = proud > maxNabijeciA`; `spotrebaWhDen` → `podilSpotrebyProc = WhDenne / spotrebaWhDen × 100`.
5. **zapojeniPanelu:** `regulator.nabijeciProudA` → `maxWpRegulatoru = nabijeciProudA × Unom`, `regulatorOmezi = WpPole > maxWpRegulatoru`; `regulator.minRozdilV` → `vmpNizke = serie × Vmp < Unom + minRozdilV`; `napeti` (výchozí 12).
6. **sobestacnost:** `potrebaWp = max(0, WhDenne − boosterWhDen) / výroba 1 Wp v měsíci` (0, když stačí jízda; ∞, když je výroba 0), `potrebaWpSezona` (max duben–září), `potrebaWpRok` (max 1–12); `dnuPrazdna` = počet dní s 0 %; `upozorneni`: `MALO_SLUNCE` při ≤ 1,5 kWh/kWp, `MRAZ` v listopadu až únoru; `dnyPresne = kapacitaWh / −bilanceWhDen` (jen při záporné bilanci); `stavPo3DnechBezSlunceProc = max(0, kapacitaWh − 3 × max(0, WhDenne − boosterWhDen)) / kapacitaWh × 100`; `zmenaBilance` Wh/den pro varianty (baterie 0, panely výroba 100 Wp, booster 10 A × koeficient × hodiny × Unom, spotřeba 10 %).
7. **navrhZapojeni:** spotřebič `vyrobce` → kabel s `vyrobce` a `navrhSchematu` použije `navrhSVyrobcem` (průřez, pojistka, max. pojistka a úbytek výsledného kabelu); `napetiVozu` → vstup boosteru × napeti / napetiVozu; `privodNaPojistky` → přívod skříňky `proudA = Σ pojistek okruhů / 1,25`, kde pojistka okruhu je z `navrhSVyrobcem` u spotřebiče s výrobcem, jinak z `navrhVodice` (oprava po nálezu testera 18. 11.); výstupy `hlavniProudA = max(odběr skříňka + měnič, nabíjení regulátor + booster + nabíječka)`, `hlavniPojistkaA` = nejmenší z řady v1.1 ≥ 1,25 × hlavniProudA (jinak null); `maxProudBmsA` → `nadBms` (odběr), `maxNabijeciA` → `nadNabijeci` (nabíjení).

## K. Úplné zapojení (Radek 18. 11. 2026: „v zapojení chybějí pojistky, musí obsáhnout všechny situace“)

`navrhZapojeni({ …, uplne: true, zasuvky230? })` – po sestavení projektu (kap. H a I) se projekt přestaví:

1. **Přípojnice** `sbernice` (typ `sbernice`): nabíjení i odběry se připojí k ní. Kabely se přejmenují a dostanou místo pojistky `pojistkaU`: `regulator-sbernice`, `booster-sbernice`, `nabijecka-sbernice` → `do` (pojistka u přípojnice); `sbernice-rozvod`, `sbernice-menic` → `od`; `startovaci-booster` → `obe` (u startovací baterie i u boosteru). Délky se přebírají z původních kabelů, přepis přes `delky` pod novým id.
2. **Hlavní vedení** `baterie-sbernice`: `proudA = hlavniProudA`, délka 0,5 m (`VYCHOZI_DELKY_UPLNE`), `pojistkaU: "zadna"`, prvky v pořadí hlavní pojistka (`hodnotaA = hlavniPojistkaA`, když není null), vypínač, bočník.
3. **Prvky v cestě:** `panel-regulator` → odpojovač FV; `sit-nabijecka` → chránič s jističem; při měniči a `zasuvky230` (výchozí true, když je měnič) komponenta `zasuvky230` a kabel `menic-zasuvky230` (`druh: "ac"`), s prvkem přepínač, když je přípojka 230 V.
4. **Rozložení:** sloupec 0 zdroje (panel, startovací baterie, přípojka) v řádku svého měniče; 1 regulátor, booster, nabíječka a pod nimi baterie; 2 přípojnice uprostřed; 3 pojistková skříňka a měnič; 4 spotřebiče a zásuvky 230 V.
5. `navrhSchematu` vrací u kabelu `pojistkaU` (výchozí `od`, u solárních a AC `zadna`) a `prvky` (výchozí []).
6. Výstupy `hlavniProudA`, `hlavniPojistkaA`, `nadBms`, `nadNabijeci` se počítají z původních kabelů (před přestavbou) a nemění se.

## J. Podrobná spotřeba: sezóny, střída, použití × minuty, trvalé odběry (Radek 18. 11. 2026: „pokud počítám, jakou budu mít výdrž, chci proklik z denní spotřeby, která bude sofistikovanější“)

Rozšíření `bilanceSpotrebicu` (oddíl A) jen o **nové volitelné vstupy a výstupy**; bez nich se dosavadní výsledky a hlášky nemění. Žádné nové koeficienty: katalog (`packages/data/src/spotrebice.json`, karty K-SPOTR) má jen jednu hodnotu `hodinDenne`, proto kalkulačka předvyplní stejné hodiny pro všechny sezóny a uživatel je u každého spotřebiče může změnit.

1. **Vstup `sezona`** `"leto" | "jaroPodzim" | "zima"` (jinak `NEPLATNY_VSTUP`, pole `sezona`): pro kterou sezónu se počítá hlavní výsledek (`polozky[i].WhZBaterie`, `WhDenne`, `WhDenneCelkem`, `AhDenne…`). Bez něj platí `hodinDenne`.
2. **Položka – hodiny chodu `h`** (v tomto pořadí):
   - `trvale: true` (trvalý odběr, standby: regulátor, monitor baterie, měnič naprázdno, alarm) → `h = 24` ve všech sezónách; `hodinDenne` není povinné, střída se nepoužije.
   - `pouzitiDenne` (0–100) a `minutNaPouziti` (0–1 440), když je zadané aspoň jedno z nich (obě pak povinná) → `h = pouzitiDenne × minutNaPouziti / 60`; `h > 24` → `NEPLATNY_VSTUP`, pole `polozky[i].minutNaPouziti`. `hodinDenne` není povinné, střída se nepoužije.
   - jinak `h = (hodinSezona[sezona] ?? hodinDenne) × stridaProc / 100`; `hodinSezona` = `{ leto?, jaroPodzim?, zima? }` po 0–24 (pole `polozky[i].hodinSezona.zima` …), `stridaProc` 0–100, výchozí 100.
   - Dál beze změny: `WhSpotrebic = prikonW × h`, `WhZBaterie` (na 230 V děleno účinností měniče), proud položky na hodinách nezávisí.
3. **Nové výstupy:** `polozky[i].hodinChodu` (h pro zvolenou sezónu), `polozky[i].WhSezony` (Wh z baterie pro každou sezónu); `sezona` (vstup nebo null); `sezony.{leto, jaroPodzim, zima}` = `{ WhDenne, WhDenneCelkem = WhDenne + WhVareniDenne, AhDenneCelkem = WhDenneCelkem / Unom }` (vaření je ve všech sezónách stejné); `poradi` = indexy položek od největšího `WhZBaterie` po nejmenší (shoda: nižší index první); `WhTrvale` = součet `WhZBaterie` položek s `trvale: true`.
4. **Kalkulačka spotřebičů:** volba sezóny; u každého spotřebiče forma zadání „hodiny za den“ (s volitelnou střídou a volbou „liší se podle sezóny“ – tři pole předvyplněná katalogovou hodnotou) nebo „použití × minuty“ (vaření z katalogu, které nemá hodiny); sekce „Běží pořád“ (W × 24 h); výsledek pro zvolenou sezónu, přehled tří sezón, největší žrouti podle `poradi`, proud všeho najednou proti BMS (oddíl I).
5. **Proklik výdrž ↔ spotřeba:** kalkulačka baterie a soběstačnosti mají u pole „Spotřeba za den“ tlačítko do kalkulačky spotřebičů s `?zpet=baterie` / `?zpet=sobestacnost` (svůj stav si uloží do `sessionStorage`, klíč `caravanix.navrat`). Kalkulačka spotřebičů pak ukáže tlačítko zpět bez změny a pod výsledkem „Použít v kalkulačce …“, které vrátí uložený stav s novou spotřebou `wh = round(WhDenneCelkem)` a napětím přes `?s=…&z=spotrebice`; cílová kalkulačka to oznámí komponentou `Prevzato` a uloží do cesty. Seznam spotřebičů si prohlížeč pamatuje po dobu relace (`caravanix.spotrebice`).
