# Verdikt: ukázková stránka komponent (/cs/komponenty/)

**SCHVÁLENO jako design systém pro další práci** (16. 11. 2026, designér). Nejde o stránku k vydání: je interní a před vydáním se odstraní. Vzor hlavní stránky a kalkulačky průřezu schvaluje Radek v dalším kroku.

Screenshoty (JPEG, celá stránka): `komponenty-{360,768,1280}-{svetly,tmavy}.jpg` a `komponenty-360-zoom200.jpg` (360 px při 200 %, emulováno šířkou 180 CSS px). Pro srovnání i prázdná `/cs/` v `docs/design/kontroly/uvod/`. Pořízeno `node tools/design/screenshoty.mjs`, s omezeným pohybem.

## Kontrolní seznam (kapitola 7)

| Bod | Stav | Poznámka |
| --- | --- | --- |
| Do 3 vteřin je jasné, co stránka dělá | ano | nadpis a úvod; u ukázkové stránky jen orientačně |
| Hlavní výsledek je největší a nejkontrastnější | ano | číslo na displeji 47–75 px, 15,54 : 1 (světlý) a 17,67 : 1 (tmavý) |
| Pravidla kapitoly 2, kontrast nástrojem | ano | 33 párů × 2 režimy spočítáno skriptem (`docs/design/TOKENY.md`); skript automaticky hlídá písmo ≥ 15 px (patička ≥ 14 px), řezy ≥ 400, cíle ≥ 48 × 48 px, mezery ≥ 8 px, tabulkové číslice |
| Nic nepřetéká, nepřekrývá, není oříznuté | ano | ve všech 7 variantách bez vodorovného přetečení |
| Tmavý režim stejně čitelný | ano | vlastní ladění, displej je v tmavém režimu tmavší než stránka s okrajem |
| Animace krátké, vypínají se | ano | jen roztmívání čísla 260 ms a přechody 120 ms; při `prefers-reduced-motion` 0 ms |
| Cizí logo, produktová fotka | ano | žádné |
| Česká typografie | ano | nezlomitelné mezery v textech (`content/cs/komponenty.json`), desetinná čárka, „uvozovky“; nadpisy dělí slova podle češtiny |
| Klidně a draze, ne prázdně ani přeplácaně | ano | viz níž |
| Přepínač režimu | ano | uložení do localStorage, bez bliknutí po načtení, návrat k zařízení, žádná cookie (ověřeno skriptem) |

## Draze a klidně, ne retro?

Ano, s výhradou, že to rozhodne Radkovo oko. Proti style tile Dílny jsem odebral všechno, co táhlo k rýsovacímu prknu a „řemeslné nostalgii“: papírové béžové pozadí (teď neutrálnější teplý kámen `#F6F4F0`), číslované sekce „01“, nadpisy verzálkami, šrafy, tvrdé 2px rámečky. Zůstala jedna rodina písma, hodně vzduchu, tenké linky, tmavá hnědá měď jen na tom, co se ovládá, a tmavý displej, který dodává sebevědomí přístroje. Jediný ozdobný detail displeje je krátká měděná linka nahoře, u karty ke sdílení měděný prstenec (řez vodičem) v rohu. Návrat ke směru 3 nenavrhuji.

## Opravy během kontroly (už provedené)

1. 360 px při 200 %: pole „Příkon“ roztahovalo mřížku panelu (vodorovné přetečení 197 > 180 px). Mřížka teď `minmax(0, 1fr)`.
2. 360 px při 200 %: adresa na kartě ke sdílení přetékala. Teď se smí zalomit kdekoli.
3. 360 px: přepínač režimu se nevešel vedle značky a spadl na vlastní řádek. Menší mezera v hlavičce a užší vnitřní okraj tlačítka.
4. 360 px: posuvník mezi tlačítky − a + byl široký jen asi 110 px. Pod 30 rem je teď přes celou šířku a tlačítka jsou pod ním na krajích.
5. 360 px: segmenty „24 V / 48 V“ byly blíž než 8 px (text vytlačoval okraj). Segment se smí zúžit a zalomit text.
6. 360 px: zvýrazněný řádek tabulky ve složeném zobrazení měl měděnou značku jen na krajích. Teď celý řádek.
7. 360 px při 200 %: nadpis „Kompone/nty“ se lámal uprostřed slabiky. Nadpisy mají `hyphens: auto` (teď „Kompo-nenty“).
8. Měděná linka displeje vyčnívala nad jeho horní hranu. Posunutá dovnitř.

## Zbývá (nebrání schválení komponent)

- Kontrast je spočítaný z tokenů, ne nástrojem axe nad hotovou stránkou: axe-core má licenci MPL 2.0, která není na povoleném seznamu. Navrhuji `pa11y` nebo vlastní kontrolu přes Playwright; rozhodne `strazce-licenci`.
- Velké písmo nastavené v telefonu je pokryté tím, že vše je v rem a kořen v procentech; samostatně (např. kořen 150 %) zatím nefotím.
- Při 200 % se tlačítka s ikonou zalomí na dva řádky („Sdílet / výsledek“). Čitelné, ale ne krásné; v kalkulačce zvážit tlačítka přes celou šířku pod 20 rem.
- Karta ke sdílení je zatím jen HTML náhled; render obrázku Open Graph a tlačítko „Sdílet“ (Web Share API, na počítači bez podpory se neukáže) přijdou s kalkulačkou.
