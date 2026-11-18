# Doporučení výrobců: průřez napájecího kabelu lednice a čerpadla

Rešerše 18. 11. 2026 (reserser). Karty K-VYROBCE-0001 až 0006, třída A, stav návrh. Úbytky jsou spočítané s ρ = 0,0175 Ω·mm²/m a smyčkou tam i zpět, tj. R = 0,0175 × 2 × délka jedné cesty / průřez.

## Lednice

| Model | Průřez / délka (12 V; 24 V) | Proud | Pojistka | Zdroj | Odvozený úbytek % při proudu |
| --- | --- | --- | --- | --- | --- |
| Secop BD35F.2 (elektronika 101N0226) | 2,5 / 4 / 6 / 10 mm² do 2,5 / 4 / 6 / 10 m; 24 V dvojnásobné délky. **Jedna cesta** (baterie–elektronika) | rozběh 20 A | 15 A (12 i 24 V), vypínač ≥ 20 A | K-VYROBCE-0001, návod Fig. 2, Fig. 3, Power supply, Technical data | 12 V: 3 % při 10,3 A; 4,4 % při 15 A; 5,8 % při rozběhu 20 A. 24 V: 2,9 % při 10 A |
| Secop BD50F (datasheet 101Z1220) | stejná tabulka | provoz až 8,7 A (12 V, 3 500 ot/min); 24 V polovina | 12 V 15 A, 24 V 7,5 A | K-VYROBCE-0002, Wire dimensions DC, Current consumption, Accessories | 12 V: 2,5 % při 8,7 A; 24 V: 1,3 % při 4,35 A |
| Dometic CRX 50–140, aktuální krátký návod | 12 V: 4 mm² do 4 m, 6 mm² do 6 m, 10 mm² nad 6 m; 24 V: přímka 2 → asi 18 mm² na 0–28 m | jmenovitě 5,0 A (CRX 50) | 10 A (12 V), 7,5 A (24 V) | K-VYROBCE-0003, PDF str. 7 Fig. 13/14, str. 8 | 12 V: 1,5 % při 5 A; 2,9 % při 10 A; 5,8 % při rozběhu 20 A |
| Dometic CRX 50–140, starší úplný návod | 12 V: přímka asi 3 → 20 mm² na 0–14 m (5 m ≈ 9 mm²) | 5,0 A | ≥ 15 A (12 V), ≥ 7,5 A (24 V) | K-VYROBCE-0004, PDF str. 9 obr. 14, str. 22, str. 35 | 12 V, 5 m: 0,8 % při 5 A; 3,2 % při 20 A |

Ochrana baterie Secop i Dometic: vypíná 10,4 V, zapíná 11,7 V (24 V: 22,8 / 24,2 V), měří na svorkách lednice.

Indel B / Engel: v rozpočtu nedohledáno.

## Čerpadla

| Model | Průřez / délka | Proud | Pojistka | Zdroj | Odvozený úbytek % při proudu |
| --- | --- | --- | --- | --- | --- |
| Shurflo 4008 (55 psi) | 16 AWG (1,3 mm²) do 7,6 m; 14 AWG (2,1) do 15,2 m; 12 AWG (3,3) do 21,3 m; 10 AWG (5,3) do 33,5 m. **Celková délka tam i zpět**. Min. 16 AWG, doporučeno 12 AWG | 2,8 A (0 psi) až 7,5 A (55 psi, před vypnutím); tabulka počítá s 10 A | podle štítku; okruh ≥ 10 A, spínač 15 A | K-VYROBCE-0005, str. 1 Electrical, str. 3 Typical Performance | 8,5–10,6 % při 10 A (deklarováno 10 %); 6,4–8,0 % při 7,5 A |
| Lilie (řady Soft, Smart) | 1,5 mm² do 7,5 m; 2,5 mm² do 20 m; 4,0 mm² do 30 m. **Celková délka**. Min. 1,5 mm², doporučeno 2,5–4 mm² | tabulka počítá s 10 A | podle štítku; spínač 15 A | K-VYROBCE-0006, str. 1 a 5 | 7,3–11,7 % při 10 A (deklarováno 10 %) |
| Shurflo Trail King 7 | nedohledáno | max. 4,5 A (K-SPOTR-0005) | – | – | – |
| Seaflo 21/42 | tabulka pro řadu 42 nedohledána. Návod Seaflo k zemědělským čerpadlům řad 34/51 (https://images.homedepot-static.com/catalog/pdfImages/0c/0cc573e2-a941-40b2-973a-23c939221f90.pdf, str. 12 a 17) uvádí #14 AWG nebo silnější, pojistku 10–20 A podle modelu a vedle provozního i maximální proud (např. SFDP1-030-060-51: 6,0 A provoz, 10 A max.) | – | – | bez karty (jiná řada) | – |
| Reich (Twin, Smart) | nedohledáno | – | – | – | – |

## Proč výrobce chce víc

Naše kalkulačka v1.1 bere proud = příkon ÷ napětí a dovolí 3, 5 nebo 10 % úbytku. Pro výchozí úkol (lednice 60 W = 5 A, 5 m jedna cesta, vlastní mínus) dá při 3 % 2,5 mm², při 5 % 1,5 mm², při 10 % 0,75 mm². Secop i Dometic chtějí 6 mm². Rozdíl nedělají procenta, ale **proud, se kterým výrobce počítá**:

1. **Lednice: rozběh a ochrana baterie.** Tabulka Secop (a z ní odvozený schod Dometicu) drží na 12 V smyčku 0,035 Ω bez ohledu na délku. To je 3 % při 10 A, nebo 5,8 % (0,7 V) při rozběhovém proudu 20 A. Na 24 V je délka dvojnásobná a proud poloviční, takže absolutní úbytek zůstává stejný (asi 0,3 V v plném chodu, 0,7 V při rozběhu). Výrobce tedy hlídá **volty, ne procenta**. Důvod píše sám: elektronika měří napětí na svých svorkách a vypíná při 10,4 V. Při rozběhu kompresoru s tenkým kabelem napětí na svorkách spadne pod tuto mez, i když baterie má dost. Lednice se pak opakovaně vypíná (Dometic v tabulce poruch: „Cable cross section too small“). Provozní příkon 45–60 W je jen průměr. Kompresor v plném výkonu bere až 8,7 A a při rozběhu 20 A.
2. **Čerpadla: jištění místo provozního proudu.** Shurflo i Lilie počítají s 10 % (nejsou přísnější v procentech), ale při **10 A, tj. proudu okruhu a jištění**, ne provozním (čerpadlo 3–5 A, těsně před vypnutím tlakovým spínačem 7,5 A). K tomu přidávají **minimální průřez** (1,3–1,5 mm²) a doporučení 2,5–4 mm² nebo 12 AWG bez ohledu na výpočet. Podpětí u čerpadla znamená nižší výkon a tlak, ale i vyšší proud a oteplení motoru („fire hazard“).
3. **Délka tam i zpět.** U čerpadel je v tabulce **celková délka vodičů**, u Secop **jedna cesta** (baterie–jednotka). Kalkulačka bere jednu cestu ×2. Kdo porovnává čísla, musí délku převést, jinak se splete dvakrát.

Ekvivalent v naší kalkulačce: tabulku Secop dostaneme přesně, když zadáme proud 10 A a úbytek 3 % (nebo rozběhových 20 A a 5 %: pro 5 m vyjde také 6 mm²). Tabulku Shurflo/Lilie dostaneme při 10 A a 10 % s celkovou délkou. Jestli kalkulačka má u lednice a čerpadla počítat s návrhovým proudem výrobce místo příkonu, je změna výpočtu a rozhoduje Radek.
