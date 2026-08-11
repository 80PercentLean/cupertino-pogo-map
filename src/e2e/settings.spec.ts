import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { isMobileProject, waitForMapTilesToLoad } from "./util";

test("opens settings view when settings button is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect settings view to be closed
  await expect(
    page.getByRole("heading", { name: /Settings/i }),
  ).not.toBeVisible();

  await page.getByRole("button", { name: /Settings/i }).click();

  // Expect settings view to be open
  await expect(page.getByRole("heading", { name: /Settings/i })).toBeVisible();
});

test("closes settings view when the close button is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect settings view to be closed
  await expect(
    page.getByRole("heading", { name: /Settings/i }),
  ).not.toBeVisible();

  await page.getByRole("button", { name: /Settings/i }).click();

  // Expect settings view to be open
  await expect(page.getByRole("heading", { name: /Settings/i })).toBeVisible();

  await page.getByRole("button", { name: /Close settings view/i }).click();

  // Expect settings view to be closed again
  await expect(
    page.getByRole("heading", { name: /Settings/i }),
  ).not.toBeVisible();
});

test("starts app with settings view open when start param is set to it", async ({
  page,
}) => {
  await page.goto("/map?start=settings", { waitUntil: "networkidle" });

  // Expect settings view to be open
  await expect(page.getByRole("heading", { name: /Settings/i })).toBeVisible();
});

test('toggles simple markers on the map when "Use simple markers" switch is used', async ({
  page,
}) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Turn on simple markers switch
  await page.getByRole("button", { name: /Settings/i }).click();
  await expect(page.getByRole("heading", { name: /Settings/i })).toBeVisible();
  await page.getByRole("switch", { name: /Use simple markers/i }).click();
  await page.getByRole("button", { name: /Close settings view/i }).click();

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot simple markers
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

  // Reveal UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Turn off simple markers switch
  await page.getByRole("button", { name: /Settings/i }).click();
  await expect(page.getByRole("heading", { name: /Settings/i })).toBeVisible();
  await page.getByRole("switch", { name: /Use simple markers/i }).click();
  await page.getByRole("button", { name: /Close settings view/i }).click();

  // Screenshot that normal markers have returned
  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot normal markers
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test('toggles the UI overlay "Hide UI Overlay" button is used', async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const listView = page.getByTestId("list-view");
  const btnLayers = page.getByTestId("btn-layers");
  const viewCtrl = page.getByTestId("view-ctrl-main-bar");
  const btnMyLocation = page.getByRole("button", { name: /Show My Location/i });
  const legend = page.getByTestId("legend");
  const secondaryBar = page.getByTestId("secondary-bar");

  if (IS_MOBILE) {
    // Mobile UI overlay should be visible
    await expect(secondaryBar).toBeVisible();
    await expect(btnLayers).toBeVisible();
    await expect(btnMyLocation).toBeVisible();
    await expect(viewCtrl).toBeVisible();
  } else {
    // UI overlay should be visible
    await expect(listView).toBeVisible();
    await expect(btnLayers).toBeVisible();
    await expect(legend).toBeVisible();
    await expect(viewCtrl).toBeVisible();
    await expect(btnMyLocation).toBeVisible();
  }

  // Click the "Hide UI Overlay" button
  await page.getByRole("button", { name: /Settings/i }).click();
  await expect(page.getByRole("heading", { name: /Settings/i })).toBeVisible();
  await page.getByRole("button", { name: /Click To Hide UI Overlay/i }).click();

  if (IS_MOBILE) {
    // Mobile UI overlay should not be visible
    await expect(secondaryBar).not.toBeVisible();
    await expect(btnLayers).not.toBeVisible();
    await expect(btnMyLocation).not.toBeVisible();
    await expect(viewCtrl).not.toBeVisible();
  } else {
    // UI overlay should be visible
    await expect(listView).not.toBeVisible();
    await expect(btnLayers).not.toBeVisible();
    await expect(legend).not.toBeVisible();
    await expect(viewCtrl).not.toBeVisible();
    await expect(btnMyLocation).not.toBeVisible();
  }

  // Click the "Hide UI Overlay" button again
  await page.getByRole("button", { name: /Click To Show UI Overlay/i }).click();

  if (IS_MOBILE) {
    // Mobile UI overlay should be visible again
    await expect(secondaryBar).toBeVisible();
    await expect(btnLayers).toBeVisible();
    await expect(btnMyLocation).toBeVisible();
    await expect(viewCtrl).toBeVisible();
  } else {
    // UI overlay should be visible again
    await expect(listView).toBeVisible();
    await expect(legend).toBeVisible();
    await expect(viewCtrl).toBeVisible();
    await expect(btnMyLocation).toBeVisible();
  }
});

test('toggles legend when "Turn off legend" switch is used', async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const legend = page.getByTestId("legend");

  if (IS_MOBILE) {
    // Mobile legend button should be visible
    await expect(page.getByRole("button", { name: "Legend" })).toBeVisible();
  } else {
    // Legend should be visible
    await expect(legend).toBeVisible();
  }

  // Turn on "Turn off legend" switch
  await page.getByRole("button", { name: /Settings/i }).click();
  await expect(page.getByRole("heading", { name: /Settings/i })).toBeVisible();
  await page.getByRole("switch", { name: /Turn off legend/i }).click();
  await page.getByRole("button", { name: /Close settings view/i }).click();

  if (IS_MOBILE) {
    // Mobile legend button should not be visible
    await expect(
      page.getByRole("button", { name: "Legend" }),
    ).not.toBeVisible();
  }
  // Legend should not be visible
  await expect(legend).not.toBeVisible();

  // Turn off "Turn off legend" switch
  await page.getByRole("button", { name: /Settings/i }).click();
  await expect(page.getByRole("heading", { name: /Settings/i })).toBeVisible();
  await page.getByRole("switch", { name: /Turn off legend/i }).click();
  await page.getByRole("button", { name: /Close settings view/i }).click();

  if (IS_MOBILE) {
    // Mobile legend button should be visible
    await expect(page.getByRole("button", { name: "Legend" })).toBeVisible();
  } else {
    // Legend should be visible again
    await expect(legend).toBeVisible();
  }
});
