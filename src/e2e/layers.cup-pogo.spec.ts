import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";

// TODO: Add this back for Central if it's ever added back
test("toggles Standard Raid Path layer when Standard Raid Path button is used", async ({
  page,
}) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect raid path to be visible
  const path = page.locator(".std-raid-path");
  await expect(path).toBeVisible();

  await page.getByRole("button", { name: /Open Layers/i }).click();

  const layerBtn = page.getByRole("button", { name: "Standard Raid Path" });
  await layerBtn.click();

  // Expect raid path to be turned off
  await expect(path).not.toBeVisible();

  await layerBtn.click();

  // Expect raid path to be turned back on
  await expect(path).toBeVisible();
});
