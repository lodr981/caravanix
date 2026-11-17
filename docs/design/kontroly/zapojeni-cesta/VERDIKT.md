# Verdikt: průvodce zapojením, Cesta k elektrice, Jak postupovat, AI ilustrace (17. 11. 2026)

**SCHVÁLENO s výhradou k ilustracím.** Stránky projdou; scéna k lekci o alternátoru je VRÁCENA ilustrátorovi.

Automatická kontrola (přetečení, písmo pod 15 px, dotykové cíle, kontrast pod 4,5 : 1) bez nálezů na všech 10 snímcích. Kontrast je změřený nástrojem.

Opraveno rovnou:
- Tabulka kabelů na mobilu: řádky jako karty (trasa, pod ní proud, délka, průřez, pojistka s popisky), editovatelná délka už není schovaná za vodorovným posunem.
- Délka řádku: úvodní odstavce průvodce a seznamy v bloku „Další krok“ mají `--cx-measure` (předtím až 130 znaků).
- Tokeny místo pevných hodnot: dotykové cíle `--cx-tap` (bylo 44 px), `--cx-radius-pill`, `--cx-on-accent`.

Zbývá:
1. Ilustrace „scena-alternator“: jiný styl než maskot (fotorealistický filmový západ slunce = klišé „vanlife“ ze seznamu Ne), místo maskota robot. Přegenerovat ve stylu maskota.
2. Ilustrace „scena-zima“: styl blízký, ale dodávka je jiná postava než maskot a silueta silně připomíná VW T2 (bez loga). Příště držet maskota.
3. Česká typografie v `content/cs/zapojeni.json` (a nejspíš `cesta.json`): chybí nezlomitelné mezery po jednopísmenných předložkách (např. „v noci“, „a v kempu“, „u baterie“). Opraveno jen v `seznam.pojistkyHint`.
4. Dev server ukazuje lekce bez ilustrace (po změně `content.config.ts` je potřeba restart); build je v pořádku.
