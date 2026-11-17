// Interaktivní část interní ukázkové stránky komponent (/cs/styleguide/). Nic nepočítá, jen předvádí ovládání.
import { useEffect, useState } from "react";
import {
  Button,
  DataTable,
  IconArrowRight,
  IconLink,
  IconShare,
  Notice,
  NumberField,
  ResultCard,
  SegmentedControl,
  ShareCard,
  Slider,
  formatDecimal,
} from "@caravanix/ui";

type Texts = Record<string, string>;

export function OvladaniDemo({ t }: { t: Texts }) {
  const [raw, setRaw] = useState("120");
  const [parsed, setParsed] = useState<number | null>(120);
  const [volt, setVolt] = useState<"12" | "24" | "48">("12");
  const [len, setLen] = useState(2.3);
  const showError = raw.trim() !== "" && parsed === null;
  return (
    <div className="demo-controls">
      <div>
        <NumberField
          label={t["field.label"]}
          unit={t["field.unit"]}
          unitLabel={t["field.unitLabel"]}
          value={raw}
          onValueChange={(r, p) => {
            setRaw(r);
            setParsed(p);
          }}
          hint={
            parsed !== null ? (
              <>
                {t["field.hint"]} {t["field.parsed"]} <b className="cx-num">{formatDecimal(parsed, 3)}</b>
              </>
            ) : (
              t["field.hint"]
            )
          }
          error={showError ? t["field.error"] : undefined}
        />
      </div>
      <SegmentedControl
        legend={t["seg.legend"]}
        value={volt}
        onChange={setVolt}
        options={[
          { value: "12", label: t["seg.12"], sub: t["seg.12sub"] },
          { value: "24", label: t["seg.24"], sub: t["seg.24sub"] },
          { value: "48", label: t["seg.48"], sub: t["seg.48sub"] },
        ]}
      />
      <Slider
        label={t["slider.label"]}
        value={len}
        onChange={setLen}
        min={0.5}
        max={10}
        step={0.1}
        formatValue={(v) => `${formatDecimal(v, 1)} ${t["slider.unit"]}`}
        decrement={{ text: t["slider.dec"]!, label: t["slider.decLabel"]! }}
        increment={{ text: t["slider.inc"]!, label: t["slider.incLabel"]! }}
        marks={[{ value: 2.6, label: t["slider.mark"] }]}
        note={t["slider.note"]}
      />
    </div>
  );
}

export function SdileniDemo({ t, brand }: { t: Texts; brand: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    setCanShare("share" in navigator);
    setUrl(location.href);
  }, []);
  return (
    <>
      <ShareCard
        brand={brand}
        label={t["share.cardLabel"]}
        title={t["share.cardTitle"]}
        inputs={t["share.inputs"]}
        status={{ kind: "ok", word: t["result.status"] }}
        values={[
          { label: t["result.primary.label"], value: t["result.primary.value"]!, unit: t["result.primary.unit"] },
          { label: t["result.fuse.label"], value: t["result.fuse.value"]!, unit: t["result.fuse.unit"] },
          { label: t["result.drop.label"], value: t["result.drop.value"]!, unit: t["result.drop.unit"] },
        ]}
        url={t["share.url"]}
        disclaimer={t["share.disclaimer"]}
        actions={
          <>
            <Button
              icon={<IconLink className="cx-icon" />}
              variant="secondary"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(url);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {t["share.copy"]}
            </Button>
            {canShare ? (
              <Button icon={<IconShare className="cx-icon" />} onClick={() => navigator.share({ title: t["share.cardTitle"], url }).catch(() => {})}>
                {t["share.send"]}
              </Button>
            ) : null}
          </>
        }
      />
      <p className="cx-hint" role="status">
        {copied ? t["share.copied"] : ""}
      </p>
    </>
  );
}

// ---------- statické ukázky (vykreslí se na serveru, bez hydratace) ----------

export function TlacitkaUkazka({ t }: { t: Texts }) {
  return (
    <div className="cx-btns">
      <Button icon={<IconArrowRight className="cx-icon" />}>{t["buttons.primary"]}</Button>
      <Button variant="secondary">{t["buttons.secondary"]}</Button>
      <Button variant="quiet">{t["buttons.quiet"]}</Button>
      <Button variant="secondary" disabled>
        {t["buttons.disabled"]}
      </Button>
    </div>
  );
}

export function VysledekUkazka({ t }: { t: Texts }) {
  return (
    <div className="demo-grid">
      <ResultCard
        id="karta-vysledku"
        title={t["result.title"]}
        headingLevel={3}
        meta={t["result.meta"]}
        primary={{ label: t["result.primary.label"], value: t["result.primary.value"]!, unit: t["result.primary.unit"], note: t["result.primary.note"] }}
        secondary={[
          { label: t["result.fuse.label"], value: t["result.fuse.value"]!, unit: t["result.fuse.unit"] },
          { label: t["result.drop.label"], value: t["result.drop.value"]!, unit: t["result.drop.unit"], note: t["result.drop.note"] },
        ]}
        status={{ kind: "ok", word: t["result.status"] }}
        summary={t["result.summary"]}
      >
        <div className="cx-btns">
          <Button icon={<IconShare className="cx-icon" />}>{t["result.share"]}</Button>
          <Button variant="secondary">{t["result.add"]}</Button>
        </div>
      </ResultCard>
      <div>
        <h3 className="demo-h3 demo-h3--top">{t["notices.title"]}</h3>
        <p className="cx-muted">{t["notices.lead"]}</p>
        <div className="cx-notices">
          <Notice kind="ok" word={t["notice.ok.word"]}>
            <p>{t["notice.ok.text"]}</p>
          </Notice>
          <Notice kind="warn" word={t["notice.warn.word"]}>
            <p>{t["notice.warn.text"]}</p>
          </Notice>
          <Notice kind="block" word={t["notice.block.word"]}>
            <p>{t["notice.block.text"]}</p>
          </Notice>
        </div>
      </div>
    </div>
  );
}

export function TabulkaUkazka({ t, rows }: { t: Texts; rows: Record<string, string>[] }) {
  return (
    <DataTable
      caption={t["type.caption"]}
      columns={[
        { key: "level", header: t["type.col.level"] },
        { key: "mobile", header: t["type.col.mobile"], numeric: true },
        { key: "desktop", header: t["type.col.desktop"], numeric: true },
        { key: "weight", header: t["type.col.weight"], numeric: true },
      ]}
      rows={rows}
      highlightIndex={5}
      note={t["type.note"]}
    />
  );
}
