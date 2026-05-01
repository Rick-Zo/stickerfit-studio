export const siteName = "StickerFit Studio";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ??
  process.env.CF_PAGES_URL ??
  "https://stickerfitstudio.com";

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "support@sticker-fit.com";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
