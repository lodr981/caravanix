# Tým a rychlost

Tento soubor čte každý agent jako první. Je krátký schválně: kdo čte celé `docs/`, ten spekuluje.

## Kdo je kdo

| Role | Co dělá | Kdy |
| --- | --- | --- |
| **Hlavní vlákno** (stavbyvedoucí) | staví, deleguje, rozhoduje spory testem podstatnosti, drží plán | vždy |
| `tester` | testy ze zadání a reference | ke každé změně výpočtu nebo chování |
| `overovatel` | jedno kolo nezávislé kontroly | před sloučením nebo vydáním |
| `designer` | art director: vizuální jazyk, design systém, rozložení, jedno kolo kontroly vzhledu | u nových stránek a výstupů a u změn rozhraní |
| `ilustrator` | ikony, ilustrace a vizualizace z dat v SVG, obrázky přes Mistral | na zadání designéra |
| `reserser` | zdroj pro konkrétní číslo nebo pravidlo | jen když ho krok potřebuje |
| `bezpecak` | bezpečnostní revize diffu | jen u přihlašování, rolí, dat, uploadů a nasazení |
| `uzivatel` | slepý test očima persony, jen vykreslený web | po dokončení stránky nebo průchodu, souběžně po jednom volání na personu |
| `seo` | adresa, titulek a fráze před stavbou; jedno kolo technické kontroly | u veřejných stránek |

## Rychlá pravidla (platí pro všechny)

1. **Čti jen** tento soubor, soubory z úkolu a seznam pro svou roli níže.
2. **Dělej jen zadaný úkol.** Nápad = jeden řádek do parkoviště, dál ho neřeš.
3. **Žádné varianty.** Rozhodni a napiš jednou větou proč.
4. **Stejný problém nejvýš 2 pokusy.** Pak zvol jednodušší řešení, nebo věc odlož a jeď dál.
5. **Žádné nové dokumenty, přehledy ani zprávy.** Výstup = změněné soubory a odpověď nejvýš 10 řádků.
6. **Ověřuje se jednou.** Druhé kolo jen pro podstatný nebo vysoký nález a jen nad jeho opravou.
7. **Rozhodnuté se znovu neotevírá** bez konkrétního příkladu: vstup → výsledek → proč je to špatně.
8. **Spor** (autor nesouhlasí s nálezem) rozhodne hlavní vlákno testem podstatnosti, ne člověk.

## Test podstatnosti

Nález se řeší, jen když platí aspoň jedno:

1. Uživatel v **běžném případě** dostane nebezpečnější nebo nesprávný výsledek.
2. Hrozí **únik nebo poškození dat**, nebo obejití role.
3. **Padá test** nebo není splněné akceptační kritérium.
4. Text je **věcně nepravdivý** tak, že čtenáře splete.

Všechno ostatní je poznámka a nic se nemění: formulace, styl, okrajový případ na bezpečné straně, přesnost, která nemění rozhodnutí uživatele, chybějící druhý zdroj u běžné praxe.

## Hlavní vlákno: jak delegovat rychle

- Subagentovi dej **jen**: úkol jednou větou, kritérium hotovo, cesty k souborům (diff, test, kartu). Ne historii a ne celé zadání.
- Nevolej agenta „pro jistotu“. Každé volání musí mít konkrétní otázku.
- Nezávislé kontroly (tester, designer, ověřovatel) spouštěj souběžně.
- Do stavového souboru po dávce práce nejvýš 10 řádků: hotovo, další krok, co čeká na člověka.

# Projekt: Caravanix

- **Plán:** `docs/RYCHLA_ALFA.md` (kroky a „hotovo, když“). Po alfě přijde další plán ve stejném tvaru.
- **Pravda o výpočtu:** `docs/reference/kalkulacka-prurezu-v1.html` a `docs/reset/KALKULACKA_V1_1.md`. Rozhodnutí v `docs/ROZHODNUTI.md`.
- **Parkoviště:** `docs/ZASOBNIK.md`. **Stav:** `docs/STAV.md`. **Pro Radka:** `docs/PRO_RADKA.md`, nejvýš 5 položek.

## Co číst podle role

| Role | Čte |
| --- | --- |
| tester | `docs/reset/KALKULACKA_V1_1.md`, reference, sekce Golden test v `docs/KALKULACKA_PRUREZU.md` |
| overovatel | diff nebo kartu z úkolu, citovaný zdroj, `docs/ROZHODNUTI.md` (jen když jde o rozhodnutou věc) |
| designer | `docs/design/VIZUAL.md`; `docs/design/ZADANI_DESIGNU.md`, kap. 2 (pravidla 20–80 let) a 7 (kontrolní seznam) |
| ilustrator | `docs/design/VIZUAL.md`, zadání od designéra, tokeny v `packages/ui` |
| reserser | `docs/karty/_SABLONA.md`; kartu jen pro číslo ve výpočtu nebo bezpečnostní pravidlo |
| bezpecak | parkován: alfa je statický web bez účtů, nastoupí před nasazením |
| uzivatel | jen sekci Persony níže |
| seo | stránky z úkolu; klíčová slova zapisuje do `docs/profily/cs.md` (sekce Klíčová slova) |

## Persony (pro `uzivatel`)

| Persona | Kdo to je | Na co je citlivá |
| --- | --- | --- |
| Petr, 24 | telefon, spěchá, výsledek chce poslat kamarádovi | rychlost, sdílení, aby to nebylo „pro dědy“ |
| Jana, 45 | s rodinou staví dodávku, večer na notebooku | srozumitelnost, důvěra, co koupit |
| Miroslav, 72 | tablet, větší písmo, opatrný, chce rozumět proč | čitelnost, klid, nic skrytého, vysvětlení |

Výchozí úkol: „Zjistěte, jaký kabel a pojistku potřebujete k lednici 60 W, která je 5 m od baterie.“

## Veřejné stránky (pro `seo`)

Všechno na webu je veřejné: kalkulačky a lekce. Alfa běží lokálně, takže SEO navrhuje a kontroluje, ale data z vyhledávače přijdou až po spuštění.

## Příkazy

`npm test` · `npm run build` · `npm run dev` · `npm run check` (pokud existuje)

## Veto a člověk

- **Veto:** tester (padající test) a designer (jedno kolo; po opravách je hotovo). Výsledek `uzivatel` NESPLNIL u výchozího úkolu je podstatný nález a musí se opravit.
- **Radek schvaluje jen:** směr designu, karty třídy A, změnu výpočtu, placené a nevratné věci.
- Licence: každý obrázek, font a data na webu zapíše hlavní vlákno do `docs/licence/EVIDENCE.md`.

## Parkovaní agenti

V `.claude/agents-parkovani/` (Claude Code je nevidí): mistr (jeho pravidla drží hlavní vlákno přes test podstatnosti), autor-zeme, kontrolor-zeme, strazce-licenci. Vrátí se při překladech a před betou. Staré `ctenar-laik` a `technicke-seo` nahrazují `uzivatel` a `seo`.
