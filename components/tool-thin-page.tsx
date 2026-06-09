"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface ToolThinPageProps {
  slug: string;
}

export function ToolThinPage({ slug }: ToolThinPageProps) {
  const t = useTranslations("toolPages");
  const camelSlug = slug
    .split("-")
    .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join("");

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-3">
        {t(`${camelSlug}.title`)}
      </h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        {t(`${camelSlug}.subtitle`)}
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity mb-8"
      >
        {t("openTool")}
      </Link>
      <div>
        <a
          href={`/tools/${slug}/`}
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          {t("fullGuide")}
        </a>
      </div>
    </div>
  );
}
