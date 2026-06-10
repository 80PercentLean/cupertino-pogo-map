import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";

test("opens info view when info button is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect info view to be closed
  await expect(
    page.getByRole("heading", { name: "Information" }),
  ).not.toBeVisible();

  await page.getByRole("button", { name: /\bInfo\b/i }).click();

  // Expect info view to be open
  await expect(
    page.getByRole("heading", { name: "Information" }),
  ).toBeVisible();
});

test("closes info view when the close button is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect info view to be closed
  await expect(
    page.getByRole("heading", { name: "Information" }),
  ).not.toBeVisible();

  await page.getByRole("button", { name: /\bInfo\b/i }).click();

  // Expect info view to be open
  await expect(
    page.getByRole("heading", { name: "Information" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Close information view" }).click();

  // Expect info view to be closed again
  await expect(
    page.getByRole("heading", { name: "Information" }),
  ).not.toBeVisible();
});

test("starts app with info view open when start param is set to it", async ({
  page,
}) => {
  await page.goto("/map?start=info", { waitUntil: "networkidle" });

  // Expect info view to be open
  await expect(
    page.getByRole("heading", { name: "Information" }),
  ).toBeVisible();
});
