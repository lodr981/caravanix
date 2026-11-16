# Caravanix – pokyny pro Claude Code

Caravanix provede laika návrhem ostrovní elektroinstalace (a vody) v obytné dodávce, karavanu nebo na chatě. Řídicí dokument je `docs/ZADANI.md`. Když se tento soubor a zadání rozcházejí, platí zadání; když je zadání nejasné, zapiš otázku do `docs/OTAZKY.md`, nedomýšlej.

## Aktuální fáze: první alfa

- **Jen česky.** Architektura ale od začátku počítá s němčinou, polštinou a angličtinou.
- **Obsah:** příručka (10 lekcí) a kalkulačky: soběstačnost (hlavní), průřez a jištění, spotřebiče a vaření, baterie, solár, booster, měnič.
- **Běží lokálně** na Radkově PC jedním příkazem. Žádný deploy, žádné placené služby.
- Co do alfy nepatří, jde do `docs/ZASOBNIK.md` a nestaví se.
- Rozsah a brány alfy: `docs/ZADANI.md`, kapitola **První alfa**.

## Kdo je kdo

- **Radek** je jediný člověk v projektu a jeho kotva. Jediný mění zadání a `docs/ROZHODNUTI.md`.
- **Hlavní vlákno (ty)** rozděluje úkoly subagentům, píše kód enginu a webu, integruje výsledky, drží rozsah fáze a po každé dávce práce aktualizuje `docs/STAV.md`.
- **Subagenti** jsou v `.claude/agents/`. Jádro: `reserser`, `overovatel`. Země: `autor-zeme`, `kontrolor-zeme` (dostanou profil z `docs/profily/`). Napříč: `designer`, `technicke-seo`, `tester`, `ctenar-laik`, `strazce-licenci`.

## Co schvaluje Radek (a nic jiného na něj nečeká)

1. Směr designu a vzor hlavní stránky a kalkulačky průřezu.
2. Karty třídy A (bezpečnost).
3. Spory po druhém vrácení.
4. Brány alfy.
5. Placené služby, nové externí závislosti s licencí jinou než MIT/BSD/Apache/OFL, cokoli nevratného.
6. Jakoukoli změnu výpočetní logiky kalkulačky průřezu (`docs/KALKULACKA_PRUREZU.md`).

Na tyto body zapiš otázku do `docs/OTAZKY.md`, označ ji `[ČEKÁ NA RADKA]` a pokračuj jinou prací.

## Nedotknutelné zásady

1. **AI mluví, kód počítá.** Každé číslo ve výstupu spočítá deterministický engine. Žádné číslo z hlavy, žádné číslo „upravené pro hezčí výsledek“.
2. **Každé číslo a každá věta s fakty má kartu tvrzení** v `docs/karty/` (šablona `_SABLONA.md`). Bez schválené karty se nepublikuje.
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
4. Práce se vrací nejvýš dvakrát, potom jde k Radkovi.
5. Brány hlídá stroj (`npm run check`). Nesplněná brána = build neprojde. Nikdy je nevypínej ani neobcházej.
6. Testy, které napsal `tester`, neměníš bez souhlasu Radka. Když test padá, opravuješ kód, ne test.
7. Ověřovatel a čtenář laik startují bez tvého kontextu. Nepředávej jim své úvahy, jen to, co mají kontrolovat.
8. Po každé dávce práce: souhrn do `docs/STAV.md` (hotovo, čeká na Radka, rizika). Commity česky, malé a popsané.
9. Žádný `git push`, deploy ani registrace služeb bez Radkova souhlasu.

## Kalkulačka průřezu

Logika je hotová a schválená Radkem. Reference je `docs/reference/kalkulacka-prurezu-v1.html`. Port do enginu 1:1, nový design, nápady navíc jen podle `docs/KALKULACKA_PRUREZU.md`. Čísla, tabulky a pravidla v ní neměň.

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
