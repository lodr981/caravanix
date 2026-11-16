# Stav

Aktualizuje hlavní vlákno po každé dávce práce. Radek sem kouká jako první.

## Čeká na Radka

Podrobně v `docs/OTAZKY.md`. Nejdůležitější:

1. **Schválit 11 karet třídy A** (ověřovatel potvrdil) a rozhodnout **3 spory po druhém vrácení** (K-VODIC-0007, 0012, 0016; ke každé je návrh formulace).
2. **Typ pojistky:** poměry pro rodiny ATOF, MINI, MAXI, MIDI, MEGA místo dočasného 1,25 × (tabulka v OTAZKY.md). Souvisí s pojistkou 225 A pro 160–180 A.
3. **Koeficienty uložení** podle Lapp (0,8 jen volně ve vzduchu, 0,76 na povrchu; motor dvojice 0,40; svazek 4+ obvodů).
4. **Push na GitHub:** po založení `lodr981/caravanix` poslat souhlas.
5. **Domény:** caravanix.eu, .cz, .pl jsou volné, ručně zkontrolovat TMview a zaregistrovat.
6. Design: tlačítko v tmavém režimu (obrácená měď), přepínač se 2 nebo 3 stavy, výjimka pro axe-core (MPL 2.0).

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
| E-02c | Typ pojistky podle rodiny | Radek → tester → hlavní vlákno | POJISTKY_RODINY.md | engine | rozhodnutí Radka, test, engine | čeká na Radka |
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
| K-02c | Karty 0029 a 0036 (1. vrácení), 0028 přepočet pro v2 | reserser → overovatel | nálezy kolo 2 | karty | SEDÍ | čeká |
| K-02d | Spory 0007, 0012, 0016 (2. vrácení) | Radek | nálezy | rozhodnutí | Radek rozhodl | čeká na Radka |
| K-03 | Schválení karet třídy A | Radek | K-02 | karty `schvaleno` | Radek podepsal | čeká na Radka (11 karet) |
| L-01 | Návrh 10 lekcí | reserser | Průvodce zásadami | `docs/lekce/NAVRH_10_LEKCI.md` | výběr podle hledanosti | hotovo (hledanost jen orientačně) |
| L-02 | Karty pro 10 lekcí | reserser → overovatel | L-01 | `docs/karty/` | schválené karty | čeká |
| L-03 | Klíčová slova cs | autor-zeme | profil cs | `docs/profily/cs.md` | tabulka klíčových slov se zdroji | čeká |
| L-04 | Texty lekcí a kalkulaček | autor-zeme → kontrolor-zeme | L-02, L-03 | `content/cs/` | kontrolor pustil | čeká |
| L-05 | Struktura adres, titulky, sitemap, hreflang | technicke-seo | L-03 | `docs/seo/` | sitemap bez chyb, prázdný profil de jde přidat | čeká |
| L-06 | Test srozumitelnosti | ctenar-laik | hotový web | `docs/laik/` | úkoly splněné bez zaseknutí | čeká |
| P-01 | Název Caravanix: domény, známky | strazce-licenci → Radek | – | `docs/licence/NAZEV_CARAVANIX.md` | caravanix.eu, .cz, .pl volné; Radek zkontroluje TMview a zaregistruje | čeká na Radka |
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

## Hotovo v poslední dávce (dávka 2, 16. 11. 2026)

- Radkova rozhodnutí zapsaná v `docs/ROZHODNUTI.md`, otázky přesunuté do vyřešených.
- Git v repu používá GitHub noreply e-mail, i zpětně v dosavadních lokálních commitech. Push zatím ne.
- Zadání kalkulačky průřezu přepsané na verzi 2 (`docs/KALKULACKA_PRUREZU.md`), v1 jako historie.
- Tester: test v1 přesměrovaný na `v1`, nezávislá reference v2 z textu zadání, golden test v2 (160 512 případů, 14 mutantů výpočtu odhaleno) a ruční příklady pro každé uložení (`tests/priklady/vodic-v2.md`).
- Engine verze 2 (`packages/engine/src/vodic.ts`): všech 485 testů prochází; záměrná chyba (svazek 0,55) shodí 41 testů.
- Designer: tokeny Dílny s tmavým displejem, IBM Plex Sans self-hosted, 10 komponent v `packages/ui`, přepínač režimu v hlavičce (localStorage, bez bliknutí, bez cookie), /cs/ v novém vzhledu, kontrolní screenshoty bez nálezů.
- Strážce: caravanix.eu je volná (WHOIS EURid), stejně jako .cz a .pl.
- Rešeršér: rodiny pojistek Littelfuse (`docs/karty/POJISTKY_RODINY.md`), 8 nových karet, 15 karet opravených.
- Ověřovatel 2. kolo: 19 SEDÍ, 5 NESEDÍ. Celkem 29 karet `overeno` (z toho 11 třídy A čeká na schválení), 5 `navrh`, 2 `k-prezkoumani`. Žádná karta zatím není schválená, takže na webu ještě nic s fakty není.

## Rizika

- **Pojistky:** dočasný poměr 1,25 × podle Littelfuse nestačí u MEGA 40, 60 a 225 A (při 20 °C) a v teple u dalších. Do rozhodnutí o rodinách se kalkulačka nepublikuje.
- **Koeficienty uložení** stojí jen na tabulkách Lapp (DIN VDE 0298-4 tab. 10 není veřejně dostupná).
- **Brány:** `npm run check` má zavedené jen testy a build; karty, licence, designérovo schválení, Lighthouse a sitemap jsou zatím NEZAVEDENO, takže check záměrně padá.
- **Kontrola přístupnosti** zatím jen výpočtem z tokenů (axe-core má MPL 2.0, čeká na Radka).
- **Hledanost lekcí** je jen orientační.
- **Agenti** běží jako obecní agenti s pokynem řídit se definicí v `.claude/agents/` (relace začala o složku výš).
