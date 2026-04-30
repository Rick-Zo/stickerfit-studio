export type Unit = "in" | "mm";

export type SheetPreset = {
  id: string;
  label: string;
  note: string;
  pageWidth: number;
  pageHeight: number;
  cutWidth: number;
  cutHeight: number;
};

export type StickerItem = {
  id: string;
  name: string;
  width: number;
  height: number;
  quantity: number;
  color: string;
};

export type PackSettings = {
  preset: SheetPreset;
  bleed: number;
  gap: number;
  margin: number;
  allowRotation: boolean;
  maxSheets?: number;
};

export type CostSettings = {
  materialCostPerSheet: number;
  inkCostPerSheet: number;
  laborMinutesPerSheet: number;
  laborRatePerHour: number;
  packagingCost: number;
  platformFeePercent: number;
  sellingPricePerSheet: number;
};

export type PlacedSticker = {
  sheet: number;
  itemId: string;
  itemName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotated: boolean;
  color: string;
};

export type SheetLayout = {
  index: number;
  stickers: PlacedSticker[];
  usedArea: number;
  coverage: number;
};

export type PackResult = {
  cutArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  sheets: SheetLayout[];
  totalRequested: number;
  totalPlaced: number;
  unplaced: Record<string, number>;
  placedByItem: Record<string, number>;
  coverage: number;
  wasteArea: number;
  suggestions: string[];
};

export type ProfitResult = {
  revenue: number;
  cost: number;
  grossProfit: number;
  marginPercent: number;
  breakEvenPrice: number;
  profitPerSticker: number;
};

type PendingSticker = {
  item: StickerItem;
  width: number;
  height: number;
  area: number;
};

type Shelf = {
  x: number;
  y: number;
  height: number;
};

type PackedSheet = SheetLayout & {
  consumedKeys: string[];
};

const ROUND_DIGITS = 1000;

export const SHEET_PRESETS: SheetPreset[] = [
  {
    id: "cricut-letter",
    label: "Cricut Letter",
    note: "8.5 x 11 in sheet, 7.44 x 9.94 in working area",
    pageWidth: 8.5,
    pageHeight: 11,
    cutWidth: 7.44,
    cutHeight: 9.94,
  },
  {
    id: "cricut-a4",
    label: "Cricut A4",
    note: "A4 sheet, 7.2 x 10.62 in working area",
    pageWidth: 8.27,
    pageHeight: 11.69,
    cutWidth: 7.2,
    cutHeight: 10.62,
  },
  {
    id: "silhouette-letter",
    label: "Silhouette Letter",
    note: "Conservative letter layout for registration marks",
    pageWidth: 8.5,
    pageHeight: 11,
    cutWidth: 7.8,
    cutHeight: 10.2,
  },
  {
    id: "full-letter",
    label: "Full Letter Proof",
    note: "Useful for mockups or non-cut print tests",
    pageWidth: 8.5,
    pageHeight: 11,
    cutWidth: 8,
    cutHeight: 10.5,
  },
];

export const DEFAULT_ITEMS: StickerItem[] = [
  {
    id: "round-2",
    name: "2 in round sticker",
    width: 2,
    height: 2,
    quantity: 18,
    color: "#2bb3a3",
  },
  {
    id: "label-3x1",
    name: "3 x 1 in label",
    width: 3,
    height: 1,
    quantity: 8,
    color: "#e56b5d",
  },
  {
    id: "mini-1",
    name: "1 in mini freebie",
    width: 1,
    height: 1,
    quantity: 12,
    color: "#f2b84b",
  },
];

export const DEFAULT_COSTS: CostSettings = {
  materialCostPerSheet: 0.68,
  inkCostPerSheet: 0.34,
  laborMinutesPerSheet: 4,
  laborRatePerHour: 18,
  packagingCost: 0.45,
  platformFeePercent: 10,
  sellingPricePerSheet: 5.95,
};

export function mmToInches(value: number) {
  return value / 25.4;
}

export function inchesToMm(value: number) {
  return value * 25.4;
}

export function round(value: number, digits = ROUND_DIGITS) {
  return Math.round((value + Number.EPSILON) * digits) / digits;
}

export function sanitizeNumber(value: number, fallback = 0) {
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

export function packStickers(items: StickerItem[], settings: PackSettings): PackResult {
  const cleanItems = items
    .filter((item) => item.quantity > 0 && item.width > 0 && item.height > 0)
    .map((item) => ({
      ...item,
      quantity: Math.floor(item.quantity),
      width: sanitizeNumber(item.width),
      height: sanitizeNumber(item.height),
    }));

  const cutArea = getCutArea(settings);
  const workingWidth = Math.max(0, cutArea.width);
  const workingHeight = Math.max(0, cutArea.height);
  const totalRequested = cleanItems.reduce((sum, item) => sum + item.quantity, 0);
  const pending = buildPendingStickers(cleanItems, settings);
  const sheets: SheetLayout[] = [];
  const placedByItem: Record<string, number> = {};
  const unplaced: Record<string, number> = Object.fromEntries(
    cleanItems.map((item) => [item.id, item.quantity]),
  );

  const maxSheets = settings.maxSheets ?? 80;
  let remaining = pending;

  while (remaining.length > 0 && sheets.length < maxSheets && workingWidth > 0 && workingHeight > 0) {
    const packed = packOneSheet(remaining, settings, cutArea, sheets.length + 1);

    if (packed.stickers.length === 0) {
      break;
    }

    sheets.push(stripConsumedKeys(packed));
    const placedKeys = new Set(packed.consumedKeys);
    remaining = remaining.filter((sticker) => !placedKeys.has(pendingKey(sticker)));

    for (const sticker of packed.stickers) {
      placedByItem[sticker.itemId] = (placedByItem[sticker.itemId] ?? 0) + 1;
      unplaced[sticker.itemId] = Math.max(0, (unplaced[sticker.itemId] ?? 0) - 1);
    }
  }

  const totalPlaced = sheets.reduce((sum, sheet) => sum + sheet.stickers.length, 0);
  const usableArea = workingWidth * workingHeight * Math.max(1, sheets.length);
  const usedArea = sheets.reduce((sum, sheet) => sum + sheet.usedArea, 0);
  const coverage = usableArea > 0 ? usedArea / usableArea : 0;
  const wasteArea = Math.max(0, usableArea - usedArea);

  return {
    cutArea,
    sheets,
    totalRequested,
    totalPlaced,
    unplaced,
    placedByItem,
    coverage,
    wasteArea,
    suggestions: buildSuggestions({
      resultSheets: sheets,
      remaining,
      settings,
      workingWidth,
      workingHeight,
      totalPlaced,
      totalRequested,
    }),
  };
}

export function calculateProfit(pack: PackResult, costs: CostSettings): ProfitResult {
  const sheetCount = pack.totalPlaced > 0 ? pack.sheets.length : 0;
  const feeRate = Math.min(0.95, sanitizeNumber(costs.platformFeePercent) / 100);
  const revenue = sheetCount * sanitizeNumber(costs.sellingPricePerSheet);
  const laborCost = sheetCount * (sanitizeNumber(costs.laborMinutesPerSheet) / 60) * sanitizeNumber(costs.laborRatePerHour);
  const variableCost =
    sheetCount * (sanitizeNumber(costs.materialCostPerSheet) + sanitizeNumber(costs.inkCostPerSheet)) +
    laborCost +
    (sheetCount > 0 ? sanitizeNumber(costs.packagingCost) : 0);
  const platformFee = revenue * feeRate;
  const cost = variableCost + platformFee;
  const grossProfit = revenue - cost;
  const marginPercent = revenue > 0 ? grossProfit / revenue : 0;
  const breakEvenPrice = sheetCount > 0 ? variableCost / (sheetCount * (1 - feeRate)) : 0;
  const profitPerSticker = pack.totalPlaced > 0 ? grossProfit / pack.totalPlaced : 0;

  return {
    revenue: round(revenue),
    cost: round(cost),
    grossProfit: round(grossProfit),
    marginPercent: round(marginPercent),
    breakEvenPrice: round(breakEvenPrice),
    profitPerSticker: round(profitPerSticker),
  };
}

export function buildCsv(pack: PackResult) {
  const rows = [
    ["sheet", "item", "x_in", "y_in", "width_in", "height_in", "rotated"],
    ...pack.sheets.flatMap((sheet) =>
      sheet.stickers.map((sticker) => [
        String(sticker.sheet),
        sticker.itemName,
        round(sticker.x).toFixed(3),
        round(sticker.y).toFixed(3),
        round(sticker.width).toFixed(3),
        round(sticker.height).toFixed(3),
        sticker.rotated ? "yes" : "no",
      ]),
    ),
  ];

  return rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");
}

export function buildSvg(pack: PackResult, preset: SheetPreset) {
  const pageGap = 0.35;
  const totalHeight =
    preset.pageHeight * Math.max(1, pack.sheets.length) + pageGap * Math.max(0, pack.sheets.length - 1);
  const sheetsMarkup = pack.sheets
    .map((sheet, index) => {
      const yOffset = index * (preset.pageHeight + pageGap);
      return `
  <g transform="translate(0 ${round(yOffset)})">
    <rect x="0" y="0" width="${preset.pageWidth}" height="${preset.pageHeight}" fill="#ffffff" stroke="#111827" stroke-width="0.02"/>
    <rect x="${pack.cutArea.x}" y="${pack.cutArea.y}" width="${pack.cutArea.width}" height="${pack.cutArea.height}" fill="none" stroke="#2bb3a3" stroke-width="0.025" stroke-dasharray="0.12 0.08"/>
    ${sheet.stickers
      .map(
        (sticker) => `
    <rect x="${round(sticker.x)}" y="${round(sticker.y)}" width="${round(sticker.width)}" height="${round(sticker.height)}" rx="0.08" fill="${sticker.color}" fill-opacity="0.82" stroke="#111827" stroke-width="0.015"/>
    <text x="${round(sticker.x + 0.08)}" y="${round(sticker.y + 0.18)}" font-size="0.12" font-family="Arial, sans-serif" fill="#111827">${escapeXml(sticker.itemName)}</text>`,
      )
      .join("")}
  </g>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${preset.pageWidth}in" height="${round(totalHeight)}in" viewBox="0 0 ${preset.pageWidth} ${round(totalHeight)}" role="img" aria-label="Sticker sheet layout">
${sheetsMarkup || `<rect x="0" y="0" width="${preset.pageWidth}" height="${preset.pageHeight}" fill="#ffffff" stroke="#111827" stroke-width="0.02"/>`}
</svg>`;
}

function getCutArea(settings: PackSettings) {
  const preset = settings.preset;
  const x = (preset.pageWidth - preset.cutWidth) / 2 + settings.margin;
  const y = (preset.pageHeight - preset.cutHeight) / 2 + settings.margin;
  const width = Math.max(0, preset.cutWidth - settings.margin * 2);
  const height = Math.max(0, preset.cutHeight - settings.margin * 2);

  return {
    x: round(x),
    y: round(y),
    width: round(width),
    height: round(height),
  };
}

function buildPendingStickers(items: StickerItem[], settings: PackSettings): PendingSticker[] {
  return items
    .flatMap((item) =>
      Array.from({ length: item.quantity }, (_, index) => ({
        item: {
          ...item,
          id: `${item.id}::${index}`,
        },
        width: item.width + settings.bleed * 2,
        height: item.height + settings.bleed * 2,
        area: (item.width + settings.bleed * 2) * (item.height + settings.bleed * 2),
      })),
    )
    .sort((a, b) => b.area - a.area || b.width - a.width);
}

function packOneSheet(
  stickers: PendingSticker[],
  settings: PackSettings,
  cutArea: PackResult["cutArea"],
  sheetIndex: number,
): PackedSheet {
  const shelves: Shelf[] = [];
  const placed: PlacedSticker[] = [];
  const usedKeys = new Set<string>();

  for (const pending of stickers) {
    if (usedKeys.has(pendingKey(pending))) {
      continue;
    }

    const placement = findPlacement(pending, shelves, cutArea.width, cutArea.height, settings.allowRotation, settings.gap);

    if (!placement) {
      continue;
    }

    const { shelf, width, height, rotated, x, y } = placement;
    shelf.x = x + width;
    shelf.height = Math.max(shelf.height, height);

    const originalItemId = pending.item.id.split("::")[0];
    placed.push({
      sheet: sheetIndex,
      itemId: originalItemId,
      itemName: pending.item.name,
      x: round(cutArea.x + x),
      y: round(cutArea.y + y),
      width: round(width),
      height: round(height),
      rotated,
      color: pending.item.color,
    });
    usedKeys.add(pendingKey(pending));
  }

  const sheetArea = cutArea.width * cutArea.height;
  const usedArea = placed.reduce((sum, sticker) => sum + sticker.width * sticker.height, 0);

  return {
    index: sheetIndex,
    stickers: placed,
    usedArea: round(usedArea),
    coverage: sheetArea > 0 ? round(usedArea / sheetArea) : 0,
    consumedKeys: Array.from(usedKeys),
  };
}

function findPlacement(
  sticker: PendingSticker,
  shelves: Shelf[],
  workingWidth: number,
  workingHeight: number,
  allowRotation: boolean,
  gap: number,
) {
  const orientations = getOrientations(sticker, allowRotation);

  for (const shelf of shelves) {
    for (const orientation of orientations) {
      const x = shelf.x === 0 ? 0 : shelf.x + gap;
      const fitsWidth = x + orientation.width <= workingWidth + 0.0001;
      const fitsHeight = orientation.height <= shelf.height + 0.0001;

      if (fitsWidth && fitsHeight) {
        return { shelf, x, y: shelf.y, ...orientation };
      }
    }
  }

  const usedHeight = shelves.reduce((max, shelf) => Math.max(max, shelf.y + shelf.height), 0);
  const y = shelves.length === 0 ? 0 : usedHeight + gap;

  for (const orientation of orientations) {
    if (orientation.width <= workingWidth + 0.0001 && y + orientation.height <= workingHeight + 0.0001) {
      const shelf = { x: 0, y, height: orientation.height };
      shelves.push(shelf);
      return { shelf, x: 0, y, ...orientation };
    }
  }

  return null;
}

function getOrientations(sticker: PendingSticker, allowRotation: boolean) {
  const base = [{ width: sticker.width, height: sticker.height, rotated: false }];

  if (!allowRotation || Math.abs(sticker.width - sticker.height) < 0.001) {
    return base;
  }

  return [...base, { width: sticker.height, height: sticker.width, rotated: true }].sort(
    (a, b) => a.height - b.height || a.width - b.width,
  );
}

function buildSuggestions(input: {
  resultSheets: SheetLayout[];
  remaining: PendingSticker[];
  settings: PackSettings;
  workingWidth: number;
  workingHeight: number;
  totalPlaced: number;
  totalRequested: number;
}) {
  const suggestions: string[] = [];

  if (input.totalRequested === 0) {
    return ["Add at least one sticker item to generate a production layout."];
  }

  if (input.remaining.length > 0) {
    suggestions.push("Some stickers are larger than the usable cut area. Reduce the art size, bleed, or safety margin.");
  }

  if (!input.settings.allowRotation) {
    suggestions.push("Enable rotation to let long labels share rows with smaller stickers.");
  }

  if (input.settings.gap > 0.1) {
    suggestions.push("Your gap is generous; trimming it by 0.03-0.05 in may unlock another column.");
  }

  if (input.resultSheets.length > 1) {
    suggestions.push("Group same-size stickers per sheet before printing to reduce setup time.");
  }

  const shortestSide = Math.min(input.workingWidth, input.workingHeight);
  if (input.settings.bleed > shortestSide * 0.04) {
    suggestions.push("Bleed is high relative to the sheet size. Use it only when art reaches the cut edge.");
  }

  if (input.totalPlaced === input.totalRequested && input.resultSheets.length === 1) {
    suggestions.push("This order fits on one sheet. Use the profit panel to test a freebie or price lift.");
  }

  return suggestions.slice(0, 4);
}

function pendingKey(sticker: PendingSticker) {
  return sticker.item.id;
}

function stripConsumedKeys(sheet: PackedSheet): SheetLayout {
  return {
    index: sheet.index,
    stickers: sheet.stickers,
    usedArea: sheet.usedArea,
    coverage: sheet.coverage,
  };
}

function escapeCsvCell(value: string) {
  if (!/[",\n]/.test(value)) {
    return value;
  }

  return `"${value.replaceAll('"', '""')}"`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
