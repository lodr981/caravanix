---
id: K-VYROBCE-0103
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Victron MultiPlus 12/3000/120 doporučuje DC pojistku 400 A a na každou svorku + a − 2 × 50 mm² při 0–5 m, 2 × 70 mm² při 5–10 m; doporučená baterie 400–1200 Ah."
hodnota: null
jednotka: null
rozsah: null
podminky: "MultiPlus 3 kVA 230 V, 12 V verze (v téže tabulce 24/3000 50 mm² / 2 × 50 mm², 300 A). „2x“ znamená dva kladné a dva záporné kabely. Kabely ne v uzavřené chráničce."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Manual MultiPlus 3k 230V 16A/50A (firmware xxxx4xx)"
    url: "https://www.victronenergy.com/upload/documents/Manual-MultiPlus-3k-230V-16A-50A-(firmware-xxxx4xx)-EN-NL-FR-DE-ES-SE.pdf"
    misto: "EN kap. 4.2 Connection of battery cables, s. 8 (PDF s. 10): tabulka Recommended DC fuse / Recommended cross section per + and − terminal, 0–5 m a 5–10 m, poznámky *–***. Technical data, PDF s. 25: vstup 9,5–17 V, trvalý výkon 2400 W (25 °C), špička 6000 W, max. účinnost 93 %"
    datum-overeni: 2026-11-18
vypocet: "In = 2400 / (0,93 · 12) = 215 A. 2 × 50 mm² (100 mm²) na 5 m jedné cesty: 3,1 %; 2 × 70 mm² na 10 m: 4,5 %. Na mezi vstupu 9,5 V (272 A): 4,0 / 5,7 %. Pojistka 400 A / In = 1,9."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0103-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra: Průřez 2 × 50 mm² pro 400 A odpovídá požadavku, aby kabely unesly proud pojistky; úbytek 3–4,5 % je výš než cíl 2,5 %, větší průřezy už jsou na svorce nepraktické. Proud 215 A je nad mezí naší kalkulačky (200 A, `HLAVNI_VEDENI`).
