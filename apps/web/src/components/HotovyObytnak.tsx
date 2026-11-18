// Rozcestí „Vylepšuji hotový obytňák“ (Radek 18. 11. 2026): uživatel zaškrtne, co ve voze má a co chce,
// a dostane postup sestavený z textů (content/cs/obytnak.json). Nic nepočítá, jen odkazuje do kalkulaček a lekcí.
import { IconArrowRight } from "@caravanix/ui";
import { useStavVUrl, type Texts } from "./kalk/spolecne.tsx";
import data from "../../../../content/cs/obytnak.json";

const MAM = ["olovo", "elektroblok", "rele", "solar", "vybiji"] as const;
const CHCI = ["lithium", "solar", "booster", "menic", "vydrz"] as const;
const VYCHOZI = { m: [] as string[], c: [] as string[] };

interface Krok {
  id: string;
  kdy: string[];
  nadpis: string;
  text: string;
  odkazy: { href: string; text: string }[];
}

export function HotovyObytnak() {
  const t = data as unknown as Texts & { kroky: Krok[] };
  const [s, set] = useStavVUrl(VYCHOZI);
  const zvoleno = new Set([...s.m.map((x) => `mam.${x}`), ...s.c.map((x) => `chci.${x}`)]);
  // Podmínka „a+b“ platí, když jsou zaškrtnuté obě volby; krok se ukáže, když platí aspoň jedna podmínka.
  const plati = (k: Krok) => k.kdy.some((p) => p.split("+").every((x) => zvoleno.has(x)));
  const kroky = t.kroky.filter(plati);
  const prepni = (pole: "m" | "c", id: string) => {
    const seznam = s[pole].includes(id) ? s[pole].filter((x) => x !== id) : [...s[pole], id];
    set({ [pole]: seznam } as Partial<typeof VYCHOZI>);
  };

  return (
    <div className="obt">
      <div className="obt-volby">
        {(
          [
            ["m", "mam", MAM],
            ["c", "chci", CHCI],
          ] as const
        ).map(([pole, prefix, volby]) => (
          <fieldset key={pole} className="obt-skupina">
            <legend>{t[`${prefix}.h`]}</legend>
            {volby.map((id) => (
              <label key={id} className="kalk-check">
                <input type="checkbox" checked={s[pole].includes(id)} onChange={() => prepni(pole, id)} />
                <span>{t[`${prefix}.${id}`]}</span>
              </label>
            ))}
          </fieldset>
        ))}
      </div>

      <section className="obt-postup" aria-labelledby="obt-postup-h" aria-live="polite">
        <h2 id="obt-postup-h">{t["postup.h"]}</h2>
        {kroky.length === 0 ? (
          <p className="cx-muted">{t["postup.prazdny"]}</p>
        ) : (
          <ol className="obt-kroky">
            {kroky.map((k, i) => (
              <li key={k.id} className="obt-krok">
                <span className="obt-cislo">{i + 1}</span>
                <div>
                  <h3>{k.nadpis}</h3>
                  <p>{k.text}</p>
                  {k.odkazy.length > 0 ? (
                    <ul>
                      {k.odkazy.map((o) => (
                        <li key={o.href}>
                          <a href={o.href}>{o.text}</a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        )}
        {kroky.length > 0 ? (
          <div className="obt-zaver">
            <p>{t["postup.zapojeni"]}</p>
            <a className="cx-btn cx-btn--primary" href="/cs/zapojeni/">
              <span>{t["postup.zapojeniTlacitko"]}</span>
              <IconArrowRight className="cx-icon" />
            </a>
            <p className="cx-hint">{t["postup.zaver"]}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
