// Klíčové stránky a styleguide v 360 a 1280 px, světlý i tmavý režim. Při záměrné změně vzhledu
// se snímky obnoví příkazem `npm run vizual:obnovit` a nové snímky schválí designér.
import { expect, test } from "@playwright/test";

const STRANKY = [
  { id: "uvod", url: "/cs/" },
  { id: "styleguide", url: "/cs/styleguide/" },
  { id: "prurez", url: "/cs/kalkulacka-prurezu/" },
  { id: "sobestacnost", url: "/cs/kalkulacka-sobestacnosti/" },
  { id: "lekce", url: "/cs/lekce/pojistka-chrani-kabel/" },
  { id: "zapojeni", url: "/cs/zapojeni/" },
];
const SIRKY = [360, 1280];
const REZIMY = ["light", "dark"] as const;

for (const s of STRANKY)
  for (const w of SIRKY)
    for (const r of REZIMY)
      test(`${s.id} ${w} ${r}`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: r, reducedMotion: "reduce" });
        await page.setViewportSize({ width: w, height: 900 });
        await page.goto(s.url);
        await page.waitForLoadState("networkidle");
        await page.evaluate(() => document.fonts.ready);
        await expect(page).toHaveScreenshot(`${s.id}-${w}-${r}.png`, { fullPage: true });
      });
