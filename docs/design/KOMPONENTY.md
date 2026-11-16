# Komponenty design systému (krok 3 zadání designu)

Komponenty jsou React (TSX) v `packages/ui/src/components/`, export z `@caravanix/ui`. Žádná nemá text natvrdo: všechny texty, včetně přístupných názvů, přicházejí jako props ze souborů jazyka (`content/cs/*.json`). Styl je v `packages/ui/src/components.css` (třídy `cx-*`), jen přes tokeny (`docs/design/TOKENY.md`).

| Komponenta | Co umí | Pravidla z kapitoly 2 |
| --- | --- | --- |
| `NumberField` | popisek nad polem, jednotka, nápověda, chyba s ikonou | `inputmode="decimal"`, přijímá čárku i tečku a mezery (`parseDecimal`), vrací text i číslo hned při psaní; `aria-invalid`, `aria-describedby` |
| `SegmentedControl` | skupina přepínačů ve vzhledu tlačítek, druhý řádek vysvětlení | `fieldset` + `legend`, nativní radio (šipky), vybraný stav výplní, ne jen barvou okraje |
| `Slider` | posuvník s hodnotou, tlačítka − a + s krokem, značky skoků, věta pod ním | jemné nastavení bez tahu, `aria-valuetext`; na úzkém okně posuvník přes celou šířku a tlačítka pod ním |
| `Button` | primární (tmavá měď), sekundární, tiché; jako `<a>` s `href` | text povinný, ikona jen s textem; 48 px |
| `ResultCard` | nadpis, tmavý displej s hlavním číslem, další hodnoty, stav, věta „co z toho plyne“, obsah pod displejem | číslo je největší prvek; roztmívání 260 ms jen při změně hodnoty, při omezeném pohybu nic; změna se ohlásí (`aria-live`) |
| `Notice` | OK / varování / blok | barva + ikona + slovo, blok silnější okraj; volitelně `role="status"` / `alert` |
| `DataTable` | titulek, číselné sloupce vpravo, zvýrazněný řádek, poznámka | pod 34 rem se řádky skládají pod sebe s popiskem sloupce, nic se neposouvá do strany; role tabulky výslovně |
| `SiteHeader` + `ThemeToggle` | značka, navigace, přepínač režimu, odkaz „Přeskočit na obsah“ | navigace se na mobilu zalomí, žádné skryté menu; přepínač funguje bez hydratace (`docs/design/TOKENY.md`, kapitola Světlý a tmavý režim) |
| `SiteFooter` | slot `notice` pro upozornění „podklad, ne revize“ (plná velikost písma), odkazy, drobný text | drobný text 14,4 px (jediná výjimka pod 15 px) |
| `ShareCard` | výsledek jako karta v poměru náhledu odkazu, stav, vstupy, adresa, zkrácené upozornění, tlačítka | z tohoto HTML se později vyrenderuje obrázek Open Graph |

Ikony (`icons.tsx`) jsou vždy `aria-hidden`; značka webu `Logo` je řez vodičem (prstenec a měděné jádro).

## Ukázková stránka (jen interní)

`apps/web/src/pages/cs/komponenty.astro` → `/cs/komponenty/`. **Je jen interní a před vydáním se odstraní** (spolu s `apps/web/src/components/KomponentyDemo.tsx` a `content/cs/komponenty.json`). Má `noindex`, nevede na ni žádný odkaz. Čísla ve výsledku jsou ukázková data ze style tile, nic se tu nepočítá.

## Napojení do webu

- `apps/web/src/layouts/Zaklad.astro`: importuje `@caravanix/ui/styles.css` (písmo, tokeny, základ, komponenty), vkládá `themeInitScript` do `<head>`, vykresluje `SiteHeader` a `SiteFooter` na serveru (bez hydratace) a `<main id="obsah">`.
- `/cs/` používá layout, obsah je zatím jen nadpis a „Připravujeme.“.
- Interaktivní komponenty se na stránkách vkládají jako React ostrůvky (`client:visible` nebo `client:load`).

## Kontrola

`npm run build` a potom `node tools/design/screenshoty.mjs /cs/komponenty/ komponenty` (v PowerShellu; v Git Bash cestu začínající lomítkem přepíše MSYS, tam `MSYS_NO_PATHCONV=1`). Výsledek v `docs/design/kontroly/komponenty/`.
