# Cloudflare and Google Launch Checklist

This project is ready for Cloudflare Pages static deployment. The production build command is `npm run build`, and the generated output directory is `out`.

## Cloudflare Pages Settings

Use these settings if connecting the GitHub repository in the Cloudflare dashboard:

- Project name: `stickerfit-studio`
- Production branch: `main`
- Framework preset: `Next.js` or `None`
- Build command: `npm run build`
- Build output directory: `out`
- Node.js version: `20.19` or newer

Production environment variables:

```bash
NEXT_PUBLIC_SITE_URL=https://YOUR_DOMAIN
NEXT_PUBLIC_CONTACT_EMAIL=hello@YOUR_DOMAIN
```

Optional after AdSense approval:

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT=xxxxxxxxxx
```

## Wrangler Direct Deploy

After Cloudflare API credentials are available:

```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
npm run cf:whoami
npx wrangler pages project create stickerfit-studio --production-branch main
npm run deploy:cloudflare
```

Wrangler uses `wrangler.jsonc`, which points Pages to the static `out` folder.

## Domain Setup

In Cloudflare:

1. Buy or add the production domain.
2. Create or connect a Pages project.
3. Add the custom domain to the Pages project.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain.
5. Redeploy after setting the environment variables.
6. Open these URLs and confirm they return 200:
   - `https://YOUR_DOMAIN/`
   - `https://YOUR_DOMAIN/sitemap.xml`
   - `https://YOUR_DOMAIN/robots.txt`
   - `https://YOUR_DOMAIN/about/`
   - `https://YOUR_DOMAIN/contact/`
   - `https://YOUR_DOMAIN/privacy/`
   - `https://YOUR_DOMAIN/terms/`

## SEO Verification After Deployment

Run the live SEO audit script:

```bash
npm run seo:live -- https://YOUR_DOMAIN/ "sticker sheet calculator"
```

Then verify:

- `robots.txt` allows crawling.
- `sitemap.xml` lists canonical URLs with the final production domain.
- Homepage canonical equals `https://YOUR_DOMAIN/`.
- JSON-LD uses the production domain in `url`, `logo`, and `mainEntityOfPage`.
- Nonexistent pages return a real 404.
- HTTP redirects to HTTPS.
- Optional: `www` redirects consistently to non-www, or the reverse.

## Google Search Console

After the site is live:

1. Add a Domain property for `YOUR_DOMAIN` in Google Search Console.
2. Verify ownership through the DNS TXT record Google provides.
3. Submit this sitemap:

```txt
https://YOUR_DOMAIN/sitemap.xml
```

4. Use URL Inspection on the homepage and request indexing.
5. Inspect `/guides/sticker-sheet-profit-calculator/` and `/guides/cricut-print-then-cut-size-chart/`.
6. Check indexing status again after Google processes the sitemap.

## Before AdSense

- Keep ad environment variables unset until approval.
- Add real `public/ads.txt` only after you have a publisher id.
- Keep About, Contact, Privacy, and Terms pages reachable from the footer.
- Add more original guides before applying if possible.
