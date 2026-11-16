# Kontrola země cs: lekce a kalkulačka průřezu, 16. 11. 2026

Kontrolor: `kontrolor-zeme` (cs). Profil: `docs/profily/cs.md`. Výpočet a texty: `docs/KALKULACKA_PRUREZU.md`, kapitola „Verze 1.1: co platí“.

Kontrolováno:

- `content/cs/lekce/jaky-kabel-12v.md`
- `content/cs/lekce/pojistka-chrani-kabel.md`
- `content/cs/kalkulacka-prurezu.json`
- `content/cs/lekce.json`
- `content/cs/web.json`

## Verdikt: SCHVÁLENO

Čísla a bezpečnostní pravidla v lekcích odpovídají hlavičkám karet v poli `karty` (K-VODIC-0006, -0007, -0011 až -0017, -0021, -0022, -0025, -0026, -0028, -0036) a neodporují výpočtu v1.1 (pojistka alespoň 1,25× proud, bez 300 A, hlavní vedení nad rozsahem kalkulačky, Class T, 17,5 cm). Texty stanovené Radkem (HLAVNI_VEDENI, NAD_150A_MENIC, text o motorovém prostoru, předpoklad u výsledku, „nejvýš 17,5 cm“) jsou v kalkulačce beze změny. Vykání, tón a typografie odpovídají profilu.

## Drobné opravy (provedeny přímo v souborech)

1. `jaky-kabel-12v.md`, `zasada`: „tenký nebo dlouhý kabel se hřeje a ztrácí napětí“ → „tenký kabel se hřeje, tenký i dlouhý kabel ztrácí napětí“. Delší kabel se při stejném proudu a průřezu nehřeje víc (teplo na metr je stejné), jen roste úbytek napětí. Nová formulace je užší než K-VODIC-0028, nic nepřidává.
2. `jaky-kabel-12v.md`, sekce „Co udělá tenký kabel“: „…tím víc voltů ztratíte a tím víc se kabel hřeje“ → „…tím víc voltů ztratíte. Hřeje se hlavně tenký kabel, kterým teče velký proud. Délka kabel víc nezahřeje, jen přidá úbytek.“ Stejný důvod jako bod 1.
3. `jaky-kabel-12v.md`, odstavec Bezpečnost: „Každý kabel jistěte pojistkou … co nejblíž k baterii“ → „Každý kabel od baterie jistěte …“. Odbočky z rozvodu mají pojistku v místě zúžení (K-VODIC-0014); podmínky K-VODIC-0013 mluví o vodiči připojeném k baterii nebo zdroji.
4. `lekce.json`: nezlomitelná mezera po jednopísmenných předložkách a spojkách (4 místa: „a nezveřejňuje“, „v kalkulačce“, „a bezpečnostní“, „v lekci“).
5. `web.json`: nezlomitelná mezera po jednopísmenných předložkách a spojkách (6 míst, např. „a chaty“, „a baterii“, „a pojistka“, „a vaření“).

`kalkulacka-prurezu.json` beze změny (typografie i obsah v pořádku). JSON soubory po úpravě ověřeny parserem.

## Poznámky (nepodstatné podle testu mistra, nic se nemění)

- Texty u kalkulačky v1.1 uvádějí znění o CCA („Pro automobilová lanka CCA jsme zatížitelnost nedohledali; NEC dává CCA hodnoty hliníku.“ a „do vozu jen čistou měď“). V `kalkulacka-prurezu.json` žádný klíč pro CCA není; v lekci jaky-kabel-12v CCA je. Pokud má být CCA přímo u kalkulačky, je to úkol pro hlavní vlákno (nový klíč a komponenta), ne oprava textu.
- K-VODIC-0011 (1,25×) má stav `k-prezkoumani`; text lekce s ní a s v1.1 souhlasí.
- K-VODIC-0036 popisuje mez rozsahu ve verzi 2 (199,9 A), v1.1 má mez 200 A. Lekce číslo neuvádí, takže text sedí na obě.
- „Pojistka chrání kabel, ne spotřebič“ je zjednodušení (K-VODIC-0012 připouští, že chrání i zařízení). Jde o rámec mýtu lekce a laika nesplete.
