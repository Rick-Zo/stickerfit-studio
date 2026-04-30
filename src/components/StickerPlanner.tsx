"use client";

import {
  BadgeDollarSign,
  Copy,
  Download,
  FileSpreadsheet,
  Layers,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  buildCsv,
  buildSvg,
  calculateProfit,
  DEFAULT_COSTS,
  DEFAULT_ITEMS,
  packStickers,
  SHEET_PRESETS,
  type CostSettings,
  type PackResult,
  type StickerItem,
} from "@/lib/sticker-packer";

const colorSwatches = ["#2bb3a3", "#e56b5d", "#f2b84b", "#5f8dd3", "#90be6d", "#9d6fe0"];

type DownloadKind = "svg" | "csv";

export function StickerPlanner() {
  const [presetId, setPresetId] = useState(SHEET_PRESETS[0].id);
  const [items, setItems] = useState<StickerItem[]>(DEFAULT_ITEMS);
  const [bleed, setBleed] = useState(0.06);
  const [gap, setGap] = useState(0.08);
  const [margin, setMargin] = useState(0.05);
  const [allowRotation, setAllowRotation] = useState(true);
  const [costs, setCosts] = useState<CostSettings>(DEFAULT_COSTS);
  const [activeSheet, setActiveSheet] = useState(0);
  const [copied, setCopied] = useState(false);

  const preset = SHEET_PRESETS.find((sheet) => sheet.id === presetId) ?? SHEET_PRESETS[0];
  const pack = useMemo(
    () =>
      packStickers(items, {
        preset,
        bleed,
        gap,
        margin,
        allowRotation,
      }),
    [allowRotation, bleed, gap, items, margin, preset],
  );
  const profit = useMemo(() => calculateProfit(pack, costs), [costs, pack]);
  const currentSheet = pack.sheets[Math.min(activeSheet, Math.max(0, pack.sheets.length - 1))];

  function updateItem(id: string, patch: Partial<StickerItem>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    setActiveSheet(0);
  }

  function addItem() {
    const color = colorSwatches[items.length % colorSwatches.length];
    setItems((current) => [
      ...current,
      {
        id: `item-${Date.now()}`,
        name: "New sticker",
        width: 1.5,
        height: 1.5,
        quantity: 10,
        color,
      },
    ]);
  }

  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function download(kind: DownloadKind) {
    const data = kind === "svg" ? buildSvg(pack, preset) : buildCsv(pack);
    const type = kind === "svg" ? "image/svg+xml" : "text/csv";
    const url = URL.createObjectURL(new Blob([data], { type }));
    const link = document.createElement("a");
    link.href = url;
    link.download = kind === "svg" ? "stickerfit-layout.svg" : "stickerfit-cut-list.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function copyBrief() {
    const brief = [
      `StickerFit production brief`,
      `Preset: ${preset.label}`,
      `Sheets: ${Math.max(1, pack.sheets.length)}`,
      `Placed: ${pack.totalPlaced}/${pack.totalRequested}`,
      `Coverage: ${Math.round(pack.coverage * 100)}%`,
      `Gross profit: $${profit.grossProfit.toFixed(2)} (${Math.round(profit.marginPercent * 100)}% margin)`,
    ].join("\n");

    await navigator.clipboard.writeText(brief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="tool-shell" aria-label="Sticker sheet planner">
      <div className="workspace-panel controls-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Production setup</p>
            <h2>Sheet recipe</h2>
          </div>
          <Layers aria-hidden="true" />
        </div>

        <fieldset className="segmented-control" aria-label="Sheet preset">
          {SHEET_PRESETS.map((sheet) => (
            <label key={sheet.id} className={sheet.id === presetId ? "is-selected" : ""}>
              <input
                type="radio"
                name="preset"
                value={sheet.id}
                checked={sheet.id === presetId}
                onChange={() => {
                  setPresetId(sheet.id);
                  setActiveSheet(0);
                }}
              />
              <span>{sheet.label}</span>
            </label>
          ))}
        </fieldset>
        <p className="preset-note">{preset.note}</p>

        <div className="settings-grid">
          <NumberInput label="Bleed" value={bleed} min={0} max={0.25} step={0.01} onChange={setBleed} suffix="in" />
          <NumberInput label="Gap" value={gap} min={0} max={0.35} step={0.01} onChange={setGap} suffix="in" />
          <NumberInput label="Safety margin" value={margin} min={0} max={0.4} step={0.01} onChange={setMargin} suffix="in" />
        </div>

        <label className="toggle-row">
          <input type="checkbox" checked={allowRotation} onChange={(event) => setAllowRotation(event.target.checked)} />
          <span>
            <strong>Allow rotation</strong>
            <small>Rotate labels when it improves yield.</small>
          </span>
        </label>

        <div className="item-toolbar">
          <h3>Sticker mix</h3>
          <button className="icon-button" type="button" onClick={addItem} aria-label="Add sticker item" title="Add item">
            <Plus size={18} />
          </button>
        </div>

        <div className="item-list">
          {items.map((item) => (
            <article className="item-card" key={item.id}>
              <div className="item-card__top">
                <input
                  aria-label="Sticker name"
                  className="text-field"
                  value={item.name}
                  onChange={(event) => updateItem(item.id, { name: event.target.value })}
                />
                <button
                  className="icon-button danger"
                  type="button"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  aria-label={`Remove ${item.name}`}
                  title="Remove item"
                >
                  <Trash2 size={17} />
                </button>
              </div>
              <div className="settings-grid compact">
                <NumberInput label="W" value={item.width} min={0.1} max={8} step={0.05} onChange={(value) => updateItem(item.id, { width: value })} suffix="in" />
                <NumberInput label="H" value={item.height} min={0.1} max={10} step={0.05} onChange={(value) => updateItem(item.id, { height: value })} suffix="in" />
                <NumberInput label="Qty" value={item.quantity} min={1} max={400} step={1} onChange={(value) => updateItem(item.id, { quantity: value })} />
              </div>
              <div className="swatch-row" aria-label="Color swatches">
                {colorSwatches.map((color) => (
                  <button
                    className={color === item.color ? "swatch is-selected" : "swatch"}
                    style={{ backgroundColor: color }}
                    key={color}
                    type="button"
                    onClick={() => updateItem(item.id, { color })}
                    aria-label={`Use ${color}`}
                    title={color}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="workspace-panel preview-panel">
        <div className="panel-heading preview-heading">
          <div>
            <p className="eyebrow">Live nesting preview</p>
            <h2>{pack.sheets.length || 1} sheet plan</h2>
          </div>
          <div className="sheet-tabs" aria-label="Sheet pages">
            {(pack.sheets.length ? pack.sheets : [{ index: 1 }]).map((sheet, index) => (
              <button
                className={index === activeSheet ? "is-selected" : ""}
                key={sheet.index}
                type="button"
                onClick={() => setActiveSheet(index)}
              >
                {sheet.index}
              </button>
            ))}
          </div>
        </div>

        <SheetPreview pack={pack} preset={preset} sheet={currentSheet} />

        <div className="export-row">
          <button className="action-button" type="button" onClick={() => download("svg")}>
            <Download size={18} />
            Export SVG
          </button>
          <button className="action-button" type="button" onClick={() => download("csv")}>
            <FileSpreadsheet size={18} />
            Cut list CSV
          </button>
          <button className="action-button ghost" type="button" onClick={copyBrief}>
            <Copy size={18} />
            {copied ? "Copied" : "Copy brief"}
          </button>
        </div>
      </div>

      <div className="workspace-panel insights-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Yield and pricing</p>
            <h2>Profit check</h2>
          </div>
          <BadgeDollarSign aria-hidden="true" />
        </div>

        <div className="metric-grid">
          <Metric label="Placed" value={`${pack.totalPlaced}/${pack.totalRequested}`} />
          <Metric label="Coverage" value={`${Math.round(pack.coverage * 100)}%`} />
          <Metric label="Waste" value={`${pack.wasteArea.toFixed(1)} in²`} />
          <Metric label="Profit" value={`$${profit.grossProfit.toFixed(2)}`} tone={profit.grossProfit >= 0 ? "good" : "bad"} />
        </div>

        <div className="settings-grid pricing">
          <NumberInput
            label="Sell price"
            value={costs.sellingPricePerSheet}
            min={0}
            max={99}
            step={0.1}
            onChange={(value) => setCosts((current) => ({ ...current, sellingPricePerSheet: value }))}
            suffix="$"
          />
          <NumberInput
            label="Material"
            value={costs.materialCostPerSheet}
            min={0}
            max={20}
            step={0.05}
            onChange={(value) => setCosts((current) => ({ ...current, materialCostPerSheet: value }))}
            suffix="$"
          />
          <NumberInput
            label="Ink"
            value={costs.inkCostPerSheet}
            min={0}
            max={20}
            step={0.05}
            onChange={(value) => setCosts((current) => ({ ...current, inkCostPerSheet: value }))}
            suffix="$"
          />
          <NumberInput
            label="Platform fee"
            value={costs.platformFeePercent}
            min={0}
            max={40}
            step={0.5}
            onChange={(value) => setCosts((current) => ({ ...current, platformFeePercent: value }))}
            suffix="%"
          />
        </div>

        <dl className="profit-list">
          <div>
            <dt>Break-even price</dt>
            <dd>${profit.breakEvenPrice.toFixed(2)} / sheet</dd>
          </div>
          <div>
            <dt>Profit per sticker</dt>
            <dd>${profit.profitPerSticker.toFixed(2)}</dd>
          </div>
          <div>
            <dt>Margin</dt>
            <dd>{Math.round(profit.marginPercent * 100)}%</dd>
          </div>
        </dl>

        <div className="suggestion-box">
          <div className="suggestion-title">
            <RotateCcw size={17} />
            Layout notes
          </div>
          <ul>
            {pack.suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SheetPreview({
  pack,
  preset,
  sheet,
}: {
  pack: PackResult;
  preset: (typeof SHEET_PRESETS)[number];
  sheet?: PackResult["sheets"][number];
}) {
  const pageWidth = preset.pageWidth;
  const pageHeight = preset.pageHeight;

  return (
    <div className="sheet-preview" data-testid="sheet-preview">
      <svg viewBox={`0 0 ${pageWidth} ${pageHeight}`} role="img" aria-label="Sticker layout preview">
        <rect className="sheet-paper" x="0" y="0" width={pageWidth} height={pageHeight} rx="0.08" />
        <rect
          className="cut-area"
          x={pack.cutArea.x}
          y={pack.cutArea.y}
          width={pack.cutArea.width}
          height={pack.cutArea.height}
          rx="0.08"
        />
        {sheet?.stickers.map((sticker, index) => (
          <g key={`${sticker.itemId}-${index}`}>
            <rect
              className="sticker-shape"
              x={sticker.x}
              y={sticker.y}
              width={sticker.width}
              height={sticker.height}
              rx="0.08"
              style={{ fill: sticker.color }}
            />
            <text x={sticker.x + 0.08} y={sticker.y + 0.22}>
              {sticker.itemName}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function NumberInput({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="number-field">
      <span>{label}</span>
      <div>
        {suffix === "$" ? <b>$</b> : null}
        <input
          type="number"
          value={Number.isInteger(value) ? value : value.toFixed(2)}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        {suffix && suffix !== "$" ? <b>{suffix}</b> : null}
      </div>
    </label>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  return (
    <div className={`metric ${tone ? `metric--${tone}` : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
