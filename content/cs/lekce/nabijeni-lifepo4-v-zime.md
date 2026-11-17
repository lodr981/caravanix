---
titulek: "V zimě nabíjím jako v létě?"
seoTitulek: "Nabíjení LiFePO4 v zimě a v mrazu – Caravanix"
popis: "Proč se lithiová baterie LiFePO4 v mrazu nenabíjí, kdo má nabíjení zablokovat a proč čidlo patří přímo na články. Pro obytné dodávky a karavany."
mytus: "„V zimě nabíjím jako v létě.“"
zasada: "LiFePO4 se nenabíjí pod 0 °C, nebo pod vyšší mezí, kterou uvádí datasheet baterie. Nabíjení musí zablokovat BMS podle čidla přímo na článcích."
karty: [K-LEKCE-0002, K-LEKCE-0003, K-LEKCE-0017]
kalkulacka: "/cs/kalkulacka-sobestacnosti/"
obrazek: { cesta: "scena-zima/v2", alt: "Usměvavá obytná dodávka s pletenou šálou na zasněžené horské silnici" }
poradi: 5
---
Zima v obytňáku je krásná: sníh, ticho a horký čaj. Lithiová baterie ji ale vidí jinak. Dávat energii se v mrazu nechá, brát ji nechce.

## Kde je hranice

LiFePO4 se nenabíjí pod 0 °C, nebo pod vyšší mezí, kterou uvádí datasheet baterie. Některé baterie mají mez +5 °C a pak platí ta. Rozhoduje teplota článků, ne vzduchu ve voze. Nabíjení v mrazu články nevratně poškodí.

Vybíjet v mrazu lze, běžně do −20 °C, i tady platí datasheet. Počítejte ale s tím, že baterie v mrazu dá méně. Jedna baterie se jmenovitými 100 Ah má podle výrobce při 0 °C k dispozici 80 Ah a při −20 °C jen 50 Ah.

## Kdo nabíjení zastaví

Spoléhat na to, že v mrazu nikdo nenabíjí, nestačí. Slunce svítí i na zasněženou střechu a booster začne nabíjet, jakmile nastartujete. Nabíjení proto musí zablokovat BMS, tedy elektronika, která baterii hlídá, nebo systém, který BMS řídí. Teplotu měří čidlem přímo na článcích.

- **Baterie s vestavěným BMS:** v datasheetu ověřte, že má ochranu nabíjení při nízké teplotě (anglicky low-temp charge cutoff).
- **Baterie s vnějším BMS nebo vlastní stavba:** teplotní čidlo přilepené přímo na článcích a mez nastavená podle datasheetu.

Vybíjení může BMS v mrazu dál povolit, takže topení a světla fungují dál.

## Zima a soběstačnost

V zimě je méně slunce a baterie v mrazu dá méně. Jak dlouho vydržíte bez přípojky v zimním měsíci, vyzkoušejte v kalkulačce soběstačnosti.

**Bezpečnost:** LiFePO4 nenabíjejte pod 0 °C, nebo pod vyšší mezí, kterou uvádí datasheet baterie. Nabíjení v mrazu musí zablokovat BMS podle čidla přímo na článcích. Nespoléhejte na nabíječ ani na to, že si vzpomenete. Ověřte, že baterie tuto ochranu má a že je zapnutá.
