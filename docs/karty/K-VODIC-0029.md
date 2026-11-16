---
id: K-VODIC-0029
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Nožová pojistka Littelfuse ATOF (1–40 A) smí podle tabulky výrobce trvale nést při 20 °C okolí 90–100 % jmenovitého proudu podle hodnoty (nejméně 90 % u 20 a 30 A); při 20 °C okolí tedy podle tabulky stačí, je-li jmenovitý proud aspoň 1,11× trvalý proud, při 65 °C okolí aspoň 1,33×. Kalkulačka pojistku volí přímo podle této tabulky (dovolený proud při 30 °C, K-VODIC-0038), ne podle jednoho poměru."
hodnota: 1.11
jednotka: "poměr jmenovitý proud pojistky ÷ trvalý proud"
rozsah: [1.11, 1.33]
podminky: "Littelfuse ATOF / ATO Ag 32 V, hodnoty 1–40 A podle tabulky výrobce (1, 2, 3, 4, 5, 7,5, 10, 15, 20, 25, 30, 35, 40 A). Teplota okolí pojistky 20 °C (1,11) nebo 65 °C (1,33); při 85 °C až 1,50. Tabulka je „typical derating“ s „Temperature Security Margin 20%“ a vodiči podle ISO 8820-3; výrobce upozorňuje, že skutečné podmínky (svorky, průřez) ji mohou změnit. Hodnoty 1–4 A a 7,5 A jsou v tabulce zaokrouhlené na celé ampéry (řádek 7,5 A: 8/7/7/6/5/5/4 A, při −40 °C 8 A, tedy víc než jmenovitý proud); poměry u 7,5 A (1,071 při 20 °C, 1,250 při 65 °C, 1,500 při 85 °C) jsou zatížené zaokrouhlením. Poměry 1,11 a 1,33 popisují tabulku výrobce, nejsou to pravidla kalkulačky. Kalkulačka verze 2 nabízí ATOF 1, 2, 3, 5, 7,5, 10, 15, 20, 25, 30 A (4, 35 a 40 A ne) a volí nejmenší, jejíž dovolený proud při 30 °C (I30, interpolace 20–65 °C) je aspoň proud spotřebiče (K-VODIC-0038); poměr jmenovitá ÷ proud spotřebiče proto může vyjít menší než 1,11 (např. I = 3 A → ATOF 3 A, 1,00×; I = 9,5 A → ATOF 10 A, 1,05×)."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: ATOF Blade Fuses, Rated 32V (Revised 08/18/2022), kopie chipdip.ru"
    url: "https://static.chipdip.ru/lib/614/DOC034614307.pdf"
    misto: "s. 3, Temperature Table „max. allowed current load [A] at ambient temperature (typical derating)“, sloupce −40, 0, 20, 65, 85, 110, 125 °C; 1 A 1/1/1/1/1/1/1; 2 A 2/2/2/2/2/1/1; 3 A 3/3/3/3/2/2/2; 4 A 4/4/4/3/3/3/2; 5 A 5/5/5/4/4/3/3; 7,5 A 8/7/7/6/5/5/4; 10 A 10/10/10/8/7/6/5; 15 A 15/15/14/12/11/9/8; 20 A 20/19/18/15/14/12/10; 25 A 25/25/23/19/18/15/13; 30 A 30/29/27/23/21/18/15; 35 A 35/35/35/29/27/22/19; 40 A 40/39/37/31/28/24/20 (čteno podle souřadnic slov). s. 1: popis „protecting low-voltage circuits“, Complies with SAE J1284, ISO 8820-3; Interrupting Rating 1000 A @ 32 VDC. s. 3 Time-Current: 110 % → 360 000 s / ∞ jen pro 1–30 A, pro 35 a 40 A při 100 %."
    datum-overeni: 2026-11-16
vypocet: "Poměr = jmenovitý ÷ dovolený proud. 20 °C: 1 A 1,000; 2 A 1,000; 3 A 1,000; 4 A 1,000; 5 A 1,000; 7,5 A 1,071; 10 A 1,000; 15 A 1,071; 20 A 1,111; 25 A 1,087; 30 A 1,111; 35 A 1,000; 40 A 1,081 → max 1,111. 65 °C: 1, 2, 3 A 1,000; 4 A 1,333; 5 A 1,250; 7,5 A 1,250; 10 A 1,250; 15 A 1,250; 20 A 1,333; 25 A 1,316; 30 A 1,304; 35 A 1,207; 40 A 1,290 → max 1,333 (4 A a 20 A). 85 °C max 1,500 (3 A, 7,5 A). Podíl dovoleného proudu při 20 °C: 1, 2, 3, 4, 5, 10, 35 A 100 %; 7,5 A 93,3 %; 15 A 93,3 %; 20 A 90,0 %; 25 A 92,0 %; 30 A 90,0 %; 40 A 92,5 % → 90–100 %. Pro srovnání s kalkulačkou (K-VODIC-0038): poměr jmenovitá ÷ I30 u nabízených ATOF 1,000 (1, 2, 3 A) až 1,154 (20 A). Přepočteno v Pythonu (data z tabulky výrobce a z pojistky.json)."
pouzito-v: [kalkulacka-prurez, pojistky-rodiny]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0029-2026-11-16-kolo4.md
schvalil: null
---

Poznámky rešeršéra:

Podklad k rozhodnutí o typu pojistky (`docs/karty/POJISTKY_RODINY.md`). Výpočet nemění.

Web Littelfuse vrací 403, použil jsem kopii datasheetu u distributora (stejná revize, kterou cituje K-VODIC-0010/0011). Tabulku jsem vytáhl `pdftotext -layout` a zkontroloval po řádcích.

Pozor: „Temperature Security Margin is 20%“ výrobce nevysvětluje. Neříkám, zda je v tabulce 20% rezerva už započtena.

**1. vrácení (kolo 2) a 2. kolo Radka 16. 11. 2026: co se změnilo.** Podle nálezu kola 2: (1) „smí nejvýš asi 90 %“ nahrazeno „90–100 % podle hodnoty (nejméně 90 % u 20 a 30 A)“; tabulka dovoluje u 1, 2, 3, 5, 10 a 35 A plných 100 %. (2) Zaokrouhlení doplněno i pro řádek 7,5 A. (3) Do `misto` celá tabulka (všechny řádky, podle souřadnic slov). V podmínkách nově, které hodnoty ATOF kalkulačka po 2. kole nabízí. Poměr 1,11 / 1,33 se nemění. Je to 1. vrácení této karty.

**Vrácení po 3. kole (nález K-VODIC-0029-2026-11-16-kolo3): co se změnilo.** Je to 2. vrácení této karty; další NESEDÍ jde podle pravidel k Radkovi. (1) Do výpočtu doplněn řádek 4 A: při 20 °C 1,000 (100 %), při 65 °C 4 / 3 = 1,333, tedy maximum 1,333 mají 4 A a 20 A. (2) Odstraněna kontrola „f ≥ 1,25 × I“ označená jako v2; je to pravidlo 1. kola, které Verze 2 nahradila výběrem podle I30. (3) Tvrzení už neříká „má proto být alespoň 1,11×“: poměry 1,11 / 1,33 popisují tabulku výrobce (při 20 °C stačí 1,11×) a karta odkazuje, že kalkulačka volí podle I30 (K-VODIC-0038), s příklady, kdy kalkulačka dá poměr menší (3 A → 1,00×, 9,5 A → 1,05×). (4) „Řada FUSES v2“ nahrazena výčtem hodnot z tabulky výrobce a výčtem nabízených hodnot z `pojistky.json`. Čísla z datasheetu beze změny, vše přepočteno v Pythonu.
