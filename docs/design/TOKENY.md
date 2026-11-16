# Design tokeny (krok 2 zadání designu)

Směr **1 Dílna** s tmavým „displejem“ výsledku ze směru 3 (rozhodnutí 16. 11. 2026). Oproti style tile je Dílna zklidněná, aby nepůsobila rusticky ani retro: pozadí je neutrálnější teplý kámen místo papíru, zmizely šrafy, číslované sekce „01“ a nadpisy verzálkami, nadpisy jsou v řezu 600, rádiusy o kousek měkčí (6–14 px) a stíny velmi jemné. Řemeslo nese typografie, měď a displej, ne dekorace.

## Kde co je

| Soubor | Co obsahuje |
| --- | --- |
| `packages/ui/src/tokens.ts` | **jediný zdroj pravdy**: barvy (světlý, tmavý, displej), písmo, typografická škála, mezery, rozměry, rádiusy, stíny, pohyb, páry ke kontrole kontrastu a funkce `contrastRatio` |
| `packages/ui/src/tokens.css` | CSS custom properties `--cx-*`, generuje `npm run design:tokeny`, ručně se neupravuje |
| `packages/ui/src/fonts.css`, `fonts/` | IBM Plex Sans self-hosted, latin a latin-ext, řezy 400/600/700 (6 souborů woff2, celkem asi 118 kB, prohlížeč stáhne jen to, co stránka potřebuje); generuje `npm run design:fonty` z `@fontsource/ibm-plex-sans` |
| `packages/ui/src/base.css`, `components.css` | základ stránky a styl komponent, jen přes tokeny |
| `packages/ui/src/styles.css` | vstupní styl, web ho importuje jednou (`import "@caravanix/ui/styles.css"`) |
| `packages/ui/tests/tokeny.test.ts` | stejná kontrola kontrastu jako ve skriptu, běží v `npm test` |

Skript `node tools/design/tokeny.mjs` spočítá kontrast všech párů v obou režimech, přepíše tabulku níž a **skončí chybou (kód 1), když pár nesplní minimum**; `tokens.css` se pak nezapíše.

## Barvy

| Role | Token | Světlý | Tmavý | Použití |
| --- | --- | --- | --- | --- |
| Pozadí | `bg` | `#F6F4F0` | `#12100E` | stránka |
| Karta | `surface` | `#FFFFFF` | `#1C1915` | karty, pole |
| Tónovaná plocha | `surface2` | `#EEEAE3` | `#26221D` | záhlaví tabulky, jednotka v poli |
| Text | `text` | `#1B1815` | `#F2EDE5` | běžný text |
| Vedlejší text | `muted` | `#57504A` | `#BFB4A6` | nápovědy, popisy |
| Okraj pole | `border` | `#857B70` | `#91867A` | pole, segmenty, sekundární tlačítko |
| Linka | `line` | `#E2DCD3` | `#332D27` | jen dekorativní dělení |
| **Tmavá měď** | `accent` | `#7A3A17` | `#E2A070` | plocha hlavního tlačítka a vybraného segmentu, fokus |
| Tmavá měď (najetí) | `accentHover` | `#632E11` | `#EDB389` | |
| Text na mědi | `onAccent` | `#FFFFFF` | `#1A0F08` | popisek tlačítka (8,58 a 8,51 : 1) |
| **Tmavá měď (text)** | `accentText` | `#74361A` | `#E9AE80` | odkazy, akcentní text |
| **Jasná měď** | `copper` | `#B4652F` | `#D4864D` | jen plochy, ikony, ilustrace, značky na stupnici; nikdy text |
| Měkká měď | `copperSoft` | `#F2DFCF` | `#4A3020` | výplň v ilustracích, zvýrazněný řádek tabulky, výběr textu |
| Displej | `displayBg` | `#1C1916` | `#0A0908` | karta výsledku a karta ke sdílení, v obou režimech tmavá |
| Displej: text | `displayText` / `displayMuted` | `#F5F1EA` / `#B9AFA3` | stejné | |
| Displej: měď | `displayAccent` | `#E3A574` | stejná | jednotky, adresa na kartě ke sdílení, linka nahoře |
| Displej: stavy | `displayOk` / `displayWarn` / `displayBlock` | `#9FDCB2` / `#F1C978` / `#FFB0A5` | stejné | stav na displeji (vždy s ikonou a slovem) |
| Hlášky | `okFg/okBg`, `warnFg/warnBg`, `blockFg/blockBg` | viz `tokens.ts` | | |

V tmavém režimu se role mědi obrací: tlačítko je světlá měď s tmavým popiskem (jinak by tmavé tlačítko na tmavém pozadí nebylo vidět). Pravidlo „text na tlačítku alespoň 7 : 1“ platí v obou režimech. Displej je v tmavém režimu tmavší než stránka a má viditelný okraj, takže pořád působí jako zapuštěná obrazovka.

## Písmo a škála

IBM Plex Sans, řezy 400, 600, 700. Kořen 18 px na mobilu a 20 px od 1024 px (v procentech, takže se uplatní i velké písmo nastavené v prohlížeči). Řádkování 1,55, odstavec nejvýš 36 em (asi 65 znaků). Čísla tabulkovými číslicemi (`.cx-num`, tabulky, pole).

| Úroveň | Token | Hodnota | 360 px | 1280 px |
| --- | --- | --- | --- | --- |
| Číslo výsledku | `--cx-fs-display` | `clamp(2.4rem, 1.4rem + 6vw, 3.75rem)` | 46,8 px | 75 px |
| Nadpis 1 | `--cx-fs-h1` | `clamp(1.75rem, 1.1rem + 3.4vw, 2.6rem)` | 32 px | 52 px |
| Nadpis 2 | `--cx-fs-h2` | `clamp(1.4rem, 1.1rem + 1.6vw, 1.7rem)` | 25,6 px | 34 px |
| Nadpis 3 | `--cx-fs-h3` | `1.2rem` | 21,6 px | 24 px |
| Úvodní odstavec | `--cx-fs-lead` | `1.15rem` | 20,7 px | 23 px |
| Základní text | `--cx-fs-body` | `1rem` | 18 px | 20 px |
| Vedlejší text | `--cx-fs-small` | `0.875rem` | 15,75 px | 17,5 px |
| Patička (jen drobný text) | `--cx-fs-foot` | `0.8rem` | 14,4 px | 16 px |

Nadpisy mají `hyphens: auto` (česky dělí slova podle pravidel, ne uprostřed slabiky) a `text-wrap: balance`.

## Mezery, rozměry, rádiusy, stíny, pohyb

- Mezery `--cx-space-1` až `-9`: 0,25 / 0,5 / 0,75 / 1 / 1,5 / 2 / 3 / 4 / 6 rem (rostou se základním písmem i se zvětšením).
- Dotykový cíl `--cx-tap` = `max(48px, 2.75rem)`, mezera mezi cíli `--cx-tap-gap` 0,5 rem (nejméně 9 px). Obsah nejvýš `--cx-content` 72 rem, okraj `--cx-gutter` `max(16px, 4vw)`.
- Rádiusy: `sm` 6 px (ovládání), `md` 10 px (displej, tabulka), `lg` 14 px (karty), `pill`.
- Stíny: `--cx-shadow-sm`, `-md`, `-display`, každý režim vlastní (v tmavém režimu slabší, místo nich okraje).
- Pohyb: `--cx-motion-fast` 120 ms, `-base` 200 ms, `-result` 260 ms (roztmívání čísla výsledku, nejvýš 300 ms podle zadání), `--cx-ease`. Při `prefers-reduced-motion: reduce` jsou všechny délky 0 ms a `base.css` navíc vypne animace a přechody.

## Světlý a tmavý režim

- Výchozí podle zařízení (`prefers-color-scheme`), přepínač „Tmavý režim / Světlý režim“ v hlavičce, volba v `localStorage` pod klíčem `cx-theme`, žádná cookie.
- Inline skript `themeInitScript` (`packages/ui/src/theme.ts`) v `<head>` nastaví `<html data-theme>` ještě před vykreslením, takže špatný režim nikdy neblikne. Ověřuje to `tools/design/screenshoty.mjs` (barva pozadí při `DOMContentLoaded` po uložené volbě).
- Když člověk zvolí stejný režim, jaký má zařízení, uložená volba se smaže a web zase sleduje zařízení. Uložená je jen odchylka.
- Bez JavaScriptu je přepínač skrytý a platí nastavení zařízení (CSS `@media (prefers-color-scheme: dark)`).

## Kontrasty

<!-- KONTRASTY:START (vygenerováno: node tools/design/tokeny.mjs) -->
Vzorec WCAG 2.x, poměr zaokrouhlený dolů. Hodnoty v tabulce jsou světlý / tmavý režim.

| Pár | Popředí | Pozadí | Min. | Světlý | Tmavý |
| --- | --- | --- | --- | --- | --- |
| Text na pozadí | `text` `#1B1815` / `#F2EDE5` | `bg` `#F6F4F0` / `#12100E` | 7 | 16,09 | 16,29 |
| Text na kartě | `text` `#1B1815` / `#F2EDE5` | `surface` `#FFFFFF` / `#1C1915` | 7 | 17,67 | 15,02 |
| Text na tónované ploše | `text` `#1B1815` / `#F2EDE5` | `surface2` `#EEEAE3` / `#26221D` | 7 | 14,74 | 13,55 |
| Vedlejší text na pozadí | `muted` `#57504A` / `#BFB4A6` | `bg` `#F6F4F0` / `#12100E` | 4,5 | 7,20 | 9,30 |
| Vedlejší text na kartě | `muted` `#57504A` / `#BFB4A6` | `surface` `#FFFFFF` / `#1C1915` | 4,5 | 7,91 | 8,58 |
| Vedlejší text na tónované ploše | `muted` `#57504A` / `#BFB4A6` | `surface2` `#EEEAE3` / `#26221D` | 4,5 | 6,60 | 7,74 |
| Odkaz (tmavá měď) na pozadí | `accentText` `#74361A` / `#E9AE80` | `bg` `#F6F4F0` / `#12100E` | 7 | 8,36 | 9,79 |
| Odkaz (tmavá měď) na kartě | `accentText` `#74361A` / `#E9AE80` | `surface` `#FFFFFF` / `#1C1915` | 7 | 9,18 | 9,03 |
| Odkaz (tmavá měď) na tónované ploše | `accentText` `#74361A` / `#E9AE80` | `surface2` `#EEEAE3` / `#26221D` | 7 | 7,66 | 8,14 |
| Popisek tlačítka na tmavé mědi | `onAccent` `#FFFFFF` / `#1A0F08` | `accent` `#7A3A17` / `#E2A070` | 7 | 8,58 | 8,51 |
| Popisek tlačítka při najetí | `onAccent` `#FFFFFF` / `#1A0F08` | `accentHover` `#632E11` / `#EDB389` | 7 | 10,88 | 10,22 |
| Tlačítko (plocha) vůči kartě | `accent` `#7A3A17` / `#E2A070` | `surface` `#FFFFFF` / `#1C1915` | 3 | 8,58 | 7,91 |
| Tlačítko (plocha) vůči pozadí | `accent` `#7A3A17` / `#E2A070` | `bg` `#F6F4F0` / `#12100E` | 3 | 7,81 | 8,58 |
| Jasná měď (ikona, plocha) na pozadí | `copper` `#B4652F` / `#D4864D` | `bg` `#F6F4F0` / `#12100E` | 3 | 3,94 | 6,61 |
| Jasná měď (ikona, plocha) na kartě | `copper` `#B4652F` / `#D4864D` | `surface` `#FFFFFF` / `#1C1915` | 3 | 4,33 | 6,10 |
| Jasná měď na tónované ploše | `copper` `#B4652F` / `#D4864D` | `surface2` `#EEEAE3` / `#26221D` | 3 | 3,61 | 5,50 |
| Text na zvýrazněném řádku (měkká měď) | `text` `#1B1815` / `#F2EDE5` | `copperSoft` `#F2DFCF` / `#4A3020` | 7 | 13,66 | 10,38 |
| Okraj pole na kartě | `border` `#857B70` / `#91867A` | `surface` `#FFFFFF` / `#1C1915` | 3 | 4,14 | 4,91 |
| Okraj pole na tónované ploše | `border` `#857B70` / `#91867A` | `surface2` `#EEEAE3` / `#26221D` | 3 | 3,45 | 4,43 |
| Vybraný segment vůči kartě | `accent` `#7A3A17` / `#E2A070` | `surface` `#FFFFFF` / `#1C1915` | 3 | 8,58 | 7,91 |
| Okraj pole na pozadí | `border` `#857B70` / `#91867A` | `bg` `#F6F4F0` / `#12100E` | 3 | 3,77 | 5,32 |
| Fokus vůči pozadí | `focus` `#7A3A17` / `#E9AE80` | `bg` `#F6F4F0` / `#12100E` | 3 | 7,81 | 9,79 |
| Fokus vůči kartě | `focus` `#7A3A17` / `#E9AE80` | `surface` `#FFFFFF` / `#1C1915` | 3 | 8,58 | 9,03 |
| Hláška OK | `okFg` `#17502F` / `#A6E0B8` | `okBg` `#E3EFE5` / `#142519` | 7 | 7,97 | 10,68 |
| Hláška varování | `warnFg` `#5E3A00` / `#F3CB7C` | `warnBg` `#F8ECD2` / `#2B2110` | 7 | 8,61 | 10,27 |
| Hláška blok | `blockFg` `#8A1C12` / `#FFB7AC` | `blockBg` `#FAE3DE` / `#361714` | 7 | 7,58 | 9,78 |
| Displej: číslo a text | `displayText` `#F5F1EA` / `#F5F1EA` | `displayBg` `#1C1916` / `#0A0908` | 7 | 15,54 | 17,67 |
| Displej: vedlejší text | `displayMuted` `#B9AFA3` / `#B9AFA3` | `displayBg` `#1C1916` / `#0A0908` | 7 | 8,10 | 9,21 |
| Displej: jednotka a akcent (měď) | `displayAccent` `#E3A574` / `#E3A574` | `displayBg` `#1C1916` / `#0A0908` | 7 | 8,25 | 9,37 |
| Displej: stav OK | `displayOk` `#9FDCB2` / `#9FDCB2` | `displayBg` `#1C1916` / `#0A0908` | 7 | 11,12 | 12,65 |
| Displej: stav varování | `displayWarn` `#F1C978` / `#F1C978` | `displayBg` `#1C1916` / `#0A0908` | 7 | 11,13 | 12,66 |
| Displej: stav blok | `displayBlock` `#FFB0A5` / `#FFB0A5` | `displayBg` `#1C1916` / `#0A0908` | 7 | 10,00 | 11,37 |
| Displej: fokus | `displayFocus` `#F5F1EA` / `#F5F1EA` | `displayBg` `#1C1916` / `#0A0908` | 3 | 15,54 | 17,67 |

Výsledek: všechny páry splňují minimum.
<!-- KONTRASTY:END -->

Ručně ověřené navíc: číslo výsledku na displeji je největší a nejkontrastnější prvek stránky (15,54 : 1 světlý, 17,67 : 1 tmavý). Jasná měď (`copper`) je použitá jen jako plocha, ikona, značka na stupnici a v ilustracích, nikdy jako text. Vybraný segment se od nevybraného liší výplní (tmavá měď vůči kartě 8,58 : 1), ne jen okrajem.

## Otázky pro Radka

**Mistr, 16. 11. 2026: uzavřeno.** 1 a 2 rozhodl Radek (`docs/ROZHODNUTI.md`: světlá měď s tmavým textem v tmavém režimu, přepínač se dvěma stavy). 3 je nepodstatné: ukázková adresa zůstává, skutečnou doménu doplní hlavní vlákno před vydáním, až ji Radek zaregistruje.

1. **Tlačítko v tmavém režimu.** V tmavém režimu je hlavní tlačítko světlá měď `#E2A070` s tmavým popiskem (8,51 : 1). Tmavá měď by na tmavém pozadí splývala. Souhlasíte, že rozhodnutí „tmavší měď na tlačítka“ platí pro světlý režim a v tmavém se role obrací?
2. **Přepínač režimu má dva stavy, ne tři.** Tlačítko říká, na co přepne („Tmavý režim“ / „Světlý režim“). Volba „podle zařízení“ nemá vlastní tlačítko: když zvolíte stejný režim jako zařízení, web se k zařízení vrátí sám. Je to tak srozumitelné, nebo chcete výslovnou trojici Světlý / Tmavý / Podle zařízení (na mobilu by zabrala celý řádek hlavičky)?
3. **Adresa na kartě ke sdílení.** Ukázka používá `caravanix.eu/cs/prurez`. Doména zatím není potvrzená; před vydáním se doplní skutečná.
