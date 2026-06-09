"use client";

import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { PalettePicker } from "@/components/palette-picker";
import { Link, usePathname } from "@/i18n/navigation";

const GITHUB_URL = "https://github.com/ShuttleLab";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  const toggleLocale = () => {
    // Static export has no middleware: next-intl's router.replace would
    // prefix the default locale (/en/...) which doesn't exist in the build.
    // Compute the target manually. usePathname() already strips the locale.
    //
    // English lives at the web root (/) in PRODUCTION because postbuild promotes
    // out/en/* -> out/. But `next dev` does NOT run postbuild, so in dev English
    // is served at /en/. Branch on NODE_ENV so the toggle works in both: without
    // this, switching to English in dev lands on "/" and 404s.
    const nextLocale = locale === "zh" ? "en" : "zh";
    const clean = pathname.endsWith("/") ? pathname : `${pathname}/`;
    const isDev = process.env.NODE_ENV === "development";
    if (nextLocale === "en") {
      window.location.href = isDev ? `/en${clean}` : clean;
    } else {
      window.location.href = `/zh${clean === "/" ? "/" : clean}`;
    }
  };

  return (
    <header className="bg-card border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-lg sm:text-xl font-bold text-foreground">
              {t("common.appName")}
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <nav>
              <ul className="flex items-center gap-2 sm:gap-4">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">
                    {t("common.about")}
                  </Link>
                </li>
              </ul>
            </nav>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center justify-center size-8 rounded-md text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground" aria-label="GitHub">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <PalettePicker direction="down" />
            <Button type="button" variant="outline" size="sm" className="text-xs h-8" onClick={toggleLocale} aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}>
              {locale === "zh" ? "中/EN" : "EN/中"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
