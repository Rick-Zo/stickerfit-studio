import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  "/",
  "/guides/sticker-sheet-profit-calculator/",
  "/guides/cricut-print-then-cut-size-chart/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-04-30"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
