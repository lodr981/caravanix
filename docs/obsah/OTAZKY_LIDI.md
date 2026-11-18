# Otázky lidí: co se na fórech ptají a kde na to odpovídáme

Autor: reserser (subagent), 18. 11. 2026. Navazuje na [RESERSE_FORA.md](RESERSE_FORA.md) (ta popisuje konkurenci a top témata; zde je jemnější seznam konkrétních otázek a mapování na dnešní web). **Fóra nejsou zdroj čísel** – sbíral jsem jen otázky a bolesti, texty nekopíruji.

## Jak jsem hledal

- Rozpočet: 15 vyhledávání, ~28 stránek.
- **caravan24.cz**: prošel jsem výpis sekce Elektro (první 3 strany, 60 vláken s počty zobrazení) a Elektro akademie (2 strany, 40 vláken) a otevřel 10 vláken. Je to stále nejlepší zdroj pro CZ/SK, publikum = majitelé hotových obytňáků a karavanů.
- **Německé**: akkudoktor.net, tx-board.de (VW T5/T6), mikrocontroller.net, Victron Community (DE vlákna), promobil (články). **womo-forum.de, wohnmobilforum.de, campervan-forum.de a Reisemobil-Forum vyhledávač nevrátil vůbec** (vlákna nejsou indexovaná nebo jsou za přihlášením); jejich témata se ale zrcadlí na akkudoktor a Victron DE.
- **Anglické**: Victron Community archiv (recenze schémat), motorhomefun.co.uk, vanlivingforum.com, iRV2, fiatforum (Ducato). **Komentáře FarOutRide se načítají skriptem – nástroj je nepřečetl** (stránka má ~730 komentářů, vidím jen článek). Explorist.life, Mobile Solar Power a Campervan HQ se ve výsledcích s otázkami neobjevily (jen e-shop/článek).
- **campery.cz / obytnevozy.cz**: vyhledávání nevrátilo žádné vlákno (minule obytnevozy.cz neodpovídal DNS).
- Reddit a Facebook nezkoušeny (blokované).
- Četnost = odhad: **často** (opakuje se napříč fóry a/nebo vlákno s >10 tis. zobrazení na caravan24), **občas** (pár vláken, 1–10 tis.), **zřídka** (jednotlivé dotazy).

Legenda pokrytí: **pokryto** = odpověď na webu je, **částečně** = téma je, ale ne tato otázka, **chybí**. U „chybí/částečně“ návrh: **NL** = nová lekce, **DL** = doplnit existující lekci, **FAQ** = krátká odpověď v FAQ, **K** = kalkulačka / průvodce.

Zkratky webu: lekce podle souboru v `content/cs/lekce/`; kalkulačky K-spotřebiče, K-baterie, K-soběstačnost, K-solár, K-booster, K-měnič, K-průřez; P-zapojení (`/cs/zapojeni/`), R-obytňák (`/cs/obytnak/` rozcestí hotový obytňák), Katalog (`/cs/spotrebice/`).

---

## 1. Spotřeba a výdrž (6)

| # | Otázka (jak ji lidi kladou) | Typická vlákna | Četnost | Na webu | Návrh |
|---|---|---|---|---|---|
| 1 | Kolik dní vydržím na baterii s lednicí, světly a telefonem? | [caravan24: Nástavbová baterie](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44151); [caravan24: Použití LiFePO4 – výdrž (47k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=39735) | často | pokryto (K-spotřebiče, K-baterie) | – |
| 2 | Ampérhodiny, watty, watthodiny – co je co a proč se to plete? | [motorhomefun: Question everything electrical](https://www.motorhomefun.co.uk/forum/threads/question-everything-electrical.304611/); [caravan24 akademie: Elektrické názvosloví (12k)](https://www.caravan24.cz/infusions/forum/index.php?viewforum&forum_id=84) | často | částečně (vareni-na-indukci: „počítejte ve Wh“) | **NL** „Volty, ampéry, watty a Ah pro laiky“ + slovníček |
| 3 | Stačí mi solár na celé léto bez kempu? A v zimě? | [caravan24: Solárna zostava pre karavan](https://www.caravan24.cz/infusions/forum/index.php?viewforum&forum_id=84); [caravan24 akademie: Solární dobíjení – návrh soustavy](https://www.caravan24.cz/infusions/forum/index.php?viewforum&forum_id=84) | často | pokryto (K-soběstačnost, K-solár) | – |
| 4 | Proč mi baterie ukazuje 100 % a pak najednou spadne? Kolik mi doopravdy zbývá? | [caravan24: Nordelettronica NE274 a LiFePO4](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43890) | často | pokryto (monitor-baterie-bocnik) | – |
| 5 | Spotřeba se mi nesedí s výpočtem – co jsem zapomněl (klidové odběry, měnič naprázdno)? | [vanlivingforum: Starlink Mini 12V](https://vanlivingforum.com/threads/starlink-mini-12v-setup-proposal-looking-for-feedback-and-suggestions.51489) | občas | pokryto (hlavni-vypinac-a-klidovy-odber, menic-12v-230v) | – |
| 6 | Jak velká baterie, když chci vařit / kávovar / fén? | [motorhomefun: Question everything electrical](https://www.motorhomefun.co.uk/forum/threads/question-everything-electrical.304611/) | občas | pokryto (vareni-na-indukci, K-měnič) | – |

## 2. Baterie (9)

| # | Otázka | Typická vlákna | Četnost | Na webu | Návrh |
|---|---|---|---|---|---|
| 7 | Olovo, AGM, gel, nebo lithium – vyplatí se mi lithium? | [caravan24: Trakční baterie LiFePO4 (193k)](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=20); [caravan24: Vše o akumulátorech (239k)](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=40); [tx-board: Doppelbatterie T6](https://tx-board.de/threads/camping-setup-mit-vorhandener-doppelbatterie-welcher-weg-ist-sinnvoll.172854/) | často (nejčtenější vlákna celého fóra) | částečně (z-olova-na-lithium řeší jak, ne zda) | **NL** „Olovo, AGM, nebo lithium: co se komu vyplatí“ (bez cen, srovnání využitelné kapacity, hmotnosti, zimy) |
| 8 | Vyměním olovo za lithium kus za kus – co všechno musím přenastavit? | [caravan24: Výměna LiFePO4 za olovo](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43808); [caravan24: EBL 226 a LiFePO4](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=42399) | často | pokryto (z-olova-na-lithium, R-obytňák) | – |
| 9 | Můžu dát dvě baterie paralelně? Starou a novou, různé kapacity, olovo s lithiem? | [caravan24: Jak spojit baterie](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=3256&rowstart=120); [promobil: Batterien parallel](https://www.promobil.de/forum/threads/37926-Batterien-parallel-schalten%21-Was-gibt-es-zu-beachten); [Victron: schematic review (mínus z jedné, plus z druhé)](https://communityarchive.victronenergy.com/questions/85171/campervan-schematics%EF%B9%96childToView=85164.html) | často | částečně (pojistka-u-baterie zmiňuje paralelu) | **NL** „Dvě baterie vedle sebe“ + **K** volba „2 baterie“ v P-zapojení |
| 10 | Po výměně za lithium se systém po pár vteřinách vypne / BMS odpojuje – proč? | [caravan24: Výměna LiFePO4 (BMS a 14,4 V)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43808); [mikrocontroller: Blei + LiFePO4](https://www.mikrocontroller.net/topic/567010) | občas | chybí | **DL** z-olova-na-lithium: oddíl „Když BMS odpojuje“ (nabíjecí napětí vs. limit BMS, proud) |
| 11 | Při zapnutí měniče jiskří / BMS vypne baterii – je to normální? (nabití kondenzátorů, předbíjení) | [akkudoktor: JK BMS stürzt ab](https://akkudoktor.net/t/jk-bms-sturzt-ab/9043); [mikrocontroller: Einschaltstrom Kondensatoren](https://www.mikrocontroller.net/topic/520218) | občas | chybí | **DL** menic-12v-230v: „Jiskra při připojení a předbíjení“ |
| 12 | Můžu lithium nabíjet v mrazu? Potřebuju vyhřívanou baterii? | [caravan24: LiFePO4 a odstavení](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44173); [motorhomefun: LiFePO4 in winter](https://motorhomefun.co.uk/forum/threads/lifepo4-batteries-in-winter.273046/page-2) | často | pokryto (nabijeni-lifepo4-v-zime) | – |
| 13 | Jak baterii nechat přes zimu / když auto půl roku stojí? | [caravan24: LiFePO4 a odstavení auta](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44173) | často | pokryto (hlavni-vypinac-a-klidovy-odber: Uskladnění na zimu) | – |
| 14 | Můžu dát lithium i jako startovací baterii? | [caravan24: LIFEPO baterie – startovací](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=20) | zřídka | chybí | **FAQ** krátce: proč ne bez schválení výrobce (mráz, alternátor, BMS) |
| 15 | Velká levná LiFePO4 z Číny / z Amazonu – na co si dát pozor (váha, BMS, proud, záruka)? | [caravan24: LFP 628 Ah](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44153); [caravan24: Typy LiFePO baterií (16k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=39314) | často | chybí | **NL** „Jak vybrat lithiovou baterii“ (parametry BMS: trvalý proud, nízkoteplotní ochrana, Bluetooth; hmotnost a užitečná hmotnost vozu) |

## 3. Nabíjení (11)

| # | Otázka | Typická vlákna | Četnost | Na webu | Návrh |
|---|---|---|---|---|---|
| 16 | Relé, nebo booster? A jak velký booster? | [caravan24: Booster Cyrix (17k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=37206); [caravan24: DC-DC 50A](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44093) | často | pokryto (nabijeni-z-alternatoru, K-booster) | – |
| 17 | Mám Euro 6 / chytrý alternátor a za jízdy se nástavba nenabíjí. Co s D+? | [fiatforum: Smart alternator Ducato 2021](https://www.fiatforum.com/threads/smart-alternator-issue-on-ducato-2021.510932); [fiatforum: D+ short circuit 2021 Ducato](https://www.fiatforum.com/threads/d-short-curcuit-how-to-find-the-2a-fuse-2021-ducato.504775) | často | částečně (nabijeni-z-alternatoru: Chytrý alternátor) | **DL** oddíl „Odkud vzít D+ a co když chybí“ (D+ ze svorky, simulátor, booster s detekcí napětí) |
| 18 | Montuji booster – co udělám s původním relé v elektrobloku? | [caravan24: Rele v ELB](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44172); [Victron DE: Orion-Tr ve Wohnmobilu (můstek J6/J7)](https://community.victronenergy.com/t/victronenergy-orion-tr-smart-12-12-30a-einbau-im-wohnmobil/55548) | často | částečně (R-obytňák „Relé nahraďte boosterem“) | **NL** „Elektroblok a booster: kam ho připojit“ (obecně, bez zasahování do desky; odkaz na návod výrobce) |
| 19 | Za jízdy nabíjí jen pár ampér – je vadný alternátor, kabel, nebo relé? | [akkudoktor: Aufbauelektrik fällt aus](https://akkudoktor.net/t/kastenwagen-aufbauelektrik-faellt-immer-wieder-ploetzlich-aus/39313?page=9); [caravan24 akademie: Nefunkční dobíjení](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=84&rowstart=20) | občas | chybí | **NL/FAQ** „Diagnostika: nenabíjí se“ (měření napětí na obou bateriích, motor běží / neběží) |
| 20 | Jak nabíjet startovací baterii ze soláru nebo nabíječky, když auto stojí? | [caravan24: Nabíjení startovací baterie solárem (21k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=39764) | často | pokryto (startovaci-baterie-se-vybiji) | – |
| 21 | Dva různé panely na jednu baterii – jde to? Série, nebo paralela? | [caravan24: Dva různé FV panely (31k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=28011) | často | částečně (solarni-panely-serie-paralelne; K-solár) | **DL** oddíl „Různé panely“ |
| 22 | Solár podával méně než dřív – co s tím (stín, špína, kabel, regulátor)? | [caravan24: Pokles výkonu solárního systému](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44110) | občas | chybí | **FAQ** + případně DL solární lekce „Proč panel dává málo“ |
| 23 | Přenosný kufrový panel, nebo pevně na střechu? Jak ho připojit? | [caravan24 akademie: Prenosná solárna zostava (7,7k)](https://www.caravan24.cz/infusions/forum/index.php?viewforum&forum_id=84) | občas | chybí | **FAQ** (regulátor jen jeden na panel, přípojka, pojistka, délka kabelu → K-průřez) |
| 24 | Solár do staršího obytňáku / karavanu – kde vést kabel přes střechu a kam regulátor? | [caravan24: zapojení solaru do staršího bydlíku](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=40); [caravan24: montáž solárního dobíjení](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=20) | často | částečně (R-obytňák „Přidáváte panely…“) | **NL** „Solár na střechu krok za krokem“ (průchodka, trasa, pořadí připojení, vypínač soláru) |
| 25 | Regulátor v elektrobloku (AES, Votronic) – jak nastavit na lithium a jak pustit lednici na 12 V ze soláru? | [caravan24: NE274 a LiFePO4 (AES)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43890) | občas | částečně (R-obytňák „Regulátor soláru přenastavte“) | **DL** z-olova-na-lithium; AES jen **FAQ** |
| 26 | Jakou nabíječku z 230 V a jaký profil? Stačí ta v elektrobloku (EBL, CB 516)? | [caravan24: CB 516 + LiFePO4](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=41208); [caravan24: Nabíječka na LiFePO4](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=20) | často | pokryto (pripojka-230v-v-kempu: Nabíječka; z-olova-na-lithium) | – |
| 27 | Karavan za autem: co má fungovat přes 13pólovou zásuvku (lednice, nabíjení)? | [caravan24 akademie: Co má fungovat s 13pólem](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=40677); [caravan24: AGM z moveru pro 12V rozvod karavanu](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=20) | občas (karavanisté) | chybí | **NL** „Karavan: nabíjení přes 13pólovou zásuvku“ (trvalý plus, lednice jen za jízdy, tenké vodiče) – nebo FAQ, pokud karavany nejsou cílovka |

## 4. Měnič a 230 V (8)

| # | Otázka | Typická vlákna | Četnost | Na webu | Návrh |
|---|---|---|---|---|---|
| 28 | Jak velký měnič a musí být čistý sinus? | [caravan24: Měniče napětí podrobně (79k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=28173); [caravan24: Měníč do bydlíka](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=40) | často | pokryto (menic-12v-230v, K-měnič) | – |
| 29 | Jak udělat, aby zásuvky v autě šly z kempu i z měniče? Přepínač, nebo měnič s přednostním zapojením sítě? | [caravan24: Správné zapojení el. v karavanu](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44016); [tx-board: Wechselschalter statt Netzvorrangschaltung](https://tx-board.de/threads/wechselschalter-statt-netzvorrangschaltung.163557/) | často | částečně (pripojka-230v-v-kempu, menic: zmínka) | **NL** „Zásuvky 230 V: kemp, nebo měnič“ (principy, tři polohy, hranice laik/elektrikář) |
| 30 | S měničem mi v kempu vypadává chránič – proč? | [Victron DE: Multiplus FI Fehler](https://community.victronenergy.com/t/multiplus-12-1200-fi-fehler/58217); [iRV2: GFI tripping with inverter](https://www.irv2.com/forums/f54/gfi-tripping-with-inverter-and-transfer-switch-248314.html) | často | částečně (pripojka: Proč chránič vypadává – obecně) | **DL** pripojka-230v-v-kempu: oddíl „Měnič a chránič“ |
| 31 | Potřebuju za měničem vlastní chránič? Kam ho dát a jaký? | [Victron DE: Multiplus Compact – welcher FI](https://community.victronenergy.com/t/wohnmobil-mit-victron-multiplus-compact-welcher-fi-und-wohin-damit/47973); [akkudoktor: Nullung für FI](https://akkudoktor.net/t/wohnmobil-inverter-autarkie-nullung-fuer-fi-schalter/29794) | občas | chybí | součást NL z #29 (jen principy, provedení elektrikář) |
| 32 | V kempu je podpětí (180 V) a lednice/nabíječka nejede – co s tím? | [caravan24 akademie: Trvalé podpětí 230V v kempu](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=41670) | občas | chybí | **DL** pripojka-230v-v-kempu: „Slabé napětí v kempu“ (dlouhý buben, průřez, omezit odběr, běžet z baterie) |
| 33 | Jaký přívodní kabel / prodlužovák do kempu, smím ho nechat namotaný? | [caravan24: Přívodní kabel/prodlužovák (11k)](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=20); [caravan24: Přívodní kabel 220V](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44155) | často | pokryto (pripojka: Jaký kabel) | – |
| 34 | Elektrocentrála do obytňáku – jak velká a jak ji připojit? | [caravan24 akademie: Elektrocentrály (52k)](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=84&rowstart=20) | často | chybí | **FAQ** (připojit jako kemp přes přívodku; invertorová; nabíjení baterie z ní) – nebo krátká lekce |
| 35 | Měnič mi vybíjí baterii, i když nic nejede | [projectvanlife: Simple Power Inverter Question](https://forum.projectvanlife.com/t/simple-power-inverter-question/2516) | občas | pokryto (menic-12v-230v: Spotřeba naprázdno) | – |

## 5. Kabely, pojistky, vypínače (9)

| # | Otázka | Typická vlákna | Četnost | Na webu | Návrh |
|---|---|---|---|---|---|
| 36 | Jak silný kabel k měniči / boosteru / lednici? Počítá se délka tam i zpět? | [Victron: Toolkit – co znamená délka](https://communityarchive.victronenergy.com/questions/21208/victron-toolkit-cable-call-what-does-length-mean%EF%B9%96childToView=21230.html); [caravan24: Výměna lednice za kompresorovou](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=42128) | často | pokryto (jaky-kabel-12v, K-průřez) | – |
| 37 | Pojistku dimenzuju podle spotřebiče, nebo podle kabelu? | [vanlivingforum: inline fuses size location](https://vanlivingforum.com/threads/help-with-12v-set-up-inline-fuses-size-location.40867) | často | pokryto (pojistka-chrani-kabel) | – |
| 38 | Class T, MRBF, MEGA, MIDI, ANL – kterou dát k lithiu? | [Victron: To Class T or not](https://community.victronenergy.com/t/to-class-t-fuse-or-not-class-t-fuse-that-is-the-question/61028); [Victron: AIC ratings LiFePO4](https://community.victronenergy.com/t/aic-ratings-for-lifepo4-class-t-mrbf/16468) | často | pokryto (pojistka-u-baterie) | ověřit, že je tam MRBF a tabulka „typ – kde – do jakého proudu“ |
| 39 | Potřebuje booster pojistku na obou koncích? A solár mezi regulátorem a panely? | [promobil: Sicherung Laderegler–Batterie](https://www.promobil.de/forum/threads/38505-Sicherung-zwischen-Laderegler-und-Aufbaubatterie); [Victron: another schematic review](https://communityarchive.victronenergy.com/questions/177685/another-schematic-review.html) | často | částečně (pojistka-u-baterie: Kam která pojistka; solární lekce: větve) | **DL** pojistka-u-baterie: obrázek „pojistky na všech kabelech od zdroje“ (booster: obě strany) |
| 40 | Pojistka, nebo jistič? Smí jistič nahradit hlavní pojistku? | [vanlivingforum: Does battery–inverter need a fuse](https://vanlivingforum.com/threads/does-connection-between-batteries-and-inverter-require-a-fuse.1196); [Victron: another schematic review](https://communityarchive.victronenergy.com/questions/177685/another-schematic-review.html) | občas | chybí | **FAQ** + DL pojistka-u-baterie |
| 41 | Mínus na karoserii, nebo vlastním kabelem? A kam s mínusem měniče? | [caravan24: Napětí kostra oproti zemi](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43357); [motorhomefun: Wiring diagram review](https://motorhomefun.co.uk/forum/threads/wiring-diagram-review.305393/post-6203944) | často | pokryto (kostra-nebo-vlastni-minus) | – |
| 42 | K čemu je přípojnice a jak ji zapojit (mínus přes bočník)? | [motorhomefun: Question everything](https://www.motorhomefun.co.uk/forum/threads/question-everything-electrical.304611/); [Victron: schematic review](https://communityarchive.victronenergy.com/questions/85171/campervan-schematics%EF%B9%96childToView=85299.html) | často | částečně (zmínky v kostra/monitor) | **NL** krátká „Přípojnice a pojistková skříň: srdce rozvodu“ |
| 43 | Hlavní vypínač: do plusu, nebo mínusu, před pojistku, nebo za ni? Co má zůstat zapnuté? | [vanlivingforum: Isolator or kill switch](https://vanlivingforum.com/threads/need-help-connecting-a-deep-cycle-battery-to-minivan-with-isolator-or-a-kill-switch.23293); [akkudoktor: Kastenwagen Trennrelais](https://akkudoktor.net/t/kastenwagen-trennrelais/39394?page=2) | často | pokryto (hlavni-vypinac-a-klidovy-odber) | – |
| 44 | Jak správně lisovat oka, jaké kleště, jaký kabel (lanko, automobilový, solární)? | [vanlivingforum: inline fuses (marine wire)](https://vanlivingforum.com/threads/help-with-12v-set-up-inline-fuses-size-location.40867) | občas | částečně (jaky-kabel-12v: Konec dobrý; pozar) | **NL** „Oka, lisování, utažení“ (praktická s fotkami) |

## 6. Konkrétní spotřebiče (9)

| # | Otázka | Typická vlákna | Četnost | Na webu | Návrh |
|---|---|---|---|---|---|
| 45 | Vyměnit absorpční lednici za kompresorovou? Utáhne to baterie a solár? | [caravan24: Výměna lednice za kompresorovou (7k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=42128); [caravan24: Výměna a zapojení kompresorové lednice](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43889) | často | částečně (Katalog, K-spotřebiče) | **NL** „Lednice: kompresor, nebo absorpce“ |
| 46 | Absorpční lednice málo chladí / nejede na 12 V při stání – proč? | [caravan24: lednice málo chladí (9k)](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=40); [caravan24: lednice RM 7655L](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43702) | často | chybí | součást NL z #45 (12 V jen za jízdy, D+, odvětrání) |
| 47 | Naftové topení mi přes noc vybije baterii / nenastartuje po zimní noci | [motorhomefun: Electricity used by diesel heating](https://www.motorhomefun.co.uk/forum/threads/electricity-used-by-diesel-powered-heating.163514/); [t6forum: Night heater, which battery](https://www.t6forum.com/threads/night-heater-which-battery.39151/) | často | částečně (P-zapojení má topení; zimní lekce) | **DL** nabijeni-lifepo4-v-zime nebo **FAQ** „Topení a baterie v zimě“ |
| 48 | Bojler / Truma na 230 V přes měnič – dá se to? | [motorhomefun: Inverters and Truma](https://www.motorhomefun.co.uk/forum/threads/inverters-and-truma-techies-please.236975/); [caravan24: Truma Combi 4](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44100) | občas | chybí | **FAQ** + položka v Katalogu |
| 49 | Indukce / kávovar z baterie | [mikrocontroller: Einschaltstrom](https://www.mikrocontroller.net/topic/520218) | občas | pokryto (vareni-na-indukci) | – |
| 50 | Klimatizace 12 V nebo 230 V na stání | [caravan24: Klimatizacia 12 V](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=40); [caravan24: Klimatizace](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=40) | občas | pokryto (klimatizace-12v) | – |
| 51 | Starlink v obytňáku: kolik bere, přes měnič, nebo 12 V, jaký kabel? | [caravan24: Starlink (28k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=42270); [vanlivingforum: Starlink Mini 12V](https://vanlivingforum.com/threads/starlink-mini-12v-setup-proposal-looking-for-feedback-and-suggestions.51489) | často | částečně (P-zapojení „Satelitní internet“, Katalog) | **NL** krátká „Internet a Starlink z baterie“ nebo **FAQ** |
| 52 | Nabíjení elektrokola v obytňáku – přes měnič, nebo 12V nabíječkou? | [caravan24: Dobíjení elektrokola (8,8k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43780) | často | částečně (Katalog?) | **FAQ** + položka v Katalogu |
| 53 | TV: 12V televize, nebo 230V přes měnič? Satelit vs. IPTV | [caravan24: Satelit, nebo IPTV (20k)](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=20); [caravan24: TV SAT nebo DVB-T2 (8k)](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=40) | často (ale hlavně o signálu, ne elektřině) | částečně (P-zapojení „Televize 12 V“) | **FAQ** jen elektrická část (12 V vs. měnič) |

## 7. Hotové obytňáky (5)

| # | Otázka | Typická vlákna | Četnost | Na webu | Návrh |
|---|---|---|---|---|---|
| 54 | Elektroblok Schaudt EBL / Nordelettronica / Dometic: co v něm je a co umí s lithiem? | [caravan24: Elektroblok EBL 31 (6k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=41992); [caravan24: NORDELETTRONICA](https://www.caravan24.cz/infusions/forum/index.php?viewforum&forum_id=84) | často | částečně (R-obytňák „Elektroblok a lithium“) | **NL** „Elektroblok: co v něm je“ (nabíječka, relé, rozvod, efektivní vs. stabilizovaný výstup, D+) |
| 55 | Nástavba je mrtvá / blackout, nejde nic – kde začít hledat? | [caravan24: EBL99 – mrtvá nástavba](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=40); [caravan24: Blackout Knaus Van Ti](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43485) | často | chybí | **NL** „Hledání závady krok za krokem“ (multimetr, pojistky, hlavní vypínač panelu, BMS, D+) |
| 56 | Panel ukazuje stále 100 % / nesprávný stav – jak dostat bočník do původního panelu? | [caravan24: NE274-EM a LiFePO4](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43890) | občas | pokryto (monitor-baterie-bocnik) | – |
| 57 | Kde je ve voze nabíječka / elektroblok / pojistky? Schéma od výrobce? | [caravan24: kde je nabíječka McLouis](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=40); [tx-board: Schaltplan Sicherungskasten](https://tx-board.de/threads/schaltplan-vom-sicherungskasten-unter-fahrersitz.167510/) | občas | chybí | **FAQ** (kde hledat: pod sedadlem, šatna; manuál výrobce) |
| 58 | Přepojit autozásuvku (zapalovač) ze startovací na nástavbovou baterii | [caravan24: Přepojení přední autozásuvky Ducato](https://www.caravan24.cz/infusions/forum/index.php?viewforum=&forum_id=11&rowstart=20) | zřídka | chybí | **FAQ** (pojistka, průřez → K-průřez) |

## 8. Zapojení a schéma (5)

| # | Otázka | Typická vlákna | Četnost | Na webu | Návrh |
|---|---|---|---|---|---|
| 59 | Zkontrolujete mi schéma? (nejčastější prosba na anglických fórech) | [Victron: campervan wiring diagram review](https://communityarchive.victronenergy.com/questions/303854/campervan-wiring-diagram-review.html); [motorhomefun: Wiring diagram review](https://motorhomefun.co.uk/forum/threads/wiring-diagram-review.305393/post-6203944) | často | částečně (P-zapojení kreslí, ale nekontroluje cizí) | **K** režim „Zkontrolujte mi zapojení“ (zadám, co mám → OK/varování) |
| 60 | V jakém pořadí komponenty zapojit a co připojit jako poslední (baterie, solár)? | [Victron: need help checking installation](https://communityarchive.victronenergy.com/questions/38787/need-help-checking-my-installation%EF%B9%96childToView=38812.html); [caravan24: Výměna LiFePO4 (pořadí u regulátoru)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43808) | často | částečně (solární lekce: Pořadí připojení; hlavní vypínač: pořadí vypínání) | **NL** „Montáž krok za krokem“ + kontrolní seznam v P-zapojení |
| 61 | Jak propojit baterii, solár, booster a kemp, aby se to „nepralo“ s elektroblokem? | [caravan24: Správné zapojení el. v karavanu (4,8k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44016) | často | částečně (P-zapojení, R-obytňák) | **K** P-zapojení: volba „mám elektroblok“ |
| 62 | Potřebuju BatteryProtect / odpojovač při podpětí, když má baterie BMS? | [motorhomefun: Wiring diagram review](https://motorhomefun.co.uk/forum/threads/wiring-diagram-review.305393/post-6203944); [Victron: another schematic review](https://communityarchive.victronenergy.com/questions/177685/another-schematic-review.html) | občas | chybí | **FAQ** |
| 63 | Je moje auto jiné? (T5/T6/Ducato – každé zapojené jinak, co je od výroby) | [tx-board: T5.2 Elektromods](https://tx-board.de/threads/t5-2-elektromods-fragen-ueber-fragen-ist-jeder-t5-anders-verkabelt.125801/) | občas | chybí | mimo rozsah; **FAQ** jen „zjistěte, co vůz má: relé, D+, druhá baterie“ |

## 9. Legislativa a bezpečnost (4)

| # | Otázka | Typická vlákna | Četnost | Na webu | Návrh |
|---|---|---|---|---|---|
| 64 | Musím přestavbu zapsat na STK? Co kontrolují u elektriky? | [portal.gov.cz: schválení přestavby](https://portal.gov.cz/sluzby-vs/zadost-o-schvaleni-stavby-nebo-prestavby-vozidla-S778) | občas | pokryto (prestavba-dodavky-stk) | – |
| 65 | Potřebuju revizi 230 V? Zaplatí pojišťovna požár bez revize? | [banky.cz: revize a pojištění obytného auta](https://www.banky.cz/clanky/plyn-a-elektrina-v-obytnem-aute-revize-povinnosti-a-pojisteni/) | občas | částečně (prestavba-dodavky-stk: Revize) | **DL** prestavba: oddíl „Pojišťovna“ (jen: zeptejte se, co požadují; doklady o montáži) |
| 66 | Smím 230 V dělat sám? Kdo mi to udělá (autoelektrikář vs. elektrikář)? | [caravan24: Hledám autoelektrikáře](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44072); [caravan24: Výměna LiFePO4 – hledá montéra Brno](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43808) | často | pokryto (prestavba: Kdo smí na 230 V; pripojka: Co smí laik) | – |
| 67 | Co když baterie / kabel začne hořet? Hasicí přístroj, umístění baterie v interiéru | [akkudoktor: Aufbauelektrik fällt aus](https://akkudoktor.net/t/kastenwagen-aufbauelektrik-faellt-immer-wieder-ploetzlich-aus/39313?page=7) | občas | pokryto (pozar-elektroinstalace) | – |

## 10. Provoz, údržba, chyby (3)

| # | Otázka | Typická vlákna | Četnost | Na webu | Návrh |
|---|---|---|---|---|---|
| 68 | Ráno nenastartuju / po 700 km nenastartoval – co vybilo startovací baterii? | [caravan24: Startovacia bateria KO](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44177); [caravan24: Po 700 km…](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44140) | často | pokryto (startovaci-baterie-se-vybiji) | – |
| 69 | Elektrika v nástavbě občas sama vypadne / displej pípá | [akkudoktor: Aufbauelektrik fällt immer wieder aus](https://akkudoktor.net/t/kastenwagen-aufbauelektrik-faellt-immer-wieder-ploetzlich-aus/39313?page=9) | občas | chybí | součást NL „Hledání závady“ (#55) |
| 70 | Co kontrolovat jednou za sezónu (utažení, koroze, pojistky)? | [caravan24: Trakční baterie](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44086) | občas | pokryto (pozar-elektroinstalace: kontrolní seznam; hlavní vypínač: před zimou) | – |

**Celkem 70 otázek.** Pokryto 31, částečně 22, chybí 17.

---

## Top 15 chybějících / nejslabších míst (podle četnosti)

1. **Hledání závady: nástavba mrtvá / vypadává / nenabíjí** (#55, #69, #19) → NL „Hledání závady krok za krokem s multimetrem“.
2. **Olovo, AGM, nebo lithium – rozhodnutí** (#7) → NL (nejčtenější CZ vlákna vůbec).
3. **Elektroblok: co v něm je a jak k němu připojit booster/baterii** (#54, #18, #61) → NL + volba v P-zapojení.
4. **Zásuvky 230 V z kempu i z měniče, přepínání, chránič za měničem** (#29, #31, #30) → NL.
5. **Lednice kompresorová vs. absorpční, absorpce na 12 V jen za jízdy** (#45, #46) → NL.
6. **Dvě baterie paralelně / stará + nová** (#9) → NL + K.
7. **Jak vybrat lithiovou baterii (BMS, proud, mráz, hmotnost)** (#15) → NL.
8. **Solár na střechu krok za krokem v hotovém voze** (#24) → NL.
9. **Montáž krok za krokem a pořadí připojení** (#60) → NL + kontrolní seznam v P-zapojení.
10. **Zkontrolujte mi zapojení** (#59) → K režim kontroly.
11. **Volty/ampéry/watty/Ah pro laiky** (#2) → NL + slovníček.
12. **Starlink / internet z baterie** (#51) → krátká NL nebo FAQ.
13. **Euro 6 a D+: odkud vzít signál** (#17) → DL nabijeni-z-alternatoru.
14. **Elektrocentrála** (#34) → FAQ.
15. **Přípojnice a pojistková skříň** (#42) → krátká NL; spolu s **BMS odpojuje / jiskra u měniče** (#10, #11) → DL.

Dalších ~10 položek stačí jako **FAQ** (#14, #22, #23, #40, #48, #52, #53, #57, #58, #62).

---

## Co lidi chtějí mít ve schématu zapojení

### Komponenty (podle toho, jak často se v recenzích schémat a dotazech objevují)

**Baterie a ochrana**
- Nástavbová baterie (typ, kapacita); **varianta dvě baterie paralelně** (plus z jedné, mínus z druhé, stejné délky propojek).
- **Hlavní pojistka hned u plusu baterie** s typem (Class T / MRBF / MEGA / ANL) – nejčastější výtka „chybí pojistka u baterie“.
- **Hlavní vypínač** (s jasným umístěním vůči pojistce) a co zůstává zapnuté.
- **Bočník (shunt) v mínusu** – co se smí připojit před něj a co za něj (nic přímo na mínus baterie).
- **Přípojnice plus a mínus** (společný bod), pojistková skříň 12 V s větvemi.
- Volitelně: odpojovač při podpětí (BatteryProtect) vs. BMS, teplotní čidlo.

**Nabíjení**
- **Booster s pojistkou na obou koncích** (u startovací i u nástavbové baterie), signál D+ / zapalování.
- **Oddělovací relé** (staré) – a varianta „relé nahrazeno boosterem“ / „relé v elektrobloku vyřazeno“.
- **Solár**: panely (série/paralela), **vypínač/jistič mezi panely a regulátorem** (dvoupólový), pojistka regulátor–baterie, pojistky větví u 3+ panelů.
- Udržovací nabíjení startovací baterie (výstup regulátoru / nabíječky).
- **Nabíječka z 230 V**.

**230 V**
- **Přívodka z kempu → jistič + chránič** ve voze.
- **Měnič s vlastním kabelem a pojistkou přímo od baterie/přípojnice**.
- **Přepínač síť/měnič** (nebo měnič s přednostním zapojením sítě, nebo kombi měnič-nabíječ); **chránič za měničem**; PE/kostra 230 V.
- Elektrocentrála jako „druhý kemp“.

**Hotový obytňák**
- **Elektroblok** (Schaudt/Nordelettronica/Dometic) jako jedna krabice: vstup z baterie, D+, výstupy, vestavěná nabíječka a relé; kam připojit booster, nový regulátor, měnič.
- Karavan: 13pólová zásuvka (trvalý plus, nabíjení, lednice).

**Spotřebiče a ostatní**
- Lednice (kompresorová, rozběhový proud), topení (start), čerpadlo, světla, USB, Starlink, TV, ventilátor; **velký odběr (měnič, indukce) mimo pojistkovou skříň**.
- Kostra: kde mínus na karoserii smí a kde ne; propojení mínusu nástavbové a startovací baterie.

### Co čekají od výstupu

- **Obrázek schématu** s průřezem a pojistkou přímo u každého kabelu (nejvíc chybí na všech fórech; lidé kreslí sami a nechávají to kontrolovat).
- **Blokové schéma** pro pochopení (kdo nabíjí koho) – hlavně majitelé hotových vozů s elektroblokem.
- **Tabulka spojů**: od–do, délka, průřez, pojistka, typ pojistky.
- **Kusovník** po větvích (kabely v metrech plus/mínus, oka, pojistky, držáky, přípojnice, vypínač).
- **Kontrolní seznam**: pojistky u zdroje, pořadí připojení (baterie poslední / regulátor před panely), utažení, popisky „dvě napájení 230 V – odpojit obě“.
- **Upozornění a kontrola**: „tvůj booster nemá pojistku na straně startovací baterie“, „pojistka větší než kabel“, „měnič přes pojistkovou skříň“, „mínus spotřebiče mimo bočník“ – tedy režim **„zkontroluj moje zapojení“**.
- **Tisk / PDF** a jasné „podklad, ne revize; 230 V elektrikář“.
- Varianty začátku: od nuly vs. **mám hotový obytňák s elektroblokem**.
