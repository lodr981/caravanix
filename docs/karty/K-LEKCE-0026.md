---
id: K-LEKCE-0026
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Napětí baterie LiFePO4 je po většinu vybíjení téměř stejné (např. 80 % a 30 % nabití mohou ukázat skoro stejné napětí) a mění se se zátěží a nabíjením, proto samotné napětí stav nabití neurčí. Monitor baterie s bočníkem měří proud do baterie a z ní a počítá ampérhodiny; musí se pravidelně synchronizovat na 100 % (nabitá baterie: napětí nad nastaveným „nabito“, proud pod nastaveným koncovým proudem po nastavenou dobu), jinak se údaj postupně odchyluje; po instalaci se synchronizuje ručně."
hodnota: null
jednotka: null
rozsah: null
podminky: "Baterie LiFePO4 12,8 V; monitor s bočníkem (např. Victron SmartShunt, BMV). Konkrétní hodnoty nastavení (napětí „nabito“, koncový proud) lekce neuvádí, berou se z návodu monitoru a výrobce baterie."
zdroje:
  - typ: navod
    nazev: "Battle Born Batteries: Understanding State of Charge (SOC) and Voltage in LiFePO4 Batteries (výrobce baterií, 7. 5. 2026)"
    url: "https://battlebornbatteries.com/blogs/academy/understanding-state-of-charge-soc-and-voltage-in-lifepo4-batteries"
    misto: "plochá napěťová křivka po většinu vybíjení; samotné napětí není spolehlivé; 80 % a 30 % může mít skoro stejné napětí; pod zátěží nižší, v klidu vyšší; doporučen monitor měřící proud"
    datum-overeni: 2026-11-18
  - typ: navod
    nazev: "Victron Energy: SmartShunt manual, kap. 5 Operation"
    url: "https://www.victronenergy.com/media/pg/SmartShunt/en/operation.html"
    misto: "5.1 monitor měří proud a integruje Ah; 5.7.1 automatická synchronizace (charged voltage, tail current, charged detection time), bez pravidelné synchronizace údaj ujíždí; 5.7.2 ruční synchronizace po instalaci"
    datum-overeni: 2026-11-18
vypocet: ""
pouzito-v: [lekce-15-monitor-baterie-bocnik]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0026-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra:

Plochou křivku LiFePO4 manuál SmartShuntu výslovně nepíše; doloženo výrobcem baterií (Battle Born). Kam patří bočník, kryje schválená karta K-LEKCE-0023. Třída B: nejde o bezpečnostní pravidlo.
