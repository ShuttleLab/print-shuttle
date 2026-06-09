// One-off generator for English starter templates (.print files + thumbnails).
// Run: node scripts/gen-en-templates.mjs
// Produces public/studio/templates/*.print and prints templates.json entries.
import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "public/studio/templates");
const PX_PER_MM = 3.7795;
const dims = (size, landscape) => {
  const mm = { A4: [210, 297], A5: [148, 210] }[size];
  const [w, h] = landscape ? [mm[1], mm[0]] : mm;
  return { W: +(w * PX_PER_MM).toFixed(2), H: +(h * PX_PER_MM).toFixed(2) };
};

const TEXT_BASE = {
  type: "i-text", version: "5.3.0", originX: "left", originY: "top",
  fill: "#1f2937", stroke: null, strokeWidth: 1, strokeDashArray: null,
  strokeLineCap: "butt", strokeDashOffset: 0, strokeLineJoin: "miter",
  strokeUniform: false, strokeMiterLimit: 4, scaleX: 1, scaleY: 1, angle: 0,
  flipX: false, flipY: false, opacity: 1, shadow: null, visible: true,
  backgroundColor: "", fillRule: "nonzero", paintFirst: "fill",
  globalCompositeOperation: "source-over", skewX: 0, skewY: 0,
  fontFamily: "SourceHanSerifCN-Bold", fontWeight: "normal", fontSize: 24, text: "",
  underline: false, overline: false, linethrough: false, textAlign: "center",
  fontStyle: "normal", lineHeight: 1.2, textBackgroundColor: "", charSpacing: 0,
  styles: [], direction: "ltr", path: null, pathStartOffset: 0, pathSide: "left",
  pathAlign: "baseline", selectable: true, evented: true,
};
const RECT_BASE = {
  type: "rect", version: "5.3.0", originX: "left", originY: "top",
  fill: "", stroke: "#7c3aed", strokeWidth: 2, strokeDashArray: null,
  strokeLineCap: "butt", strokeDashOffset: 0, strokeLineJoin: "miter",
  strokeUniform: true, strokeMiterLimit: 4, scaleX: 1, scaleY: 1, angle: 0,
  flipX: false, flipY: false, opacity: 1, shadow: null, visible: true,
  backgroundColor: "", fillRule: "nonzero", paintFirst: "fill",
  globalCompositeOperation: "source-over", skewX: 0, skewY: 0,
  rx: 0, ry: 0, selectable: true, evented: true,
};
const T = (o) => ({ ...TEXT_BASE, ...o });
const R = (o) => ({ ...RECT_BASE, ...o });

// SVG thumbnail from the same primitives (scaled to ~260px tall preview).
function thumb(W, H, objs) {
  const scale = 320 / H;
  const sw = Math.round(W * scale), sh = 320;
  const els = objs.map((o) => {
    if (o.type === "rect")
      return `<rect x="${(o.left * scale).toFixed(1)}" y="${(o.top * scale).toFixed(1)}" width="${(o.width * scale).toFixed(1)}" height="${(o.height * scale).toFixed(1)}" rx="${((o.rx || 0) * scale).toFixed(1)}" fill="${o.fill || "none"}" stroke="${o.stroke || "none"}" stroke-width="${(o.strokeWidth * scale).toFixed(1)}"/>`;
    const fs2 = (o.fontSize * scale).toFixed(1);
    const anchor = o.textAlign === "center" ? "middle" : o.textAlign === "right" ? "end" : "start";
    const x = o.originX === "center" ? o.left : o.textAlign === "center" ? o.left + (o.width || 0) / 2 : o.left;
    return `<text x="${(x * scale).toFixed(1)}" y="${((o.top + o.fontSize * 0.85) * scale).toFixed(1)}" font-family="${o.fontFamily.includes("Serif") ? "Georgia,serif" : "Helvetica,Arial,sans-serif"}" font-size="${fs2}" font-weight="${o.fontWeight}" fill="${o.fill}" text-anchor="${anchor}">${String(o.text).replace(/&/g, "&amp;").replace(/</g, "&lt;").split("\n")[0]}</text>`;
  }).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${sw}" height="${sh}" viewBox="0 0 ${sw} ${sh}"><rect width="${sw}" height="${sh}" fill="#ffffff"/>${els}</svg>`;
  return "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64");
}

function build(spec) {
  const { W, H } = dims(spec.size, spec.landscape);
  const objs = spec.objects(W, H);
  const paper = {
    version: "4.0",
    timestamp: "2026-01-01T00:00:00.000Z",
    settings: {
      type: "blank", customW: spec.size === "A5" ? 148 : 210, customH: spec.size === "A5" ? 210 : 297,
      marginTop: 94.49, marginBottom: 94.49, marginLeft: 75.59, marginRight: 75.59,
      paperOrientation: !!spec.landscape, dual: false, paperBgColor: "#ffffff",
      rowCount: 20, gridColor: "#7c3aed", strokeWidth: 1,
    },
    paperSize: spec.size,
    thumbnail: thumb(W, H, objs),
    canvasData: { version: "5.3.0", objects: objs },
  };
  fs.writeFileSync(path.join(DIR, spec.id + ".print"), JSON.stringify(paper));
  return { id: spec.id, name: spec.name, desc: spec.desc, url: `./templates/${spec.id}.print`, thumbnail: paper.thumbnail };
}

const cx = (W) => W / 2;
const PURPLE = "#7c3aed";
const DARK = "#1f2937";
const GRAY = "#6b7280";
const SERIF = "SourceHanSerifCN-Bold";

const specs = [
  {
    id: "en_certificate_achievement", name: "Certificate of Achievement",
    desc: "Classic bordered award certificate", size: "A4", landscape: true,
    objects: (W, H) => [
      R({ left: 40, top: 40, width: W - 80, height: H - 80, stroke: PURPLE, strokeWidth: 4, rx: 6 }),
      R({ left: 56, top: 56, width: W - 112, height: H - 112, stroke: PURPLE, strokeWidth: 1 }),
      T({ left: cx(W), top: 150, originX: "center", text: "CERTIFICATE", fontFamily: SERIF, fontWeight: "bold", fontSize: 64, fill: DARK, charSpacing: 300 }),
      T({ left: cx(W), top: 232, originX: "center", text: "OF ACHIEVEMENT", fontFamily: SERIF, fontSize: 26, fill: PURPLE, charSpacing: 600 }),
      T({ left: cx(W), top: 320, originX: "center", text: "This certificate is proudly presented to", fontSize: 22, fill: GRAY }),
      T({ left: cx(W), top: 370, originX: "center", text: "Recipient Name", fontFamily: SERIF, fontWeight: "bold", fontSize: 48, fill: PURPLE }),
      T({ left: cx(W), top: 470, originX: "center", text: "in recognition of outstanding performance and dedication.", fontSize: 20, fill: GRAY }),
      T({ left: 220, top: 660, originX: "center", text: "________________", fontSize: 22, fill: DARK }),
      T({ left: 220, top: 690, originX: "center", text: "Date", fontSize: 18, fill: GRAY }),
      T({ left: W - 220, top: 660, originX: "center", text: "________________", fontSize: 22, fill: DARK }),
      T({ left: W - 220, top: 690, originX: "center", text: "Signature", fontSize: 18, fill: GRAY }),
    ],
  },
  {
    id: "en_certificate_completion", name: "Certificate of Completion",
    desc: "Modern certificate with accent bar", size: "A4", landscape: true,
    objects: (W, H) => [
      R({ left: 0, top: 0, width: W, height: 90, fill: PURPLE, stroke: "", strokeWidth: 0 }),
      R({ left: 0, top: H - 50, width: W, height: 50, fill: PURPLE, stroke: "", strokeWidth: 0 }),
      T({ left: cx(W), top: 200, originX: "center", text: "CERTIFICATE OF COMPLETION", fontWeight: "bold", fontSize: 46, fill: DARK, charSpacing: 200 }),
      R({ left: cx(W) - 80, top: 270, width: 160, height: 4, fill: PURPLE, stroke: "", strokeWidth: 0 }),
      T({ left: cx(W), top: 330, originX: "center", text: "This is to certify that", fontSize: 22, fill: GRAY }),
      T({ left: cx(W), top: 380, originX: "center", text: "Recipient Name", fontFamily: SERIF, fontWeight: "bold", fontSize: 50, fill: PURPLE }),
      T({ left: cx(W), top: 470, originX: "center", text: "has successfully completed the course requirements.", fontSize: 20, fill: GRAY }),
      T({ left: cx(W), top: 600, originX: "center", text: "Date: ____________      Signature: ____________", fontSize: 20, fill: DARK }),
    ],
  },
  {
    id: "en_letterhead", name: "Business Letterhead",
    desc: "Clean A4 company letterhead", size: "A4", landscape: false,
    objects: (W, H) => [
      T({ left: 75, top: 70, text: "COMPANY NAME", textAlign: "left", fontWeight: "bold", fontSize: 34, fill: PURPLE, charSpacing: 100 }),
      T({ left: 75, top: 116, text: "Your tagline goes here", textAlign: "left", fontSize: 18, fill: GRAY }),
      T({ left: W - 75, top: 74, originX: "right", textAlign: "right", text: "123 Business Road\nCity, State 00000\nhello@company.com\n+1 (555) 000-0000", fontSize: 16, fill: DARK, lineHeight: 1.4 }),
      R({ left: 75, top: 180, width: W - 150, height: 3, fill: PURPLE, stroke: "", strokeWidth: 0 }),
      R({ left: 75, top: H - 90, width: W - 150, height: 1, fill: "#d1d5db", stroke: "", strokeWidth: 0 }),
      T({ left: cx(W), top: H - 78, originX: "center", text: "www.company.com", fontSize: 15, fill: GRAY }),
    ],
  },
  {
    id: "en_name_badge", name: "Name Badge",
    desc: "Event / conference name badge", size: "A5", landscape: true,
    objects: (W, H) => [
      R({ left: 24, top: 24, width: W - 48, height: H - 48, stroke: PURPLE, strokeWidth: 3, rx: 16 }),
      R({ left: 24, top: 24, width: W - 48, height: 78, fill: PURPLE, stroke: "", strokeWidth: 0, rx: 16 }),
      T({ left: cx(W), top: 44, originX: "center", text: "HELLO", fontWeight: "bold", fontSize: 30, fill: "#ffffff", charSpacing: 400 }),
      T({ left: cx(W), top: 150, originX: "center", text: "my name is", fontSize: 20, fill: GRAY }),
      T({ left: cx(W), top: 190, originX: "center", text: "First Last", fontFamily: SERIF, fontWeight: "bold", fontSize: 56, fill: DARK }),
      T({ left: cx(W), top: 300, originX: "center", text: "Job Title · Company", fontSize: 22, fill: PURPLE }),
    ],
  },
  {
    id: "en_shipping_label", name: "Shipping Label",
    desc: "From / To address shipping label", size: "A5", landscape: false,
    objects: (W, H) => [
      R({ left: 24, top: 24, width: W - 48, height: H - 48, stroke: DARK, strokeWidth: 2 }),
      T({ left: 48, top: 50, text: "FROM:", textAlign: "left", fontWeight: "bold", fontSize: 18, fill: GRAY }),
      T({ left: 48, top: 80, textAlign: "left", text: "Sender Name\n123 Sender St\nCity, State 00000", fontSize: 18, fill: DARK, lineHeight: 1.4 }),
      R({ left: 24, top: 200, width: W - 48, height: 2, fill: DARK, stroke: "", strokeWidth: 0 }),
      T({ left: 48, top: 230, text: "SHIP TO:", textAlign: "left", fontWeight: "bold", fontSize: 22, fill: PURPLE }),
      T({ left: 48, top: 272, textAlign: "left", text: "Recipient Name\n456 Receiver Ave\nApt 7\nCity, State 11111", fontFamily: SERIF, fontWeight: "bold", fontSize: 28, fill: DARK, lineHeight: 1.4 }),
      T({ left: cx(W), top: H - 90, originX: "center", text: "Add a barcode with the Barcode tool", fontSize: 14, fill: GRAY }),
    ],
  },
  {
    id: "en_gift_voucher", name: "Gift Voucher",
    desc: "Gift voucher / coupon", size: "A5", landscape: true,
    objects: (W, H) => [
      R({ left: 0, top: 0, width: W, height: H, fill: "#f5f3ff", stroke: "", strokeWidth: 0 }),
      R({ left: 28, top: 28, width: W - 56, height: H - 56, stroke: PURPLE, strokeWidth: 2, strokeDashArray: [10, 8], rx: 10 }),
      T({ left: cx(W), top: 70, originX: "center", text: "GIFT VOUCHER", fontWeight: "bold", fontSize: 46, fill: PURPLE, charSpacing: 200 }),
      T({ left: cx(W), top: 160, originX: "center", text: "$ 50", fontFamily: SERIF, fontWeight: "bold", fontSize: 80, fill: DARK }),
      T({ left: cx(W), top: 280, originX: "center", text: "Valid until __ / __ / ____", fontSize: 20, fill: GRAY }),
      T({ left: cx(W), top: 320, originX: "center", text: "Code: GIFT-0000", fontSize: 22, fill: PURPLE, charSpacing: 200 }),
    ],
  },
];

const entries = specs.map(build);
fs.writeFileSync("/tmp/en_template_entries.json", JSON.stringify(entries, null, 2));
console.log(`Generated ${entries.length} English templates in ${DIR}`);
console.log("Entries (for templates.json) written to /tmp/en_template_entries.json");
