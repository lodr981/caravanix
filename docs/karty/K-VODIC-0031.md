---
id: K-VODIC-0031
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Nožová pojistka Littelfuse MAXI (20–80 A, Slo-Blo) smí podle tabulky výrobce trvale nést při 20 °C okolí plný jmenovitý proud u 20–50 A a 93 % u 80 A; její jmenovitý proud má proto být alespoň 1,08× trvalý proud obvodu, při 65 °C alespoň 1,29×."
hodnota: 1.08
jednotka: "poměr jmenovitý proud pojistky ÷ trvalý proud"
rozsah: [1.08, 1.29]
podminky: "Littelfuse MAXI 32 V (0299), 20–80 A (z řady FUSES v2: 20, 25, 30, 35, 40, 50, 60, 70, 80 A). Teplota okolí 20 °C (1,08) nebo 65 °C (1,29); 85 °C až 1,43. Typical derating, Temperature Security Margin 20 %, vodiče podle ISO 8820-3."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: MAXI Blade Fuses Rated 32V (Revised 10/26/2022), kopie Enika.eu"
    url: "https://www.enika.eu/data/files/produkty/komponenty/jisteni/Littelfuse_MAXI_32V_Datasheet_2022.pdf"
    misto: "s. 3, Temperature Table (−40, 0, 20, 65, 85, 110, 125 °C): 20 A 20/20/20/20/18/15/13; 60 A 60/60/56/47/42/35/31; 70 A 70/70/68/57/51/43/37; 80 A 80/78/74/62/56/47/40. s. 1: Slo-Blo, časové zpoždění a malý ztrátový výkon; 1000 A @ 32 V dc; ISO 8820-3. s. 3 Time-Current: 100 % → 360 000 s / ∞, 135 % → 60 / 1800 s."
    datum-overeni: 2026-11-16
vypocet: "20 °C: 20–50 A 1,000; 60 A 1,071; 70 A 1,029; 80 A 1,081 → max 1,081. 65 °C: 20 A 1,000; 25 A 1,087; 30 A 1,071; 35 A 1,167; 40 A 1,176; 50 A 1,190; 60 A 1,277; 70 A 1,228; 80 A 1,290 → max 1,290. Kontrola v2: při 20 °C vyhoví vše; při 65 °C ne u 60 A (48 / 47 A) a 80 A (64 / 62 A). Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez, pojistky-rodiny]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0031-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

MAXI doplňuje doklad hodnot 50 a 70 A (K-VODIC-0010). Pro kalkulačku je to alternativa k MIDI v pásmu 50–80 A.
