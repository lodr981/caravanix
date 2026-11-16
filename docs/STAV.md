# Stav (rychlá alfa, 16. 11. 2026; podrobný dřívější stav je v historii gitu)

1. **Adresa:** `npm install`, `npm run dev`, pak http://localhost:4321/cs/ – kalkulačka `/cs/kalkulacka-prurezu/`, lekce `/cs/lekce/jaky-kabel-12v/` a `/cs/lekce/pojistka-chrani-kabel/`.
2. **Funguje:** kalkulačka průřezu v1.1 (golden test, 716/716 testů, stav v URL, sdílení odkazem), design Dílna (designér schválil), řez jádrem ve skutečné velikosti, zatížení kabelu, značka hranice délky na posuvníku, 2 lekce propojené s kalkulačkou; 15 karet třídy A schváleno (krok 0).
3. **Chybí:** ostatní kalkulačky alfy (soběstačnost, spotřebiče a vaření, baterie, solár, booster, měnič), dalších 8 lekcí, nápady A 4–6 (nákupní lístek, obrázek ke sdílení, „Mám kabel“).
4. **Odloženo:** Lighthouse (Chrome se ze `npx lighthouse` nespustí, `spawn UNKNOWN`, 2 pokusy); `.claude/settings.json` z archivu rychlé alfy nezkopírován (úprava oprávnění, vloží Radek ručně).
5. **Rozhodnuto bez ptaní:** kalkulačka přesunuta na `/cs/kalkulacka-prurezu/` s přesměrováním ze staré adresy; zatížení kabelu (proud ÷ max. pojistka, ve v1.1 vždy ≤ 0,8) ve stupních „velká rezerva / přiměřeně / blízko hranice“.
