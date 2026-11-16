# PVGIS: podmínky použití dat a API

Zpracoval `strazce-licenci`, 16. 11. 2026. Zdroje jsou oficiální stránky Evropské komise (JRC). Nejsem právník: níže jsou zjištění, ne právní rada.

## Shrnutí

- **Licence dat:** PVGIS uvádí, že informace jsou zdarma a jejich použití není omezeno. Jedinou podmínkou je uvést zdroj. Zákaz komerčního použití jsem v žádném oficiálním zdroji nenašel. Obecně pro obsah Komise platí CC BY 4.0 (uvést zdroj a vyznačit změny).
- **Uvedení zdroje:** povinné (zdvořilá žádost formulovaná jako podmínka „if the source is acknowledged“). Formulace a odkaz níže.
- **API:** bez registrace a bez klíče, limit **30 volání za sekundu na IP adresu** (pak HTTP 429), **volání z prohlížeče přes AJAX není dovoleno** (CORS se nemění). Pro náš web to znamená volat API ze serveru nebo při buildu, ne z React ostrůvku.
- **Předpočítání:** podmínky ukládání ani předpočítání nezakazují; data ke stažení (rastry, tabulky) jsou výslovně „free for public use“ s uvedením zdroje. Pro statický web a alfu bez serveru je předpočítání **vhodnější** (viz níže).
- **Riziko:** nízké. Hlavní úkoly jsou technické (CORS, verze API), ne licenční.

## Zdroje (ověřeno 16. 11. 2026)

| Co | Odkaz |
| --- | --- |
| PVGIS, hlavní stránka (odkaz, který se má citovat) | https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis_en |
| Usage conditions & data protection | https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis/general-information/usage-conditions-data-protection_en |
| API non-interactive service (PVGIS 5.3) | https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis/getting-started-pvgis/api-non-interactive-service_en |
| Geospatial data download | https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis/general-information/geospatial-data-download_en |
| PVGIS 6 (beta) | https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis/using-pvgis-6_en |
| PVGIS 6 API dokumentace | https://photovoltaic-geographic-information-system.ec.europa.eu/api/ |
| Právní upozornění Komise (CC BY 4.0, rozhodnutí 2011/833/EU) | https://commission.europa.eu/legal-notice_en |
| Rozhodnutí Komise 2011/833/EU o opakovaném použití dokumentů | https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011D0833 |

## Licence dat

Stránka Usage conditions, oddíl „1. Licence & Use“ (krátké citace, ne celý text):

- „The information provided by PVGIS is free and there are no restrictions on its use.“
- Uživatelé mají uvést zdroj jako Photovoltaic Geographic Information System (PVGIS) Společného výzkumného střediska (JRC) Evropské komise a citovat hlavní odkaz na stránku PVGIS.
- Výstupy nemusí odrážet stanovisko Komise a Komise neodpovídá za to, jak je kdo použije.

Stránka Geospatial data download: data jsou „free for public use“ pod podmínkou uvedení zdroje, s kreditem „PVGIS © European Communities, 2001-2026“.

Právní upozornění Komise: obsah vlastněný EU je, pokud není uvedeno jinak, pod licencí CC BY 4.0; opakované použití je dovoleno s uvedením zdroje a vyznačením změn. Z licence jsou vyloučené ochranné známky, loga a názvy (tedy nesmíme používat logo EU nebo JRC ani naznačovat, že nás Komise doporučuje).

**Komerční použití:** v žádném z uvedených zdrojů nenacházím zákaz. Formulace „no restrictions on its use“ a CC BY 4.0 komerční použití nevylučují.

**Podkladová data třetích stran:** PVGIS počítá z družicových a reanalyzačních dat (CM SAF / SARAH z EUMETSAT, ERA5 z Copernicus, NSRDB z NREL). My přebíráme výstupy PVGIS, ne původní datové sady, takže platí podmínky PVGIS. Kdybychom chtěli stahovat přímo SARAH nebo ERA5, mají vlastní licence a musí se prověřit zvlášť.

## Povinné uvedení zdroje: navržená formulace

Přesnou větu PVGIS nepředepisuje, žádá uvést název systému, JRC Evropské komise a hlavní odkaz. Návrh pro web (česky a pro další jazyky obdobně):

> Výnos soláru: Photovoltaic Geographical Information System (PVGIS), Společné výzkumné středisko (JRC) Evropské komise, https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis_en. Data jsme převzali v [měsíc rok] z PVGIS [verze, databáze např. PVGIS-SARAH3] a přepočítali pro kalkulačku. PVGIS © European Communities, 2001–2026.

Poznámky:
- Věta „přepočítali pro kalkulačku“ plní požadavek CC BY 4.0 vyznačit změny.
- Uvést verzi PVGIS a databázi záření, aby šlo výsledek zopakovat (hodí se i pro kartu tvrzení).
- Kredit patří na stránku kalkulačky soběstačnosti a do patičky nebo stránky „Zdroje“; ne jako logo.
- Oficiální název na hlavní stránce JRC je „Photovoltaic Geographical Information System“, na stránce podmínek „Photovoltaic Geographic Information System“; doporučuji první variantu podle hlavní stránky.

## Omezení API

Podle stránky „API non-interactive service“ (PVGIS 5.3):

- Základ: `https://re.jrc.ec.europa.eu/api/v5_3/<nástroj>?...`; nástroje mimo jiné `PVcalc` (síťový systém), `SHScalc` (**ostrovní systém**, pro nás nejzajímavější), `MRcalc` (měsíční záření), `DRcalc`, `seriescalc`, `tmy`, `printhorizon`.
- Limit 30 volání za sekundu na IP adresu, při překročení HTTP 429.
- Přístup přes AJAX (tj. přímo z prohlížeče návštěvníka) není dovolen a změny CORS správci odmítají.
- Bez registrace a bez klíče. Žádný zákaz komerčního použití API na stránce není.
- PVGIS 5.1 už byl vypnut, adresa bez verze slouží 5.2 jen dočasně. Verze se tedy mění a staré endpointy zanikají.

PVGIS 6: podle JRC je od června 2026 v betě, plná verze se čeká v roce 2027. Má nové API (`/api/v6/...`, JSON nebo CSV); jeho stránka limity ani podmínky zatím neuvádí, schéma se ještě mění (poslední změna 13. 11. 2026). Pro alfu bych zůstal u 5.3 a sledoval přechod.

## Předpočítat, nebo volat živě?

Licence předpočítání a uložení nezakazuje (data jsou „free… no restrictions“, stažitelné sady výslovně k veřejnému použití s uvedením zdroje). Technicky a provozně vychází lépe **předpočítat**:

| | Živé volání API | Předpočítaná tabulka |
| --- | --- | --- |
| Z prohlížeče | nedovoleno (AJAX/CORS) | ano, statický JSON |
| Potřebuje server nebo proxy | ano | ne, hodí se k Astro a statickému buildu |
| Alfa lokálně bez internetu | ne | ano |
| Ochrana soukromí | poloha návštěvníka odchází na náš server a do JRC | poloha neopouští prohlížeč, bez GDPR otázek |
| Závislost na změnách API (5.2 → 5.3 → 6) | vysoká | jen při přegenerování |
| Přesnost | přesný bod | mřížka (např. po 0,5–1°) a pevné sklony; pro odhad soběstačnosti obvykle dost |

Návrh (rozhoduje Radek a hlavní vlákno): skript v buildu stáhne z `SHScalc` / `MRcalc` měsíční výnosy pro mřížku bodů ČR a okolí (později DE, PL a cílové země cest) a několik sklonů (naplocho, 15°, 30°…), dodrží limit 30 volání/s s rezervou (např. 1–5 volání/s), uloží JSON do `packages/data` s verzí PVGIS, databází a datem stažení. Ten soubor dostane řádek v `EVIDENCE.md` a kartu tvrzení.

## Co ověřit u právníka

- [PRÁVNÍK] Potvrdit, že formulace „free… no restrictions on its use“ a CC BY 4.0 pokrývají použití výstupů v placené části (výstupy V1 až V3 a placená dokumentace), ne jen v bezplatné kalkulačce.
- [PRÁVNÍK] Zda je navržená věta o zdroji dostatečná pro CC BY 4.0 a v jakém jazyce ji uvádět na DE, PL a EN verzích.

## Otázky pro Radka

- [ČEKÁ NA RADKA] Souhlasíte s předpočítáním výnosů do statické tabulky místo živého volání API? Ovlivní to architekturu kalkulačky soběstačnosti (a vyhne se serveru v alfě).
- [ČEKÁ NA RADKA] Pro jaké oblasti a jak hustou mřížku předpočítat v alfě (jen ČR, nebo celá Evropa kvůli cestám)?
- Otázku v `docs/OTAZKY.md` („PVGIS: … ověřit, že to platí i pro API“) lze podle tohoto zjištění přesunout do vyřešených; to udělá hlavní vlákno.
