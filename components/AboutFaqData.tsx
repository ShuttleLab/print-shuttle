interface Bilingual {
  en: string;
  zh: string;
}

interface FaqItem {
  q: Bilingual;
  a: Bilingual;
}

interface HowToStep {
  en: string;
  zh: string;
}

interface HowTo {
  name: Bilingual;
  steps: HowToStep[];
}

interface Persona {
  en: string;
  zh: string;
}

interface UseCase {
  en: string;
  zh: string;
}

interface ComparisonData {
  en: {
    heading: string;
    columns: string[];
    rows: string[][];
  };
  zh: {
    heading: string;
    columns: string[];
    rows: string[][];
  };
}

// Facts sourced from PaperStudio index.html and templates/templates.json:
// - 12 templates: templates/templates.json (6 English en_* + 6 Chinese: standard_a4, a9276b, 8f4ed4, 8feea4, 8f196f, blank_a4)
// - 40 barcode types: index.html <select id="bcType"> count of <option> elements
// - Paper sizes A3/A4/A5/B4/B5/custom: index.html <select id="paperSize"> options
// - Excel .xlsx import: index.html SheetJS usage (line ~5275, xlsx.full.min.js in static/)
// - Fabric.js canvas: index.html line 1 (fabric.min.js), static/fabric.min.js
// - jsPDF + svg2pdf: index.html static/jspdf.umd.min.js, static/svg2pdf.umd.min.js
// - Table editor with merge/split: index.html tableModal section (line ~635+)
// - Vector shapes (rect, circle, polygon, line): index.html shape tool
// - Local font support: index.html font handling section
// - Serial number auto-generation: README.md line 25
// - Chinese-only UI, no English toggle: <html lang="zh-CN"> line 2

export const WHO_FOR: Persona[] = [
  { en: "Office administrators who need to print letterhead, memos, and internal documents with custom headers and logos", zh: "需要打印带自定义抬头和 Logo 的公文纸、备忘录和内部文件的办公管理人员" },
  { en: "Event organizers creating certificates, name badges, and table cards with personalized data", zh: "需要制作带有个性化数据的奖状、工牌和会议桌牌的活动组织者" },
  { en: "Warehouse and logistics teams generating product labels with barcodes and QR codes for inventory tracking", zh: "需要生成带条码和二维码的商品标签用于库存追踪的仓储物流团队" },
  { en: "Educators making practice worksheets, calligraphy grids, and music sheets for classroom use", zh: "需要制作练习纸、书法练习格和乐谱供课堂使用的教育工作者" },
];

export const WHEN_USE: UseCase[] = [
  { en: "Batch-printing employee ID badges with different names, photos, and barcode data from an Excel spreadsheet", zh: "从 Excel 表格批量打印包含不同姓名、照片和条码数据的员工工牌" },
  { en: "Generating award certificates with serial numbers and custom borders for a school ceremony", zh: "为学校典礼生成带序列号和自定义边框的获奖证书" },
  { en: "Creating shipping labels with GS1-128 or Code 128 barcodes for warehouse dispatch", zh: "为仓库发货创建带 GS1-128 或 Code 128 条码的发货标签" },
  { en: "Designing calligraphy practice sheets with tian-zi-ge or mi-zi-ge grid patterns", zh: "设计带有田字格或米字格图案的书法练习纸" },
  { en: "Printing multi-page documents with consistent formatting using the built-in table editor", zh: "使用内置表格编辑器打印格式统一的多页文档" },
];

export const HOWTOS: HowTo[] = [
  {
    name: { en: "Create a certificate with variable data", zh: "使用可变数据制作证书" },
    steps: [
      { en: "Open Print Shuttle and click 'New Blank Paper' or select the certificate template from the welcome modal", zh: "打开 Print Shuttle，点击「新建空白纸」或从欢迎弹窗中选择奖状模板" },
      { en: "Use the toolbar to add text elements for the recipient name, date, and description. Add decorative borders and logos as needed", zh: "使用工具栏添加文字元素用于填写姓名、日期和描述。按需添加装饰边框和 Logo" },
      { en: "Switch to the 'Data Source' panel and load your Excel (.xlsx) file containing the recipient list", zh: "切换到「数据源」面板，加载包含受奖人名单的 Excel（.xlsx）文件" },
      { en: "Select each text element and bind it to the corresponding Excel column in the properties panel", zh: "选中每个文字元素，在属性面板中将其绑定到对应的 Excel 列" },
      { en: "Click 'Export PDF' or 'Print' to generate one personalized certificate per row in your spreadsheet", zh: "点击「导出 PDF」或「打印」，为表格中的每一行生成一张个性化证书" },
    ],
  },
  {
    name: { en: "Design product labels with barcodes", zh: "设计带条码的商品标签" },
    steps: [
      { en: "Start a new project and set the paper size to a label format (e.g., custom dimensions for your label sheets)", zh: "新建项目，将纸张尺寸设置为标签格式（例如，自定义标签纸的尺寸）" },
      { en: "Click the 'Barcode' tool in the toolbar and choose from 40 supported formats including QR Code, Code 128, and EAN-13", zh: "点击工具栏中的「条码」工具，从 40 种支持的格式中选择，包括 QR Code、Code 128 和 EAN-13" },
      { en: "Place the barcode on the canvas and configure its type, size, color, and text display options in the properties panel", zh: "将条码放置在画布上，在属性面板中配置其类型、大小、颜色和文字显示选项" },
      { en: "Add product name text, price fields, and any other label elements. Use the alignment tools for precise positioning", zh: "添加商品名称文字、价格字段和其他标签元素。使用对齐工具精确定位" },
      { en: "Export as PDF for professional printing, or use the browser's native print dialog for direct printing", zh: "导出为 PDF 用于专业打印，或使用浏览器原生打印对话框直接打印" },
    ],
  },
];

export const COMPARISON: ComparisonData = {
  en: {
    heading: "Print Shuttle vs. Alternatives",
    columns: ["Feature", "Print Shuttle", "Canva", "Avery Design & Print", "Microsoft Word"],
    rows: [
      ["Price", "Free forever", "Free + $12.99/mo Pro", "Free", "From $159.99/yr"],
      ["Runs in browser", "✓", "✓", "✓", "—"],
      ["Data stays local", "✓ (100% client-side)", "— (cloud)", "— (cloud)", "✓ (local app)"],
      ["Excel batch printing", "✓ (native .xlsx import)", "Limited", "✓ (mail merge)", "✓ (mail merge)"],
      ["Barcode generation", "✓ (40 formats)", "—", "—", "—"],
      ["No install required", "✓", "✓", "✓", "—"],
    ],
  },
  zh: {
    heading: "Print Shuttle 与替代方案对比",
    columns: ["功能", "Print Shuttle", "Canva", "Avery Design & Print", "Microsoft Word"],
    rows: [
      ["价格", "永久免费", "免费 + ¥90/月专业版", "免费", "¥1099/年起"],
      ["浏览器运行", "✓", "✓", "✓", "—"],
      ["数据本地化", "✓（100% 客户端）", "—（云端）", "—（云端）", "✓（本地应用）"],
      ["Excel 批量打印", "✓（原生 .xlsx 导入）", "有限", "✓（邮件合并）", "✓（邮件合并）"],
      ["条码生成", "✓（40 种格式）", "—", "—", "—"],
      ["无需安装", "✓", "✓", "✓", "—"],
    ],
  },
};

export const FAQS: FaqItem[] = [
  {
    q: { en: "Is Print Shuttle really free? Are there any hidden limits?", zh: "Print Shuttle 真的免费吗？有什么隐藏限制吗？" },
    a: { en: "Yes, Print Shuttle is completely free with no usage limits, no ads, and no registration required. The editor engine is based on PaperStudio, an open-source project under the MIT license. You can create unlimited designs, export unlimited PDFs, and print as many pages as you need.", zh: "是的，Print Shuttle 完全免费，没有使用限制、没有广告、无需注册。编辑器引擎基于 MIT 许可的开源项目 PaperStudio。您可以创建无限设计、导出无限 PDF、打印任意数量的页面。" },
  },
  {
    q: { en: "Is my data safe? Does Print Shuttle upload my files to a server?", zh: "我的数据安全吗？Print Shuttle 会把文件上传到服务器吗？" },
    a: { en: "Your data is 100% safe. Print Shuttle runs entirely in your browser — all canvas editing, Excel parsing (via SheetJS), barcode generation (via bwip-js), and PDF export (via jsPDF) happen locally on your device. No data is ever sent to any server. This is verified by the open-source code.", zh: "您的数据 100% 安全。Print Shuttle 完全在浏览器中运行 — 所有画布编辑、Excel 解析（通过 SheetJS）、条码生成（通过 bwip-js）和 PDF 导出（通过 jsPDF）都在您的设备上本地完成。任何数据都不会发送到服务器，这已通过开源代码验证。" },
  },
  {
    q: { en: "What barcode formats does Print Shuttle support?", zh: "Print Shuttle 支持哪些条码格式？" },
    a: { en: "Print Shuttle supports 40 barcode formats via bwip-js, including QR Code, Data Matrix, PDF417, Aztec Code, Code 128, EAN-13, EAN-8, UPC-A, UPC-E, Code 39, Code 93, GS1-128, ITF-14, Interleaved 2 of 5, Pharmacode, USPS Intelligent Mail, Royal Mail, Japan Post, and more. Barcode content can be dynamically bound to Excel data fields for batch generation.", zh: "Print Shuttle 通过 bwip-js 支持 40 种条码格式，包括 QR Code、Data Matrix、PDF417、Aztec Code、Code 128、EAN-13、EAN-8、UPC-A、UPC-E、Code 39、Code 93、GS1-128、ITF-14、交叉 25 码、Pharmacode、USPS Intelligent Mail、Royal Mail、日本邮政等。条码内容可动态绑定 Excel 数据字段实现批量生成。" },
  },
  {
    q: { en: "Can I import Excel data for batch printing?", zh: "可以导入 Excel 数据进行批量打印吗？" },
    a: { en: "Yes. Print Shuttle's variable data printing feature lets you import .xlsx files (via SheetJS), automatically detects column headers, and lets you bind any column to text, barcode, or image elements on the canvas. One click generates hundreds of personalized pages — each with different names, photos, serial numbers, or barcode content.", zh: "可以。Print Shuttle 的可变数据打印功能允许您导入 .xlsx 文件（通过 SheetJS），自动识别表头，并将任意列绑定到画布上的文字、条码或图片元素。一键即可生成数百张个性化页面 — 每张包含不同的姓名、照片、序列号或条码内容。" },
  },
  {
    q: { en: "What paper sizes are supported?", zh: "支持哪些纸张尺寸？" },
    a: { en: "Print Shuttle supports standard paper sizes A3 (297×420mm), A4 (210×297mm), A5 (148×210mm), B4 (250×353mm), B5 (176×250mm), and custom dimensions. You can also set custom label dimensions for label sheets and use the 'split mode' for printing two copies per page.", zh: "Print Shuttle 支持标准纸张尺寸 A3（297×420mm）、A4（210×297mm）、A5（148×210mm）、B4（250×353mm）、B5（176×250mm）以及自定义尺寸。您还可以设置标签纸的自定义尺寸，并使用「对开模式」在每页打印两份。" },
  },
  {
    q: { en: "Can I use my own fonts?", zh: "可以使用自己的字体吗？" },
    a: { en: "Yes. Print Shuttle reads the fonts installed on your computer via the browser's Local Font Access API (queryLocalFonts, available in Chromium browsers such as Chrome and Edge) — no font files are uploaded to any server. The editor also includes Phosphor Icons for icon elements.", zh: "可以。Print Shuttle 通过浏览器的 Local Font Access API（queryLocalFonts，在 Chrome、Edge 等 Chromium 浏览器中可用）读取您电脑上已安装的字体，无需上传任何字体文件到服务器。编辑器还内置了 Phosphor Icons 图标库。" },
  },
  {
    q: { en: "How does the table editor work?", zh: "表格编辑器怎么用？" },
    a: { en: "Print Shuttle includes a built-in WYSIWYG table editor that supports cell merge and split, custom cell backgrounds and borders, text alignment, and adjustable row/column sizes. Tables can be used for structured layouts like invoices, schedules, and comparison sheets.", zh: "Print Shuttle 内置所见即所得的表格编辑器，支持单元格合并与拆分、自定义单元格背景和边框、文字对齐、以及可调整的行高列宽。表格可用于发票、日程表和对比表等结构化排版。" },
  },
  {
    q: { en: "What export formats are available?", zh: "支持哪些导出格式？" },
    a: { en: "Print Shuttle supports two output methods: PDF export (via jsPDF with svg2pdf for vector-quality output, supporting multi-page batch export) and direct browser printing (using the native print dialog with preview support). You can also save and reload your design as .print project files.", zh: "Print Shuttle 支持两种输出方式：PDF 导出（通过 jsPDF 配合 svg2pdf 实现矢量级输出，支持多页批量导出）和直接浏览器打印（使用原生打印对话框，支持打印预览）。您还可以将设计保存为 .print 项目文件并重新加载。" },
  },
  {
    q: { en: "Does Print Shuttle work offline?", zh: "Print Shuttle 支持离线使用吗？" },
    a: { en: "Yes. Print Shuttle is a single-page application with all libraries bundled locally (Fabric.js, jsPDF, SheetJS, bwip-js, Tailwind CSS). Once the page has loaded, you can continue designing without an internet connection. The PWA service worker caches all necessary assets for offline use.", zh: "是的。Print Shuttle 是一个单页应用，所有库都在本地打包（Fabric.js、jsPDF、SheetJS、bwip-js、Tailwind CSS）。页面加载完成后，您可以在没有网络连接的情况下继续设计。PWA Service Worker 会缓存所有必要资源以支持离线使用。" },
  },
  {
    q: { en: "What templates are included?", zh: "包含哪些模板？" },
    a: { en: "Print Shuttle includes 12 built-in templates: English designs (Certificate of Achievement, Certificate of Completion, Business Letterhead, Name Badge, Shipping Label, Gift Voucher) and Chinese office-document styles (Standard Letterhead A4, Custom Header A4, Award Certificate, Header + Logo A4, Red-Header Template, and Blank A4). Each template is fully customizable — you can modify every element, add data bindings, and save your own designs.", zh: "Print Shuttle 内置 12 个模板：英文设计（成就证书、结业证书、商务信头、工牌、快递标签、礼券）和中文公文样式（标准信笺 A4、名称抬头 A4、奖状、名称+LOGO 抬头 A4、红头模板、空白 A4）。每个模板完全可自定义 — 您可以修改每个元素、添加数据绑定，并保存自己的设计。" },
  },
];

export const HEADINGS = {
  whoFor: { en: "Who Is Print Shuttle For?", zh: "Print Shuttle 适合谁？" },
  whenUse: { en: "When Should You Use Print Shuttle?", zh: "什么时候使用 Print Shuttle？" },
  howTo: { en: "How-To Guides", zh: "使用指南" },
  comparison: { en: "How Print Shuttle Compares", zh: "Print Shuttle 对比其他工具" },
  faqs: { en: "Frequently Asked Questions", zh: "常见问题" },
};

export const aboutFaqData = {
  WHO_FOR,
  WHEN_USE,
  HOWTOS,
  COMPARISON,
  FAQS,
  HEADINGS,
};
