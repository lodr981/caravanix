---
id: K-LEKCE-0003
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Nabíjení v mrazu musí zablokovat BMS (nebo systém, který BMS řídí) podle teploty měřené čidlem přímo na článcích; spoléhat na to, že nabíječ nebo uživatel v mrazu nenabíjí, nestačí."
hodnota: null
jednotka: null
rozsah: null
podminky: "Baterie LiFePO4 s vestavěným BMS: ověřit v datasheetu, že má ochranu nabíjení při nízké teplotě (low-temp charge cutoff). Baterie s externím BMS nebo vlastní stavba: teplotní čidlo (NTC) přilepené na článcích, mez podle K-LEKCE-0002. Vybíjení může BMS v mrazu dál povolit."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Lithium Battery Smart manual, kap. 3.2, 3.3.1 a 4.7.3"
    url: "https://www.victronenergy.com/media/pg/Lithium_Battery_Smart/en/system-design-and-bms-selection-guide.html"
    misto: "3.2: napětí článků a teplotu sleduje baterie sama, při nízké teplotě pošle alarm a BMS vypne nabíječe; 3.3.1: smallBMS při nízké teplotě baterie pošle signál „charge disconnect“; 4.7.3 (installation.html): Allowed-To-Charge minimum temperature, výchozí 5 °C"
    datum-overeni: 2026-11-16
  - typ: clanek
    nazev: "Daly BMS (výrobce BMS): Surviving the Freeze: How a Smart BMS Protects Lithium Batteries in Cold Weather, 14. 3. 2026"
    url: "https://www.dalybms.com/news/surviving-the-freeze-how-a-smart-bms-protects-lithium-batteries-in-cold-weather"
    misto: "BMS používá teplotní čidla NTC připevněná přímo na články; pod prahem odpojí nabíjení, vybíjení zůstává povolené; nabíjení pod 0 °C způsobí nevratné pokovení lithiem (lithium plating)"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [lekce-5-nabijeni-v-zime, k2]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0003-2026-11-16.md
schvalil: "Radek, 2026-11-17 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra:

Victron dokládá, že blokaci dělá BMS podle teploty měřené v baterii; že čidlo má být **přímo na článcích**, říká výslovně jen výrobce BMS Daly (článek na webu výrobce, ne návod). Datasheet, který by umístění čidla předepisoval, jsem v 30 minutách nenašel; datasheety baterií s vestavěným BMS umístění neuvádějí (čidlo je uvnitř). Pro lekci je to dost: rozhodující je, že ochrana je v BMS a měří teplotu článků.

Na co si dát pozor: uživatel na fóru Victron popisuje případ, kdy BMS bralo i teplotu okolí; to je anekdota, ne zdroj, nepoužívám.
