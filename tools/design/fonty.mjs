// Zkopíruje písmo IBM Plex Sans z @fontsource/ibm-plex-sans do packages/ui/src/fonts/ a složí fonts.css.
// Jen podmnožiny latin a latin-ext a řezy 400, 600, 700 (woff2). unicode-range se přebírá z balíčku,
// takže prohlížeč stáhne jen soubory se znaky, které stránka opravdu obsahuje.
// Spuštění: node tools/design/fonty.mjs
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const require = createRequire(join(ROOT, "packages", "ui", "package.json"));
const PKG = dirname(require.resolve("@fontsource/ibm-plex-sans/package.json"));
const OUT = join(ROOT, "packages", "ui", "src", "fonts");
mkdirSync(OUT, { recursive: true });

const faces = [];
for (const w of [400, 600, 700]) {
  const css = readFileSync(join(PKG, `${w}.css`), "utf8");
  for (const subset of ["latin-ext", "latin"]) {
    const file = `ibm-plex-sans-${subset}-${w}-normal.woff2`;
    const block = css.split("@font-face").find((b) => b.includes(`/${file}`));
    const range = block?.match(/unicode-range:\s*([^;]+);/)?.[1];
    if (!range) throw new Error(`v ${w}.css chybí ${file} nebo jeho unicode-range`);
    copyFileSync(join(PKG, "files", file), join(OUT, file));
    faces.push(`@font-face {
  font-family: "IBM Plex Sans";
  font-style: normal;
  font-weight: ${w};
  font-display: swap;
  src: url("./fonts/${file}") format("woff2");
  unicode-range: ${range};
}`);
  }
}
copyFileSync(join(PKG, "LICENSE"), join(OUT, "LICENSE-ibm-plex-sans.txt"));
const version = JSON.parse(readFileSync(join(PKG, "package.json"), "utf8")).version;
writeFileSync(
  join(ROOT, "packages", "ui", "src", "fonts.css"),
  `/* Vygenerováno: node tools/design/fonty.mjs z @fontsource/ibm-plex-sans ${version}. Ručně neupravovat.
   IBM Plex Sans, SIL OFL 1.1 (fonts/LICENSE-ibm-plex-sans.txt). Self-hosted, latin a latin-ext, řezy 400, 600, 700. */
${faces.join("\n")}
`,
);
console.log(`fonts.css a ${faces.length} souborů woff2 zapsáno do packages/ui/src/.`);
