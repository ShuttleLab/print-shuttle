import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "termsPage" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: {
      canonical: locale === "en" ? "https://print.shuttlelab.org/terms/" : `https://print.shuttlelab.org/${locale}/terms/`,
      languages: { en: "https://print.shuttlelab.org/terms/", zh: "https://print.shuttlelab.org/zh/terms/", "x-default": "https://print.shuttlelab.org/terms/" },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("termsPage");

  const sections = [
    { key: "section1", content: "section1Content" },
    { key: "section2", content: "section2Content" },
    { key: "section3", content: "section3Content" },
    { key: "section4", content: "section4Content" },
    { key: "section5", content: "section5Content" },
    { key: "section6", content: "section6Content" },
    { key: "section7", content: "section7Content" },
    { key: "section8", content: "section8Content" },
    { key: "section9", content: "section9Content" },
    { key: "section10", content: "section10Content" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
      <p className="text-sm text-muted-foreground mb-8">{t("lastUpdated")}: 2026-06-03</p>
      <p className="text-muted-foreground leading-relaxed mb-8">{t("intro")}</p>
      <div className="space-y-8">
        {sections.map(({ key, content }) => (
          <section key={key}>
            <h2 className="text-xl font-semibold mb-3">{t(key)}</h2>
            <p className="text-muted-foreground leading-relaxed">{t(content)}</p>
          </section>
        ))}
        <section id="refund">
          <h2 className="text-xl font-semibold mb-3">{t("refundTitle")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("refundContent")}</p>
        </section>
      </div>
      <div className="mt-12 pt-8 border-t text-sm text-muted-foreground">{t("footer")}</div>
    </div>
  );
}
