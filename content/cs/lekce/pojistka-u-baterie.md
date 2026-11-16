---
titulek: "U baterie stačí obyčejná pojistka?"
seoTitulek: "Pojistka u lithiové baterie: proč Class T – Caravanix"
popis: "Lithiová baterie dá při zkratu tisíce ampér. Proč u ní obyčejná pojistka nestačí, co je vypínací schopnost a proč k baterii patří pojistka Class T."
mytus: "„U baterie stačí obyčejná pojistka.“"
zasada: "Lithiová baterie dá při zkratu tisíce ampér, proto hned u ní musí být hlavní pojistka s dostatečnou vypínací schopností, typicky Class T, a ostatní pojistky až za ní."
karty: [K-LEKCE-0004, K-LEKCE-0005, K-VODIC-0013, K-VODIC-0036]
kalkulacka: "/cs/kalkulacka-prurezu/"
poradi: 4
---
Pojistka má jednoduchou práci: při zkratu přerušit proud. U lithiové baterie ale ten proud není potůček, je to spíš jarní povodeň. A ne každá hráz ji udrží.

## Kolik dá baterie při zkratu

Baterie LiFePO4 má velmi malý vnitřní odpor. U jedné baterie 12,8 V a 100 Ah uvádí výrobce v datasheetu 0,8 mΩ. Při zkratu přímo na pólech by z ní teoreticky mohlo téct až 16 000 A. Ani kabel moc nepomůže: s kabelem 35 mm², metr tam a metr zpět, je to pořád asi 7 000 A. Jde o odhad bez odporu spojů, tedy horní mez. Řád je ale jasný: tisíce ampér. U paralelně zapojených baterií se zkratové proudy sčítají.

## Co je vypínací schopnost

Každá pojistka má vedle jmenovitého proudu ještě vypínací schopnost. To je největší proud, který dokáže bezpečně přerušit. Když je zkratový proud větší, pojistka ho přerušit nemusí. Vypínací schopnost podle datasheetů:

- nožová pojistka: 1 000 A,
- šroubovací MIDI a MEGA: 2 000 A,
- Class T: 20 000 A.

Nožová, MIDI ani MEGA pojistka tedy na zkrat běžné lithiové baterie nestačí.

## Kam která pojistka patří

Hned u baterie, na plusovém vodiči co nejblíž k ní, patří hlavní pojistka s dostatečnou vypínací schopností, typicky Class T. Teprve za ní jsou ostatní pojistky a odbočky ke spotřebičům. Ty chrání své kabely, jak popisuje lekce „Pojistka chrání kabel“.

Kalkulačka průřezu vám u velkého proudu, pro který už pojistku nenabídne, ukáže hlášku: „Hlavní vedení: pojistka Class T u baterie, řiďte se návodem výrobce a návrhem odborníka.“

**Bezpečnost:** Hned u lithiové baterie musí být hlavní pojistka, jejíž vypínací schopnost je aspoň tak velká jako zkratový proud baterie, typicky Class T. Nožová, MIDI ani MEGA pojistka na to nestačí. Patří na plus co nejblíž k baterii, ostatní pojistky jsou až za ní. Hlavní vedení navrhuje odborník podle návodu výrobce.
