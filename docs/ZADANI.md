# Caravanix – chování, postup vývoje, kontroly a výstupy

Nov 16, 2026 · @radek

## Účel a hranice

Caravanix provede laika návrhem ostrovní elektroinstalace v obytném voze nebo na chatě, včetně vody a stavby vlastní LiFePO4 baterie, a vydá dokumentaci na úrovni projektanta. Je to průvodce a podklad pro montáž, ne revize ani podepsaný projekt.

| Oblast | V rozsahu v1 | Mimo rozsah |
| --- | --- | --- |
| Objekty | dodávka, obytný vůz, karavan (přívěs), chata nebo zahradní domek s ostrovním systémem | lodě, nákladní a speciální vozy, systémy připojené k distribuční síti |
| Napětí | 12 V a 24 V DC, u chaty i 48 V | trakční baterie elektromobilu |
| Baterie | hotová LiFePO4, nebo vlastní stavba z článků s BMS (první podporovaný JK BMS) | jiné chemie než LiFePO4 pro vlastní stavbu |
| Nabíjení | alternátor přes DC-DC (booster), solár, přípojka 230 V s nabíječem | generátor, palivový článek (později) |
| Spotřebiče | světla, lednice, čerpadlo, naftové topení, zásuvky 12 V a USB, invertor | zásahy do elektroniky podvozku (CAN, řídicí jednotky) |
| 230 V | ve voze přípojka, nabíječ, invertor a zásuvky; na chatě jen po výstup invertoru | pevný rozvod 230 V po chatě (rozvaděč a okruhy patří do Rozvadixu) |
| Voda | nádrže, čerpadlo, bojler, vypouštění, ochrana proti mrazu | zatím nic |
| Plyn | jen jako položka ve schématu a kusovníku, bez návrhu | návrh a dimenzování plynové instalace |
| Značky | dvě cesty, Optimum a Levně, obě se stejnou bezpečností a spolehlivostí; modely se vyberou ze srovnání značek | – |

První alfa je jen česky; němčina, polština a angličtina následují a architektura s nimi počítá od začátku (kapitola Jazyky a země). Jednotky metrické, průřezy v mm².

## Co musí být ve v1

Nejvíc lidí přivedou bezplatné kalkulačky a obrázková schémata; platit se bude za dokumentaci a později za kabely a desky. Pořadí vydání jde od nejširšího publika k nejužšímu.

| Pořadí | Část | Pro koho | Proč |
| --- | --- | --- | --- |
| 1 | Průvodce zásadami s obrázky a kalkulačky zdarma: soběstačnost (hlavní), průřez vodiče a jištění, spotřebiče včetně indukce a klimatizace, velikost baterie, solár, booster, měnič | každý, kdo řeší 12–48 V, i bez projektu | přivádí lidi z vyhledávání a sdílení; tím se začíná |
| 2 | Obrázkové přehledové schéma | laik, který potřebuje vidět, co kam zapojit | hlavní odlišení a důvod sdílet |
| 3 | Návrh projektu pro vůz ve dvou cestách, Optimum a Levně | stavitelé dodávek a majitelé obytných vozů | jádro produktu |
| 4 | Stavba vlastní LiFePO4 baterie s JK BMS | kutilové, kteří chtějí levnou kapacitu | velká komunita, málo srozumitelných návodů |
| 5 | Kusovník s odkazy do e-shopů, zatím bez provize | všichni | důvěra a pohodlí; provize až později |
| 6 | Ostrovní systém pro chatu | chataři a zahrádkáři | stejný engine, větší trh než samotné vozy |
| 7 | Kabelové sady a předzapojené desky na objednávku | kdo nechce lisovat a zapojovat sám | vlastní výroba a hlavní marže |

Body 1 až 5 jsou nutné pro veřejnou betu. Body 6 a 7 se spustí hned po ní, ale datový model s nimi počítá od začátku.

## Průvodce zásadami

Průvodce je první veřejná část Caravanixu: krátké lekce s obrázkem, jednou zásadou a kalkulačkou, psané s nadsázkou. Každá zásada je v katalogu pravidel zapsaná jednou a použije se třikrát: jako lekce v průvodci, jako nápověda u kalkulačky a v návrhu projektu a jako kontrola K2 s vysvětlením, proč něco nejde.

| Otázka nebo mýtus | Zásada | Kde se použije |
| --- | --- | --- |
| „Klimatizace na 12 V žere míň než na 230 V.“ | Stejné chlazení znamená stejné watty. Na 12 V jen teče víc ampér; ušetří se pouze ztráta měniče, obvykle kolem 10 %. | kalkulačka spotřebičů |
| „Kolik toho uvařím na indukci?“ | Počítá se ve Wh, ne v Ah. Rozhoduje i proud: 2 000 W z 12 V je kolem 180 A a musí ho unést BMS, kabel i měnič. | kalkulačka vaření, kontrola proudu BMS |
| „Pojistka chrání spotřebič.“ | Pojistka chrání vodič. Patří na jeho začátek u zdroje a nesmí být větší, než vodič unese. Každé zúžení průřezu má vlastní pojistku. | kalkulačka průřezu, K2 |
| „U baterie stačí obyčejná pojistka.“ | LiFePO4 dá při zkratu tisíce ampér. U baterie musí být pojistka s dostatečnou vypínací schopností (Class T), ostatní až za ní. | K2, blok |
| „Regulátor odpojím, kde se mi to hodí.“ | Nejdřív se připojuje baterie, potom panely; odpojuje se obráceně. Regulátor pod sluncem bez baterie může poškodit sebe i spotřebiče. Totéž způsobí BMS, které při nabíjení odpojí. | montážní postup, karta nastavení |
| „Panely do série, nebo paralelně?“ | Série sčítá napětí, paralelní zapojení proud. Napětí naprázdno v mrazu nesmí překročit maximum regulátoru. Tři a více paralelních větví chce pojistku na každé. | kalkulačka soláru, K2 |
| „Přidám panel, co leží doma.“ | V sérii určuje proud nejslabší panel, paralelně musí sedět napětí. Různé panely patří na samostatný regulátor. | kalkulačka soláru, varování |
| „Lithium nabiju rovnou z alternátoru.“ | Vždy přes booster. Omezí proud, aby se alternátor nepřehřál, a vyrovná kolísavé napětí chytrého alternátoru. | kalkulačka boosteru, K2, blok |
| „V zimě nabíjím jako v létě.“ | LiFePO4 se pod 0 °C nenabíjí. Blokace musí být zapnutá v BMS a čidlo přímo na článcích. | K2 |
| „Měnič 3 000 W za pár stovek.“ | Počítá se trvalý výkon, ne špička na krabici. Měnič má i spotřebu naprázdno, která patří do bilance. | kalkulačka měniče |
| „Kabel je kabel.“ | Průřez určuje proud a délka tam i zpět. Tenký kabel hřeje a ubírá napětí. Oka se lisují správnými kleštěmi a dotahují momentem. | kalkulačka průřezu |
| „Kde to vlastně hoří?“ | Nejčastěji ve spoji: uvolněné oko, izolace prodřená o plech, chybějící pojistka u baterie. Značka špatnou montáž nezachrání. | montážní postup, kontrolní seznam |
| „Starou baterii přidám k nové.“ | Paralelně jen stejné baterie stejného stáří. Olovo s lithiem se napřímo nespojuje. | K2, varování |

**Ukázka kalkulačky vaření.** Baterie 200 Ah při 12,8 V má 2 560 Wh, při využití 90 % zhruba 2 300 Wh. Ohřát litr vody z 15 na 100 °C stojí asi 100 Wh tepla, po započtení účinnosti indukce (85 %) a měniče (90 %) asi 130 Wh z baterie. Na 200 Ah tedy uvaříš kolem 18 litrů vody, nebo šest večeří po 20 minutách při průměrném výkonu 1 000 W. Klimatizace s příkonem 500 W by stejnou baterii vybila zhruba za čtyři a půl hodiny. Účinnosti jsou předpoklady, které kalkulačka ukáže a dovolí změnit.

**Jak lekce vypadá:**

- jedna otázka nebo mýtus, odpověď jednou větou a obrázek správně a špatně
- malá kalkulačka nebo posuvník přímo v lekci, výsledek jde převzít do návrhu projektu
- vtip je v textu a v obrázku, bezpečnostní upozornění zůstávají vážná a jednoznačná
- texty se pro každý jazyk píšou zvlášť, humor se nepřekládá doslova
- každá lekce nese ID pravidla a zdroj, stejně jako kontroly K2

**Další lekce, které nejdřív potřebují rešerši:**

| Otázka nebo mýtus | Co lekce musí zodpovědět | Kde se použije |
| --- | --- | --- |
| „Vyhřívané potrubí vyřeší zimu.“ | Kolik Wh za noc spotřebují topné kabely proti izolaci, nádržím ve vytápěném prostoru a vypouštění. Kdy to má smysl a kdy ne. | soběstačnost, zimní profil |
| „V zimě mi solár stačí.“ | Rozdíl výnosu léto a zima podle polohy a sklonu panelů, vliv sněhu a nízkého slunce. | soběstačnost po měsících |
| „Naftové topení elektřinu nežere.“ | Spotřeba ventilátoru a čerpadla za noc a špička při startu, z datasheetů konkrétních topení. | katalog spotřebičů |
| „Lednice: kompresor, nebo absorpce?“ | Spotřeba za den podle venkovní teploty u obou typů a co to znamená pro baterii. | katalog spotřebičů |
| „Dobiju se na nabíječce pro elektromobily.“ | Jen jako rada, ne produkt. Ověřit technickou stránku (stojan pustí proud až po komunikaci s vozidlem, takže je potřeba adaptér, který ji zajistí), podmínky provozovatelů a pravidla stání na místech pro elektromobily v jednotlivých zemích. | lekce, vyjde až po ověření |

**Rešerše fór po Evropě.** Před psaním lekcí se projdou karavanová a vestavbářská fóra v němčině, angličtině, francouzštině, nizozemštině, polštině a češtině. Fóra jsou zdroj otázek, mýtů a zkušeností, ne faktů. Každý mýtus dostane kartu:

- tvrzení a kde se opakuje
- verdikt: platí, neplatí, nebo záleží na podmínkách
- důkaz: datasheet, návod výrobce, norma nebo laboratorní test
- výsledná zásada a doporučení pro obě cesty

Tvrzení bez důkazu se jako zásada nevydá.

## Kalkulačka soběstačnosti

Hlavní kalkulačka odpoví na jednu otázku: jak dlouho vydržím stát bez přípojky a co změnit, abych vydržel déle. Je na jedné obrazovce, ovládá se posuvníky a výsledek se překresluje hned.

**Vstupy:**

- místo a měsíc cesty (výnos soláru z PVGIS Evropské komise; data jsou volně použitelná s uvedením zdroje, ověřit, že to platí i pro API)
- panely: výkon, naplocho nebo naklopené, stínění
- baterie: kapacita a typ
- spotřebiče z katalogu s dobou chodu a předvyplněné profily (letní víkend, práce na cestě, zima na horách)
- přejezdy: hodiny jízdy denně a proud boosteru
- přípojka: jak často a na jak dlouho

**Výstupy:**

- počet dní bez přípojky a graf nabití baterie den po dni
- bilance po měsících: kdy solár stačí a kdy ne
- optimální velikost baterie pro zadaný styl cestování
- co pomůže nejvíc: větší baterie, víc panelů, silnější booster, nebo úspornější spotřebič, s orientační cenou v obou cestách
- obrázek a odkaz ke sdílení a tlačítko „převzít do návrhu projektu“

**Katalog spotřebičů** je společný pro všechny kalkulačky i návrh projektu. Hodnoty se plní z datasheetů a štítků typických modelů, každá se zdrojem a datem.

| Skupina | Položky | Co se eviduje |
| --- | --- | --- |
| Chlazení | kompresorová a absorpční lednice, chladicí box | příkon, podíl doby chodu podle venkovní teploty |
| Klimatizace | střešní na 230 V, parkovací na 12 a 24 V | příkon, chladicí výkon, rozběhový proud |
| Topení | naftová teplovzdušná topení, Truma Combi a podobná, elektrické přímotopy | elektrický příkon v běhu, špička při startu, hodiny chodu podle teploty |
| Vaření | indukce, kávovar, konvice, mikrovlnka | příkon, obvyklá doba použití |
| Voda | čerpadlo, bojler, vyhřívání potrubí a nádrží | příkon, doba chodu, závislost na mrazu |
| Elektronika a světla | notebook, satelitní internet, televize, LED osvětlení, nabíjení elektrokol | příkon, hodiny denně |

## Dvě cesty: Optimum a Levně

Každý návrh i doporučení má dvě varianty. Liší se komfortem a cenou, bezpečnost a spolehlivost mají stejnou.

|  | Optimum | Levně |
| --- | --- | --- |
| Cíl | nejlepší poměr spolehlivosti, komfortu a ceny | nejnižší cena, za kterou to ještě jde udělat pořádně |
| Kde se liší | monitoring a aplikace, rezerva výkonu, delší záruka, hotová testovaná baterie | méně funkcí, menší rezerva, levnější regulátor, levnější nebo vlastní baterie |
| Kde se neliší | pojistka u baterie, booster místo relé, blokace nabíjení v mrazu, průřezy a jištění, měnič s doloženými parametry, doložené schválení R10 u dílů ve voze | stejné |

Modely pro obě cesty se vyberou ze [srovnání značek](https://claude.ai/artifact/9gVELAQB8fz3FZoBs6a2aT), které má řady A, B a C a kritéria „bez obav“. Platí jeho závěr: šetřit jde na regulátoru a baterii, ne na měniči a jištění.

## Principy chování

AI vede rozhovor, kód počítá, člověk rozhoduje. Stejná zásada jako u Rozvadixu, tady rozepsaná do deseti pravidel.

1. **AI mluví, kód počítá.** Jazykový model vede rozhovor, převádí odpovědi na data a vysvětluje. Každé číslo ve výstupu spočítá deterministický engine, model ho nesmí vymyslet ani upravit.
2. **Každé číslo má původ.** U každé hodnoty jde dohledat pravidlo, vstupy a zdroj (článek normy, datasheet, návod výrobce). Hodnota bez zdroje se nepoužije.
3. **Parametry komponent jen ověřené.** Databáze komponent má u každé položky odkaz na datasheet a datum ověření. Totéž platí pro katalog spotřebičů. Komponentu mimo databázi zadá uživatel jako obecnou a výstup ji označí „neověřeno“.
4. **Bezpečnost před přáním.** Výsledek kontroly je OK, varování, nebo blok. Varování uživatel potvrdí a potvrzení se zapíše do protokolu. Blok nejde obejít a výstup se nevydá.
5. **Dimenzovat nahoru smí vždy, dolů jen po mez pravidla.** Větší průřez nebo pojistku si uživatel změní sám. Pod mez pravidla to engine nedovolí.
6. **Ptá se jen na nutné.** Co jde odvodit nebo má rozumnou výchozí hodnotu, nastaví sám a ukáže jako předpoklad. Seznam předpokladů je součástí výstupu.
7. **Normy se odkazují, nepřepisují.** Pravidlo nese číslo normy a článku. Text normy se do aplikace ani výstupů nekopíruje a neparafrázuje.
8. **Texty výstupů z překladových klíčů.** Popisky, štítky, varování a postupy jsou předem přeložené šablony. Model nepřekládá dokumenty, jen mluví jazykem uživatele.
9. **Značky neutrálně.** Doporučení vychází z parametrů, ne z provize. Odkazy v kusovníku jsou zatím bez provize. Až provize přibude, budou odkazy viditelně označené.
10. **Opakovatelnost a odpovědnost.** Každý výstup nese ID projektu, verzi pravidel a verzi databáze komponent; stejné vstupy dávají stejný výsledek. Uživatel potvrzuje vstupy a přebírá výstup jako podklad, ne jako revizi.

## Uživatelský postup

Uživatel projde devět kroků, od objektu po výstupy. Blok v kontrolách ho vrátí ke kroku, který ho způsobil. Kalkulačky stojí bokem: fungují bez projektu a výsledek jde jedním klikem převzít do průvodce.

1. **Objekt:** vůz (typ, délka), nebo chata. Napětí systému navrhne engine podle výkonu (vůz obvykle 12 V, chata 24 nebo 48 V) a kde bude technika umístěná.
2. **Spotřebiče:** výběr z katalogu nebo vlastní (příkon, hodiny denně) a sezóna (léto, celoročně, zima).
3. **Zdroje nabíjení:** alternátor (chytrý, nebo klasický), plocha pro solár (střecha vozu, střecha nebo konstrukce u chaty), přípojka 230 V.
4. **Energetická bilance:** spotřeba ve Wh za den, výroba, počet dní autonomie. Z toho kapacita baterie, solár, booster, nabíječ a invertor.
5. **Baterie a značka:** hotová baterie, nebo vlastní stavba z článků s JK BMS. Cesty Optimum a Levně vedle sebe i s cenou.
6. **Umístění:** komponenty na zjednodušeném půdorysu. Z toho délky tras, ručně zadané, nebo z náčrtku.
7. **Dimenzování:** vodiče, jištění, hlavní vypínač, oka a svorky; u vlastní baterie i propojky článků a pojistka baterie.
8. **Kontroly:** OK pustí dál, varování uživatel potvrdí, blok ho vrátí zpět.
9. **Výstupy:** obrázkové schéma a souhrn zdarma, plná dokumentace po zaplacení, volitelně objednávka kabelové sady nebo desky.

Voda běží souběžně od kroku 2: nádrže, čerpadlo, bojler a topení. Jejich elektrické spotřebiče se samy propíšou do bilance a do schématu.

## Postup vývoje

Vývoj jde po fázích F0 až F6 a každá končí branou. Teď jsme ve F0: zadání bez kódu.

| Fáze | Brána (bez splnění se nepokračuje) |
| --- | --- |
| F0 Specifikace bez kódu: zásady, pravidla, datový model, šablony | schválené výstupy a katalog pravidel se zdroji, zadání pro Claude Code hotové |
| F1 Referenční projekty: 8 instalací spočítaných ručně (R1 až R8) | každý projekt zkontroloval člověk, výsledky zamčené jako zlatý standard |
| F2 Výpočetní engine: datový model, dimenzování, kontroly | R1 až R8 sedí na ruční výpočet, každé pravidlo má test OK, varování, blok |
| F3 Výstupy: schémata, tabulky, kusovník, nastavení | kontrola konzistence K3 bez chyb a člověk prošel výstupy všech osmi projektů |
| F4 AI dialog nad hotovým enginem | testovací rozhovory K5 projdou, včetně pokusů obejít blok nebo vnutit číslo |
| F5 Uzavřená beta: 10 až 20 lidí, kteří právě staví | žádná chyba bezpečnostní úrovně, zpětná vazba zapracovaná |
| F6 Veřejná beta a platby | – |

Alfa (kapitola První alfa) je výřez z F2 a F3: engine a kalkulačky s příručkou, bez návrhu projektu.

Brána je podmínka: dokud není splněná, další fáze nezačne.

**Referenční projekty (F1).** Osm ručně spočítaných instalací slouží jako zlatý standard pro testy:

- R1: malá dodávka, 100 Ah, solár, booster, bez 230 V
- R2: střední dodávka, 200 Ah, solár, booster, přípojka 230 V s nabíječem
- R3: jako R2, navíc invertor 2 kW (vysoké proudy)
- R4: zimní provoz, naftové topení, nabíjení pod 0 °C
- R5: karavan za tažným vozem, přípojka 230 V, nabíjení z tažného vozu
- R6: větší vůz s 24 V
- R7: vlastní baterie 4S z článků 280 Ah s JK BMS ve voze
- R8: chata, ostrovní systém 48 V s vlastní baterií 16S, solárem a invertorem

**Pravidla vývoje:**

- Každá funkce má v zadání akceptační kritéria dřív, než ji Claude Code začne psát.
- Změna pravidla nebo komponenty znamená přepočet R1 až R8 a výpis rozdílů ke schválení.
- Průvodce zásadami a kalkulačky jdou ven jako první, hned po bráně F2. Jsou to funkce enginu s jednoduchým formulářem, takže ověří zájem dřív, než vzniknou výstupy a AI dialog.
- Vzhled obrázkového schématu se schválí na ručně nakresleném vzoru pro R2 už ve F0. Knihovna kreslených komponent (vlastní obrysy, značka jen textem) je samostatný úkol F3.
- Z jádra Rozvadixu jde převzít kreslení schémat, tabulky, kusovník, export PDF, překlady, účty a platby. Vlastní pro Caravanix je knihovna komponent, pravidla pro DC, energetická bilance, stavba baterie a modul vody.

## Kontroly

Kontroly mají šest úrovní. K1 až K3 běží v aplikaci u každého projektu, K4 a K5 při vývoji, K6 hlídá obsah webu (kapitola Ověřování obsahu).

| Úroveň | Co hlídá | Příklady | Když neprojde |
| --- | --- | --- | --- |
| K1 Vstupy | věrohodnost a úplnost zadání | spotřeba mimo obvyklý rozsah, chybějící délka trasy, solár větší než střecha | dotaz na uživatele |
| K2 Návrh | pravidla dimenzování a bezpečnosti | průřez proti jistění, úbytek napětí, jistění co nejblíž baterii, vypínací schopnost hlavní pojistky proti zkratovému proudu baterie, nabíjecí proudy a napětí proti datasheetu, nabíjení LiFePO4 pod 0 °C | varování, nebo blok |
| K3 Konzistence výstupů | že dokumenty souhlasí mezi sebou | každý kabel ze schématu je v tabulce kabelů i na štítku, každá položka kusovníku je ve schématu, oko sedí na průřez i na šroub svorky | výstup se nevydá |
| K4 Vývoj | že změna nic nerozbila | přepočet referenčních projektů R1–R8 po každé změně pravidel nebo databáze a výpis rozdílů | neschválený rozdíl je chyba |
| K5 AI | že model nepřebírá roli enginu | testovací rozhovory: vnutit menší průřez, vymyslet komponentu, přeskočit blok, jiný jazyk | oprava promptu nebo nástrojů |

Katalog pravidel pro K2 vznikne ve fázi F0. Každé pravidlo má ID, popis, vzorec, mez, zdroj a úroveň (varování, nebo blok). Číselné meze, například dovolený úbytek napětí, se doplní ze zdrojů, ne z paměti.

**Vlastní baterie má nejpřísnější sadu pravidel K2**, protože je to nejrizikovější část celého návrhu:

- počet článků v sérii odpovídá napětí systému (4S, 8S, 16S) a typu BMS
- trvalý proud BMS pokrývá největší odběr i nabíjení, proud článků je v mezích datasheetu
- pojistka hned u baterie má vypínací schopnost vyšší než zkratový proud sady
- propojky článků mají průřez na plný proud a utahovací moment podle výrobce článků
- meze BMS (přepětí a podpětí článku, teploty, zákaz nabíjení pod 0 °C) vycházejí z datasheetu článku
- postup obsahuje vyrovnání článků před sestavením, staticky uložené a stažené články a izolaci pólů

Chybějící datasheet článku je blok: bez něj engine baterii nenavrhne.

## Požadované výstupy

Výstupů je čtrnáct. Zdarma jsou kalkulačky, bilance, sestava a obrázkové schéma v náhledu, platí se za výrobní dokumentaci a za kabely a desky.

| Výstup | Obsah | Zdarma, nebo placené | Formát |
| --- | --- | --- | --- |
| V0 Průvodce zásadami a kalkulačky | lekce s obrázky; kalkulačky soběstačnosti, průřezu a jištění, spotřebičů (indukce, klimatizace, lednice, kávovar), velikosti baterie, soláru, boosteru a měniče; každá ukáže postup výpočtu a předpoklady | zdarma, bez registrace | web |
| V1 Energetická bilance | spotřeba, výroba, dny autonomie, doporučené kapacity | zdarma | web |
| V2 Sestava ve dvou cestách | Optimum a Levně vedle sebe s orientační cenou a rozdílem v komfortu | zdarma | web |
| V3 Obrázkové schéma | kreslené komponenty s popsanými svorkami, barvy polarit, tloušťka čar podle průřezu, čísla kabelů, pojistky s hodnotou | náhled ke sdílení zdarma, tisková verze placená | PDF A3, SVG, PNG |
| V4 Technické schéma | značky IEC 60617, svorky, jištění, čísla kabelů | placené | PDF |
| V5 Tabulka kabelů | číslo, odkud a kam, průřez, délka, barva, typ vodiče, jištění, oka | placené | PDF, XLSX |
| V6 Kusovník | položky, počty, ceny a odkazy do e-shopů (bez provize) | souhrn zdarma, úplný včetně drobného materiálu placený | PDF, XLSX |
| V7 Karta nastavení zařízení | hodnoty pro každé zařízení a jejich původ, včetně JK BMS; u Victronu později soubor .vcsf | placené | PDF |
| V8 Montážní postup | pořadí prací, utahovací momenty z datasheetů, kontrolní seznam před prvním zapnutím | placené | PDF |
| V9 Štítky | štítky kabelů a legenda pojistkové skříně | placené | PDF k tisku |
| V10 Schéma vody | nádrže, čerpadlo, bojler, ventily, napojení na elektro | placené | PDF, SVG |
| V11 Protokol výpočtu | vstupy, předpoklady, pravidla, výsledky kontrol, potvrzená varování | placené | PDF |
| V12 Výrobní list sady a desky | délky a lisování kabelů, rozmístění a zapojení předzapojené desky | interně, při objednávce | PDF, CSV |
| V13 Stavba baterie | obrázek rozložení článků a propojek, zapojení balančních vodičů a BMS, pojistka, kusovník, postup sestavení | obrázek zdarma, postup a nastavení placené | PDF, SVG |

Každý výstup povinně obsahuje:

- ID projektu, datum, jazyk, verzi pravidel a verzi databáze komponent
- seznam předpokladů a potvrzených varování
- prohlášení, že jde o podklad, ne o revizi, a doporučení nechat 230 V zkontrolovat odborníkem
- čísla kabelů shodná se všemi ostatními výstupy

## Obrázky a wow efekt

Wow efekt nese vlastní interaktivní obrázek, ne fotka z fotobanky. Každý obrázek s technickým obsahem prochází stejným ověřením jako text, protože špatně nakreslené zapojení je stejná chyba jako špatná věta.

| Druh | Odkud | Čím udělá wow | Pozor na |
| --- | --- | --- | --- |
| Schémata a komponenty | vlastní SVG knihovna kreslená z dat enginu, jeden styl | animovaný tok proudu (rychlost a tloušťka podle ampérů), přepínání den, noc, jízda, klik na kabel ukáže průřez a pojistku | vlastní obrysy komponent, značka jen textem |
| Řez dodávkou a chatou | vlastní izometrická ilustrace po vrstvách (elektro, voda, topení); hlavní obrázek webu a zároveň podklad kalkulačky soběstačnosti | vrstvy se odkrývají, spotřebiče se rozsvěcují podle posuvníků, baterie se vybíjí a solár nabíjí | styl schválí designér na jednom vzoru před vším ostatním |
| Lekce a mýty | scény a maskot z Le Chatu od Mistralu podle styleguidu designéra; technické detaily v lekci jsou vždy vlastní SVG | správně a špatně vedle sebe, krátké animace (pojistka se přepálí, přetížený kabel zrčaví) | vtip v obraze bez textu; maskot nesmí připomínat známou postavu |
| Vlastní fotky | pár záběrů podle seznamu níže, vlastní dodávka, dron a Insta360 | pravá dodávka místo fotobanky | bez cizích osob a SPZ; bez log výrobců v popředí |
| Atmosféra | Unsplash, Pexels: krajina, cestování | jen kulisa | licence pokrývá autorské právo k fotce, ne ochranné známky a osoby na ní ([Unsplash](https://help.unsplash.com/en/articles/2612329-releases-and-trademark)); vybírat bez lidí a log |
| AI obrázky (Le Chat, Mistral) | atmosféra, scény k lekcím, návrhy maskota; nikdy zapojení, komponenty ani skutečné produkty | rychle a levně hodně scén v jednom stylu | Mistral výstup nechává uživateli ([Mistral](https://help.mistral.ai/en/articles/347630-who-owns-input-and-output-both-in-le-chat-or-mistral-s-apis)) a zakazuje jen trénovat na něm konkurenční generátor ([podmínky](https://conductatlas.com/platform/mistral-ai/mistral-ai-commercial-terms/provision/CA-P-060694/prohibition-on-using-image-output-to-build-competing-products/)). Čistě AI obrázek ale v EU autorskou ochranu nemá ([Legalink](https://www.legalink.net/en/publications/newsletters/copyright-protection-for-ai-generated-creations-310/7437/)), takže ho může převzít kdokoli. Každý obrázek projde ověřovatelem. |

**Seznam záběrů na vlastní fotky:** dodávka v krajině z dronu za šero, otevřená zadní část s technikou, detail pojistky u baterie a hlavního vypínače, panely na střeše, vaření uvnitř, dodávka v zimě. Šest až osm dobrých fotek stačí na celou alfu.

**Měření zatím ne.** Katalog spotřebičů vychází z datasheetů a štítků typických modelů: pro každý spotřebič dva až tři běžné modely, z nich typická hodnota a rozsah, u každé hodnoty zdroj. Vlastní měření se může přidat později.

## Ověřování obsahu: dva agenti

Nic se nepublikuje, dokud to nezávisle neověří druhý agent; bezpečnostní pravidla navíc schválí člověk s elektrotechnickou kvalifikací. Platí to pro text, čísla, kalkulačky i obrázky (kontrola K6).

Tok karty: **agent 1 (rešeršér)** napíše kartu tvrzení (zdroj a podmínky) → **agent 2 (ověřovatel)** ji nezávisle ověří → **sedí?** Ne: vrátit agentovi 1 s nálezem. Ano: **třída A?** Ano: **Radek schválí** → publikováno. Ne: publikováno rovnou. Publikovaná karta jde **k přezkoumání** (zpět agentovi 1), když uživatel nahlásí chybu nebo se objeví nový zdroj.

Při druhém nesouhlasu agentů u téže karty rozhoduje člověk; do té doby se karta jen vrací s nálezem.

| Role | Co dělá | Co nesmí |
| --- | --- | --- |
| Agent 1, rešeršér | hledá zdroje a píše kartu tvrzení: tvrzení, hodnota a jednotky, podmínky platnosti, zdroj s přesným místem (strana, tabulka), datum | publikovat; uvést číslo bez postupu výpočtu |
| Agent 2, ověřovatel | dostane jen kartu bez úvah agenta 1; sám otevře zdroj a ověří, že tam tvrzení stojí; nezávisle dohledá druhý zdroj; přepočítá čísla kódem; hledá podmínky, kdy tvrzení neplatí; zkontroluje obrázek ke kartě | opravovat kartu, jen vrátit nález |
| Člověk | rozhoduje spory, schvaluje třídu A, namátkou kontroluje každou desátou kartu tříd B a C | – |

| Třída | Příklady | Podmínka publikace |
| --- | --- | --- |
| A Bezpečnost | pojistka u baterie, nabíjení v mrazu, booster místo relé, stavba baterie | dva nezávislé primární zdroje, shoda agentů a schválení člověkem |
| B Čísla | příkony spotřebičů, účinnosti, výnos soláru | datasheet nebo štítek dvou až tří typických modelů; uvádí se typická hodnota a rozsah |
| C Rady a komfort | pořadí prací, tipy na cesty | jeden primární zdroj a shoda agentů |

**Hierarchie zdrojů:** norma a návod výrobce, potom datasheet, laboratorní test (například promobil), odborný článek. Fórum je jen signál, co ověřit, nikdy důkaz.

**Životní cyklus karty:**

- stavy: návrh, ověřeno, schváleno, publikováno, k přezkoumání
- každá publikovaná zásada, číslo i obrázek nese ID karty a na webu viditelný odkaz na zdroj
- k přezkoumání jde karta při novém datasheetu nebo firmwaru, při nahlášení chyby uživatelem (tlačítko u každé lekce a kalkulačky) a pravidelně: odkazy a ceny automaticky každý týden, datasheety jednou ročně

**Jak to běží v Claude Code:**

- dva samostatní subagenti s vlastním zadáním; ověřovatel startuje bez kontextu rešeršéra a má úkol „najdi chybu“, ne „potvrď“
- karty jsou soubory v repu, takže má každá změna historii v gitu
- web publikuje jen karty ve stavu schváleno nebo publikováno; jinak build selže

## Jazyky a země

Alfa je jen česky, další v pořadí jsou němčina, polština a angličtina. Nepřekládá se, píše se pro každou zemi zvlášť: klíčová slova, příklady, e-shopy, předpisy i humor.

Polsko patří mezi první jazyky, protože tam rychle roste trh ojetých obytných vozů. V 1. pololetí 2026 tam poprvé zaregistrovali 2 304 ojetých obytných automobilů, o 22,1 % víc než rok předtím ([PZPM](https://www.pzpm.org.pl/pl/content/download/20807/254530/file/Informacja%20Prasowa_SPGC%20i%20PZPM%20kampery%20i%20przyczepy%20kempingowe_%202026Q2.pdf)); většina se dováží z Německa. Ojetý vůz obvykle znamená předdělanou nebo starší elektroinstalaci, tedy přesně naši cílovku.

| Země a jazyk | Formáty | Co musí rešeršér zjistit a ověřit | Poznámka |
| --- | --- | --- | --- |
| Česko (cs) | Kč, desetinná čárka | hledané pojmy, e-shopy, schvalování přestavby na obytný automobil, náležitosti webu | domácí trh, první testy; chaty jako druhý segment |
| Německo (de-DE), později Rakousko a Švýcarsko | €, desetinná čárka; ve Švýcarsku CHF | hledané pojmy (Ladebooster, Aufbaubatterie a další), zápis přestavby u zkušebny, náležitosti webu (Impressum), které testy lidé berou jako měřítko | největší trh; Rakousko a Švýcarsko mají vlastní pravidla, proto samostatně |
| Polsko (pl) | zł, desetinná čárka | hledané pojmy, registrace kampera po přestavbě, e-shopy a marketplace, dostupnost značek | rostoucí trh ojetých vozů z Německa |
| Angličtina (en): Velká Británie a Irsko, zároveň obecná evropská verze | £ nebo €, desetinná tečka | britská zásuvka a pravidla pro 230 V ve vozech, hledané pojmy (leisure battery, split charge), značení výrobků po brexitu | nejsilnější anglická a americká konkurence; dosah přes Evropu |

**Pravidla lokalizace:**

- každý jazyk má vlastní adresu (/cs/, /de/, /pl/, /en/) a vzájemné odkazy hreflang; žádné automatické přesměrování podle IP, jen nabídka jazyka
- klíčová slova se hledají v daném jazyce, ne překladem z češtiny
- texty jsou na úrovni rodilého mluvčího; humor se píše pro každý jazyk znovu
- ceny, měna, e-shopy a dostupnost zboží podle země
- karta tvrzení má pole „platí pro země“, protože předpisy se liší; kalkulačky počítají všude stejně, rozdíl je jen v textu a doporučení
- země se odlišují podle dat a předpisů, ne podle představ o národní povaze

## Tým agentů

Agenti pracují autonomně podle pevných pravidel a ty jsi jediný člověk a kotva projektu. Technika je jedna pro všechny země (jádro), jazyk a místní věci řeší agenti země s profilem země. Nově přibyli tester, čtenář laik a strážce licencí a práva.

| Role | Skupina | Co dělá | Veto |
| --- | --- | --- | --- |
| Ty | člověk, kotva | schvaluješ vzor designu, karty třídy A, spory po druhém kole, brány alfy a placené služby; jediný měníš zadání a rozhodnutí | konečné slovo |
| Hlavní vlákno Claude Code | koordinace a kód | rozděluje úkoly, píše engine a web, drží rozsah fáze, píše souhrn do STAV.md | – |
| Rešeršér | jádro | karty tvrzení, katalog spotřebičů a komponent, bezpečnostní pravidla | – |
| Ověřovatel | jádro | nezávislá kontrola karet, čísel a obrázků | neověřený obsah nejde do buildu |
| Autor země | země (profil cs, později de, pl, en) | texty lekcí a kalkulaček, tón a humor, hledané pojmy a klíčová slova; místní předpisy, e-shopy a ceny zapisuje jako karty „platí pro zemi“ | – |
| Kontrolor země | země | přirozenost jazyka, že text netvrdí víc než karta z jádra, místní karty ze zákonných a úředních zdrojů v daném jazyce, funkční odkazy | text nejde ven |
| Designér | napříč | vzhled luxusní, ale ne okázalý, pro lidi od 20 do 80 let; design systém, styl ilustrací a zadání obrázků pro Le Chat, kontrola každé stránky na screenshotech v mobilu i na desktopu, animace, přístupnost (WCAG 2.2 AA) | stránka nejde ven |
| Technické SEO | napříč | adresy, titulky a popisy, sitemap, příprava hreflang pro další jazyky, rychlost, interní prolinkování | – |
| Tester (nový) | napříč | akceptační testy napsané ze zadání, ne z kódu; testy v prohlížeči; okrajové a nesmyslné vstupy; regrese po každé změně | build neprojde; jeho testy hlavní vlákno bez tvého souhlasu nemění |
| Čtenář laik (nový) | napříč | projde web jako člověk bez elektro znalostí s konkrétním úkolem (třeba „zjisti, jestli ti 200 Ah vydrží víkend“) a zapíše, kde se zasekl a čemu nerozuměl | – |
| Strážce licencí a práva (nový) | napříč | evidence licence u každého obrázku, fotky a zdroje; upozornění „podklad, ne revize“; GDPR a cookies; náležitosti webu podle země; zmínky značek | nic bez evidované licence nejde ven |

V Claude Code to je devět definic subagentů. Agenti země jsou jen dva a profil země dostanou jako soubor, takže další zemi přidáš novým profilem. Strážce licencí není právník: před spuštěním placené části musí podmínky a upozornění projít skutečný právník. Než půjde ven další jazyk, přečte ho aspoň jeden skutečný rodilý mluvčí.

**Pravidla autonomie:**

1. Agenti komunikují jen přes soubory v repu: zadání úkolu, výstup, nálezy. Každý má v definici vstup, výstup, kdy je hotovo a komu předává.
2. Zadání a ROZHODNUTI.md měníš jen ty. Nejasnost agent zapíše do OTAZKY.md a pokračuje jinou prací, nestojí.
3. Práce se vrací nejvýš dvakrát, poté jde k tobě.
4. Brány hlídá stroj: testy, karty, Lighthouse, odkazy a licence. Nesplněná brána znamená, že build neprojde.
5. Co nepatří do alfy, jde do ZASOBNIK.md a nestaví se.
6. Po každé dávce práce souhrn do STAV.md: co je hotovo, co čeká na tebe, rizika.
7. Placené služby, nové externí závislosti a cokoli nevratného jen s tvým souhlasem.

**SEO staví na obsahu a nástrojích, ne na triku.** Google v květnu 2026 zrušil rozšířené výsledky FAQ úplně a HowTo už v roce 2023 ([Search Engine Journal](https://www.searchenginejournal.com/google-drops-faq-rich-results/574429/), [PPC Land](https://ppc.land/google-kills-faq-rich-results-what-seos-saw-coming-since-2019/)). Výhoda proto musí být v tom, že kalkulačka odpoví přesně na to, co člověk hledá, rychle a ve svém jazyce, s ověřeným zdrojem.

## První alfa

Alfa je česká příručka a kalkulačky a běží lokálně na tvém PC. Architektura už počítá s návrhem projektu, schématy, kusovníkem a účty, ale ty se v alfě nestaví.

**V alfě:**

- kalkulačky: soběstačnost (hlavní), průřez a jištění (hotová logika schválená 11. 11. 2026, dostane nový design a nápady navíc), spotřebiče a vaření, baterie, solár (série a paralela, napětí v mrazu), booster, měnič
- příručka: 10 lekcí z kapitoly Průvodce zásadami, vybraných podle hledanosti
- katalog asi 30 typických spotřebičů z datasheetů a štítků
- design systém, hlavní obrázek (řez dodávkou), ilustrace lekcí, šest až osm vlastních fotek
- čeština; texty, adresy a data jsou od začátku připravené na další jazyky (klíče textů, profil země, pole „platí pro země“)

**Mimo alfu, ale s místem v architektuře:** němčina, polština a angličtina, návrh projektu, schémata, kusovník s odkazy, stavba baterie, chata, účty, platby, kabelové sady.

**Architektura:**

- jedno repo, v něm samostatné části: engine (výpočty v TypeScriptu jako čisté funkce, běží v prohlížeči i později na serveru), data (katalogy, pravidla, karty tvrzení a jejich schémata), ui (design systém a SVG ilustrace), web (příručka a kalkulačky); později přibude návrh projektu a API
- web jako předgenerované statické stránky pro každý jazyk a kalkulačky jako interaktivní ostrůvky; navrhuji Astro s React komponentami. Je to rychlé, vyhledávače vidí celý text a hostovat to jde kdekoli, i na Hetzneru
- stav kalkulačky se ukládá do adresy, takže jde výsledek sdílet odkazem a později převzít do návrhu projektu
- katalog komponent už má pole pro ceny a odkazy do e-shopů podle země
- s Rozvadixem se budou sdílet data a formáty schémat; jestli i kód, rozhodne jazyk jeho backendu

**Postup:**

1. Repo, CLAUDE.md, zadání devíti subagentů, profil země cs a soubory STAV.md, OTAZKY.md, ROZHODNUTI.md a ZASOBNIK.md.
2. Designér: design systém, vzor hlavní stránky a jedné kalkulačky. Schvaluješ ty.
3. Souběžně: rešeršér s ověřovatelem připraví karty pro 10 lekcí a katalog spotřebičů; autor země cs hledané pojmy a klíčová slova pro češtinu.
4. Vývojář: engine s testy, potom kalkulačky.
5. Lekce a texty v češtině a obrázky; projde je kontrolor země, čtenář laik, tester a strážce licencí.
6. Brány alfy a lokální spuštění.

**Brány alfy:**

- [ ] všechen publikovaný obsah má schválenou kartu (K6)
- [ ] každý vzorec enginu má test a referenční příklad spočítaný ručně
- [ ] designér schválil každou stránku v mobilu i na desktopu
- [ ] Lighthouse: výkon, přístupnost, osvědčené postupy a SEO aspoň 95 na každé stránce
- [ ] sitemap bez chyb; zkušební prázdný profil de jde přidat bez zásahu do kódu
- [ ] celý web běží lokálně jedním příkazem

## Otevřené otázky

Než se zadání zamkne, je potřeba rozhodnout tyto body.

- [ ] Komponenty: ze srovnání značek (řady A, B, C) vybrat modely pro cesty Optimum a Levně (doložený R10, ceny, e-shopy).
- [ ] Které modely JK BMS a kteří výrobci článků budou v databázi jako první?
- [ ] Chata: stačí hranice na výstupu invertoru s odkazem na Rozvadix, nebo chtít i jednoduchý rozvod 230 V?
- [ ] E-shopy, na které kusovník odkazuje, pro každou zemi (bez provize).
- [ ] Kabelové sady a desky: od jakého počtu objednávek se vyplatí nářadí a sklad, a kdo ponese záruku za desku?
- [ ] Normy pro katalog pravidel: EN 1648-2 (obytné automobily), EN 1648-1 (karavany), pro 230 V HD 60364-7-721 (ČSN 33 2000-7-721). Ověřit aktuální vydání a získat plné texty.
- [ ] Délky tras jen ručně, nebo už ve v1 i z náčrtku půdorysu?
- [ ] Sdílené jádro s Rozvadixem: společné repo, nebo samostatná knihovna?
- [ ] Ceník: cena projektu podle země a přesná hranice mezi náhledem zdarma a placenou částí.

* [ ] Ilustrátor: kdo, rozpočet a převod autorských práv na styl, maskota a scény.
* [ ] Fotky: kdy a kde nafotit seznam záběrů.

- [ ] Název Caravanix: ověřit volnou doménu a ochranné známky v Česku, Německu, Polsku a EU.
- [ ] Technologie webu: potvrdit Astro s React komponentami a engine v TypeScriptu.
- [ ] Analytika bez cookies: vlastní hostovaná, nebo žádná v alfě?
