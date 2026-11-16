---
id: K-VODIC-0001
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Kalkulačka počítá úbytek s odporem vodiče podle průřezu; pro průřezy 0,5 až 70 mm² bere maximální odpor lanka FLRY-B při 20 °C z datasheetu výrobce: 0,5 mm² 37,1; 0,75 mm² 24,7; 1 mm² 18,5; 1,5 mm² 12,7; 2,5 mm² 7,6; 4 mm² 4,71; 6 mm² 3,14; 10 mm² 1,82; 16 mm² 1,16; 25 mm² 0,743; 35 mm² 0,527; 50 mm² 0,368; 70 mm² 0,259 Ω/km."
hodnota: null
jednotka: "Ω/km (= mΩ/m); ρ v Ω·mm²/m"
rozsah: [0.0181, 0.0191]
podminky: "Měděné automobilové lanko FLRY-B (ISO 6722-1, PVC, Cu-ETP1), odpor při 20 °C (maximální hodnota z datasheetu), stejnosměrný proud. Platí pro všechna počítaná uložení verze 2 (par, kostra, svazek); teplý přepočet se od 2. kola nepoužívá (K-VODIC-0002). Efektivní ρ(a) = odpor × průřez / 1000, zaokrouhleno na 4 desetinná místa (soubor packages/data/src/odpor-vodicu.json). Datasheet má pro každý průřez jeden řádek, takže „horní mez“ = tato jediná maximální hodnota. Průřezy 95 a 120 mm² datasheet nemá, ty pokrývá K-VODIC-0037. Odpor je při 20 °C; za provozu je vodič teplejší a odpor vyšší, text webu nesmí tvrdit, že jde o odpor za provozu."
zdroje:
  - typ: datasheet
    nazev: "Data sheet FLRY-A / FLRY-B (PVC, ISO 6722-1; list s kontaktem firmy Manex, PL; kopie chipdip.ru)"
    url: "https://static.chipdip.ru/lib/604/DOC035604408.pdf"
    misto: "PDF s. 2, tabulka FLRY-B, sloupec „Resistance at 20 °C (max.) mΩ/m“, řádky 1 x 0,50 až 1 x 70,00 (čteno podle souřadnic slov, jeden řádek na průřez); PDF s. 1: Cu-ETP1, PVC class B (ISO 6722-1), −40 až +105 °C"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Caledonian Cables: FLR2X-A, ISO 6722 Class C, 1×1,5 mm² (nezávislý výrobce, kontrola jednoho bodu)"
    url: "https://www.caledonian-cables.com/files/datasheet/automotive%20cables/FLR2X-A/FLR2X-A-ISO%206722-1C1.5.pdf"
    misto: "Max. Conductor Resistance at 20 °C: 12,7 mΩ/m pro 1,5 mm²"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "NBS/NIST Handbook 100: Copper Wire Tables (1966), International Annealed Copper Standard"
    url: "https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook100.pdf"
    misto: "PDF s. 9: 0,017 241 Ω·mm²/m při 20 °C (srovnání: čistá žíhaná měď)"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: odpor vodiče tabulkou podle průřezu, 2. kolo 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „Odpor vodiče: tabulka podle průřezu. Do 70 mm² horní mez z datasheetu FLRY-B …“; docs/KALKULACKA_PRUREZU.md, Verze 2, Nové datové tabulky"
    datum-overeni: 2026-11-16
vypocet: "ρ(a) = R[Ω/km] × a[mm²] / 1000, zaokrouhleno na 4 desetinná místa (polovina nahoru, Decimal): 0,5 → 0,01855 → 0,0186; 0,75 → 0,018525 → 0,0185; 1 → 0,0185; 1,5 → 0,01905 → 0,0191; 2,5 → 0,0190; 4 → 0,01884 → 0,0188; 6 → 0,01884 → 0,0188; 10 → 0,0182; 16 → 0,01856 → 0,0186; 25 → 0,018575 → 0,0186; 35 → 0,018445 → 0,0184; 50 → 0,0184; 70 → 0,01813 → 0,0181. Rozsah 0,0181 (70 mm²) až 0,0191 (1,5 mm²). Proti IACS (0,017241): 1,05× až 1,11×. Caledonian 1,5 mm²: 12,7 × 1,5 / 1000 = 0,01905 (shoda). Přepočteno v Pythonu (Decimal) a zkontrolováno v Node proti souboru odpor-vodicu.json."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0001-2026-11-16-kolo3.md
schvalil: null
---

Poznámky rešeršéra:

**2. kolo Radka 16. 11. 2026: co se změnilo.** Karta tvrdila jedno ρ = 0,0191 (horní mez přes průřezy) a byla `overeno`. Radek ve 2. kole rozhodl, že kalkulačka bere odpor pro každý průřez zvlášť. Tvrzení je teď tabulka 13 hodnot z datasheetu FLRY-B, proto stav zpět na `navrh`. Hodnoty jsem znovu přečetl z čerstvě staženého PDF (stejný soubor jako v kole 1 a 2, shodný MD5) podle souřadnic slov. Každý průřez řady MM do 70 mm² v datasheetu je, žádný nechybí; každý má jediný řádek.

Pozor na zaokrouhlení u 1,5 mm²: 12,7 × 1,5 / 1000 = 0,01905 přesně. Zaokrouhlení „polovina nahoru“ dává 0,0191, zaokrouhlení v plovoucí čárce (Python `round`, JS `toFixed`) může dát 0,0190. V souboru je 0,0191 (konzervativní, vyšší odpor). Otázka pro Radka je v PREHLED.md.

Datasheet nese kontakt firmy Manex (PL), výrobce kabelu na listu výslovně uveden není. Druhý nezávislý výrobce (Caledonian) potvrzuje jeden bod (1,5 mm²).
