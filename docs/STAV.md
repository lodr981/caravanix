# Stav

Aktualizuje hlavní vlákno po každé dávce práce. Radek sem kouká jako první.

## Čeká na Radka

Podrobně v `docs/OTAZKY.md`. Nejdůležitější:

1. **Schválit 9 karet třídy A** zaškrtnutím v `docs/karty/KE_SCHVALENI.md` (0005, 0007, 0012, 0013, 0014, 0015, 0021, 0022, 0024). Další ověřené karty třídy A (0003, 0009, 0035, 0036) do přehledu přidám po Vašem rozhodnutí.
2. **Dva spory po druhém vrácení**, oba o Vašem textu: teplé místo (0039, unese jen do ~40 °C) a svazek (0004, podmínka podobně zatížených kabelů a co při 4+ obvodech).
3. **Výjimky licencí vývojových nástrojů** (13 balíčků ISC/BlueOak/CC0/LGPL z Astro a Vitest), jinak brána licencí padá.
4. Drobnosti k výpočtu: důsledky výběru pojistky podle I30 (30 A → MIDI 40 A, 5 A → 7,5 A), zaokrouhlení ρ u 1,5 mm², pocínovaná lanka 95/120 mm².
5. **Push na GitHub** po založení `lodr981/caravanix`; domény a TMview.

## Úkoly alfy

Kroky postupu podle `docs/ZADANI.md`, kapitola První alfa. Stav: `čeká` (nezačato), `běží`, `k ověření`, `vráceno`, `čeká na Radka`, `hotovo`.

### 1. Základ repa

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| A-01 | Git, první commit | hlavní vlákno | archiv zadání | repo `main` | commit „Zadání, agenti…“ | hotovo |
| A-02 | Kostra monorepa | hlavní vlákno | CLAUDE.md | `packages/engine`, `data`, `ui`, `apps/web`, `content/cs`, `tools/check.mjs` | `npm run dev` ukáže /cs/, `npm run build` projde | hotovo |
| A-03 | Brány v `npm run check` | hlavní vlákno + autoři bran | brány alfy | `tools/check.mjs` | každá brána alfy je zavedená a hlídaná strojem | běží (2 ze 7 zavedené, ostatní hlásí NEZAVEDENO a check padá) |
| A-04 | Repo na GitHubu | Radek | `lodr981/caravanix` (soukromé) | `origin` | Radek založí repo a potvrdí push | čeká na Radka |

### 2. Design

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| D-01 | Tři směry vzhledu | designer | ZADANI_DESIGNU.md | `docs/design/smery/` | 3 style tiles + screenshoty + README | hotovo |
| D-02 | Výběr směru | Radek | D-01 | ROZHODNUTI.md | Radek vybral | hotovo (1 Dílna + displej ze 3) |
| D-03 | Design tokeny | designer | D-02 | `packages/ui` | světlý i tmavý režim, kontrasty změřené | hotovo (33 párů, `docs/design/TOKENY.md`) |
| D-04 | Komponenty | designer + hlavní vlákno | D-03 | `packages/ui` | pole, přepínač, posuvník, karta výsledku, hláška, tabulka, navigace, patička, karta ke sdílení | hotovo (interní stránka /cs/komponenty/, před vydáním odstranit) |
| D-05 | Vzor: hlavní stránka a kalkulačka průřezu | designer + hlavní vlákno | D-04, E-02 | `apps/web` | Radek schválil | čeká |
| D-06 | Hlavní obrázek: řez dodávkou (SVG) | designer | D-02 | `packages/ui/assets` | styl schválen na vzoru | čeká |
| D-07 | Zadání obrázků pro Le Chat | designer | D-02, L-01 | `docs/design/zadani-obrazku/` | zadání pro každou lekci | čeká |
| D-08 | Kontrola každé stránky | designer | hotové stránky | `docs/design/kontroly/`, `SCHVALENO.md` | každá stránka SCHVÁLENO | čeká |

### 3. Engine a kalkulačky

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| E-01 | Golden test průřezu | tester | KALKULACKA_PRUREZU.md, reference | `packages/engine/tests/` | test pokrývá mřížku ze zadání | hotovo (167 184 případů) |
| E-02 | Port kalkulačky průřezu v1 | hlavní vlákno | reference | `packages/engine/src/vodic-v1.ts` | golden test projde | hotovo (historie) |
| E-02b | Výpočet verze 2 | tester (reference, test) → hlavní vlákno | KALKULACKA_PRUREZU.md v2 | `packages/engine/src/vodic.ts` | golden test v2 projde | hotovo (485/485 testů) |
| E-02c | Výpočet v2 po 2. kole (pojistky podle tabulek Littelfuse, uložení 0,76/1,0/0,53, odpor podle průřezu) | tester → hlavní vlákno | KALKULACKA_PRUREZU.md, `packages/data` | engine | golden test projde | hotovo (545/545) |
| E-03 | Kalkulačka průřezu na webu | hlavní vlákno | E-02, D-05, karty | `/cs/kalkulacky/prurez-kabelu/` | akceptační kritéria v KALKULACKA_PRUREZU.md | čeká |
| E-04 | Nápady skupiny A 1–6 | hlavní vlákno + designer | E-03 | web | nápady fungují | čeká (Radek potvrdil 1–6) |
| E-05 | Katalog spotřebičů (~30) | reserser → overovatel | datasheety | `packages/data` + karty B | každá položka má schválenou kartu | čeká |
| E-06 | Kalkulačka spotřebičů a vaření | tester (testy) + hlavní vlákno | E-05 | engine + web | testy vzorců s ručními příklady | čeká |
| E-07 | Kalkulačka baterie | tester + hlavní vlákno | karty | engine + web | totéž | čeká |
| E-08 | Kalkulačka soláru (série/paralela, mráz) | tester + hlavní vlákno | karty, PVGIS (L-04) | engine + web | totéž | čeká |
| E-09 | Kalkulačka boosteru | tester + hlavní vlákno | karty | engine + web | totéž | čeká |
| E-10 | Kalkulačka měniče | tester + hlavní vlákno | karty | engine + web | totéž | čeká |
| E-08b | Předpočítání PVGIS (ČR 0,25°, vodorovně a 35° J, 1 kWp) | hlavní vlákno + strazce-licenci | ROZHODNUTI.md | `packages/data` | tabulka s verzí a datem, zdroj uveden | čeká |
| E-11 | Kalkulačka soběstačnosti (hlavní) | tester + hlavní vlákno | E-05 až E-10, PVGIS | engine + web | testy, sdílení odkazem, 100 ms | čeká |
| E-12 | Stav kalkulaček v URL | hlavní vlákno | E-03 | web | stejný odkaz = stejný výsledek | čeká |

### 4. Obsah a ověřování

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| K-01 | Karty z kalkulačky průřezu | reserser | reference, KALKULACKA_PRUREZU.md | `docs/karty/K-VODIC-*` | všechna tvrzení mají kartu | hotovo (28 karet) |
| K-02 | Ověření karet průřezu | overovatel | K-01 | `docs/karty/nalezy/` | každá karta SEDÍ, nebo vrácena | 1. kolo: 13 SEDÍ, 15 NESEDÍ |
| K-02b | Oprava karet a 2. kolo ověření | reserser → overovatel | nálezy | karty | opraveno a znovu ověřeno | hotovo: 19 SEDÍ, 5 NESEDÍ |
| K-02c | Karty a data po 2. kole Radka (3. a 4. kolo ověření) | reserser → overovatel | nálezy | karty, `packages/data` | SEDÍ | hotovo: data SEDÍ, karty 35 overeno, 0004 a 0039 spor |
| K-02d | Spory 0007, 0012, 0016 (2. vrácení) | Radek | nálezy | rozhodnutí | Radek rozhodl | hotovo |
| K-02e | Spory 0004 a 0039 (2. vrácení, text Radka) | Radek | nálezy kolo 3 a 4 | rozhodnutí | Radek rozhodl | čeká na Radka |
| K-03 | Schválení karet třídy A | Radek | K-02 | karty `schvaleno` | Radek podepsal | čeká na Radka (9 karet v KE_SCHVALENI.md) |
| L-01 | Návrh 10 lekcí | reserser | Průvodce zásadami | `docs/lekce/NAVRH_10_LEKCI.md` | výběr podle hledanosti | hotovo (hledanost jen orientačně) |
| L-02 | Karty pro 10 lekcí | reserser → overovatel | L-01 | `docs/karty/` | schválené karty | čeká |
| L-03 | Klíčová slova cs | autor-zeme | profil cs | `docs/profily/cs.md` | tabulka klíčových slov se zdroji | čeká |
| L-04 | Texty lekcí a kalkulaček | autor-zeme → kontrolor-zeme | L-02, L-03 | `content/cs/` | kontrolor pustil | čeká |
| L-05 | Struktura adres, titulky, sitemap, hreflang | technicke-seo | L-03 | `docs/seo/` | sitemap bez chyb, prázdný profil de jde přidat | čeká |
| L-06 | Test srozumitelnosti | ctenar-laik | hotový web | `docs/laik/` | úkoly splněné bez zaseknutí | čeká |
| P-01 | Název Caravanix: domény, známky | strazce-licenci → Radek | – | `docs/licence/NAZEV_CARAVANIX.md` | caravanix.eu, .cz, .pl volné; Radek zkontroluje TMview a zaregistruje | čeká na Radka |
| P-02 | Licence PVGIS pro API | strazce-licenci | – | `docs/licence/PVGIS.md` | podmínky zjištěné | hotovo |
| P-03b | Brána licencí závislostí (MPL jen ve vývoji) | hlavní vlákno | rozhodnutí Radka | `tools/licence.mjs` | brána v check | hotovo; padá na 13 neschválených výjimkách, čeká na Radka |
| P-03 | Evidence licencí všeho na webu | strazce-licenci | assety | `docs/licence/EVIDENCE.md` | brána v check | čeká |
| P-04 | Fotky (6–8 záběrů) | Radek | seznam záběrů | fotky | evidované | čeká na Radka |

### 5. Brány alfy

| ID | Brána | Hlídá | Stav |
| --- | --- | --- | --- |
| B-01 | Všechen publikovaný obsah má schválenou kartu (K6) | check: karty | nezavedeno |
| B-02 | Každý vzorec enginu má test a ruční příklad | vitest | částečně (průřez) |
| B-03 | Designér schválil každou stránku | check: SCHVALENO.md | nezavedeno |
| B-04 | Lighthouse ≥ 95 na každé stránce | check: Lighthouse CI | nezavedeno |
| B-05 | Sitemap bez chyb, prázdný profil de bez zásahu do kódu | check: sitemap | nezavedeno |
| B-06 | Web běží lokálně jedním příkazem | `npm run dev` | splněno pro kostru |

## Hotovo v poslední dávce (dávka 3, 16. 11. 2026)

- Radkova rozhodnutí 2. kola v `docs/ROZHODNUTI.md`; zadání v2 přepsané (pojistky podle tabulek Littelfuse při 30 °C, rodiny ATOF/MIDI/MEGA, uložení 0,76 / 1,0 / 0,53, motorový prostor se nepočítá, odpor podle průřezu, AWG s větším ρ ze sousedů). Do zásobníku: motorový prostor s tabulkami 105/125/150 °C, počet obvodů, teplota okolí.
- **Data:** `packages/data/src/odpor-vodicu.json` (15 průřezů) a `pojistky.json` (22 pojistek) – ověřovatel potvrdil všechny hodnoty proti datasheetům, včetně 95 a 120 mm².
- **Tester:** nezávislá reference v2 z textu zadání, golden test 183 312 případů, 28 mutantů výpočtu odhaleno, 12 ručních příkladů. **Engine** v2: 545/545 testů; záměrná chyba (0,8 místo 0,76) shodí 62 testů.
- **Licence:** pravidlo MPL 2.0 jen ve vývojových závislostech v `CLAUDE.md`; brána `node tools/licence.mjs` v `npm run check`. Astro a @astrojs/react přesunuty mezi vývojové závislosti (statický web je za běhu nepotřebuje); produkční strom je jen React a IBM Plex (MIT, OFL).
- **Karty:** 3. a 4. kolo ověření. Stav: 35 `overeno`, 2 ve sporu (0004, 0039), 3 `k-prezkoumani` (0002, 0008, 0011 – nepoužité). Přehled 9 karet třídy A ke schválení v `docs/karty/KE_SCHVALENI.md` (0009 a 0035 staženy, protože se měnily; přidány 0007 a 0012).
- Žádná karta zatím není `schvaleno`, na webu tedy dál nic s fakty není. Kalkulačka průřezu na webu zatím není (čeká na schválené karty a texty).

## Rizika

- **Spory 0004 a 0039** se týkají textů u výsledku; dokud je Radek nerozhodne, kalkulačka nejde ven.
- **Koeficienty uložení** stojí na výtazích Lapp z vydání 2003; k = 1,0 pro vodič na povrchu je jen rozhodnutí odborníka.
- **Brány:** `npm run check` má zavedené testy, build a licence závislostí (ta padá na neschválených výjimkách); karty, licence assetů, designérovo schválení, Lighthouse a sitemap zatím NEZAVEDENO.
- **Agenti** běží jako obecní agenti s pokynem řídit se definicí v `.claude/agents/`.
