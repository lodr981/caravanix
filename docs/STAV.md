# Stav

Aktualizuje hlavní vlákno po každé dávce práce. Radek sem kouká jako první.

## Čeká na Radka

Podrobně v `docs/OTAZKY.md`. Nejdůležitější:

1. **Vybrat směr designu** (1 Dílna, 2 Krajina, 3 Přístroj). Otevřete `docs/design/smery/smer-*.html` v prohlížeči nebo se podívejte do `docs/design/smery/screenshoty/`. Designer doporučuje 1 Dílna.
2. **GitHub:** adresa repa, souhlas s `git push` a viditelnost (soukromé, nebo veřejné).
3. **Nálezy ověřovatele k výpočtu kalkulačky průřezu** (svazek, dvojice kabelů, motorový prostor, faktor pojistky 1,1×, pojistka 300 A). Výpočet zůstává, dokud nerozhodnete.
4. **Název Caravanix:** .com a .de jsou obsazené. Ruční hledání známek, nebo patentový zástupce?
5. **PVGIS:** předpočítat výnosy, a pro jaké území.
6. Nápady skupiny A u kalkulačky průřezu.

## Úkoly alfy

Kroky postupu podle `docs/ZADANI.md`, kapitola První alfa. Stav: `čeká` (nezačato), `běží`, `k ověření`, `vráceno`, `čeká na Radka`, `hotovo`.

### 1. Základ repa

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| A-01 | Git, první commit | hlavní vlákno | archiv zadání | repo `main` | commit „Zadání, agenti…“ | hotovo |
| A-02 | Kostra monorepa | hlavní vlákno | CLAUDE.md | `packages/engine`, `data`, `ui`, `apps/web`, `content/cs`, `tools/check.mjs` | `npm run dev` ukáže /cs/, `npm run build` projde | hotovo |
| A-03 | Brány v `npm run check` | hlavní vlákno + autoři bran | brány alfy | `tools/check.mjs` | každá brána alfy je zavedená a hlídaná strojem | běží (2 ze 7 zavedené, ostatní hlásí NEZAVEDENO a check padá) |
| A-04 | Repo na GitHubu | Radek | URL repa | `origin` | Radek potvrdí push a viditelnost | čeká na Radka |

### 2. Design

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| D-01 | Tři směry vzhledu | designer | ZADANI_DESIGNU.md | `docs/design/smery/` | 3 style tiles + screenshoty + README | hotovo |
| D-02 | Výběr směru | Radek | D-01 | ROZHODNUTI.md | Radek vybral | čeká na Radka |
| D-03 | Design tokeny | designer | D-02 | `packages/ui` | světlý i tmavý režim, kontrasty změřené | čeká |
| D-04 | Komponenty | designer + hlavní vlákno | D-03 | `packages/ui` | pole, přepínač, posuvník, karta výsledku, hláška, tabulka, navigace, patička, karta ke sdílení | čeká |
| D-05 | Vzor: hlavní stránka a kalkulačka průřezu | designer + hlavní vlákno | D-04, E-02 | `apps/web` | Radek schválil | čeká |
| D-06 | Hlavní obrázek: řez dodávkou (SVG) | designer | D-02 | `packages/ui/assets` | styl schválen na vzoru | čeká |
| D-07 | Zadání obrázků pro Le Chat | designer | D-02, L-01 | `docs/design/zadani-obrazku/` | zadání pro každou lekci | čeká |
| D-08 | Kontrola každé stránky | designer | hotové stránky | `docs/design/kontroly/`, `SCHVALENO.md` | každá stránka SCHVÁLENO | čeká |

### 3. Engine a kalkulačky

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| E-01 | Golden test průřezu | tester | KALKULACKA_PRUREZU.md, reference | `packages/engine/tests/` | test pokrývá mřížku ze zadání | hotovo (167 184 případů) |
| E-02 | Port kalkulačky průřezu | hlavní vlákno | reference | `packages/engine/src/vodic.ts` | golden test projde | hotovo (153/153) |
| E-03 | Kalkulačka průřezu na webu | hlavní vlákno | E-02, D-05, karty | `/cs/kalkulacky/prurez-kabelu/` | akceptační kritéria v KALKULACKA_PRUREZU.md | čeká |
| E-04 | Nápady skupiny A | hlavní vlákno | potvrzení Radka | E-03 | potvrzené nápady fungují | čeká na Radka |
| E-05 | Katalog spotřebičů (~30) | reserser → overovatel | datasheety | `packages/data` + karty B | každá položka má schválenou kartu | čeká |
| E-06 | Kalkulačka spotřebičů a vaření | tester (testy) + hlavní vlákno | E-05 | engine + web | testy vzorců s ručními příklady | čeká |
| E-07 | Kalkulačka baterie | tester + hlavní vlákno | karty | engine + web | totéž | čeká |
| E-08 | Kalkulačka soláru (série/paralela, mráz) | tester + hlavní vlákno | karty, PVGIS (L-04) | engine + web | totéž | čeká |
| E-09 | Kalkulačka boosteru | tester + hlavní vlákno | karty | engine + web | totéž | čeká |
| E-10 | Kalkulačka měniče | tester + hlavní vlákno | karty | engine + web | totéž | čeká |
| E-11 | Kalkulačka soběstačnosti (hlavní) | tester + hlavní vlákno | E-05 až E-10, PVGIS | engine + web | testy, sdílení odkazem, 100 ms | čeká |
| E-12 | Stav kalkulaček v URL | hlavní vlákno | E-03 | web | stejný odkaz = stejný výsledek | čeká |

### 4. Obsah a ověřování

| ID | Úkol | Kdo | Vstup | Výstup | Hotovo, když | Stav |
| --- | --- | --- | --- | --- | --- | --- |
| K-01 | Karty z kalkulačky průřezu | reserser | reference, KALKULACKA_PRUREZU.md | `docs/karty/K-VODIC-*` | všechna tvrzení mají kartu | hotovo (28 karet) |
| K-02 | Ověření karet průřezu | overovatel | K-01 | `docs/karty/nalezy/` | každá karta SEDÍ, nebo vrácena | 1. kolo: 13 SEDÍ, 15 NESEDÍ |
| K-02b | Oprava karet NESEDÍ (1. vrácení) | reserser | nálezy | karty | opraveno a znovu ověřeno | čeká (části čekají na Radka) |
| K-03 | Schválení karet třídy A | Radek | K-02 | karty `schvaleno` | Radek podepsal | čeká |
| L-01 | Návrh 10 lekcí | reserser | Průvodce zásadami | `docs/lekce/NAVRH_10_LEKCI.md` | výběr podle hledanosti | hotovo (hledanost jen orientačně) |
| L-02 | Karty pro 10 lekcí | reserser → overovatel | L-01 | `docs/karty/` | schválené karty | čeká |
| L-03 | Klíčová slova cs | autor-zeme | profil cs | `docs/profily/cs.md` | tabulka klíčových slov se zdroji | čeká |
| L-04 | Texty lekcí a kalkulaček | autor-zeme → kontrolor-zeme | L-02, L-03 | `content/cs/` | kontrolor pustil | čeká |
| L-05 | Struktura adres, titulky, sitemap, hreflang | technicke-seo | L-03 | `docs/seo/` | sitemap bez chyb, prázdný profil de jde přidat | čeká |
| L-06 | Test srozumitelnosti | ctenar-laik | hotový web | `docs/laik/` | úkoly splněné bez zaseknutí | čeká |
| P-01 | Název Caravanix: domény, známky | strazce-licenci | – | `docs/licence/NAZEV_CARAVANIX.md` | rešerše hotová, rozhodne Radek | čeká na Radka |
| P-02 | Licence PVGIS pro API | strazce-licenci | – | `docs/licence/PVGIS.md` | podmínky zjištěné | hotovo |
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

## Hotovo v poslední dávce (dávka 1, 16. 11. 2026)

- Git repo (`main`), commity česky. Na GitHub zatím nic nešlo.
- Kostra monorepa: `packages/engine`, `data`, `ui`, `apps/web` (Astro 7 + React), `content/cs/`. `npm run dev` ukáže /cs/, kořen / přesměruje na /cs/. `npm run build` projde.
- `npm run check` zavádí brány; zatím běží testy a build, ostatní brány hlásí NEZAVEDENO, takže check záměrně padá.
- Engine: kalkulačka průřezu přenesená 1:1 (`packages/engine/src/vodic.ts`). Golden test testera proti referenci: 153/153 testů, 167 184 vstupů. Záměrně zanesená chyba (1,05 místo 1,1) test shodí ve 48 testech.
- Designer: tři směry vzhledu se screenshoty a změřenými kontrasty (`docs/design/smery/`).
- Rešeršér: 28 karet z kalkulačky průřezu (12 × A, 11 × B, 5 × C) a návrh 10 lekcí.
- Ověřovatel (dvě nezávislé dávky): 13 SEDÍ (stav `overeno`), 15 NESEDÍ. Žádná karta zatím není schválená ani publikovatelná; karty třídy A navíc čekají na Radka.
- Strážce licencí: rešerše názvu a domén, podmínky PVGIS.

## Rizika

- **Logika kalkulačky průřezu proti zdrojům:** ověřovatel našel, že režim „svazek / motorový prostor“, zatížitelnost dvojice kabelů a faktor pojistky 1,1× mohou být na nebezpečné straně. Rozhoduje Radek; do té doby se karty nepublikují.
- **Název:** caravanix.com a .de jsou obsazené, známky nejsou prověřené.
- **Hledanost lekcí** je jen orientační (bez přístupu k Google Trends či Skliku).
- **Velikost repa:** screenshoty designu mají 14 MB. Po výběru směru je zmenšíme nebo přesuneme mimo git.
- **Agenti:** tahle relace nenačetla vlastní typy agentů z `.claude/agents/`, takže každý běžel jako obecný agent s pokynem řídit se svou definicí. Po spuštění `claude` přímo v této složce by se měly načíst samy.
