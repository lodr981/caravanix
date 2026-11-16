---
id: K-VODIC-0004
trida: A
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Kabel ve svazku s dalšími nebo v teplém motorovém prostoru se hůř chladí; kalkulačka proto v režimu „Ve svazku / motorový prostor“ snižuje zatížitelnost na 70 %."
hodnota: 0.7
jednotka: "násobek zatížitelnosti"
rozsah: [0.5, 0.71]
podminky: "Faktor 0,70 odpovídá podle DIN VDE 0298-4:2013-06 buď svazku 3 obvodů (tab. 21), nebo okolí 50 °C u vodiče s dovolenou teplotou 70 °C (tab. 17, faktor 0,71). Platí jen pro jednu z těchto podmínek; při obou současně je faktor nižší (0,70 × 0,71 ≈ 0,50)."
zdroje:
  - typ: norma
    nazev: "DIN VDE 0298-4:2013-06, tab. 17 (teplota okolí) a tab. 21 (seskupení) – text normy neotevřen, jen odkaz"
    url: ""
    misto: "tab. 17, tab. 21"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Lapp: Technical Tables T12 Current ratings (výtah z DIN VDE 0298-4:2013-06), verze INT 10/2021"
    url: "https://t3.lappcdn.com/fileadmin/catalog/en_T_pdf/T12_Current_ratings__basic_table_int.pdf"
    misto: "s. 2, Table 12-2 (z tab. 17): 70 °C vodič, okolí 50 °C → 0,71; okolí 40 °C → 0,87; s. 3, Table 12-6 (z tab. 21): svazek na stěně, v trubce nebo kanálu: 2 obvody 0,80, 3 obvody 0,70, 4 obvody 0,65, 6 obvodů 0,57"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.5 Cable runs: kabel v uzavřené liště nemůže odvádět teplo, řešením je silnější kabel"
    datum-overeni: 2026-11-16
vypocet: "Teplotní faktor pro vodič 70 °C: k = √((70 − T_okolí)/(70 − 30)); T = 50 °C → √(20/40) = 0,707 (tabulka 0,71); T = 45 °C → 0,79; T = 55 °C → 0,61. Kombinace svazek 3 obvodů + 50 °C: 0,70 × 0,71 = 0,497. Efektivní snížení v kalkulačce, protože rozhoduje CAPH: CAPH/AMP = 0,53 (1 mm²) až 0,68 (10 a 95 mm²). Přepočteno v Pythonu a Node."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Faktor 0,7 je doložen normou (přes výtah Lapp) pro svazek tří obvodů nebo pro okolí ~50 °C. Úvaha „hůř se chladí“ je podložena i návodem Victron.

**Nález pro Radka (výpočet neměním):**
1. Režim spojuje dvě různé podmínky (svazek a teplo). Při současném svazku a 50 °C okolí by podle norem vyšel faktor kolem 0,50. Motorový prostor může mít okolí i nad 50 °C (pak klesá dál: 60 °C → 0,50 sám o sobě).
2. V praxi o max. pojistce rozhoduje CAPH, který odpovídá 0,53–0,68 zatížitelnosti VDE, takže skutečná rezerva je větší než 0,7, ale u 1 mm² (0,53) a jinde kolem 0,6 je těsně nad kombinovaným faktorem 0,50. Platí jen pro PVC 70 °C; pro kabely 105 °C (K-VODIC-0005) jsou faktory příznivější.
3. Pro velké svazky (6 a více obvodů) norma dává 0,57 a méně.

Druhý nezávislý primární zdroj s čísly (mimo Lapp) se nepodařilo otevřít – opět je nutné ověřit přímo v normě (nebo IEC 60364-5-52, tab. B.52.14 a B.52.17).
