# StickerFit Studio

StickerFit Studio is a production-ready sticker sheet layout and profit calculator for small-batch sellers. It helps makers plan mixed-size Cricut and Silhouette sticker sheets, estimate material waste, export production files, and price each sheet with more confidence.

## Features

- Mixed-size sticker sheet packing with bleed, gap, safety margin, and rotation controls.
- Cricut Letter, Cricut A4, Silhouette Letter, and proofing presets.
- Live sheet preview with cuttable-area overlay.
- SVG layout export and CSV cut list export.
- Sheet-level profit calculator for material, ink, labor, packaging, and platform fees.
- Public content pages for sticker pricing and Print Then Cut sizing.
- Privacy, terms, robots, sitemap, and optional AdSense integration.
- Static export build for Vercel and Cloudflare Pages.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e
npm run build
```

Install Playwright browsers once if needed:

```bash
npx playwright install chromium
```

## Environment Variables

Create `.env.local` from `.env.example` for local production-like testing:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-yourpublisherid
NEXT_PUBLIC_ADSENSE_SLOT=your-slot-id
```

The site works without AdSense variables. Ad slots are hidden until both `NEXT_PUBLIC_ADSENSE_CLIENT` and `NEXT_PUBLIC_ADSENSE_SLOT` are provided.

## Deploy

The app is configured with `output: "export"`. Production builds generate a static `out/` folder.

Vercel:

```bash
npm run build
```

Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `out`
- Node version: 20.19+ or 22+

See [DEPLOYMENT.md](./DEPLOYMENT.md) and [CLOUDFLARE_GOOGLE_LAUNCH.md](./CLOUDFLARE_GOOGLE_LAUNCH.md) for the full launch checklist.

## Demo Archive

The earlier demo/case-study version is preserved on the `demo-version` branch.
