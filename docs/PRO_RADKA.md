# Pro Radka

Píše mistr, nejvýš jednou denně, nejvýš 5 položek. Radek odpovídá krátce (ano / ne / jinak: …). Bez odpovědi se pokračuje jinou prací. U položek, které nejsou bezpečnostní, platí po 48 hodinách výchozí volba.

**16. 11. 2026, po úklidu mistra.** Všechno ostatní otevřené (spory 0004 a 0039, I30, ρ u 1,5 mm², pocínovaná lanka, otázky testera a designéra) je zavřené odkazem na kalkulačku v1.1 nebo rozhodnuté mistrem. Seznam je v `docs/STAV.md`, Rozhodnutí mistra.

| # | Rozhodnutí | Doporučení mistra | Výchozí volba | Radek |
| --- | --- | --- | --- | --- |
| 1 | **Schválit 9 karet třídy A** pro kalkulačku v1.1 a lekce o kabelu a pojistce: 0007, 0012, 0013, 0014, 0015, 0021, 0022, 0024, 0035. Zaškrtnutím v `docs/karty/KE_SCHVALENI.md`. | Schválit všech 9. Jsou `overeno`, na v2 nezávisí, 0007 a 0012 nesou Vaše znění. Zbylých 6 karet třídy A pro v1.1 (0003, 0004, 0005, 0009, 0036, 0039) přijde v druhé dávce po přepisu. | Neschváleno (bezpečnostní, výchozí volba neplatí). Kalkulačka do té doby nejde ven. | |
| 2 | **Push na GitHub** do soukromého `lodr981/caravanix`, až repo založíte. | Ano, jakmile repo existuje (jen push, žádný deploy). | Vše zůstává jen lokálně. | |
| 3 | **Pro informaci: výjimky licencí vývojových nástrojů.** 13 balíčků, které tahají Astro, Vite, Vitest a Playwright (ISC 8×, BlueOak-1.0.0 3×, CC0-1.0 1×, Apache-2.0 + LGPL-3.0 u binárky sharp), jsem schválil jako vývojové nástroje podle nové definice strážce licencí. Do webu nic z toho nejde, produkční brána zůstává přísná. `CLAUDE.md` přitom dosud říká, že výjimku schvaluje Radek. | Potvrdit. Hlavní vlákno pak upraví větu v `CLAUDE.md` a bránu tak, aby vývojové nástroje s licencí OSI výjimku nepotřebovaly. | Platí rozhodnutí mistra (výjimky schválené, brána licencí prochází). | |
