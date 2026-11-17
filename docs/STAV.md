# Stav (17. 11. 2026; podrobná historie je v gitu)

1. **Adresa:** `npm install`, `npm run dev`, pak http://localhost:4321/cs/ – úvod s řezem dodávkou, 7 kalkulaček, katalog spotřebičů, živé schéma `/cs/schema-r1/`, 10 lekcí, `/cs/styleguide/`.
2. **Tým:** podle `docs/TYM.md` (designer = art director, nový ilustrator; mistr, autor/kontrolor země a strážce licencí zaparkovaní).
3. **Rychlá alfa:** hotová; podpisový prvek 1 (řez kabelem s lankem a polaritou, 1 : 1, zatížení jako kabel) překreslen art directorem, srovnání s FarOutRide v PRO_RADKA.
4. **Vizuál 1:** krok 1 benchmark + ikony Phosphor + styleguide ✓; 2 karta výsledku ke sdílení (obrázek) + náhledy odkazů og:image ✓; 3 živé schéma R1 ✓; 4 řez dodávkou ✓ (čeká na vizuální bránu); 5 maskot a scény **odloženo** (Mistral Agents API 403 pro organizaci); 6 vizuální regresní testy ✓ (`npm run vizual`, v `npm run check`).
5. **Testy:** 1 058 jednotkových a 20 vizuálních, vše zelené; build 22 stránek.
6. **Odloženo:** Lighthouse (Chrome z `npx lighthouse` se nespustí); na úvodu při 200 % přetéká nadpis jedné karty o 10 px; náhledy odkazů mají adresu localhost, dokud web nemá doménu (`site` v Astru).
7. **Nápady A 4–6 u průřezu hotové:** režim „Co unese můj kabel“ (engine `mamKabel`, 27 testů), nákupní lístek s tiskem, obrázek výsledku ke sdílení; designer: projde (screenshoty `docs/design/kontroly/prurez-mam-kabel/`). Opravena chyba hydratace řezu kabelem. **Další krok:** podle zásobníku alfy.
8. **Radek 17. 11.:** vizuální brány „lepší“, 10 karet třídy A schváleno, repo pushnuté do soukromého `github.com/lodr981/caravanix` (`main`). Čeká na Radka: povolit Agents API v účtu Mistral (pak krok 5 Vizuálu 1) a ručně vložit `.claude/settings.json`.
