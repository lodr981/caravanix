# Caravanix – pokyny pro Claude Code

Caravanix provede laika návrhem ostrovní elektroinstalace (a vody) v obytné dodávce, karavanu nebo na chatě. Řídicí dokument je `docs/ZADANI.md`. Když se tento soubor a zadání rozcházejí, platí zadání; když je zadání nejasné, zapiš otázku do `docs/OTAZKY.md`, nedomýšlej.

## Zdravý rozum

Cíl alfy je **hotová, bezpečná a hezká věc**, ne dokonalá dokumentace. Nad prací stojí subagent `mistr`. Jeho **test podstatnosti** (`.claude/agents/mistr.md`) rozhoduje, co se řeší. Nepodstatné se zapíše jako poznámka a nic se nemění. Rozhodnuté se znovu neotevírá bez konkrétního nebezpečného případu.

## Aktuální fáze: první alfa

- **Jen česky.** Architektura ale od začátku počítá s němčinou, polštinou a angličtinou.
- **Obsah:** příručka (10 lekcí) a kalkulačky: soběstačnost (hlavní), průřez a jištění, spotřebiče a vaření, baterie, solár, booster, měnič.
- **Běží lokálně** na Radkově PC jedním příkazem. Žádný deploy, žádné placené služby.
- Co do alfy nepatří, jde do `docs/ZASOBNIK.md` a nestaví se.
- Rozsah a brány alfy: `docs/ZADANI.md`, kapitola **První alfa**.

## Kdo je kdo

- **Radek** je jediný člověk v projektu a jeho kotva. Jediný mění zadání a `docs/ROZHODNUTI.md`.
- **Hlavní vlákno (ty)** rozděluje úkoly subagentům, píše kód enginu a webu, integruje výsledky, drží rozsah fáze a po každé dávce práce aktualizuje `docs/STAV.md`.
- **Subagenti** jsou v `.claude/agents/`. Nad prací: `mistr` (test podstatnosti, rozhoduje druhá vrácení a spory, píše `docs/PRO_RADKA.md`). Jádro: `reserser`, `overovatel`. Země: `autor-zeme`, `kontrolor-zeme` (dostanou profil z `docs/profily/`). Napříč: `designer`, `technicke-seo`, `tester`, `ctenar-laik`, `strazce-licenci`.

## Co schvaluje Radek

Radek dostává nejvýš jednou denně soubor `docs/PRO_RADKA.md` s nejvýš 5 rozhodnutími. Každé má doporučení mistra a výchozí volbu. Schvaluje jen:

1. směr a vzor designu,
2. karty třídy A, a to najednou v přehledu `docs/karty/KE_SCHVALENI.md`,
3. změny výpočtu kalkulaček,
4. placené služby a cokoli nevratného.

Všechno ostatní rozhodne mistr. Na odpověď Radka se nečeká: práce pokračuje na něčem jiném.

## Nedotknutelné zásady

1. **AI mluví, kód počítá.** Každé číslo ve výstupu spočítá deterministický engine. Žádné číslo z hlavy, žádné číslo „upravené pro hezčí výsledek“.
2. **Karta je potřeba jen pro čísla, která vstupují do výpočtu, a pro bezpečnostní pravidla.** Stačí jeden dobrý zdroj nebo rozhodnutí odborníka. Vysvětlující texty a tipy kartu nepotřebují, kontroluje je kontrolor země.
3. **Bezpečnost před pohodlím.** Kontrola dává OK, varování, nebo blok. Blok nejde obejít.
4. **Normy se odkazují, neopisují.** Číslo normy a článku ano, text normy ne.
5. **Komponenty a spotřebiče jen ověřené:** datasheet nebo štítek, zdroj a datum.
6. **Značky neutrálně.** Doporučení z parametrů. Odkazy do e-shopů zatím bez provize.
7. **Výstup je podklad, ne revize.** Uvádí se to na každé stránce s výpočtem.
8. **Vzhled je součást kvality.** Stránka bez schválení designéra nejde ven (`docs/design/ZADANI_DESIGNU.md`).

## Pravidla autonomie

1. Agenti komunikují jen přes soubory v repu: zadání úkolu, výstup, nálezy. Ne přes chat.
2. Každý úkol má v `docs/STAV.md` řádek: kdo, vstup, výstup, kdy je hotovo, stav.
3. Nejasnost → `docs/OTAZKY.md` a pokračuj jinou prací. Nestůj.
4. Ověřuje se jednou. Druhé vrácení čehokoli rozhoduje mistr, ne Radek (kromě karet třídy A).
5. Brány hlídá stroj (`npm run check`). Nesplněná brána = build neprojde. Nikdy je nevypínej ani neobcházej.
6. Testy, které napsal `tester`, neměníš bez souhlasu Radka. Když test padá, opravuješ kód, ne test.
7. Ověřovatel a čtenář laik startují bez tvého kontextu. Nepředávej jim své úvahy, jen to, co mají kontrolovat.
8. Po každé dávce práce: souhrn do `docs/STAV.md` (hotovo, čeká na Radka, rizika). Commity česky, malé a popsané.
9. Žádný `git push`, deploy ani registrace služeb bez Radkova souhlasu.
10. Nejvýš 3 rozpracované úkoly najednou. Nejdřív dokončit, pak začít.
11. Nejdřív svislý řez: kalkulačka průřezu v designu, se 2 lekcemi, testy a schválením. Teprve potom další kalkulačky a lekce.
12. Úkol, který se točí déle než dvě dávky práce, mistr zmenší, nebo ho dá do zásobníku.

## Veto

Veto mají jen tři: **tester** (padající test), **designer** (stránka, která neprojde kontrolním seznamem, a nejvýš 2 kola, potom rozhodne mistr) a **strážce licencí** (soubor na webu bez licence). Ověřovatel a kontrolor země veto nemají, jejich spory rozhoduje mistr.

## Kalkulačka průřezu

Platí **verze 1.1** (Radek 16. 11. 2026, `docs/reset/KALKULACKA_V1_1.md`): výpočet z reference v1 (`docs/reference/kalkulacka-prurezu-v1.html`) se čtyřmi změnami popsanými v `docs/KALKULACKA_PRUREZU.md`. Nic dalšího se v něm nemění. Verze 2 (tabulky pojistek, koeficienty 0,76 / 0,53 / 0,5, odpor podle průřezu) je v `docs/ZASOBNIK.md`, jen při konkrétním nebezpečném případu.

## Technologie (navržené, platí, dokud Radek nerozhodne jinak)

- Monorepo s npm workspaces, TypeScript všude.
- `packages/engine` – výpočty jako čisté funkce bez závislostí na DOM, běží v prohlížeči i v Node.
- `packages/data` – katalog spotřebičů, komponent, pravidla, karty, JSON schémata a validace.
- `packages/ui` – design systém (tokeny, komponenty), SVG ilustrace.
- `apps/web` – Astro, statické předgenerované stránky, kalkulačky jako React ostrůvky.
- Testy: Vitest (engine, data), Playwright (prohlížeč, screenshoty), Lighthouse CI (výkon, přístupnost, SEO).
- Texty jen přes klíče a soubory jazyka (`content/cs/...`), nikdy natvrdo v komponentách. Adresy s prefixem jazyka (`/cs/...`).
- Stav kalkulačky v URL (sdílení odkazem).
- Fonty a vše ostatní self-hosted, žádné externí CDN, žádné cookies, žádná analytika v alfě.
- **Licence závislostí:** produkční závislosti (vše, co jde do webu) jen MIT, BSD, Apache-2.0, OFL-1.1. MPL-2.0 (např. axe-core) jen ve vývojových závislostech (`devDependencies`); v produkčních brána selže. Jiné licence jen s výjimkou v `docs/licence/VYJIMKY_ZAVISLOSTI.json`, kterou schválil Radek. Hlídá `node tools/licence.mjs` v `npm run check`. Nástroje pro sestavení webu (Astro, Vite) jsou vývojové závislosti.

## Příkazy (zavedeš je ve fázi 1)

- `npm install` – instalace
- `npm run dev` – lokální web
- `npm test` – testy enginu a dat
- `npm run check` – všechny brány alfy (testy, karty, licence, odkazy, Lighthouse, screenshoty)
- `npm run build` – statický web do `apps/web/dist`

## Konvence

- Kód a identifikátory anglicky, komentáře a dokumentace česky.
- Uživatelské texty česky, **vykání**, česká typografie (viz `docs/profily/cs.md`).
- Čísla v UI s desetinnou čárkou, jednotky s nezlomitelnou mezerou (`2,5 mm²`, `15 A`).
