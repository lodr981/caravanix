# Rychlá alfa: pracuj sám až do konce

Radek u toho není. Neptej se, nečekej, nezastavuj se kvůli souhrnům. **Po každém kroku si tento soubor přečti znovu** (i po zkrácení kontextu) a pokračuj dalším krokem.

## Pravidla

1. **Neptáš se.** Nejasnost rozhodneš nejjednodušší bezpečnou volbou a zapíšeš jednou větou do `docs/STAV.md`.
2. **Neotevíráš nic rozhodnutého** (`docs/ROZHODNUTI.md`, `docs/reset/KALKULACKA_V1_1.md`). Nepíšeš nové dokumenty, přehledy, karty ani otázky.
3. **Stejný problém nejvýš 2 pokusy.** Pak zvolíš jednodušší řešení, nebo věc vynecháš, zapíšeš „odloženo: …“ do `docs/STAV.md` a jedeš dál. Výjimka: výpočet musí odpovídat referenci, ten nevynecháváš.
4. **Výpočet** = reference v1 + změny z `KALKULACKA_V1_1.md`, nic víc. Golden test se nikdy neoslabuje. Když padá, opravuje se engine.
5. **Agenti:** jen `designer` (jedno kolo v kroku 3) a `tester` (krok 1). Ostatní nespouštěj.
6. **Po každém kroku commit** (`git add` a `git commit`, česky). Nikdy `git push`.
7. Když něco nejde nainstalovat nebo spustit (Playwright, Lighthouse), obejdi to, zapiš to a jeď dál. Nic tě neblokuje.

## Kroky

| # | Krok | Hotovo, když |
| --- | --- | --- |
| 0 | Karty třídy A z `KE_SCHVALENI.md` označ jako schválené Radkem (2026-11-16), pokud to ještě není hotové | stav v kartách doplněný |
| 1 | Engine v1.1 a golden test proti nezávislé referenci v1.1 | `npm test` zelený |
| 2 | Stránka `/cs/kalkulacka-prurezu`: vstupy, výsledek, hlášky a texty v1.1, stav v URL | výpočet funguje v prohlížeči a odkaz otevře stejný výsledek |
| 3 | Design Dílna: jen tokeny a komponenty, které stránka potřebuje. `designer` jedno kolo. Opravíš jen to, co označí za podstatné, druhé kolo nebude | stránka v designu, verdikt designera zapsaný |
| 4 | Řez kabelem v měřítku, kabel zbarvený podle zatížení, posuvník délky se značkou hranice. Každá věc nejvýš 2 pokusy | hotové, nebo „odloženo“ v STAV.md |
| 5 | Dvě lekce (kabel, pojistka) z textů reference, propojené s kalkulačkou | obě stránky běží |
| 6 | Kontrola: `npm test`, `npm run build`, jednou Lighthouse. Opravuješ jen chyby. Skóre pod 90 jen zapiš, nelaď | build projde |
| 7 | Konec: `docs/STAV.md` nejvýš 5 řádků (adresa, co funguje, co ne, co je odložené), commit a **zastav se** | hotovo |
