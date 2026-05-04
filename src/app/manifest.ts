import type { MetadataRoute } from "next";
import { siteName } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "StickerFit",
    description:
      "Free sticker sheet calculator for Cricut, Silhouette, and Etsy sellers. Plan layouts, reduce waste, and estimate profit.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8f5",
    theme_color: "#17211f",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
