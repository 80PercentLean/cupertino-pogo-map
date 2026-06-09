import { expect, test } from "@playwright/test";

// TODO: move all these tests to all test file when WG implements them

// To clarify, "brand new load" means a completely new user is opening this for the
// very first time
test("displays default layers on brand new load", async ({ page }) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  // Expect Gyms, PokeStops, meetup spots, parking, and restrooms to be visible
  const gyms = page.locator('[data-poitype="gym"]');
  expect(await gyms.count()).toBeGreaterThan(0);
  const pokestops = page.locator('[data-poitype="pokestop"]');
  expect(await pokestops.count()).toBeGreaterThan(0);
  const meetupspots = page.locator('[data-poitype="meetupspot"]');
  expect(await meetupspots.count()).toBeGreaterThan(0);
  const parking = page.locator('[data-poitype="parking"]');
  expect(await parking.count()).toBeGreaterThan(0);
  const restrooms = page.locator('[data-poitype="restroom"]');
  expect(await restrooms.count()).toBeGreaterThan(0);

  // Expect only enabled power spots to be visible
  const powerspotsEnabled = page.locator(
    '[data-poitype="powerspot"][data-isenabled="true"]',
  );
  expect(await powerspotsEnabled.count()).toBeGreaterThan(0);

  // Expect dev POIs to hidden
  const powerspotsDisabled = page.locator(
    '[data-poitype="powerspot"][data-isdisabled="true"]',
  );
  expect(await powerspotsDisabled.count()).toBe(0);

  // Expect disabled & impossible power spots to be hidden
  const powerspotsImpossible = page.locator(
    '[data-poitype="powerspot"][data-isimpossible="true"]',
  );
  expect(await powerspotsImpossible.count()).toBe(0);

  // Expect all hidden POIs to be hidden
  const hiddenPois = page.locator('[data-poitype="hidden"]');
  expect(await hiddenPois.count()).toBe(0);

  // Expect all removed POIs to be hidden
  const removedPois = page.locator('[data-poitype="removed"]');
  expect(await removedPois.count()).toBe(0);
});

test("toggles meetup spot layer when meetup spot button is used", async ({
  page,
}) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  // Expect meetups to be visible
  const poi = page.locator('[data-poitype="meetupspot"]');
  expect(await poi.count()).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Open Layers" }).click();

  const layerBtn = page.getByRole("button", { name: "📍 Meetup Spots" });
  await layerBtn.click();

  // Expect meetups to be turned off
  expect(await poi.count()).toBe(0);

  await layerBtn.click();

  // Expect meetups to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);
});

test("toggles parking layer when parking button is used", async ({ page }) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  // Expect parking to be visible
  const poi = page.locator('[data-poitype="parking"]');
  expect(await poi.count()).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Open Layers" }).click();

  const layerBtn = page.getByRole("button", { name: "🅿️ Parking" });
  await layerBtn.click();

  // Expect parking to be turned off
  expect(await poi.count()).toBe(0);

  await layerBtn.click();

  // Expect parking to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);
});

test("toggles Standard Raid Path layer when Standard Raid Path button is used", async ({
  page,
}) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  // Expect raid path to be visible
  const path = page.locator(".std-raid-path");
  await expect(path).toBeVisible();

  await page.getByRole("button", { name: "Open Layers" }).click();

  const layerBtn = page.getByRole("button", { name: "🚶 Standard Raid Path" });
  await layerBtn.click();

  // Expect raid path to be turned off
  await expect(path).not.toBeVisible();

  await layerBtn.click();

  // Expect raid path to be turned back on
  await expect(path).toBeVisible();
});

test("toggles restrooms layer when restrooms button is used", async ({
  page,
}) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  // Expect restroom to be visible
  const poi = page.locator('[data-poitype="restroom"]');
  expect(await poi.count()).toBeGreaterThan(0);

  await page.getByRole("button", { name: "Open Layers" }).click();

  const layerBtn = page.getByRole("button", { name: "🚻 Restrooms" });
  await layerBtn.click();

  // Expect restroom to be turned off
  expect(await poi.count()).toBe(0);

  await layerBtn.click();

  // Expect restroom to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);
});
