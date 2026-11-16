# Tři směry vzhledu (krok 1 zadání designu)

Každý směr je jedna samostatná stránka „style tile“. Otevřete ji dvojklikem, funguje ze souboru a bez internetu. Přepínač nahoře mění světlý a tmavý režim. Kalkulačka na stránce opravdu počítá: tabulky a funkce jsou 1 : 1 převzaté z `docs/reference/kalkulacka-prurezu-v1.html`. Výchozí stav (12 V, 120 W, 2,3 m, úbytek 3 %) dává ukázková čísla ze zadání: 2,5 mm², pojistka 15 A, úbytek 0,32 V.

| Směr | Stránka | Screenshoty |
| --- | --- | --- |
| 1 Dílna | [smer-1-dilna.html](smer-1-dilna.html) | `screenshoty/smer-1-dilna-*.png` |
| 2 Krajina | [smer-2-krajina.html](smer-2-krajina.html) | `screenshoty/smer-2-krajina-*.png` |
| 3 Přístroj | [smer-3-pristroj.html](smer-3-pristroj.html) | `screenshoty/smer-3-pristroj-*.png` |

Screenshoty: 360 a 1280 px, světlý i tmavý režim, navíc 360 px při 200% zvětšení. Stránky se generují ze společné šablony, aby šly srovnat prvek po prvku:

- `node tools/design-smery/generuj.mjs`: tokeny jsou v `tools/design-smery/smery.mjs`. Generátor z nich složí CSS i tabulku kontrastů (vzorec WCAG 2.x, zaokrouhleno dolů) a skončí chybou, když některý pár nesplní minimum. Tabulka se uloží i do `kontrasty.md`.
- `node tools/design-smery/screenshoty.mjs`: Playwright (Chromium). Nafotí všechny varianty a automaticky kontroluje vodorovné přetečení, písmo pod 15 px (v patičce pod 14 px), tenké řezy, dotykové cíle pod 48 × 48 px, mezery mezi cíli pod 8 px, tabulkové číslice a načtení písma. Aktuální výsledek: bez nálezů.

## Srovnání

| | 1 Dílna | 2 Krajina | 3 Přístroj |
| --- | --- | --- | --- |
| Pocit | přesný nástroj na teplém papíře, technická kresba, klid rýsovacího prkna | vzdušné, přívětivé, měkké tvary, cesta a příroda | sebevědomý měřák, tmavý displej s výsledkem, pevná mřížka |
| Písmo | IBM Plex Sans (OFL) | Atkinson Hyperlegible Next (OFL) | Inter (OFL) |
| Akcent | tmavá měď `#8A4319`, v tmavém režimu `#E7A270` | petrolejová `#0F5561` / `#86D0D6` | kobaltová `#2A40B0` / `#9AACFF` |
| Rádius | 4–6 px | 14–22 px, tlačítka jako pilulky | 8–10 px |
| Ilustrace | technická kresba: obrys, osy, měď šrafou, číslované odkazy s legendou | plochá ilustrace bez obrysů, krajina jako kulisa | displej: geometrie, vodič zbarvený podle zatížení, ukazatel po dílcích |
| Pro koho nejvíc | Jana (důvěra, „poctivé řemeslo“), Miroslav (klid, kresba vysvětluje) | Miroslav (nejčitelnější písmo), začátečníci | Petr (rychlost, výsledek ke sdílení), čtení na slunci |
| Rizika | Měď musí být hodně tmavá, aby bílý popisek tlačítka dal 7 : 1 (máme 7,24 : 1, rezerva malá); působí víc hnědě než měděně. Technická kresba je pracná a musí zůstat jedním stylem. | Atkinson má přeškrtnutou nulu: „120 W“ se čte jako „12Ø W“ a v oboru, kde Ø znamená průměr, to může mást. Měkké tvary hrozí „aplikace pro děti“, Petr může mít pocit „pro dědy“. Petrolejová je blízko zelené barvy pro OK (ikona a slovo to drží, ale je to riziko). | Tmavý panel ve světlém režimu je silný prvek a na stránce s více výsledky by mohl být těžký. Kobaltová modř je obecná, méně „naše“. Inter je všudypřítomný, menší vlastní tvář. |

### K akcentu

Měď ze zadání dává smysl (měď ve vodičích, teplo, řemeslo) a odlišuje web od modrých technických webů. Nevýhoda: světlá, „opravdová“ měď nemá s bílým textem ani 4,5 : 1. Proto má směr 1 dvě mědi: tmavou pro tlačítka a text (`#8A4319`) a světlejší jen pro ilustrace (`#A95A26`, `#B8692F`), kde neplatí textový kontrast. Navrhuji měď ponechat. Alternativy ve směrech 2 a 3 jsou tu proto, aby Radek viděl srovnání, ne proto, že by byly lepší.

## Kontrasty (spočítané generátorem)

Minimum: běžný text 7 : 1, vedlejší text 4,5 : 1, okraje polí, plocha tlačítka a fokus 3 : 1. Všechny páry ve všech směrech splňují.

| Pár | Min. | 1 světlý | 1 tmavý | 2 světlý | 2 tmavý | 3 světlý | 3 tmavý |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Text na pozadí | 7 | 15,49 | 15,88 | 15,44 | 15,69 | 17,02 | 16,89 |
| Text na kartě | 7 | 17,02 | 14,56 | 16,82 | 14,09 | 18,72 | 15,53 |
| Text na tónované ploše | 7 | 13,96 | 13,05 | 14,05 | 12,34 | 15,28 | 14,09 |
| Vedlejší text na pozadí | 4,5 | 7,30 | 9,56 | 7,55 | 9,70 | 7,82 | 8,95 |
| Vedlejší text na kartě | 4,5 | 8,02 | 8,77 | 8,23 | 8,71 | 8,60 | 8,23 |
| Vedlejší text na tónované ploše | 4,5 | 6,57 | 7,86 | 6,87 | 7,63 | 7,02 | 7,46 |
| Akcentní text (odkaz) na pozadí | 7 | 7,39 | 9,88 | 8,44 | 11,28 | 8,23 | 9,98 |
| Akcentní text (odkaz) na kartě | 7 | 8,12 | 9,06 | 9,19 | 10,13 | 9,05 | 9,18 |
| Popisek tlačítka na akcentu | 7 | 7,24 | 8,68 | 8,42 | 9,70 | 8,54 | 8,52 |
| Hláška OK | 7 | 8,01 | 10,68 | 8,42 | 10,42 | 7,99 | 10,41 |
| Hláška varování | 7 | 8,28 | 10,27 | 8,34 | 10,27 | 8,44 | 10,17 |
| Hláška blok | 7 | 7,60 | 9,78 | 7,74 | 9,57 | 7,63 | 9,56 |
| Okraj pole na kartě | 3 | 4,23 | 4,33 | 4,28 | 4,72 | 4,55 | 4,59 |
| Tlačítko (plocha) vůči kartě | 3 | 7,13 | 7,98 | 8,42 | 9,35 | 8,54 | 8,22 |
| Fokus vůči pozadí | 3 | 15,49 | 15,88 | 15,44 | 15,69 | 17,02 | 16,89 |
| Číslo výsledku na panelu | 7 | – | – | – | – | 16,24 | 14,93 |
| Vedlejší text na panelu | 4,5 | – | – | – | – | 8,60 | 8,17 |
| Akcent na panelu | 7 | – | – | – | – | 9,27 | 9,23 |

## Co mají všechny tři společné (pevná pravidla)

- Základní text 18 px na mobilu a 20 px od 1024 px, řádkování 1,55, odstavec nejvýš asi 65 znaků. Nadpisy a velká čísla se na úzkém displeji plynule zmenšují (`clamp`), aby nic nepřeteklo.
- Řezy 400, 600, 700. Čísla tabulkovými číslicemi (ověřeno měřením šířky u všech tří písem).
- Dotykové cíle nejméně 48 px, mezery 8 px. Viditelný fokus 3 px. Popisky nad poli, číselné pole s `inputmode="decimal"`, čárka i tečka, přepočet hned. Posuvník má vedle sebe tlačítka „− 0,1“ a „+ 0,1“ a pod sebou značky, kde výsledek skočí na další průřez, plus větu „Od 2,6 m bude potřeba 4 mm²“.
- Hlášky: barva, ikona a slovo („V pořádku“, „Pozor“, „Stop“). Blok má silnější okraj.
- Přechod výsledku je krátké roztmívání (180–260 ms), ne „počítadlo“, aby se neukazovaly mezihodnoty, které nejsou výsledkem. Při omezeném pohybu bez animace.
- Tmavý režim má vlastní ladění (jiný akcent, tmavé hlášky se světlým textem), přepínač i `prefers-color-scheme`.
- Řez měděným jádrem ve skutečné velikosti se kreslí v milimetrech CSS (bez kalibrace obrazovky je to jen přibližné, stránka to říká).

## Doporučení

**Směr 1 Dílna**, s jedním prvkem ze směru 3: výsledek kalkulačky na tmavém panelu („displeji“) zvážit jako variantu karty výsledku. Důvody:

- Nejlépe odpovídá zadání „luxusně, ale ne okázale, jako dobrý nástroj“. Teplý papír a měď jsou vlastní a zapamatovatelné, technická kresba přirozeně nese wow efekt kalkulaček (řez kabelem, vodič zbarvený podle zatížení) a dá se kreslit z dat enginu.
- IBM Plex Sans má dobře rozlišitelné tvary (l, I, 1), tabulkové číslice, plnou češtinu a přirozeně „technický“ charakter bez chladu.
- Riziko malé rezervy kontrastu tlačítka (7,24 : 1) je známé a hlídá ho generátor.

Atkinson Hyperlegible Next ze směru 2 je čitelností nejlepší pro Miroslava, ale přeškrtnutá nula je v tomto oboru vážný problém (Ø = průměr). Pokud Radek preferuje směr 2, navrhuji ověřit, jestli písmo má alternativní nulu, nebo vzít jiné písmo.

## Co se nepovedlo nebo zbývá

- Text uvnitř ilustrací (SVG) se při 360 px a 200% zvětšení zmenší na asi 15 fyzických px. Proto mají ilustrace všechny popisky zopakované v HTML legendě. V komponentách platí pravidlo: v obrázku jen čísla odkazů a velké hodnoty, vysvětlení vždy v HTML.
- Kontrola 200% zvětšení je emulovaná šířkou 180 CSS px. Velké písmo nastavené v telefonu (text bez změny rozvržení) zatím ověřené není, doplním v kroku komponent.
- Kontrast je spočítaný z tokenů, ne nástrojem axe nad hotovou stránkou. Axe přidám ke kontrole stránek (krok 5).
- Tlačítka „Sdílet výsledek“, „Kopírovat odkaz“ a „Přidat do kusovníku“ jsou jen vzhled, bez funkce.

## Otázky pro Radka

1. Který směr? (Doporučuji 1 Dílna.) Mám do něj převzít tmavý „displej“ výsledku ze směru 3?
2. Akcent: ponechat měď (v tmavším, hnědějším odstínu kvůli kontrastu 7 : 1), nebo jiný?
3. Přepínač světlého a tmavého režimu na webu: chcete ho viditelně v hlavičce, nebo stačí nastavení zařízení?
4. Fonty jsou v `docs/design/smery/fonty/` a jako balíčky `@fontsource/*` v `@caravanix/ui`. Po výběru směru odstraním nepoužité dva balíčky. Souhlasíte?
