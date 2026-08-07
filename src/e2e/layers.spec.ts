import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { isMobileProject, waitForMapTilesToLoad } from "./util";

test("opens layers overlay when layers button is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect layers overlay to be closed
  await expect(
    page.getByRole("heading", { name: /Layers/i }),
  ).not.toBeVisible();

  await page.getByRole("button", { name: /Open Layers/i }).click();

  // Expect layers overlay to be open
  await expect(page.getByRole("heading", { name: /Layers/i })).toBeVisible();
});

test("closes layers overlay when its close button is used", async ({
  page,
}) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect layers overlay to be closed
  await expect(
    page.getByRole("heading", { name: /Layers/i }),
  ).not.toBeVisible();

  await page.getByRole("button", { name: /Open Layers/i }).click();

  // Expect layers overlay to be open
  await expect(page.getByRole("heading", { name: /Layers/i })).toBeVisible();

  await page.getByRole("button", { name: "Close layers overlay" }).click();

  // Expect layers overlay to be closed again
  await expect(
    page.getByRole("heading", { name: /Layers/i }),
  ).not.toBeVisible();
});

test("toggles Gym layer when Gym button is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const poi = page.locator('[data-poitype="gym"]');
  const legendIcon = page.getByTestId("legend").getByText("Gym");

  // Expect Gyms to be visible
  expect(await poi.count()).toBeGreaterThan(0);

  if (IS_MOBILE) {
    // Open the legend since it is closed by default on mobile
    await page.getByRole("button", { name: "Legend" }).click();
  }

  // Expect Gym icon to be turned on in the legend
  await expect(legendIcon).toBeVisible();

  await page.getByRole("button", { name: /Open Layers/i }).click();

  const layerBtn = page.getByRole("button", {
    name: "Gym Layer Button Icon Gyms",
  });
  await layerBtn.click();

  // Expect Gyms to be turned off
  expect(await poi.count()).toBe(0);

  // Expect Gym icon to be turned off in the legend
  await expect(legendIcon).not.toBeVisible();

  await layerBtn.click();

  // Expect Gyms to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);

  // Expect Gym icon to be turned back on in the legend
  await expect(legendIcon).toBeVisible();
});

test("toggles PokeStop layer when PokeStop button is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const poi = page.locator('[data-poitype="pokestop"]');
  const legendIcon = page.getByTestId("legend").getByText("PokéStop");

  // Expect PokeStops to be visible
  expect(await poi.count()).toBeGreaterThan(0);

  if (IS_MOBILE) {
    // Open the legend since it is closed by default on mobile
    await page.getByRole("button", { name: "Legend" }).click();
  }

  // Expect PokeStop icon to be turned on in the legend
  await expect(legendIcon).toBeVisible();

  await page.getByRole("button", { name: /Open Layers/i }).click();

  const layerBtn = page.getByRole("button", {
    name: "PokéStop Layer Button Icon",
  });
  await layerBtn.click();

  // Expect PokeStops to be turned off
  expect(await poi.count()).toBe(0);

  // Expect PokeStop icon to be turned off in the legend
  await expect(legendIcon).not.toBeVisible();

  await layerBtn.click();

  // Expect PokeStops to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);

  // Expect PokeStop icon to be turned back on in the legend
  await expect(legendIcon).toBeVisible();
});

test("toggles Power Spot layer when Power Spot button is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const poi = page.locator('[data-poitype="powerspot"]');
  const legendIcon = page.getByTestId("legend").getByText("Enabled Power Spot");

  // Expect Power Spots to be visible
  expect(await poi.count()).toBeGreaterThan(0);

  if (IS_MOBILE) {
    // Open the legend since it is closed by default on mobile
    await page.getByRole("button", { name: "Legend" }).click();
  }

  // Expect Enabled Power Spot icon to be turned on in the legend
  await expect(legendIcon).toBeVisible();

  await page.getByRole("button", { name: /Open Layers/i }).click();

  const layerBtn = page.getByRole("button", {
    name: "Power Spot Layer Button Icon",
  });
  await layerBtn.click();

  // Expect Power Spots to be turned off
  expect(await poi.count()).toBe(0);

  // Expect Enabled Power Spot icon to be turned off in the legend
  await expect(legendIcon).not.toBeVisible();

  await layerBtn.click();

  // Expect Power Spots to be turned back on
  expect(await poi.count()).toBeGreaterThan(0);

  // Expect Enabled Power Spot icon to be turned back on in the legend
  await expect(legendIcon).toBeVisible();
});

test("switches map type to extra info", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: /Open Layers/i }).click();

  await page.getByText("Extra Info", { exact: true }).click();

  const url = new URL(page.url());
  expect(url.searchParams.get("type")).toBe("extra-info");

  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await page.getByRole("button", { name: "Close layers overlay" }).click();
  }

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the extra info map tiles
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("switches map type to satellite", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: /Open Layers/i }).click();

  await page.getByText("Satellite", { exact: true }).click();

  const url = new URL(page.url());
  expect(url.searchParams.get("type")).toBe("satellite");

  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await page.getByRole("button", { name: "Close layers overlay" }).click();
  }

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the satellite map tiles
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("switches map type to satellite and back to default", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: /Open Layers/i,
  });
  await openLayersOverlayButton.click();

  await page.getByRole("radio", { name: "Satellite" }).click();

  const url = new URL(page.url());
  expect(url.searchParams.get("type")).toBe("satellite");

  const closeLayersOverlayButton = page.getByRole("button", {
    name: "Close layers overlay",
  });
  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await closeLayersOverlayButton.click();
  }

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot that the map tiles have changed to satellite
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

  // Reveal UI overlay by pressing "h"
  await page.keyboard.press("h");

  if (IS_MOBILE) {
    // Reopen the layers overlay
    await openLayersOverlayButton.click();
  }

  await page.getByRole("radio", { name: "Default" }).click();

  if (IS_MOBILE) {
    // Close the layers overlay again since it blocks the map on mobile
    await closeLayersOverlayButton.click();
  }

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot that the map tiles have changed back to default
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("toggles L17 grid when L17 grid checkbox is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: /Open Layers/i,
  });
  await openLayersOverlayButton.click();

  // Expect L17 grid to be hidden
  const l17grid = page.locator(".l17-grid");
  await expect(l17grid).not.toBeVisible();

  const l17GridCheckbox = page.getByRole("checkbox", { name: "L17 Grid" });
  await l17GridCheckbox.click();

  // Expect L17 grid to be turned on
  await expect(l17grid).toBeVisible();

  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await page.getByRole("button", { name: "Close layers overlay" }).click();
  }

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the L17 grid
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

  // Reveal UI overlay by pressing "h"
  await page.keyboard.press("h");

  if (IS_MOBILE) {
    // Reopen the layers overlay
    await openLayersOverlayButton.click();
  }

  await l17GridCheckbox.click();

  // Expect L17 grid to be turned back off
  await expect(l17grid).not.toBeVisible();
});

test("toggles L14 grid when L14 grid checkbox is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: /Open Layers/i,
  });
  await openLayersOverlayButton.click();

  // Expect L14 grid to be hidden
  const l14grid = page.locator(".l14-grid");
  await expect(l14grid).not.toBeVisible();

  const l14GridCheckbox = page.getByRole("checkbox", { name: "L14 Grid" });
  await l14GridCheckbox.click();

  // Expect L14 grid to be turned on
  await expect(l14grid).toBeVisible();

  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await page.getByRole("button", { name: "Close layers overlay" }).click();
  }

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the L14 grid
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

  // Reveal UI overlay by pressing "h"
  await page.keyboard.press("h");

  if (IS_MOBILE) {
    // Reopen the layers overlay
    await openLayersOverlayButton.click();
  }

  await l14GridCheckbox.click();

  // Expect L14 grid to be turned back off
  await expect(l14grid).not.toBeVisible();
});

test("toggles L13 grid when L13 grid checkbox is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: /Open Layers/i,
  });
  await openLayersOverlayButton.click();

  // Expect L13 grid to be hidden
  const l13grid = page.locator(".l13-grid");
  await expect(l13grid).not.toBeVisible();

  const l13GridCheckbox = page.getByRole("checkbox", { name: "L13 Grid" });
  await l13GridCheckbox.click();

  // Expect L13 grid to be turned on
  await expect(l13grid).toBeVisible();

  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await page.getByRole("button", { name: "Close layers overlay" }).click();
  }

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the L13 grid
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

  // Reveal UI overlay by pressing "h"
  await page.keyboard.press("h");

  if (IS_MOBILE) {
    // Reopen the layers overlay
    await openLayersOverlayButton.click();
  }

  await l13GridCheckbox.click();

  // Expect L17 grid to be turned back off
  await expect(l13grid).not.toBeVisible();
});

test("toggles labels when labels checkbox is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: /Open Layers/i,
  });
  await openLayersOverlayButton.click();

  // Expect labels to be visible
  const labels = page.locator(".label-map");
  expect(await labels.count()).toBeGreaterThan(0);

  const labelsCheckbox = page.getByRole("checkbox", { name: "Labels" });
  await labelsCheckbox.click();

  // Expect labels to be turned off
  expect(await labels.count()).toBe(0);

  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await page.getByRole("button", { name: "Close layers overlay" }).click();
  }

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with labels off
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

  // Reveal UI overlay by pressing "h"
  await page.keyboard.press("h");

  if (IS_MOBILE) {
    // Reopen the layers overlay
    await openLayersOverlayButton.click();
  }

  await labelsCheckbox.click();

  // Expect labels to be turned back on
  expect(await labels.count()).toBeGreaterThan(0);
});

test("toggles all interaction radii when interaction radii checkbox is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: /Open Layers/i,
  });
  await openLayersOverlayButton.click();

  // Expect interaction radii to be hidden
  const interactionRadii = page.locator('[data-rangetype="interaction"]');
  expect(await interactionRadii.count()).toBe(0);

  const interactionRadiiCheckbox = page.getByRole("checkbox", {
    name: "Interaction Radii (80m)",
  });
  await interactionRadiiCheckbox.click();

  // Expect interaction radii to be turned on
  expect(await interactionRadii.count()).toBeGreaterThan(0);

  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await page.getByRole("button", { name: "Close layers overlay" }).click();
  }

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with interaction radii turned on
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

  // Reveal UI overlay by pressing "h"
  await page.keyboard.press("h");

  if (IS_MOBILE) {
    // Reopen the layers overlay
    await openLayersOverlayButton.click();
  }

  await interactionRadiiCheckbox.click();

  // Expect interaction radii to be turned back off
  expect(await interactionRadii.count()).toBe(0);
});

test("toggles all no power spot zones when no power spot zones checkbox is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: /Open Layers/i,
  });
  await openLayersOverlayButton.click();

  // Expect no power spot zones to be hidden
  const noPowerSpotZones = page.locator('[data-rangetype="no-power-spot"]');
  expect(await noPowerSpotZones.count()).toBe(0);

  const noPowerSpotZonesCheckbox = page.getByRole("checkbox", {
    name: "No Power Spot Zones (22m)",
  });
  await noPowerSpotZonesCheckbox.click();

  // Expect no power spot zones to be turned on
  expect(await noPowerSpotZones.count()).toBeGreaterThan(0);

  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await page.getByRole("button", { name: "Close layers overlay" }).click();
  }

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with no power spot zones turned on
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

  // Reveal UI overlay by pressing "h"
  await page.keyboard.press("h");

  if (IS_MOBILE) {
    // Reopen the layers overlay
    await openLayersOverlayButton.click();
  }

  await noPowerSpotZonesCheckbox.click();

  // Expect no power spot zones to be turned back off
  expect(await noPowerSpotZones.count()).toBe(0);
});

// To clarify, "brand new load" means a completely new user is opening this for the
// very first time
test("displays default layers on brand new load", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

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

  // Expect disabled & impossible power spots to be hidden
  const powerspotsImpossible = page.locator(
    '[data-poitype="powerspot"][data-isimpossible="true"]',
  );
  expect(await powerspotsImpossible.count()).toBe(0);

  const powerspotsDisabled = page.locator(
    '[data-poitype="powerspot"][data-isdisabled="true"]',
  );
  expect(await powerspotsDisabled.count()).toBe(0);

  // Expect POIs in development to be hidden
  const devpois = page.locator('[data-poitype="devpoi"]');
  expect(await devpois.count()).toBe(0);

  // Expect all hidden POIs to be hidden
  const hiddenPois = page.locator('[data-poitype="hidden"]');
  expect(await hiddenPois.count()).toBe(0);

  // Expect all removed POIs to be hidden
  const removedPois = page.locator('[data-poitype="removed"]');
  expect(await removedPois.count()).toBe(0);
});

test("toggles meetup spot layer when meetup spot button is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const poi = page.locator('[data-poitype="meetupspot"]');
  const legendIcon = page.getByTestId("legend").getByText("Meetup Spot");

  // Expect meetups to be visible
  expect(await poi.count()).toBeGreaterThan(0);

  if (IS_MOBILE) {
    await page.getByRole("button", { name: "Legend" }).click();
  }

  // Expect meetup spot icon to be turned on in the legend
  await expect(legendIcon).toBeVisible();

  await page.getByRole("button", { name: /Open Layers/i }).click();

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

test("toggles parking layer when parking button is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const poi = page.locator('[data-poitype="parking"]');
  const legend = page.getByTestId("legend");
  const parkingLegendIcon = legend.getByText("Free Parking");
  const parkingWarnLegendIcon = legend.getByText("Parking (Free Sometimes)");

  // Expect parking to be visible
  expect(await poi.count()).toBeGreaterThan(0);

  if (IS_MOBILE) {
    await page.getByRole("button", { name: "Legend" }).click();
  }

  // Expect parking icons to be turned on in the legend
  await expect(parkingLegendIcon).toBeVisible();
  await expect(parkingWarnLegendIcon).toBeVisible();

  await page.getByRole("button", { name: /Open Layers/i }).click();

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
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect raid path to be visible
  const path = page.locator(".std-raid-path");
  await expect(path).toBeVisible();

  await page.getByRole("button", { name: /Open Layers/i }).click();

  const layerBtn = page.getByRole("button", { name: "Standard Raid Path" });
  await layerBtn.click();

  // Expect raid path to be turned off
  await expect(path).not.toBeVisible();

  await layerBtn.click();

  // Expect raid path to be turned back on
  await expect(path).toBeVisible();
});

test("toggles restrooms layer when restrooms button is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const poi = page.locator('[data-poitype="restroom"]');
  const legend = page.getByTestId("legend");
  const allBinaryRestroomIcon = legend.getByText("All-Gender / Family");
  const mRestroomIcon = legend.getByText("Men's Restroom", { exact: true });
  const wRestroomIcon = legend.getByText("Women's Restroom", { exact: true });

  // Expect restroom to be visible
  expect(await poi.count()).toBeGreaterThan(0);

  if (IS_MOBILE) {
    await page.getByRole("button", { name: "Legend" }).click();
  }

  // Expect restroom icons to be turned on in the legend
  await expect(allBinaryRestroomIcon).toBeVisible();
  await expect(mRestroomIcon).toBeVisible();
  await expect(wRestroomIcon).toBeVisible();

  await page.getByRole("button", { name: /Open Layers/i }).click();

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
