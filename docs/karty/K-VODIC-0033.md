---
id: K-VODIC-0033
trida: B
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu (podle tabulky Littelfuse při 20 °C okolí 78–93 % jmenovité hodnoty v rozsahu 80–250 A, nejméně 225 A: 175 A). MEGA 300 A a víc je podle výrobce jen ochrana proti zkratu."
hodnota: 0.78
jednotka: "nejmenší podíl dovoleného trvalého proudu při 20 °C k jmenovité hodnotě (MEGA 80–250 A)"
rozsah: [0.78, 0.93]
podminky: "Littelfuse MEGA a MEGA Clear Top 32 V (0298), tabulka „typical derating“ s „Temperature Security Margin 20 %“. Při vyšší teplotě okolí je podíl ještě nižší (při 65 °C 66–78 %). MEGA 40 a 60 A (mimo ISO) nesnesou jmenovitý proud ani při −40 °C. 300–500 A „Short Circuit Protector only“. Ve v1.1 karta podkládá větu hlášky NAD_150A_MENIC „Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu.“ a důvod, proč v řadě FUSES není 300 A (K-VODIC-0010)."
zdroje:
  - typ: datasheet
    nazev: "Littelfuse: MEGA and MEGA Clear Top Fuse, Rated 32V (Revised 04/08/2024), kopie eicom.ru"
    url: "https://cdn.eicom.ru/media/PDF24/813744.pdf"
    misto: "s. 1: 40–250 A pro trvalý proud; 300–500 A „only for short circuit protection“; ISO 8820-5. s. 2: poznámky 1 (Not mentioned in ISO standards: 40 a 60 A) a 2 (Short Circuit Protector only: 300–500 A). s. 4: Temperature Table (−40, 0, 20, 65, 85, 110, 125 °C): 40 A 36/33/31/26/23/20/17; 60 A 50/45/43/36/32/27/24; 80 A 80/77/73/61/56/47/41; 100 A 100/97/91/76/69/58/51; 125 A 125/123/116/98/89/76/66; 150 A 150/143/135/114/103/87/76; 175 A 175/158/149/125/113/95/83; 200 A 195/176/166/140/127/107/94; 225 A 205/186/175/148/135/115/100; 250 A 243/220/207/175/158/134/117."
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: v1.1, změna 2 (bez 300 A) a změna 3 (hláška nad 150 A)"
    url: "docs/ROZHODNUTI.md"
    misto: "řádky 2026-11-16 „v1.1, změna 2 …“ a „v1.1, změna 3: nad 150 A navíc hláška „U měniče platí kabel a pojistka podle návodu výrobce měniče. Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu.““"
    datum-overeni: 2026-11-16
vypocet: "Podíl dovolený proud ÷ jmenovitá při 20 °C: 80 A 0,9125; 100 A 0,910; 125 A 0,928; 150 A 0,900; 175 A 0,851; 200 A 0,830; 225 A 0,778; 250 A 0,828 → 0,778 až 0,928 (78–93 %); 1 / 0,778 = 1,286 ≈ 1,29. Při 65 °C: 80 A 0,7625; 100 A 0,760; 125 A 0,784; 150 A 0,760; 175 A 0,714; 200 A 0,700; 225 A 0,658; 250 A 0,700 → 66–78 %. 40 A při 20 °C 0,775, 60 A 0,717. Při −40 °C 40 A 36 < 40, 60 A 50 < 60. Ve v1.1 se MEGA (nad 125 A, informativně) volí pro proud do 0,8 × jmenovitá: u 225 A je to 180 A, tabulka při 20 °C dovoluje 175 A; u 150, 175, 200 a 250 A je 0,8 × jmenovitá pod dovoleným proudem při 20 °C. Přepočteno v Node."
pouzito-v: [kalkulacka-prurez, pojistky-rodiny]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0033-2026-11-16-v11.md
schvalil: null
---

Poznámky rešeršéra:

**Přepis na v1.1: co se změnilo.** Karta je zúžená na to, co v1.1 používá: MEGA snese trvale méně než jmenovitou hodnotu (věta hlášky nad 150 A) a MEGA 300 A a víc je jen zkratová ochrana (důvod, proč v řadě není 300 A). Výběr podle I30 a poměry ke kalkulačce verze 2 jsou odstraněné, zůstávají jen v historii níž. `hodnota` je teď podíl 0,78 místo poměru 1,29, tedy totéž číslo obráceně (1 / 1,29 ≈ 0,78). Stav `navrh`, `overil` vynulováno.

Zadání mistra mělo „v rozsahu 80–250 A při 20 °C nejvýš asi 1 / 1,29 ≈ 78 %“. Přesně: 78 % je **nejméně** (MEGA 225 A), ostatní hodnoty snesou 83–93 %. Tvrzení proto uvádí rozsah 78–93 %. Věta hlášky „snese méně než svou jmenovitou hodnotu“ platí pro všechny hodnoty 40–250 A při 20 °C i 65 °C. Test podstatnosti: formulace, nepodstatné.

Poznámka (nepodstatné): pro proud 175–180 A dá kalkulačka pojistku 225 A, kterou tabulka MEGA při 20 °C dovoluje trvale jen do 175 A. Pojistka pak může zbytečně pálit, kabel tím ohrožen není (K-VODIC-0011). Uživatel nad 150 A navíc dostane hlášku, že u měniče platí návod výrobce.

### Historie (před přepisem na v1.1)

MEGA je z rodin v tomto úkolu jediná, která chrání proti přetížení v pásmu 150–250 A. Má ale nejhorší poměr: u 225 A je dovolený proud při 20 °C jen 175 A (1,286×). Na rozdíl od nožových pojistek MEGA nedává plný jmenovitý proud ani při −40 °C u 40, 60, 200, 225 a 250 A.

**2. kolo Radka 16. 11. 2026: co se změnilo.** Podle poznámky ověřovatele z kola 2: „40 a 60 A ještě víc“ nahrazeno „40 A prakticky stejně (1,29), 60 A víc (1,40)“ (40 A 1,290 proti 225 A 1,286). Doplněno, že 40 a 60 A nesnesou jmenovitý proud ani při −40 °C, a které hodnoty MEGA kalkulačka po 2. kole nabízí. Do `misto` celá tabulka 40–250 A (revize 04/08/2024, souřadnice slov). Tvrzení se mění formulací, stav zpět na `navrh`.

**Vrácení po 3. kole (nález K-VODIC-0033-2026-11-16-kolo3): co se změnilo.** (1) Odstraněna kontrola „f ≥ 1,25 × I“ označená jako v2 (pravidlo 1. kola, Verze 2 ho nahradila výběrem podle I30), i zmínka o „poměru 1,25 z verze 2“ v poznámce. (2) Tvrzení už neříká „má mít alespoň 1,29×“: poměry 1,29 / 1,52 popisují tabulku výrobce při 20 / 65 °C a karta odkazuje, že kalkulačka volí podle I30 (K-VODIC-0038), s příklady (130 A → 1,154×, 160 A → 1,25×, 172 A → MEGA 250 A). Do výpočtu doplněn poměr jmenovitá ÷ I30 nabízených MEGA (max 1,331 u 225 A). (3) „Řada FUSES v2“ nahrazena výčtem hodnot z tabulky výrobce. Čísla z datasheetu beze změny, vše přepočteno v Pythonu.

**Poznámka mistra (16. 11. 2026):** ve v1.1 karta podloží jen větu hlášky NAD_150A_MENIC „Pojistka MEGA snese při trvalé zátěži méně než svou jmenovitou hodnotu.“ a to, že MEGA 300 A je jen zkratová ochrana; výběr podle I30 je archiv v2. Přepis podle zadání v docs/STAV.md.
