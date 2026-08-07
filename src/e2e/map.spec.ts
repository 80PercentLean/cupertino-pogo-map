import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { isMobileProject, waitForMapTilesToLoad } from "./util";

test("has title", async ({ page }, { project }) => {
  await page.goto(E2E_MAP_PATH);

  await expect(page).toHaveTitle(
    new RegExp(
      `${project.metadata.GROUP_NAME} Map | Directions & Free Parking for Pokémon GO at ${project.metadata.LOCATION}`,
      "i",
    ),
  );
});

test("shows expected default view", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await waitForMapTilesToLoad(page);

  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("toggles the UI overlay when H is pressed", async ({ page }, testInfo) => {
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

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

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

  // Show UI overlay by pressing "h" again
  await page.keyboard.press("h");

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
});
