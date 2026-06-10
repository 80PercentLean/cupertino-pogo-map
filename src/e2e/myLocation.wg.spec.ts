import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { waitForMapTilesToLoad } from "./util";

test.use({
  geolocation: { latitude: 37.34353687732166, longitude: -121.97424083948138 },
  permissions: ["geolocation"],
});

test("shows my location", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Check that my location marker doesn't exist yet
  await expect(page.getByTestId("my-location")).not.toBeVisible();

  // Click my location button to create my location marker
  await page.getByTestId("btn-my-location-icon").click();

  // Check that my location marker is visible
  await expect(page.getByTestId("my-location")).toBeVisible();

  await waitForMapTilesToLoad(page);

  // Screenshot the my location marker
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
});

// TODO: This test only works on Firefox.
// There seems to be an issues with moving to the end position.
// test("shows change in my location", async ({ page, context }) => {
//   await page.goto('/map', { waitUntil: "networkidle" });

//   // Check that my location marker doesn't exist yet
//   await expect(page.getByTestId("my-location")).not.toBeVisible();

//   // Click my location button to create my location marker
//   await page.getByTestId("btn-my-location-icon").click();

//   // Check that my location marker is visible
//   await expect(page.getByTestId("my-location")).toBeVisible();

//   // Screenshot start position
//   await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });

//   // Move to end position
//   await context.setGeolocation({
//     latitude: 37.32249150026804,
//     longitude: -122.04521477222444,
//   });

//   // // Check that my location marker is still visible
//   await expect(page.getByTestId("my-location")).toBeVisible();

//   // Screenshot end position
//   await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
// });
