import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ToolThinPage } from "@/components/tool-thin-page";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "toolPages" });
  return {
    title: t("nameBadgeMaker.title"),
    description: t("nameBadgeMaker.subtitle"),
    alternates: {
      canonical: locale === "en" ? "https://print.shuttlelab.org/tools/name-badge-maker/" : `https://print.shuttlelab.org/${locale}/tools/name-badge-maker/`,
      languages: { en: "https://print.shuttlelab.org/tools/name-badge-maker/", zh: "https://print.shuttlelab.org/zh/tools/name-badge-maker/", "x-default": "https://print.shuttlelab.org/tools/name-badge-maker/" },
    },
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I make name badges for an event?",
      acceptedAnswer: { "@type": "Answer", text: "Open Print Shuttle, create a blank canvas sized to your badge dimensions (e.g., 100x70mm for standard event badges), add text fields for name, title, and organization, insert your event logo, and print. For batch badges, import an attendee Excel file and bind columns to fields." },
    },
    {
      "@type": "Question",
      name: "Can I batch-print name badges from an attendee list?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Import your attendee .xlsx file into Print Shuttle's Data Source panel, bind columns for name, title, organization, and photo to canvas elements, and generate all badges in one click. Each row produces one personalized badge." },
    },
    {
      "@type": "Question",
      name: "Can I add QR codes to name badges?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Print Shuttle supports 40 barcode formats including QR Code. Add a QR code to each badge linked to the attendee's profile URL, contact information, or a unique check-in code. The QR content can be dynamically bound to Excel data." },
    },
    {
      "@type": "Question",
      name: "What badge sizes are supported?",
      acceptedAnswer: { "@type": "Answer", text: "Print Shuttle supports any paper size including standard badge formats. Use custom dimensions to match your badge holder sizes (e.g., 100x70mm, 86x54mm credit card size, or 4x3 inches). You can also use the split mode to print multiple badges per page." },
    },
    {
      "@type": "Question",
      name: "Can I include employee photos on badges?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. Print Shuttle's canvas editor supports image elements. When batch-printing from Excel, you can bind an image column (containing file paths or embedded images) to an image element on the badge. This enables mass production of photo ID badges." },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create Name Badges with Print Shuttle",
  step: [
    { "@type": "HowToStep", position: 1, text: "Open Print Shuttle and start a new project. Set custom paper dimensions to match your badge size (e.g., 100x70mm for event badges)." },
    { "@type": "HowToStep", position: 2, text: "Design the badge layout: add text fields for name, title, and organization. Insert your event or company logo as an image element." },
    { "@type": "HowToStep", position: 3, text: "Optionally add a QR Code or barcode for check-in, contact sharing, or identification. Configure barcode type and size." },
    { "@type": "HowToStep", position: 4, text: "For batch badges, load your attendee Excel (.xlsx) file and bind columns to text, image, and barcode fields." },
    { "@type": "HowToStep", position: 5, text: "Export as PDF for professional printing or use the browser print dialog. Cut and insert into badge holders." },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Name Badge Maker — Free Printable ID Badge Designer",
  description: "Design and print name badges, ID cards, and event badges in your browser. Import Excel data to batch-generate badges with photos and barcodes.",
  author: { "@type": "Organization", name: "ShuttleLab" },
  publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
  datePublished: "2026-06-01",
  dateModified: "2026-06-08",
  url: "https://print.shuttlelab.org/tools/name-badge-maker/",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://print.shuttlelab.org/" },
    { "@type": "ListItem", position: 2, name: "Name Badge Maker", item: "https://print.shuttlelab.org/tools/name-badge-maker/" },
  ],
};

export default async function NameBadgeMakerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === "zh") {
    return <ToolThinPage slug="name-badge-maker" />;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 prose prose-slate dark:prose-invert">
        <h1>Name Badge Maker — Free Printable ID Badge Designer</h1>
        <p className="lead">
          Design and print professional name badges, ID cards, and event badges directly in your browser. Print Shuttle is a free badge maker supporting Excel batch printing with photos and QR codes — no software installation or account required.
        </p>

        <h2>What Is a Name Badge Maker?</h2>
        <p>
          A name badge maker is a tool for designing and printing identification badges for employees, event attendees, students, and visitors. Print Shuttle is a free browser-based badge designer built on the Fabric.js canvas engine that gives you full control over badge layout, fonts, colors, images, and barcodes. Unlike online badge generators that charge per badge or require subscriptions, Print Shuttle is completely free with unlimited badge generation.
        </p>
        <p>
          Print Shuttle&apos;s key differentiator is its variable data printing capability. Import an attendee list or employee database as an Excel (.xlsx) file, bind columns to badge fields (name, title, organization, photo, barcode), and generate hundreds of unique badges in one click. This makes it the ideal tool for conferences, corporate events, schools, and any situation requiring batch badge production.
        </p>

        <h2>When Do You Need a Name Badge Maker?</h2>
        <ul>
          <li><strong>Conferences and trade shows</strong> — Generate attendee badges with names, companies, job titles, and QR codes for check-in and networking. Batch-print from your registration spreadsheet.</li>
          <li><strong>Corporate employee IDs</strong> — Create professional employee ID badges with photos, department names, employee numbers, and barcodes for access control systems.</li>
          <li><strong>School and university events</strong> — Print student, speaker, and volunteer badges for school events, graduation ceremonies, and academic conferences.</li>
          <li><strong>Visitor management</strong> — Produce temporary visitor badges with name, host, visit date, and access level for building security.</li>
          <li><strong>Workshop and training badges</strong> — Design participant badges for workshops, hackathons, training sessions, and meetups with event branding.</li>
        </ul>

        <h2>How to Create Name Badges with Print Shuttle</h2>
        <ol>
          <li><strong>Set badge dimensions:</strong> Open Print Shuttle and create a new project with custom dimensions matching your badge holders (e.g., 100×70mm for standard event badges, 86×54mm for credit-card-size badges).</li>
          <li><strong>Design the badge:</strong> Add text elements for the attendee name, title, and organization. Insert your event or company logo using the image tool. Customize fonts, colors, and layout.</li>
          <li><strong>Add identification elements:</strong> Optionally add a QR Code for event check-in, vCard sharing, or access control. Add barcodes for badge numbering or identification systems.</li>
          <li><strong>Set up batch printing:</strong> Load your attendee list (.xlsx) in the Data Source panel. Bind columns to name, title, organization, photo, and barcode fields. Each row generates one unique badge.</li>
          <li><strong>Print and assemble:</strong> Export as PDF for professional printing or use the browser&apos;s native print dialog. Cut badges and insert into badge holders, lanyards, or clip-on badge reels.</li>
        </ol>

        <h2>Common Name Badge Challenges</h2>
        <h3>Batch production from attendee spreadsheets</h3>
        <p>
          Event organizers typically have attendee data in Excel or Google Sheets. Print Shuttle loads .xlsx files directly and binds spreadsheet columns to badge fields — no manual data entry, no copy-paste errors, no mail merge complexity. One click generates all badges.
        </p>
        <h3>Photo ID integration</h3>
        <p>
          Employee and student ID badges often require photos. Print Shuttle supports image elements that can be bound to data fields containing photo references, enabling mass production of photo ID badges without manual image placement.
        </p>
        <h3>QR codes for digital check-in</h3>
        <p>
          Modern events use QR codes for contactless check-in, digital business cards (vCard), and session attendance tracking. Print Shuttle generates QR codes with content dynamically bound to attendee data — each badge gets a unique QR code linked to that attendee&apos;s information.
        </p>
        <h3>Custom badge dimensions</h3>
        <p>
          Badge holders come in many sizes. Print Shuttle&apos;s custom paper dimensions let you match any badge format precisely — from standard event badges (100×70mm) to credit-card-size IDs (86×54mm) to oversized conference badges (130×100mm).
        </p>
        <h3>Privacy for attendee data</h3>
        <p>
          Attendee lists contain personal information (names, emails, organizations). Cloud-based badge tools upload this data to their servers. Print Shuttle processes everything in your browser — your attendee data never leaves your device, ensuring GDPR compliance and data privacy.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>How do I make name badges for an event?</h3>
        <p>Open Print Shuttle, create a blank canvas sized to your badge dimensions (e.g., 100x70mm for standard event badges), add text fields for name, title, and organization, insert your event logo, and print. For batch badges, import an attendee Excel file and bind columns to fields.</p>

        <h3>Can I batch-print name badges from an attendee list?</h3>
        <p>Yes. Import your attendee .xlsx file into Print Shuttle&apos;s Data Source panel, bind columns for name, title, organization, and photo to canvas elements, and generate all badges in one click. Each row produces one personalized badge.</p>

        <h3>Can I add QR codes to name badges?</h3>
        <p>Yes. Print Shuttle supports 40 barcode formats including QR Code. Add a QR code to each badge linked to the attendee&apos;s profile URL, contact information, or a unique check-in code. The QR content can be dynamically bound to Excel data.</p>

        <h3>What badge sizes are supported?</h3>
        <p>Print Shuttle supports any paper size including standard badge formats. Use custom dimensions to match your badge holder sizes (e.g., 100x70mm, 86x54mm credit card size, or 4x3 inches). You can also use the split mode to print multiple badges per page.</p>

        <h3>Can I include employee photos on badges?</h3>
        <p>Yes. Print Shuttle&apos;s canvas editor supports image elements. When batch-printing from Excel, you can bind an image column to an image element on the badge. This enables mass production of photo ID badges.</p>

        <h2>Related Tools</h2>
        <ul>
          <li><Link href="/">Print Shuttle Home — Full visual editor</Link></li>
          <li><Link href="/tools/certificate-maker/">Certificate Maker</Link></li>
          <li><Link href="/tools/label-printing/">Label Printing Templates</Link></li>
          <li><Link href="/tools/graph-paper-maker/">Graph Paper Maker</Link></li>
          <li><Link href="/about/">About Print Shuttle</Link></li>
        </ul>

        <div className="mt-8">
          <Link href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 no-underline">
            Open the Badge Editor →
          </Link>
        </div>
      </article>
    </>
  );
}
