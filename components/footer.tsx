"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-muted border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link href="/about" className="hover:text-foreground transition-colors">{t("common.about")}</Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">{t("common.terms")}</Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">{t("common.privacyPolicy")}</Link>
            <span className="text-muted-foreground/30">|</span>
            <Link href="/terms#refund" className="hover:text-foreground transition-colors">{t("common.refundPolicy")}</Link>
            <span className="text-muted-foreground/30">|</span>
            <a href="https://github.com/ShuttleLab" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <span className="text-muted-foreground/30">|</span>
            <a href="mailto:support@shuttlelab.org" className="hover:text-foreground transition-colors">{t("common.contact")}</a>
          </div>
          <p className="flex items-center gap-2 flex-wrap justify-center text-xs">
            <a
              href="https://github.com/jingguanzhang/PaperStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {t("common.paperStudioCredit")} {t("common.paperStudioCreditLink")}
            </a>
          </p>
          <p className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-muted-foreground">{t("common.alsoFrom")}:</span>
            <a
              href="https://note.shuttlelab.org"
              target="_blank"
              rel="noopener"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Note Shuttle
            </a>
            <span className="text-muted-foreground text-xs">
              {t("common.notePromoDesc")}
            </span>
            <span className="text-muted-foreground/30">|</span>
            <a
              href="https://status.shuttlelab.org"
              target="_blank"
              rel="noopener"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              Status Shuttle
            </a>
            <span className="text-muted-foreground text-xs">
              {t("common.statusPromoDesc")}
            </span>
          </p>
          <p>&copy; {new Date().getFullYear()} <Link href="/">&nbsp;{t("common.allName")}</Link>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
