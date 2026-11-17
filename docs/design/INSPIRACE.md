# Inspirace pro kalkulačky (designér, 17. 11. 2026)

Krátká rešerše, co u podobných kalkulaček funguje. Nic se nepřebírá doslova: ani vzhled, ani loga, ani texty. Vlastní styl Dílna (`docs/design/TOKENY.md`) zůstává.

## Co jsem prošel

| Zdroj | Typ | Co funguje | Co nechceme |
| --- | --- | --- | --- |
| Omni Calculator (battery life) | obecná kalkulačka výdrže baterie | výchozí hodnoty předvyplněné, méně častá nastavení schovaná v rozbalovacím bloku, tlačítko „sdílet výsledek“, vzorec vysvětlený pod kalkulačkou | dlouhá stránka s reklamou, výsledek jen jako jedno pole bez obrazu |
| PVGIS (JRC, off-grid) | solární simulace ostrovního systému | výsledek jako „kolik dní je baterie plná / prázdná“, měsíční přehled, graf stavu baterie | odborné ovládání (sklon, azimut, databáze), pro laika nečitelné |
| Epoch Batteries (System Sizing Tool, režim RV) | průvodce dimenzováním pro karavan | volba „k čemu to je“ hned na začátku, spotřebiče seskupené podle skupin (kuchyň, topení, elektronika, voda), u každého typická spotřeba, průběžný součet během zadávání, tlačítka −/+ u počtu | průvodce na 4 kroky (víc klikání), prodejní cíl na konci |
| Parked in Paradise (RV solar) | tabulka spotřebičů | jednoduchý řádek watty × hodiny, přepínač DC/AC se ztrátou měniče, tisk výsledku | žádná vizualizace, jen čísla v tabulce |
| Explorist.life (RV calculators) | kalkulačky pro vestavby | posuvníky pro watty a dobu běhu, tabulka „typických hodnot“ běžných spotřebičů | hustá stránka, mnoho kalkulaček na jedné obrazovce |
| Kalkulačky výdrže powerstanic (různí výrobci, viz vyhledávání „power station runtime calculator“) | výdrž přenosné baterie | scénáře typu „víkendový kemp“ jedním klepnutím, výsledek v hodinách velkým číslem | odhad bez předpokladů, nadsazená čísla, prodej konkrétního modelu |

Victron Toolkit a jeho MPPT kalkulačka jsou aplikace a tabulka v Excelu, jejich rozhraní z webu popsat nejde; z popisu plyne jen to, že kalkulačka MPPT páruje panel s regulátorem podle napětí v mrazu (to už děláme).

## Co z toho bereme (vlastním stylem)

1. **Typické příklady nad formulářem.** Jedno klepnutí nastaví celé zadání („Víkend v létě“, „Práce na cestě“, „Zima na horách“). Lidé nezačínají s prázdným formulářem, vidí rozumné hodnoty a upravují je. Vybraný příklad je zvýrazněný, dokud zadání odpovídá.
2. **Posuvník + pole pro přesné číslo.** Posuvník pro hraní a odhad, pole pro číslo ze štítku. Posuvník má rozsah běžného použití, pole celý rozsah, který zvládne výpočet.
3. **Výsledek jako obraz.** Baterie jako nádrž (úroveň, dílky po dnech), pruhy „ze slunce / z jízdy / spotřeba“, rozpis „kdo kolik bere“ s ikonou skupiny, měřidlo rezervy regulátoru se značkou limitu, měsíce jako pruhy od nuly. Čísla jsou vždy napsaná, obraz je jen převádí na tvar.
4. **Skupiny spotřebičů s ikonou** (chlazení, klimatizace, topení, vaření, voda, elektronika), ikona vždy vedle názvu.

Co nebereme: průvodce na víc kroků, prodejní cíle, reklamu, karusely, animace pro efekt.

## Implementace

| Co | Kde |
| --- | --- |
| `ExamplePicker` (typické příklady) | `packages/ui/src/components/ExamplePicker.tsx` |
| `TankGauge` (baterie jako nádrž) | `packages/ui/src/components/TankGauge.tsx` |
| `BarList` (pruhy poměru, volitelná značka limitu) | `packages/ui/src/components/BarList.tsx` |
| Ikony kalkulaček a skupin (`IconBattery`, `IconSolarPanel`, `IconPlug`, `IconInverter`, `IconVan`, `IconCable`, `IconBolt`, `IconFridge`, `IconSnow`, `IconFlame`, `IconPot`, `IconDrop`, `IconBulb`, `IconCalendar`) | `packages/ui/src/icons.tsx` |
| `CisloPosuvnik` (posuvník + pole), načítání příkladů `Priklady` | `apps/web/src/components/kalk/spolecne.tsx` |
| Styl rozložení (posuvníky, nádrž vedle pruhů, měsíce, schéma pole panelů) | `apps/web/src/layouts/KalkStranka.astro` |
| Úvodní stránka: hlavní karta soběstačnosti, ikony karet | `apps/web/src/pages/cs/index.astro` |

Animace: pruhy, nádrž a sloupce grafu mění velikost přechodem `--cx-motion-base` (200 ms); při `prefers-reduced-motion` jsou tokeny 0 ms. Žádný výpočet v UI: délky pruhů a výšky jsou jen poměr výstupu enginu k největší zobrazené hodnotě.

### Rozsahy posuvníků

| Kalkulačka | Veličina | Posuvník (krok) | Pole (= rozsah enginu) |
| --- | --- | --- | --- |
| soběstačnost | spotřeba za den | 100–3 000 Wh (50) | 1–50 000 Wh |
| | kapacita baterie | 50–600 Ah (10) | 10–2 000 Ah |
| | výkon panelů | 0–800 Wp (10) | 0–5 000 Wp |
| | stínění | 0–90 % (5) | 0–90 % |
| | hodin jízdy | 0–8 h (0,5) | 0–24 h |
| | proud boosteru | 0–60 A (5) | 0–100 A |
| | přípojka každých | 0–30 dní (1) | 0–30 dní |
| baterie | spotřeba za den | 100–3 000 Wh (50) | 1–50 000 Wh |
| | dní bez nabíjení | 0,5–14 dní (0,5) | 0,5–14 dní |
| | kapacita mé baterie | 50–600 Ah (10) | 1–2 000 Ah |
| spotřebiče – vaření | kapacita baterie | 50–600 Ah (10) | 1–2 000 Ah |
| | příkon vařiče | 300–2 500 W (50) | 1–10 000 W |
| | minut na jídlo | 5–120 min (5) | 1–600 min |
| | litrů vody | 0,5–10 l (0,5) | 0,1–50 l |
| solár | výkon panelu | 50–500 Wp (10) | 1–1 000 Wp |
| | panelů do série, větví | 1–6 ks (1) | 1–10 ks |
| | nejnižší teplota | −30 až 10 °C (1) | −40 až 25 °C |
| booster (jen vzhled) | proud | 10–60 A (5) | 1–100 A |
| | hodin jízdy | 0–8 h (0,5) | 0–24 h |
| měnič | spotřeba naprázdno | 0–50 W (1) | 0–200 W |
| | hodin zapnutý | 0–24 h (0,5) | 0–24 h |

Řádky seznamů spotřebičů (příkon, hodiny) zůstaly jako pole: posuvník u každého řádku by stránku zahltil.

## Typické příklady: formát `content/cs/priklady.json`

```json
{ "<kalkulacka>": [{ "id": "…", "nazev": "…", "popis": "…", "ikona": "slunce", "stav": { … } }] }
```

- Klíče kalkulaček: `sobestacnost`, `spotrebice`, `baterie`, `solar`, `booster`, `menic`, `prurez`. Chybí-li soubor nebo klíč, řada příkladů se nezobrazí (načítá se přes `import.meta.glob`).
- `stav` používá stejné klíče jako stav kalkulačky v adrese (`?s=…`). Neuvedené klíče dostanou výchozí hodnotu, neznámé klíče a špatné typy se ignorují; čísla smí být číslo i text s čárkou.
- Spotřebiče: řádek `r` může mít navíc `"sk"` (skupina z katalogu: `chlazeni`, `klimatizace`, `topeni`, `vareni`, `voda`, `elektronika`) kvůli ikoně; bez něj má řádek ikonu zásuvky.
- `prurez`: klíče `napeti` (12/24), `rezim` ("P"/"I"), `hodnota`, `delka`, `ubytekProc` (3/5/10), `zpetny`, `prostredi`; hodnoty projdou stejnou kontrolou jako odkaz.
- Volitelná `ikona`: `slunce`, `vlocka`, `dodavka`, `baterie`, `panel`, `zasuvka`, `menic`, `kabel`, `blesk`, `lednice`, `plamen`, `hrnec`, `kapka`, `zarovka`, `kalendar`.

## Nové texty (pracovní znění, ke kontrole pro `autor-zeme`)

`content/cs/kalkulacky-alfa.json`:

| Klíč | Pracovní znění |
| --- | --- |
| `spol.priklady` | Typické příklady |
| `spol.prikladyHint` | Klepnutím nastavíte celé zadání. Potom ho můžete upravit. |
| `spol.presne` | Nebo napište přesně |
| `spol.mene` / `spol.vice` | {co}: ubrat {o} / {co}: přidat {o} (jen pro čtečku, název tlačítek − a +) |
| `sb.nadrz` | Baterie po {dny} dnech |
| `sb.nadrzNote` | Tolik zbude na konci zadaného měsíce, když začnete s plnou baterií. |
| `sb.nadrzAria` | Baterie po {dny} dnech je nabitá na {proc} % |
| `sb.pomer` | Za průměrný den |
| `sb.zeSlunce` / `sb.zJizdy` / `sb.spotreba` | Ze slunce / Z jízdy / Spotřeba |
| `sb.mesiceNote` | Pruh doprava: solár a jízda dají víc, než spotřebujete. Pruh doleva: chybí. Zvolený měsíc je orámovaný. |
| `ba.porovnani` | Porovnání s vaší baterií |
| `ba.potrebujete` / `ba.mate` | Potřebujete / Máte |
| `ba.nadrz` | Vaše baterie {ah} Ah |
| `ba.nadrzDilek` | Jeden dílek je jeden den spotřeby. |
| `ba.nadrzBezDilku` | Dílky po dnech ukazujeme pro 1 až 14 dní. |
| `ba.nadrzAria` | Baterie vydrží {dny} dne bez nabíjení |
| `so.schema` | Panelů v jedné větvi: {s}. Větví vedle sebe: {p}. |
| `so.rezerva` | Rezerva regulátoru |
| `me.pomer` | Trvalý výkon a špička |
| `sp.rozpis` | Kdo kolik bere za den |
| `sp.bezNazvu` | Spotřebič {n} |

`content/cs/kalkulacka-prurezu.json`: `priklady.title` (Typické příklady), `priklady.hint` (stejná věta jako `spol.prikladyHint`).

`content/cs/web.json`: `home.hlavniStitek` (Začněte tady).

Poznámka: „Co pomůže nejvíc“ teď ukazuje „+5 dní“ místo věty `sb.prinos` („vydržíte déle (dní navíc: {dny})“); klíč zůstal v souboru nepoužitý. Názvy variant (`sb.BATERIE_100AH` …) končí dvojtečkou, ta se v pruhu skrývá – autor ji může z textu odebrat.

## Zdroje

- https://www.omnicalculator.com/physics/battery-life
- https://re.jrc.ec.europa.eu/pvg_tools/en/
- https://www.epochbatteries.com/solar-calculator?use=rv
- https://www.parkedinparadise.com/solar-calculator/
- https://shop.explorist.life/?p=131348
- https://www.victronenergy.com/support-and-downloads/software
