# Kontrola: lekce „Pojistka chrání kabel“ (`/cs/lekce/pojistka-chrani-kabel/`)

**Verdikt: SCHVÁLENO** (16. 11. 2026, designér, 1. kolo; drobnosti opravené přímo v kódu)

Screenshoty `lekce-pojistka-chrani-kabel-*.jpg` (360 / 768 / 1280 px, světlý i tmavý, 360 px při 200 %), `node tools/design/screenshoty.mjs --rez`. Automatické kontroly po opravách bez nálezů, kontrast všech textů alespoň 7 : 1.

## Kontrolní seznam

- [x] Do 3 vteřin je jasné, o čem lekce je (nadpis a tučná zásada pod ním).
- [x] Hlavní sdělení (zásada) je po nadpisu nejvýraznější; tlačítko do kalkulačky na konci.
- [x] Pravidla kapitoly 2 (text 18–20 px, šířka textu nejvýš 44 rem, kontrast nástrojem, cíle 48 px).
- [x] Nic nepřetéká ani při 200 % (po opravě).
- [x] Tmavý režim je stejně čitelný.
- [x] Bez animací. Žádné cizí logo ani fotka. Česká typografie v pořádku.
- [x] Klidné a čitelné.

## Co jsem opravil

Stejné opravy šablony jako u lekce „Kabel je kabel?“ (`docs/design/kontroly/lekce-jaky-kabel-12v/VERDIKT.md`): zarovnání článku s mřížkou, mezery pod nadpisy H2, nezlomitelné kódy karet, tlačítko při 200 %.

## Nálezy pro autora (`content/cs/`, neměnil jsem)

- Mýtus nad nadpisem („Pojistka chrání spotřebič.“) je jen kurzívou bez označení; čtenář ho může vzít jako tvrzení webu. Doporučuji v `content/cs/lekce.json` klíč typu „Mýtus:“.
- Termín „Class T“ (sekce Velké proudy, i hláška kalkulačky) laik nezná; zvážit krátké vysvětlení.

## 2. kolo (16. 11. 2026, commit bfaf300): SCHVÁLENO

Kontrola delších textů po čtenáři laikovi a štítku „Častý omyl:“. Screenshoty výše přepsané, automatické kontroly bez nálezů, kontrast alespoň 7 : 1.

- Štítek „Častý omyl:“ (tučně) a mýtus kurzívou v uvozovkách nad nadpisem: čtenář už mýtus nevezme za tvrzení webu. Můj nález z 1. kola je vyřízený.
- Termín Class T je teď v sekci „Velké proudy“ vysvětlený; můj nález z 1. kola je vyřízený.
- Delší odstavce drží šířku nejvýš 44 rem, nic nepřetéká ani při 200 %.
- Ve světlém i tmavém režimu stejně čitelné.

Nic jsem neopravoval. Poznámka bez nutnosti zásahu: `text-wrap: pretty` v Chromiu občas zkrátí předposlední řádky odstavce (zubatější pravý okraj), výměnou za to nezůstávají osamocená slova.
