---
id: K-VODIC-0023
trida: C
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "Kostra vozu slouží jako zpětný vodič, ale každý spoj přidává odpor: kostřicí bod musí být čistý, bez laku a koroze a pevně dotažený; kompresorovou lednici výrobce připojuje vlastními kabely přímo na póly baterie. Kalkulačka při mínusu přes kostru odpor kostry a spojů nepočítá."
hodnota: null
jednotka: null
rozsah: null
podminky: "Vozidla s kovovou karoserií jako zpětným vodičem; uložení „mínus přes kostru“ v kalkulačce verze 2 (násobek délky 1, hláška MINUS_PRES_KOSTRU). Pro měnič a nabíječku vlastní mínusový kabel v kartě doložen není."
zdroje:
  - typ: clanek
    nazev: "I-CAR: Back-To-Basics: Painted Grounds (26. 9. 2019)"
    url: "https://rts.i-car.com/collision-repair-news/back-to-basics-painted-grounds.html"
    misto: "celý článek: obvody vozidla 12 V potřebují dobrou kostru a s přibývající elektronikou přibývá kostřicích bodů; přelakovaný kostřicí bod je častá příčina špatného kontaktu; lepidla a těsnicí hmoty karoserie jsou izolanty"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.5 Connection resistance: odpor spoje závisí na kvalitě a ploše, pevný spoj má menší odpor; 2.7: příklad každý kabelový spoj ≈ 0,06 mΩ; 2.8: kontakty čisté a nezkorodované"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Secop: Instructions BD35F/BD50F/BD35K/BD80CN electronic unit 101N0242/0680/0682, 12–24 V DC (06/2022)"
    url: "https://www.secop.com/fileadmin/user_upload/technical-literature/electronic-units-instructions/bd35f_bd50f_bd35k_bd80cn_electronic_unit_101n0242_101n0680_101n0682_12-24vdc_06-2022_desi101x202.pdf"
    misto: "Power supply: elektronika se připojuje vždy přímo na póly baterie; vyhnout se dalším spojům, aby úbytek neovlivnil ochranu baterie"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Radek: výpočet verze 2, uložení „kostra“ a hláška MINUS_PRES_KOSTRU"
    url: "docs/KALKULACKA_PRUREZU.md"
    misto: "kapitola Verze 2, tabulka Uložení (kostra: násobek délky 1) a Výpočet bod 10"
    datum-overeni: 2026-11-16
vypocet: "Kalkulačka při mínusu přes kostru počítá jen délku plusového vodiče (n = 1). Odpor kostry a spojů nezahrnuje; číselnou hodnotu odporu kostry jsem v žádném zdroji nenašel, proto karta žádné číslo netvrdí."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-VODIC-0023-2026-11-16-kolo2.md
schvalil: null
---

Poznámky rešeršéra:

**1. vrácení: co se změnilo.** Tvrzení zúženo na doložené části. (1) „Mínus přes kostru je v autě běžný“ nahrazeno „kostra slouží jako zpětný vodič“ se zdrojem I-CAR (dohledal ověřovatel, otevřel jsem). (2) „Očištěný na holý kov“ nahrazeno „čistý, bez laku a koroze, pevně dotažený“ (I-CAR: lak a těsnicí hmoty izolují; Victron: čisté, nezkorodované, pevné spoje). (3) „U měniče a nabíječky je lepší vlastní mínusový kabel“ vypuštěno, zdroj se nenašel (návod Victron Phoenix řeší uzemnění skříně, ne mínus přes kostru). Zůstává jen lednice (Secop). (4) Ilustrační výpočet 2 mΩ odstraněn, neměl zdroj.

Text webu („Praktické tipy“) musí autor zúžit stejně; vlastní mínus u měniče a nabíječky by potřeboval nový zdroj (návod výrobce).
