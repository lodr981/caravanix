---
id: K-VODIC-0002
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "V režimu „Ve svazku / motorový prostor“ kalkulačka počítá s ρ = 0,0216 Ω·mm²/m, což odpovídá mědi zahřáté přibližně na 80 °C."
hodnota: 0.0216
jednotka: "Ω·mm²/m"
rozsah: [80, 84]
podminky: "Měď, lineární teplotní závislost odporu s α20 = 0,00393 /°C. Rozsah [80, 84] je teplota vodiče ve °C podle toho, zda se vychází z 0,0175 (80 °C), nebo z IACS 0,017241 (84 °C)."
zdroje:
  - typ: norma
    nazev: "NBS/NIST Handbook 100: Copper Wire Tables"
    url: "https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook100.pdf"
    misto: "PDF s. 9: α20 = 0,003 93 /°C; PDF s. 16 (vztah R_t = R_20 × [1 + 0,00393 × (t − 20)])"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "patička: „v režimu Ve svazku / motorový prostor 0,0216 Ω·mm²/m“; kód calc(): rho = hot ? 0.0216 : 0.0175"
    datum-overeni: 2026-11-16
vypocet: "0,0216 / 0,0175 = 1,2343. T = 20 + (1,2343 − 1) / 0,00393 = 79,6 °C. Při výchozí IACS 0,017241: T = 20 + (0,0216/0,017241 − 1)/0,00393 = 84,3 °C. Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Patička kalkulačky teplotu u 0,0216 neuvádí. Výpočtem odpovídá vodiči o teplotě zhruba 80 °C, tedy nad maximální provozní teplotou PVC izolace 70 °C, ze které vychází tabulka zatížitelnosti (K-VODIC-0003). Je to tedy konzervativní volba pro úbytek napětí v teplém prostředí.

Souvislost: kombinace ρ při 80 °C s FLRY lankem (K-VODIC-0001, +4–9 %) by dala ještě o něco vyšší odpor; kalkulačka to nezahrnuje.

Nepodařilo se dohledat, odkud konkrétní číslo 0,0216 pochází (žádný otevřený zdroj ho neuvádí). Pokud jde o Radkovu volbu, stačí zdroj „rozhodnutí odborníka“ – viz otázka v PREHLED.md.
