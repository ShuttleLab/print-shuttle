import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutFaq } from "@/components/AboutFaq";
import { aboutFaqData } from "@/components/AboutFaqData";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const baseUrl = "https://print.shuttlelab.org";
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, l === routing.defaultLocale ? `${baseUrl}/about/` : `${baseUrl}/${l}/about/`])
  );

  return {
    title: locale === "zh" ? "关于 Print Shuttle | 可视化打印排版设计器" : "About Print Shuttle | Visual Print Layout Designer",
    description: t("serviceP1"),
    alternates: {
      canonical: locale === routing.defaultLocale ? `${baseUrl}/about/` : `${baseUrl}/${locale}/about/`,
      languages: { ...languages, "x-default": `${baseUrl}/about/` },
    },
  };
}

const { FAQS, HOWTOS } = aboutFaqData;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q.en,
    acceptedAnswer: { "@type": "Answer", text: item.a.en },
  })),
};

const howToSchemas = HOWTOS.map((ht) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: ht.name.en,
  step: ht.steps.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    text: s.en,
  })),
}));

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {howToSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">
          {locale === "zh" ? "关于 Print Shuttle" : "About Print Shuttle"}
        </h1>
        <AboutFaq />
      </div>
    </>
  );
}
