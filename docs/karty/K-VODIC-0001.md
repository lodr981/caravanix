---
id: K-VODIC-0001
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Kalkulačka počítá s měrným odporem mědi ρ = 0,0191 Ω·mm²/m, což je horní mez efektivního měrného odporu automobilového lanka FLRY-B při 20 °C podle maximálních odporů v datasheetu."
hodnota: 0.0191
jednotka: "Ω·mm²/m"
rozsah: [0.017241, 0.0191]
podminky: "Měděné automobilové lanko FLRY-B (ISO 6722-1), 20 °C, stejnosměrný proud. Uložení „vedle sebe“ a „mínus přes kostru“ (verze 2). Efektivní ρ = maximální odpor vodiče z datasheetu × jmenovitý průřez; horní mez přes průřezy řady MM, které datasheet uvádí (0,5–70 mm²). Spodní mez rozsahu je mezinárodní norma žíhané mědi (IACS). Průřezy 95 a 120 mm² datasheet neuvádí. Průřez 5 mm² (v řadě kalkulačky není) dává 0,0197."
zdroje:
  - typ: datasheet
    nazev: "Data sheet FLRY-A / FLRY-B (PVC, ISO 6722-1; list s kontaktem firmy Manex, PL; kopie chipdip.ru)"
    url: "https://static.chipdip.ru/lib/604/DOC035604408.pdf"
    misto: "tabulka FLRY-B, sloupec Resistance at 20 °C (max.) [mΩ/m]: 0,5 mm² 37,1; 0,75 24,7; 1 18,5; 1,5 12,7; 2,5 7,6; 4 4,71; 6 3,14; 10 1,82; 16 1,16; 25 0,743; 35 0,527; 50 0,368; 70 0,259"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Caledonian Cables: FLR2X-A, ISO 6722 Class C, 1×1,5 mm² (nezávislý výrobce, kontrola jednoho bodu)"
    url: "https://www.caledonian-cables.com/files/datasheet/automotive%20cables/FLR2X-A/FLR2X-A-ISO%206722-1C1.5.pdf"
    misto: "Max. Conductor Resistance at 20 °C: 12,7 mΩ/m pro 1,5 mm²"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "NBS/NIST Handbook 100: Copper Wire Tables (1966), International Annealed Copper Standard"
    url: "https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook100.pdf"
    misto: "PDF s. 9: 0,017 241 Ω·mm²/m při 20 °C (spodní mez rozsahu); α20 = 0,003 93 /°C"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.7 Current, cable resistance and voltage drop: 2 m kabelu 35 mm² = 1,08 mΩ (tj. ρ ≈ 0,0189)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: výpočet verze 2 (docs/ROZHODNUTI.md a docs/KALKULACKA_PRUREZU.md, 16. 11. 2026)"
    url: "docs/KALKULACKA_PRUREZU.md"
    misto: "kapitola Verze 2, Změny proti v1: ρ 0,0191 (horní mez lanka FLRY-B)"
    datum-overeni: 2026-11-16
vypocet: "ρ_ef = R[mΩ/m] × A[mm²] / 1000. FLRY-B: 0,5 → 0,01855; 0,75 → 0,01852; 1 → 0,01850; 1,5 → 0,01905; 2,5 → 0,01900; 4 → 0,01884; 6 → 0,01884; 10 → 0,01820; 16 → 0,01856; 25 → 0,01857; 35 → 0,01844; 50 → 0,01840; 70 → 0,01813. Maximum 0,01905 (1,5 mm²), zaokrouhleno nahoru 0,0191. Caledonian 1,5 mm²: 12,7 × 1,5 = 0,01905 (shoda). Proti IACS: 0,0191 / 0,017241 = 1,108 (+10,8 %), odpovídá IACS mědi při 20 + 0,108 / 0,00393 = 47 °C. Proti v1: 0,0191 / 0,0175 = 1,091. Victron: 1,08 × 35 / 2 / 1000 = 0,0189. ABYC E-11 K = 10,75 Ω·cmil/ft → 10,75 × 5,0671·10⁻⁴ / 0,3048 = 0,01787. Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** Karta byla pro v1 `overeno` (tvrzení ρ = 0,0175 při 20 °C). Radek 16. 11. 2026 rozhodl, že verze 2 počítá s ρ = 0,0191 jako horní mezí lanka FLRY-B. Tvrzení se mění, proto stav zpět na `navrh`. Nové: tvrzení a hodnota 0,0191, rozpis ρ_ef pro všechny průřezy řady MM, které datasheet má (dřív jen 1,5–70 mm²), kontrolní bod od nezávislého výrobce (Caledonian), zdroj typu `rozhodnuti-odbornika`. Hodnota 0,0175 (v1) zůstává jen jako historie v referenci.

Pozor: 0,0191 kryje průřezy 0,5–70 mm². Pro 95 a 120 mm² datasheet hodnotu nemá; u silnějších průřezů je ρ_ef v datasheetu spíš nižší (70 mm²: 0,0181), takže 0,0191 je tam pravděpodobně na bezpečné straně, ale doložené to není.

Nepodařilo se: IEC 60228 (max. odpory tříd 5 a 6) je placená, neotevřel jsem ji.
