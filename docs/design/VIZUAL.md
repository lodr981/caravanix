# Vizuál Caravanixu: být před konkurencí

**Měřítko:** každá klíčová stránka vypadá na první pohled lépe než nejlepší konkurent. Konkurence má statické obrázky a tabulky. My máme obrázky, které žijí s výpočtem.

## Směr (schválený)

Dílna s tmavým „displejem“ výsledku. Luxusní, ale ne okázalé, pro lidi od 20 do 80 let (pravidla v `docs/design/ZADANI_DESIGNU.md`, kap. 2). Akcent je měď: tmavší na text a tlačítka, světlejší na plochy a ilustrace.

## Podpisové prvky (pořadí = priorita)

| # | Prvek | Proč „wow“ | Jak vzniká |
| --- | --- | --- | --- |
| 1 | **Řez kabelem v měřítku a kabel zbarvený podle zatížení** | laik poprvé vidí, co kupuje | SVG z výpočtu (alfa, krok 4) |
| 2 | **Karta výsledku ke sdílení** | každé sdílení na WhatsAppu je reklama | obrázek generovaný z dat (OG obrázek a PNG) |
| 3 | **Živé schéma:** proud teče animovaně, tloušťka čáry podle průřezu, pojistky s hodnotou | konkurence má jen statický obrázek | SVG z dat |
| 4 | **Řez dodávkou po vrstvách** (elektro, voda, topení), spotřebiče se rozsvěcují podle kalkulačky soběstačnosti | hlavní obrázek webu, nikdo ho nemá | izometrické SVG, vrstvy z dat |
| 5 | **Baterie den po dni** jako „palivoměr“ přes týden | soběstačnost na jeden pohled | SVG nebo graf z výpočtu |
| 6 | **Maskot a scény k lekcím** | humor a zapamatovatelnost | Mistral (FLUX) podle stylu designéra |

## Benchmark (designer udělá screenshoty jednou, uloží do `docs/design/benchmark/`)

- Mowgli Adventures (Interactive Wiring Diagram), FarOutRide (interaktivní schémata), Explorist.life
- CamperPlan (aplikace), VoltPlan, nástroje výrobců (Victron)

Ke každému napiš jednou větou, v čem je dobrý, a jednou větou, v čem ho překonáme.

Screenshoty 17. 11. 2026 (jen interní srovnání), srovnání podpisového prvku 1: `docs/design/benchmark/srovnani-prurez.png`.
- **FarOutRide** (wire-calc, electrical-system): nejlepší kalkulačka v oboru, velká čísla a fotka obvodu s hodnotami; překonáme ji řezem kabelu z dat v měřítku a zatížením, které laik pochopí bez AWG a „ampacity“.
- **Mowgli Adventures** (web 17. 11. nedostupný, snímek z archivu): poctivý průvodce schématem; překonáme ho tím, že obrázek žije s výpočtem, ne jako statický diagram v článku.
- **Explorist.life** (Susi Wiring Diagram): úplná schémata se seznamem dílů; překonáme ho klidem a čitelností (stránka je dlouhý seznam odkazů, místy rozbitá).
- **VoltPlan**: hezký editor schémat a čistý úvod; překonáme ho tím, že laik nemusí kreslit, výsledek i obrázek dostane hned z několika vstupů.
- **Victron** (MPPT calculator): důvěryhodná data výrobce; překonáme ho srozumitelností a vizualizací místo tabulky (u nich cookie lišta a hustý formulář).
- **CamperPlan**: doména nefunguje, bez snímku.

## Ikony a písmo

- Základ ikon: Lucide (ISC) nebo Phosphor (MIT). Vybere designer, jednou. Vlastní ikony oboru (baterie, booster, MPPT, pojistka, měnič, lednice) se kreslí ve stejné čáře.
- Písmo s plnou češtinou, licence OFL, self-hosted.

## Rastrové obrázky přes Mistral

- Mistral generuje obrázky přes Agents API nástrojem `image_generation` (model FLUX1.1 [pro] Ultra). Cena podle Mistralu je asi 100 USD za 1 000 obrázků, tedy asi 0,10 USD za obrázek.
- Skript `tools/obrazek.mjs`: zadání → 4 varianty → uložení s promptem, datem a modelem → záznam v `docs/licence/EVIDENCE.md`.
- Klíč: `MISTRAL_API_KEY` v `.env`, samostatný klíč s měsíčním limitem. Zakládá Radek. Bez klíče ilustrátor dělá jen SVG a rastrové obrázky odloží.

## Vizuální brána

- Hlavní stránka, kalkulačka a jedna lekce: screenshot vedle nejlepšího konkurenta → Radek v `docs/PRO_RADKA.md` odpoví „lepší / není“. Jednou na stránku.
- Vizuální regresní testy (Playwright `toHaveScreenshot`) na `/styleguide` a klíčové stránky, aby kvalita neklesala.

## Plán „Vizuál 1“ (po dokončení `RYCHLA_ALFA.md`)

| # | Krok | Hotovo, když |
| --- | --- | --- |
| 1 | Benchmark a ikonová sada | screenshoty konkurence a sada ikon v `/styleguide` |
| 2 | Karta výsledku ke sdílení | sdílení odkazu ukáže náhled výsledku |
| 3 | Živé schéma na příkladu R1 (malá dodávka) | stránka s animovaným schématem |
| 4 | Řez dodávkou, hlavní obrázek webu | schválil Radek (vizuální brána) |
| 5 | Maskot a 2 scény k lekcím (pokud je klíč) | v lekcích, evidence licencí |
| 6 | Vizuální regresní testy | `npm run check` je pouští |
