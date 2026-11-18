---
titulek: "Měnič 3 000 W za pár stovek?"
seoTitulek: "Měnič napětí 12 V na 230 V: jak vybrat – Caravanix"
popis: "Na krabici měniče bývá špička, ne trvalý výkon. Jak vybrat měnič 12 V na 230 V do obytné dodávky a proč do bilance patří i spotřeba naprázdno."
mytus: "„Měnič 3 000 W za pár stovek.“"
zasada: "Počítá se trvalý výkon, ne špička na krabici, a spotřeba naprázdno patří do bilance."
karty: [K-LEKCE-0015, K-LEKCE-0016, K-LEKCE-0018, K-VODIC-0013, K-VODIC-0015, K-VODIC-0019, K-VODIC-0036]
kalkulacka: "/cs/kalkulacka-menice/"
poradi: 7
---
Velké číslo na krabici měniče je jako fotka hamburgeru v menu. Něco skutečně ukazuje, jen to není přesně to, co dostanete na talíř.

## Trvalý výkon, ne špička

Měnič má tři čísla, která se snadno spletou:

- **trvalý výkon ve wattech:** tolik dá dlouhodobě,
- **zdánlivý výkon ve VA:** u měničů bývá na štítku a není to totéž co watty,
- **špička:** tu dá jen krátce, třeba při rozběhu kompresoru.

Příklad z datasheetu sinusového měniče 12 V: má 3 000 VA, ale trvale dá 2 400 W při 25 °C, 2 200 W při 40 °C a 1 700 W při 65 °C. Špičku 6 000 W zvládne jen krátce. Číslo na krabici levného měniče může být právě špička nebo VA.

Kalkulačka měniče sečte spotřebiče, které poběží najednou, a doporučí trvalý výkon a špičku. Rezervu nepřidává, ta je na vás.

## Spotřeba naprázdno

Zapnutý měnič bere z baterie i tehdy, když nic nenapájí. U zmíněného měniče je to 20 W. Když je zapnutý celý den, dělá to 480 Wh, tedy 37,5 Ah z baterie 12,8 V. Menší měniče 1 200–2 000 VA mívají podle datasheetů 8–10 W. Úsporný režim spotřebu sníží. Levné měniče bez datasheetu mohou mít víc. Spotřebu naprázdno zadejte do kalkulačky a měnič vypínejte, když ho nepotřebujete.

## Účinnost

Měnič má účinnost asi 90 %. Na 1 000 W výstupu tak bere z baterie spíš 1 100 W. Kalkulačka s tím počítá a proud z baterie předá do kalkulačky průřezu.

## Typické chyby

- **Měnič podle špičky z krabice.** Rozhoduje trvalý výkon ve wattech z datasheetu.
- **Měnič zapnutý pořád.** Spotřeba naprázdno sní za den víc než leckterý spotřebič. Vypínejte ho, nebo použijte úsporný režim.
- **Tenký nebo dlouhý kabel k baterii.** Měnič bere velký proud. Kabel a pojistku berte z návodu výrobce a z kalkulačky průřezu.
- **Zavřený ve skříňce.** Měnič se zahřívá a výkon s teplotou klesá, jak ukazuje příklad výše. Podmínky umístění a větrání najdete v návodu výrobce.
- **Měnič „napojený do zásuvek vozu“ svépomocí.** Propojení měniče s rozvodem 230 V a přepínání mezi přípojkou a měničem patří elektrotechnikovi. Víc v lekci „Proč mi v kempu vypadává chránič?“.

## Kontrolní seznam

- Znáte trvalý výkon měniče ve wattech a víte, které spotřebiče poběží najednou.
- Spotřebu naprázdno máte z datasheetu a je v bilanci.
- Kabel a pojistka odpovídají návodu výrobce a kalkulačce průřezu, pojistka je na plusu u baterie.
- Měnič má kolem sebe místo podle návodu.
- Baterie unese proud, který měnič při plném výkonu bere.

## Příklad z praxe

Kvůli nabíječce notebooku zůstane měnič zapnutý celý den. Notebook se nabije za pár hodin, ale měnič s 20 W naprázdno sní zbytek dne další energii z baterie. Stačí ho po nabití vypnout. Ještě lepší je nabíjet notebook přímo z 12 V, pokud k němu výrobce nabíječku na 12 V nabízí.

**Bezpečnost:** Měnič bere z baterie velký proud. Pojistka patří na plus co nejblíž k baterii. Kvůli rozběhovému proudu může měnič potřebovat pomalou pojistku a kabel se pak dimenzuje na tuto pojistku. Nad 150 A platí kabel a pojistka podle návodu výrobce měniče.
