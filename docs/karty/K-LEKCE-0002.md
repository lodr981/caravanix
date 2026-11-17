---
id: K-LEKCE-0002
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "LiFePO4 baterie se pod 0 °C nenabíjí; když datasheet baterie uvádí vyšší dolní mez (např. Victron +5 °C), platí ta. Vybíjet v mrazu lze (běžně do −20 °C)."
hodnota: 0
jednotka: "°C (dolní mez teploty článků pro nabíjení)"
rozsah: [0, 5]
podminky: "Teplota článků baterie, ne vzduchu ve voze. 0 °C: Rolls LFP 12/24 V; +5 °C: Victron Lithium Smart. Vybíjení: Rolls i Victron do −20 °C. V mrazu klesá i dostupná kapacita (Victron Smart 12,8/100: 80 Ah při 0 °C, 50 Ah při −20 °C)."
zdroje:
  - typ: navod
    nazev: "Rolls: 12V & 24V LFP Lithium-Ion Battery Operating Manual"
    url: "https://cdn.shopify.com/s/files/1/0782/2077/files/ROLLS-12V-24V-LFP-OPERATING-MANUAL.pdf"
    misto: "s. 4 WARNING: „Never charge a battery below 0°C.“, „Never discharge a battery below -20°C.“; s. 5 Installation: nabíjení pod 0 °C a vybíjení pod −20 °C vážně poškodí články"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Victron Energy: Lithium Battery 12,8 V & 25,6 V Smart, datasheet"
    url: "https://www.victronenergy.de/upload/documents/Datasheet-12,8-Volt-lithium-iron-phosphate-batteries-Smart-EN.pdf"
    misto: "s. 2 Operating conditions: Discharge −20 °C to +50 °C, Charge +5 °C to +50 °C; Nominal capacity @ 0 °C a @ −20 °C. Manuál Lithium Battery Smart 1.2 a 4.7.3: pod 5 °C trvalé poškození článku, nastavení pod 5 °C ruší záruku"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [lekce-5-nabijeni-v-zime, k2]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0002-2026-11-16.md
schvalil: "Radek, 2026-11-17 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra:

Dva výrobci, dvě meze: 0 °C (Rolls, většina datasheetů levnějších baterií) a +5 °C (Victron). Proto tvrzení „pod 0 °C nikdy, a když datasheet říká víc, platí datasheet“.

**Test podstatnosti:** zásada v zadání říká jen „pod 0 °C se nenabíjí“. U baterie Victron by nabíjení mezi 0 a 5 °C podle výrobce článek poškodilo a zrušilo záruku (uživatel by nastavil BMS špatně, bod 2 testu). Navrhuji v lekci a v K2 doplnit „nebo pod mezí z datasheetu“. Zadání neměním; rozhodne mistr nebo hlavní vlákno.

Důvod (lithium plating) uvádí výrobce BMS Daly (viz K-LEKCE-0003); pro kartu není potřeba.
