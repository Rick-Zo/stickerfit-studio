import { expect, test } from "@playwright/test";

test("planner updates layout metrics and exposes exports", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: /sticker sheet calculator/i })).toBeVisible();
  await expect(page.getByTestId("sheet-preview")).toBeVisible();
  await expect(page.locator(".metric").filter({ hasText: "Placed" })).toBeVisible();

  const quantity = page.locator(".item-card").first().locator(".number-field").filter({ hasText: "Qty" }).locator("input");
  await quantity.fill("6");

  await expect(page.locator(".metric").filter({ hasText: "Placed" })).toContainText("26/26");
  await expect(page.getByRole("button", { name: /export svg/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /cut list csv/i })).toBeVisible();
});

test("public pages use launch-ready business copy", async ({ page }) => {
  await page.goto("/");

  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "Contact" })).toBeVisible();
  await expect(footer.getByRole("link", { name: "Pricing" })).toBeVisible();
  await expect(footer.getByRole("link", { name: "Refund Policy" })).toBeVisible();
  await expect(footer.getByRole("link", { name: "Privacy" })).toBeVisible();
  await expect(footer.getByRole("link", { name: "Terms" })).toBeVisible();
  await expect(footer.getByRole("link", { name: "Sitemap" })).toHaveCount(0);

  await page.goto("/contact/");
  await expect(page.getByRole("heading", { level: 2, name: "Email support" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Billing support" })).toBeVisible();
  await expect(page.getByRole("link", { name: "support@sticker-fit.com" })).toHaveAttribute(
    "href",
    "mailto:support@sticker-fit.com",
  );
  await expect(page.getByText("Public contact details")).toHaveCount(0);
  await expect(page.getByText("mailbox will be added")).toHaveCount(0);

  await page.goto("/privacy/");
  await expect(page.getByRole("link", { name: "support@sticker-fit.com" })).toHaveAttribute(
    "href",
    "mailto:support@sticker-fit.com",
  );
  await expect(page.getByText("mailbox will be added")).toHaveCount(0);

  await page.goto("/pricing/");
  await expect(page.getByRole("heading", { level: 1, name: "StickerFit Studio pricing" })).toBeVisible();
  await expect(page.getByText("Price: 0 USD")).toBeVisible();

  await page.goto("/refund-policy/");
  await expect(page.getByRole("heading", { level: 1, name: "Refund Policy" })).toBeVisible();
  await expect(page.getByText("within 14 days of purchase")).toBeVisible();
});

test("brand assets use production favicon and sharing images", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator('link[rel="icon"][href="/favicon.ico"]')).toHaveCount(1);
  await expect(page.locator('link[rel="icon"][href="/favicon.svg"]')).toHaveCount(1);
  await expect(page.locator('link[rel="apple-touch-icon"][href="/apple-touch-icon.png"]')).toHaveCount(1);
  await expect(page.locator('link[rel="manifest"][href="/manifest.webmanifest"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:image"][content="https://sticker-fit.com/og-image.png"]')).toHaveCount(1);
  await expect(page.locator('meta[name="twitter:image"][content="https://sticker-fit.com/og-image.png"]')).toHaveCount(1);
});

test("guide library exposes content pages for crawlers and visitors", async ({ page }) => {
  await page.goto("/guides/");

  await expect(page.getByRole("heading", { level: 1, name: /plan cleaner sticker sheets/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "How Many Stickers Fit on a Sheet?" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sticker Paper Cost per Sheet" })).toBeVisible();

  await page.goto("/guides/how-many-stickers-fit-on-a-sheet/");
  await expect(page.getByRole("heading", { level: 1, name: /how many stickers fit on a sheet/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /open the sticker sheet calculator/i })).toBeVisible();

  const sitemap = await page.request.get("/sitemap.xml");
  await expect(sitemap).toBeOK();
  const sitemapText = await sitemap.text();
  await expect(sitemapText).toContain("/guides/how-many-stickers-fit-on-a-sheet/");
  await expect(sitemapText).toContain("/pricing/");
  await expect(sitemapText).toContain("/refund-policy/");
});
