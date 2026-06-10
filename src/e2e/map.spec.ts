import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { waitForMapTilesToLoad } from "./util";

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
