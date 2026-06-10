import { expect, test } from "@playwright/test";

import { E2E_ROOT_PATH } from "./constants";

test("has title", async ({ page }, { project }) => {
  await page.goto(E2E_ROOT_PATH);

  await expect(page).toHaveTitle(
    new RegExp(
      `${project.metadata.GROUP_NAME} | Pokémon GO Community in ${project.metadata.CITY}, California`,
      "i",
    ),
  );
});

test("shows expected default view", async ({ page }) => {
  await page.goto(E2E_ROOT_PATH, { waitUntil: "networkidle" });

  await expect(page).toHaveScreenshot("landing-viewport.png", {
    maxDiffPixelRatio: 0.0001,
  });
  await expect(page).toHaveScreenshot("landing-full.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.001,
  });
});
