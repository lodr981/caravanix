---
id: K-VODIC-0006
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Kabel CCA (hliník poměděný) má asi o 60 % vyšší odpor než měď (vodivost zhruba o třetinu nižší), proto do vozu jen čistá měď."
hodnota: 1.59
jednotka: "násobek odporu mědi (CCA 10 % Cu)"
rozsah: [1.55, 1.59]
podminky: "Drát CCA podle ASTM B566 s 10 % nebo 15 % mědi, při 20 °C, vztaženo k IACS (100 % = 0,017241 Ω·mm²/m). „Asi o 60 %“ = 55–59 %; „zhruba o třetinu“ = 36–37 %. Levné kabely z e-shopů nemusí ASTM B566 odpovídat a mohou být horší. Doporučení „do vozu jen čistá měď“ je rozhodnutí odborníka (Radek), kalkulačka počítá jen s mědí."
zdroje:
  - typ: datasheet
    nazev: "MWS Wire: Copper Clad Aluminum and Other Clad Metals (podle ASTM B-566)"
    url: "https://mwswire.com/wp-content/uploads/2024/03/MWS-copper-clad-aluminum-other-clad-metals.pdf"
    misto: "tabulka Clad Metals: CCA 10 % 16,50 Ω/CMF, 62,9 % IACS; CCA 15 % 16,10 Ω/CMF, 64,4 % IACS"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Ulbrich: Lite Weight CCA & SPCCA Capability Sheet (2020)"
    url: "https://www.ulbrich.com/uploads/data-sheets/Ulbrich-Lite-Weight-Copper-Clad-Aluminum-Data-Sheet.pdf"
    misto: "tabulka vlastností: CCA 10 % 62,85 % IACS, 2,74 × 10⁻⁸ Ω·m; CCA 15 % 64,42 % IACS, 2,67 × 10⁻⁸ Ω·m; měď 1,68 × 10⁻⁸ Ω·m"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ASTM B566 Standard Specification for Copper-Clad Aluminum Wire – text normy neotevřen"
    url: ""
    misto: "třídy 10A/10H/15A/15H (10 a 15 % mědi)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: texty průřezu – CCA nedoporučovat, schváleno 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 16. 11. 2026 „CCA nedoporučovat (asi o 60 % vyšší odpor, vodivost zhruba o třetinu nižší, do vozu jen čistá měď)“"
    datum-overeni: 2026-11-16
vypocet: "Odpor CCA / odpor Cu = 1 / IACS: 1/0,629 = 1,590 (+59 %), 1/0,644 = 1,553 (+55 %). MWS v Ω/CMF: 16,50/10,371 = 1,591; 16,10/10,371 = 1,552. Vodivost: 1 − 0,629 = 0,371 (o 37 % nižší); 1 − 0,644 = 0,356 (o 36 % nižší); třetina = 33 %, „zhruba“. ρ CCA 10 % = 0,017241/0,629 = 0,0274 Ω·mm²/m (shoda s Ulbrich 2,74 × 10⁻⁸ Ω·m). Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0006-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** Ověřovatel shledal kartu věcně v pořádku, nesouhlasil text webu („o asi 60 % horší vodivost“). Radek 16. 11. 2026 rozhodl o novém textu, karta teď tvrdí přesně tento text: „asi o 60 % vyšší odpor než měď (vodivost zhruba o třetinu nižší), proto do vozu jen čistá měď“. Rada „počítejte s průřezem o stupeň větším“ se z webu vypouští (viz K-VODIC-0007). Přidán zdroj `rozhodnuti-odbornika` pro doporučení „jen čistá měď“. `rozsah` opraven na [1,55; 1,59].

„Zhruba o třetinu“ je zaokrouhlení 36–37 %; přesněji „asi o 36–37 %“. Pokud autor textu chce přesnost, ať použije „asi o třetinu“.
