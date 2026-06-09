"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, Check, Sun, Moon, Monitor } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme, PALETTES } from "@/components/theme-sync";
import { cn } from "@/lib/utils";

// Combined appearance picker: light/dark/system mode toggle on top,
// accent color palette grid below.
// `direction` controls which way the popover opens — "up" for the
// sidebar footer (default), "down" for the top header.
export function PalettePicker({ direction = "up" }: { direction?: "up" | "down" }) {
  const { mode, setMode, palette, setPalette } = useTheme();
  const locale = useLocale();
  const t = useTranslations("common");
  const lang = locale === "zh" ? "zh" : "en";
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  const modes = [
    { id: "light" as const, icon: Sun, label: t("themeLight") },
    { id: "dark" as const, icon: Moon, label: t("themeDark") },
    { id: "system" as const, icon: Monitor, label: t("themeSystem") },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("appearance")}
        aria-expanded={open}
        aria-haspopup="dialog"
        title={t("appearance")}
        className="flex items-center justify-center size-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
      >
        <Palette className="size-4" />
      </button>
      {open && (
        <div className={cn(
          "absolute z-50 bg-popover border rounded-lg shadow-lg p-2.5 w-max",
          direction === "up" ? "bottom-full mb-2 left-0" : "top-full mt-2 right-0"
        )}>
          {/* Light / Dark / System */}
          <div className="flex items-center gap-1 mb-2.5">
            {modes.map((m) => {
              const Icon = m.icon;
              const active = mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  title={m.label}
                  className={cn(
                    "flex items-center justify-center size-8 rounded-md transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Icon className="size-4" />
                </button>
              );
            })}
          </div>

          <div className="border-t -mx-2.5 mb-2.5" />

          {/* Accent color palette */}
          <div className="grid grid-cols-3 gap-1.5">
            {PALETTES.map((p) => {
              const selected = palette === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPalette(p.id)}
                  title={lang === "zh" ? p.labelZh : p.labelEn}
                  className={cn(
                    "flex flex-col items-center gap-1 p-1.5 rounded-md transition-colors hover:bg-accent/50",
                    selected && "bg-accent/40"
                  )}
                >
                  <span
                    className="relative size-7 rounded-full border border-border/40 flex items-center justify-center"
                    style={{ background: p.swatch }}
                  >
                    {selected && <Check className="size-3.5 text-white drop-shadow" />}
                  </span>
                  <span className="text-[10px] text-muted-foreground leading-none">
                    {lang === "zh" ? p.labelZh : p.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
