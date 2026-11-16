# Kalkulačka průřezu a jištění

## Stav

- Verze 1: logiku Radek schválil 11. 11. 2026. Reference `docs/reference/kalkulacka-prurezu-v1.html` (přesná kopie stránky „12 V rozvod – průřez a pojistka“, artefakt 1794384920-4c0b). **Zůstává jako historie**, v enginu jako `v1`.
- **Verze 2: platná.** Radek ji rozhodl 16. 11. 2026 po nálezech ověřovatele (`docs/ROZHODNUTI.md`). Níže je její úplný popis; podle něj tester píše nezávislou referenci a golden test.
- V alfě dostane kalkulačka nový design, nové texty a nápady skupiny A 1–6.

## Verze 2: co platí (bez souhlasu Radka se nemění)

### Tabulky beze změny proti v1

- `MM`, `AMP` (DIN VDE 0298-4; 12 A pro 0,5 mm² zůstává se zdrojem Lapp), `AWG`, `CAPN`, `CAPH` (rozhodnutí odborníka, Radek).
- Interpolace `amp()` a `interp()` (log-log), beze změny.

### Změny proti v1

| | v1 | v2 |
| --- | --- | --- |
| ρ mědi, běžně | 0,0175 Ω·mm²/m | **0,0191** (horní mez lanka FLRY-B, K-VODIC-0001) |
| ρ teplé (80 °C) | 0,0216 | **0,0236** (0,0191 × 0,0216 / 0,0175 = 0,023575, zaokrouhleno nahoru) |
| Vstupy uložení | zpětný vodič (×2 / ×1) a prostředí (n / h) | jeden vstup **uložení** se čtyřmi volbami (tabulka níže) |
| Pojistka | nejbližší z `FUSES` ≥ 1,1 × proud | nejbližší z `FUSES` ≥ **1,25** × proud (dočasně, viz Typ pojistky) |
| Řada pojistek | `FUSES` včetně 300 A | `FUSES` **bez 300 A** (MEGA 300 A je jen zkratová ochrana) |
| Mez rozsahu | v textu „nad 240 A“ | z tabulky: žádná pojistka z `FUSES` není ≥ 1,25 × proud (tj. nad 200 A); hláška „hlavní vedení“ |

### Uložení

| Kód | Volba | Zpětný vodič (násobek délky) | Koeficient zatížitelnosti k | ρ | Strop pojistky |
| --- | --- | --- | --- | --- | --- |
| `par` | plus a mínus vedle sebe (výchozí) | 2 | 0,8 | 0,0191 | `CAPN` |
| `kostra` | jeden vodič, mínus přes kostru | 1 | 1,0 | 0,0191 | `CAPN` |
| `svazek` | ve svazku | 2 | 0,53 | 0,0236 | `CAPH` |
| `motor` | motorový prostor | 2 | 0,5 | 0,0236 | `CAPH` |

### Výpočet

Vstupy: napětí U (12 / 24 V), režim (příkon P ve W, nebo proud I v A), hodnota v, délka jedné cesty L [m], úbytek d (3 / 5 / 10 %), uložení.

1. Pokud v ani L není kladné číslo (`!(v > 0) || !(L > 0)`): chyba `NEPLATNY_VSTUP`.
2. Proud I = v / U v režimu P, jinak I = v.
3. Dovolený úbytek dU = U × d / 100. Požadovaný průřez Areq = ρ × L × n × I / dU, kde n je násobek délky podle uložení.
4. Pojistka = první hodnota z `FUSES` (bez 300), pro kterou f ≥ 1,25 × I. Žádná: chyba `HLAVNI_VEDENI` (vrací i proud).
5. `maxFuse(a, uložení)` = největší f z `FUSES` (bez 300), pro které f ≤ min(amp(a) × k, interp(strop, a)) + 1e-9; žádné → 0.
6. Průřez = první z `MM`, pro který a ≥ Areq a zároveň maxFuse(a) ≥ pojistka. Žádný: chyba `ANI_120_NESTACI` (vrací i proud).
7. Co rozhodlo: iDrop = index prvního `MM` ≥ Areq, iFuse = index prvního `MM` s maxFuse ≥ pojistka. iDrop ≥ iFuse → úbytek, jinak oteplení.
8. AWG = první z `AWG`, jehož plocha splní obě podmínky z bodu 6; žádný → null.
9. Výstupy: úbytek ΔU = ρ × L × n × I / A, úbytek v % = ΔU / U × 100, napětí u spotřebiče U − ΔU, ztráta ΔU × I, max. pojistka maxFuse(A), příkon (v režimu P zadaná hodnota, jinak I × U), max. délka = dU × A / (ρ × n × I).
10. Hlášky (kódy, v tomto pořadí): `ROZHODL_UBYTEK` nebo `ROZHODLO_OTEPLENI`; `MINUS_PRES_KOSTRU` při uložení `kostra`; `MOTOR_VYSSI_TRIDA` při uložení `motor` („použijte kabel pro vyšší teplotu, třída C 125 °C nebo D 150 °C“); `NAD_150A_12V` při I > 150 A a U = 12 V; `MENIC_OD_1000W` v režimu P při v ≥ 1 000 W.
11. Text hlášky `HLAVNI_VEDENI`: jde o hlavní vedení, patří k němu pojistka Class T u baterie a návrh odborníkem.

### Referenční tabulka

14 řádků pro `MM[0]` až `MM[13]`: průřez, nejbližší AWG (podle logaritmu plochy, jako v1), max. pojistka pro každé ze čtyř uložení a délka jedné cesty pro uložení `par` na 12 V při proudu rovném max. pojistce `par`: délka 3 % = 0,36 × a / (2 × 0,0191 × f), délka 10 % = 1,2 × a / (2 × 0,0191 × f).

### Typ pojistky (připravuje se)

`reserser` z tabulek Littelfuse připraví minimální poměr jmenovitého proudu pojistky k trvalému proudu pro každou rodinu (ATO/ATOF, MIDI, MEGA) a rozsah proudů, pro který se rodina doporučí. Potom kalkulačka ukáže i typ pojistky (i v nákupním lístku) a poměr 1,25 se nahradí. Taková změna je změna výpočtu a schvaluje ji Radek.

## Port do enginu

- `packages/engine/src/vodic.ts`: verze 2, `navrhVodice({ napeti, rezim, hodnota, delka, ubytekProc, ulozeni })`. Vrací průřez, AWG, pojistku, max. pojistku, proud, příkon, úbytek ve V a %, napětí u spotřebiče, ztrátu, max. délku, co rozhodlo a seznam hlášek (kódy, ne texty).
- `packages/engine/src/vodic-v1.ts`: verze 1 beze změny, exportovaná jako `v1` (historie, má vlastní golden test).
- Texty hlášek jsou v `content/cs/`, engine vrací jen kódy a čísla.

## Golden test (píše `tester`, ne hlavní vlákno)

**Verze 2:** tester napíše nezávislou referenci podle kapitoly „Verze 2: co platí“, ne z kódu enginu, a golden test proti ní:

1. Mřížka: 12 a 24 V × příkon i proud × úbytek 3, 5 a 10 % × všechna čtyři uložení × proud 0,5 až 200 A (alespoň 40 hodnot, včetně hran u každé pojistky, tedy kolem f / 1,25) a nad mezí rozsahu × délka 0,2 až 20 m (alespoň 15 hodnot) a délky pro `ANI_120_NESTACI`.
2. Přesně musí sedět: stav, průřez, AWG, pojistka, max. pojistka, co rozhodlo, kódy hlášek a jejich pořadí. Spojitá čísla s tolerancí 1e-9.
3. Referenční tabulka řádek po řádku.
4. Ruční příklady s postupem v `tests/priklady/` (aspoň jeden pro každé uložení).

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
