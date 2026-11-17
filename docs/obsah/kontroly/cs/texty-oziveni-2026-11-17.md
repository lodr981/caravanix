# Kontrola textů: oživení kalkulaček a booster (cs), 17. 11. 2026

Kontrolor země (Česko), profil `docs/profily/cs.md`. Vstup: posledních 5 commitů do `content/` (2ad5181, b7db07c, f2ca796, 2a6ce72, ba888fb).

Kontrolováno:

- `content/cs/kalkulacky-alfa.json`: `spol.priklady*`, `spol.presne`, `spol.mene`, `spol.vice`, `sb.nadrz*`, `sb.pomer`, `sb.zeSlunce`, `sb.zJizdy`, `sb.spotreba`, `sb.mesiceNote`, nové `ba.*`, `so.schema`, `so.rezerva`, `me.pomer`, `sp.rozpis`, `sp.bezNazvu`, `sp.zKatalogu*`, `sp.katalogOdkaz`, celá sada `bo.*`,
- `content/cs/priklady.json` (názvy a popisy),
- `content/cs/spotrebice.json` a texty položek v `packages/data/src/spotrebice.json` (jen jazyk),
- `content/cs/web.json` (`home.hlavniStitek`, `nav.spotrebice`), `content/cs/kalkulacka-prurezu.json` (`priklady.*`).

## Verdikt: SCHVÁLENO (s drobnými opravami)

Booster sedí na `docs/karty/BOOSTER_REALNE.md`, K-BOOST-0001 a K-BOOST-0002: koeficienty 85 / 70 / 50 % jsou v rozsahu karty 0,5–0,9, nad 90 % 20 % (K-BOOST-0002), měření promobilu 88 %. Žádný text netvrdí víc než karta, jen teplotní věta byla přesnější než zdroje (opraveno, viz níže). Nic nevracím.

## Opravy provedené rovnou

**Věcně a jazykově (booster):**

- `bo.proc2`: „Bývá to od 40–45 °C“ → „Podle výrobce to začíná zhruba od 30–45 °C a nad 60 °C se booster vypne.“ Karta K-BOOST-0001 uvádí u CTEK D250SE snížení už při 30 °C (16 A z 20 A), Victron od 40 °C, Renogy od 45 °C.
- `bo.proc1`: „tím méně se do ní vejde“ → „tím pomaleji se nabíjí“. Původní znění mluvilo o množství, ne o rychlosti, a laik by ho mohl číst tak, že se baterie nenabije.
- `bo.mereni`: „při 3 hodinách po dálnici“ → „při tříhodinové jízdě po dálnici“, doplněno „německého časopisu“ a podmínka z karty „Baterie byla na začátku nabitá na 50 %.“ (vysvětluje, proč jde o nejlepší případ).
- `bo.predpoklad`: doplněna věta podle poznámky v K-BOOST-0001: „Za jízdy booster napájí i zapnuté spotřebiče, třeba lednici, a do baterie pak dojde méně.“
- `ba.nadrzAria`: „Baterie vydrží {dny} dne bez nabíjení“ dávalo pro celá čísla chybný tvar („vydrží 3 dne“). Nově „Výdrž baterie bez nabíjení ve dnech: {dny}“ (funguje pro 1, 3 i 2,5).

**Podle zadání:**

- `sb.BATERIE_100AH`, `sb.PANELY_100WP`, `sb.BOOSTER_10A`, `sb.SPOTREBA_MINUS_10`: odebrána dvojtečka na konci.
- `sb.prinos` odstraněn: v `apps/` ho nic nepoužívá (grep mimo `dist`; „Co pomůže nejvíc“ skládá hodnotu sám, viz `KalkSobestacnost.tsx`).

**Typografie (nezlomitelná mezera U+00A0):**

- `kalkulacky-alfa.json`: doplněna po jednopísmenných předložkách a spojkách a mezi číslem nebo zástupným symbolem a jednotkou v nových klíčích `sb.nadrz`, `sb.nadrzNote`, `sb.nadrzAria`, `sb.zJizdy`, `sb.mesiceNote`, `ba.porovnani`, `ba.nadrz`, `ba.nadrzBezDilku`, `so.schema`, `me.pomer`, `bo.lead`, `bo.stylHint`, `bo.styl.mesto`, `bo.znamStav`, `bo.startHint`, `bo.nadrzAria`, `bo.proc1`–`bo.proc6`, `bo.mereni`, `bo.predpoklad`.
- `priklady.json`: soubor neměl ani jednu nezlomitelnou mezeru. Doplněna ve všech názvech a popisech (např. „Víkend v létě“, „200 Wp, 100 Ah“, „ze 40 %“). „asi 1150 Wh“ → „asi 1 150 Wh“ (tisíce s mezerou). Solár: „150 W, regulátor 100 V“ → „150 Wp, …“ (výkon panelu je ve Wp, pole `wp`).

Klíče se neměnily (kromě odstranění `sb.prinos`). Oba soubory jsou platný JSON, formát (odsazení 2, LF) zachován.

## Bez připomínek

`spol.priklady*`, `spol.presne`, `spol.mene`, `spol.vice`, `sb.pomer`, `sb.zeSlunce`, `sb.spotreba`, `so.rezerva`, `sp.rozpis` („Kdo kolik bere za den“ – lehký humor, v pořádku), `sp.bezNazvu`, `sp.zKatalogu*`, `sp.katalogOdkaz`, `bo.styl*`, `bo.prumer*`, `bo.konec*`, `bo.srovnani`, `bo.naplno`, `bo.skutecne`, `bo.DOBITO_DO_PLNA`, `bo.procH2`; `content/cs/spotrebice.json`; `web.json` (`home.hlavniStitek`, `nav.spotrebice`); `kalkulacka-prurezu.json` (`priklady.*`). Popisy příkladů odpovídají datům (např. víkend 411 Wh ≈ 410 Wh, práce 1 148 Wh ≈ 1 150 Wh, zima 928 Wh ≈ 930 Wh).

## Poznámky (bez změny, nepodstatné)

- **Katalog spotřebičů, `packages/data/src/spotrebice.json`** (mimo `content/`, data s kartami, neměněno): jazyk srozumitelný, bez chyb. Typograficky chybí mezera v tisících a nezlomitelné mezery („1000 W“, „1800 W“, „2300 W“, „12 V“), a v textu je znak „=“ („Hodnota = výkon adaptéru“, „Typická hodnota = úsporný režim“); přirozenější je „Hodnota je výkon adaptéru“. Opravu může udělat autor dat při další úpravě katalogu, nebo formátovat při vykreslení.
- `bo.mereni` 88 % je podle karty spočítáno na kapacitu 226 Ah, kterou ukazovala aplikace (na jmenovitých 200 Ah by to bylo 78 %). Text ho správně označuje jako nejlepší případ; nic neměním.
- `sb.nadrzNote` mluví o „konci zadaného měsíce“; simulace běží vždy 30 dní s průměrem měsíce. Pro laika v pořádku.
