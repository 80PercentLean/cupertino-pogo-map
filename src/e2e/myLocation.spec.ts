import { expect, test } from "@playwright/test";

import { DEV_SERVER } from "./constants";

test.use({
  geolocation: { longitude: -122.042908, latitude: 37.325814 },
  permissions: ["geolocation"],
});

test("shows my location", async ({ page }) => {
  await page.goto(DEV_SERVER, { waitUntil: "networkidle" });
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
});

test("shows change in my location", async ({ page, context }) => {
  await page.goto(DEV_SERVER, { waitUntil: "networkidle" });

  // Screenshot start position
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

  // Move to end position
  await context.setGeolocation({
    longitude: -122.04567208886148,
    latitude: 37.32424372942416,
  });

  // Screenshot end position
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
});
