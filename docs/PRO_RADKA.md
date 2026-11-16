# Pro Radka

Píše mistr, nejvýš jednou denně, nejvýš 5 položek. Radek odpovídá krátce (ano / ne / jinak: …). Bez odpovědi se pokračuje jinou prací. U položek, které nejsou bezpečnostní, platí po 48 hodinách výchozí volba.

**16. 11. 2026, po úklidu mistra.** Všechno ostatní otevřené (spory 0004 a 0039, I30, ρ u 1,5 mm², pocínovaná lanka, otázky testera a designéra) je zavřené odkazem na kalkulačku v1.1 nebo rozhodnuté mistrem. Seznam je v `docs/STAV.md`, Rozhodnutí mistra.

| # | Rozhodnutí | Doporučení mistra | Výchozí volba | Radek |
| --- | --- | --- | --- | --- |
| 1 | **Schválit 15 karet třídy A** zaškrtnutím v `docs/karty/KE_SCHVALENI.md`: první dávka 9 karet (0007, 0012, 0013, 0014, 0015, 0021, 0022, 0024, 0035) a druhá dávka 6 karet přepsaných na v1.1 (0003, 0004, 0005, 0009, 0036, 0039). | Schválit všech 15. Všechny jsou `overeno`; druhá dávka prošla ověřením výpočtu √((105 − 30) / (70 − 30)) ≈ 1,37 a třídy 105 °C u FLRY-B. | Neschváleno (bezpečnostní, výchozí volba neplatí). Kalkulačka do té doby nejde ven. | |
| 2 | **Push na GitHub** do soukromého `lodr981/caravanix`, až repo založíte. | Ano, jakmile repo existuje (jen push, žádný deploy). | Vše zůstává jen lokálně. | |
| 3 | **Pro informaci: výjimky licencí vývojových nástrojů.** 13 balíčků, které tahají Astro, Vite, Vitest a Playwright (ISC 8×, BlueOak-1.0.0 3×, CC0-1.0 1×, Apache-2.0 + LGPL-3.0 u binárky sharp), jsem schválil jako vývojové nástroje podle nové definice strážce licencí. Do webu nic z toho nejde, produkční brána zůstává přísná. `CLAUDE.md` přitom dosud říká, že výjimku schvaluje Radek. | Potvrdit. Hlavní vlákno pak upraví větu v `CLAUDE.md` a bránu tak, aby vývojové nástroje s licencí OSI výjimku nepotřebovaly. | Platí rozhodnutí mistra (výjimky schválené, brána licencí prochází). | |
| 4 | **Schválit vzor designu:** úvodní stránka a kalkulačka průřezu v1.1 (`npm run dev`, http://localhost:4321/cs/ a /cs/kalkulacky/prurez-kabelu/; screenshoty v `docs/design/kontroly/`). Designér je schválil ve 2. kole, čtenář laik je prošel. | Schválit. Zbývající drobnost: dlouhá referenční tabulka v mobilu, řeší se v dalším kole. | Neschváleno; pracuje se dál, vzor se nezveřejní. | |
| 5 | **Schválit třetí dávku 10 karet třídy A** pro lekce 3–10 (K-LEKCE-0001, 0002, 0003, 0005, 0006, 0007, 0009, 0010, 0011, 0013) zaškrtnutím v `docs/karty/KE_SCHVALENI.md`. Ověřovatel: všechny SEDÍ (3 s poznámkou na bezpečné straně). | Schválit. | Neschváleno (bezpečnostní); lekce zůstávají se štítkem zkušební verze. | |
