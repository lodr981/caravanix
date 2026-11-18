---
id: K-VYROBCE-0110
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Victron doporučuje úbytek napětí v bateriových kabelech (oba vodiče) pod 2,5 % a průřez kabelu měniče a dalších výrobků brát z návodu výrobku."
hodnota: 2.5
jednotka: "%"
rozsah: null
podminky: "Úbytek přes kladný i záporný vodič, bez přechodových odporů spojů. Jejich tabulka maximálních proudů počítá s celkovou délkou kabelu (+ plus −)."
zdroje:
  - typ: clanek
    nazev: "Victron Energy: Wiring Unlimited, kap. 4.1 Cable selection"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "kap. 4.1: Product manuals (všechny návody uvádějí průřez a pojistku), Victron toolkit app („aim for a voltage drop below 2.5%“), Recommended battery cables table (úbytek 0,259 V, celková délka = + plus −)"
    datum-overeni: 2026-11-18
vypocet: ""
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0110-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra: Slouží jako vysvětlení tabulek K-VYROBCE-0101 až 0103 a 0109: jejich hodnoty vycházejí na 1,6–3,5 % při jmenovitém výkonu (délka jedné cesty). Pozor na rozdílnou konvenci délek: tabulka ve Wiring Unlimited počítá se součtem + a −, naše kalkulačka zadává délku jedné cesty.
