// Vizuální regresní testy (docs/design/VIZUAL.md, Vizuální brána): Playwright toHaveScreenshot nad sestaveným webem.
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/vizual",
  snapshotPathTemplate: "{testDir}/snimky/{arg}{ext}",
  fullyParallel: true,
  reporter: [["list"]],
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled" } },
  use: { baseURL: "http://127.0.0.1:4600", reducedMotion: "reduce" },
  webServer: {
    command: "npm run build && npx astro preview --root apps/web --port 4600",
    url: "http://127.0.0.1:4600/cs/",
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
