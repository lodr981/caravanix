---
titulek: "Kolik uvařím na indukci?"
seoTitulek: "Indukce v obytné dodávce: kolik uvaříte – Caravanix"
popis: "Kolik energie spotřebuje vaření na indukci z baterie, proč se počítá ve Wh, ne v Ah, a proč 2 000 W z 12 V přetíží běžnou baterii. S kalkulačkou."
mytus: "„Kolik toho uvařím na indukci?“"
zasada: "Počítá se ve Wh, ne v Ah, a rozhoduje i proud: indukce 2 000 W přes měnič bere z 12V baterie asi 174 A a ten musí unést BMS, kabel i měnič."
karty: [K-LEKCE-0012, K-LEKCE-0013, K-LEKCE-0017, K-LEKCE-0018, K-VODIC-0019, K-VODIC-0020, K-VODIC-0036]
kalkulacka: "/cs/kalkulacka-spotrebicu/"
poradi: 6
---
Indukce v dodávce je splněný sen: žádná plynová láhev a voda na kávu za chvilku. Baterie ale není bezedný hrnec, a tak se vyplatí počítat.

## Počítejte ve Wh, ne v Ah

Ampérhodiny (Ah) na štítku samy neřeknou, kolik energie v baterii je. Tu udávají watthodiny (Wh): kapacita v Ah krát napětí. Lithiová baterie pro 12 V má jmenovitě 12,8 V, takže 200 Ah je 2 560 Wh. Kalkulačka počítá s tím, že z baterie využijete 90 %, tedy 2 304 Wh. Je to předpoklad, který můžete změnit.

## Kolik stojí litr vody

Ohřát litr vody z 15 na 100 °C stojí asi 99 Wh tepla. Z baterie to bude víc, protože něco ztratí plotýnka a něco měnič. Kalkulačka počítá s účinností indukce 85 % a měniče 90 %, takže litr vody stojí asi 129 Wh z baterie. Na 2 304 Wh tak ohřejete asi 17,8 litru.

Účinnost indukce 85 % je předpoklad kalkulačky. Laboratorní test naměřil u dvou indukčních vařičů 75–78 %. Skutečná spotřeba proto může být asi o 10 % vyšší. Účinnost si v kalkulačce můžete snížit.

## Rozhoduje i proud

Indukce s příkonem 2 000 W na 230 V jede přes měnič a z baterie 12,8 V pak bere asi 174 A. Běžná 100Ah baterie s vestavěným BMS, tedy elektronikou, která baterii hlídá, přitom mívá trvalý vybíjecí proud 100 A. Taková indukce ji přetíží. Rozhoduje datasheet vaší baterie.

Stejný proud musí unést i kabel a měnič. Kde proud přesahuje asi 150 A, stojí za to zvážit systém 24 V: proud klesne na polovinu a kabely mohou být tenčí.

**Bezpečnost:** Proud z baterie nesmí trvale překročit trvalý vybíjecí proud z jejího datasheetu. Indukce 2 000 W přes měnič ho u běžné 100Ah baterie překročí. Kabel a pojistku k měniči navrhněte v kalkulačce průřezu. Nad 150 A platí kabel a pojistka podle návodu výrobce měniče.
