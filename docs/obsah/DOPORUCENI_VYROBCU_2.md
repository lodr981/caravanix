# Doporučení výrobců: kabel a pojistka (12 V)

Rešerše 18. 11. 2026. Karty K-VYROBCE-0101 až 0110 (třída A, stav navrh). Odvozený úbytek: oba vodiče, délka v tabulce brána jako jedna cesta, ρ = 0,0175 Ω·mm²/m, vztaženo k 12 V. Jmenovitý proud In = trvalý výkon měniče ÷ (účinnost × 12 V); Ivyp = totéž při podpěťovém vypnutí. Kdyby výrobce myslel součet + a −, úbytky jsou poloviční.

## Měniče

| Model | Průřez / délka | Proud (z čeho) | Pojistka | Zdroj | Odvozený úbytek % při proudu |
| --- | --- | --- | --- | --- | --- |
| Victron Phoenix 12/500 VE.Direct | 6 mm² 0–1,5 m; 10 mm² 1,5–3 m | In 37 A (400 W, 90 %); Ivyp 48 A (9,3 V) | vnitřní 3 × 35 A; nad 1,5 m další u baterie | K-VYROBCE-0101, kap. 3.2, PDF s. 5 | 2,7 % / 3,2 % při In; 3,5 / 4,2 % při Ivyp |
| Victron Phoenix 12/800 VE.Direct | 16 mm² 0–1,5 m; 25 mm² 1,5–3 m | In 60 A (650 W, 90 %) | vnitřní 150 A | K-VYROBCE-0101 | 1,6 % / 2,1 % při In; 4,1 / 5,3 % při 150 A |
| Victron Phoenix 12/1200 VE.Direct | 25 mm² 0–1,5 m; 35 mm² 1,5–3 m | In 91 A (1000 W, 92 %) | vnitřní 200 A | K-VYROBCE-0101 | 1,6 % / 2,3 % při In; 2,0 / 2,9 % při Ivyp |
| Victron Inverter Smart 12/1600 | 70 mm² do 5 m; 5–10 m nedoporučeno | In 118 A (1300 W, 92 %); Ivyp 152 A | 250 A | K-VYROBCE-0102, kap. 3.2.1, s. 5 | **2,5 %** při In; 3,2 % při Ivyp; 5,2 % při 250 A |
| Victron Inverter Smart 12/2000 | 70 mm² do 5 m; 5–10 m nedoporučeno | In 145 A (1600 W, 92 %) | 300 A | K-VYROBCE-0102 | 3,0 % při In; 3,9 % při Ivyp |
| Victron Inverter Smart 12/3000 | 90 mm² do 5 m; 2 × 70 mm² 5–10 m | In 215 A (2400 W, 93 %) | 400 A | K-VYROBCE-0102 | 3,5 % / 4,5 % při In |
| Victron MultiPlus 12/3000 | 2 × 50 mm² 0–5 m; 2 × 70 mm² 5–10 m | In 215 A (2400 W, 93 %); Ivyp 272 A (9,5 V) | 400 A | K-VYROBCE-0103, kap. 4.2, s. 8 | 3,1 % / 4,5 % při In |
| Dometic SinePower DPSI1012 / 1512 / 2012 | 35 / 50 / 70 mm², kabel co nejkratší (do 1 m) | In 93 / 139 / 185 A (90 %); vypnutí 10,3 V | 200 / 250 / 300 A | K-VYROBCE-0104, s. 14 | 0,8 % při In; 1,2–1,7 % při proudu pojistky |
| Dometic SinePower MSI1812T | 35 mm², délka neuvedena | In 148 A (1600 W, 90 %); vypnutí 10,5 V | 228 A | K-VYROBCE-0105, s. 15 | 1,2 % na 1 m při In; 2,5 % by bylo na 2,0 m |

Pojistka výrobce je 1,5–2,8 × jmenovitý proud měniče (Victron VE.Direct 2,2–2,8 ×, Inverter Smart a MultiPlus 1,9–2,1 ×, Dometic 1,5–2,2 ×). Špičkový výkon je u všech zhruba 2 × trvalý. Victron k tomu píše: kabel musí unést jmenovitý proud pojistky bez přehřátí (K-VYROBCE-0102, poznámka *).

## Topení

| Model | Průřez / délka | Proud | Pojistka | Zdroj | Odvozený úbytek % při proudu |
| --- | --- | --- | --- | --- | --- |
| Webasto Air Top 2000 STC 12 V | dodaný svazek, číslo v návodu není | start 75 W = 6,3 A; provoz 14–29 W | 15 A (max. 20 A), u baterie | K-VYROBCE-0106, kap. 12.2, s. 24 | nelze, průřez neuveden |
| Autoterm AIR-2D 12 V | dodaný svazek, přímo k baterii, „dostatečný průřez“ | provoz 10–29 W = do 2,4 A; vypnutí pod 10 V | 25 A | K-VYROBCE-0107, kap. 3.5 a 6 | nelze, průřez neuveden |
| Truma VarioHeat eco AU 12 V | 2 × 2,5 mm²; nad 6 m 2 × 4 mm² | max. 3,65 A | 10 A (centrální elektroinstalace) | K-VYROBCE-0108, s. 9 | 2,6 % (2,5 mm², 6 m) a 3,2 % (4 mm², 12 m) při 3,65 A |

## Booster

| Model | Průřez / délka | Proud | Pojistka | Zdroj | Odvozený úbytek % při proudu |
| --- | --- | --- | --- | --- | --- |
| Victron Orion-Tr Smart 12/12-30 isolated (vstup i výstup 12 V) | 6 mm² 0,5 m; 10 mm² 1 a 2 m; 16 mm² 5 a 10 m (max. svorky) | vstup 35 A (30 A × 12,2 V ÷ 87 %); výstup 30 A, 40 A 10 s | 60 A u baterie | K-VYROBCE-0109, kap. 4.2, Figure 6 | vstup: 0,9 / 1,0 / 2,0 / 3,2 / 6,4 % při 35 A |

## Proč výrobce chce víc

Výrobce měniče počítá z **jmenovitého výkonu měniče**, ne ze zátěže, kterou do něj uživatel zrovna zapojí. K tomu přičítá účinnost (90–93 %, tedy proud o 8–11 % vyšší než výkon ÷ 12 V). Victron Inverter Smart 12/1600 se 70 mm² na 5 m dává při 1300 W a 92 % účinnosti přesně 2,5 % úbytku, což je cíl z Victron Wiring Unlimited („aim for a voltage drop below 2.5%“, K-VYROBCE-0110). Ostatní tabulky Victronu vycházejí na 1,6–3,5 % (tlustší kabel už na svorku nejde). Naše kalkulačka povoluje 3, 5 nebo 10 %, a 10 % měnič neunese. Při rozběhu spotřebiče s dvojnásobnou špičkou se úbytek zdvojnásobí, napětí na svorce klesne pod podpěťové vypnutí (Victron 9,3 V, Dometic 10,3–10,5 V) a měnič se vypne, i když baterie je v pořádku. Druhý důvod je **pojistka**. Výrobce ji volí 1,5–2,8 × jmenovitý proud, aby přežila špičku, a kabel pak musí unést proud té pojistky. Náš vzorec 1,25 × proud zátěže dá menší pojistku, a proto i tenčí kabel podle oteplení. Když pak uživatel podle návodu osadí pojistku výrobce, kabel z kalkulačky na ni nestačí. Kontrola v enginu v1.1 to potvrzuje. Se jmenovitým výkonem měniče kalkulačka vychází stejně nebo tlustší než výrobce: Inverter Smart 12/1600 na 5 m a 3 % dá 70 mm², DPSI1512 dá 70 mm² proti 50 mm² od výrobce. Se zátěží místo měniče vychází tenčí: měnič 12/1600 se zátěží 800 W na 2 m dá 25 mm² a pojistku 100 A, výrobce chce 70 mm² a 250 A. U topení je to podobné: pojistka a svazek jsou dimenzované na start žhavicí svíčky, ne na provozní příkon 14–29 W. Autoterm i Truma výslovně upozorňují, že poruchy topení způsobuje úbytek napětí.

Poznámky: Tabulky Victronu, Dometicu a Trumy neříkají, jestli je délka jedna cesta, nebo součet. Shoda Victronu s 2,5 % při délce jedné cesty ukazuje na jednu cestu. Tabulka ve Wiring Unlimited ale výslovně počítá se součtem + a −. Návody Webasto, Autoterm, MSI a Truma jsou kopie návodů výrobce na webech prodejců. Votronic a Büttner jsem v rozpočtu neotevřel.
