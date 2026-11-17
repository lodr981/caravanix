# Stav (17. 11. 2026; podrobná historie je v gitu)

1. **Adresa:** `npm install`, `npm run dev`, pak http://localhost:4321/cs/ – úvod s řezem dodávkou a cestou v 6 krocích, 7 kalkulaček, průvodce zapojením `/cs/zapojeni/`, katalog spotřebičů, živé schéma `/cs/schema-r1/`, 13 lekcí, `/cs/styleguide/`.
2. **Tým:** podle `docs/TYM.md` (designer = art director, nový ilustrator; mistr, autor/kontrolor země a strážce licencí zaparkovaní).
3. **Rychlá alfa:** hotová; podpisový prvek 1 (řez kabelem s lankem a polaritou, 1 : 1, zatížení jako kabel) překreslen art directorem, srovnání s FarOutRide v PRO_RADKA.
4. **Vizuál 1:** krok 1 benchmark + ikony Phosphor + styleguide ✓; 2 karta výsledku ke sdílení (obrázek) + náhledy odkazů og:image ✓; 3 živé schéma R1 ✓; 4 řez dodávkou ✓ (čeká na vizuální bránu); 5 maskot a 2 scény ✓ (Mistral bez Agents API, konverzace přímo s modelem; rozpočet 12 obrázků vyčerpán); 6 vizuální regresní testy ✓ (`npm run vizual`, v `npm run check`).
5. **Testy:** 1 100 jednotkových a 24 vizuálních, vše zelené; build 26 stránek.
6. **Odloženo:** Lighthouse (Chrome z `npx lighthouse` se nespustí); na úvodu při 200 % přetéká nadpis jedné karty o 10 px; náhledy odkazů mají adresu localhost, dokud web nemá doménu (`site` v Astru).
7. **Nápady A 4–6 u průřezu hotové:** režim „Co unese můj kabel“ (engine `mamKabel`, 27 testů), nákupní lístek s tiskem, obrázek výsledku ke sdílení; designer: projde (screenshoty `docs/design/kontroly/prurez-mam-kabel/`). Opravena chyba hydratace řezu kabelem. **Další krok:** podle zásobníku alfy.
8. **Radek 17. 11. (večer): „ilustrace, obrázková tvorba zapojení, provázat kalkulačky a příručku podle fór a konkurence“** – hotovo:
   - Rešerše fór a konkurence `docs/obsah/RESERSE_FORA.md` (Reddit a FB nedostupné, pořadí témat je odhad).
   - Průvodce zapojením `/cs/zapojeni/`: vzory, 3 kroky, živé schéma z výběru (engine `navrhZapojeni`, 42 testů), tabulka kabelů s délkami, nákupní seznam s tiskem, slovníček, odkazy do kalkulaček s hodnotami. Schéma umí nabíječku, měnič, přípojku 230 V a režim Kemp.
   - Cesta v 6 krocích (spotřeba → baterie → nabíjení → měnič → zapojení → kabely) na úvodu, v kalkulačkách a lekcích; výsledky se mezi kroky přenášejí (sessionStorage) s oznámením „Převzato“.
   - 3 nové lekce (z olova na lithium, startovací baterie se vybíjí, kostra nebo vlastní mínus), 5 karet ověřeno, 4 třídy A čekají na Radka.
   - Designer: projde; laik: nálezy zapracované (hlavní pojistka v seznamu, přenos hodnot, slovníček), zápis `docs/laik/laik-zapojeni-2026-11-17.md`.
   - Zbývá: kolik Wp koupit (soběstačnost neříká přímo), rozcestí „hotový obytňák“, režim „Zkontrolujte mi zapojení“.
9. **Čeká na Radka:** `docs/PRO_RADKA.md` (5 bodů) a ručně vložit `.claude/settings.json`.
