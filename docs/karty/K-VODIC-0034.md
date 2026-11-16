---
id: K-VODIC-0034
trida: B
stav: k-prezkoumani
plati-pro-zeme: [vse]
tvrzeni: "Obecné pravidlo Littelfuse „pojistku zatěžovat při 25 °C nejvýš na 75 % jmenovitého proudu“ (poměr 1,33) platí pro pojistky zkoušené podle UL/CSA/ANCE 248-14; automobilové pojistky ATOF, MINI, MAXI, MIDI a MEGA mají vlastní tabulky dovoleného proudu."
hodnota: 1.33
jednotka: "poměr jmenovitý proud pojistky ÷ trvalý proud"
rozsah: null
podminky: "Fuseology Design Guide se týká pojistek pro elektroniku a doplňkovou ochranu (UL/CSA/ANCE 248-14); automobilové rodiny v něm nejsou. Pro automobilové pojistky platí tabulky v jejich datasheetech (K-VODIC-0029 až 0033)."
zdroje:
  - typ: navod
    nazev: "Littelfuse: Fuseology Design Guide (© 2022)"
    url: "https://info.littelfuse.com/hubfs/Fuseology%20Design%20Guide.pdf"
    misto: "PDF s. 3, odstavec Rerating (75 % při 25 °C, zkušební podmínky podle UL/CSA/ANCE 248-14); PDF s. 4, Fuse Selection Checklist, bod 1 Normal Operating Current (derating 25 %, příklad 10 A → nejvýš 7,5 A) a bod 3 Ambient Temperature (jmenovitý proud = provozní ÷ (0,75 × procento podle teploty))"
    datum-overeni: 2026-11-16
vypocet: "1 / 0,75 = 1,333. Příklad průvodce: 1,5 A ÷ 0,75 = 2,0 A; při 75 °C a 80 %: 1,5 ÷ (0,75 × 0,80) = 2,5 A."
pouzito-v: [pojistky-rodiny]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0034-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

Karta je tu proto, aby se pravidlo 75 % nepoužilo omylem jako „doporučení Littelfuse pro automobilové pojistky“. Pro ně Littelfuse dává vlastní tabulky. Podle nich při 20 °C stačí 1,07–1,29 (bez MEGA 40 a 60 A), v teple víc. V průvodci jsem žádnou zmínku o ATOF, MINI, MAXI, MIDI ani MEGA nenašel.

**Poznámka mistra (16. 11. 2026):** archiv v2, nepoužito ve v1.1 (docs/reset/KALKULACKA_V1_1.md; tabulky pojistek a odporu podle průřezu jsou v docs/ZASOBNIK.md). Dál se neověřuje ani neschvaluje. Zdroje z karty smí rešeršér převzít do karet v1.1.
