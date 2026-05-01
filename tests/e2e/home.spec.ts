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
