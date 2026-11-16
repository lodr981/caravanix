---
id: K-LEKCE-0012
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Účinnost indukční plotýnky (teplo ve vodě ÷ odebraná elektřina) je ve výpočtu předpoklad 85 %; laboratorní test EPRI naměřil u dvou indukčních vařičů 75–78 %, takže skutečná spotřeba na ohřev vody může být asi o 10 % vyšší, než kalkulačka ukáže s 85 %."
hodnota: 0.85
jednotka: "účinnost (předpoklad zadání)"
rozsah: [0.75, 0.85]
podminky: "Ohřev vody v hrnci na indukci (EPRI: ohřev z 21 na 93 °C, velký i malý hrnec, poloviční i plný výkon). Účinnost měniče se počítá zvlášť (K-VODIC-0019). Kalkulačka vaření ji ukáže a dovolí změnit (ucinnostVareni). Měrné teplo vody 4,186 kJ/(kg·K) a 1 l = 1 kg jsou fyzikální konstanty (zaokrouhleno, voda kolem 15–100 °C)."
zdroje:
  - typ: test
    nazev: "M. Sweeney, J. Dols, B. Fortenbery, F. Sharp (EPRI): Induction Cooking Technology Design and Assessment, ACEEE Summer Study on Energy Efficiency in Buildings 2014"
    url: "https://www.aceee.org/files/proceedings/2014/data/papers/9-702.pdf"
    misto: "s. 9-373, Table 2 Cooking efficiency results: Induction Cooker A 74,9 / 77,6 / 76,5 / 77,4 %, Induction Cooker B 75,7 / 77,2 / 75,6 / 75,1 % (velký a malý hrnec, poloviční a plný výkon); s. 9-374: indukce při plném výkonu 76–77 %; abstrakt: výrobci uvádějí až 90 %"
    datum-overeni: 2026-11-16
vypocet: "Teplo na 1 l z 15 na 100 °C: 1 × 4,186 × 85 ÷ 3,6 = 98,8 Wh. Z baterie s měničem 90 %: s 85 % 98,8 ÷ (0,85 × 0,9) = 129,2 Wh; s 77 % 142,6 Wh (+10,4 %). Na 2 304 Wh (200 Ah, 12,8 V, 90 %): 17,8 l s 85 %, 16,2 l s 77 %. Přepočteno v Pythonu."
pouzito-v: [lekce-6-vareni-na-indukci, kalkulacka-vareni]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0012-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Pro 85 % jsem nenašel nezávislý test; je to hodnota z příkladu v zadání a z marketingu výrobců („až 90 %“). Jediný laboratorní test, který jsem otevřel (EPRI, nezávislý výzkumný ústav energetiky), dává 75–78 %.

**Test podstatnosti:** rozdíl mění jen odhad energie (o kolik litrů nebo jídel baterie stačí), ne kabel, pojistku ani proud: funkce `kolikUvarim` počítá proud a jídla z příkonu plotýnky, účinnost indukce vstupuje jen do litrů vody. Na nebezpečné straně to není. Je to ale číslo ve výpočtu, které přeceňuje výsledek asi o 10 %. Doporučuji mistrovi zvážit výchozí 80 % (nebo 77 % podle EPRI); do rozhodnutí nechávám 85 % ze zadání. Zadání ani kód neměním.
