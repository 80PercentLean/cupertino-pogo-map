import { expect, test } from "@playwright/test";

// TODO: move the following tests to all test file when WG implements them

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

  const poi = page.locator('[data-poitype="meetupspot"]');
  const legendIcon = page.getByTestId("legend").getByText("Meetup Spot");

  // Expect meetups to be visible
  expect(await poi.count()).toBeGreaterThan(0);

  // Expect meetup spot icon to be turned on in the legend
  await expect(legendIcon).toBeVisible();

  await page.getByRole("button", { name: "Open Layers" }).click();

  const layerBtn = page.getByRole("button", { name: "📍 Meetup Spots" });
  await layerBtn.click();

  // Expect meetups to be turned off
  expect(await poi.count()).toBe(0);

  // Expect meetup spot icon to be turned off in the legend
  await expect(legendIcon).not.toBeVisible();

  await layerBtn.click();

  // Expect meetups to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);

  // Expect meetup spot icon to be turned back on in the legend
  await expect(legendIcon).toBeVisible();
});

test("toggles parking layer when parking button is used", async ({ page }) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  const poi = page.locator('[data-poitype="parking"]');
  const legend = page.getByTestId("legend");
  const parkingLegendIcon = legend.getByText("Free Parking");
  const parkingWarnLegendIcon = legend.getByText("Parking (Free Sometimes)");

  // Expect parking to be visible
  expect(await poi.count()).toBeGreaterThan(0);

  // Expect parking icons to be turned on in the legend
  await expect(parkingLegendIcon).toBeVisible();
  await expect(parkingWarnLegendIcon).toBeVisible();

  await page.getByRole("button", { name: "Open Layers" }).click();

  const layerBtn = page.getByRole("button", { name: "🅿️ Parking" });
  await layerBtn.click();

  // Expect parking to be turned off
  expect(await poi.count()).toBe(0);

  // Expect parking icons to be turned off in the legend
  await expect(parkingLegendIcon).not.toBeVisible();
  await expect(parkingWarnLegendIcon).not.toBeVisible();

  await layerBtn.click();

  // Expect parking to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);

  // Expect parking icons to be turned back on in the legend
  await expect(parkingLegendIcon).toBeVisible();
  await expect(parkingWarnLegendIcon).toBeVisible();
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

  const poi = page.locator('[data-poitype="restroom"]');
  const legend = page.getByTestId("legend");
  const allBinaryRestroomIcon = legend.getByText("All-Gender/Men's/Women's");
  const mRestroomIcon = legend.getByText("Men's Restroom", { exact: true });
  const wRestroomIcon = legend.getByText("Women's Restroom", { exact: true });

  // Expect restroom to be visible
  expect(await poi.count()).toBeGreaterThan(0);

  // Expect restroom icons to be turned on in the legend
  await expect(allBinaryRestroomIcon).toBeVisible();
  await expect(mRestroomIcon).toBeVisible();
  await expect(wRestroomIcon).toBeVisible();

  await page.getByRole("button", { name: "Open Layers" }).click();

  const layerBtn = page.getByRole("button", { name: "🚻 Restrooms" });
  await layerBtn.click();

  // Expect restroom to be turned off
  expect(await poi.count()).toBe(0);

  // Expect restroom icons to be turned off in the legend
  await expect(allBinaryRestroomIcon).not.toBeVisible();
  await expect(mRestroomIcon).not.toBeVisible();
  await expect(wRestroomIcon).not.toBeVisible();

  await layerBtn.click();

  // Expect restroom to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);

  // Expect restroom icons to be turned back on in the legend
  await expect(allBinaryRestroomIcon).toBeVisible();
  await expect(mRestroomIcon).toBeVisible();
  await expect(wRestroomIcon).toBeVisible();
});
