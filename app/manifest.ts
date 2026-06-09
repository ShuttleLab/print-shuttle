import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Print Shuttle | Free Visual Print Layout & Batch Printing Designer",
    short_name: "Print Shuttle",
    description: "Design and print certificates, labels, name badges, and letterhead directly in your browser. Supports Excel data binding for batch printing. 100% private.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ff",
    theme_color: "#7c3aed",
    orientation: "any",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
