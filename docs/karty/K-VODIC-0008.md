---
id: K-VODIC-0008
trida: B
stav: navrh
plati-pro-zeme: [vse]
tvrzeni: "Rychlý vzorec pro 12 V a vlastní mínusový vodič: délka [m] ≈ 10 × průřez [mm²] ÷ proud [A] pro úbytek 3 %, nebo ≈ 34 × průřez ÷ proud pro 10 %; poloviční proud dovolí dvojnásobnou délku."
hodnota: 10.29
jednotka: "m·A/mm²"
rozsah: [10.29, 34.29]
podminky: "Jen 12 V, vlastní zpětný vodič stejného průřezu (délka tam i zpět), ρ = 0,0175 Ω·mm²/m (20 °C). Neplatí pro 24 V (koeficienty jsou dvojnásobné: 20,6 a 68,6), pro mínus přes kostru (dvojnásobné) ani pro režim „svazek / motorový prostor“ (ρ = 0,0216, koeficienty 8,3 a 27,8). Délka je jen podle úbytku, oteplení a pojistku neřeší."
zdroje:
  - typ: rozhodnuti-odbornika
    nazev: "Reference kalkulačky průřezu v1 (logika schválená Radkem 11. 11. 2026)"
    url: "docs/reference/kalkulacka-prurezu-v1.html"
    misto: "poznámka pod tabulkou: „délka [m] ≈ 10 × průřez [mm²] ÷ proud [A] pro úbytek 3 %, nebo ≈ 34 × průřez ÷ proud pro 10 %“; tabulka: l3 = 0,36·m/(2·0,0175·f)"
    datum-overeni: 2026-11-16
  - typ: norma
    nazev: "ABYC E-11 AC and DC Electrical Systems on Boats, vydání 7/2003 (veřejná kopie law.resource.org; platí novější revize 2025)"
    url: "https://law.resource.org/pub/us/cfr/ibr/inc/ansi/abyc.e-11.2003.pdf"
    misto: "11.16.1.2 (vzorec CM = K × I × L / E, L = délka tam i zpět, E = 0,03 × 12 = 0,36 V pro 3 % a 1,2 V pro 10 %)"
    datum-overeni: 2026-11-16
  - typ: navod
    nazev: "Victron Energy: Wiring Unlimited, kap. 2 Theory"
    url: "https://www.victronenergy.com/media/pg/The_Wiring_Unlimited_book/en/theory.html"
    misto: "2.7 Current, cable resistance and voltage drop (R = ρ·L/A, úbytek = I·R pro kladný i záporný vodič)"
    datum-overeni: 2026-11-16
vypocet: "ΔU = ρ × 2L × I / A ⇒ L = ΔU × A / (2ρI). 12 V, 3 %: ΔU = 0,36 V, k = 0,36/(2 × 0,0175) = 10,29. 10 %: ΔU = 1,2 V, k = 1,2/0,035 = 34,29. 24 V: 20,57 a 68,57. ρ = 0,0216: 0,36/0,0432 = 8,33 a 1,2/0,0432 = 27,78. L je nepřímo úměrné I, proto I/2 → 2L. Přepočteno v Pythonu."
pouzito-v: [kalkulacka-prurez]
obrazky: []
autor: reserser
overil: null
schvalil: null
---

Poznámky rešeršéra:

Vzorec je správně odvozený a zaokrouhlení 10,29 → 10 a 34,29 → 34 je na stranu kratší délky (bezpečné). Podmínky (12 V, vlastní mínus, samostatně vedený kabel) v referenci u vzorce výslovně uvedené nejsou, je jen „pro 12 V“ – vhodné doplnit do textu.
Při reálném odporu lanka FLRY (K-VODIC-0001) vyjde délka o 4–9 % kratší.
