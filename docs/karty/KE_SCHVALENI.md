# Karty třídy A ke schválení (16. 11. 2026)

**Pro:** Radek (schvalování bezpečnostních karet třídy A)
**Počet karet:** 9 (K-VODIC-0005, 0007, 0012, 0013, 0014, 0015, 0021, 0022, 0024)

**Všech 9 karet má stav `overeno`.** U 0007 a 0012 rozhodl spor po druhém vrácení Radek (16. 11. 2026) a karty nesou jeho znění; u ostatních je poslední nález ověřovatele SEDÍ.

**Změna 16. 11. 2026 (hlavní vlákno):** karty **0009 a 0035 jsou z přehledu staženy**. Po druhém kole Radkových rozhodnutí se změnilo jejich znění (CAPH jako pojistka pro budoucí změny; motorový prostor se nepočítá) a jdou znovu k ověřovateli. Místo nich přibyly 0007 a 0012.

## Jak schválit

1. U každé karty, se kterou souhlasíte, zaškrtněte políčko `- [x] Schvaluji`.
2. Pokud se kartou nesouhlasíte, políčko nechte prázdné a připište pod ni krátce důvod.
3. Dokument vraťte. Hlavní vlákno pak do každé schválené karty doplní `stav: schvaleno`, `schvalil: Radek` a datum schválení. Neschválené karty se vrátí rešeršérovi.

Plné znění karet je v `docs/karty/K-VODIC-<číslo>.md`, nálezy v `docs/karty/nalezy/`. U karet 0005, 0009 a 0013 dostaly první kolo NESEDÍ; platí kolo 2 (SEDÍ).

## Souhrn

| ID | Téma | Verdikt (poslední kolo) |
|---|---|---|
| K-VODIC-0005 | Teplotní třída kabelů FLRY (105 °C, některé jen 85 °C) | SEDÍ (kolo 2) |
| K-VODIC-0007 | CCA do vozu nepoužívat | spor rozhodl Radek |
| K-VODIC-0012 | Pojistka chrání kabel | spor rozhodl Radek |
| K-VODIC-0013 | Pojistka u baterie, nejvýš 17,5 cm | SEDÍ (kolo 2) |
| K-VODIC-0014 | Tenčí odbočka potřebuje vlastní menší pojistku | SEDÍ |
| K-VODIC-0015 | Pomalá pojistka při rozběhovém proudu, kabel na pojistku | SEDÍ |
| K-VODIC-0021 | Krimpování koncovek, žádné kroucené spoje | SEDÍ |
| K-VODIC-0022 | Automobilové lanko místo plného drátu | SEDÍ |
| K-VODIC-0024 | Vedení kabelu, průchodka v plechu | SEDÍ |

---

## K-VODIC-0005

- [ ] Schvaluji

**Třída:** A
**Tvrzení:** Automobilové kabely FLRY v PVC izolaci výrobci obvykle deklarují do 105 °C (existují i automobilové kabely jen do 85 °C); kabel s vyšší dovolenou teplotou ztrácí v teplém okolí méně zatížitelnosti než kabel 70 °C, hodnoty zatížitelnosti při 30 °C tím ale kalkulačka nezvyšuje.
**Hlavní zdroj:** Data sheet FLRY-A / FLRY-B (Manex), Technical data: „Temperature range −40 °C ÷ +105 °C“, https://static.chipdip.ru/lib/604/DOC035604408.pdf; pro část o zatížitelnosti Lapp T12 (výtah z DIN VDE 0298-4:2013-06), s. 2, Table 12-2 a 12-4, https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf
**Verdikt ověřovatele:** SEDÍ (kolo 2). Hodnota 105 °C je údaj výrobců, ne normy; podle ověřovatele ISO 6722-1 definuje třídu B do 100 °C, proto se na webu nesmí psát „ISO 6722 třída B = 105 °C“. Nález: `docs/karty/nalezy/K-VODIC-0005-2026-11-16-kolo2.md`
**Kdyby karta byla špatně:** Uživatel by mohl do teplého místa (u topení, pod podlahou u výfuku) dát kabel s nižší teplotní odolností, než předpokládá; izolace by rychleji stárla, praskala a mohla by vzniknout zkrat a požár. Samotné výpočty kalkulačky se nemění, protože vyšší třídu kabelu nezohledňuje.

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
