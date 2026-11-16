---
id: K-LEKCE-0016
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Měnič se vybírá podle trvalého výkonu ve wattech, ne podle špičky: Victron Phoenix 12/3000 má 3 000 VA, ale trvale 2 400 W při 25 °C (2 200 W při 40 °C) a špičku 6 000 W jen krátce; číslo na krabici levného měniče bývá právě špička nebo VA."
hodnota: 2400
jednotka: "W (trvalý výkon Phoenix 12/3000 při 25 °C)"
rozsah: [1700, 2400]
podminky: "Trvalý výkon klesá s teplotou okolí: Phoenix 12/3000 2 400 W (25 °C), 2 200 W (40 °C), 1 700 W (65 °C); 3 000 VA je zdánlivý výkon při nelineární zátěži. Špička 6 000 W slouží pro rozběh (K-VODIC-0015). Kalkulačka měniče doporučí trvalý výkon ≥ trvalyVykonW a špičku ≥ spickaW."
zdroje:
  - typ: datasheet
    nazev: "Victron Energy: Phoenix Inverter 1200VA–5000VA, datasheet"
    url: "https://www.victronenergy.com/upload/documents/Datasheet-Phoenix-Inverter-1200VA-5000VA-EN.pdf"
    misto: "s. 2, Output: Cont. output power at 25 °C (VA) 12/3000 3000; Cont. output power at 25 °C (W) 2400; at 40 °C 2200; at 65 °C 1700; Peak power 6000 W; Max. efficiency 93 % (12 V)"
    datum-overeni: 2026-11-16
vypocet: "2 400 ÷ 3 000 = 0,8 (W ÷ VA); špička ÷ trvalý = 6 000 ÷ 2 400 = 2,5; špička ÷ VA = 2,0."
pouzito-v: [lekce-7-levny-menic, kalkulacka-menic]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Jeden datasheet značkového měniče ukazuje rozdíl tří čísel (VA, W trvale, špička). Pro lekci to stačí. Že levné měniče na krabici uvádějí špičku, dokládá jen vzhled nabídek e-shopů (návrh lekcí), ne datasheet; v lekci proto „bývá“, ne „je“.

Stejná poznámka k rozpadlým sloupcům PDF jako u K-LEKCE-0015.
