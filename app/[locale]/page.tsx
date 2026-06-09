import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeContent } from "@/components/home-content";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: locale === "en" ? "https://print.shuttlelab.org/" : `https://print.shuttlelab.org/${locale}/`,
      languages: { en: "https://print.shuttlelab.org/", zh: "https://print.shuttlelab.org/zh/", "x-default": "https://print.shuttlelab.org/" },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}
