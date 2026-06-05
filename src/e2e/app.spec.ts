import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/map");

  await expect(page).toHaveTitle(
    /Cupertino PoGO Map | Directions & Free Parking for Pokémon GO at Cupertino Memorial Park & De Anza College/i,
  );
});

test("shows expected default view", async ({ page }) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});
