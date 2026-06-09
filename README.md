# Print Shuttle

Free browser-based visual print layout and batch printing designer. Design certificates, labels, name badges, and letterhead with a Fabric.js canvas editor, import Excel data for batch generation, and export as PDF. Supports 40 barcode formats, 12 built-in templates, and custom paper sizes. Everything runs in the browser; no data is sent to any server.

## Features

- **Visual Canvas Editor** — Drag-and-drop Fabric.js canvas with full layer management, vector shapes (rectangles, circles, polygons, lines), a built-in table editor with cell merge/split, and local font support via the browser's Local Font Access API
- **Batch Printing with Excel** — Import `.xlsx` files via SheetJS, bind columns to text, barcode, or image elements, and generate hundreds of personalized pages in one click
- **40 Barcode Formats** — Generate QR Code, Code 128, EAN-13, Data Matrix, PDF417, Aztec Code, GS1-128, ITF-14, and 32 more symbologies via bwip-js. Barcode content can be dynamically bound to data fields
- **PDF Export** — Export multi-page designs as vector-quality PDF via jsPDF + svg2pdf, or use the browser's native print dialog with preview
- **12 Built-in Templates** — English designs (certificate of achievement/completion, business letterhead, name badge, shipping label, gift voucher) plus Chinese office-document styles (letterhead, custom/red header, award certificate, blank A4)
- **Custom Paper Sizes** — A3, A4, A5, B4, B5, and fully custom dimensions in millimeters. Split mode for printing two copies per page
- **100% Private** — All processing (canvas editing, Excel parsing, barcode generation, PDF export) happens in your browser. No data is uploaded to any server
- **PWA Support** — Install as a standalone app on mobile and desktop with offline caching
- **Bilingual** — English and Chinese UI with URL-based i18n

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `out/` for static deployment to Cloudflare Workers.

## License

Licensed under the GNU Affero General Public License v3.0 — see [LICENSE](./LICENSE).

The editor engine embeds [PaperStudio](https://github.com/jingguanzhang/PaperStudio) by jingguanzhang, used under the [MIT License](./public/studio/LICENSE).

Free to use, modify, and self-host. If you run a modified version as a network
service, you must open-source your modifications (AGPL §13). For commercial
licensing without copyleft obligations, contact support@shuttlelab.org.
