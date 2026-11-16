# Rozhodnutí

Tento soubor mění jen Radek. Agenti ho čtou a řídí se jím.

| Datum | Rozhodnutí |
| --- | --- |
| 2026-11-16 | Caravanix je průvodce a podklad pro montáž, ne revize ani podepsaný projekt. |
| 2026-11-16 | Výpočty dělá deterministický engine, AI jen vede rozhovor a vysvětluje. |
| 2026-11-16 | Každé publikované tvrzení má kartu, ověřenou nezávislým ověřovatelem. Bezpečnostní karty (třída A) schvaluje Radek. |
| 2026-11-16 | První alfa: česká příručka a kalkulačky, lokálně na Radkově PC. Němčina, polština a angličtina následují, architektura s nimi počítá. |
| 2026-11-16 | Dvě cesty doporučení: Optimum a Levně. Bezpečnost a spolehlivost mají stejnou. |
| 2026-11-16 | Kalkulačka průřezu: logika schválená 11. 11. 2026 (reference v `docs/reference/`), v alfě dostane nový design a nápady skupiny A. |
| 2026-11-16 | Katalog spotřebičů z datasheetů a štítků typických modelů. Vlastní měření zatím ne. |
| 2026-11-16 | Technické obrázky jsou vlastní SVG. Scény a maskota generuje Radek v Le Chatu podle zadání designéra. Fotky vlastní. |
| 2026-11-16 | Vzhled luxusní, ale ne okázalý, pro lidi 20–80 let. Designér má právo veta. |
| 2026-11-16 | Odkazy do e-shopů zatím bez provize. |
| 2026-11-16 | Tým: hlavní vlákno a devět subagentů podle `CLAUDE.md`. Agenti zemí pracují s profilem země. |
| 2026-11-16 | Design: směr 1 Dílna s tmavým „displejem“ výsledku ze směru 3. Musí působit draze a klidně, ne rustikálně ani retro; jinak zpět ke směru 3. |
| 2026-11-16 | Akcent: tmavší, hnědější měď na text, odkazy a tlačítka (text na tlačítku alespoň 7 : 1). Jasnější měď jen na velké plochy, ikony a ilustrace (alespoň 3 : 1 proti pozadí). |
| 2026-11-16 | Světlý a tmavý režim: výchozí podle zařízení, viditelný přepínač v hlavičce, volba v localStorage, žádná cookie. |
| 2026-11-16 | Repozitář: soukromý `github.com/lodr981/caravanix`, commity s GitHub noreply e-mailem. Push až po Radkově souhlasu. |
| 2026-11-16 | Kalkulačka průřezu, nápady skupiny A: zařadit 1–6 (řez kabelem, zbarvení podle zatížení, posuvník se značkou, nákupní lístek, karta ke sdílení, „Mám kabel“). Nápad 7 až po schválení karet spotřebičů. |
| 2026-11-16 | Kalkulačka průřezu, výpočet verze 2 (body 7–11 Radkových odpovědí, podrobně `docs/KALKULACKA_PRUREZU.md`): ρ 0,0191 a 0,0236, uložení se čtyřmi volbami (vedle sebe 0,8; mínus přes kostru 1,0; svazek 0,53; motorový prostor 0,5), pojistka ≥ 1,25 × proud do rešerše Littelfuse, bez 300 A, mez rozsahu z tabulky pojistek. Reference v1 zůstává jako historie. |
| 2026-11-16 | Svazek počítá s ρ pro 80 °C (0,0236) jako motorový prostor. Mínus přes kostru jen u volby „jeden vodič“, svazek a motorový prostor vždy s vlastním mínusem. |
| 2026-11-16 | 5 % úbytek a stropy CAPN/CAPH jsou rozhodnutí odborníka (Radek). ρ 0,0216 (měď při ~80 °C) je rozhodnutí odborníka. |
| 2026-11-16 | Texty průřezu: rychlý vzorec 10 × A ÷ I vypustit; CCA nedoporučovat (asi o 60 % vyšší odpor, vodivost zhruba o třetinu nižší, do vozu jen čistá měď); pojistka u baterie „co nejblíž, nejvýš 17,5 cm“ podle ABYC E-11. |
| 2026-11-16 | Název Caravanix držíme, pokud je volná caravanix.eu (Radek pak ručně zkontroluje TMview a zaregistruje .eu, .cz, .pl; němčina na .eu/de/). Jinak pět alternativ s ověřenými doménami. Právník až před betou s platbami. |
| 2026-11-16 | PVGIS: předpočítaná statická tabulka, žádné živé API. Alfa: ČR v mřížce 0,25°, později Evropa 0,5°. Vodorovně (dodávka) a 35° na jih (chata), 1 kWp, ztráty 0 %; ztráty dopočítá engine z vlastních karet. Zdroj „PVGIS © Evropská unie“. |
| 2026-11-16 | Technologie potvrzené: Astro s React ostrůvky, TypeScript, npm workspaces. |
