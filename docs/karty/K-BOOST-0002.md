---
id: K-BOOST-0002
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Booster nabíjí baterii LiFePO4 plným proudem zhruba do 90 % nabití; nad 90 % proud klesá (absorpce, pak udržování), proto pro výpočet dobití nad 90 % počítáme průměrný proud = jmenovitý proud boosteru × 0,2 a u plné baterie (100 %) žádné další dobití."
hodnota: 0.2
jednotka: "bez jednotky (podíl jmenovitého proudu)"
rozsah: [0.1, 0.5]
podminky: "Obytná baterie LiFePO4 s BMS, nabíjecí program boosteru pro lithium. Hranice 90 % je přibližná (výrobci: „asi 90 %“). Platí jen pro výpočet, kde je stav nabití znám (simulace soběstačnosti). Pod 90 % platí K-BOOST-0001. Spotřebiče zapnuté za jízdy odebírají proud navíc a booster jim ho dodá i u plné baterie; to se počítá ve spotřebě, ne v dobití."
zdroje:
  - typ: navod
    nazev: "CTEK: D250SE / SMARTPASS 120S user manual (EN), D250SE charging program Lithium"
    url: "https://www.mygenerator.com.au/assets/images/resource/pdf/D250SE-manual-low-UK-EN.pdf"
    misto: "S. 12 tištěná: krok 2 Bulk – maximální proud do asi 90 % kapacity baterie; krok 3 Absorption – klesající proud až do 95 %; krok 4 Float a 5 Pulse – udržování 95–100 %."
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Votronic: VCC 1212-30 charging converter, operating instructions (EN), kopie Skanbatt"
    url: "https://skanbatt.no/files/public/e9e31a20-b994-471b-b753-139848dccdb7/d008dd2698d5373ab0902e7203d93acc310a36ce/VCC1212%20manual.pdf"
    misto: "S. 14: fáze I maximální proud, nabije asi 75 % (olovo), asi 90 % (LiFePO4); fáze U1 konstantní napětí, proud pomalu klesá; fáze U2 jen malý vyrovnávací proud. S. 11: program 4 LiFePO4 U1 = 14,4 V po 0,3–1 h, U2 = 13,8 V."
    datum-overeni: 2026-11-17
  - typ: navod
    nazev: "Victron Energy: Orion XS 12/12-50A DC-DC battery charger manual"
    url: "https://www.victronenergy.com/media/pg/Orion_XS_12-12-50A_DC-DC_battery_charger/en/troubleshooting---support.html"
    misto: "5.1.5: když je baterie plná, přestane nabíjet nebo proud výrazně sníží; 5.2.3: u téměř plné baterie proud snižuje."
    datum-overeni: 2026-11-17
vypocet: "Úsudek ze zdrojů, ne měření: nad 90 % zbývá do plna asi 10 % kapacity a proud v absorpci klesá z plného téměř k nule (Votronic: absorpce 0,3–1 h). Průměr přes tuto fázi je proto zlomek jmenovitého proudu; 0,2 je zvoleno na bezpečné straně (dobití spíš podceníme). Kontrola kódem (Node): baterie 100 Ah, booster 30 A, 3 h jízdy z 95 %: 0,2 × 30 A = 6 A, ale do plna chybí jen 5 Ah → dobito 5 Ah (strop 100 %)."
pouzito-v: [kalkulacka-sobestacnost]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-BOOST-0002-2026-11-17.md
schvalil: null
---

Poznámky rešeršéra:

**Proč tento zdroj.** Hranici „plný proud asi do 90 %“ uvádějí shodně dva výrobci boosterů (CTEK, Votronic) přímo pro lithiový program; Victron to potvrzuje slovně. Konkrétní průměrný proud v absorpci výrobci neuvádějí, závisí na velikosti baterie, nastaveném napětí a koncovém proudu. Hodnota 0,2 je proto úsudek; rozsah 0,1–0,5 pokrývá malou baterii s velkým boosterem (absorpce trvá déle vůči proudu) i velkou baterii s malým boosterem (proud zůstane vysoko skoro do plna).

**Test podstatnosti.** Nejde o bezpečnost. Ovlivní nejvýš asi 10 % kapacity a jen u téměř plné baterie. Pokud mistr rozhodne, že soběstačnost v alfě má zůstat bez stavu nabití, stačí jeden koeficient 0,7 z K-BOOST-0001 a strop „baterie plná“, který simulace už má (rozdíl nepodstatný, poznamenat).

**Návaznost na kalkulačku.** V oddílu G je kapacita počítána jako využitelná (`kapacitaAh × Unom × vyuzitelnost`). Hranici 90 % je přirozené vztáhnout k jmenovité kapacitě (`kapacitaAh × Unom`), ne k využitelné; o přepočtu rozhodne autor výpočtu, je to mimo rozsah karty.
