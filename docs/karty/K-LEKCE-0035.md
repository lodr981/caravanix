---
id: K-LEKCE-0035
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Lithiové baterie se paralelně spojují, až když mají skoro stejné napětí (Rolls: rozdíl menší než 15 mV), proto se před spojením každá nabije do plna; nespojují se různé série výroby, typy ani stará s novou. Paralelní zapojení zvětší kapacitu; nabíjecí proud se podle tohoto výrobce dál řídí limitem jednotlivé baterie."
hodnota: 15
jednotka: mV
rozsah: null
podminky: "Lithiové baterie LiFePO4 12/24 V stejného modelu. Mez 15 mV je údaj jednoho výrobce, jiné návody mohou mít jinou; platí návod konkrétní baterie. Victron u paralelní banky Lithium Smart nabíjení předem nepožaduje (nabíjí se jako celek), u sériového zapojení ano, a v paralelu dovoluje různé kapacity i stáří (4.5.6); zásada drží přísnější variantu."
zdroje:
  - typ: navod
    nazev: "Rolls: 12V & 24V LFP Lithium-Ion Battery Operating Manual"
    url: "https://cdn.shopify.com/s/files/1/0782/2077/files/ROLLS-12V-24V-LFP-OPERATING-MANUAL.pdf"
    misto: "s. 7–8 Connecting in parallel a Caution (rozdíl napětí před spojením menší než 15 mV; nespojovat různé série, typy, staré a nové); s. 10 poznámka o nabíjecím proudu paralelní banky"
    datum-overeni: 2026-11-18
  - typ: navod
    nazev: "Victron Energy: Lithium Battery Smart manual, kap. 4.3.2 a 4.5.3–4.5.6"
    url: "https://www.victronenergy.com/media/pg/Lithium_Battery_Smart/en/installation.html"
    misto: "4.5.3 a 4.5.5: před sériovým zapojením každou baterii plně nabít; 4.3.2: paralelní banku lze nabíjet jako jednu; 4.5.6 tabulka Battery banks consisting of different batteries: ideálně stejná kapacita, stáří a model, v paralelu jsou ale různé kapacity i stáří povoleny (v sérii ne)"
    datum-overeni: 2026-11-18
vypocet: ""
pouzito-v: [lekce-20-dve-baterie-paralelne, faq]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0035-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra:

Navazuje na K-LEKCE-0010 (jen stejné baterie). Plné nabití před spojením do paralely přímo nepožaduje žádný z obou zdrojů; Rolls dává mez rozdílu napětí, Victron plné nabití u série. Lekce proto píše „nabijte každou zvlášť do plna, aby měly stejné napětí“ jako cestu, jak mez splnit.
