---
id: K-VYROBCE-0002
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Datasheet kompresoru Secop BD50F uvádí stejnou tabulku průřezů jako K-VYROBCE-0001 (12 V: 1 m délky na 1 mm², 24 V: 2 m na 1 mm²), pojistku 15 A pro 12 V a 7,5 A pro 24 V, ochranu baterie 10,4 / 11,7 V (24 V: 22,8 / 24,2 V) a provozní proud při 12 V až 8,7 A (3 500 ot/min); pro 24 V polovinu."
hodnota: 8.7
jednotka: "A (max. provozní proud v tabulce, 12 V)"
rozsah: [2.1, 8.7]
podminky: "Kompresor BD50F (101Z1220), R134a, 12/24 V DC. Délka = baterie–elektronická jednotka (jedna cesta). Proud podle tabulky Current consumption (EN 12900/CECOMAF): 2,1 A při 2 000 ot/min a −30 °C výparu až 8,7 A při 3 500 ot/min a −5 °C výparu; hodnoty s * jsou mimo běžné použití."
zdroje:
  - typ: datasheet
    nazev: "Secop: Datasheet BD50F Direct Current Compressor, 101Z1220, R134a, 12-24V DC (09/2024, DES.D.100.E7.02)"
    url: "https://secop.com/fileadmin/user_upload/SEPS/datasheets/en/bd50f_101z1220_r134a_12-24vdc_09-2024_desd100e702.pdf"
    misto: "Blok Wire dimensions DC: 2,5 mm² (AWG 12) 12 V 2,5 m / 24 V 5 m; 4 mm² 4 / 8 m; 6 mm² 6 / 12 m; 10 mm² 10 / 20 m; *Length between battery and electronic unit. Blok Standard battery protection settings: Cut out 10,4 / 22,8 VDC, Cut in 11,7 / 24,2 VDC. Tabulka Current consumption (for 24V applications the following must be halfed): řádek 3 500 ot/min 3,9–8,7 A. Accessories: DC usage Automobile fuse 12V: 15A | 24V: 7.5 A."
    datum-overeni: 2026-11-18
vypocet: "Smyčka 12 V R = 0,0175 × 2 × 1 m/mm² = 0,035 Ω. Při 8,7 A úbytek 0,30 V = 2,5 %; při pojistce 15 A 0,53 V = 4,4 %. 24 V: R = 0,070 Ω, při 4,35 A 0,30 V = 1,3 %, při pojistce 7,5 A 0,53 V = 2,2 %."
pouzito-v: [kalkulacka-prurez, doporuceni-vyrobcu]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0002-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra:

Datasheet potvrzuje, že tabulka průřezů je pro řadu BD stejná (BD35F.2 i BD50F). Proud 8,7 A je nejvyšší provozní hodnota v tabulce, ne rozběh. Proti tomu typická kompresorová lednice v našem katalogu (K-SPOTR-0001) má 45 W, tj. 3,75 A: kalkulačka s příkonem ÷ napětím počítá s proudem 2,3× menším, než na jaký Secop kabel dimenzuje.

Datasheet má ve výpisu dvě varianty tabulek výkonu (standardní a s AEO); citovaný řádek je z první tabulky Current consumption.
