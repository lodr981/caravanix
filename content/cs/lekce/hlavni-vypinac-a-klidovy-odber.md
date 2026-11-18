---
titulek: "Všechno je vypnuté, a baterie stejně klesá?"
seoTitulek: "Hlavní vypínač baterie a klidový odběr v obytňáku – Caravanix"
popis: "Proč se baterie v obytné dodávce vybíjí, i když nic neběží: klidový odběr měniče, regulátoru a monitoru. Kam patří hlavní vypínač baterie a jak vůz připravit na zimu."
mytus: "„Všechno je vypnuté, baterii nic nebere.“"
zasada: "Vypnuté spotřebiče pořád něco berou. Hlavní vypínač patří do plusu a musí být určený pro stejnosměrný proud; na zimu baterii nechte nabíjet, nebo ji nabijte a od systému odpojte."
karty: [K-LEKCE-0027, K-LEKCE-0028, K-LEKCE-0005, K-LEKCE-0015, K-LEKCE-0006, K-LEKCE-0002]
kalkulacka: "/cs/zapojeni/"
poradi: 16
---
Na podzim jste vůz odstavili s plnou baterií. Na jaře otočíte vypínačem a nic. Žádný zloděj, žádná porucha. Jen spousta malých přístrojů, které celou zimu tiše usrkávaly.

## Klidový odběr: malé, ale pořád

Klidový odběr je proud, který přístroje berou, i když „nic nedělají“. Typicky:

- **měnič 12/230 V**, který je zapnutý bez zátěže,
- **solární regulátor a booster**, které hlídají napětí,
- **monitor baterie**, displeje a kontrolky,
- **elektronika lednice**, topení, alarm nebo sledovací jednotka,
- **nabíječky**, které po odpojení zdroje berou malý proud zpět z baterie.

Některé odběry jsou překvapivě velké. Sinusový měnič 12 V / 3 000 VA bere naprázdno podle datasheetu 20 W, tedy 480 Wh za den. Menší měniče mívají 8–10 W. Ostatní přístroje berou mnohem méně, ale berou pořád: ve dne, v noci, celou zimu. Kolik bere váš přístroj, najdete v jeho datasheetu jako spotřebu v pohotovosti nebo naprázdno.

## Proč to vadí lithiu

Lithiová baterie má malé samovybíjení, ale klidové odběry ji vybíjejí dál. Výrobce baterií uvádí příklad: zbytkový proud 10 mA může poškodit baterii 200 Ah, když systém zůstane vybitý déle než 8 dní. BMS baterii sice při vybití odpojí, ale baterie, která zůstane dlouho vybitá, se může poškodit.

## Hlavní vypínač

Hlavní vypínač odpojí baterii od celého systému jedním pohybem. Hodí se na zimu, při práci na instalaci a v nouzi.

- **Patří do plusu.** Mínus zůstává trvale spojený.
- **Musí být určený pro stejnosměrný proud.** Ne každý vypínač umí přerušit stejnosměrný proud. Hledejte v datasheetu údaj pro DC.
- **Musí unést proud při plné zátěži** celého systému, včetně měniče.
- **Hlavní pojistka zůstává hned u baterie.** Vypínač ji nenahrazuje.

Místo vypínače lze baterii odpojit i vyjmutím hlavní pojistky. Na každodenní použití je ale vypínač pohodlnější.

Pozor na přístroje připojené přímo na baterii, před vypínačem. Ty vypínač nevypne. Projděte schéma a ověřte, co zůstane pod proudem.

## Pořadí při vypínání

Solární regulátor se k baterii připojuje první a odpojuje poslední. Nejdřív proto odpojte panely, třeba solárním vypínačem nebo pojistkou u regulátoru, a teprve pak baterii hlavním vypínačem. Při zapínání naopak: nejdřív baterie, potom panely.

## Uskladnění na zimu

Výrobce lithiových baterií dává dvě možnosti:

1. **Baterii udržovat nabitou**, třeba z přípojky nebo ze soláru.
2. **Baterii (téměř) nabít do plna a systém od ní odpojit**: hlavním vypínačem, vyjmutím pojistky nebo odpojením plusu.

Když necháte nabíjet solár, platí zimní pravidlo: LiFePO4 se pod 0 °C nenabíjí, nebo pod vyšší mezí z datasheetu baterie. Nabíjení v mrazu musí zablokovat BMS. Víc v lekci „V zimě nabíjím jako v létě?“.

Na startovací baterii nezapomeňte. Proč se vybíjí a jak ji udržet, vysvětluje lekce „Proč se startovací baterie vybíjí?“.

## Typické chyby

- **Vypínač v mínusu** místo v plusu.
- **Vypínač pro střídavý proud** nebo slabý vypínač z hobby marketu, který stejnosměrný proud bezpečně nepřeruší.
- **Měnič zapnutý celou zimu.**
- **Monitor nebo alarm zapojený před vypínačem**, který baterii vybije, i když je „všechno vypnuté“.
- **Baterie odstavená vybitá.** Klidový odběr ji pak dostane do hlubokého vybití.

## Kontrolní seznam před zimou

- Baterie je nabitá, nebo připojená k nabíjení s ochranou proti nabíjení v mrazu.
- Panely odpojené, pak baterie hlavním vypínačem.
- Víte, co je zapojené před vypínačem a kolik to bere.
- Měnič je vypnutý.
- Na jaře nejdřív baterie, potom panely.

Kde vypínač a hlavní pojistka ve schématu leží, uvidíte v průvodci zapojením.

**Bezpečnost:** Hlavní vypínač dejte do plusu (hlavní pojistka zůstává hned u baterie) a použijte vypínač určený pro stejnosměrný proud a dimenzovaný na proud celého systému. Než baterii odpojíte, odpojte panely. Na zimu baterii buď udržujte nabitou, nebo ji nabijte a od systému odpojte.
