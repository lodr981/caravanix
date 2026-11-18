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
  // Pevně IPv4 127.0.0.1:4321: „localhost“ se jinak může navázat jen na IPv6 (::1) a prohlížeč web nenajde.
  // Striktní port: když je 4321 obsazený (jiný projekt), server raději spadne, než aby se tiše přesunul.
  // Rozvadix na stejném PC používá 5000 (backend) a 5173 (frontend).
  server: { host: "127.0.0.1", port: 4321 },
  vite: { server: { strictPort: true } },
});
