---
id: K-LEKCE-0020
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Booster (nabíječ DC-DC) a oddělovací relé smí brát proud ze startovací baterie jen při běžícím motoru. Booster to zajišťuje detekcí běhu motoru (podle napětí alternátoru nebo vnějšího signálu běhu motoru); když je detekce vypnutá (nucené nabíjení) nebo je booster zapnutý trvalým signálem, odebírá ze startovací baterie proud i při stojícím motoru."
hodnota: null
jednotka: null
rozsah: null
podminky: "Obytné vozidlo se startovací a obytnou baterií nabíjenou z alternátoru. Prahová napětí detekce jsou specifická pro konkrétní booster (Orion XS výchozí: start 14 V, vypnutí 13,1 V u chytrého alternátoru) a lekce je neuvádí. Pro relé spínané signálem D+ zdroj v kartě není; lekce uvádí D+ jen jako příklad signálu běhu motoru a odkazuje na návod výrobce relé."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Orion XS 12/12-50A DC-DC battery charger manual, kap. 4 Operation, configuration and monitoring"
    url: "https://www.victronenergy.com/media/pg/Orion_XS_12-12-50A_DC-DC_battery_charger/en/operation,-configuration-and-monitoring.html"
    misto: "4.1: automatická detekce vypnutí motoru zjišťuje, zda motor běží; 4.1.1: když vstupní napětí zůstane déle než 1 minutu pod Vshutdown, nabíjení se vypne; 4.1.3: při vypnuté detekci (nucené nabíjení) se odebírá proud ze startovací baterie, i když motor neběží; 4.4.6: Vshutdown udržuje startovací baterii nabitou"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Victron Energy: Orion XS 12/12-50A manual, kap. 3 Installation"
    url: "https://www.victronenergy.com/media/pg/Orion_XS_12-12-50A_DC-DC_battery_charger/en/installation.html"
    misto: "3.9: dálkové zapnutí, se smyčkou drátu je jednotka trvale zapnutá; 3.11: vnější signál běhu motoru, >8 V na L-pinu přebije detekci vypnutí motoru a zapne nabíjení"
    datum-overeni: 2026-11-17
vypocet: ""
pouzito-v: [lekce-12-startovaci-baterie]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0020-2026-11-17.md
schvalil: null
---

Poznámky rešeršéra:

Zdroj je návod jednoho výrobce boosteru; pravidlo (ze startovací baterie brát jen při běžícím motoru) z něj pro booster plyne přímo. Pro oddělovací relé jsem v rozpočtu hledání datasheet nedohledal; pravidlo pro relé je odvozené z téhož principu: relé, které spojí baterie ve stojícím voze, nechá obytné spotřebiče vybíjet startovací baterii. Ověřovatel může doplnit datasheet relé (napěťově řízené relé s prahy spojení a rozpojení, nebo relé spínané D+).
