---
id: K-LEKCE-0023
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Hlavní mínus obytné baterie: všechny mínusy spotřebičů a nabíječů se připojují až za bočník (shunt) monitoru baterie, na mínusovou přípojnici; s kostrou se mínus spojuje jedním kabelem blízko baterie a ten musí unést poruchový proud, tedy být dimenzovaný aspoň na hodnotu hlavní pojistky."
hodnota: null
jednotka: null
rozsah: null
podminky: "Ostrovní systém s obytnou baterií ve vozidle s kovovou karoserií. Victron 7.7 uvádí „jedno uzemnění blízko baterie“ v části pro ostrovní systémy; pro vozidla (7.5) požaduje vzájemné propojení všech dotknutelných kovových částí. Pokud spotřebiče vedou mínus přes kostru (K-VODIC-0023), teče spojovacím kabelem i jejich proud."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 7 Ground, earth and electrical safety"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/ground,-earth-and-electrical-safety.html"
    misto: "7.5 Mobile installations: mobilní systém nemá zemnič, dotknutelné kovové části se propojí do místní země; 7.6: uzemnění DC mínusu je u izolovaných přístrojů dovoleno; 7.7 System grounding: zemnicí vodič DC musí unést poruchový proud, aspoň odpovídající hodnotě DC pojistky; ostrovní systém: jedno uzemnění, blízko baterie"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.8 Shunt: bočník v mínusovém kabelu jako poslední prvek před baterií nebo přípojnicí baterie; všechny spotřebiče a zdroje DC připojit za bočník; 4.2 Busbars: společný plusový a mínusový bod"
    datum-overeni: 2026-11-17
vypocet: ""
pouzito-v: [lekce-13-kostra-nebo-vlastni-minus]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0023-2026-11-17.md
schvalil: null
---

Poznámky rešeršéra:

Jeden výrobce (Victron), dvě kapitoly téže knihy. „Jedno uzemnění blízko baterie“ stojí u Victronu v odstavci pro ostrovní systémy obecně, ne výslovně pro vozidla; ověřovatel ať posoudí, zda to stačí. Číselný průřez kabelu ke kostře zdroj nedává, jen pravidlo „aspoň na hodnotu DC pojistky“; lekce číslo neuvádí.
