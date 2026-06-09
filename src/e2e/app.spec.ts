import { expect, test } from "@playwright/test";

import { waitForMapTilesToLoad } from "./util";

test("has title", async ({ page }, { project }) => {
  await page.goto("/map");

  await expect(page).toHaveTitle(
    new RegExp(
      `${project.metadata.GROUP_NAME} Map | Directions & Free Parking for Pokémon GO at ${project.metadata.LOCATION}`,
      "i",
    ),
  );
});

test("shows expected default view", async ({ page }) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  await waitForMapTilesToLoad(page);

  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

// TODO: test popup
