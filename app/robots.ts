import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api", "/admin", "/dashboard", "/login"] }],
    sitemap: "https://print.shuttlelab.org/sitemap.xml",
  };
}
