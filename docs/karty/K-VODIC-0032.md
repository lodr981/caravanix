---
id: K-VODIC-0032
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Šroubovací pojistka Littelfuse MIDI chrání proti přetížení jen v hodnotách 30–125 A (150–200 A jsou podle výrobce jen ochrana proti zkratu); v rozsahu 30–125 A má mít jmenovitý proud alespoň 1,07× trvalý proud obvodu při 20 °C okolí a 1,25× při 65 °C."
hodnota: 1.07
jednotka: "poměr jmenovitý proud pojistky ÷ trvalý proud"
rozsah: [1.07, 1.25]
podminky: "Littelfuse MIDI / Clear MIDI / One-Hole MIDI 32 V (0498), hodnoty pro přetížení 30, 40, 50, 60, 70, 80, 100, 125 A (všechny v řadě FUSES v2). 150, 175 a 200 A: „Short Circuit Protector only“. Teplota okolí 20 °C (1,07) nebo 65 °C (1,25); 85 °C až 1,40. Typical derating, Temperature Security Margin 20 %."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: MIDI, Clear MIDI, One-Hole MIDI Style Bolt-down Fuse Rated 32V (Revised 09/13/2023), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/675/DOC038675898.pdf"
    misto: "s. 1: popis „protect high-current wiring harnesses“, 150–200 A „only for short circuit protection“, Interrupting Rating 2000 A @ 32 VDC, ISO 8820-5:2015. s. 2: Ratings 30–200 A, Note 1 Short Circuit Protector only (150–200 A). s. 4: Temperature Table (−20, 0, 20, 65, 85, 110, 125 °C): 30 A 30/30/28/24/22/18/16; 60 A 60/60/58/48/43/36/31; 125 A 125/125/124/104/94/79/69. s. 3 Time-Current: 30–125 A 100 % → 360 000 s / ∞."
    datum-overeni: 2026-11-16
vypocet: "20 °C: 30 A 1,071; 40 A 1,053; 50 A 1,000; 60 A 1,034; 70 A 1,000; 80 A 1,000; 100 A 1,000; 125 A 1,008 → max 1,071. 65 °C: 30 A 1,250; 40 A 1,250; 50 A 1,111; 60 A 1,250; 70 A 1,186; 80 A 1,111; 100 A 1,176; 125 A 1,202 → max 1,250. Pásmo 50–125 A: 20 °C max 1,034, 65 °C max 1,250. Kontrola v2 (f ≥ 1,25 × I): vyhoví při 20 i 65 °C (30, 40 a 60 A přesně na hraně). Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, pojistky-rodiny]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0032-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

MIDI má v pásmu 30–125 A nejpříznivější poměr ze všech rodin. Hodnoty 150–200 A do řady pro běžnou pojistku nepatří (jen zkrat); v pásmu 150–250 A zbývá pro přetížení jen MEGA.
