---
id: K-LEKCE-0006
trida: A
stav: overeno
plati-pro-zeme: [vse]
tvrzeni: "K solárnímu regulátoru se nejdřív připojuje baterie, potom panely; odpojuje se obráceně: nejdřív panely, potom baterie."
hodnota: null
jednotka: null
rozsah: null
podminky: "Solární regulátory MPPT (zdroj: Victron SmartSolar 75/10 až 100/20). Výjimka u Victronu: panely smí být připojené dřív jen tehdy, když je napětí systému nastavené ručně. Platí podle návodu konkrétního regulátoru."
zdroje:
  - typ: navod
    nazev: "Victron Energy: SmartSolar MPPT 75/10 up to 100/20, manual"
    url: "https://www.victronenergy.com/media/pg/Manual_SmartSolar_MPPT_75-10_up_to_100-20/en/installation.html"
    misto: "4.6 Connection sequence: krok 1 připojit baterii (regulátor rozpozná napětí systému, počkat 10 s), krok 4 připojit panely; PV dřív jen při ručně nastaveném napětí; nedodržení postupu může regulátor nebo instalaci vyřadit či poškodit. Kap. 8.12.10 (troubleshooting.html): postup „First, disconnect the solar panels and then disconnect the battery.“"
    datum-overeni: 2026-11-16
vypocet: ""
pouzito-v: [lekce-8-panely-serie-paralela, montazni-postup, karta-nastaveni]
obrazky: []
autor: reserser
overil: docs/karty/nalezy/K-LEKCE-0006-2026-11-16.md
schvalil: null
---

Poznámky rešeršéra:

Pořadí připojení je v návodu výslovně (4.6). Pořadí odpojení stojí na postupu z kap. 8.12.10 (řešení chyby 38), ne na obecném pravidle; obrácené pořadí je běžná praxe a je na bezpečné straně.

**Nedoloženo:** věta ze zadání „Regulátor pod sluncem bez baterie může poškodit sebe i spotřebiče. Totéž způsobí BMS, které při nabíjení odpojí.“ V návodu Victron jsem ji nenašel; ten uvádí jen obecně, že nedodržení postupu může regulátor poškodit. Na fóru Victron popisuje uživatel poškozený regulátor po připojení baterie pod sluncem, to je anekdota. Lekce by do doložení měla říkat jen „nedodržení pořadí může regulátor poškodit (návod výrobce)“.
