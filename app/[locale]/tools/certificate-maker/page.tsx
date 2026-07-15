import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ToolThinPage } from "@/components/tool-thin-page";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "toolPages" });
  return {
    title: t("certificateMaker.title"),
    description: t("certificateMaker.subtitle"),
    alternates: {
      canonical: locale === "en" ? "https://print.shuttlelab.org/tools/certificate-maker/" : `https://print.shuttlelab.org/${locale}/tools/certificate-maker/`,
      languages: { en: "https://print.shuttlelab.org/tools/certificate-maker/", zh: "https://print.shuttlelab.org/zh/tools/certificate-maker/", "x-default": "https://print.shuttlelab.org/tools/certificate-maker/" },
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I make a printable certificate online for free?",
      acceptedAnswer: { "@type": "Answer", text: "Open Print Shuttle in your browser, select the Award Certificate template, customize the text with recipient names and descriptions, add decorative borders and logos, then export as PDF or print directly. No account or software installation required." },
    },
    {
      "@type": "Question",
      name: "Can I batch-print certificates from an Excel spreadsheet?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Print Shuttle supports variable data printing. Import your .xlsx file, bind columns to text fields on the certificate template, and generate hundreds of personalized certificates in one click. Each row in your spreadsheet produces one unique certificate." },
    },
    {
      "@type": "Question",
      name: "What certificate formats can I export?",
      acceptedAnswer: { "@type": "Answer", text: "Print Shuttle exports certificates as vector-quality PDF files via jsPDF, supporting multi-page batch export. You can also use the browser's native print dialog for direct printing with preview support." },
    },
    {
      "@type": "Question",
      name: "Is my certificate data private?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. All certificate design and data processing happens entirely in your browser. No files are uploaded to any server. Print Shuttle uses client-side JavaScript libraries (Fabric.js, SheetJS, jsPDF) for all operations." },
    },
    {
      "@type": "Question",
      name: "Can I add custom logos and signatures to certificates?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Print Shuttle's canvas editor supports image elements that you can drag, resize, and position anywhere on the certificate. Add organization logos, digital signatures, and decorative elements with full layer management." },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create a Printable Certificate with Print Shuttle",
  step: [
    { "@type": "HowToStep", position: 1, text: "Open Print Shuttle and select the Award Certificate template from the welcome modal, or start with a blank A4 canvas." },
    { "@type": "HowToStep", position: 2, text: "Customize the certificate layout by adding text fields for recipient name, date, description, and signatures. Adjust fonts, colors, and sizes." },
    { "@type": "HowToStep", position: 3, text: "Add decorative elements such as borders, logos, and seals using the shape and image tools in the toolbar." },
    { "@type": "HowToStep", position: 4, text: "For batch printing, switch to the Data Source panel, load your Excel (.xlsx) file, and bind columns to text fields." },
    { "@type": "HowToStep", position: 5, text: "Click Export PDF to generate one certificate per row, or use Print for direct browser printing with preview." },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Certificate Maker Online — Free Printable Certificate Designer",
  description: "Design and print professional certificates in your browser. Supports custom text, logos, borders, signatures, and batch generation from Excel data.",
  author: { "@type": "Organization", name: "ShuttleLab" },
  publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
  datePublished: "2026-06-01",
  dateModified: "2026-06-08",
  url: "https://print.shuttlelab.org/tools/certificate-maker/",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://print.shuttlelab.org/" },
    { "@type": "ListItem", position: 2, name: "Certificate Maker", item: "https://print.shuttlelab.org/tools/certificate-maker/" },
  ],
};

export default async function CertificateMakerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    return <ToolThinPage slug="certificate-maker" />;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <h1>Certificate Maker Online — Free Printable Certificate Designer</h1>
        <p className="lead">
          Design and print professional certificates directly in your browser. Print Shuttle is a free, privacy-first certificate maker that supports custom text, logos, borders, signatures, and batch generation from Excel data — no software installation or account required.
        </p>

        <h2>What Is an Online Certificate Maker?</h2>
        <p>
          An online certificate maker is a browser-based tool that lets you design award certificates, completion certificates, achievement certificates, and recognition documents without installing desktop software. Print Shuttle is a free certificate designer that runs entirely in your browser using the Fabric.js canvas engine, giving you a desktop-grade visual editor experience. Unlike cloud-based alternatives that upload your data to remote servers, Print Shuttle processes everything locally — your recipient lists, organization data, and designs never leave your device.
        </p>
        <p>
          Print Shuttle includes a pre-built Award Certificate template with customizable borders, text fields, and layout options. You can add organization logos, digital signatures, seal graphics, and decorative elements using the drag-and-drop canvas editor. The built-in table editor supports structured layouts for multi-section certificates, and the font selector gives you access to all locally installed fonts on your computer.
        </p>

        <h2>When Do You Need a Certificate Maker?</h2>
        <ul>
          <li><strong>School and university ceremonies</strong> — Generate graduation certificates, academic achievement awards, and course completion certificates for hundreds of students using batch printing from Excel data.</li>
          <li><strong>Corporate training programs</strong> — Create professional training completion certificates with company logos, instructor signatures, and unique certificate numbers for compliance documentation.</li>
          <li><strong>Workshop and event organizers</strong> — Design and print participation certificates, workshop completion awards, and volunteer recognition certificates for conferences, hackathons, and community events.</li>
          <li><strong>Competition and contest awards</strong> — Produce first-place, runner-up, and participation certificates for sports competitions, art contests, science fairs, and talent shows.</li>
          <li><strong>Professional certifications</strong> — Issue industry certification documents with serial numbers, issue dates, and expiration dates that can be tracked and verified.</li>
        </ul>

        <h2>How to Create a Certificate with Print Shuttle</h2>
        <p>Follow these steps to design and print your first certificate:</p>
        <ol>
          <li><strong>Choose a template:</strong> Open Print Shuttle and select the Award Certificate template from the welcome modal. Alternatively, start with a blank A4 canvas and build your layout from scratch.</li>
          <li><strong>Design the layout:</strong> Use the toolbar to add text elements for the recipient name, certificate title, description, date, and signatures. Add decorative borders using the shape tools (rectangles, circles, lines) and insert logos or seal images.</li>
          <li><strong>Customize styling:</strong> Adjust font families (using locally installed fonts), font sizes, colors, and text alignment. Use the layer management panel to control element stacking order.</li>
          <li><strong>Set up batch printing (optional):</strong> Switch to the Data Source panel, load your Excel (.xlsx) file containing recipient data, and bind columns to text fields. Each bound field will automatically populate with data from the corresponding row.</li>
          <li><strong>Export and print:</strong> Click Export PDF to generate a multi-page PDF with one certificate per row in your data source, or use the browser&apos;s native Print dialog for direct printing with preview support.</li>
        </ol>

        <h2>Common Certificate Design Issues (and How Print Shuttle Solves Them)</h2>
        <h3>Batch personalization without mail merge complexity</h3>
        <p>
          Traditional certificate printing requires mail merge in Microsoft Word or complex database connections. Print Shuttle simplifies this: load an Excel file, click to bind columns to text fields, and generate all certificates in one click. No mail merge wizard, no database setup, no template confusion.
        </p>
        <h3>Consistent formatting across hundreds of certificates</h3>
        <p>
          When manually editing certificates, font sizes, spacing, and alignment often drift between documents. Print Shuttle&apos;s template-based approach ensures every certificate uses identical formatting — only the bound data fields change between pages.
        </p>
        <h3>Barcode and QR code integration</h3>
        <p>
          For certificates that need verification (professional certifications, academic credentials), Print Shuttle supports 40 barcode formats including QR Code. Link a QR code to a verification URL or embed a unique certificate ID that can be scanned and validated.
        </p>
        <h3>Privacy and data security</h3>
        <p>
          Uploading student lists, employee data, or recipient information to cloud services raises privacy concerns. Print Shuttle processes everything in your browser — your Excel data, certificate designs, and generated PDFs never touch a server. This is especially important for GDPR compliance and handling sensitive personal information.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>How do I make a printable certificate online for free?</h3>
        <p>Open Print Shuttle in your browser, select the Award Certificate template, customize the text with recipient names and descriptions, add decorative borders and logos, then export as PDF or print directly. No account or software installation required.</p>

        <h3>Can I batch-print certificates from an Excel spreadsheet?</h3>
        <p>Yes. Print Shuttle supports variable data printing. Import your .xlsx file, bind columns to text fields on the certificate template, and generate hundreds of personalized certificates in one click. Each row in your spreadsheet produces one unique certificate.</p>

        <h3>What certificate formats can I export?</h3>
        <p>Print Shuttle exports certificates as vector-quality PDF files via jsPDF, supporting multi-page batch export. You can also use the browser&apos;s native print dialog for direct printing with preview support.</p>

        <h3>Is my certificate data private?</h3>
        <p>Yes. All certificate design and data processing happens entirely in your browser. No files are uploaded to any server. Print Shuttle uses client-side JavaScript libraries (Fabric.js, SheetJS, jsPDF) for all operations.</p>

        <h3>Can I add custom logos and signatures to certificates?</h3>
        <p>Yes. Print Shuttle&apos;s canvas editor supports image elements that you can drag, resize, and position anywhere on the certificate. Add organization logos, digital signatures, and decorative elements with full layer management.</p>

        <h2>Related Tools</h2>
        <ul>
          <li><Link href="/">Print Shuttle Home — Full visual editor</Link></li>
          <li><Link href="/tools/label-printing/">Label Printing Templates</Link></li>
          <li><Link href="/tools/name-badge-maker/">Name Badge Maker</Link></li>
          <li><Link href="/tools/graph-paper-maker/">Graph Paper Maker</Link></li>
          <li><Link href="/about/">About Print Shuttle</Link></li>
        </ul>

        <div className="mt-8">
          <Link href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 no-underline">
            Open the Certificate Editor →
          </Link>
        </div>
      </article>
    </>
  );
}
