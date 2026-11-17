# Rešerše: co lidi u elektriky v dodávce zajímá a jak to dělá konkurence

Autor: reserser (subagent), 17. 11. 2026. Stav: podklad pro hlavní vlákno. Jen témata a bolesti, **žádná čísla z fór** (fóra nejsou zdroj hodnot).

## Jak jsem hledal a co se nepovedlo

- Rozpočet: ~20 vyhledávání, ~24 otevřených stránek.
- **Reddit (r/vandwellers, r/VanLife, r/SolarDIY, r/campervan) je pro náš nástroj blokovaný** (vyhledávání i stažení). Facebookové skupiny (Nomádem, vanlife CZ) také nedostupné. **obytnevozy.cz** neodpověděl (DNS), **wohnmobil-forum.de** je doména na prodej. Anglický a německý obraz proto stojí na Victron Community (archiv), FarOutRide, akkudoktor.net, promobil-forum, motorhomefun, T6/Fiat fórech.
- Nejlepší český zdroj: **caravan24.cz, sekce Elektro (2 167 vláken) a Elektro akademie (74 vláken)** – tam jsou vidět i počty zobrazení, takže pořadí aspoň u CZ/SK má oporu.
- Pořadí níže je **odhad četnosti** (počty zobrazení na caravan24 + jak často se téma vracelo v ostatních zdrojích), ne měření.
- Důležité zjištění k publiku: české fórum je hlavně o **hotových obytňácích a karavanech** (elektroblok EBL, Truma, výměna olova za LiFePO4, vypadávající chránič), zatímco anglické zdroje o **stavbě dodávky od nuly**. Naše cílovka „laik staví dodávku“ je v CZ menší, ale „majitel obytňáku vylepšuje“ je velká a nepokrytá.

## A) Nejčastější otázky a bolesti

Legenda pokrytí: **ANO** = lekce i kalkulačka, **ČÁST** = jen část, **NE** = chybí.

| # | Téma | Co lidi řeší (vlastními slovy) | Typická vlákna | Caravanix |
|---|---|---|---|---|
| 1 | Kolik baterie potřebuji | Neví, kolik spotřebují; přestřelují nebo podstřelují kapacitu; Ah vs. Wh; kolik dní vydrží. | [Victron: will solar power be enough, newbie](https://communityarchive.victronenergy.com/questions/172314/will-solar-power-be-enough-newbie-here%EF%B9%96childToView=172388.html); [caravan24: Nástavbová baterie](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44151) | **ANO** – kalkulačky spotřebiče, baterie, soběstačnost |
| 2 | Nabíjení za jízdy: relé, nebo booster; Euro 6 | Proč se baterie za jízdy nenabije; chytrý alternátor; co s původním oddělovacím relé, když přidám booster; jak velký booster. | [caravan24: Booster Cyrix (17k zobr.)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=37206); [caravan24: DC-DC 50A](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44093); [akkudoktor: Aufbau Camper](https://akkudoktor.net/t/aufbau-camper/18152) | **ANO** – lekce nabíjení z alternátoru + kalkulačka booster. Chybí: co udělat s relé v elektrobloku |
| 3 | Výměna olova za LiFePO4 v hotovém obytňáku | Zvládne to můj elektroblok/nabíječka (EBL, CB 516)? Jaký profil nastavit? Musím měnit nabíječku? | [caravan24: Typy LiFePO baterií (16k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=39314); [EBL 226 a LiFePO4](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=42399); [CB 516 + LiFePO4](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=41208) | **NE** |
| 4 | Měnič 12/230 V | Sinus vs. upravený sinus; jak velký; odběr naprázdno; teplo a zakrytí ve skříňce; uzemnění zásuvek za měničem; nepřipojit měnič do sítě. | [caravan24: Měniče napětí podrobně (79k, 122 přísp.)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=28173); [caravan24: měnič](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44083) | **ČÁST** – lekce + kalkulačka; chybí PE/zásuvky za měničem a přepínání síť/měnič |
| 5 | Solár: kolik W, MPPT/PWM, jak zapojit | Jak připojit dva různé panely; série/paralela; proč klesl výkon; přenosný panel; na kterou baterii. | [caravan24: Dva různé FV panely (31k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=28011); [Pokles výkonu solárního systému](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44110) | **ČÁST** – lekce série/paralela + kalkulačka solár; chybí různé panely, stín, diagnostika poklesu |
| 6 | 230 V přípojka a chránič | Chránič v kempu vypadává; vadný spotřebič vs. kemp vs. vlastní instalace; přívodní kabel; N-PE propojení u měniče/nabíječe. | [caravan24: chránič](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43782); [Přívodní kabel 220V](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44155); [Victron: MultiPlus vyhazuje RCD](https://communityarchive.victronenergy.com/questions/58239/multiplus-12200080-tripping-shore-rcd.html) | **NE** |
| 7 | Startovací baterie se vybíjí | Auto stojí, startovací baterie padne; dobíjet ji ze soláru nebo nabíječkou; „po 700 km jsem nenastartoval“. | [caravan24: Nabíjení startovací baterie solárem (21k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=39764); [Startovacia bateria KO](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44177); [Po 700 km…](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44140) | **NE** |
| 8 | Pojistky: kde a jak velké | Pojistka u baterie, mezi bateriemi, mezi regulátorem a baterií; větší pojistka po přepálení. | [promobil-forum: Sicherung Laderegler–Batterie](https://www.promobil.de/forum/threads/38505-Sicherung-zwischen-Laderegler-und-Aufbaubatterie); [motorhomefun: relay rating](https://www.motorhomefun.co.uk/forum/threads/what-relay-rating-do-i-need-for-a-twin-leisure-battery-setup.221571/) | **ANO** – 2 lekce + kalkulačka |
| 9 | Průřez kabelů a úbytek napětí | Jaký kabel k měniči/boosteru; délka tam a zpět; co znamená „délka“ v kalkulačce. | [Victron: toolkit – co znamená délka](https://communityarchive.victronenergy.com/questions/21208/victron-toolkit-cable-call-what-does-length-mean%EF%B9%96childToView=21230.html) | **ANO** |
| 10 | Schéma zapojení krok za krokem / „zkontrolujte mi schéma“ | Lidé chtějí hotové schéma pro svou sestavu a nástroj, který nemá strmou křivku učení. | [Victron: Free wiring diagram software](https://community.victronenergy.com/t/free-system-wiring-diagram-software/43553); [solarpaneltalk: wiring into camper van](https://solarpaneltalk.com/forum/off-grid-solar/12v-solar-for-rv-or-camping-etc/415967-wiring-solar-system-into-camper-van) | **ČÁST** – jen jedno vzorové živé schéma |
| 11 | Kostra, mínus, „zem“ | Mínus na karoserii, nebo samostatně; napětí mezi kostrou a zemí; uzemnění měniče; kostra jako zpětný vodič. | [caravan24: napětí kostra oproti zemi](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43357); [rvelectricity: grounding](https://rvelectricity.substack.com/p/rv-grounding-part-1/comments) | **NE** |
| 12 | LiFePO4 v zimě a odstavení | Nabíjení v mrazu; vyhřívané baterie; jak baterii odstavit na zimu / na dlouho. | [caravan24: LiFePO4 a odstavení auta](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=44173); [motorhomefun: LiFePO4 in winter](https://motorhomefun.co.uk/forum/threads/lifepo4-batteries-in-winter.273046/page-2) | **ČÁST** – nabíjení v mrazu ano, odstavení/skladování ne |
| 13 | Lednice: kompresor vs. absorpce, kolik vydrží | Výměna absorpční za kompresorovou; zapojení; kolik sní baterie přes noc. | [caravan24: Výměna a zapojení kompresorové lednice](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43889); [lednice RM 7655L](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43702) | **ČÁST** – katalog spotřebičů, lekce chybí |
| 14 | Paralelní baterie, druhá baterie, stará + nová | Jak spojit dvě baterie (do kříže), přidat kapacitu, míchat staré a nové. | [caravan24: Jak spojit baterie](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=3256&rowstart=120); [promobil: Batterien parallel schalten](https://www.promobil.de/forum/threads/37926-Batterien-parallel-schalten%21-Was-gibt-es-zu-beachten) | **NE** |
| 15 | Velké spotřebiče: indukce, klimatizace, ohřev | Utáhne to baterie a měnič? Kolik proudu teče? | [caravan24: Dobíjení elektrokola (9k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43780) | **ANO** – lekce indukce a klimatizace |
| 16 | Elektronika na cestách | Elektrokolo, notebook, Starlink (stálý odběr) – stačí to? | [caravan24: Starlink (28k)](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=42270) | **ČÁST** – katalog spotřebičů (ověřit, zda tam jsou) |
| 17 | Monitor baterie / shunt | Kolik mi zbývá; napětí lže u LiFePO4; kam dát shunt. | [Fiat forum: split charge problems](https://www.fiatforum.com/threads/split-charge-problems.517227/post-4815372) | **NE** |
| 18 | Hlavní vypínač a parazitní odběr | Odpojovač baterie (plus/mínus), co zůstává pod proudem, vybitá baterie po zimě. | [caravan24: Blackout v nástavbě](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=43485) | **NE** |
| 19 | Chyby začátečníků, požár | Chybějící pojistky, špatně zalisovaná oka, kabel přes ostrou hranu. | [akkudoktor: Aufbauelektrik fällt aus](https://akkudoktor.net/t/kastenwagen-aufbauelektrik-faellt-immer-wieder-ploetzlich-aus/39313?page=7) | **ANO** – lekce požár |
| 20 | Cena celé sestavy | Kolik to stojí, levná vs. kvalitní varianta, co koupit. | (zahraničí: kusovníky s cenou u FarOutRide/Explorist) | **NE** |
| 21 | Legalita, STK, revize v ČR | Zápis přestavby, revize elektro a plynu, kdo smí dělat 230 V. | [portal.gov.cz: schválení přestavby](https://portal.gov.cz/sluzby-vs/zadost-o-schvaleni-stavby-nebo-prestavby-vozidla-S778) | **NE** |
| 22 | Nabíječka z 230 V | Jaký proud, jaký profil, dvoukanálová pro startovací. | [caravan24: Elektroblok EBL 31](https://www.caravan24.cz/infusions/forum/viewthread.php?thread_id=41992) | **NE** |

**Shrnutí pokrytí:** dobře máme dimenzování (1, 8, 9, 15, 19) a nabíjení z alternátoru (2). Nejvíc chybí: **230 V a chránič (6), kostra/mínus (11), výměna olova za LiFePO4 v hotovém obytňáku (3), startovací baterie (7), monitor/shunt (17), paralelní baterie (14), STK/revize (21), cena (20)**. Tato témata jsou na CZ fóru mezi nejčtenějšími.

## B) Jak to dělá konkurence

### FarOutRide (faroutride.com) – nejpropracovanější cesta
- **Cesta:** výslovná trilogie „A: nauč se základy → B: jak dimenzovat → C: kalkulačka“, pak „Electrical System Builder“ (dashboard) a interaktivní schéma. Každá stránka odkazuje na další krok.
- **Kalkulačka:** spotřebiče DC a AC po řádcích, léto i zima zvlášť (počítá horší sezónu), typ cestovatele (léto / 3 sezóny / zima), typ alternátoru, předvyplněné vzorové sestavy, režim „auto“ i ruční. Výstup: velikost baterie, soláru, regulátoru, boosteru, nabíječky, měniče + **diagnostické hlášky** („baterie je na tento měnič malá“) + kusovník s cenou ve dvou úrovních.
- **Schéma:** dvě pevné varianty (Standard / High-Power), uživatel do nich dosadí komponenty z kalkulačky; průřezy, pojistky, jističe, celková délka kabelu a počet ok se dopočítají. Komponenty na schématu jdou najet/kliknout pro vysvětlení. Kusovník rozdělený po větvích (baterie, solár, alternátor, přípojka, měnič, spotřebiče).
- **Dobré:** jasný „další krok“, nápověda u každého pole, varování s vysvětlením, léto/zima, rezerva na kabel.
- **Špatné:** plné schéma je placené PDF, spousta affiliate odkazů, rozpory v textu (velikost měniče), dlouhé stránky; komentáře (730+) ukazují, že laik se v délce ztrácí.

### Explorist.life
- **Cesta:** volné samostatné kalkulačky (průřez, pojistka, regulátor, power audit, doba nabíjení) + desítky stránek „schéma pro sestavu X W / Y Ah“. Propojení jen přes menu, ne přes průvodce.
- **Schéma:** statický obrázek konkrétní sestavy + video + kusovník po sekcích; průřezy a pojistky jsou schované v názvech produktů. Placené PDF ve vysokém rozlišení. Sekce „pořadí prací“ nedokončená.
- **Dobré:** hotová schémata podle velikosti sestavy, kusovník po větvích.
- **Špatné:** schéma není interaktivní, laik musí křížově číst text a obrázek, reklama a obchod, nefunkční odkazy. Kalkulačka průřezu jen pro DC, lidé ji přesto používají na 230 V.

### VoltPlan (voltplan.app; .com je doména na prodej)
- **Cesta:** šablona (dodávka / loď / chata) → přidávání komponent z knihovny → **schéma se generuje samo**. Kontroluje kompatibilitu (solár bez regulátoru neprojde). Samostatné kalkulačky (průřez, baterie, měnič, solár) a blog.
- **Výstup:** schéma rozdělené do pásů (zdroje a nabíjení → baterie → ochrana: shunt, hlavní vypínač, podpěťová ochrana → spotřebiče), průřez AWG i mm² na každém spoji, pojistky automaticky, export PDF/PNG/SVG. Zdarma bez registrace.
- **Dobré:** nejblíž tomu, co chceme – skládání komponent → hotové schéma s průřezy a pojistkami, čisté pásy, žádná registrace.
- **Špatné:** výuka je oddělená (blog), chybí „proč“ u jednotlivých rozhodnutí; nezačíná spotřebou, takže laik neví, jaké komponenty vybrat; jen DC, 230 V ne. Uživatelské recenze jsem nenašel.

### Victron (Wiring Unlimited, Toolkit)
- **Wiring Unlimited:** zdarma kniha o kabeláži, pojistkách, uzemnění, paralelních bateriích; autorita, ale pro laika suchá a bez návaznosti na výpočet.
- **Toolkit (app):** jednotlivé kalkulačky (průřez a úbytek, teplotní derating). Žádný průvodce, žádný návrh systému. Lidé se ptají, co je „délka“ (tam, nebo tam a zpět) – nejasné zadání.
- Návody k produktům uvádějí doporučený průřez a pojistku – dobrá kotva pro naše karty.

### Mowgli Adventures
- Web při rešerši nedostupný (HTTP 521), obsah podle výsledků hledání: dlouhý „ultimate guide“ k zapojení, schémata solárních sestav podle výkonu (100 W …), **placený „design tool“ / návrh na míru** (dotazník → vlastní schéma a kusovník). Model: zdarma text, schéma za peníze.

### Mobile Solar Power (Will Prowse)
- Web se ve výsledcích neobjevil; jeho materiál žije hlavně na YouTube a v testech baterií. Pro nás nepodstatné.

### Německé a české
- **Německo:** online plánovač schémat jsem nenašel. Obsah drží časopis promobil (Lade-Booster, LiFePO4 v zimě), ADAC (solár), e-shopy (Solarkontor, Electronicx) a autoservisy (kfz-dietrich). Odkazy na normy DIN EN 1648-1/-2. „Ulrich Arnold“ ani „wohnmobil-strom“ jsem v rozpočtu nedohledal.
- **Česko:** **žádný český nástroj ani průvodce elektrikou dodávky neexistuje.** Jen e-shopy (SvětKaravanů, Padabo – návody k boosterům), blogy výrobců (viox.com/cs), články (oenergetice.cz, usetreno.cz) a fórum caravan24. To je naše mezera.

### Co je společné a co z toho plyne
1. Nejlepší weby vedou **spotřeba → velikosti → schéma → kusovník**. Kdo vynechá první krok (VoltPlan), nechává laika hádat komponenty; kdo vynechá schéma (Victron, Explorist kalkulačky), nechává ho bez obrázku.
2. Schéma je skoro všude **placené nebo statické**. Interaktivní schéma generované z vlastní sestavy zdarma a česky by bylo unikátní.
3. Nikdo nevysvětluje „proč“ přímo u spoje (proč tahle pojistka, proč tento průřez). FarOutRide má tooltipy, ale ne u schématu.
4. Nikdo neřeší **hotový obytňák s elektroblokem**, jen stavbu od nuly.

## C) Doporučení pro Caravanix (12 bodů)

1. **Jedna cesta „Navrhnout instalaci“ v 6 krocích**, každá kalkulačka je krok a končí tlačítkem „Další krok“ s převzetím výsledku (stav v URL):
   1) Spotřeba (spotřebiče a vaření) → 2) Jak cestujete (soběstačnost: dny bez přípojky, sezóna léto/zima) → 3) Baterie → 4) Nabíjení: solár, booster, 230 V nabíječka → 5) Měnič (jen pokud jsou 230V spotřebiče) → 6) **Zapojení: schéma, průřezy, pojistky, kusovník**.
   Kalkulačky zůstanou použitelné i samostatně; průvodce je jen předává dál.
2. **Na začátku rozcestí:** „Stavím dodávku od nuly“ vs. „Mám hotový obytňák a vylepšuji (LiFePO4, solár, booster)“. Druhá větev přeskočí, co už ve voze je (elektroblok, nabíječka, relé), a zeptá se na ně.
3. **Léto/zima jako přepínač** (jako FarOutRide), ne dva samostatné výpočty.
4. **Diagnostické hlášky mezi kroky** v našem systému OK / varování / blok: např. baterie malá na měnič, booster větší, než unese alternátor, solár na zimu nestačí. Každá hláška odkazuje na lekci.
5. **Lekce vázat na krok**, ne jen do příručky: u každého kroku 1–2 lekce „Proč?“ a lekce končí odkazem zpět do kroku.
6. **Kusovník na konci** po větvích (baterie, nabíjení, solár, 230 V, spotřebiče) s parametry, ne značkami (zásada 6); délky kabelů, počet ok a pojistek. Cena jen jako orientační rozpětí, až bude ověřená.
7. **Návrh 8 nových lekcí:**
   - **„Kostra není zpětný vodič zadarmo“** – kdy mínus na karoserii, kdy samostatný vodič a proč jeden společný bod.
   - **„Přípojka 230 V a chránič v kempu“** – co dělá chránič, proč vypadává, co smí laik a co patří elektrikáři.
   - **„Z olova na LiFePO4 v hotovém obytňáku“** – co zkontrolovat na elektrobloku, nabíječce a relé, než baterii vyměníte.
   - **„Startovací baterie nesmí padnout“** – odkud se vybíjí a jak ji udržet nabitou (solár, nabíječka, oddělení).
   - **„Monitor baterie: proč napětí lže“** – shunt, kam ho dát a co ukazuje.
   - **„Dvě baterie vedle sebe“** – paralelní spojení, stejné typy a stáří, pojistky, zapojení do kříže.
   - **„Hlavní vypínač a co žere v klidu“** – odpojovač, parazitní odběr, odstavení vozu na zimu.
   - **„Dodávka a zákon: STK, revize, přestavba“** – co se zapisuje, kdy je potřeba revize 230 V a plynu (jen odkazy na předpisy, ne výklad).
   Náhradníci: lednice kompresor vs. absorpce (už v náhradnících návrhu 10 lekcí), měnič a zásuvky za ním (PE, přepínání síť/měnič).
8. **Obrázkový průvodce zapojením – jak má fungovat:** schéma se **staví postupně po pásech** (jako VoltPlan, ale řízené otázkami):
   - Pás 1 **Baterie a ochrana**: baterie (typ, napětí, kapacita z kroku 3) → hlavní pojistka u baterie → hlavní vypínač → shunt (volitelný) → přípojnice plus/mínus.
   - Pás 2 **Nabíjení**: booster nebo relé (podle alternátoru), solární regulátor + panely (série/paralela z kalkulačky), 230V nabíječka / přípojka.
   - Pás 3 **Rozvod**: pojistková skříň 12 V, větve ke spotřebičům z kroku 1 (lednice, světla, čerpadlo, USB).
   - Pás 4 **230 V (volitelný)**: měnič, přepínání síť/měnič, chránič – s jasnou hranicí „tady končí laik, tady začíná elektrikář“.
   - Uživatel v každém pásu jen **zaškrtá komponenty**, které má; parametry se převezmou z kalkulaček, nic se nezadává dvakrát.
9. **Co ukázat u schématu:** u každého vodiče průřez v mm², délku a pojistku přímo na čáře; klik na součástku/vodič otevře „proč“ (1–2 věty + odkaz na lekci a kartu); barevně plus/mínus; varování přímo na místě (červený vodič = poddimenzovaný). Výstup: schéma (SVG/PDF k tisku), tabulka spojů (od–do, průřez, délka, pojistka), kusovník, kontrolní seznam montáže a věta „podklad, ne revize“.
10. **Vzorové sestavy jako start** (víkendovka / celoroční / zimní s indukcí), ze kterých si uživatel upraví svou – zkracuje první krok, FarOutRide to má a funguje.
11. **Režim „Zkontrolujte mi zapojení“**: uživatel zadá, co má (baterie, pojistka, kabel, booster), a dostane OK/varování/blok. Odpovídá na nejčastější fórovou prosbu „zkontrolujte mi schéma“ a hodí se pro majitele hotových obytňáků.
12. **Neopakovat chyby konkurence:** schéma zdarma a bez registrace, žádná affiliate změť, krátké stránky, jasné „délka tam a zpět“ u každého vstupu, a nikdy kalkulačku DC použitelnou omylem na 230 V.
