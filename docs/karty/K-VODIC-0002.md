---
id: K-VODIC-0002
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Ve svazku kalkulačka počítá s ρ 0,0216 Ω·mm²/m, měď zahřátá asi na 80 °C."
hodnota: 0.0216
jednotka: "Ω·mm²/m"
rozsah: null
podminky: "Režim „Ve svazku“ (v1.1, změna 4: dřív „Ve svazku / motorový prostor“, výpočet beze změny). Měď, lineární teplotní závislost odporu s α20 = 0,00393 /°C (NIST, platí v rozsahu 10–100 °C), výchozí hodnota 0,0175 (K-VODIC-0001). Teplota asi 80 °C je předpoklad rozhodnutí odborníka, ne měření. Vyšší ρ dává větší vypočtený úbytek, a tedy spíš silnější kabel (bezpečná strana)."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Radek: ρ 0,0216 (měď při ~80 °C), v1 a v1.1"
    url: "docs/ROZHODNUTI.md"
    misto: "řádek 2026-11-16 „… ρ 0,0216 (měď při ~80 °C) je rozhodnutí odborníka.“; řádek „Kalkulačka průřezu v1.1 … platí výpočet v1 (ρ 0,0175 / 0,0216 …)“; řádek „v1.1, změna 4 … (výpočet 0,7 a ρ 0,0216 beze změny)“; kód reference v1: rho = hot ? 0.0216 : 0.0175"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "NBS/NIST Handbook 100: Copper Wire Tables"
    url: "https://nvlpubs.nist.gov/nistpubs/Legacy/hb/nbshandbook100.pdf"
    misto: "PDF s. 9 a 10: α20 = 0,003 93 /°C (lineární v rozsahu 10–100 °C); PDF s. 15: vztah 1 / [1 + 0,003 93 (t − 20)] (popis tabulky 4)"
    datum-overeni: 2026-11-16
vypocet: "0,0216 / 0,0175 = 1,2343 → T = 20 + 0,2343 / 0,00393 = 79,6 °C. Kontrola přes „inferred absolute zero“ NIST (234,5 °C): (234,5 + 80) / (234,5 + 20) = 1,2358 → 0,0175 × 1,2358 = 0,02163. Vztaženo k ρ20 čisté mědi podle NIST (0,017241): 0,0216 / 0,017241 = 1,2528 → 84,3 °C. Přepočteno v Node."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Karta byla `k-prezkoumani` s tvrzením ρ 0,0236 (verze 2, 0,0191 přepočtené na 80 °C). Ve v1.1 platí ρ 0,0216 v režimu „Ve svazku“ (rozhodnutí Radka). Tvrzení, hodnota a výpočet jsou přepsané, 0,0236 zůstává jen jako historie níž. Zdroj: rozhodnutí odborníka a NIST α20. Stav `navrh`, `overil` vynulováno.

Ve v1.1 se teplý přepočet týká jen svazku. Motorový prostor kalkulačka nepočítá, pod volbami je jen text (K-VODIC-0035).

### Historie (před přepisem na v1.1)

**1. vrácení: co se změnilo.** Karta byla pro v1 `overeno` (tvrzení ρ = 0,0216 v režimu svazek / motorový prostor). Verze 2 počítá s 0,0236, tvrzení se mění, proto stav zpět na `navrh`. Nové: hodnota 0,0236 s postupem 0,0191 × 0,0216 / 0,0175; zdroj čísla 0,0216 je teď `rozhodnuti-odbornika` (Radek 16. 11. 2026). Formální opravy z nálezu: místo NIST pro teplotní vztah opraveno na PDF s. 15; `rozsah` ve °C odstraněn (teplota je jen v podmínkách a výpočtu).

Teplota ~80 °C je nad dovolenou teplotou vodiče 70 °C, ze které vychází koeficient 0,5 pro motorový prostor (K-VODIC-0004). Pro úbytek je to konzervativní volba.

**Nepoužito od 2. kola 16. 11. 2026.** Radek ve 2. kole rozhodl, že teplý přepočet na 80 °C se ve verzi 2 nepoužije (docs/ROZHODNUTI.md: „Teplý přepočet na 80 °C se ve verzi 2 nepoužije.“). Svazek počítá s odporem podle průřezu jako ostatní uložení (K-VODIC-0001, K-VODIC-0037), motorový prostor se nepočítá (K-VODIC-0035). Karta zůstává jako historie ve stavu `k-prezkoumani`, čísla v ní platila pro 1. kolo verze 2; neověřuje se.

**Poznámka mistra (16. 11. 2026):** ve v1.1 platí ρ 0,0216 pro režim „Ve svazku“ (rozhodnutí odborníka, měď asi 80 °C). Karta se přepíše na v1.1 podle zadání v docs/STAV.md (Zadání pro rešeršéra), 0,0236 jde do historie. Do přepsání zůstává k-prezkoumani.
