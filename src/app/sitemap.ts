import type { MetadataRoute } from "next";
import { guides, guidePath } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  "/",
  "/guides/",
  ...guides.map((guide) => guidePath(guide.slug)),
  "/about/",
  "/contact/",
  "/pricing/",
  "/refund-policy/",
  "/privacy/",
  "/terms/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date("2026-05-02"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
