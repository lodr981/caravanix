---
id: K-SOLAR-0002
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Výchozí koeficient ztrát malého ostrovního systému s regulátorem MPPT (podíl vyrobené energie, který se dostane do baterie a ke spotřebičům) je v kalkulačce 0,7."
hodnota: 0.7
jednotka: "bez jednotky (0–1)"
rozsah: [0.67, 0.86]
podminky: "Ostrovní systém obytného vozu nebo karavanu: panel na střeše (horší chlazení než volně stojící), regulátor MPPT, olověná nebo LiFePO4 baterie. Koeficient násobí výnos bez ztrát z K-SOLAR-0001. Zahrnuje teplotu článků, nečistoty, kabely, regulátor a s rezervou i ztráty v baterii; kalkulačka jiné ztráty nabíjení baterie nepočítá. Uživatel ho může změnit v rozsahu 0,5–1."
zdroje:
  - typ: navod
    nazev: "PVGIS user manual (European Commission, Joint Research Centre), PVGIS 5.x"
    url: "https://joint-research-centre.ec.europa.eu/photovoltaic-geographical-information-system-pvgis/getting-started-pvgis/pvgis-user-manual_en"
    misto: "Oddíl o off-grid výpočtu („Calculation outputs for the off-grid PV calculations“): výkonnostní poměr celého ostrovního systému 0,67, zahrnuje ztráty v baterii, střídači a stárnutí. Oddíl „System loss“ (síťový systém): výchozí ztráty 14 % (kabely, střídač, nečistoty), ztráty teplotou a nízkým ozářením se v PVGIS počítají zvlášť, u neznámé technologie modulu orientačně 8 %."
    datum-overeni: 2026-11-16
vypocet: "Spodní mez 0,67 = výkonnostní poměr ostrovního systému v PVGIS (včetně baterie a střídače). Horní mez 0,86 = 1 − 0,14, výchozí ztráty síťového systému v PVGIS bez teploty; s teplotou a nízkým ozářením (asi 8 %) vychází zhruba 0,86 × 0,92 ≈ 0,79. Zvoleno 0,7: blízko spodní meze (bezpečné, spíš podhodnotí výrobu), o málo výš než 0,67, protože v obytňáku část spotřeby jde přímo z 12 V bez střídače."
pouzito-v: [kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**Proč tento zdroj.** PVGIS (JRC Evropské komise) je uznávaný nástroj a jeho manuál uvádí jak výchozí ztráty síťového systému, tak jedno číslo pro celý ostrovní systém. Ostrovní hodnota 0,67 je nejbližší tomu, co v obytňáku počítáme. Text manuálu jsem četl přes převod stránky na text; přesné číslování oddílů v manuálu je nejednotné, proto cituji názvy oddílů.

**Co se nepodařilo / na co si dát pozor.**
- Rozpis po složkách pro obytňák (regulátor MPPT asi 95–98 %, teplota článků na střeše v létě klidně 10–15 %, nečistoty, kabely) jsem z jednoho zdroje nesložil; v našich zdrojích se uvádí souhrnné číslo. Vodorovný panel na střeše vozu bývá teplejší a víc se špiní než panel ve sklonu, proto volím hodnotu u spodní meze.
- V zimě jsou teplotní ztráty menší, ale přibývá sníh a nízké ozáření; jeden koeficient po celý rok je zjednodušení vhodné pro alfu.
- Kdo má regulátor PWM místo MPPT, má ztráty větší; 0,7 pro něj může být optimistické. Kalkulačka počítá s MPPT.
