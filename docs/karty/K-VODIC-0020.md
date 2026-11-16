---
id: K-VODIC-0020
trida: C
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Pro proudy nad asi 150 A (velké měniče) je vhodné zvážit přechod na 24 V: proud se sníží na polovinu a kabely mohou být tenčí; na 12 V jsou kabely velmi drahé a těžké."
hodnota: 150
jednotka: "A"
rozsah: null
podminky: "Stejný výkon spotřebiče. 150 A na 12 V odpovídá asi 1 800 W příkonu."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4 DC wiring"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.1 Cable selection: preferovaná horní mez měniče 12 V do 3 000 VA, 24 V do 5 000 VA; aby se předešlo velmi silným kabelům, má se nejdřív zvážit zvýšení napětí soustavy, proud klesne a kabely mohou být tenčí"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "hláška „Přes 150 A na 12 V: zvažte 24 V nebo zkrácení trasy“; praktický tip v příručce"
    datum-overeni: 2026-11-16
vypocet: "I = P/U: 150 A × 12 V = 1 800 W; stejný výkon na 24 V = 75 A. Při stejném procentním úbytku: ΔU_dov se zdvojnásobí a proud se sníží na polovinu, potřebný průřez pro úbytek tedy klesne na čtvrtinu (A = ρ·2L·I/ΔU)."
pouzito-v: [kalkulacka-prurez, kalkulacka-menic]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0020-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Princip je doložen návodem Victron. Hranice 150 A je praktická volba reference (Victron dává hranici výkonem: 12 V do 3 000 VA, což je proudově víc než 150 A). Proto třída C.

Doplnění, které reference neříká: pro stejný procentní úbytek klesne potřebný průřez na 24 V na čtvrtinu, ne jen na polovinu (oteplení ale klesá jen s proudem). „Kabely mohou být tenčí“ je tedy správně, spíš skromně.
