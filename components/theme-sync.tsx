"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "system" | "light" | "dark";
export type PaletteId = "default" | "sakura" | "mint" | "ocean" | "sunset" | "graphite";

// Picker metadata. `swatch` is a fixed representative color so the dots
// render consistently regardless of the current light/dark mode.
export const PALETTES: { id: PaletteId; labelZh: string; labelEn: string; swatch: string }[] = [
  { id: "default", labelZh: "经典紫", labelEn: "Classic", swatch: "oklch(0.48 0.22 264)" },
  { id: "sakura", labelZh: "樱花粉", labelEn: "Sakura", swatch: "oklch(0.6 0.19 350)" },
  { id: "mint", labelZh: "薄荷绿", labelEn: "Mint", swatch: "oklch(0.6 0.13 165)" },
  { id: "ocean", labelZh: "海洋蓝", labelEn: "Ocean", swatch: "oklch(0.55 0.16 230)" },
  { id: "sunset", labelZh: "暖阳橙", labelEn: "Sunset", swatch: "oklch(0.66 0.15 55)" },
  { id: "graphite", labelZh: "石墨灰", labelEn: "Graphite", swatch: "oklch(0.5 0.015 264)" },
];

const VALID_PALETTES = new Set<string>(PALETTES.map((p) => p.id));

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  cycle: () => void;
  isDark: boolean;
  palette: PaletteId;
  setPalette: (palette: PaletteId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const [isDark, setIsDark] = useState(false);
  const [palette, setPaletteState] = useState<PaletteId>("default");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read localStorage after mount to avoid SSR mismatch
      setModeState(stored);
    }
    const storedPalette = localStorage.getItem("palette");
    if (storedPalette && VALID_PALETTES.has(storedPalette)) {
      setPaletteState(storedPalette as PaletteId);
    }
  }, []);

  // Reflect palette onto <html data-palette>. Default uses no attribute
  // so the base :root / .dark purple tokens apply unchanged.
  useEffect(() => {
    if (palette === "default") {
      document.documentElement.removeAttribute("data-palette");
    } else {
      document.documentElement.setAttribute("data-palette", palette);
    }
  }, [palette]);

  useEffect(() => {
    const apply = () => {
      let dark: boolean;
      if (mode === "dark") dark = true;
      else if (mode === "light") dark = false;
      else dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      document.documentElement.classList.toggle("dark", dark);
      setIsDark(dark);
    };

    apply();

    if (mode === "system") {
      const m = window.matchMedia("(prefers-color-scheme: dark)");
      m.addEventListener("change", apply);
      return () => m.removeEventListener("change", apply);
    }
  }, [mode]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    if (m === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", m);
  }, []);

  const cycle = useCallback(() => {
    setMode(mode === "system" ? "light" : mode === "light" ? "dark" : "system");
  }, [mode, setMode]);

  const setPalette = useCallback((p: PaletteId) => {
    setPaletteState(p);
    if (p === "default") localStorage.removeItem("palette");
    else localStorage.setItem("palette", p);
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, cycle, isDark, palette, setPalette }),
    [mode, setMode, cycle, isDark, palette, setPalette],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
