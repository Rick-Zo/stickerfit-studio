import { describe, expect, it } from "vitest";
import {
  buildCsv,
  calculateProfit,
  packStickers,
  SHEET_PRESETS,
  type CostSettings,
  type StickerItem,
} from "./sticker-packer";

const cricutLetter = SHEET_PRESETS.find((preset) => preset.id === "cricut-letter")!;

describe("packStickers", () => {
  it("packs a simple 2 inch sticker grid inside the Cricut Letter working area", () => {
    const items: StickerItem[] = [
      {
        id: "round",
        name: "Round",
        width: 2,
        height: 2,
        quantity: 12,
        color: "#2bb3a3",
      },
    ];

    const result = packStickers(items, {
      preset: cricutLetter,
      bleed: 0,
      gap: 0,
      margin: 0,
      allowRotation: false,
    });

    expect(result.sheets).toHaveLength(1);
    expect(result.totalPlaced).toBe(12);
    expect(result.coverage).toBeGreaterThan(0.45);
    for (const sticker of result.sheets[0].stickers) {
      expect(sticker.x).toBeGreaterThanOrEqual(result.cutArea.x);
      expect(sticker.y).toBeGreaterThanOrEqual(result.cutArea.y);
      expect(sticker.x + sticker.width).toBeLessThanOrEqual(result.cutArea.x + result.cutArea.width + 0.001);
      expect(sticker.y + sticker.height).toBeLessThanOrEqual(result.cutArea.y + result.cutArea.height + 0.001);
    }
  });

  it("uses rotation when a sticker is too wide but fits vertically", () => {
    const items: StickerItem[] = [
      {
        id: "wide-label",
        name: "Wide label",
        width: 9,
        height: 2,
        quantity: 1,
        color: "#e56b5d",
      },
    ];

    const blocked = packStickers(items, {
      preset: cricutLetter,
      bleed: 0,
      gap: 0,
      margin: 0,
      allowRotation: false,
    });
    const rotated = packStickers(items, {
      preset: cricutLetter,
      bleed: 0,
      gap: 0,
      margin: 0,
      allowRotation: true,
    });

    expect(blocked.totalPlaced).toBe(0);
    expect(rotated.totalPlaced).toBe(1);
    expect(rotated.sheets[0].stickers[0].rotated).toBe(true);
  });

  it("reports unplaced stickers when the item exceeds every orientation", () => {
    const result = packStickers(
      [
        {
          id: "poster",
          name: "Poster",
          width: 12,
          height: 12,
          quantity: 2,
          color: "#5f8dd3",
        },
      ],
      {
        preset: cricutLetter,
        bleed: 0.1,
        gap: 0.1,
        margin: 0.1,
        allowRotation: true,
      },
    );

    expect(result.totalPlaced).toBe(0);
    expect(result.unplaced.poster).toBe(2);
    expect(result.suggestions[0]).toMatch(/larger than the usable cut area/i);
  });
});

describe("calculateProfit", () => {
  it("calculates margin and break-even price from sheet-level costs", () => {
    const pack = packStickers(
      [
        {
          id: "mini",
          name: "Mini",
          width: 1,
          height: 1,
          quantity: 20,
          color: "#f2b84b",
        },
      ],
      {
        preset: cricutLetter,
        bleed: 0,
        gap: 0.05,
        margin: 0,
        allowRotation: true,
      },
    );
    const costs: CostSettings = {
      materialCostPerSheet: 1,
      inkCostPerSheet: 0.5,
      laborMinutesPerSheet: 3,
      laborRatePerHour: 20,
      packagingCost: 0.4,
      platformFeePercent: 10,
      sellingPricePerSheet: 6,
    };

    const profit = calculateProfit(pack, costs);

    expect(profit.revenue).toBe(6);
    expect(profit.cost).toBe(3.5);
    expect(profit.grossProfit).toBe(2.5);
    expect(profit.breakEvenPrice).toBeGreaterThan(3);
  });
});

describe("buildCsv", () => {
  it("exports a stable cut list header and rows", () => {
    const pack = packStickers(
      [
        {
          id: "quoted",
          name: 'Sampler, "A"',
          width: 1,
          height: 1,
          quantity: 1,
          color: "#90be6d",
        },
      ],
      {
        preset: cricutLetter,
        bleed: 0,
        gap: 0,
        margin: 0,
        allowRotation: true,
      },
    );

    expect(buildCsv(pack)).toContain('sheet,item,x_in,y_in,width_in,height_in,rotated\n1,"Sampler, ""A"""');
  });
});
