import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ToolThinPage } from "@/components/tool-thin-page";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "toolPages" });
  return {
    title: t("labelPrinting.title"),
    description: t("labelPrinting.subtitle"),
    alternates: {
      canonical: locale === "en" ? "https://print.shuttlelab.org/tools/label-printing/" : `https://print.shuttlelab.org/${locale}/tools/label-printing/`,
      languages: { en: "https://print.shuttlelab.org/tools/label-printing/", zh: "https://print.shuttlelab.org/zh/tools/label-printing/", "x-default": "https://print.shuttlelab.org/tools/label-printing/" },
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I print labels with barcodes for free?",
      acceptedAnswer: { "@type": "Answer", text: "Open Print Shuttle in your browser, set your paper size to match your label sheets, use the Barcode tool to add barcodes from 40 supported formats (QR Code, Code 128, EAN-13, etc.), add text fields for product names and prices, then export as PDF or print directly. Everything is free with no registration." },
    },
    {
      "@type": "Question",
      name: "Can I batch-print product labels from an Excel file?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Load your .xlsx file into Print Shuttle's Data Source panel, bind columns to text and barcode fields, and generate hundreds of unique labels in one click. Each row produces one label with different product names, SKUs, prices, and barcode content." },
    },
    {
      "@type": "Question",
      name: "What barcode formats are supported for labels?",
      acceptedAnswer: { "@type": "Answer", text: "Print Shuttle supports 40 barcode formats via bwip-js: QR Code, Data Matrix, PDF417, Aztec Code, Code 128, EAN-13, EAN-8, UPC-A, UPC-E, Code 39, Code 93, GS1-128, ITF-14, Interleaved 2 of 5, Pharmacode, USPS Intelligent Mail, Royal Mail, Japan Post, Australia Post, and more." },
    },
    {
      "@type": "Question",
      name: "What label sizes can I use?",
      acceptedAnswer: { "@type": "Answer", text: "Print Shuttle supports standard paper sizes (A3, A4, A5, B4, B5) and fully custom dimensions. Set custom width and height in millimeters to match any label sheet format, including Avery, DYMO, and Zebra label templates. Use the 'split mode' to print two copies per page." },
    },
    {
      "@type": "Question",
      name: "Is my label data uploaded to a server?",
      acceptedAnswer: { "@type": "Answer", text: "No. Print Shuttle is 100% client-side. All barcode generation (bwip-js), Excel parsing (SheetJS), canvas editing (Fabric.js), and PDF export (jsPDF) happen in your browser. Your product data, SKUs, and pricing information never leave your device." },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Print Labels with Barcodes Using Print Shuttle",
  step: [
    { "@type": "HowToStep", position: 1, text: "Open Print Shuttle and start a new project. Set the paper size to match your label sheet dimensions using the Paper Size panel." },
    { "@type": "HowToStep", position: 2, text: "Click the Barcode tool in the toolbar and select from 40 formats. Place the barcode on your label canvas and configure its type, size, and text display." },
    { "@type": "HowToStep", position: 3, text: "Add product name text, price, SKU, and other label elements. Use alignment tools for precise positioning on the label layout." },
    { "@type": "HowToStep", position: 4, text: "For batch labels, load your Excel (.xlsx) file in the Data Source panel and bind columns to text and barcode fields." },
    { "@type": "HowToStep", position: 5, text: "Export as PDF for professional printing or use the browser print dialog. Each Excel row generates one unique label." },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Label Printing Templates — Free Online Label Designer",
  description: "Create and print product labels, shipping labels, and barcode labels in your browser. Supports 40 barcode formats and Excel batch printing.",
  author: { "@type": "Organization", name: "ShuttleLab" },
  publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
  datePublished: "2026-06-01",
  dateModified: "2026-06-08",
  url: "https://print.shuttlelab.org/tools/label-printing/",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://print.shuttlelab.org/" },
    { "@type": "ListItem", position: 2, name: "Label Printing", item: "https://print.shuttlelab.org/tools/label-printing/" },
  ],
};

export default async function LabelPrintingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    return <ToolThinPage slug="label-printing" />;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <h1>Label Printing Templates — Free Online Label Designer</h1>
        <p className="lead">
          Create and print product labels, shipping labels, barcode labels, and inventory tags directly in your browser. Print Shuttle is a free label designer supporting 40 barcode formats and Excel batch printing — no software installation or account required.
        </p>

        <h2>What Is a Label Printing Tool?</h2>
        <p>
          A label printing tool lets you design and print labels for products, packages, inventory, and shipping without dedicated label design software. Print Shuttle is a free browser-based label designer built on the Fabric.js canvas engine that provides professional-grade layout capabilities including precise positioning, text formatting, image placement, and barcode generation. Unlike Canva or Avery Design & Print, Print Shuttle runs entirely in your browser — your product data, pricing, and inventory information never leave your device.
        </p>
        <p>
          Print Shuttle supports 40 barcode formats through the bwip-js library, making it ideal for retail product labels (EAN-13, UPC-A), warehouse shipping labels (GS1-128, ITF-14), library systems (Code 128, Code 39), and postal services (USPS Intelligent Mail, Royal Mail, Japan Post). Barcodes can be dynamically bound to Excel data fields for batch generation.
        </p>

        <h2>When Should You Use a Label Printing Tool?</h2>
        <ul>
          <li><strong>Retail product labeling</strong> — Generate price tags and product labels with EAN-13 or UPC-A barcodes, product names, and pricing from your inventory spreadsheet.</li>
          <li><strong>Warehouse and logistics</strong> — Create shipping labels with GS1-128 or ITF-14 barcodes for pallet labeling, carton marking, and dispatch documentation.</li>
          <li><strong>Inventory management</strong> — Print Code 128 or QR Code labels for asset tracking, bin labeling, and stock management systems.</li>
          <li><strong>Food and beverage labeling</strong> — Design nutrition labels, ingredient lists, and batch number labels for food packaging compliance.</li>
          <li><strong>Event and conference badges</strong> — Produce name badges with QR codes for event check-in, access control, and networking.</li>
        </ul>

        <h2>How to Print Labels with Barcodes</h2>
        <ol>
          <li><strong>Set your label dimensions:</strong> Open Print Shuttle and configure the paper size to match your label sheets. Use custom dimensions for non-standard label formats.</li>
          <li><strong>Add barcodes:</strong> Click the Barcode tool and choose from 40 formats. Place the barcode on your label and configure type, size, bar height, color, and human-readable text display.</li>
          <li><strong>Design the label layout:</strong> Add product name, price, weight, description, and other text elements. Insert logos or product images. Use the alignment and distribution tools for precise layout.</li>
          <li><strong>Set up batch printing:</strong> Load your product spreadsheet (.xlsx) in the Data Source panel. Bind columns to text and barcode fields. Each row generates one unique label.</li>
          <li><strong>Export and print:</strong> Export as PDF for commercial printing or use the browser&apos;s native print dialog. The split mode option prints two label copies per page.</li>
        </ol>

        <h2>Common Label Printing Challenges</h2>
        <h3>Barcode format compatibility</h3>
        <p>
          Different industries require different barcode symbologies. Retail needs EAN-13 or UPC-A, logistics uses GS1-128, healthcare uses GS1 DataBar, and libraries use Code 39. Print Shuttle supports all 40 standard barcode formats through bwip-js, so you never need a separate barcode generator tool.
        </p>
        <h3>Batch label generation from inventory data</h3>
        <p>
          Manually creating hundreds of individual labels is error-prone and time-consuming. Print Shuttle&apos;s variable data feature connects directly to your Excel inventory file: bind columns to label fields and generate all labels in one click. Barcode content, product names, prices, and SKUs all update automatically per row.
        </p>
        <h3>Custom label sheet dimensions</h3>
        <p>
          Not all label sheets follow standard paper sizes. Print Shuttle supports fully custom dimensions in millimeters, so you can match any Avery, DYMO, Zebra, or custom label template precisely.
        </p>
        <h3>Data privacy for pricing and inventory</h3>
        <p>
          Cloud-based design tools upload your product data and pricing to their servers. Print Shuttle processes everything in your browser — your inventory data, pricing strategy, and product information remain completely private. This is critical for competitive business data.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>How do I print labels with barcodes for free?</h3>
        <p>Open Print Shuttle in your browser, set your paper size to match your label sheets, use the Barcode tool to add barcodes from 40 supported formats (QR Code, Code 128, EAN-13, etc.), add text fields for product names and prices, then export as PDF or print directly. Everything is free with no registration.</p>

        <h3>Can I batch-print product labels from an Excel file?</h3>
        <p>Yes. Load your .xlsx file into Print Shuttle&apos;s Data Source panel, bind columns to text and barcode fields, and generate hundreds of unique labels in one click. Each row produces one label with different product names, SKUs, prices, and barcode content.</p>

        <h3>What barcode formats are supported for labels?</h3>
        <p>Print Shuttle supports 40 barcode formats via bwip-js: QR Code, Data Matrix, PDF417, Aztec Code, Code 128, EAN-13, EAN-8, UPC-A, UPC-E, Code 39, Code 93, GS1-128, ITF-14, Interleaved 2 of 5, Pharmacode, USPS Intelligent Mail, Royal Mail, Japan Post, Australia Post, and more.</p>

        <h3>What label sizes can I use?</h3>
        <p>Print Shuttle supports standard paper sizes (A3, A4, A5, B4, B5) and fully custom dimensions. Set custom width and height in millimeters to match any label sheet format, including Avery, DYMO, and Zebra label templates.</p>

        <h3>Is my label data uploaded to a server?</h3>
        <p>No. Print Shuttle is 100% client-side. All barcode generation, Excel parsing, canvas editing, and PDF export happen in your browser. Your product data, SKUs, and pricing information never leave your device.</p>

        <h2>Related Tools</h2>
        <ul>
          <li><Link href="/">Print Shuttle Home — Full visual editor</Link></li>
          <li><Link href="/tools/certificate-maker/">Certificate Maker</Link></li>
          <li><Link href="/tools/name-badge-maker/">Name Badge Maker</Link></li>
          <li><Link href="/about/">About Print Shuttle</Link></li>
        </ul>

        <div className="mt-8">
          <Link href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 no-underline">
            Open the Label Editor →
          </Link>
        </div>
      </article>
    </>
  );
}
