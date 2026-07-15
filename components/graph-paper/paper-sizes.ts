// Paper sizes in millimetres (portrait [width, height]) + unit helpers.
// mm is the native coordinate unit for the generated SVG; PX_PER_MM is only
// needed when rasterising to PNG. Shared with scripts/gen-en-templates.mjs value.

export const PX_PER_MM = 3.7795; // 96 DPI (1mm = 3.7795px)

export type PaperSizeId =
  | "A3"
  | "A4"
  | "A5"
  | "B4"
  | "B5"
  | "Letter"
  | "Legal"
  | "Custom";

export type Orientation = "portrait" | "landscape";

// Portrait dimensions [width_mm, height_mm].
export const PAPER_SIZES: Record<Exclude<PaperSizeId, "Custom">, [number, number]> = {
  A3: [297, 420],
  A4: [210, 297],
  A5: [148, 210],
  B4: [250, 353],
  B5: [176, 250],
  Letter: [215.9, 279.4],
  Legal: [215.9, 355.6],
};

export const PAPER_OPTIONS: { id: PaperSizeId; label: string }[] = [
  { id: "A4", label: "A4 (210 × 297 mm)" },
  { id: "A3", label: "A3 (297 × 420 mm)" },
  { id: "A5", label: "A5 (148 × 210 mm)" },
  { id: "B4", label: "B4 (250 × 353 mm)" },
  { id: "B5", label: "B5 (176 × 250 mm)" },
  { id: "Letter", label: "Letter (8.5 × 11 in)" },
  { id: "Legal", label: "Legal (8.5 × 14 in)" },
  { id: "Custom", label: "Custom (mm)" },
];

// Resolve the on-page dimensions in mm for a given size + orientation.
export function resolveDimensions(
  size: PaperSizeId,
  orientation: Orientation,
  custom: { width: number; height: number },
): { width: number; height: number } {
  let w: number;
  let h: number;
  if (size === "Custom") {
    w = custom.width;
    h = custom.height;
  } else {
    [w, h] = PAPER_SIZES[size];
  }
  // Portrait dims are defined width<=height; landscape swaps.
  return orientation === "landscape"
    ? { width: h, height: w }
    : { width: w, height: h };
}

// The CSS @page size keyword for the print iframe. Custom uses explicit mm.
export function pageSizeRule(
  size: PaperSizeId,
  orientation: Orientation,
  dims: { width: number; height: number },
): string {
  if (size === "Custom") {
    return `${dims.width}mm ${dims.height}mm`;
  }
  const named: Record<Exclude<PaperSizeId, "Custom">, string> = {
    A3: "A3",
    A4: "A4",
    A5: "A5",
    B4: "B4",
    B5: "B5",
    Letter: "letter",
    Legal: "legal",
  };
  return `${named[size]} ${orientation}`;
}
