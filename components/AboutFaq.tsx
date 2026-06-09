"use client";

import { useLocale } from "next-intl";
import { Users, Lightbulb, BookOpen, BarChart3, HelpCircle, FileText, Award, Package, GraduationCap } from "lucide-react";
import { aboutFaqData } from "@/components/AboutFaqData";

// Per-persona icon + colour, in the same order as WHO_FOR.
const WHO_META = [
  { Icon: FileText, title: { en: "Office & Admin", zh: "办公与行政" }, tint: "bg-primary/10 text-primary", card: "border-primary/15 bg-primary/[0.04]" },
  { Icon: Award, title: { en: "Event Organizers", zh: "活动组织者" }, tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", card: "border-emerald-500/15 bg-emerald-500/[0.05]" },
  { Icon: Package, title: { en: "Warehouse & Logistics", zh: "仓储与物流" }, tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400", card: "border-amber-500/15 bg-amber-500/[0.05]" },
  { Icon: GraduationCap, title: { en: "Educators", zh: "教育工作者" }, tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400", card: "border-sky-500/15 bg-sky-500/[0.05]" },
] as const;

export function AboutFaq() {
  const locale = useLocale();
  const lang = locale === "zh" ? "zh" : "en";
  const { WHO_FOR, WHEN_USE, HOWTOS, COMPARISON, FAQS, HEADINGS } = aboutFaqData;

  return (
    <div className="space-y-12">
      {/* Who For */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Users className="size-6 text-primary" />
          {HEADINGS.whoFor[lang]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WHO_FOR.map((p, i) => {
            const meta = WHO_META[i % WHO_META.length];
            const Icon = meta.Icon;
            return (
              <div key={i} className={`rounded-xl border p-5 ${meta.card}`}>
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 size-11 rounded-xl flex items-center justify-center ${meta.tint}`}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{meta.title[lang]}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p[lang]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* When Use */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Lightbulb className="size-6 text-primary" />
          {HEADINGS.whenUse[lang]}
        </h2>
        <ul className="space-y-3">
          {WHEN_USE.map((u, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
              <span className="mt-1.5 size-1.5 rounded-full bg-primary flex-shrink-0" />
              {u[lang]}
            </li>
          ))}
        </ul>
      </section>

      {/* How To */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="size-6 text-primary" />
          {HEADINGS.howTo[lang]}
        </h2>
        <div className="space-y-8">
          {HOWTOS.map((ht, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold mb-3">{ht.name[lang]}</h3>
              <ol className="space-y-2">
                {ht.steps.map((s, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="flex-shrink-0 size-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{j + 1}</span>
                    {s[lang]}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="size-6 text-primary" />
          {COMPARISON[lang].heading}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                {COMPARISON[lang].columns.map((col, i) => (
                  <th key={i} className="py-3 px-4 text-left font-semibold whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON[lang].rows.map((row, i) => (
                <tr key={i} className="border-b last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className={`py-3 px-4 ${j === 0 ? "font-medium" : "text-muted-foreground"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Pricing as of 2026-06.</p>
      </section>

      {/* FAQs */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <HelpCircle className="size-6 text-primary" />
          {HEADINGS.faqs[lang]}
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="group border rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-medium text-sm hover:bg-muted/50 transition-colors">
                {faq.q[lang]}
                <span className="ml-2 text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                {faq.a[lang]}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
