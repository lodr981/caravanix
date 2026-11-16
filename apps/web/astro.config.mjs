import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Jazyky: alfa jen cs. Další jazyk = nový profil v docs/profily/ a obsah v content/<kód>/.
export default defineConfig({
  integrations: [react()],
  i18n: {
    defaultLocale: "cs",
    locales: ["cs"],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
  // Stará adresa kalkulačky průřezu (před rychlou alfou).
  redirects: { "/cs/kalkulacky/prurez-kabelu": "/cs/kalkulacka-prurezu/" },
  telemetry: false,
});
