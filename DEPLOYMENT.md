# Deployment Guide

StickerFit Studio is configured as a static Next.js export. `npm run build` creates an `out/` directory that can be deployed to Vercel, Cloudflare Pages, Netlify, or any static host.

## Preflight

```bash
npm run lint
npm run typecheck
npm run test:unit
npm run build
```

Run the browser smoke test before major releases:

```bash
npx playwright install chromium
npm run test:e2e
```

## Environment

Set these variables in the hosting dashboard:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=support@your-domain.com
```

Optional ad variables:

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-yourpublisherid
NEXT_PUBLIC_ADSENSE_SLOT=your-slot-id
```

If ad variables are missing, ad components return nothing and the public UI remains clean.

## Vercel

1. Import the GitHub repository.
2. Framework preset: Next.js.
3. Build command: `npm run build`.
4. Output directory: `out` if Vercel asks for one; otherwise keep the detected default.
5. Add the environment variables above.
6. Deploy.

## Cloudflare Pages

1. Connect the GitHub repository.
2. Framework preset: Next.js or custom.
3. Build command: `npm run build`.
4. Build output directory: `out`.
5. Node.js version: 20.19+ or 22+.
6. Add the environment variables above.
7. Deploy.

For direct upload through Wrangler:

```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
npm run cf:whoami
npx wrangler pages project create stickerfit-studio --production-branch main
npm run deploy:cloudflare
```

See [CLOUDFLARE_GOOGLE_LAUNCH.md](./CLOUDFLARE_GOOGLE_LAUNCH.md) for the domain, Google Search Console, and post-launch SEO checklist.

## Ads.txt

After a publisher account is approved, create `public/ads.txt` from `ads.txt.example` and replace the publisher id:

```txt
google.com, pub-yourpublisherid, DIRECT, f08c47fec0942fa0
```

## Launch Checklist

- Set the real production domain in `NEXT_PUBLIC_SITE_URL`.
- Configure a working domain mailbox for the public contact address.
- Verify `/privacy/`, `/terms/`, `/sitemap.xml`, and `/robots.txt` after deployment.
- Test the calculator on desktop and mobile.
- Export one SVG and one CSV from the live site.
- Add `public/ads.txt` only after the real publisher id is available.
