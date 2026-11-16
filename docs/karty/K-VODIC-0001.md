---
id: K-VODIC-0001
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Kalkulačka počítá s měrným odporem mědi ρ = 0,0175 Ω·mm²/m jako hodnotou při 20 °C."
hodnota: 0.0175
jednotka: "Ω·mm²/m"
rozsah: [0.017241, 0.0191]
podminky: "Měděný vodič, 20 °C, stejnosměrný proud. Režim „Kabel vedený samostatně“. Spodní mez rozsahu je mezinárodní norma žíhané mědi (IACS), horní mez efektivní odpor reálného automobilového lanka FLRY-B podle maximálních hodnot odporu v datasheetu."
zdroje:
  - typ: norma
    nazev: "NBS/NIST Handbook 100: Copper Wire Tables (1966), International Annealed Copper Standard"
    url: "https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook100.pdf"
    misto: "oddíl 1 „Standard values“, PDF s. 9: 0,017 241 Ω·mm²/m při 20 °C; teplotní součinitel 0,003 93 /°C při 20 °C"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "IEC 60028 (International standard of resistance for copper) – jen odkaz, text normy neotevřen"
    url: ""
    misto: "hodnota 1/58 Ω·mm²/m při 20 °C; citováno i v NIST HB 100, PDF s. 46–47"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Data sheet FLRY-A / FLRY-B (PVC, ISO 6722-1; list s kontaktem firmy Manex, PL; kopie chipdip.ru)"
    url: "https://static.chipdip.ru/lib/604/DOC035604408.pdf"
    misto: "tabulka FLRY-B, sloupec Resistance at 20 °C (max.): např. 2,5 mm² = 7,6 mΩ/m, 25 mm² = 0,743 mΩ/m"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.7 Current, cable resistance and voltage drop: příklad 2 m kabelu 35 mm² = 1,08 mΩ"
    datum-overeni: 2026-11-16
vypocet: "IACS: 1/58 = 0,017241. 0,0175 / 0,017241 = 1,015, tj. o 1,5 % vyšší než IACS při 20 °C; to odpovídá IACS mědi při 20 + 0,015/0,00393 = 23,8 °C. Efektivní ρ z max. odporu FLRY-B: ρ = R[Ω/m] × A: 1,5 mm² → 0,01905; 2,5 → 0,0190; 4 → 0,01884; 6 → 0,01884; 10 → 0,0182; 16 → 0,01856; 25 → 0,01858; 35 → 0,01844; 50 → 0,0184; 70 → 0,01813 (o 3,6 až 8,9 % nad 0,0175). Victron: 1,08 mΩ × 35 / 2 = 0,0189. Přepočteno skriptem v Pythonu."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0001-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Hodnota 0,0175 je běžně používané zaokrouhlení měrného odporu mědi; fyzikální norma (IACS) je 0,017241 při 20 °C, takže 0,0175 je mírně konzervativní vůči čisté mědi.

**Nález pro Radka (výpočet neměním):** reálné lanko automobilového kabelu (FLRY-B, ISO 6722-1) smí mít podle datasheetu při 20 °C odpor o 4–9 % vyšší, než odpovídá 0,0175 (lanko z tenkých drátků, jiná geometrie, tolerance průřezu). Victron ve Wiring Unlimited počítá s odporem odpovídajícím ρ ≈ 0,0189. Úbytek napětí na skutečném kabelu proto může být až o ~9 % vyšší, než kalkulačka ukáže (při 3 % povoleného úbytku to je zhruba 3,3 %). Rozhodne Radek, zda to stačí uvést v textu.

Text patičky „ρ = 0,0175 Ω·mm²/m (20 °C)“ je tedy v pořádku jako konvence, ale přesně vzato odpovídá žíhané mědi při ~24 °C.

Nepodařilo se: otevřít text IEC 60028 a IEC 60228 (maximální odpory tříd 5 a 6), jsou placené. Ověřovatel může srovnat s IEC 60228 tab. 3 (třída 5).
