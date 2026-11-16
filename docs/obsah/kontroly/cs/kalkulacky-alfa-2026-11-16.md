# Kontrola: kalkulačky alfy (cs), 16. 11. 2026

Kontrolor země: `kontrolor-zeme` (Česko). Kontrolováno: `content/cs/kalkulacky-alfa.json` (vše) a `content/cs/web.json` (`home.kalk`, `nav.*`) proti `docs/KALKULACKY_ALFA.md`, kartám K-LEKCE-0001, 0009, 0013, 0018, K-SOLAR-0001, 0002 a profilu `docs/profily/cs.md`.

## Verdikt: SCHVÁLENO (s opravami provedenými rovnou)

Čísla v textech odpovídají zadání: 90 % měnič, 85 % indukce, 90 % využitelná kapacita, 12,8 V / 25,6 V (4 / 8 článků), ohřev z 15 na 100 °C, hranice 150 A. Bezpečnostní texty jsou po opravě vážné, jednoznačné a nepřekračují karty. Klíče beze změny, oba soubory jsou platný JSON.

## Opravy provedené rovnou

**Věcná chyba (opraveno v hodnotě):**
- `sb.predpoklad`: text tvrdil „se ztrátami systému {ztraty} %“, komponenta dosazuje `vychoziZtraty × 100` = 70. Čtenář by četl „70 % ztrát“, ve skutečnosti engine počítá s 30 % ztrát (do baterie dojde 70 %). Nově: „… počítáme s tím, že do baterie dojde {ztraty} % vyrobené energie.“ Doplněno „panel naplocho“ a „v zimě bývá spíš horší“ (K-SOLAR-0001: zimní hodnoty jsou horní odhad).

**Text netvrdí víc, než engine počítá:**
- `sb.ZIMA_MALO_SLUNCE`: „solár sám nestačí“ → „Solár sám většinou nestačí“ (hláška závisí jen na výnosu pod 1 kWh/kWp, ne na velikosti panelů).
- `sb.BILANCE_KLADNA`: doplněno „V průměru tohoto měsíce“ (data jsou měsíční průměr).
- `sp.vykon230Note`: „měnič musí trvale zvládnout aspoň tolik“ → „tolik musí měnič zvládnout, když běží všechny najednou“ (součet předpokládá souběh, přesný výpočet je v kalkulačce měniče).
- `me.description`: „měnič 12 V na 230 V“ → „z 12 nebo 24 V na 230 V“.

**Bezpečnostní texty:**
- `sp.NAD_150A`, `me.NAD_150A`: sjednoceno s `va.PROUD_VELKY` – „Takový proud musí unést baterie, její BMS, kabely i pojistky“ (K-LEKCE-0013), „zvažte soustavu 24 V“.
- `sp.proudNote`: „porovnejte s trvalým proudem baterie (BMS) z jejího datasheetu“ (K-LEKCE-0013: běžná 100Ah baterie má 100 A, tedy méně než hranice hlášky 150 A).
- `va.PROUD_VELKY`: „v kalkulačce průřezu a měniče“ → „v kalkulačce průřezu a v kalkulačce měniče“.
- `bo.LITHIUM_BOOSTER`: „aby se alternátor nepřehřál“ → „nepřetížil“ a „nízké a kolísavé napětí“ podle znění karty K-LEKCE-0001.
- `so.VOC_NAD_MAX` (blok): doplněno „Takto panely nezapojujte.“
- `so.POJISTKA_VETVE`: doplněn důvod pro laika podle K-LEKCE-0009 (při poruše tečou do větve proudy ostatních a překročí, co unese kabel a snese panel).
- `me.ODKAZ_PRUREZ`: „se řídí návodem“ → „předepisuje návod výrobce měniče, ten má přednost“.

**Srozumitelnost a čeština:**
- `ba.vydrziNote`: „asi {h} hodin“ (chybný tvar u 1–4) → „to je asi {h} h bez nabíjení“.
- `sb.prinos`: „o {dny} dní déle“ (chybný tvar u 1–4) → „vydržíte déle (dní navíc: {dny})“.
- `ba.kapacitaNote`: „přesně … zaokrouhleno nahoru“ (matoucí) → „zaokrouhleno nahoru na desítky, výpočet dává {ah} Ah, tedy {wh} Wh“.
- `home.kalk[3].text`: „Série, nebo paralelně, a vydrží regulátor napětí v mrazu?“ → „Do série, nebo paralelně? A vydrží regulátor napětí panelů v mrazu?“
- `pole.*` sjednoceno s popisky vstupů, aby chybová hláška pojmenovala pole stejně jako formulář: `dnyAutonomie`, `pripojkaKazdychDni`, `panel.Voc/Isc/Vmp/Imp`, `regulator.maxVstupV/maxVstupA`, `hodinZapnutoDenne`, `spotrebaNaprazdnoW`, `panelyWp`.

**Typografie:** v `kalkulacky-alfa.json` nebyla ani jedna nezlomitelná mezera. Doplněno U+00A0 mezi číslo (i zástupný symbol `{…}`) a jednotku (V, A, W, Wh, Wp, Ah, %, °C, l, h, dní) a po jednopísmenných předložkách a spojkách (v, k, s, z, o, u, a, i, také na začátku věty). Totéž v `home.kalk`. Uvozovky, pomlčky a znaménko minus (−0,29) byly v pořádku.

## Poznámky pro hlavní vlákno (nevracím, nejsou v textech)

1. Jednotka „dní“ u výsledků (`sb.dni`, `ba.dnyJednotka`) dává „3 dní“, „2,5 dní“. Správně „3 dny“, „2,5 dne“. Řešení je v kódu (tvar podle čísla), ne v textu.
2. Chybí klíče `pole.ucinnostMenice`, `pole.tStart`, `pole.tCil`, `pole.ucinnostVareni`, `pole.ztratySystemu`, `pole.dniSimulace`. Formulář tyto vstupy dnes nemá, takže hláška je nejspíš nedosažitelná; při chybě by se ukázal název proměnné.
3. Zadání říká, že předpoklady (90 %, 85 %, ztráty 0,7) kalkulačka „ukáže a dovolí změnit“. Texty je ukazují, formulář je změnit nedovoluje. Otázka pro hlavní vlákno nebo mistra.
4. `sp.NAD_150A` odkazuje na kalkulačku průřezu, ale v komponentě u hlášky není odkaz (měnič ho má).
5. Hranice hlášek 150 A je nad typickým trvalým proudem BMS 100Ah baterie (100 A, K-LEKCE-0013). Text na to teď upozorňuje u proudu; změna hranice je změna výpočtu (Radek), karta to sama uvádí.
