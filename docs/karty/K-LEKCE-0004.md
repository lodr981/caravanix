---
id: K-LEKCE-0004
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Baterie LiFePO4 12,8 V dá při zkratu řádově tisíce ampér: s vnitřním odporem 0,8 mΩ teoreticky až 16 000 A přímo na pólech, se dvěma metry kabelu 35 mm² asi 7 000 A."
hodnota: 16000
jednotka: "A (teoretický zkratový proud na pólech, 12,8 V / 0,8 mΩ)"
rozsah: [3500, 16000]
podminky: "Odhad I = U ÷ (R baterie + R kabelů), bez odporu spojů, pojistky a BMS, tedy horní mez. Victron Smart 12,8/100 a 12,8/200: 0,8 mΩ (baterie bez vestavěného spínače, BMS je externí). U baterie s vestavěným BMS přidají odpor tranzistory BMS a BMS zkrat po chvíli vypne; pojistku u baterie to nenahrazuje (K-VODIC-0036, K-LEKCE-0005). Paralelní baterie: zkratové proudy se sčítají."
zdroje:
  - typ: datasheet
    nazev: "Victron Energy: Lithium Battery 12,8 V & 25,6 V Smart, datasheet"
    url: "https://www.victronenergy.de/upload/documents/Datasheet-12,8-Volt-lithium-iron-phosphate-batteries-Smart-EN.pdf"
    misto: "s. 2, Battery specification, řádek Internal resistance: 12,8/50 2 mΩ; 12,8/100 0,8 mΩ; 12,8/160 0,9 mΩ; 12,8/200 0,8 mΩ; 25,6/100 1,6 mΩ"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 4.6.1 Interrupt rating and fuse selection for lithium systems"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/dc-wiring.html"
    misto: "4.6.1: lithiové baterie mohou dodat velmi vysoké zkratové proudy; pojistka s nižší vypínací schopností, než je zkratový proud, může selhat katastrofálně (číslo v kA neuvádí)"
    datum-overeni: 2026-11-16
vypocet: "Na pólech: 12,8 V ÷ 0,0008 Ω = 16 000 A. Kabel 2 × 1 m 35 mm² (tam i zpět): R = 0,0175 × 2 ÷ 35 = 1,0 mΩ → 12,8 ÷ 0,0018 = 7 111 A. Kabel 2 × 2 m 25 mm²: R = 0,0175 × 4 ÷ 25 = 2,8 mΩ → 12,8 ÷ 0,0036 = 3 556 A. ρ 0,0175 podle K-VODIC-0001. Srovnání: vypínací schopnost ATOF 1 000 A, MEGA a MIDI 2 000 A, Class T 20 000 A (K-VODIC-0036). Přepočteno v Pythonu."
pouzito-v: [lekce-4-pojistka-u-baterie, k2]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Datasheet, který by zkratový proud LiFePO4 baterie uváděl přímo v ampérech, jsem nenašel (hledal jsem asi 20 minut). Výrobci uvádějí vnitřní odpor; u levných baterií často jen střídavý při 1 kHz (10–70 mΩ), který se na zkratový proud přepočítat nedá. Proto výpočet z odporu Victron, který je stejnosměrný údaj v tabulce baterie. Výsledek je horní mez; skutečný proud sníží spoje a pojistka. Pro zásadu „řádově tisíce ampér“ to stačí: i se 4 m kabelu 25 mm² vychází přes 3 500 A, tedy nad vypínací schopností ATOF i MEGA.

Na co si dát pozor: číslo 16 000 A neuvádět jako „baterie dá 16 000 A“, ale jako „teoreticky přes 10 000 A, prakticky tisíce ampér“.
