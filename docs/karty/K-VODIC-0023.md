---
id: K-VODIC-0023
trida: C
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Mínus přes kostru je v autě běžný, ale každý spoj na kostře přidává odpor; bod musí být očištěný na holý kov a u lednice, měniče a nabíječky je lepší vlastní mínusový kabel. Kalkulačka počítá s mínusem přes kostru bez odporu spojů."
hodnota: null
jednotka: null
rozsah: null
podminky: "Vozidla s kovovou karoserií jako zpětným vodičem."
zdroje:
  - typ: navod
    nazev: "Secop: Instructions BD35F/BD50F/BD35K/BD80CN electronic unit 101N0242/0680/0682, 12–24 V DC (06/2022)"
    url: "https://www.secop.com/fileadmin/user_upload/technical-literature/electronic-units-instructions/bd35f_bd50f_bd35k_bd80cn_electronic_unit_101n0242_101n0680_101n0682_12-24vdc_06-2022_desi101x202.pdf"
    misto: "Power supply: elektronika kompresoru se připojuje vždy přímo na póly baterie; vyhnout se dalším spojům"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.5 Connection resistance: každý spoj má odpor, čistý a pevný spoj má menší odpor; 2.7: příklad každý kabelový spoj ≈ 0,06 mΩ"
    datum-overeni: 2026-11-16
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "hláška při zpětném vodiči přes kostru; kód Lc = L × ret (ret = 1)"
    datum-overeni: 2026-11-16
vypocet: "Kalkulačka při mínusu přes kostru počítá jen délku plusového vodiče (×1). Ilustrace: odpor kostry a dvou spojů 2 mΩ při 20 A = 0,04 V navíc (0,33 % z 12 V)."
pouzito-v: [kalkulacka-prurez, lekce-kabel]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

„U lednice … je lepší vlastní mínusový kabel“ doložuje návod Secop (přímo na póly baterie). Pro měnič a nabíječku konkrétní návod výrobce jsem neotevřel; Victron obecně doporučuje krátké a přímé spoje. Odpor kostry samotné jsem v žádném zdroji nenašel – ilustrační výpočet je předpoklad, ne zdroj.

Kalkulačka správně upozorňuje, že odpor spojů nezahrnuje (hláška). Odpor spojů na kostře je ve skupině B nápadů (mimo alfu).
