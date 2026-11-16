// Tabulka jedné skupiny katalogu spotřebičů (vykreslí se na serveru, bez hydratace).
import type { SpotrebicKatalogu } from "@caravanix/data";
import { DataTable, formatDecimal } from "@caravanix/ui";

const NBSP = " ";
const w = (x: number) => `${formatDecimal(x, 1).replace(/ /g, NBSP)}${NBSP}W`;
const odkaz = (p: SpotrebicKatalogu) =>
  `/cs/kalkulacka-spotrebicu/?s=${encodeURIComponent(
    JSON.stringify({
      r: [{ n: p.nazev, w: String(p.prikonW).replace(".", ","), h: p.hodinDenne === null ? "1" : String(p.hodinDenne).replace(".", ","), ac: p.napajeni === "230V" }],
    }),
  )}`;

export function KatalogTabulka({ t, nadpis, polozky }: { t: Record<string, string>; nadpis: string; polozky: SpotrebicKatalogu[] }) {
  return (
    <DataTable
      caption={nadpis}
      rowHeader="nazev"
      columns={[
        { key: "nazev", header: t["col.nazev"] },
        { key: "napajeni", header: t["col.napajeni"] },
        { key: "prikon", header: t["col.prikon"], numeric: true },
        { key: "rozsah", header: t["col.rozsah"], numeric: true },
        { key: "spicka", header: t["col.spicka"], numeric: true },
        { key: "hodin", header: t["col.hodin"], numeric: true },
        { key: "poznamka", header: t["col.poznamka"] },
        { key: "akce", header: t["col.akce"] },
      ]}
      rows={polozky.map((p) => ({
        nazev: p.nazev,
        napajeni: t[`napajeni.${p.napajeni}`] ?? p.napajeni,
        prikon: w(p.prikonW),
        rozsah: p.rozsahW[0] === p.rozsahW[1] ? t["nic"] : `${formatDecimal(p.rozsahW[0], 1)}–${w(p.rozsahW[1])}`,
        spicka: p.spickaW === null ? t["nic"] : w(p.spickaW),
        hodin: p.hodinDenne === null ? t["nic"] : `${formatDecimal(p.hodinDenne, 1)}${NBSP}h`,
        poznamka: p.poznamka,
        akce: <a href={odkaz(p)}>{t["pridat"]}</a>,
      }))}
    />
  );
}
