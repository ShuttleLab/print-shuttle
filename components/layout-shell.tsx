"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  // The marketing header (logo + nav + palette + language toggle) shows on every
  // page, including the editor homepage — it's where users reach the language
  // switch and About. When the user wants an immersive editing surface, the
  // editor's own Fullscreen button (browser Fullscreen API) hides all chrome.
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
