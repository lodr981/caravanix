# Karty třídy A ke schválení (16. 11. 2026, upravil mistr podle v1.1)

**Pro:** Radek (schvalování bezpečnostních karet třídy A)
**Počet karet:** 9 (K-VODIC-0007, 0012, 0013, 0014, 0015, 0021, 0022, 0024, 0035)

**Co tu je a proč (mistr, 16. 11. 2026):** jen karty třídy A, které potřebuje kalkulačka průřezu **v1.1** a dvě lekce svislého řezu (kabel, pojistka), a jen ve stavu `overeno`. Všech 9 to splňuje: u 0007 a 0012 rozhodl spor po druhém vrácení Radek a karty nesou jeho znění, u ostatních je poslední nález ověřovatele SEDÍ. Žádná z nich nezávisí na archivní verzi 2.

**Změna proti předchozí verzi přehledu:**

- **0005 stažena:** ve v1.1 je 105 °C u FLRY důvod koeficientů 1,0 a 0,7, ale karta píše, že „kalkulačka hodnoty nezvyšuje“. Rešeršér ji přepíše na v1.1.
- **0035 přidána:** `overeno` (kolo 3) a znění odpovídá textu v1.1 pod volbami („V motorovém prostoru použijte kabel pro vyšší teplotu (třída C nebo D) …“).
- **Druhá dávka přijde později:** 0003, 0004, 0005, 0009, 0036 a 0039 (třída A, potřebné pro v1.1) se přepisují na základ v1.1, ověřovatel zkontroluje jen výpočet a třídu 105 °C u FLRY-B. Pak přibudou sem.
- Karty třídy A archivní verze 2 sem nepatří (žádná taková není `overeno` a potřebná).

## Jak schválit

1. U každé karty, se kterou souhlasíte, zaškrtněte políčko `- [x] Schvaluji`.
2. Pokud se kartou nesouhlasíte, políčko nechte prázdné a připište pod ni krátce důvod.
3. Dokument vraťte. Hlavní vlákno pak do každé schválené karty doplní `stav: schvaleno`, `schvalil: Radek` a datum schválení. Neschválené karty se vrátí rešeršérovi.

Plné znění karet je v `docs/karty/K-VODIC-<číslo>.md`, nálezy v `docs/karty/nalezy/`. U karty 0013 dalo první kolo NESEDÍ; platí kolo 2 (SEDÍ).

## Souhrn

| ID | Téma | Verdikt (poslední kolo) |
|---|---|---|
| K-VODIC-0007 | CCA do vozu nepoužívat | spor rozhodl Radek |
| K-VODIC-0012 | Pojistka chrání kabel | spor rozhodl Radek |
| K-VODIC-0013 | Pojistka u baterie, nejvýš 17,5 cm | SEDÍ (kolo 2) |
| K-VODIC-0014 | Tenčí odbočka potřebuje vlastní menší pojistku | SEDÍ |
| K-VODIC-0015 | Pomalá pojistka při rozběhovém proudu, kabel na pojistku | SEDÍ |
| K-VODIC-0021 | Krimpování koncovek, žádné kroucené spoje | SEDÍ |
| K-VODIC-0022 | Automobilové lanko místo plného drátu | SEDÍ |
| K-VODIC-0024 | Vedení kabelu, průchodka v plechu | SEDÍ |
| K-VODIC-0035 | Motorový prostor: kabel pro vyšší teplotu (třída C nebo D) | SEDÍ (kolo 3) |

---

## K-VODIC-0013

- [ ] Schvaluji

**Třída:** A
**Tvrzení:** Pojistka patří na plusový vodič co nejblíž k baterii, nejvýš 17,5 cm od ní (měřeno po vodiči); kdyby byla u spotřebiče, zkrat mezi baterií a pojistkou nic nezastaví.
**Hlavní zdroj:** ABYC E-11 AC and DC Electrical Systems on Boats (vydání 7/2003), čl. 11.12.1.2 Overcurrent Protection Device Location, s. 25, https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf
**Verdikt ověřovatele:** SEDÍ (kolo 2). Hodnota 17,5 cm pochází z americké normy pro lodě, ne z normy pro obytná vozidla (EN 1648-2 se doložit nepodařilo); text webu má uvádět „podle americké normy pro lodě ABYC E-11“, ne „předpis“. Nález: `docs/karty/nalezy/K-VODIC-0013-2026-11-16-kolo2.md`
**Kdyby karta byla špatně:** Úsek kabelu mezi baterií a pojistkou by nebyl jištěný; kdyby se v něm prodřela izolace a vodič se dotkl kostry, protékal by zkratový proud z baterie bez omezení a kabel by mohl začít hořet.

---

## K-VODIC-0014

- [ ] Schvaluji

**Třída:** A
**Tvrzení:** Pokud se kabel větví na tenčí, každá tenčí odbočka potřebuje vlastní, menší pojistku.
**Hlavní zdroj:** Victron Energy: Wiring Unlimited, kap. 4 DC wiring, odd. 4.6 „Location of the DC fuses“ a „Current rating“, https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html; dále ABYC E-11 (7/2003), čl. 11.12.1.5.1.
**Verdikt ověřovatele:** SEDÍ. Tvrzení je přísnější než ABYC, které připouští odbočku bez vlastní pojistky, pokud ji chrání už dost malá hlavní pojistka; je tedy na bezpečné straně. Nález: `docs/karty/nalezy/K-VODIC-0014-2026-11-16.md`
**Kdyby karta byla špatně:** Tenká odbočka by byla chráněná jen velkou hlavní pojistkou; při přetížení nebo zkratu na odbočce by pojistka nepřepálila a tenký kabel by se přehřál až k roztavení izolace a požáru.

---

## K-VODIC-0015

- [ ] Schvaluji

**Třída:** A
**Tvrzení:** Spotřebiče s velkým rozběhovým proudem (kompresor, motor, měnič) mohou potřebovat pomalou pojistku; kabel se pak dimenzuje na tuto pojistku.
**Hlavní zdroj:** Victron Energy: Wiring Unlimited, kap. 4 DC wiring, odd. 4.6, odstavec „Speed“ (a pro druhou část odstavec „Current rating“), https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html; dále Littelfuse MEGA Fuse 32 V, s. 1 (MEGA SLO-BLO).
**Verdikt ověřovatele:** SEDÍ. Druhá část tvrzení plyne z Victron „Current rating“ (pojistka nesmí přesáhnout zatížitelnost kabelu), který v kartě zatím není uveden v poli `misto`; ABYC 11.12.1.3 se týká ochrany motoru, ne rozběhu, tvrzení to neoslabuje. Nález: `docs/karty/nalezy/K-VODIC-0015-2026-11-16.md`
**Kdyby karta byla špatně:** S rychlou pojistkou by spotřebič (např. kompresorová chladnička nebo měnič) při rozběhu vypaloval pojistky a nefungoval; kdyby uživatel dal větší pomalou pojistku a kabel nezvětšil, kabel by nebyl chráněný a při přetížení by se přehříval.

---

## K-VODIC-0021

- [ ] Schvaluji

**Třída:** A
**Tvrzení:** Koncovky se krimpují správnými kleštěmi a přetahují smršťovací bužírkou; zkroucené dráty s izolepou mají velký přechodový odpor, hřejí se a časem odhoří.
**Hlavní zdroj:** ABYC E-11 (7/2003), čl. 11.16.3.8 (lisovat kleštěmi určenými pro konektor), 11.16.3.6 (zákaz kroucených spojek), 11.16.3.9 (izolace dříku), https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf; mechanismus ohřevu: Victron Wiring Unlimited, kap. 2, odd. 2.5 Connection resistance.
**Verdikt ověřovatele:** SEDÍ. Žádný zdroj výslovně nepíše „zkroucené dráty s izolepou“; závěr je odvozený ze zákazu kroucených spojů (ABYC) a z ohřevu spojů s velkým odporem (Victron), smršťovací bužírka je jeden z přípustných způsobů izolace. Nález: `docs/karty/nalezy/K-VODIC-0021-2026-11-16.md`
**Kdyby karta byla špatně:** Špatný spoj se zahřívá v jednom bodě (např. 4 W při 20 A a 10 mΩ), může roztavit izolaci okolních vodičů a způsobit požár; mírnější následek je úbytek napětí, kvůli kterému spotřebič nefunguje nebo vypadává.

---

## K-VODIC-0022

- [ ] Schvaluji

**Třída:** A
**Tvrzení:** Do auta se používá automobilový kabel – ohebné lanko z mnoha tenkých drátků (v obchodech často značené FLRY); tvrdý drát z domovní instalace od vibrací praská.
**Hlavní zdroj:** ABYC E-11 (7/2003), čl. 11.16.1.2.5 (vodiče jako měděné lanko) a poznámka u 11.16.3.7 (zlomení plného úseku při ohybu), https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf; Victron Wiring Unlimited, kap. 4, odd. 4.1 Cable selection.
**Verdikt ověřovatele:** SEDÍ. Praskání plného drátu od vibrací zdroje dokládají jen nepřímo (ABYC u zapájeného úseku, Victron obecně); „často značené FLRY“ je formulační doplněk, ne bezpečnostní údaj. Nález: `docs/karty/nalezy/K-VODIC-0022-2026-11-16.md`
**Kdyby karta byla špatně:** Plný drát by se vibracemi za jízdy mohl nalomit, zejména u svorek; spotřebič by přestal fungovat nebo by vypadával a v místě zlomu by mohlo jiskřit a hřát se.

---

## K-VODIC-0024

- [ ] Schvaluji

**Třída:** A
**Tvrzení:** Kabel se vede chráněný, mimo ostré hrany a pohyblivé díly, a průchodky plechem vždy přes gumovou průchodku.
**Hlavní zdroj:** ABYC E-11 (7/2003), čl. 11.16.4.1.8 (ochrana proti odírání a otlačení, vedení mimo pohyblivé části), https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf; pro průchodku nezávislý zdroj dohledaný ověřovatelem: Zebra, ET6x Vehicle Installation – Wiring Guidelines (není v kartě).
**Verdikt ověřovatele:** SEDÍ. Žádný zdroj výslovně nepíše „gumová“ průchodka (ABYC mluví o ochraně proti odírání, Zebra o „grommet“ bez materiálu); slovo „gumovou“ je třeba chápat jako příklad. Ověřovatel doporučuje doplnit zdroj pro průchodku do karty. Nález: `docs/karty/nalezy/K-VODIC-0024-2026-11-16.md`
**Kdyby karta byla špatně:** Hrana plechu nebo pohyblivý díl by časem prodřel izolaci a vodič by se zkratoval na kostru; v lepším případě přepálí pojistku a spotřebič nefunguje, v horším (nejištěný úsek nebo příliš velká pojistka) kabel začne hořet.

---

## K-VODIC-0007

- [ ] Schvaluji

**Třída:** A
**Tvrzení:** Kalkulačka počítá jen s čistou mědí a kabel CCA nedoporučuje: pro stejný úbytek by CCA potřeboval asi 1,6× větší průřez, o jeden stupeň větší kabel to často nevyrovná. Pro automobilová lanka CCA jsme zatížitelnost nedohledali; NEC dává CCA hodnoty hliníku.
**Hlavní zdroj:** MWS Wire, „Copper Clad Aluminum and Other Clad Metals“, tabulka Clad Metals (CCA 62,9–64,4 % IACS), https://mwswire.com/wp-content/uploads/2024/03/MWS-copper-clad-aluminum-other-clad-metals.pdf; Ulbrich, Lite Weight CCA Capability Sheet; NEC Table 310.16 (TIA 1691) pro zatížitelnost; Vaše rozhodnutí z 16. 11. 2026.
**Verdikt ověřovatele:** kolo 2 NESEDÍ jen kvůli větě „zatížitelnost CCA není v otevřených zdrojích doložena“ (NEC má sloupec pro hliník a CCA); čísla 1,590 / 1,552 sedí. Spor po druhém vrácení jste rozhodl převzetím znění ověřovatele, které karta teď nese. Nález: `docs/karty/nalezy/K-VODIC-0007-2026-11-16-kolo2.md`
**Kdyby karta byla špatně:** Kdyby CCA byl ve skutečnosti použitelný, web by jen zbytečně odrazoval od levnějšího kabelu. Opačná chyba (CCA doporučit) by vedla k většímu úbytku napětí a přehřívání kabelu při stejné pojistce.

---

## K-VODIC-0012

- [ ] Schvaluji

**Třída:** A
**Tvrzení:** Pojistka chrání kabel: nesmí být vyšší než max. pojistka kabelu. U jednoho spotřebiče se volí podle jeho proudu a návodu výrobce.
**Hlavní zdroj:** Victron Energy, Wiring Unlimited, kap. 4.6 „DC Fuses and circuit breakers“, odstavec Current rating, https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html; Philippi, katalog Absicherung, PDF s. 3; ABYC E-11 (2003) 11.12.1.4 a 11.12.1.5.2.
**Verdikt ověřovatele:** kolo 2 NESEDÍ kvůli dřívější větě „velikost se řídí kabelem, ne spotřebičem“, která odporovala kalkulačce. Spor po druhém vrácení jste rozhodl převzetím znění ověřovatele, které karta teď nese. Nález: `docs/karty/nalezy/K-VODIC-0012-2026-11-16-kolo2.md`
**Kdyby karta byla špatně:** Pojistka větší, než kabel snese, nechá kabel při přetížení přehřát dřív, než přepálí, s rizikem roztavení izolace a požáru. Pojistka zbytečně velká vůči spotřebiči nechrání spotřebič podle návodu výrobce.

---

## K-VODIC-0035

- [ ] Schvaluji

**Třída:** A
**Tvrzení:** V motorovém prostoru použijte kabel pro vyšší teplotu (třída C 125 °C nebo D 150 °C) a dimenzujte podle tabulky jeho výrobce.
**Hlavní zdroj:** Prysmian: Automotive – Single-core Cables (třídy A 85 °C, B 105 °C, C 125 °C pro motorový prostor, D 150 °C pro motorové prostory), https://australia.prysmian.com/products-and-solutions/transportation-and-mobility/automotive/single-core-cables; Caledonian FLR2X-A a FLR2X11Y (ISO 6722 Class C, motorový prostor); Lapp T12 (Table 12-2 a 12-4).
**Verdikt ověřovatele:** SEDÍ (kolo 3). Tabulky zatížitelnosti automobilových kabelů třídy C a D se dohledat nepodařilo, rada „podle tabulky jeho výrobce“ je Vaše rozhodnutí. Ve v1.1 je věta textem pod volbami uložení (režim „Ve svazku“), ne samostatnou hláškou; tvrzení to nemění. Nález: `docs/karty/nalezy/K-VODIC-0035-2026-11-16-kolo3.md`
**Kdyby karta byla špatně:** Běžný kabel 105 °C v motorovém prostoru by v horku ztrácel zatížitelnost a izolace by rychleji stárla a praskala; hrozí zkrat na kostru a požár.
