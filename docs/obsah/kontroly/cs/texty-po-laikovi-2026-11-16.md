# Kontrola země cs: texty po čtenáři laikovi, 16. 11. 2026

Kontrolor: `kontrolor-zeme` (cs). Profil: `docs/profily/cs.md`. Výpočet a texty: `docs/KALKULACKA_PRUREZU.md`, kapitola „Verze 1.1: co platí“.

Kontrolovány změny z commitů c775040 a bfaf300 (`git diff 31cbbac HEAD -- content/`):

- `content/cs/kalkulacka-prurezu.json`
- `content/cs/lekce.json`
- `content/cs/web.json`
- `content/cs/lekce/pojistka-chrani-kabel.md`

## Verdikt: SCHVÁLENO

Nová vysvětlení neříkají víc, než říkají karty:

- Účinnost měniče (MENIC_OD_1000W): „asi 90 %, na 1 000 W bere spíš 1 100 W“ odpovídá K-VODIC-0019; „asi o 10 % vyšší příkon“ je stejný poměr jako příklad v kartě.
- Class T (hlavni.vysvetleni, lekce): pojistka u baterie s vypínací schopností pro zkratový proud baterie, i lithiové, odpovídá K-VODIC-0036 (Victron 4.6.1, Class T 20 kA).
- „aspoň 1,25×, tedy aspoň o čtvrtinu větší“: správně (K-VODIC-0011). Rozběhový proud a pomalá pojistka: K-VODIC-0015.
- „Každá odbočka na tenčí kabel má vlastní pojistku“: přesnější než dřívější „zúžení“, odpovídá K-VODIC-0014.
- Kostra jako kovová karoserie (K-VODIC-0023), samostatně = plus s vlastním mínusem nebo jen plus (K-VODIC-0004), FLRY a lanko (K-VODIC-0022), CCA asi o 60 % vyšší odpor (K-VODIC-0006), citlivé spotřebiče vypínají při nízkém napětí (K-VODIC-0016), délka +10–20 % (K-VODIC-0025), pojistka u baterie 17,5 cm (K-VODIC-0013).
- AWG: tabulka ukazuje nejbližší AWG (`nearestAwg`), výsledek první vyhovující AWG (`vodic.ts`); text `tab.note` to popisuje správně, včetně toho, že vyhovující AWG může mít menší plochu.
- Výchozí příklad (60 W, 5 m) a rozsah délky 0,2–20 m souhlasí s kódem (`VYCHOZI`, `DELKA_MIN/MAX`).
- Radkovy texty (HLAVNI_VEDENI, NAD_150A_MENIC, motorový prostor, předpoklad u výsledku, CCA, 17,5 cm) jsou beze změny.
- Volby „když nevíte, zvolte tuto“ (vlastní mínus, ve svazku) vedou na bezpečnou stranu výpočtu.

## Drobné opravy (provedeny v `kalkulacka-prurezu.json`, jen hodnoty)

1. `page.lead`: „lednice 60 W ve vzdálenosti 5 m od baterie“ → „lednice 60 W na 5 m kabelu od baterie“. Zadává se délka trasy kabelu, ne vzdálenost; „vzdálenost“ odporovala radě „ne vzdušnou čarou“.
2. `result.awgNone`: „V americkém značení AWG tu kabel nenajdete…“ → „Vhodný kabel v americkém značení AWG kalkulačka nenabízí, kupujte v mm²“. Tabulka AWG končí na 4/0 (107 mm²), větší AWG kabely ve skutečnosti existují; původní znění tvrdilo víc, a byla v něm zbytečná nezlomitelná mezera „AWG tu“.
3. `env.nsub`: „kabel vede sám“ → „kabel vedený zvlášť“ („vede“ šlo číst jako „vede proud“).
4. `how.5`: „NEC je americký předpis pro elektroinstalace.“ → „… pro elektroinstalace v budovách.“ Podle K-VODIC-0007 jde o stavební vodiče, ne o vozidla.
5. Typografie: nezlomitelná mezera po jednopísmenných předložkách a spojkách v `len.fieldLabel` („v metrech“) a `hlavni.vysvetleni` („a bezpečně“, „i zkrat“).

JSON ověřen parserem. Ostatní soubory (`lekce.json`, `web.json`, `pojistka-chrani-kabel.md`) beze změny, typografie i obsah v pořádku.

## Poznámky (nepodstatné, nic se nemění)

- Účinnost v K-VODIC-0019 je maximální; při plném zatížení a slabé baterii bývá nižší. „Asi o 10 %“ je v pořádku, rozdíl pár procent výsledek v řadě průřezů nemění.
- `tab.note` „vycházejí kratší než u vašeho výsledku“ platí pro stejný průřez (proud uživatele je nejvýš 0,8 × pojistka ≤ 0,8 × max. pojistka); i ve svazku zůstává délka uživatele delší (1,25 × 0,0175/0,0216 ≈ 1,01).
