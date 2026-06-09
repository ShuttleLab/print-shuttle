"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

export function EditorEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const t = useTranslations("home");
  const locale = useLocale();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the spinner on iframe load OR after a fallback timeout — the heavy
  // editor's `load` event can fire late or be missed on re-navigation.
  useEffect(() => {
    timer.current = setTimeout(() => setLoaded(true), 4000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  // The editor posts whether the user is on its landing (welcome) screen or
  // actively editing. Show the site header on the landing, hide it while
  // editing (the editor then fills the whole viewport). The header itself is
  // hidden via CSS keyed on this attribute (see globals.css).
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || data.source !== "print-shuttle-editor") return;
      setEditing(!!data.editing);
      document.documentElement.setAttribute("data-ps-editing", data.editing ? "true" : "false");
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      document.documentElement.removeAttribute("data-ps-editing");
    };
  }, []);

  const handleLoaded = () => {
    if (timer.current) clearTimeout(timer.current);
    setLoaded(true);
  };

  // Landing: leave room for the header. Editing: header is hidden, fill the viewport.
  const heightClass = editing
    ? "h-dvh"
    : "h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)]";

  return (
    <div className="relative w-full bg-card">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/30">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm">{t("loadingEditor")}</p>
          </div>
        </div>
      )}
      <iframe
        src={`/studio/index.html?lang=${locale}`}
        className={`block w-full ${heightClass} min-h-[560px] border-0`}
        title="Print Shuttle — Visual Print Layout Editor"
        onLoad={handleLoaded}
        allow="clipboard-write"
      />
    </div>
  );
}
