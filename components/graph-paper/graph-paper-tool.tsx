"use client";

import { useMemo, useRef, useState } from "react";
import { Printer, Download, ImageDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  PAPER_OPTIONS,
  type Orientation,
  type PaperSizeId,
  resolveDimensions,
  pageSizeRule,
} from "./paper-sizes";
import { GRID_TYPES, type GridType, generateGrid } from "./generators";

const PNG_DPI = 300;

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label className="text-xs">{label}</Label>
        <span className="text-xs text-muted-foreground tabular-nums">
          {value}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}

const selectCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring";

export function GraphPaperTool() {
  const svgRef = useRef<SVGSVGElement>(null);

  const [type, setType] = useState<GridType>("square");
  const [paper, setPaper] = useState<PaperSizeId>("A4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [customW, setCustomW] = useState(210);
  const [customH, setCustomH] = useState(297);
  const [margin, setMargin] = useState(10);
  const [spacing, setSpacing] = useState(5);
  const [lineWidth, setLineWidth] = useState(0.2);
  const [lineColor, setLineColor] = useState("#64748b");
  const [accentColor, setAccentColor] = useState("#334155");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [majorEvery, setMajorEvery] = useState(5);
  const [angleStep, setAngleStep] = useState(15);
  const [cycles, setCycles] = useState(3);
  const [staves, setStaves] = useState(12);

  const dims = resolveDimensions(paper, orientation, { width: customW, height: customH });
  const meta = GRID_TYPES.find((g) => g.id === type)!;

  const children = useMemo(
    () =>
      generateGrid({
        type,
        width: dims.width,
        height: dims.height,
        margin,
        spacing,
        lineWidth,
        lineColor,
        accentColor,
        majorEvery,
        angleStep,
        cycles,
        staves,
      }),
    [type, dims.width, dims.height, margin, spacing, lineWidth, lineColor, accentColor, majorEvery, angleStep, cycles, staves],
  );

  function buildSvgString(): string | null {
    if (!svgRef.current) return null;
    const node = svgRef.current.cloneNode(true) as SVGSVGElement;
    node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    node.setAttribute("width", `${dims.width}mm`);
    node.setAttribute("height", `${dims.height}mm`);
    return new XMLSerializer().serializeToString(node);
  }

  function handlePrint() {
    const svg = buildSvgString();
    if (!svg) return;
    const rule = pageSizeRule(paper, orientation, dims);
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (!doc) {
      iframe.remove();
      return;
    }
    doc.open();
    doc.write(
      `<!doctype html><html><head><meta charset="utf-8"><style>@page{size:${rule};margin:0}html,body{margin:0;padding:0}svg{display:block}</style></head><body>${svg}</body></html>`,
    );
    doc.close();
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => iframe.remove(), 1000);
    }, 300);
  }

  function handleDownloadSvg() {
    const svg = buildSvgString();
    if (!svg) return;
    triggerDownload(new Blob([svg], { type: "image/svg+xml" }), `graph-paper-${type}.svg`);
  }

  function handleDownloadPng() {
    const svg = buildSvgString();
    if (!svg) return;
    const scale = PNG_DPI / 25.4; // px per mm
    const w = Math.round(dims.width * scale);
    const h = Math.round(dims.height * scale);
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => {
          if (blob) triggerDownload(blob, `graph-paper-${type}.png`);
        }, "image/png");
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  return (
    <div className="not-prose grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Controls */}
      <div className="space-y-5 rounded-xl border bg-card p-5">
        <div className="space-y-1.5">
          <Label className="text-xs">Grid type</Label>
          <select className={selectCls} value={type} onChange={(e) => setType(e.target.value as GridType)}>
            {GRID_TYPES.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">{meta.blurb}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Paper</Label>
            <select className={selectCls} value={paper} onChange={(e) => setPaper(e.target.value as PaperSizeId)}>
              {PAPER_OPTIONS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Orientation</Label>
            <select
              className={selectCls}
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as Orientation)}
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
        </div>

        {paper === "Custom" && (
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Width" value={customW} onChange={setCustomW} min={20} max={1000} step={1} unit="mm" />
            <NumberField label="Height" value={customH} onChange={setCustomH} min={20} max={1000} step={1} unit="mm" />
          </div>
        )}

        <NumberField label="Spacing" value={spacing} onChange={setSpacing} min={1} max={30} step={0.5} unit="mm" />
        <NumberField label="Margin" value={margin} onChange={setMargin} min={0} max={40} step={1} unit="mm" />
        <NumberField label="Line width" value={lineWidth} onChange={setLineWidth} min={0.05} max={1} step={0.05} unit="mm" />

        {meta.extra === "majorEvery" && (
          <NumberField label="Major line every" value={majorEvery} onChange={setMajorEvery} min={2} max={10} step={1} unit="cells" />
        )}
        {meta.extra === "angleStep" && (
          <NumberField label="Spoke angle" value={angleStep} onChange={setAngleStep} min={5} max={90} step={5} unit="°" />
        )}
        {meta.extra === "cycles" && (
          <NumberField label="Decades" value={cycles} onChange={setCycles} min={1} max={6} step={1} />
        )}
        {meta.extra === "staves" && (
          <NumberField label="Staves" value={staves} onChange={setStaves} min={1} max={20} step={1} />
        )}

        <div className="grid grid-cols-3 gap-3">
          <ColorField label="Line" value={lineColor} onChange={setLineColor} />
          <ColorField label="Accent" value={accentColor} onChange={setAccentColor} />
          <ColorField label="Background" value={bgColor} onChange={setBgColor} />
        </div>

        <div className="flex flex-col gap-2 pt-1">
          <Button onClick={handlePrint} className="w-full">
            <Printer className="size-4" /> Print / Save as PDF
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={handleDownloadSvg}>
              <Download className="size-4" /> SVG
            </Button>
            <Button variant="outline" onClick={handleDownloadPng}>
              <ImageDown className="size-4" /> PNG
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          100% in-browser — nothing is uploaded. Use Print → “Save as PDF” for vector-quality output.
        </p>
      </div>

      {/* Preview */}
      <div className="flex items-start justify-center rounded-xl border bg-muted/30 p-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${dims.width} ${dims.height}`}
          preserveAspectRatio="xMidYMid meet"
          className={cn("h-auto w-full max-w-full", "max-h-[75vh]")}
          style={{ aspectRatio: `${dims.width} / ${dims.height}` }}
        >
          <defs>
            <clipPath id="gp-clip">
              <rect x={margin} y={margin} width={Math.max(0, dims.width - 2 * margin)} height={Math.max(0, dims.height - 2 * margin)} />
            </clipPath>
          </defs>
          <rect x={0} y={0} width={dims.width} height={dims.height} fill={bgColor} stroke="#e2e8f0" strokeWidth={0.15} />
          <g clipPath="url(#gp-clip)">{children}</g>
        </svg>
      </div>
    </div>
  );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full cursor-pointer rounded-md border border-input bg-background p-0.5"
        aria-label={label}
      />
    </div>
  );
}
