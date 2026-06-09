import { expect, test } from "@playwright/test";

test("opens layers overlay when layers button is used", async ({ page }) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  // Expect layers overlay to be closed
  await expect(page.getByRole("heading", { name: "Layers" })).not.toBeVisible();

  await page.getByRole("button", { name: "Open Layers" }).click();

  // Expect layers overlay to be open
  await expect(page.getByRole("heading", { name: "Layers" })).toBeVisible();
});

test("closes layers overlay when its close button is used", async ({
  page,
}) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  // Expect layers overlay to be closed
  await expect(page.getByRole("heading", { name: "Layers" })).not.toBeVisible();

  await page.getByRole("button", { name: "Open Layers" }).click();

  // Expect layers overlay to be open
  await expect(page.getByRole("heading", { name: "Layers" })).toBeVisible();

  await page.getByRole("button", { name: "Close layers overlay" }).click();

  // Expect layers overlay to be closed again
  await expect(page.getByRole("heading", { name: "Layers" })).not.toBeVisible();
});

test("toggles Gym layer when Gym button is used", async ({ page }) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  // Expect Gyms to be visible
  const poi = page.locator('[data-poitype="gym"]');
  expect(await poi.count()).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Open Layers" }).click();

  const layerBtn = page.getByRole("button", {
    name: "Gym Layer Button Icon Gyms",
  });
  await layerBtn.click();

  // Expect Gyms to be turned off
  expect(await poi.count()).toBe(0);

  await layerBtn.click();

  // Expect Gyms to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);
});

test("toggles PokeStop layer when PokeStop button is used", async ({
  page,
}) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  // Expect PokeStops to be visible
  const poi = page.locator('[data-poitype="pokestop"]');
  expect(await poi.count()).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Open Layers" }).click();

  const layerBtn = page.getByRole("button", {
    name: "PokéStop Layer Button Icon",
  });
  await layerBtn.click();

  // Expect PokeStops to be turned off
  expect(await poi.count()).toBe(0);

  await layerBtn.click();

  // Expect PokeStops to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);
});

test("toggles Power Spot layer when Power Spot button is used", async ({
  page,
}) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  // Expect Power Spots to be visible
  const poi = page.locator('[data-poitype="powerspot"]');
  expect(await poi.count()).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Open Layers" }).click();

  const layerBtn = page.getByRole("button", {
    name: "Power Spot Layer Button Icon",
  });
  await layerBtn.click();

  // Expect Power Spots to be turned off
  expect(await poi.count()).toBe(0);

  await layerBtn.click();

  // Expect Power Spots to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);
});
