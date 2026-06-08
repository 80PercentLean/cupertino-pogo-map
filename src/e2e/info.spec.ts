import { expect, test } from "@playwright/test";

test("opens info view when info button is used", async ({ page }) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", { name: "Information" }),
  ).not.toBeVisible();

  await page.getByRole("button", { name: /\bInfo\b/i }).click();

  await expect(
    page.getByRole("heading", { name: "Information" }),
  ).toBeVisible();
});

test("starts app with info view open when start param is set to it", async ({
  page,
}) => {
  await page.goto("/map?start=info", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", { name: "Information" }),
  ).toBeVisible();
});
