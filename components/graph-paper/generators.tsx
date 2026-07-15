// SVG grid generators. Each returns SVG children (React nodes) drawn in a
// millimetre coordinate system (viewBox "0 0 width height"). The tool wraps the
// output in a clip-path rect = drawing area, so generators may draw past the
// edges (hexagons, polar) and get trimmed cleanly.
import type { ReactNode } from "react";

export type GridType =
  | "square"
  | "dots"
  | "lined"
  | "graph"
  | "cross"
  | "isometric"
  | "triangle"
  | "hexagonal"
  | "polar"
  | "log"
  | "music"
  | "cornell";

export interface GridOptions {
  type: GridType;
  width: number; // mm (already oriented)
  height: number; // mm
  margin: number; // mm
  spacing: number; // mm — universal spacing knob
  lineWidth: number; // mm
  lineColor: string;
  accentColor: string; // major / divider / margin lines
  // type-specific
  majorEvery: number; // graph: heavy line every N cells
  angleStep: number; // polar: degrees between radial spokes
  cycles: number; // log: number of decades
  staves: number; // music: number of 5-line staves
}

// Which extra control each type exposes (spacing/lineWidth/colors are universal).
export const GRID_TYPES: {
  id: GridType;
  label: string;
  blurb: string;
  extra?: "majorEvery" | "angleStep" | "cycles" | "staves";
}[] = [
  { id: "square", label: "Square Grid", blurb: "Uniform squares — classic quad paper." },
  { id: "dots", label: "Dot Grid", blurb: "Dots at each intersection — bullet journaling." },
  { id: "lined", label: "Lined / Ruled", blurb: "Horizontal writing lines with a left margin." },
  { id: "graph", label: "Graph (Multi-weight)", blurb: "Light minor grid with heavier major lines.", extra: "majorEvery" },
  { id: "cross", label: "Cross Grid", blurb: "Small plus marks at each intersection." },
  { id: "isometric", label: "Isometric", blurb: "Vertical + 30° lines for 3D drawing." },
  { id: "triangle", label: "Triangle", blurb: "Equilateral triangle tessellation." },
  { id: "hexagonal", label: "Hexagonal", blurb: "Honeycomb hexagons.", },
  { id: "polar", label: "Polar", blurb: "Concentric rings + radial spokes.", extra: "angleStep" },
  { id: "log", label: "Semi-log", blurb: "Linear × logarithmic decades.", extra: "cycles" },
  { id: "music", label: "Music Staff", blurb: "Groups of five staff lines.", extra: "staves" },
  { id: "cornell", label: "Cornell Notes", blurb: "Cue column + notes + summary layout." },
];

interface Rect {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

// Liang–Barsky clip of the infinite line through (px,py) with direction (dx,dy)
// to the rect. Returns [x1,y1,x2,y2] or null.
function clipLine(
  px: number,
  py: number,
  dx: number,
  dy: number,
  r: Rect,
): [number, number, number, number] | null {
  let tmin = -Infinity;
  let tmax = Infinity;
  const p = [-dx, dx, -dy, dy];
  const q = [px - r.x0, r.x1 - px, py - r.y0, r.y1 - py];
  for (let i = 0; i < 4; i++) {
    if (Math.abs(p[i]) < 1e-9) {
      if (q[i] < 0) return null;
    } else {
      const t = q[i] / p[i];
      if (p[i] < 0) {
        if (t > tmin) tmin = t;
      } else if (t < tmax) tmax = t;
    }
  }
  if (tmin > tmax) return null;
  return [px + tmin * dx, py + tmin * dy, px + tmax * dx, py + tmax * dy];
}

// Family of parallel lines at `angle` (radians, relative to +x) filling the
// rect, spaced `spacing` apart perpendicularly, anchored on the rect centre.
function parallelLines(r: Rect, angleDeg: number, spacing: number): [number, number, number, number][] {
  const a = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  const nx = -Math.sin(a);
  const ny = Math.cos(a);
  const corners = [
    [r.x0, r.y0],
    [r.x1, r.y0],
    [r.x1, r.y1],
    [r.x0, r.y1],
  ];
  let cmin = Infinity;
  let cmax = -Infinity;
  for (const [x, y] of corners) {
    const c = x * nx + y * ny;
    if (c < cmin) cmin = c;
    if (c > cmax) cmax = c;
  }
  const cx = (r.x0 + r.x1) / 2;
  const cy = (r.y0 + r.y1) / 2;
  const c0 = cx * nx + cy * ny;
  const kmin = Math.ceil((cmin - c0) / spacing);
  const kmax = Math.floor((cmax - c0) / spacing);
  const segs: [number, number, number, number][] = [];
  for (let k = kmin; k <= kmax; k++) {
    const c = c0 + k * spacing;
    const seg = clipLine(c * nx, c * ny, dx, dy, r);
    if (seg) segs.push(seg);
  }
  return segs;
}

function lines(segs: [number, number, number, number][], color: string, w: number, prefix: string): ReactNode[] {
  return segs.map(([x1, y1, x2, y2], i) => (
    <line key={`${prefix}${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} />
  ));
}

// Integer-stepped positions from `start` up to (and incl.) `end`.
function ticks(start: number, end: number, step: number): number[] {
  const out: number[] = [];
  for (let v = start; v <= end + 1e-6; v += step) out.push(v);
  return out;
}

export function generateGrid(o: GridOptions): ReactNode {
  const r: Rect = { x0: o.margin, y0: o.margin, x1: o.width - o.margin, y1: o.height - o.margin };
  if (r.x1 <= r.x0 || r.y1 <= r.y0) return null;
  const lw = o.lineWidth;
  const s = Math.max(o.spacing, 0.5);

  switch (o.type) {
    case "square": {
      const v = ticks(r.x0, r.x1, s).map((x, i) => (
        <line key={`v${i}`} x1={x} y1={r.y0} x2={x} y2={r.y1} stroke={o.lineColor} strokeWidth={lw} />
      ));
      const h = ticks(r.y0, r.y1, s).map((y, i) => (
        <line key={`h${i}`} x1={r.x0} y1={y} x2={r.x1} y2={y} stroke={o.lineColor} strokeWidth={lw} />
      ));
      return [...v, ...h];
    }

    case "dots": {
      const rad = Math.min(Math.max(lw * 1.6, 0.3), s / 4);
      const dots: ReactNode[] = [];
      ticks(r.x0, r.x1, s).forEach((x, i) =>
        ticks(r.y0, r.y1, s).forEach((y, j) => {
          dots.push(<circle key={`d${i}-${j}`} cx={x} cy={y} r={rad} fill={o.lineColor} />);
        }),
      );
      return dots;
    }

    case "lined": {
      const gap = Math.max(s, 5);
      const h = ticks(r.y0, r.y1, gap).map((y, i) => (
        <line key={`h${i}`} x1={r.x0} y1={y} x2={r.x1} y2={y} stroke={o.lineColor} strokeWidth={lw} />
      ));
      const marginX = r.x0 + Math.min(20, (r.x1 - r.x0) * 0.15);
      return [
        ...h,
        <line key="m" x1={marginX} y1={r.y0} x2={marginX} y2={r.y1} stroke={o.accentColor} strokeWidth={lw * 1.5} />,
      ];
    }

    case "graph": {
      const major = Math.max(2, Math.round(o.majorEvery));
      const out: ReactNode[] = [];
      ticks(r.x0, r.x1, s).forEach((x, i) => {
        const isMajor = Math.round((x - r.x0) / s) % major === 0;
        out.push(
          <line key={`v${i}`} x1={x} y1={r.y0} x2={x} y2={r.y1}
            stroke={isMajor ? o.accentColor : o.lineColor} strokeWidth={isMajor ? lw * 1.8 : lw} />,
        );
      });
      ticks(r.y0, r.y1, s).forEach((y, i) => {
        const isMajor = Math.round((y - r.y0) / s) % major === 0;
        out.push(
          <line key={`h${i}`} x1={r.x0} y1={y} x2={r.x1} y2={y}
            stroke={isMajor ? o.accentColor : o.lineColor} strokeWidth={isMajor ? lw * 1.8 : lw} />,
        );
      });
      return out;
    }

    case "cross": {
      const arm = Math.min(s * 0.18, 2);
      const marks: ReactNode[] = [];
      ticks(r.x0, r.x1, s).forEach((x, i) =>
        ticks(r.y0, r.y1, s).forEach((y, j) => {
          marks.push(<line key={`cx${i}-${j}`} x1={x - arm} y1={y} x2={x + arm} y2={y} stroke={o.lineColor} strokeWidth={lw} />);
          marks.push(<line key={`cy${i}-${j}`} x1={x} y1={y - arm} x2={x} y2={y + arm} stroke={o.lineColor} strokeWidth={lw} />);
        }),
      );
      return marks;
    }

    case "isometric": {
      const vert = ticks(r.x0, r.x1, s).map((x, i) => (
        <line key={`vv${i}`} x1={x} y1={r.y0} x2={x} y2={r.y1} stroke={o.lineColor} strokeWidth={lw} />
      ));
      return [
        ...vert,
        ...lines(parallelLines(r, 30, s), o.lineColor, lw, "a"),
        ...lines(parallelLines(r, -30, s), o.lineColor, lw, "b"),
      ];
    }

    case "triangle": {
      return [
        ...lines(parallelLines(r, 0, s), o.lineColor, lw, "h"),
        ...lines(parallelLines(r, 60, s), o.lineColor, lw, "a"),
        ...lines(parallelLines(r, -60, s), o.lineColor, lw, "b"),
      ];
    }

    case "hexagonal": {
      // Pointy-top hexagons; `s` = edge length.
      const hexW = Math.sqrt(3) * s;
      const vStep = 1.5 * s;
      const polys: ReactNode[] = [];
      let row = 0;
      for (let cy = r.y0; cy <= r.y1 + s; cy += vStep, row++) {
        const offset = row % 2 === 0 ? 0 : hexW / 2;
        for (let cx = r.x0 + offset; cx <= r.x1 + hexW; cx += hexW) {
          const pts: string[] = [];
          for (let k = 0; k < 6; k++) {
            const ang = (Math.PI / 180) * (60 * k - 90); // pointy-top
            pts.push(`${(cx + s * Math.cos(ang)).toFixed(2)},${(cy + s * Math.sin(ang)).toFixed(2)}`);
          }
          polys.push(
            <polygon key={`hex${row}-${cx.toFixed(1)}`} points={pts.join(" ")} fill="none" stroke={o.lineColor} strokeWidth={lw} />,
          );
        }
      }
      return polys;
    }

    case "polar": {
      const cx = (r.x0 + r.x1) / 2;
      const cy = (r.y0 + r.y1) / 2;
      const maxR = Math.min(r.x1 - r.x0, r.y1 - r.y0) / 2;
      const rings: ReactNode[] = [];
      for (let rr = s; rr <= maxR + 1e-6; rr += s) {
        rings.push(<circle key={`ring${rr.toFixed(1)}`} cx={cx} cy={cy} r={rr} fill="none" stroke={o.lineColor} strokeWidth={lw} />);
      }
      const step = Math.max(5, Math.min(90, o.angleStep));
      for (let deg = 0; deg < 360; deg += step) {
        const a = (deg * Math.PI) / 180;
        rings.push(
          <line key={`spoke${deg}`} x1={cx} y1={cy} x2={cx + maxR * Math.cos(a)} y2={cy + maxR * Math.sin(a)} stroke={o.lineColor} strokeWidth={lw} />,
        );
      }
      return rings;
    }

    case "log": {
      const cyc = Math.max(1, Math.min(6, Math.round(o.cycles)));
      const out: ReactNode[] = [];
      // Linear vertical grid.
      ticks(r.x0, r.x1, s).forEach((x, i) =>
        out.push(<line key={`lv${i}`} x1={x} y1={r.y0} x2={x} y2={r.y1} stroke={o.lineColor} strokeWidth={lw} />),
      );
      // Logarithmic horizontal lines: `cyc` decades stacked bottom→top.
      const H = r.y1 - r.y0;
      for (let d = 0; d < cyc; d++) {
        for (let n = 1; n <= 10; n++) {
          const frac = (d + Math.log10(n)) / cyc;
          const y = r.y1 - frac * H;
          const heavy = n === 1 || n === 10;
          out.push(
            <line key={`lh${d}-${n}`} x1={r.x0} y1={y} x2={r.x1} y2={y}
              stroke={heavy ? o.accentColor : o.lineColor} strokeWidth={heavy ? lw * 1.6 : lw} />,
          );
        }
      }
      return out;
    }

    case "music": {
      const gap = Math.max(1.5, Math.min(s, 4));
      const staffH = 4 * gap;
      const staffGap = staffH * 1.6;
      const out: ReactNode[] = [];
      const maxStaves = Math.max(1, Math.min(o.staves, Math.floor((r.y1 - r.y0 + staffGap) / (staffH + staffGap))));
      for (let st = 0; st < maxStaves; st++) {
        const top = r.y0 + st * (staffH + staffGap);
        for (let l = 0; l < 5; l++) {
          const y = top + l * gap;
          out.push(<line key={`ms${st}-${l}`} x1={r.x0} y1={y} x2={r.x1} y2={y} stroke={o.lineColor} strokeWidth={lw} />);
        }
        // Bar lines at the ends of each staff.
        out.push(<line key={`msl${st}`} x1={r.x0} y1={top} x2={r.x0} y2={top + staffH} stroke={o.lineColor} strokeWidth={lw} />);
        out.push(<line key={`msr${st}`} x1={r.x1} y1={top} x2={r.x1} y2={top + staffH} stroke={o.lineColor} strokeWidth={lw} />);
      }
      return out;
    }

    case "cornell": {
      const cueX = r.x0 + Math.min(63, (r.x1 - r.x0) * 0.28); // ~2.5in cue column
      const summaryY = r.y1 - Math.min(50, (r.y1 - r.y0) * 0.18);
      const gap = Math.max(s, 7);
      const out: ReactNode[] = [];
      for (let y = r.y0 + gap; y <= summaryY - 1e-6; y += gap) {
        out.push(<line key={`cn${y.toFixed(1)}`} x1={r.x0} y1={y} x2={r.x1} y2={y} stroke={o.lineColor} strokeWidth={lw} />);
      }
      out.push(<line key="cue" x1={cueX} y1={r.y0} x2={cueX} y2={summaryY} stroke={o.accentColor} strokeWidth={lw * 1.6} />);
      out.push(<line key="sum" x1={r.x0} y1={summaryY} x2={r.x1} y2={summaryY} stroke={o.accentColor} strokeWidth={lw * 1.6} />);
      return out;
    }

    default:
      return null;
  }
}
