# Booster za jízdu: proč ne 100 % a kolik reálně dobije

Rešerše 17. 11. 2026 na Radkovu otázku. Karty: `K-BOOST-0001` (koeficient 0,7 pod 90 %), `K-BOOST-0002` (koeficient 0,2 nad 90 %), obě třída B, stav `navrh`. Bezpečnostní pravidlo „lithium jen přes booster“ zůstává v `K-LEKCE-0001`.

## Proč booster nedává trvale jmenovitý proud

1. **Nabíjecí profil LiFePO4.** Plný proud jen zhruba do 90 % nabití, potom absorpce s klesajícím proudem a udržování; čím plnější baterie, tím méně (CTEK D250SE návod, program Lithium; Votronic VCC 1212-30 návod s. 14).
2. **Teplota boosteru.** Výrobci v teple snižují proud: Victron Orion XS plný proud do 40 °C, nad tím −1,5 % na °C; CTEK D250SE 16 A při 30 °C a 13 A při 50 °C (jmenovitě 20 A); Renogy 40 A nad 45 °C −5 A na každé 2 °C; nad 60 °C vypínají (návody, technické údaje).
3. **Chytrý alternátor (Euro 5/6) a vypínání pod prahem napětí.** Booster nabíjí jen nad prahem a pod ním po prodlevě vypne, např. Orion XS vypíná pod 13,1 V po 1 min, CTEK pod 12,8 V (klasický alternátor) nebo 11,4 V (chytrý) po 10 s, Renogy pod 12,7 V; u Euro 6 napětí často spadne na klidových asi 12,6 V (Victron Orion XS 4.1, 4.4.6; CTEK spec.; Renogy 4.3).
4. **Volnoběh, kolony, slabý alternátor.** Booster nedá víc, než dodá alternátor, a alternátor na volnoběh dává jen asi 50 % výkonu; Votronic při poklesu napětí startovací baterie proud postupně snižuje (Victron Orion XS 5.2.6 a 5.4; Votronic s. 12).
5. **Rozjezd po startu a krátké jízdy.** Booster po startu motoru čeká na napětí a výkon zvyšuje postupně (Orion XS: zpožděný start 13,3 V po 120 s; Votronic začíná s minimálním výkonem), takže krátká jízda dá poměrně málo (Victron 4.4.6; Votronic s. 12–13).
6. **Úbytek na kabelech.** Tenký nebo dlouhý kabel na vstupu snižuje napětí pod práh (Votronic: plný výkon bez D+ jen při aspoň 13,3 V na svorkách, tedy velké průřezy), na výstupu prodlužuje nabíjení (Votronic s. 7–8; Victron Orion XS 5.2.4).

**Měření:** promobil (11. 6. 2024), LiFePO4 200 Ah (měřeno 226 Ah), z 50 %, 3 h dálnice, Victron Orion-Tr 30 A: konec 85 %, tedy asi 79 Ah, průměr 26,4 A = **0,88** jmenovitého proudu. Dva boostery (60 A): 113 Ah za 2 h 12 min = **0,86**; proud klesl z 60 A na 48 A během 50 min. To je nejlepší případ (dálnice, baterie z poloviny).

## Navržený model

Průměrný proud boosteru = jmenovitý proud × koeficient:

| Stav baterie | Koeficient (výchozí) | Rozsah | Karta |
|---|---|---|---|
| pod asi 90 % | **0,7** | 0,5 (město, kolony, horko, chytrý alternátor) – 0,9 (dálnice, chladno) | K-BOOST-0001 |
| 90–100 % | **0,2** | 0,1–0,5 | K-BOOST-0002 |
| plná (100 %) | 0 (jen napájí spotřebiče za jízdy) | – | K-BOOST-0002 |

- **Kalkulačka boosteru (oddíl E)** stav baterie nezná: `AhDenne = proudBoosteruA × hodinJizdyDenne × 0,7`, `WhDenne = AhDenne × Unom`. Koeficient ukázat jako předpoklad, dát změnit; text: u téměř plné baterie dobije booster méně.
- **Soběstačnost (oddíl G)**: buď stejně jednoduše `boosterWhDen = proudBoosteruA × hodinDenne × 0,7 × Unom` (strop „baterie plná“ simulace už má), nebo přesněji po dvou úsecích: do 90 % koeficient 0,7, nad 90 % koeficient 0,2, nejvýš do plna. Rozdíl mezi variantami je nejvýš asi 10 % kapacity u téměř plné baterie, nejde o bezpečnost. Rozhodne mistr; jde o změnu výpočtu, takže schválení Radka.
- Model je na bezpečné straně: pro test promobilu (226 Ah z 50 %, 30 A, 3 h) dává 63 Ah, změřeno asi 79 Ah.

## Příklady

Booster 30 A, baterie LiFePO4 100 Ah, 12 V systém (Unom 12,8 V), dvouúsekový model (0,7 do 90 %, 0,2 nad 90 %, strop 100 %). Spočítáno kódem (Node).

| Jízda | Start | Dobito | Konec | Pro srovnání „30 A × hodiny“ |
|---|---|---|---|---|
| 1 h | 30 % | **21,0 Ah = 269 Wh** | 51 % | 30 Ah = 384 Wh |
| 3 h | 30 % | **60,9 Ah = 779 Wh** | 91 % | 90 Ah = 1 152 Wh |
| 3 h | 70 % | **30,0 Ah = 384 Wh** (baterie plná) | 100 % | 90 Ah = 1 152 Wh |

Pro větší baterii 200 Ah: 3 h z 70 % → 46,6 Ah = 596 Wh (konec 93 %); 1 h z 30 % → 21,0 Ah = 269 Wh. Jednoduchý model jen s 0,7 dá u prvních dvou řádků 21,0 Ah a 63,0 Ah, u třetího také strop 30 Ah.

## Co se nepodařilo

Redarc a Sterling: stránky výrobce nešly otevřít; z vyhledávání jen signál, že také snižují proud v teple (Redarc nad 55 °C vnitřní teploty, vypíná nad 80 °C). Schaudt WA 121525: čísla ke snížení proudu nedohledána. Měření v městském provozu ani s chytrým alternátorem v našich zdrojích není; koeficient 0,7 je úsudek zaokrouhlený dolů z dálničního měření 0,86–0,88.
