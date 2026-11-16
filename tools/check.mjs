// Brány alfy (docs/ZADANI.md, kapitola První alfa). Nesplněná nebo nezavedená brána = neúspěch.
import { spawnSync } from "node:child_process";

const run = (cmd) => spawnSync(cmd, { shell: true, stdio: "inherit" }).status === 0;

const gates = [
  { name: "Testy enginu a dat (vitest)", run: () => run("npx vitest run") },
  { name: "Build webu", run: () => run("npm run build") },
  { name: "Karty tvrzení (K6)", run: null },
  { name: "Evidence licencí", run: null },
  { name: "Schválení designérem", run: null },
  { name: "Lighthouse ≥ 95", run: null },
  { name: "Sitemap a prázdný profil de", run: null },
];

let ok = true;
const results = gates.map((g) => {
  const status = g.run ? (g.run() ? "OK" : "NEPROŠLO") : "NEZAVEDENO";
  if (status !== "OK") ok = false;
  return [g.name, status];
});
console.log("\nBrány alfy:");
for (const [n, s] of results) console.log(`  ${s.padEnd(11)} ${n}`);
process.exit(ok ? 0 : 1);
