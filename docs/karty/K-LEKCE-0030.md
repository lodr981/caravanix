---
id: K-LEKCE-0030
trida: A
stav: schvaleno
plati-pro-zeme: [vse]
tvrzeni: "BMS lithiové baterie přeruší nabíjení, vybíjení, nebo obojí při podpětí, přepětí, nadproudu nebo zkratu a při vysoké či nízké teplotě; po zkratu a teplotní ochraně se podle výrobce obnoví samo (po vychladnutí nebo ohřátí), po podpětí až nabitím. Když na pólech baterie chybí napětí, výrobce radí nechat baterii vychladnout a pak ji probudit připojenou nabíječkou; nabíječka, která ke spuštění potřebuje napětí na svorkách, ji probudit nemusí. Po dlouhodobém hlubokém vybití (podpětí při dlouhém skladování) se baterie obnovovat nesmí."
hodnota: null
jednotka: null
rozsah: null
podminky: "Lithiová baterie LiFePO4 s vestavěným BMS. Meze a způsob obnovení se u výrobců liší, platí návod konkrétní baterie; Rolls slouží jako příklad úplné tabulky ochran. Lekce z karty bere jen postup (vychladnout, nabíječka, při dlouhém vybití výrobce), ne čísla."
zdroje:
  - typ: navod
    nazev: "Rolls: 12V & 24V LFP Lithium-Ion Battery Operating Manual"
    url: "https://cdn.shopify.com/s/files/1/0782/2077/files/ROLLS-12V-24V-LFP-OPERATING-MANUAL.pdf"
    misto: "s. 9 Battery Management System (BMS) Protection Summary (tabulka ochran a obnovení; u „Extended Cell/Pack Undervoltage“: non-resettable, do NOT attempt to recover battery); s. 10 poznámka o nabíječce, která baterii z podpěťové ochrany neprobudí; s. 18–19 Terminal voltage is absent or low (vychladnout, připojit nabíječku)"
    datum-overeni: 2026-11-18
vypocet: ""
pouzito-v: [lekce-18-hledani-zavady, faq]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0030-2026-11-18.md
schvalil: "Radek, 2026-11-18 (PRO_RADKA, dle doporučení)"
---

Poznámky rešeršéra:

Text manuálu vytažen z PDF (pdftotext), strany podle číslování v dokumentu. U baterií s externím BMS (např. Victron) odpojuje BMS spotřebiče a nabíječe, ne baterie sama; lekce proto obecně odkazuje na návod baterie. Třída A: rada „obnovit baterii po dlouhém hlubokém vybití“ by mohla vést k nabíjení poškozených článků.
