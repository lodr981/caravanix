---
id: K-LEKCE-0019
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "Každý nabíječ, který nabíjí obytnou baterii LiFePO4 (nabíječka 230 V v elektrobloku, solární regulátor, booster, měnič s nabíječkou), musí mít lithiový profil nebo nastavené nabíjecí napětí podle návodu výrobce baterie (příklad Victron 12,8 V: absorpce 14,2 V, udržovací 13,5 V) a vypnutou teplotní kompenzaci; nabíječ, který to neumí, se k lithiové baterii nehodí."
hodnota: null
jednotka: null
rozsah: null
podminky: "Výměna olověné obytné baterie za LiFePO4 v hotovém voze. Napětí 14,2 / 13,5 V jsou příklad jednoho výrobce pro baterii 12,8 V (u 25,6 V: 28,4 / 27,0 V); platí vždy návod konkrétní baterie. Lekce je uvádí jen jako příklad, do výpočtu nevstupují."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Lithium Battery Smart manual, kap. 5 Operation"
    url: "https://www.victronenergy.com/media/pg/Lithium_Battery_Smart/en/operation.html"
    misto: "5.2: důležité parametry nabíjení jsou absorpční napětí, doba absorpce a udržovací napětí; 14,2 V absorpce a 13,5 V float pro baterii 12,8 V; teplotní kompenzace u lithia není potřeba, v nabíječích ji vypnout nebo nastavit 0 mV/°C; nabíječ musí dodávat správný proud a napětí. 5.3: lithiové baterie lze poškodit přebitím nebo podvybitím"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Victron Energy: Lithium Battery Smart manual, kap. 4.8 Charger settings"
    url: "https://www.victronenergy.com/media/pg/Lithium_Battery_Smart/en/installation.html"
    misto: "4.8: pro modely 12,8 V 14,20 V absorpce, 2 h, 13,50 V float; nastavení jednotlivých nabíječů podle jejich vlastních návodů"
    datum-overeni: 2026-11-17
vypocet: ""
pouzito-v: [lekce-11-z-olova-na-lithium]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0019-2026-11-17.md
schvalil: "Radek, 2026-11-18 (PRO_RADKA, vše dle doporučení)"
---

Poznámky rešeršéra:

Jeden výrobce baterií (Victron) dokládá nastavení nabíječe i vypnutí teplotní kompenzace. Výslovný zákaz vyrovnávacího (equalizačního) nabíjení olověného profilu jsem v otevřeném návodu nenašel (Victron ho nezmiňuje), proto ho lekce ani karta netvrdí; vyplývá nepřímo z pravidla „napětí podle výrobce baterie“. Věta „nabíječ, který to neumí, se nehodí“ je odvozená z 5.2 (nabíječ musí dodávat správné napětí) a 5.3 (poškození přebitím).
