---
id: K-VYROBCE-0101
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Victron Phoenix Inverter VE.Direct doporučuje bateriový kabel 12/500: 6 mm² (0–1,5 m) a 10 mm² (1,5–3 m), 12/800: 16 / 25 mm², 12/1200: 25 / 35 mm²; vnitřní DC pojistka 3 × 35 A / 150 A / 200 A; nad 1,5 m kabelu je nutná další pojistka nebo jistič u baterie."
hodnota: null
jednotka: null
rozsah: null
podminky: "Měniče Phoenix VE.Direct 12 V (24 V v téže tabulce: 24/500 6 / 10 mm², 24/800 6 / 10 mm², 24/1200 10 / 16 mm²). Délka v tabulce je délka kabelu bez upřesnění; z výpočtu níže vychází jako jedna cesta (baterie → měnič). Výrobce vychází z trvalého výkonu měniče, ne ze zátěže."
zdroje:
  - typ: navod
    nazev: "Victron Energy: Manual Phoenix Inverter VE.Direct 250VA–1200VA (EN-NL-FR-DE-ES-IT)"
    url: "https://www.victronenergy.com/upload/documents/Manual-Inverter-VE.Direct-250VA-1200VA-EN-NL-FR-DE-ES-IT-.pdf"
    misto: "EN, kap. 3.2 Connection to the battery, PDF s. 5: tabulka Minimum battery cap. / Internal DC fuse / Recommended DC cable cross-section (mm2) 0–1,5 m a 1,5–3 m; text pod tabulkou o další pojistce nad 1,5 m. Technical data, PDF s. 9–10: trvalý výkon 25 °C 400 / 650 / 1000 W, špička 900 / 1500 / 2200 W, podpěťové vypnutí 9,3 V, max. účinnost 90 / 90 / 92 % (12 V)"
    datum-overeni: 2026-11-18
vypocet: "Úbytek v obou vodičích při délce jedné cesty L: ΔU = I · 0,0175 · 2L / A, vztaženo k 12 V. Proud In = trvalý výkon / (účinnost · 12 V): 12/500 37 A, 12/800 60 A, 12/1200 91 A. Při In na konci pásma: 12/500 6 mm² 1,5 m 2,7 %, 10 mm² 3 m 3,2 %; 12/800 16 mm² 1,5 m 1,6 %, 25 mm² 3 m 2,1 %; 12/1200 25 mm² 1,5 m 1,6 %, 35 mm² 3 m 2,3 %. Při proudu na mezi vypnutí (9,3 V) +29 %: 2,0–4,2 %. Kdyby délka byla součet + a −, úbytky jsou poloviční (0,8–1,6 %)."
pouzito-v: [kalkulacka-prurez, doporuceni-vyrobcu]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VYROBCE-0101-2026-11-18.md
schvalil: null
---

Poznámky rešeršéra: Tabulka odpovídá úbytku kolem 2–3 % při jmenovitém výkonu měniče, tedy cíli Victronu „pod 2,5 %“ (K-VYROBCE-0110). Vnitřní pojistka (105–200 A) chrání měnič, ne kabel: 6 mm² s pojistkou 105 A je u Victronu přijatelné jen do 1,5 m; delší kabel musí mít vlastní pojistku u baterie. Hodnotu té pojistky manuál neuvádí.
