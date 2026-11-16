---
titulek: "Panely do série, nebo paralelně?"
seoTitulek: "Solární panely do série, nebo paralelně – Caravanix"
popis: "Co dělá sériové a paralelní zapojení solárních panelů, proč napětí v mrazu roste a kdy potřebuje každá větev pojistku. S kalkulačkou soláru."
mytus: "„Panely do série, nebo paralelně?“"
zasada: "Série sčítá napětí, paralelní zapojení proud. Napětí naprázdno v mrazu nesmí překročit maximum regulátoru a tři a více paralelních větví chce pojistku na každé."
karty: [K-LEKCE-0006, K-LEKCE-0007, K-LEKCE-0008, K-LEKCE-0009]
kalkulacka: "/cs/kalkulacka-solaru/"
poradi: 8
---
Panely na střeše se dají spojit dvěma způsoby. Jako vagony vlaku za sebou, nebo jako auta vedle sebe na dálnici. Obojí jede, jen každé jinak.

## Série a paralela

- **Do série** (plus jednoho panelu na mínus dalšího) se sčítá napětí. Proud zůstává jako u jednoho panelu.
- **Paralelně** (plus na plus, mínus na mínus) se sčítá proud. Napětí zůstává jako u jednoho panelu.

## V mrazu napětí roste

Napětí naprázdno (Voc), tedy napětí panelu, ze kterého se nic neodebírá, platí na štítku pro 25 °C. V zimě je vyšší. O kolik, říká teplotní součinitel v datasheetu panelu. S hodnotou −0,35 %/K, kterou uvádí jeden výrobce, je napětí při −20 °C asi o 16 % vyšší než na štítku.

Příklad: panel s Voc 22,3 V. Čtyři do série dají při 25 °C 89,2 V a do regulátoru se vstupem nejvýš 100 V se vejdou. Za mrazivého rána při −20 °C ale dají asi 103 V a maximum překročí. Kalkulačka soláru takové zapojení zablokuje. Zadejte do ní proto nejnižší teplotu v místě, kde vůz stojí.

## Tři větve, tři pojistky

U jedné nebo dvou paralelních větví pojistka na větvi potřeba není. Od tří větví ano, na každé. Při poruše v jedné větvi do ní totiž tečou proudy všech ostatních a to je víc, než unese kabel větve a co snese panel.

## Pořadí připojení

K regulátoru se nejdřív připojuje baterie, potom panely. Odpojuje se obráceně: nejdřív panely, potom baterie. Řiďte se návodem svého regulátoru.

**Bezpečnost:** Napětí naprázdno panelů v sérii při nejnižší teplotě v místě stání nesmí překročit maximální vstupní napětí regulátoru. Od tří paralelních větví patří pojistka na každou větev. K regulátoru připojujte nejdřív baterii, potom panely, a odpojujte obráceně.
