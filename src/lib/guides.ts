import { absoluteUrl, siteName } from "@/lib/site";

export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  summary: string;
  datePublished: string;
  dateModified: string;
};

export const guides: GuideMeta[] = [
  {
    slug: "sticker-sheet-profit-calculator",
    title: "Sticker Sheet Profit Calculator Guide",
    description:
      "Use this sticker sheet profit calculator guide to price handmade sticker sheets with material, ink, labor, packaging, and marketplace fees.",
    category: "Pricing guide",
    summary: "Build a per-sheet pricing model before deciding whether a sticker listing is worth printing.",
    datePublished: "2026-04-30",
    dateModified: "2026-05-02",
  },
  {
    slug: "cricut-print-then-cut-size-chart",
    title: "Cricut Print Then Cut Size Chart",
    description:
      "Check Cricut Print Then Cut size limits for sticker sheets, including Letter and A4 planning presets, bleed, gaps, and rotation tips.",
    category: "Size guide",
    summary: "Use working-area presets instead of full paper size when planning Cricut sticker sheets.",
    datePublished: "2026-04-30",
    dateModified: "2026-05-02",
  },
  {
    slug: "how-many-stickers-fit-on-a-sheet",
    title: "How Many Stickers Fit on a Sheet?",
    description:
      "Estimate how many stickers fit on one sheet by accounting for finished size, bleed, gaps, safety margins, rotation, and mixed sticker shapes.",
    category: "Layout guide",
    summary: "A practical way to estimate sticker yield before opening your cutting software.",
    datePublished: "2026-05-02",
    dateModified: "2026-05-02",
  },
  {
    slug: "sticker-paper-cost-per-sheet",
    title: "Sticker Paper Cost per Sheet",
    description:
      "Calculate sticker paper cost per sheet, including paper, ink, laminate, test prints, failed cuts, packaging, and realistic waste buffers.",
    category: "Cost guide",
    summary: "Turn supply costs into a realistic per-sheet number for handmade sticker pricing.",
    datePublished: "2026-05-02",
    dateModified: "2026-05-02",
  },
  {
    slug: "sticker-bleed-and-gap-guide",
    title: "Sticker Bleed and Gap Guide",
    description:
      "Learn how sticker bleed, gap, and safety margin settings affect Print Then Cut layouts, sheet yield, and production reliability.",
    category: "Production guide",
    summary: "Choose bleed and gap values that balance cleaner cuts with efficient sheet usage.",
    datePublished: "2026-05-02",
    dateModified: "2026-05-02",
  },
  {
    slug: "etsy-sticker-pricing-fees",
    title: "Etsy Sticker Pricing and Fee Planning",
    description:
      "Plan Etsy sticker pricing with sheet cost, packaging, labor, platform fees, shipping materials, and margin buffers before publishing a listing.",
    category: "Marketplace guide",
    summary: "Price sticker listings from production reality instead of guessing from competitor prices.",
    datePublished: "2026-05-02",
    dateModified: "2026-05-02",
  },
  {
    slug: "sticker-shop-production-workflow",
    title: "Sticker Shop Production Workflow",
    description:
      "A repeatable sticker shop workflow for turning design ideas into sheet layouts, exports, cutting notes, quality checks, and packed orders.",
    category: "Workflow guide",
    summary: "Move from design idea to repeatable production notes without losing margin to rework.",
    datePublished: "2026-05-02",
    dateModified: "2026-05-02",
  },
  {
    slug: "common-sticker-sizes-for-cricut",
    title: "Common Sticker Sizes for Cricut Sheets",
    description:
      "Compare common sticker sizes for Cricut sticker sheets, including round stickers, labels, freebies, samplers, and packaging stickers.",
    category: "Size guide",
    summary: "Pick sticker dimensions that fit both the customer experience and the production sheet.",
    datePublished: "2026-05-02",
    dateModified: "2026-05-02",
  },
];

export function guidePath(slug: string) {
  return `/guides/${slug}/`;
}

export function getGuide(slug: string) {
  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    throw new Error(`Guide not found: ${slug}`);
  }

  return guide;
}

export function articleSchema(guide: GuideMeta) {
  const path = guidePath(guide.slug);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    author: {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.svg"),
      },
    },
    image: absoluteUrl("/og-image.svg"),
    mainEntityOfPage: absoluteUrl(path),
  };
}
