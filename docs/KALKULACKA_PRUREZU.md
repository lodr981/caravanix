# Kalkulačka průřezu a jištění

## Stav

- Logiku Radek připomínkoval a schválil 11. 11. 2026.
- Reference: `docs/reference/kalkulacka-prurezu-v1.html`. Je to přesná kopie stránky „12 V rozvod – průřez a pojistka“ (artefakt, verze 1794384920-4c0b).
- V alfě dostane **nový design, nové texty a nápady navíc**. Výpočet zůstává.

## Co je zmrazené (bez souhlasu Radka se nemění)

- Tabulky `MM`, `AMP` (DIN VDE 0298-4), `AWG`, `CAPN`, `CAPH` (praktické stropy pojistek z autoelektriky, například 2,5 mm² = 20 A), `FUSES`.
- Měrný odpor mědi 0,0175 Ω·mm²/m, ve svazku nebo motorovém prostoru 0,0216 Ω·mm²/m a zatížitelnost 70 %.
- Interpolace `amp()`, `interp()` (log-log) a `maxFuse()`.
- Pojistka = nejbližší hodnota z `FUSES` alespoň 1,1 × proud.
- Průřez = nejmenší z `MM`, který splní úbytek napětí i `maxFuse ≥ pojistka`. AWG = první, který splní totéž.
- Úbytky 3 / 5 / 10 %, zpětný vodič vlastní (×2) nebo přes kostru (×1), napětí 12 / 24 V.
- Všechny hlášky a jejich podmínky: rozhodl úbytek, nebo oteplení; mínus přes kostru; přes 150 A na 12 V; měnič od 1 000 W; mimo rozsah; ani 120 mm² nestačí.

## Port do enginu

- `packages/engine/src/vodic.ts`: čisté funkce, které vrací objekt. Například `navrhVodice({ napeti, rezim, hodnota, delka, ubytekProc, zpetny, prostredi })` vrací průřez, AWG, pojistku, max. pojistku, proud, úbytek ve V a %, napětí u spotřebiče, ztrátu, max. délku, co rozhodlo a seznam hlášek (kódy, ne texty).
- Texty hlášek jsou v `content/cs/`, engine vrací jen kódy a čísla.
- Referenční tabulka (14 průřezů) jako samostatná funkce.

## Golden test (píše `tester`, ne hlavní vlákno)

1. Vytáhne skript z referenčního HTML a spustí jeho výpočetní funkce v Node.
2. Projde mřížku vstupů: 12 a 24 V × příkon i proud × úbytek 3, 5 a 10 % × zpětný vodič 1 a 2 × prostředí n a h × proud 0,5 až 240 A (alespoň 40 hodnot, včetně hran u každé pojistky) × délka 0,2 až 20 m (alespoň 15 hodnot).
3. Porovná s enginem: průřez, AWG, pojistku, max. pojistku, co rozhodlo a kódy hlášek musí sedět přesně. Spojitá čísla (úbytek, ztráta, max. délka) s tolerancí 1e-9.
4. Porovná referenční tabulku řádek po řádku.

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
6. **Obrácený režim „Mám kabel“:** zadám průřez a délku, dostanu max. pojistku a max. proud pro daný úbytek. Používá jen zmrazené funkce. Před zařazením ho Radek potvrdí.
7. **Rychlá volba spotřebiče** (lednice, měnič 1 000 W, LED pásek a další): vyplní příkon z katalogu spotřebičů. Jen se schválenou kartou spotřebiče.

### Skupina B: mění výpočet (jen se souhlasem Radka, mimo alfu)

- přepínač „kabel CCA / nevím, jaký kabel“
- teplota okolí jako číslo místo dvou režimů
- 48 V
- odpor spojů na kostře
- volba pomalé pojistky pro spotřebiče s rozběhovým proudem

## Akceptační kritéria pro alfu

- [ ] Golden test prochází na celé mřížce.
- [ ] Výsledek se přepočítá do 100 ms po změně vstupu na průměrném telefonu.
- [ ] Všechny nápady ze skupiny A, které Radek potvrdí, fungují včetně tmavého režimu a 200% zvětšení.
- [ ] Odkaz se stavem otevře stejný výsledek.
- [ ] Designér stránku schválil.
- [ ] Čtenář laik splnil úkol „spočítejte kabel k lednici 60 W vzdálené 5 m od baterie“ bez zaseknutí.
- [ ] Všechny karty kalkulačky jsou schválené.
