# StickerFit Studio

StickerFit Studio is a niche utility-content web project for Etsy/Cricut sticker sellers. It combines a mixed-size sticker sheet planner, SVG/CSV exports, material waste signals, and a sheet-level profit calculator.

## Product Thesis

Small sticker shops repeatedly need to answer one narrow question: "How many sellable stickers fit inside my print-and-cut area, and is this sheet profitable?" Generic calculators usually handle one sticker size at a time. This project targets the more useful workflow: mixed SKUs, freebies, bleed, gaps, rotation, cuttable-area presets, and marketplace fee assumptions in one browser tool.

Research snapshot, April 30, 2026:

- Etsy reported 5.6 million Etsy marketplace active sellers as of December 31, 2025.
- Cricut's help page documents Print Then Cut size constraints such as Letter 7.44 x 9.94 in and A4 7.2 x 10.62 in.
- Google Publisher Policies require useful publisher content, so the project ships with original guides, privacy/terms pages, sitemap, robots, and labeled ad placements.

Sources:

- https://investors.etsy.com/news-events/press-releases/detail/218/etsy-inc-reports-fourth-quarter-and-full-year-2025-results
- https://help.cricut.com/hc/en-us/articles/360009429814-How-large-can-I-Print-Then-Cut
- https://support.google.com/adsense/answer/1348688?hl=en

## Stack

- Next.js 16 App Router
- React 19 + TypeScript
- CSS modules via global app CSS, no UI framework
- Vitest for core layout/pricing tests
- Playwright for browser smoke tests

## Features

- Mixed-size sticker nesting across Cricut Letter, Cricut A4, Silhouette Letter, and proof presets.
- Bleed, gap, safety margin, and rotation controls.
- Multi-sheet preview with cuttable-area overlay.
- SVG export for visual production reference.
- CSV cut list export with sheet, item, position, dimensions, and rotation.
- Profit panel with material, ink, labor, packaging, fee, break-even, and margin.
- SEO pages for research, sticker profit, and Cricut size intent.
- AdSense-ready environment variables and clearly labeled ad slots.

## Local Development

```bash
cd /Users/rick/Documents/AICode/stickerfit-studio
npm install
npm run dev
```

Open http://localhost:3000.

## Tests

```bash
npm run lint
npm run typecheck
npm run test:unit
```

Optional browser test:

```bash
npx playwright install chromium
npm run test:e2e
```

## AdSense Setup

1. Replace the placeholder values in `.env.example` and create `.env.local`.
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
3. Set `NEXT_PUBLIC_ADSENSE_CLIENT` and `NEXT_PUBLIC_ADSENSE_SLOT` after Google approves the property.
4. Copy `ads.txt.example` to `public/ads.txt` and replace the publisher id with the real id.
5. Before applying, publish more original guides and replace the placeholder privacy contact.

## Deployment

Vercel is the simplest target:

```bash
npm run build
npx vercel
```

For any Node host:

```bash
npm run build
npm run start
```

Recommended production environment:

- Node.js 20.19+ or 22+
- `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
- `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...`
- `NEXT_PUBLIC_ADSENSE_SLOT=...`

## Next Content Ideas

- Sticker paper cost comparison by material.
- Cricut vs Silhouette registration mark guide.
- Etsy sticker pricing examples by niche.
- Free printable sticker sheet template pages.
- Troubleshooting guide for wasted margins and misaligned cuts.
