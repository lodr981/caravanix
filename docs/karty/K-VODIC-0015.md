---
id: K-VODIC-0015
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Spotřebiče s velkým rozběhovým proudem (kompresor, motor, měnič) mohou potřebovat pomalou pojistku; kabel se pak dimenzuje na tuto pojistku."
hodnota: null
jednotka: null
rozsah: null
podminky: "Stejnosměrné obvody se spotřebiči s motorem nebo vstupními kondenzátory."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.6, odstavec Speed: pomalé pojistky se používají v DC obvodech aut a lodí se spotřebiči s vysokým rozběhovým proudem (motory, měniče s kondenzátory)"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.12.1.3 Motors or motor operated Equipment: ochrana vhodná pro proud motoru; poznámka o nutnosti upravit průřez a zpoždění jistícího prvku"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Littelfuse: MEGA Fuse Rated 32V"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "s. 1: MEGA SLO-BLO pro obvody s velkými rozběhovými proudy"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [kalkulacka-prurez, lekce-pojistka]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0015-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Obě části tvrzení jsou podloženy: pomalá pojistka pro rozběhové proudy (Victron, Littelfuse) a jištění musí odpovídat vodiči (K-VODIC-0012). Formulace „kabel pak dimenzujte na tu pojistku“ je správný důsledek zásady „pojistka nesmí být větší, než kabel snese“.

Kalkulačka pomalé pojistky neřeší (je to ve skupině B nápadů v KALKULACKA_PRUREZU.md). Pozor na výrobce spotřebiče: např. Secop předepisuje pro BD35F konkrétní pojistku 15 A / 7,5 A – návod výrobce má přednost.
