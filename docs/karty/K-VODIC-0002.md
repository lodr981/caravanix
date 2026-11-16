---
id: K-VODIC-0002
trida: B
stav: k-prezkoumani
plati-pro-zeme: [vse]
tvrzeni: "V uložení „ve svazku“ a „motorový prostor“ kalkulačka počítá s ρ = 0,0236 Ω·mm²/m: měrný odpor lanka FLRY-B (0,0191 při 20 °C) přepočtený poměrem 0,0216 / 0,0175, který odpovídá mědi zahřáté přibližně na 80 °C."
hodnota: 0.0236
jednotka: "Ω·mm²/m"
rozsah: null
podminky: "Měď, lineární teplotní závislost odporu s α20 = 0,00393 /°C (NIST, platí v rozsahu 10–100 °C). Teplota vodiče ~80 °C je předpoklad rozhodnutí odborníka, ne měření. 0,0216 (v1) je ρ = 0,0175 přepočtené na ~80 °C; 0,0236 je totéž přepočtení použité na 0,0191 (K-VODIC-0001), zaokrouhlené nahoru."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: ρ 0,0216 (měď při ~80 °C) a z ní ρ 0,0236 pro svazek a motorový prostor, schváleno 16. 11. 2026"
    url: "docs/ROZHODNUTI.md"
    misto: "řádky z 16. 11. 2026: „ρ 0,0216 (měď při ~80 °C) je rozhodnutí odborníka“; „Svazek počítá s ρ pro 80 °C (0,0236) jako motorový prostor“; docs/KALKULACKA_PRUREZU.md, Verze 2, tabulka Změny proti v1 a tabulka Uložení"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "NBS/NIST Handbook 100: Copper Wire Tables"
    url: "https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook100.pdf"
    misto: "PDF s. 9 a 10: α20 = 0,003 93 /°C (lineární v rozsahu 10–100 °C); PDF s. 15: vztah 1 / [1 + 0,003 93 (t − 20)] (popis tabulky 4)"
    datum-overeni: 2026-11-16
vypocet: "0,0191 × 0,0216 / 0,0175 = 0,023575 → zaokrouhleno nahoru 0,0236. Teplota: 0,0216 / 0,0175 = 1,2343 → T = 20 + 0,2343 / 0,00393 = 79,6 °C. Kontrola: 0,0236 / 0,0191 = 1,2356 → T = 79,9 °C (zaokrouhlení nahoru přidá 0,3 °C). Nezávislá kontrola přes „inferred absolute zero“ NIST (234,5 °C): R80/R20 = 314,5 / 254,5 = 1,236. Přepočteno v Pythonu."
pouzito-v: []
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0002-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** Karta byla pro v1 `overeno` (tvrzení ρ = 0,0216 v režimu svazek / motorový prostor). Verze 2 počítá s 0,0236, tvrzení se mění, proto stav zpět na `navrh`. Nové: hodnota 0,0236 s postupem 0,0191 × 0,0216 / 0,0175; zdroj čísla 0,0216 je teď `rozhodnuti-odbornika` (Radek 16. 11. 2026). Formální opravy z nálezu: místo NIST pro teplotní vztah opraveno na PDF s. 15; `rozsah` ve °C odstraněn (teplota je jen v podmínkách a výpočtu).

Teplota ~80 °C je nad dovolenou teplotou vodiče 70 °C, ze které vychází koeficient 0,5 pro motorový prostor (K-VODIC-0004). Pro úbytek je to konzervativní volba.

**Nepoužito od 2. kola 16. 11. 2026.** Radek ve 2. kole rozhodl, že teplý přepočet na 80 °C se ve verzi 2 nepoužije (docs/ROZHODNUTI.md: „Teplý přepočet na 80 °C se ve verzi 2 nepoužije.“). Svazek počítá s odporem podle průřezu jako ostatní uložení (K-VODIC-0001, K-VODIC-0037), motorový prostor se nepočítá (K-VODIC-0035). Karta zůstává jako historie ve stavu `k-prezkoumani`, čísla v ní platila pro 1. kolo verze 2; neověřuje se.
