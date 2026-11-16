import { defineConfig } from "vitest/config";

// Testy enginu, dat a akceptační testy (tests/). Prohlížečové testy běží přes Playwright zvlášť.
export default defineConfig({
  test: {
    include: ["packages/*/tests/**/*.test.ts", "tests/**/*.test.ts"],
  },
});
