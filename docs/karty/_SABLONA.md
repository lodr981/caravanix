---
id: K-0000                    # K-<oblast>-<číslo>, např. K-VODIC-0003
trida: A                      # A bezpečnost | B čísla | C rady a komfort
stav: navrh                   # navrh | overeno | schvaleno | publikovano | k-prezkoumani
plati-pro-zeme: [vse]         # [vse] nebo [cs], [de], ...
tvrzeni: ""                   # jedna věta, přesně co tvrdíme
hodnota: null                 # číslo, pokud jde o číselné tvrzení
jednotka: null
rozsah: null                  # např. [0.016, 0.018], když se zdroje liší
podminky: ""                  # kdy tvrzení platí (teplota, napětí, typ kabelu, typ baterie...)
zdroje:
  - typ: datasheet            # norma | navod | datasheet | test | clanek | rozhodnuti-odbornika
    nazev: ""
    url: ""
    misto: ""                 # strana, tabulka, odstavec
    datum-overeni: 2026-11-16
vypocet: ""                   # postup, pokud je hodnota odvozená
pouzito-v: []                 # např. [kalkulacka-prurez, lekce-pojistka]
obrazky: []                   # soubory obrázků, které tvrzení zobrazují
autor: reserser
overil: null                  # odkaz na nález SEDÍ v docs/karty/nalezy/
schvalil: null                # u třídy A Radek, datum
---

Poznámky rešeršéra: proč tento zdroj, co se nepodařilo dohledat, na co si dát pozor.
