# Čtenář laik: Miroslav (72), lednice 60 W / 5 m a proč pojistka patří k baterii

- **Persona:** Miroslav, 72 let, tablet (okno 820 × 1180), větší písmo (125 %), opatrný, chce rozumět proč.
- **Úkol:** „Spočítejte, jaký kabel a jakou pojistku potřebuje lednice 60 W, která je 5 m od baterie. Pak zjistěte, proč pojistka patří k baterii.“
- **Datum:** 16. 11. 2026, web http://localhost:4321/cs/ (vývojový server)

## Splnil jsem úkol: s potížemi

Výsledek jsem našel rychle (kabel 2,5 mm², pojistka 7,5 A u baterie, na plusu) a v lekci jsem našel i vysvětlení, proč pojistka patří k baterii. Potíže nebyly v tom, jak se tam dostat, ale v tom, že jsem si nebyl jistý, jestli výsledku můžu věřit a jestli jsem ho opravdu „spočítal já“.

## Kroky

1. Úvodní stránka: žlutý rámeček „Interní alfa“, pod ním karta „Průřez kabelu a pojistka“ s hnědým tlačítkem. Klepl jsem na tlačítko.
2. Kalkulačka: pole „Příkon spotřebiče“ už obsahovalo **60 W** a délka už byla **5 m**. Pro jistotu jsem 60 přepsal znovu.
3. Ostatní volby jsem nechal: 12 V, „Příkon“, „Elektronika, lednice, měnič“ (lednice je tam jmenovaná, to mě uklidnilo), „Vlastní kabel“, „Samostatně“.
4. Sjel jsem dolů na „Výsledek“: velké číslo **2,5 mm²**, pojistka **7,5 A, u baterie, na plusu**, úbytek napětí 0,35 V, zelené „V pořádku“.
5. Pod výsledkem jsem v části „Proč to tak vychází“ klepl na „Pojistka chrání kabel“.
6. V lekci jsem našel nadpis **„Patří k baterii, ne ke spotřebiči“** s vysvětlením, že kdyby byla pojistka až u spotřebiče, zkrat mezi baterií a pojistkou nic nezastaví. To byla odpověď na druhou část úkolu.

## Kde jsem se zasekl

- **Hodnoty už tam byly.** Otevřel jsem kalkulačku a v ní přesně moje lednice: 60 W a 5 m. Nevěděl jsem, jestli je to příklad, nebo jestli jsem už něco zadal. Neviděl jsem žádné tlačítko „Spočítat“, výsledek se prostě objevil. Chvíli jsem hledal, kde se to potvrzuje.
- **Délku nejde napsat.** Délka se nastavuje posuvníkem nebo tlačítky „− 0,1“ / „+ 0,1“. Na tabletu je posuvník tenký a trefit přesně 5 m prstem je těžké. U 5 m jsem měl štěstí, že to tam už bylo. Políčko na číslo, jako u wattů, by mi vyhovovalo víc.
- **Volby, kterým nerozumím, a nevím, co zvolit:** „Zpětný vodič (mínus)“, „Přes kostru“, „Ve svazku“. Nechal jsem výchozí, ale netuším, jestli to u mé lednice platí. Kalkulačka neříká, co je obvyklé.
- **Odpověď „proč“ je až na jiné stránce.** U výsledku stojí jen „u baterie, na plusu“ a v „Jak na to“ „nejvýš 17,5 cm od ní“. Proč, to se dozvím až po přechodu na lekci. Jedna věta přímo u pojistky by mi stačila.
- **Z lekce zpátky:** tlačítko „Spočítat v kalkulačce“ mě vrátilo do kalkulačky. Nevím, jestli se zachovalo, co jsem zadal (tady to vyšlo stejně, protože 60 W / 5 m je asi výchozí příklad).

## Čemu jsem nerozuměl, která slova neznám

- **mm²** a **průřez**: tuším, že je to tloušťka, ale jak „2,5 mm²“ poznám v obchodě?
- **AWG 12 (3,31 mm²)**: nevím, co to je. A proč je to číslo jiné než 2,5? Mám koupit 2,5, nebo 3,31?
- **úbytek napětí**, **úbytek 3 %**: vysvětlení „kolik napětí se smí v kabelu ztratit“ je pod volbou, ale proč se napětí ztrácí a proč to lednici vadí, nevím.
- **zpětný vodič**, **přes kostru**, **ve svazku**, **FLRY**, **izolace 105 °C**, **třída C nebo D**, **CCA**, **NEC**: nerozumím vůbec. Zvlášť věta o CCA a NEC zní, jako by byla psaná pro elektrikáře.
- **rozběhový proud**, **pomalá pojistka**, **Class T**, **vypínací schopnost** (v lekci).
- **„1,25× proud spotřebiče“** v lekci: nevím, co s tím mám dělat já.
- **„zúžení kabelu“**: chvíli jsem nevěděl, jestli se kabel někde zužuje sám. Až z dalšího odstavce jsem pochopil, že jde o odbočku na tenčí kabel.
- Ve žlutém rámečku: **„karty tvrzení, designér, Radek“**: nevím, kdo je Radek ani co jsou karty tvrzení. Pod lekcí kódy „K-VODIC-0011 …“: nevím, co znamenají.

## Čemu jsem nevěřil a proč

- **Žlutý rámeček nahoře:** texty a čísla prý zatím neprošla schválením. Jako opatrný člověk jsem si řekl: tak proč bych tomu číslu měl věřit? Je to poctivé, ale po přečtení jsem výsledku věřil méně.
- **2,5 vs. AWG 12 (3,31) vs. tabulka.** U výsledku stojí „2,5 mm² nebo AWG 12 (3,31 mm²)“, ale v tabulce dole je u 2,5 mm² napsané „14 (2,08)“. Dvě různá čísla pro totéž. Nevím, který údaj platí, a začal jsem pochybovat o celé stránce.
- **Tabulka vs. výsledek.** Ve výsledku stojí, že kabel 2,5 mm² může být dlouhý až 5,1 m. V tabulce je u 2,5 mm² délka 1,3 m. Pod tabulkou je věta o polovičním proudu a dvojnásobné délce, ale nestačila mi, abych pochopil, proč čísla nesedí.
- **„V pořádku“ dvakrát** (v tmavém rámečku i v zeleném): nevadí, jen nevím, jestli jde o dvě různé kontroly.
- **„Max. délka kabelu 5,1 m“, já mám 5 m:** to je těsně. Má mi to dělat starost? A v „Jak na to“ stojí „přičtěte 10–20 % na ohyby“. Mám tedy zadat 5,5–6 m? Pak by asi vyšel jiný kabel. Nikdo mi to neřekl dřív, než jsem počítal (rada je až pod výsledkem).
- Lekce začíná kurzívou v uvozovkách „Pojistka chrání spotřebič.“ Chvíli jsem myslel, že to je tvrzení stránky. Až z nadpisu jsem pochopil, že je to omyl, který lekce vyvrací.

## Co by mi pomohlo

- Napsat na začátek kalkulačky: „Je tu předvyplněný příklad: lednice 60 W, 5 m. Přepište ho svými hodnotami.“ A že se výsledek počítá sám, bez tlačítka.
- U délky políčko, kam napíšu číslo, nebo větší tlačítka.
- U pojistky ve výsledku jednu větu: „U baterie proto, aby chránila celý kabel; kdyby byla u lednice, kabel mezi baterií a pojistkou by nic nehlídalo.“
- U voleb „Zpětný vodič“ a „Kudy kabel povede“ napsat, co zvolit, když nevím.
- Říct jasně, co jít koupit, třeba „měděný kabel 2,5 mm² na plus i mínus a pojistku 7,5 A s držákem“. AWG schovat, nebo vysvětlit, že je to americké značení.
- Žlutý rámeček psát pro mě (třeba „Stránka je ve zkoušce, výsledek si nechte zkontrolovat elektrikářem“), ne pro tým.
- Větší písmo v prohlížeči zvětšilo text jen trochu; na tabletu mi to ještě stačilo.

## Poznámka k testu

Ve vývojovém režimu se dole uprostřed zobrazuje plovoucí lišta Astra, která na tabletu překrývá text. V hotovém webu tam asi nebude.
