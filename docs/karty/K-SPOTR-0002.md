---
id: K-SPOTR-0002
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Katalog spotřebičů, skupina klimatizace: střešní klimatizace 230 V má typický příkon asi 950 W (620–1310 W) a rozběh asi 6,4 kW na 150 ms; parkovací klimatizace 12/24 V asi 230 W (120–384 W)."
hodnota: null
jednotka: "W"
rozsah: null
podminky: "Režim chlazení. Střešní 230 V: výrobci uvádějí proud, příkon je přepočet proud × 230 V (zdánlivý výkon, horní odhad činného příkonu). Parkovací: kompresor s měničem otáček, příkon podle stupně, přepočet proud × 12 V."
zdroje:
  - typ: navod
    nazev: "Truma Aventa comfort, návod k použití, technická data"
    url: "https://www.cubcampers.com.au/cdn/shop/files/Air-Conditioner-Truma-Aventa-Comfort-Operating-Instructions_1eb3f38c-8d11-4ff7-bd78-f93458e88aef.pdf"
    misto: "Technical data: 230–240 V, 50 Hz; Power consumption cooling 4,2 A, heating 3,7 A; Start-up current 28 A (150 ms); cooling capacity 2,4 kW. Shodně brožura Truma: https://www.jacksonsleisure.com/content/pdf/truma/truma-air-conditioning-systems-brochure-en.pdf"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Dometic FreshJet FJ1700 / FJ2200 / FJ3200, návod, technická data"
    url: "https://www.manualslib.de/manual/532344/Dometic-Freshjet-Fj1700.html?page=46"
    misto: "Technical data: Cooling capacity ISO 5151 1600 / 2050 / 2800 W; Power consumption in cooling mode 2,7 / 4,1 / 5,7 A; 230 V / 50 Hz"
    datum-overeni: 2026-11-17
  - typ: datasheet
    nazev: "Dometic CoolAir RTX 2000 12V (9620001310), produktová stránka"
    url: "https://www.dometic.com/en/professional/product/dometic-coolair-rtx-2000-12v-9620001310"
    misto: "Technical data: Cooling capacity (ISO 5151) 1700 W; Current consumption min. cooling 10 A, max. cooling 30 A; 12 V. Režim Eco 19 A: https://www.dometic.com/en/product/dometic-rtx-2000-9600028490"
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Indel B Sleeping Well Oblò 12V, návod (IM, 2019)"
    url: "https://www.unisale.gr/image/data/uploads/202107/SW OBLO_12V_(DC)_IM_1.pdf"
    misto: "Technické údaje: STANDARD 650 W chlazení, 16 A (12 V); TURBO 950 W chlazení, 32 A (12 V)"
    datum-overeni: 2026-11-17
vypocet: "Střešní: Aventa 4,2 A × 230 V = 966 W; FJ2200 4,1 × 230 = 943 W; FJ1700 2,7 × 230 = 621 W; FJ3200 5,7 × 230 = 1311 W. Typická 950 W (třída 2,0–2,4 kW chlazení). Rozběh 28 A × 230 V = 6440 W na 150 ms. Parkovací: RTX 2000 10 A × 12 = 120 W, 19 A × 12 = 228 W, 30 A × 12 = 360 W; Oblò 16 A × 12 = 192 W, 32 A × 12 = 384 W; medián {120, 192, 228, 360, 384} = 228 → 230 W."
pouzito-v: [katalog-spotrebicu, kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

| Položka (id) | Typ. W | Rozsah W | Špička W | Modely → hodnota |
| --- | --- | --- | --- | --- |
| klima-strecha-230v | 950 | 620–1310 | 6440 (150 ms) | Truma Aventa comfort 4,2 A; FreshJet 1700 / 2200 / 3200: 2,7 / 4,1 / 5,7 A |
| klima-parkovaci-12v | 230 | 120–384 | null | Dometic RTX 2000 12V 10–30 A, Eco 19 A; Indel B Oblò 16 A / 32 A |

**Na co si dát pozor.**
- U 230 V jednotek uvádějí výrobci proud, ne činný příkon; přepočet × 230 V je horní odhad (účiník menší než 1). Pro bilanci baterie je to na bezpečné straně.
- Rozběhový proud 28 A je pro měnič zásadní: běžný měnič 2–3 kW ho bez softstartu nemusí utáhnout. Pro jiné modely jsme rozběh nenašli.
- Parkovací klimatizace: starší návod RTX uvádí rozsah 10–60 A; špičku jsme z jednoho zdroje nedoložili, proto `spickaW` null. Oblò je ze staršího návodu (2019).
- 24V verze parkovacích klimatizací mají podobný příkon ve W (poloviční proud); samostatně nedohledáno.
- Doba chodu za den není podložená (záleží na teplotě, izolaci, slunci) → `hodinDenne` null.
- Hodnoty Truma a FreshJet čteny z výpisů návodů ve vyhledávání; stránku Dometic RTX 2000 12V jsem otevřel přímo.
