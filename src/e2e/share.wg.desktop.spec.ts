import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH, WG_E2E_SERVER } from "./constants";

const POI_ID = "1e1fea3c8b1e40108e5103efa0b1ea9e.16";

test.use({
  permissions: ["clipboard-read", "clipboard-write"],
});

test("copies share URL to clipboard", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Click on "De Anza Bike Route" marker
  await page.getByTestId(POI_ID).click();

  // Wait for popup to appear
  const popup = page.locator(".leaflet-popup");
  await expect(popup).toBeVisible();

  // Click the share button to copy the POI URL to the clipboard
  await page.getByRole("button", { name: /share/i }).click();

  const clipboardText = await page.evaluate(async () => {
    return navigator.clipboard.readText();
  });

  // Test the correct POI URL is in the clipboard
  expect(clipboardText).toBe(`${WG_E2E_SERVER}/map?id=${POI_ID}`);
});
