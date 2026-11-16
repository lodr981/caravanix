# Kalkulačka průřezu a jištění

## Stav

- Verze 1: logiku Radek schválil 11. 11. 2026. Reference `docs/reference/kalkulacka-prurezu-v1.html` (přesná kopie stránky „12 V rozvod – průřez a pojistka“, artefakt 1794384920-4c0b). **Zůstává jako historie**, v enginu jako `v1`.
- **Verze 2: platná.** Radek ji rozhodl 16. 11. 2026 po nálezech ověřovatele ve dvou kolech (`docs/ROZHODNUTI.md`); druhé kolo nahradilo uložení, pojistky a odpor vodiče. Níže je její úplný popis; podle něj tester píše nezávislou referenci a golden test.
- V alfě dostane kalkulačka nový design, nové texty a nápady skupiny A 1–6.

## Verze 2: co platí (bez souhlasu Radka se nemění)

### Tabulky beze změny proti v1

- `MM`, `AMP` (DIN VDE 0298-4; 12 A pro 0,5 mm² zůstává se zdrojem Lapp), `AWG`, `CAPN`, `CAPH` (rozhodnutí odborníka, Radek).
- Interpolace `amp()` a `interp()` (log-log), beze změny.

### Nové datové tabulky (v `packages/data`, každá hodnota má kartu)

- **Odpor vodiče podle průřezu** `rho(a)` [Ω·mm²/m] pro každý průřez z `MM`: do 70 mm² horní mez z datasheetu FLRY-B, pro 95 a 120 mm² max. odpor třídy 5 podle IEC 60228 (Lapp T11): 0,0196 a 0,0193. Soubor `packages/data/src/odpor-vodicu.json`.
- **Pojistky Littelfuse:** pro každou nabízenou jmenovitou hodnotu rodina a dovolený trvalý proud podle tabulky výrobce při 20 °C a při 65 °C. Soubor `packages/data/src/pojistky.json`. Nabízí se jen:
  - nožová ATOF: 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30 A,
  - šroubovací MIDI: 40, 50, 60, 70, 80, 100, 125 A,
  - MEGA: 150, 175, 200, 225, 250 A.

  MINI, MAXI a 35 A se nenabízejí; zkratové ochrany (MIDI 150–200 A, MEGA 300 A a víc) nikdy.

Formát datových souborů (plní `reserser`, ověřuje `overovatel`):

- `packages/data/src/odpor-vodicu.json`: `{ "verze": "<datum>", "polozky": [{ "prurez": 0.5, "odporOhmKm": <max. odpor ze zdroje>, "rho": <odporOhmKm × prurez / 1000, zaokrouhleno na 4 desetinná místa>, "karta": "K-VODIC-…" }, …] }` pro všech 15 průřezů z `MM`.
- `packages/data/src/pojistky.json`: `{ "verze": "<datum>", "polozky": [{ "rodina": "ATOF" | "MIDI" | "MEGA", "jmenovita": <A>, "trvaly20": <A>, "trvaly65": <A>, "karta": "K-VODIC-…" }, …] }` seřazené podle jmenovité hodnoty, jen nabízené hodnoty. Hodnoty I20 a I65 přesně podle tabulky výrobce (bez zaokrouhlení); I30 se nepočítá do souboru, dopočítá ho engine podle bodu 4.

### Uložení

| Kód | Volba | Násobek délky n | Koeficient k | Strop pojistky | Poznámka |
| --- | --- | --- | --- | --- | --- |
| `par` | plus a mínus vedle sebe, připevněné k povrchu (výchozí) | 2 | 0,76 | `CAPN` | |
| `kostra` | jeden vodič, mínus přes kostru | 1 | 1,0 | `CAPN` | |
| `svazek` | ve svazku, nejvýš 3 obvody | 2 | 0,53 | `CAPH` | obvod = jeden spotřebič s plusem a mínusem |
| `motor` | motorový prostor | – | – | – | **nepočítá se**, jen hláška |

Kalkulačka počítá s teplotou okolí do 30 °C.

### Výpočet

Vstupy: napětí U (12 / 24 V), režim (příkon P ve W, nebo proud I v A), hodnota v, délka jedné cesty L [m], úbytek d (3 / 5 / 10 %), uložení.

1. Pokud v ani L není kladné číslo (`!(v > 0) || !(L > 0)`): chyba `NEPLATNY_VSTUP`.
2. Uložení `motor`: chyba `MOTOR_NEPOCITA` (bez dalšího výpočtu, bez proudu).
3. Proud I = v / U v režimu P, jinak I = v.
4. Dovolený trvalý proud pojistky při 30 °C: I30 = I20 + (I65 − I20) × (30 − 20) / (65 − 20).
5. Pojistka = nejmenší nabízená jmenovitá hodnota, pro kterou I30 ≥ I. Žádná: chyba `HLAVNI_VEDENI` (vrací i proud).
6. `maxFuse(a, uložení)` = největší nabízená jmenovitá hodnota f, pro kterou f ≤ min(amp(a) × k, interp(strop, a)) + 1e-9; žádná → 0.
7. Dovolený úbytek dU = U × d / 100. Průřez = první a z `MM`, pro který platí ρ(a) × L × n × I / dU ≤ a (úbytek) a zároveň maxFuse(a) ≥ pojistka. Žádný: chyba `ANI_120_NESTACI` (vrací i proud).
   Pozn.: úbytek se počítá ve tvaru ΔU(a) = ρ(a) × L × n × I / a ≤ dU; obě formy jsou totožné, závazná je **ΔU(a) ≤ dU** (výpočet ΔU zleva doprava, porovnání bez tolerance).
8. Co rozhodlo: iDrop = index prvního `MM`, pro který ΔU(a) ≤ dU; iFuse = index prvního `MM` s maxFuse ≥ pojistka. iDrop ≥ iFuse → úbytek, jinak oteplení.
9. AWG = první z `AWG`, jehož plocha p splní obě podmínky z bodu 7. Odpor pro plochu AWG: když p je rovno průřezu z `MM`, jeho ρ; jinak **větší** ρ ze dvou sousedních průřezů `MM` (pod 0,5 mm² ρ(0,5), nad 120 mm² ρ(120)). Rozhodl Radek 16. 11. 2026. Žádný → null.
10. Výstupy: úbytek ΔU = ρ(A) × L × n × I / A, úbytek v % = ΔU / U × 100, napětí u spotřebiče U − ΔU, ztráta ΔU × I, pojistka a její rodina, max. pojistka maxFuse(A), příkon (v režimu P zadaná hodnota, jinak I × U), max. délka = dU × A / (ρ(A) × n × I).
11. Hlášky (kódy, v tomto pořadí): `ROZHODL_UBYTEK` nebo `ROZHODLO_OTEPLENI`; `MINUS_PRES_KOSTRU` při uložení `kostra`; `SVAZEK_NEJVYS_3_OBVODY` při uložení `svazek`; `NAD_150A_12V` při I > 150 A a U = 12 V; `MENIC_OD_1000W` v režimu P při v ≥ 1 000 W.
12. Texty (v `content/cs/`, ne v enginu):
    - `HLAVNI_VEDENI`: jde o hlavní vedení, patří k němu pojistka Class T u baterie a návrh odborníkem.
    - `MOTOR_NEPOCITA`: „V motorovém prostoru použijte kabel pro vyšší teplotu (třída C 125 °C nebo D 150 °C) a dimenzujte podle tabulky jeho výrobce.“
    - `SVAZEK_NEJVYS_3_OBVODY`: výpočet platí nejvýš pro 3 obvody ve svazku; při více: „Silové kabely veďte zvlášť, nebo svazek rozdělte.“
    - U každého výsledku: „Vede-li kabel teplým místem (u topení, pod plechem na slunci), zvolte o stupeň silnější.“

### Referenční tabulka

14 řádků pro `MM[0]` až `MM[13]` (stejně jako v1; 120 mm² v tabulce není): průřez, ρ, nejbližší AWG (podle logaritmu plochy, jako v1), max. pojistka pro uložení `par`, `kostra` a `svazek` a délka jedné cesty pro uložení `par` na 12 V při proudu rovném max. pojistce `par`: délka 3 % = 0,36 × a / (2 × ρ(a) × f), délka 10 % = 1,2 × a / (2 × ρ(a) × f).

### Historie verze 2

- První kolo (16. 11. 2026): ρ 0,0191 / 0,0236, uložení 0,8 / 1,0 / 0,53 / 0,5, pojistka ≥ 1,25 × proud. **Nahrazeno** druhým kolem téhož dne.

## Port do enginu

- `packages/engine/src/vodic.ts`: verze 2, `navrhVodice({ napeti, rezim, hodnota, delka, ubytekProc, ulozeni })`. Vrací průřez, AWG, pojistku a její rodinu, max. pojistku, proud, příkon, úbytek ve V a %, napětí u spotřebiče, ztrátu, max. délku, co rozhodlo a seznam hlášek (kódy, ne texty). Datové tabulky bere z `@caravanix/data`.
- `packages/engine/src/vodic-v1.ts`: verze 1 beze změny, exportovaná jako `v1` (historie, má vlastní golden test).
- Texty hlášek jsou v `content/cs/`, engine vrací jen kódy a čísla.

## Golden test (píše `tester`, ne hlavní vlákno)

**Verze 2:** tester napíše nezávislou referenci podle kapitoly „Verze 2: co platí“, ne z kódu enginu, a golden test proti ní:

1. Mřížka: 12 a 24 V × příkon i proud × úbytek 3, 5 a 10 % × všechna čtyři uložení × proud 0,5 A až nad mez rozsahu (alespoň 40 hodnot, včetně hran u každé pojistky, tedy kolem I30 každé nabízené hodnoty) × délka 0,2 až 20 m (alespoň 15 hodnot) a délky pro `ANI_120_NESTACI`. Datové tabulky z `packages/data` test čte, ale zkontroluje, že každá hodnota má kartu.
2. Přesně musí sedět: stav, průřez, AWG, pojistka, max. pojistka, co rozhodlo, kódy hlášek a jejich pořadí. Spojitá čísla s tolerancí 1e-9.
3. Referenční tabulka řádek po řádku.
4. Ruční příklady s postupem v `tests/priklady/` (aspoň jeden pro každé počítané uložení, jeden pro každou rodinu pojistek a jeden pro průřez 95 nebo 120 mm²).

**Verze 1:** golden test proti `docs/reference/kalkulacka-prurezu-v1.html` zůstává a testuje `v1`.

Jakýkoli rozdíl je chyba enginu, ne reference.

## Karty tvrzení z kalkulačky

`reserser` z kalkulačky a jejích textů vytvoří karty a `overovatel` je ověří stejně jako ostatní. **Nálezy jdou Radkovi, výpočet sám nikdo nemění.** K ověření zvlášť:

- ρ mědi při 20 °C a hodnota 0,0216 pro teplé prostředí (jaké teplotě odpovídá)
- tabulka zatížitelnosti podle DIN VDE 0298-4 (podmínky: jednožilový kabel ve vzduchu, PVC 70 °C, okolí 30 °C)
- snížení zatížitelnosti na 70 % ve svazku
- „automobilové kabely snesou obvykle 105 °C“
- tvrzení o CCA, že má „o asi 60 % horší vodivost“: zkontrolovat číslo i formulaci, protože se dá číst dvojím způsobem
- přibližné vzorce 10 × A ÷ I a 34 × A ÷ I (platí pro 12 V a 3 % / 10 %)
- `CAPN` a `CAPH` jsou Radkovo rozhodnutí z praxe. Karta se zdrojem typu `rozhodnuti-odbornika`, schválil Radek.

## Nový design a texty

- Zachovat všechny vstupy a výstupy. Uspořádání, vzhled a pořadí navrhuje designér.
- Texty přepíše `autor-zeme` (cs) do tónu webu. Fakta zůstávají a každé má kartu.
- Příručka ze spodní části stránky se rozdělí do lekcí v příručce. U kalkulačky zůstane krátké „jak na to“ a odkazy na lekce.

## Nápady navíc

### Skupina A: jen rozhraní, výpočet se nemění (do alfy)

1. **Řez kabelem ve skutečném měřítku.** Kolečko průřezu s mm² a AWG vedle sebe. Laik uvidí, jak tlustý kabel kupuje.
2. **Vodič zbarvený podle zatížení:** podíl proudu k max. pojistce kabelu, se slovem i ikonou, ne jen barvou.
3. **Posuvník délky a příkonu** s okamžitým přepočtem a značkou „tady už potřebujete o stupeň silnější kabel“. Spočítá se ze zmrazených funkcí.
4. **Nákupní lístek:** průřez, kolik metrů (délka × počet vodičů) s poznámkou „přičtěte 10–20 % na rezervu“ (text z reference), pojistka a držák pojistky. Lze vytisknout.
5. **Karta výsledku ke sdílení:** obrázek a odkaz se stavem v URL pro WhatsApp a e-mail.
6. **Obrácený režim „Mám kabel“:** zadám průřez a délku, dostanu max. pojistku a max. proud pro daný úbytek. Používá jen funkce verze 2.
7. **Rychlá volba spotřebiče** (lednice, měnič 1 000 W, LED pásek a další): vyplní příkon z katalogu spotřebičů. Jen se schválenou kartou spotřebiče.

Radek 16. 11. 2026: **do alfy 1–6**, nápad 7 až po schválení karet spotřebičů.

### Skupina B: mění výpočet (jen se souhlasem Radka, mimo alfu)

- přepínač „kabel CCA / nevím, jaký kabel“ (CCA se nedoporučuje, rozhodnutí 16. 11. 2026)
- teplota okolí jako číslo místo voleb uložení
- 48 V
- odpor spojů na kostře
- volba pomalé pojistky pro spotřebiče s rozběhovým proudem
- (motorový prostor jako samostatné uložení je ve verzi 2)

## Akceptační kritéria pro alfu

- [ ] Golden test verze 2 prochází na celé mřížce (a golden test v1 dál prochází proti `v1`).
- [ ] Výsledek se přepočítá do 100 ms po změně vstupu na průměrném telefonu.
- [ ] Všechny nápady ze skupiny A, které Radek potvrdí, fungují včetně tmavého režimu a 200% zvětšení.
- [ ] Odkaz se stavem otevře stejný výsledek.
- [ ] Designér stránku schválil.
- [ ] Čtenář laik splnil úkol „spočítejte kabel k lednici 60 W vzdálené 5 m od baterie“ bez zaseknutí.
- [ ] Všechny karty kalkulačky jsou schválené.
