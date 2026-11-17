---
id: K-LEKCE-0022
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Mínusový (zpětný) vodič musí mít aspoň stejný průřez jako plusový, protože jím teče stejný proud; společný mínusový vodič a přípojnice musí unést aspoň tolik jako přívod, který napájí připojené spotřebiče."
hodnota: null
jednotka: null
rozsah: null
podminky: "Stejnosměrné obvody 12/24 V s vlastním mínusem. Kalkulačka průřezu v režimu „vlastní kabel“ počítá oba vodiče stejného průřezu (n = 2, K-VODIC-0028). Norma ABYC E-11 je pro lodě, ne pro obytná vozidla; lekce to uvádí."
zdroje:
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats (vydání 7/2003)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "čl. 11.5.2.7.3 (DC System Negative Connections), s. 5: zatížitelnost přípojnice mínusu pro příslušenství a jejího vodiče k hlavnímu mínusu aspoň rovná zatížitelnosti přívodu k rozvaděči, který příslušenství napájí"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.1 Cable selection, poznámka k tabulce: tabulka počítá s celkovou délkou = délka plusového + délka mínusového kabelu (oba stejného průřezu)"
    datum-overeni: 2026-11-17
vypocet: ""
pouzito-v: [lekce-13-kostra-nebo-vlastni-minus, kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0022-2026-11-17.md
schvalil: null
---

Poznámky rešeršéra:

Fyzikální základ (stejný proud v obou vodičích) je triviální; zdroj pravidla je ABYC 11.5.2.7.3, který to výslovně požaduje pro společný mínus. Victron Wiring Unlimited stejný průřez nepíše výslovně, jen s ním jeho tabulka počítá. Text pro obytná vozidla (EN 1648-2) jsem v rozpočtu nedohledal.
