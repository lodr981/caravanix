---
id: K-VODIC-0019
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Měnič má účinnost asi 90 %, takže na 1 000 W výstupu bere z baterie spíš 1 100 W; do kalkulačky je lepší zadat vyšší příkon."
hodnota: 0.9
jednotka: "účinnost"
rozsah: [0.91, 0.93]
podminky: "Sinusové měniče 12 V do 230 V, třída 1–3 kVA. Uváděná účinnost je maximální (špičková); při plném zatížení a nízkém napětí baterie bývá nižší. Rozsah jsou maxima z datasheetů tří modelů."
zdroje:
  - typ: datasheet
    nazev: "Victron Energy: Phoenix Inverter VE.Direct 250VA–1200VA"
    url: "https://www.victronenergy.com/upload/documents/Datasheet-Phoenix-Inverter-VE.Direct-250VA-1200VA-EN.pdf"
    misto: "s. 2, řádek Max. efficiency: 12/1200 → 91 % (12 V); Zero-load power 12/1200 → 10 W"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Victron Energy: Phoenix Inverter 1200VA–5000VA"
    url: "https://www.victronenergy.com/upload/documents/Datasheet-Phoenix-Inverter-1200VA-5000VA-EN.pdf"
    misto: "s. 2, řádek Max. efficiency 12/24/48 V: C12/1200 → 92 %; 12/3000 → 93 %; Zero load power C12/1200 → 8 W"
    datum-overeni: 2026-11-16
  - typ: datasheet
    nazev: "Votronic: Broschüre Wechselrichter 2025"
    url: "https://www.votronic.de/download/103/produktbroschueren/20019/broschuere-wechselrichter2025_low.pdf"
    misto: "PDF s. 9: SMI 1200 ST/1700 ST Wirkungsgrad > 93 %; Faustformel: výkon 230 V spotřebiče ÷ 10 ≈ proud z 12 V baterie (např. 1 700 W až 170 A)"
    datum-overeni: 2026-11-16
vypocet: "1 000 W / 0,90 = 1 111 W; / 0,91 = 1 099 W; / 0,93 = 1 075 W. Votronic pravidlo P/10: 1 000 W → 100 A × 12 V = 1 200 W odpovídající příkon (zahrnuje i nižší napětí baterie). Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, kalkulacka-menic]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

„Asi 90 %“ a „spíš 1 100 W“ jsou konzistentní s maximy z datasheetů (91–93 %). Datasheety uvádějí **maximální** účinnost, při plném výkonu je typicky nižší – proto je 90 % rozumný konzervativní odhad.

**Nález:** Votronic pro dimenzování dává hrubší pravidlo „výkon ÷ 10 = proud“, tj. 1 000 W → 100 A, což odpovídá 1 200 W příkonu při 12 V (nebo 1 100 W při ~11 V). Pro dimenzování kabelu a pojistky je pravidlo výrobce konzervativnější než „1 100 W“. Rozhodne Radek, zda hlášku zpřísnit.

Hláška se zobrazí jen při zadání příkonu ≥ 1 000 W; u menších měničů platí totéž, jen se to neukáže.
