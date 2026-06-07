import { expect, test } from "@playwright/test";

test("has title", async ({ page }, { project }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(
    new RegExp(
      `${project.metadata.GROUP_NAME} | Pokémon GO Community in ${project.metadata.CITY}, California`,
      "i",
    ),
  );
});

test("shows expected default view", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page).toHaveScreenshot("landing-viewport.png", {
    maxDiffPixelRatio: 0.0001,
  });
  await expect(page).toHaveScreenshot("landing-full.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.001,
  });
});
