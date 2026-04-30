import type { MetadataRoute } from "next";

const routes = [
  "",
  "/research",
  "/guides/sticker-sheet-profit-calculator",
  "/guides/cricut-print-then-cut-size-chart",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stickerfit.example.com";

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-04-30"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
