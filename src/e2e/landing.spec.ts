import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(
    /Cupertino PoGO | Pokémon GO Community in Cupertino, California/i,
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
