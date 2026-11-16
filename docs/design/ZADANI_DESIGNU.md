# Zadání pro designéra

Designér je klíčová role. Caravanix musí působit **luxusně, ale ne okázale** a zaujmout lidi **od 20 do 80 let**. Bez designérova schválení žádná stránka nejde ven.

## 1. Jaký pocit má web vyvolat

**Luxusní, ale ne okázalé** znamená: kvalita se pozná na detailu, ne na efektu. Jako dobrý nástroj (Knipex, Fiskars, Victorinox): poctivý materiál, přesné řemeslo, nic navíc, a přesto ho chcete vzít do ruky.

| Ano | Ne |
| --- | --- |
| hodně vzduchu, klidná kompozice, pevná mřížka | přeplácané stránky, deset věcí najednou |
| jedna dobrá rodina písma, pečlivá typografie | víc písem, dekorativní fonty |
| střídmá paleta, jeden akcent | neon, duhové přechody, „gamer“ vzhled |
| jemné, krátké a smysluplné animace | efekty pro efekt, autoplay, karusely |
| vlastní ilustrace a pravé fotky | fotobankové klišé „vanlife“ s modelkou při západu slunce |
| sebevědomý, laskavý tón s lehkým humorem | křik, výkřiky, vykřičníky, emoji v textech |
| čísla jako hlavní hrdina výsledku | reklamní bannery, vyskakovací okna |

Návrh akcentu k posouzení: **měděná** jako odkaz na měď ve vodičích. Designér může navrhnout jinou, pokud ji zdůvodní.

## 2. Publikum 20–80 let: pevná pravidla

Tato pravidla jsou závazná. Nejsou to doporučení.

**Čitelnost**
- Základní text na mobilu alespoň 18 px, na desktopu 18–20 px. Řádkování 1,5–1,6. Délka řádku 60–75 znaků.
- Žádný text pod 15 px. Jediná výjimka je patička, a ta má aspoň 14 px.
- Kontrast běžného textu alespoň 7 : 1 (WCAG AAA). Vedlejší text alespoň 4,5 : 1. Žádné světle šedé písmo na bílé.
- U textu žádné tenké řezy (pod 400). Čísla tabulkovými číslicemi.

**Ovládání**
- Dotykové cíle alespoň 48 × 48 px a mezi nimi alespoň 8 px.
- Popisky nad poli jsou vždy viditelné. Nikdy jen zástupný text v poli.
- Číselná pole s `inputmode="decimal"`, přijímají čárku i tečku a výsledek se přepočítá hned.
- Ikona vždy s textem. Žádná akce jen gestem, podržením nebo najetím myší.
- Viditelný stav fokusu. Celý web jde ovládat klávesnicí.
- Žádné časové limity, žádné automatické zavírání.

**Odolnost**
- Zvětšení na 200 % nic nerozbije. Funguje i při velkém písmu nastaveném v telefonu.
- Respektuje `prefers-reduced-motion` a `prefers-color-scheme`. Tmavý režim má vlastní ladění, není to jen inverze.
- Rychlé i na pět let starém telefonu s pomalým připojením.
- Stav (OK, varování, blok) se nikdy nesděluje jen barvou: vždy barva, ikona a slovo.

**Česká typografie** (podrobně v `docs/profily/cs.md`): nezlomitelná mezera mezi číslem a jednotkou a po jednopísmenných předložkách, „české uvozovky“, pomlčka – v rozsazích, desetinná čárka.

## 3. Testovací persony

Persony používá designér i `ctenar-laik`.

| Persona | Kdo to je | Na co je citlivá |
| --- | --- | --- |
| Petr, 24 | telefon, spěchá, výsledek chce poslat kamarádovi | rychlost, sdílení, aby to nebylo „pro dědy“ |
| Jana, 45 | s rodinou staví dodávku, večer na notebooku | srozumitelnost, důvěra, co koupit |
| Miroslav, 72 | tablet, větší písmo, opatrný, chce rozumět proč | čitelnost, klid, žádné skryté ovládání, vysvětlení |

Web musí obstát u všech tří zároveň. Když se potřeby rozejdou, má přednost Miroslav. Velké písmo a jasnost pomáhají všem, opačně to neplatí.

## 4. Lákavost: proč se člověk vrátí a pošle to dál

- **Výsledek jako okamžik.** Velké číslo, krátký plynulý přechod hodnoty (nejvýš 300 ms; při omezeném pohybu bez animace) a jasná věta, co z toho plyne.
- **Vizualizace místo tabulky.** U kalkulačky průřezu řez kabelem ve skutečném měřítku a vodič zbarvený podle zatížení. U soběstačnosti baterie, která se den po dni vybíjí a nabíjí.
- **Hraní s posuvníkem.** Změna délky nebo příkonu se okamžitě projeví a je vidět, kde výsledek skočí na další stupeň.
- **Karta ke sdílení.** Výsledek jako úhledný obrázek a odkaz pro WhatsApp nebo e-mail.
- **Laskavý humor** v prázdných stavech, chybách a lekcích. Nikdy na úkor čtenáře a nikdy u bezpečnostních upozornění.
- **Maskot střídmě:** provází lekce, v kalkulačkách nepřekáží.

## 5. Ilustrace a obrázky

- Technické obrázky (zapojení, komponenty, řez vozem) jsou vždy vlastní SVG z `packages/ui`, jedním stylem. Vlastní obrysy, značky výrobců jen textem.
- Scény k lekcím a maskota generuje Radek v Le Chatu (Mistral) podle zadání, které designér napíše do `docs/design/zadani-obrazku/`: styl, paleta, kompozice, co na obrázku nesmí být. Každý obrázek eviduje `strazce-licenci` a kontroluje `overovatel`.
- Fotky: vlastní záběry podle seznamu v `docs/ZADANI.md` (kapitola Obrázky a wow efekt).

## 6. Postup

1. **Tři směry vzhledu.** Každý jako jedna stránka „style tile“ (písmo, paleta, tlačítko, pole, karta výsledku, ukázka ilustrace) v `docs/design/smery/`. → **Radek vybere.**
2. **Design tokeny** v `packages/ui` (barvy pro světlý i tmavý režim, typografická škála, mezery, rádiusy, stíny, pohyb).
3. **Komponenty:** pole, přepínač, posuvník, karta výsledku, hláška OK/varování/blok, tabulka, navigace, patička, karta ke sdílení.
4. **Vzor:** hlavní stránka a kalkulačka průřezu v novém designu. → **Radek schválí.**
5. **Kontrola každé stránky** podle seznamu níže, se screenshoty.

## 7. Kontrolní seznam designéra (brána)

Screenshoty pro každou stránku: 360 px, 768 px a 1280 px, světlý i tmavý režim, a 360 px při 200% zvětšení. Ukládají se do `docs/design/kontroly/<stránka>/`.

- [ ] Do 3 vteřin je jasné, co stránka dělá a co mám zadat.
- [ ] Hlavní výsledek je největší a nejkontrastnější věc na obrazovce.
- [ ] Všechna pravidla z kapitoly 2 jsou splněná. Kontrast je ověřený nástrojem, ne odhadem.
- [ ] Nic nepřetéká, nic se nepřekrývá, nic není oříznuté v žádné šířce ani při zvětšení.
- [ ] Tmavý režim je stejně čitelný jako světlý.
- [ ] Animace jsou krátké, mají smysl a vypínají se při omezeném pohybu.
- [ ] Žádné cizí logo ani produktová fotka bez evidované licence.
- [ ] Česká typografie je v pořádku.
- [ ] Stránka působí klidně a draze, ne prázdně a ne přeplácaně (porovnat se schváleným vzorem).

Výsledek kontroly zapiš do `docs/design/kontroly/<stránka>/VERDIKT.md`: SCHVÁLENO, nebo VRÁCENO se seznamem konkrétních oprav.
