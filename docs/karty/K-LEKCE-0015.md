---
id: K-LEKCE-0015
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Zapnutý měnič bere z baterie i bez zátěže: sinusový měnič 12 V / 3 000 VA (Victron Phoenix 12/3000) 20 W, tedy 480 Wh za den (37,5 Ah z 12,8 V); menší měniče 1 200–2 000 VA 8–10 W. Úsporný režim spotřebu snižuje (Phoenix 12/3000: 15 W AES, 8 W vyhledávání)."
hodnota: 20
jednotka: "W (spotřeba naprázdno, Phoenix 12/3000)"
rozsah: [8, 20]
podminky: "Měnič zapnutý, bez zátěže, 12 V. Hodnoty z datasheetu výrobce; levné měniče bez datasheetu mohou mít víc, kalkulačka bere spotřebu naprázdno jako vstup (spotrebaNaprazdnoW). Rozsah: Phoenix VE.Direct 12/1200 10 W, Phoenix C12/1200–C12/1600 8 W, C12/2000 9 W, 12/3000 20 W."
zdroje:
  - typ: datasheet
    nazev: "Victron Energy: Phoenix Inverter 1200VA–5000VA, datasheet"
    url: "https://www.victronenergy.com/upload/documents/Datasheet-Phoenix-Inverter-1200VA-5000VA-EN.pdf"
    misto: "s. 2, Inverter: Zero load power 12/24/48 V: C12/1200 8 W, C12/1600 8 W, C12/2000 9 W, 12/3000 20 W; Zero load power in AES mode 12/3000 15 W; in Search mode 12/3000 8 W"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Victron Energy: Phoenix Inverter VE.Direct 250VA–1200VA, datasheet"
    url: "https://www.victronenergy.com/upload/documents/Datasheet-Phoenix-Inverter-VE.Direct-250VA-1200VA-EN.pdf"
    misto: "s. 2, Zero-load power 12/1200: 10 W (stejný zdroj jako K-VODIC-0019)"
    datum-overeni: 2026-11-16
vypocet: "20 W × 24 h = 480 Wh; 480 ÷ 12,8 = 37,5 Ah. 8 W × 24 h = 192 Wh; 10 W × 24 h = 240 Wh. Přepočteno v Pythonu."
pouzito-v: [lekce-7-levny-menic, kalkulacka-menic, kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0015-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Sloupce tabulky v PDF se při převodu na text rozpadají; hodnoty 12/3000 jsem přiřadil podle pořadí řádků (Cont. VA, W při 25/40/65 °C, Peak, Efficiency, Zero load, AES, Search) a sedí s hodnotami u K-VODIC-0019 (C12/1200 8 W, 92 %). Ověřovatel ať zkontroluje v PDF.

Levný měnič „3 000 W za pár stovek“ jsem nehledal: bez datasheetu není zdroj. Lekce může ukázat, že i značkový měnič 3 000 VA bere 20 W, a že spotřebu naprázdno je třeba hledat v datasheetu.
