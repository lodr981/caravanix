# Kontrola: kalkulačka průřezu (`/cs/kalkulacky/prurez-kabelu/`)

**Verdikt: SCHVÁLENO** (16. 11. 2026, designér, 1. kolo; drobnosti opravené přímo v kódu)

Screenshoty (`node tools/design/screenshoty.mjs --rez`, po `npm run build`), 360 / 768 / 1280 px, světlý i tmavý režim, 360 px při 200 %:

- `prurez-kabelu-*.jpg` – výchozí stav (12 V, 60 W, 5 m),
- `prurez-kabelu-hlasky-*.jpg` – stav s hláškami (`?u=12&r=I&v=160&l=1&d=10&z=2&p=n`: 70 mm², dvě varování a vysvětlení),
- `prurez-kabelu-chyba-*.jpg` – chybový stav (`?u=24&r=I&v=205&l=2&d=3&z=2&p=n`: blok „Stop“, hlavní vedení).

Automatické kontroly po opravách: bez nálezů ve všech 21 variantách (přetečení, zásah do okraje stránky, písmo pod 15 px, tenké řezy, dotykové cíle 48 × 48 px a mezery 8 px, kontrast vykreslených barev, tabulkové číslice, načtení písma, režim bez bliknutí, žádná cookie). Kontrast všech textů je alespoň 7 : 1 (skript vypisuje i pásmo 4,5–7, žádný text v něm není).

## Kontrolní seznam

- [x] Do 3 vteřin je jasné, co stránka dělá a co zadat (nadpis, věta pod ním, popisky nad poli).
- [x] Hlavní výsledek je největší a nejkontrastnější prvek (tmavý displej, číslo 47–75 px).
- [x] Pravidla kapitoly 2 (písmo, kontrast nástrojem, cíle, popisky nad poli, `inputmode`, stav barvou + ikonou + slovem).
- [x] Nic nepřetéká ani při 200 % (po opravě, viz níž).
- [x] Tmavý režim je stejně čitelný.
- [x] Animace: jen roztmívání čísla 260 ms, při omezeném pohybu vypnuté (tokeny na 0 ms).
- [x] Žádné cizí logo ani fotka.
- [x] Česká typografie (nezlomitelné mezery u jednotek, desetinná čárka, „uvozovky“).
- [x] Působí klidně, ne prázdně ani přeplácaně.

## Co jsem opravil

1. **200 % zvětšení:** podrobnosti výsledku (`dl.kp-det`) přetékaly o 40 px → pod 20 rem jsou popisek a hodnota pod sebou. Formulář a výsledek zasahovaly do pravého okraje (mřížka `auto` → `minmax(0, 1fr)`).
2. **„Co napájím“ (3 volby):** na mobilu se popisky lámaly do 3–4 řádků → v úzkém sloupci (kontejner pod 26 rem) jsou volby pod sebou přes celou šířku (`packages/ui`, platí pro každý přepínač se 3 a více volbami).
3. **Tlačítka posuvníku:** ikona − / + a text „− 0,1“ dávaly dvojité znaménko → ikona pryč, znaménko nese text (`Slider.tsx`).
4. **Pořadí hlášek:** pod kartou „Pozor“ byla nahoře zelená „V pořádku“ → řazení blok, varování, vysvětlení (jen pořadí zobrazení, `KalkulackaPrurezu.tsx`; pořadí navrhuje designér podle `docs/KALKULACKA_PRUREZU.md`).
5. **Seznam lekcí:** odrážky s pomlčkou a dlouhými řádky → nový styl `cx-linklist` (název lekce jako odkaz, zásada pod ním, oddělovací linky).
6. „Jak na to“ omezené na 40 em (na 1 280 px měl řádek přes 150 znaků), mezery mezi body a pod nadpisy H2 (tabulka lepila na nadpis).
7. Odstraněn text natvrdo (`?? "Lekce"`); klíč `lekce.h2` v souboru jazyka existuje.
8. Navigace v hlavičce je teď na všech stránkách (dřív jen na úvodu), aktuální stránka má `aria-current`.

## Zbývá (nebrání vydání alfy)

- **Mobil:** výsledek je až pod 7 ovládacími prvky (asi 1 900 px). Na příští kolo vzoru: krátké shrnutí výsledku nad formulářem, nebo odkaz „Na výsledek“. Patří ke vzoru kalkulačky, který schvaluje Radek.
- **Mobil:** referenční tabulka se skládá na 14 karet (asi 3 600 px). Zvážit sbalení do `<details>` nebo jen řádky kolem výsledku.
- **Chybový stav:** místo karty výsledku je jen hláška „Stop“; je čitelná a jasná, ale bez nadpisu „Výsledek“. Na příští kolo vzoru.

## Nález pro autora (`content/cs/kalkulacka-prurezu.json`, neměnil jsem)

- Hláška `HLAVNI_VEDENI`: „pojistka Class T“ – laik termín nezná; zvážit krátké vysvětlení (například „pojistka s vysokou vypínací schopností, typ Class T“).

## 2. kolo (16. 11. 2026, commit bfaf300): SCHVÁLENO

Kontrola změn po čtenáři laikovi. Screenshoty výše přepsané novým stavem (`node tools/design/screenshoty.mjs --rez` po `npm run build`); automatické kontroly ve všech 21 variantách bez nálezů, kontrast textů alespoň 7 : 1.

Co jsem prověřil:

- **Souhrn nahoře** („Výsledek: kabel 2,5 mm², pojistka 7,5 A / Přejít na výsledek“, v chybě „Výsledek nejde spočítat…“): pod 1 024 px hned pod úvodem, cíl 48 px, odkaz podtržený; na 1 280 px skrytý. Řeší můj nález z 1. kola (výsledek až 1 900 px pod začátkem).
- **Pole délky v metrech:** čitelné, chybový stav z pole, hodnota se propisuje do posuvníku a výsledku.
- **Sdílení v kartě výsledku:** „Kopírovat odkaz na výsledek“ sekundárním tlačítkem pod podrobnostmi, potvrzení jako hláška s ikonou a slovem (`role="status"`). „Sdílet“ se v prohlížeči bez Web Share neukazuje (tak je to správně). Při 200 % se text tlačítka zalomí na dva řádky, nepřetéká.
- **Chybový stav:** nadpis „Výsledek nejde spočítat“, karta „Stop“, pod ní vysvětlení Class T s odkazem do lekce. Čitelné ve světlém i tmavém režimu. Řeší můj nález z 1. kola.
- **Delší nápovědy:** text 15–16 px šedou s kontrastem nad 7 : 1, šířka sloupce drží řádek pod 75 znaky.

Co jsem opravil:

1. Nápověda „Měřte skutečnou trasu…“ stála mezi posuvníkem a polem v metrech, takže pole vypadalo jako další, samostatná otázka. Posuvník a pole jsou teď v jednom bloku s menší mezerou (`.kp-delka`, 0,75 rem) a nápověda je až pod polem (jako `hint` pole, `aria-describedby` na poli). Texty beze změny (`KalkulackaPrurezu.tsx`, `prurez-kabelu.astro`).

Zbývá (nebrání vydání alfy):

- Referenční tabulka na mobilu dál asi 3 600 px (14 karet). Patří ke vzoru kalkulačky, který schvaluje Radek.
- Při 200 % se dlouhé slovo („elektroinstalace“) v úzkém sloupci rozdělí bez spojovníku; Chromium česky nedělí. Lepší než přetečení.
- Nadpis chybového stavu (H2) je větší než nadpis „Výsledek“ v kartě. Drobná nesourodost, ponechávám.

Nálezy pro autora (`content/cs/kalkulacka-prurezu.json`, neměnil jsem):

- Popisky „Délka kabelu (jedna cesta)“ a „Délka kabelu v metrech“ jsou dvě různá jména jedné veličiny pod sebou. Navrhuji u pole kratší popisek, např. „Nebo napište v metrech“.
