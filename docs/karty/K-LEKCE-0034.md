---
id: K-LEKCE-0034
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "U baterií zapojených paralelně má mít proud do každé baterie a z ní stejně dlouhou cestu: kabely do systému se připojí diagonálně (plus na jedné baterii, mínus na druhé), nebo přes přípojnice se stejně dlouhými kabely ke každé baterii; připojit plus i mínus na tutéž baterii je nejčastější chyba a tato baterie dřív odejde. Každá lithiová baterie v paralelní bance má vlastní pojistku na plusu a jištěný je i hlavní plusový kabel banky."
hodnota: null
jednotka: null
rozsah: null
podminky: "Banka ze stejných baterií (K-LEKCE-0010) zapojená paralelně v systému 12 nebo 24 V. Diagonální zapojení podle Victronu není dokonalé, malé rozdíly proudů zůstanou. Průřez hlavního kabelu podle Victronu = průřez kabelu větve × počet větví; lekce to neuvádí, průřez počítá kalkulačka."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Lithium Battery Smart manual, kap. 4.5.4 Parallel connection"
    url: "https://www.victronenergy.com/media/pg/Lithium_Battery_Smart/en/installation.html"
    misto: "4.5.4: „Fuse each battery on the positive side“, „Fuse the positive main cable going to the battery bank“, „Connect the DC system cables diagonally to ensure an equal current path through each battery“"
    datum-overeni: 2026-11-18
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 3.3 Parallel battery bank wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/battery-bank-wiring.html"
    misto: "3.3: čtyři správné způsoby (mj. diagonálně, přes sloupky se stejně dlouhými kabely), nejčastější chyba (vše spojit a připojit na jedné straně), „The bottom battery will fail prematurely“"
    datum-overeni: 2026-11-18
vypocet: ""
pouzito-v: [lekce-20-dve-baterie-paralelne, faq, k2]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0034-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra:

Pojistku na každé baterii výslovně uvádí Victron pro své lithiové baterie; pro olověné banky ji Wiring Unlimited v kap. 3.3 nezmiňuje. Lekce ji uvádí obecně, což je na bezpečné straně.
