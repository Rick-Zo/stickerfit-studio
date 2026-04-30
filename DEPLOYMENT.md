# Deployment Guide

## Preflight

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
```

Run Playwright when Chromium is installed:

```bash
npx playwright install chromium
npm run test:e2e
```

## Environment Variables

Create these in the hosting dashboard:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-yourpublisherid
NEXT_PUBLIC_ADSENSE_SLOT=your-slot-id
```

Do not enable live ad units until the site is approved. The shipped UI uses labeled placeholders when these variables are absent.

## Vercel

1. Push this folder to a Git repository.
2. Import the repository in Vercel.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output directory: leave default.
6. Add the environment variables above.
7. Deploy.

## Cloudflare Pages

Use Vercel for the first launch if you want the lowest setup friction. If deploying to Cloudflare Pages, add the official Next.js adapter workflow before launch and verify `robots.txt`, `sitemap.xml`, and dynamic metadata in preview.

## AdSense Checklist

- Replace the privacy contact placeholder.
- Add a real logo/favicon and consistent site owner identity.
- Publish at least 8-12 original guide pages around sticker production, pricing, and machine limits.
- Add `public/ads.txt` using the real publisher id from AdSense.
- Keep ad slots clearly labeled and away from interactive controls.
- Verify mobile layout in production before submitting the domain.
