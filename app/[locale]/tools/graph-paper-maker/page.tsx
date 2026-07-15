import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ToolThinPage } from "@/components/tool-thin-page";
import { GraphPaperTool } from "@/components/graph-paper/graph-paper-tool";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "toolPages" });
  return {
    title: t("graphPaperMaker.title"),
    description: t("graphPaperMaker.subtitle"),
    alternates: {
      canonical: locale === "en" ? "https://print.shuttlelab.org/tools/graph-paper-maker/" : `https://print.shuttlelab.org/${locale}/tools/graph-paper-maker/`,
      languages: { en: "https://print.shuttlelab.org/tools/graph-paper-maker/", zh: "https://print.shuttlelab.org/zh/tools/graph-paper-maker/", "x-default": "https://print.shuttlelab.org/tools/graph-paper-maker/" },
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I make printable graph paper online for free?",
      acceptedAnswer: { "@type": "Answer", text: "Open the Graph Paper Maker, pick a grid type (square, dot, isometric, hexagonal, and more), choose your paper size and orientation, then adjust spacing, line width, and colours. Click Print to save as PDF, or download the design as SVG or PNG. No account or installation required." },
    },
    {
      "@type": "Question",
      name: "What grid types can I generate?",
      acceptedAnswer: { "@type": "Answer", text: "The generator supports square grids, dot grids, ruled/lined paper, multi-weight graph paper, cross grids, isometric grids, triangle grids, hexagonal (honeycomb) paper, polar coordinate paper, semi-log paper, music staff paper, and Cornell note paper." },
    },
    {
      "@type": "Question",
      name: "Can I set a custom paper size and grid spacing?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Choose from A3, A4, A5, B4, B5, Letter, and Legal, or enter custom dimensions in millimetres. Grid spacing, margins, line width, and line/background colours are all adjustable, and the preview updates instantly." },
    },
    {
      "@type": "Question",
      name: "How do I export graph paper as a PDF?",
      acceptedAnswer: { "@type": "Answer", text: "Click Print / Save as PDF. The tool opens your browser's print dialog with the exact paper size and orientation preset — choose “Save as PDF” as the destination for vector-quality output at any scale. You can also download the design as a scalable SVG or a 300 DPI PNG." },
    },
    {
      "@type": "Question",
      name: "Is the graph paper generator private?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Every grid is generated entirely in your browser with client-side JavaScript. Nothing is uploaded to any server — your designs never leave your device." },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create Printable Graph Paper",
  step: [
    { "@type": "HowToStep", position: 1, text: "Choose a grid type — square, dot, isometric, hexagonal, polar, and more." },
    { "@type": "HowToStep", position: 2, text: "Select a paper size (A4, Letter, custom, etc.) and orientation." },
    { "@type": "HowToStep", position: 3, text: "Adjust grid spacing, margin, line width, and line/background colours. The preview updates live." },
    { "@type": "HowToStep", position: 4, text: "Click Print / Save as PDF to open the print dialog with the correct page size, then choose Save as PDF." },
    { "@type": "HowToStep", position: 5, text: "Optionally download the design as a scalable SVG or a 300 DPI PNG." },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Printable Graph Paper Maker — Free Grid, Dot & Isometric Paper PDF",
  description: "Generate and print custom graph paper in your browser: square, dot, isometric, hexagonal, polar, semi-log, music, and Cornell layouts. Custom sizes, spacing, and colours. Export PDF, SVG, or PNG.",
  author: { "@type": "Organization", name: "ShuttleLab" },
  publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  url: "https://print.shuttlelab.org/tools/graph-paper-maker/",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://print.shuttlelab.org/" },
    { "@type": "ListItem", position: 2, name: "Graph Paper Maker", item: "https://print.shuttlelab.org/tools/graph-paper-maker/" },
  ],
};

export default async function GraphPaperMakerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    return <ToolThinPage slug="graph-paper-maker" />;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <h1>Printable Graph Paper Maker — Free Grid, Dot &amp; Isometric Paper</h1>
        <p className="lead">
          Generate and print custom graph paper directly in your browser. Choose from a dozen grid types — square, dot, isometric, hexagonal, polar, semi-log, music, and more — set any paper size, spacing, line width, and colour, then export as PDF, SVG, or PNG. Free, privacy-first, no account required.
        </p>

        <GraphPaperTool />

        <h2>A Free Online Graph Paper Generator</h2>
        <p>
          Printable graph paper is one of the most-searched-for printouts on the web — students, engineers, artists, and journalers all need it, and buying a pad rarely gives you the exact spacing or grid style you want. This graph paper maker generates precise, vector-quality grids on demand, entirely in your browser. Unlike PDF-download sites that serve pre-baked files, every grid here is drawn live from your chosen parameters, so the spacing, margins, and colours are exactly what you set.
        </p>

        <h2>Grid Types You Can Generate</h2>
        <ul>
          <li><strong>Square grid</strong> — classic quad-ruled paper for maths, plotting, and general use.</li>
          <li><strong>Dot grid</strong> — the bullet-journal favourite; dots mark intersections without heavy lines.</li>
          <li><strong>Lined / ruled</strong> — horizontal writing lines with an optional left margin rule.</li>
          <li><strong>Graph (multi-weight)</strong> — a light minor grid with heavier major lines every few cells.</li>
          <li><strong>Cross grid</strong> — small plus marks at each intersection, great for minimalist journaling.</li>
          <li><strong>Isometric</strong> — vertical plus 30° lines for 3D sketching, technical drawing, and game maps.</li>
          <li><strong>Triangle</strong> — an equilateral triangle tessellation for tiling and pattern work.</li>
          <li><strong>Hexagonal</strong> — honeycomb paper for organic chemistry, board games, and mapping.</li>
          <li><strong>Polar</strong> — concentric rings and radial spokes for angular and circular plots.</li>
          <li><strong>Semi-log</strong> — a linear axis crossed with logarithmic decades for scientific charts.</li>
          <li><strong>Music staff</strong> — groups of five staff lines for composition and transcription.</li>
          <li><strong>Cornell notes</strong> — a cue column, notes area, and summary band for structured study.</li>
        </ul>

        <h2>How to Make Printable Graph Paper</h2>
        <ol>
          <li><strong>Pick a grid type</strong> from the dropdown — the preview updates instantly.</li>
          <li><strong>Choose paper size and orientation</strong> — A3/A4/A5, B4/B5, Letter, Legal, or a custom size in millimetres.</li>
          <li><strong>Dial in the grid</strong> — spacing, margin, line width, and line/accent/background colours.</li>
          <li><strong>Print or export</strong> — click Print / Save as PDF for vector output at true size, or download SVG (infinitely scalable) or PNG (300 DPI).</li>
        </ol>

        <h2>Why Generate Graph Paper in the Browser?</h2>
        <h3>Exact spacing, every time</h3>
        <p>
          Printed pads come in a handful of fixed spacings. Here you set the spacing in millimetres and see it immediately, so a 4 mm dot grid or a 2 mm engineering grid is one slider away.
        </p>
        <h3>Vector-quality output</h3>
        <p>
          Grids are drawn as SVG, so printing through the browser&apos;s “Save as PDF” yields crisp lines at any scale — no blurry raster edges. Need the source? Download the SVG and edit it in any vector tool.
        </p>
        <h3>Completely private</h3>
        <p>
          The entire generator runs client-side. No sign-up, no upload, no tracking of your designs — the grid is computed and rendered on your own device.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>How do I make printable graph paper online for free?</h3>
        <p>Pick a grid type, choose your paper size and orientation, adjust spacing, line width, and colours, then click Print to save as PDF or download SVG/PNG. No account or installation required.</p>

        <h3>What grid types can I generate?</h3>
        <p>Square, dot, ruled, multi-weight graph, cross, isometric, triangle, hexagonal, polar, semi-log, music staff, and Cornell note paper.</p>

        <h3>Can I set a custom paper size and grid spacing?</h3>
        <p>Yes. Use A3, A4, A5, B4, B5, Letter, Legal, or enter custom millimetre dimensions. Spacing, margins, line width, and colours are all adjustable with a live preview.</p>

        <h3>How do I export graph paper as a PDF?</h3>
        <p>Click Print / Save as PDF — the print dialog opens with the exact paper size and orientation preset. Choose “Save as PDF” for vector output, or download SVG/PNG instead.</p>

        <h3>Is the graph paper generator private?</h3>
        <p>Yes. Every grid is generated in your browser with client-side JavaScript. Nothing is uploaded to any server.</p>

        <h2>Related Tools</h2>
        <ul>
          <li><Link href="/">Print Shuttle Home — Full visual print editor</Link></li>
          <li><Link href="/tools/certificate-maker/">Certificate Maker</Link></li>
          <li><Link href="/tools/label-printing/">Label Printing Templates</Link></li>
          <li><Link href="/tools/name-badge-maker/">Name Badge Maker</Link></li>
          <li><Link href="/about/">About Print Shuttle</Link></li>
        </ul>

        <div className="mt-8">
          <Link href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 no-underline">
            Open the full print editor →
          </Link>
        </div>
      </article>
    </>
  );
}
