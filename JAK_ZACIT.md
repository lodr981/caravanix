# Jak rozjet Caravanix v Claude Code

## Co potřebujete na PC

- Git
- Node.js v aktuální LTS verzi (22 nebo 24)
- Claude Code

## Postup

1. Rozbalte archiv do nové složky, třeba `Projekty/caravanix`.
2. V té složce založte git a první commit:
   ```
   git init
   git add .
   git commit -m "Zadání, agenti a reference kalkulačky průřezu"
   ```
3. Ve složce spusťte `claude`.
4. Příkazem `/agents` zkontrolujte, že Claude Code vidí devět agentů: designer, reserser, overovatel, autor-zeme, kontrolor-zeme, technicke-seo, tester, ctenar-laik, strazce-licenci.
5. Vložte první zadání (níže).
6. Pak už jen sledujte `docs/STAV.md` (co je hotovo a co čeká na vás) a `docs/OTAZKY.md` (otázky označené [ČEKÁ NA RADKA]).

Na začátku si Claude Code řekne o povolení instalovat balíčky a prohlížeče pro Playwright. To je v pořádku.

## První zadání pro Claude Code

```
Přečti CLAUDE.md, potom docs/ZADANI.md (hlavně kapitoly První alfa, Tým agentů,
Ověřování obsahu, Průvodce zásadami a Kalkulačka soběstačnosti),
docs/KALKULACKA_PRUREZU.md a docs/design/ZADANI_DESIGNU.md.

Dávka 1:
1. Rozepiš alfu na úkoly do docs/STAV.md (kdo, vstup, výstup, kdy je hotovo).
2. Založ kostru monorepa podle CLAUDE.md. npm run dev musí ukázat prázdnou stránku /cs/.
3. Souběžně spusť:
   - designer: tři směry vzhledu do docs/design/smery/
   - tester: golden test kalkulačky průřezu proti referenci (teď bude padat, engine ještě není)
   - reserser: karty tvrzení z kalkulačky průřezu a návrh 10 lekcí pro alfu
   - strazce-licenci: domény a ochranné známky pro název Caravanix, licence PVGIS pro API
4. Přenes kalkulačku průřezu do packages/engine, dokud golden test neprojde.
5. Pošli karty z bodu 3 ověřovateli.
6. Zapiš souhrn do docs/STAV.md a zastav se. Chci vidět tři směry designu a vybrat jeden.
```

## Co schvalujete jen vy

Směr designu a vzor stránek, bezpečnostní karty (třída A), spory po druhém kole, brány alfy, placené služby a změny výpočtu kalkulačky průřezu. Všechno ostatní agenti řeší sami.
