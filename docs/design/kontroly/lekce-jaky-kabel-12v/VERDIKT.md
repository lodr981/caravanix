# Kontrola: lekce „Kabel je kabel?“ (`/cs/lekce/jaky-kabel-12v/`)

**Verdikt: SCHVÁLENO** (16. 11. 2026, designér, 1. kolo; drobnosti opravené přímo v kódu)

Screenshoty `lekce-jaky-kabel-12v-*.jpg` (360 / 768 / 1280 px, světlý i tmavý, 360 px při 200 %), `node tools/design/screenshoty.mjs --rez`. Automatické kontroly po opravách bez nálezů, kontrast všech textů alespoň 7 : 1.

## Kontrolní seznam

- [x] Do 3 vteřin je jasné, o čem lekce je (nadpis a tučná zásada pod ním).
- [x] Hlavní sdělení (zásada) je po nadpisu nejvýraznější; tlačítko do kalkulačky na konci.
- [x] Pravidla kapitoly 2 (text 18–20 px, šířka textu nejvýš 44 rem, kontrast nástrojem, cíle 48 px).
- [x] Nic nepřetéká ani při 200 % (po opravě).
- [x] Tmavý režim je stejně čitelný.
- [x] Bez animací. Žádné cizí logo ani fotka. Česká typografie v pořádku.
- [x] Klidné a čitelné.

## Co jsem opravil (šablona `apps/web/src/pages/cs/lekce/[slug].astro`, platí pro obě lekce)

1. Článek byl na 1 280 px vycentrovaný, zatímco hlavička a patička jsou vlevo → zarovnaný s mřížkou, šířku 44 rem drží jednotlivé bloky.
2. Nadpisy H2 lepily na následující odstavec → mezera nad (3 rem) i pod (0,75 rem); mezery v seznamech.
3. Kódy karet se lámaly uprostřed („K-“ / „VODIC-0007“) → každý kód je nezlomitelný.
4. Tlačítko „Spočítat v kalkulačce“ při 200 % zasahovalo do okraje → na velmi úzkém okně menší vnitřní okraj tlačítek (`packages/ui`).

## Nález pro autora (`content/cs/`, neměnil jsem)

- Mýtus nad nadpisem („Kabel je kabel.“) je jen kurzívou bez označení; čtenář ho může vzít jako tvrzení webu. Doporučuji v `content/cs/lekce.json` klíč typu „Mýtus:“; šablona ho pak zobrazí (text natvrdo do šablony nepatří).
