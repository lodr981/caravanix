# Kalkulačka průřezu a jištění

## Stav

- **Verze 1.1: platná** (Radek, reset 16. 11. 2026, `docs/reset/KALKULACKA_V1_1.md`). Výpočet z reference v1 se čtyřmi změnami níže. Nic dalšího se nemění.
- Verze 1 (schválená 11. 11. 2026, reference `docs/reference/kalkulacka-prurezu-v1.html`, artefakt 1794384920-4c0b) je základ v1.1 a v enginu zůstává jako `v1` s vlastním golden testem.
- Verze 2 (obě kola z 16. 11. 2026: tabulky pojistek Littelfuse, koeficienty 0,76 / 0,53 / 0,5, odpor podle průřezu) je **nahrazená** a leží v `docs/ZASOBNIK.md`. Kód zůstává jako archiv `v2` (`packages/engine/src/vodic-v2.ts`), na webu se nepoužívá.

## Verze 1.1: co platí (bez souhlasu Radka se nemění)

### Proč platí v1

Tabulka VDE 0298-4 je pro PVC kabel 70 °C, automobilový kabel FLRY-B (ISO 6722, třída B) snese 105 °C a zatížitelnost roste s odmocninou dovoleného oteplení: √((105 − 30) / (70 − 30)) ≈ 1,37. Stejný vzorec dává koeficienty IEC pro PVC 70 °C (0,87 při 40 °C, 0,50 při 60 °C). Proto svazek 0,53 × 1,37 ≈ 0,73 → koeficient 0,7 z v1 platí; plus a mínus vedle sebe na povrchu 0,76 × 1,37 ≈ 1,04 → koeficient 1,0 z v1 platí; stropy CAPN a CAPH platí jako rozhodnutí odborníka.

### Beze změny z v1

- Tabulky `MM`, `AMP` (DIN VDE 0298-4), `AWG`, `CAPN`, `CAPH`.
- Měrný odpor mědi 0,0175 Ω·mm²/m, ve svazku 0,0216 Ω·mm²/m a zatížitelnost 70 %.
- Interpolace `amp()`, `interp()` (log-log) a `maxFuse()`.
- Průřez = nejmenší z `MM`, který splní úbytek napětí i `maxFuse ≥ pojistka`. AWG = první, který splní totéž. Co rozhodlo, úbytek, ztráta, napětí u spotřebiče a max. délka jako v1.
- Vstupy: napětí 12 / 24 V, příkon nebo proud, délka jedné cesty, úbytek 3 / 5 / 10 %, zpětný vodič vlastní (×2) nebo přes kostru (×1), prostředí samostatně (`n`) nebo ve svazku (`h`).
- Hlášky v1: neplatný vstup; ani 120 mm² nestačí; rozhodl úbytek / oteplení; mínus přes kostru; přes 150 A na 12 V; měnič od 1 000 W.

### Čtyři změny proti v1

1. **Pojistka** = nejbližší hodnota z `FUSES` alespoň **1,25 ×** proud (místo 1,1×).
2. **300 A ze seznamu `FUSES` pryč** (MEGA 300 A je jen zkratová ochrana). Platí i pro `maxFuse()`. Mez rozsahu = největší pojistka ÷ 1,25 = 200 A: když žádná pojistka z `FUSES` není ≥ 1,25 × proud, výsledek je chyba `HLAVNI_VEDENI` (vrací i proud) s hláškou „Hlavní vedení: pojistka Class T u baterie, řiďte se návodem výrobce a návrhem odborníka.“
3. **Nad 150 A** (při jakémkoli napětí) navíc hláška `NAD_150A_MENIC`: „U měniče platí kabel a pojistka podle návodu výrobce měniče. Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu.“
4. Režim „Ve svazku / motorový prostor“ se jmenuje **„Ve svazku“**. Výpočet zůstává (0,7, ρ 0,0216). Pod volbami text: „V motorovém prostoru použijte kabel pro vyšší teplotu (třída C nebo D) a dimenzujte podle tabulky jeho výrobce.“

### Pořadí hlášek (kódy)

`ROZHODL_UBYTEK` nebo `ROZHODLO_OTEPLENI`; `MINUS_PRES_KOSTRU` při zpětném vodiči přes kostru; `NAD_150A_12V` při proudu nad 150 A a 12 V; `NAD_150A_MENIC` při proudu nad 150 A; `MENIC_OD_1000W` v režimu příkon od 1 000 W. Chyby: `NEPLATNY_VSTUP`, `HLAVNI_VEDENI`, `ANI_120_NESTACI` (chybový výsledek nese jen svůj kód).

### Referenční tabulka

Jako v1 (14 řádků, max. pojistka samostatně / ve svazku, délka 3 % a 10 % pro 12 V při proudu rovném max. pojistce), jen `maxFuse()` bez 300 A.

### Texty u kalkulačky

- U výsledku: „Počítáno pro automobilový kabel s izolací 105 °C (FLRY) a okolí do 30 °C. V teplém místě volte o stupeň silnější.“
- CCA: znění ověřovatele („Pro automobilová lanka CCA jsme zatížitelnost nedohledali; NEC dává CCA hodnoty hliníku.“), doporučení „do vozu jen čistou měď“.
- Pojistka u baterie: „co nejblíž, nejvýš 17,5 cm“ (ABYC E-11).
- Rychlý vzorec 10 × A ÷ I se nepoužívá.
- Informativně smí nákupní lístek ukázat rodinu pojistky podle hodnoty (do 30 A nožová, 40–125 A MIDI, nad 125 A MEGA). Výpočet to nemění.

## Port do enginu

- `packages/engine/src/vodic.ts`: verze 1.1, `navrhVodice({ napeti, rezim, hodnota, delka, ubytekProc, zpetny, prostredi })` a `referencniTabulka()`. Vrací čísla a kódy hlášek, texty jsou v `content/cs/`.
- `packages/engine/src/vodic-v1.ts`: verze 1 (historie), jmenný prostor `v1`.
- `packages/engine/src/vodic-v2.ts`: nahrazená verze 2 (archiv, zásobník), jmenný prostor `v2`.

## Golden test (píše `tester`, ne hlavní vlákno)

**Verze 1.1:** tester upraví nezávislou referenci: reference v1 (`docs/reference/kalkulacka-prurezu-v1.html`) a změny 1–4. Golden test proti ní na mřížce jako u v1 (12 a 24 V × příkon i proud × 3, 5, 10 % × zpětný 1 a 2 × prostředí n a h × proud 0,5 A až nad 200 A, hrany kolem f / 1,25 u každé pojistky × délka 0,2–20 m), referenční tabulka a ruční příklady. Hotovo, když projde.

**Verze 1:** golden test proti referenci v1 zůstává a testuje `v1`. **Verze 2:** testy zůstávají jako archiv a testují `v2`.

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

- [ ] Golden test verze 1.1 prochází na celé mřížce (a golden test v1 dál prochází proti `v1`).
- [ ] Výsledek se přepočítá do 100 ms po změně vstupu na průměrném telefonu.
- [ ] Všechny nápady ze skupiny A, které Radek potvrdí, fungují včetně tmavého režimu a 200% zvětšení.
- [ ] Odkaz se stavem otevře stejný výsledek.
- [ ] Designér stránku schválil.
- [ ] Čtenář laik splnil úkol „spočítejte kabel k lednici 60 W vzdálené 5 m od baterie“ bez zaseknutí.
- [ ] Všechny karty kalkulačky jsou schválené.
