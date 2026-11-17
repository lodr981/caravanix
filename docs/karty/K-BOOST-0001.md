---
id: K-BOOST-0001
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Booster (nabíječ DC-DC) za jízdu nedává trvale svůj jmenovitý proud; pro výpočet dobití baterie LiFePO4 pod asi 90 % nabití počítáme průměrný proud = jmenovitý proud boosteru × 0,7."
hodnota: 0.7
jednotka: "bez jednotky (podíl jmenovitého proudu)"
rozsah: [0.5, 0.9]
podminky: "Obytná baterie LiFePO4 nabitá pod asi 90 % (fáze plného proudu, bulk). Smíšená jízda (dálnice, okreska, město), booster v obytné části nebo jinde mimo horký motorový prostor, kabely podle návodu výrobce. Dolní mez 0,5: hodně města, kolon a volnoběhu, chytrý alternátor (Euro 5/6) s častým vypínáním, booster v horku (nad 40–50 °C). Horní mez 0,9: dlouhá dálnice, chladné místo, klasický alternátor (změřeno asi 0,86–0,88). Jmenovitý proud = proud nastavený na boosteru (výstupní proud do baterie). Nad 90 % nabití platí K-BOOST-0002."
zdroje:
  - typ: test
    nazev: "promobil: Praxis-Test Ladebooster im Wohnmobil (Köbler-Linsner, Köcher, Bartosch), 11. 6. 2024"
    url: "https://www.promobil.de/werkstatt/praxis-booster-fuer-schnellere-ladung-der-bordbatterie/"
    misto: "Měření: Etrusco na podvozku Ducato, LiFePO4 Liontron 200 Ah (aplikace ukazuje 226 Ah), vybito na 50 %, asi 300 km dálnice za 3 h. Jeden Victron Orion-Tr Smart 12/12-30: proud začíná na 30 A a klesá, po 3 h baterie na 85 %. Dva boostery (60 A): proud klesne během prvních 50 min na 48 A, 113 Ah za asi 2 h 12 min (baterie plná)."
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Victron Energy: Orion XS 12/12-50A DC-DC battery charger manual"
    url: "https://www.victronenergy.com/media/pg/Orion_XS_12-12-50A_DC-DC_battery_charger/en/troubleshooting---support.html"
    misto: "5.2.3: při téměř plné baterii snižuje nabíjecí proud; 5.2.4: úbytek na kabelu k baterii prodlužuje nabíjení; 5.2.6: výkon alternátoru může na volnoběh klesnout asi na 50 %; 5.4: nedá víc, než dodá alternátor, a při zahřátí snižuje proud. Kap. 6.1 (technical-data.html): plný výkon do 40 °C okolí, nad 40 °C snížení o 1,5 % na °C, provoz do 60 °C. Kap. 4.1.1 a 4.4.6 (operation,-configuration-and-monitoring.html): nabíjení se zastaví, když vstupní napětí klesne pod práh vypnutí na déle než 1 min; výchozí pro chytrý alternátor start 14 V, zpožděný start 13,3 V po 120 s, vypnutí pod 13,1 V; u Euro 6 napětí startovací baterie klesá na klidových asi 12,6 V."
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "CTEK: D250SE / SMARTPASS 120S user manual (EN)"
    url: "https://www.mygenerator.com.au/assets/images/resource/pdf/D250SE-manual-low-UK-EN.pdf"
    misto: "Technical specification (s. 14 tištěná): Power reduction 30 °C 16 A, 50 °C 13 A (jmenovitě 20 A); conventional alternator cut-in > 13,1 V na 5 s, cut-out < 12,8 V na 10 s; smart alternator cut-in > 11,8 V na 5 s, cut-out < 11,4 V na 10 s."
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Renogy: RBC40D1U-G2 12V 40A DC-DC battery charger user manual, verze A2, 13. 12. 2024"
    url: "https://au.renogy.com/cdn/shop/files/UM_RBC40D1U-G2.pdf"
    misto: "Kap. 4.3 (s. 10 tištěná): klasický alternátor – nabíjí od 13,2 V po 15 s, přestane pod 12,7 V; chytrý alternátor (s IGN) od 12 V, přestane pod 11 V. Ochrany (s. 24 tištěná) a specifikace: do 45 °C plný proud, 45–60 °C každé 2 °C navíc −5 A, nad 60 °C vypne."
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Votronic: VCC 1212-30 charging converter, operating instructions (EN), kopie Skanbatt"
    url: "https://skanbatt.no/files/public/e9e31a20-b994-471b-b753-139848dccdb7/d008dd2698d5373ab0902e7203d93acc310a36ce/VCC1212%20manual.pdf"
    misto: "S. 8: režim napěťového řízení – plný výkon jen při velkých průřezech a stálém vysokém napětí alternátoru (aspoň 13,3 V na vstupu), nevhodné pro Euro 6; snížení výkonu pod 13,0 V, vypnutí pod 12,9 V po 30 s; režim D+: snížení pod 11,4 V, vypnutí pod 11,2 V po 30 s. S. 12: při zatížení startovacího okruhu nebo volnoběhu postupně snižuje nabíjecí proud; po startu motoru začíná s minimálním výkonem a zvyšuje ho postupně."
    datum-overeni: 2026-11-17
vypocet: "Kódem (Node, v pracovním adresáři rešeršéra): promobil, jeden booster 30 A: (85 % − 50 %) × 226 Ah = 79,1 Ah za 3 h → průměr 26,4 A → 26,4 / 30 = 0,88 (počítáno na jmenovitých 200 Ah: 70 Ah → 0,78). Dva boostery: 113 Ah / 2,2 h = 51,4 A → 51,4 / 60 = 0,86. Teplota 50 °C okolí: Victron Orion XS 1 − 0,015 × 10 = 0,85; CTEK D250SE 13 / 20 = 0,65; Renogy 40 A (40 − 5 × 5/2) / 40 = 0,69. Volnoběh: alternátor asi 50 % výkonu (Victron 5.2.6). Odhad: dálnice a chladno asi 0,85–0,9; přičteno město, volnoběh, kolony a vypínání u chytrého alternátoru (asi o 10–20 % méně) a letní horko v obytné části → zaokrouhleno dolů na 0,7."
pouzito-v: [kalkulacka-booster, kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-BOOST-0001-2026-11-17.md
schvalil: null
---

Poznámky rešeršéra:

**Proč tento postup.** Jediné nalezené měření celé jízdy s boosterem a LiFePO4 je test promobilu (dálnice, baterie z 50 %, Victron Orion-Tr 30 A). Dává průměr asi 0,86–0,88 jmenovitého proudu, a to v nejlepších podmínkách (dálnice, otáčky, baterie z poloviny). Návody výrobců vysvětlují, proč je to méně než 100 %: pomalý rozjezd po startu motoru, vypínání pod prahem napětí (chytrý alternátor, volnoběh, kolony), snížení proudu v teple a omezení výkonem alternátoru. Číselný podíl pro město a kolony jsem v našich zdrojích nenašel; 0,7 je proto úsudek zaokrouhlený dolů z měření, ne měřená hodnota. Pro soběstačnost je to bezpečná strana (dobití spíš podceníme).

**Test podstatnosti.** Nejde o bezpečnost; hodnota nemění kabel ani pojistku. Rozdíl mezi 0,7 a skutečnými 0,5–0,9 mění jen odhad dní bez připojky. Uživatel může koeficient přepsat.

**Na co si dát pozor.**
- Koeficient se násobí **výstupním** proudem boosteru (do obytné baterie). Účinnost boosteru (Victron uvádí max. 98,5 %) se týká odběru ze startovací strany, ne dobití.
- Za jízdy booster napájí i spotřebiče na obytné baterii (lednice), Votronic to výslovně uvádí. V soběstačnosti je spotřeba už ve `WhDenne`, takže se nic neodečítá dvakrát; v samostatné kalkulačce boosteru (oddíl E) je dobré to zmínit v textu.
- Booster v motorovém prostoru nebo v uzavřené skříni bez větrání může mít i méně než 0,5 (CTEK při 50 °C 65 %, Renogy 69 %, Orion XS při 60 °C 70 %, nad 60 °C vypínají).
- Redarc (BCDC Core) a Sterling: nápovědy výrobce jsem neotevřel (Redarc vrací 403). Podle výsledků vyhledávání Redarc dává plný proud do vnitřní teploty 55 °C a nad 80 °C přestane nabíjet; Sterling vypne při teplotě baterie nad 55 °C. Bráno jen jako signál, že teplotní snížení mají všichni výrobci; neuvádím jako zdroj.
- Schaudt WA 121525: dohledán jen popis (25 A, IUoU, vstup 12,0–14,7 V), čísla ke snížení proudu ne.
- Test promobilu: jeden booster dobil podle článku jen o 2 procentní body víc než samotný alternátor (83 % vs. 85 %); článek nevysvětluje proč. Výsledek s jedním boosterem proto beru jako horní odhad pro dálnici, ne jako typický stav.
