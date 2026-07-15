"use client";

import { useTranslations } from "next-intl";
import { EditorEmbed } from "@/components/editor-embed";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Layers, FileSpreadsheet, QrCode, FileDown, LayoutTemplate, Shield, MousePointerClick, Import, Printer, Grid3x3, Award, Tag, IdCard, ArrowRight } from "lucide-react";

export function HomeContent() {
  const t = useTranslations("home");

  const features = [
    { icon: Layers, title: t("feature1Title"), desc: t("feature1Desc") },
    { icon: FileSpreadsheet, title: t("feature2Title"), desc: t("feature2Desc") },
    { icon: QrCode, title: t("feature3Title"), desc: t("feature3Desc") },
    { icon: FileDown, title: t("feature4Title"), desc: t("feature4Desc") },
    { icon: LayoutTemplate, title: t("feature5Title"), desc: t("feature5Desc") },
    { icon: Shield, title: t("feature6Title"), desc: t("feature6Desc") },
  ];

  const steps = [
    { icon: LayoutTemplate, title: t("step1Title"), desc: t("step1Desc") },
    { icon: MousePointerClick, title: t("step2Title"), desc: t("step2Desc") },
    { icon: Import, title: t("step3Title"), desc: t("step3Desc") },
    { icon: Printer, title: t("step4Title"), desc: t("step4Desc") },
  ];

  const tools = [
    { icon: Grid3x3, href: "/tools/graph-paper-maker/", title: t("toolGraphPaper"), desc: t("toolGraphPaperDesc") },
    { icon: Award, href: "/tools/certificate-maker/", title: t("toolCertificate"), desc: t("toolCertificateDesc") },
    { icon: Tag, href: "/tools/label-printing/", title: t("toolLabel"), desc: t("toolLabelDesc") },
    { icon: IdCard, href: "/tools/name-badge-maker/", title: t("toolNameBadge"), desc: t("toolNameBadgeDesc") },
  ];

  return (
    <div className="w-full">
      {/* H1 kept for SEO/screen readers; the editor itself carries the visible brand */}
      <h1 className="sr-only">{t("title")}</h1>
      {/* Editor fills the viewport directly under the header — open and use, no card chrome */}
      <section id="editor" className="w-full border-b border-border">
        <EditorEmbed />
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">{t("featuresHeading")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{f.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">{t("howItWorks")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  </div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why section (SEO content) */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t("whyTitle")}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>{t("whyP1")}</p>
            <p>{t("whyP2")}</p>
          </div>
          <div className="mt-8 flex items-center gap-2 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <Shield className="size-5 text-primary flex-shrink-0" />
            <p className="text-sm font-medium">{t("privacyBadge")}</p>
          </div>
        </div>
      </section>

      {/* More tools */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">{t("moreToolsHeading")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
