import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import {
  enableHiddenPois,
  isMobileProject,
  turnOffAllLayers,
  waitForMapTilesToLoad,
} from "./util";

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

test("snapshots complete Gym layer", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await turnOffAllLayers(page, true);
  await page
    .getByRole("button", {
      name: "Gym Layer Button Icon Gyms",
    })
    .click();

  // Expect Gyms to be visible
  expect(await page.locator('[data-poitype="gym"]').count()).toBeGreaterThan(0);

  await enableHiddenPois(page, true);

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with the Gym layer only
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
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

test("snapshots complete PokeStop layer", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await turnOffAllLayers(page, true);
  await page
    .getByRole("button", {
      name: "PokéStop Layer Button Icon",
    })
    .click();

  // Expect PokeStops to be visible
  expect(
    await page.locator('[data-poitype="pokestop"]').count(),
  ).toBeGreaterThan(0);

  await enableHiddenPois(page, true);

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with the PokeStop layer only
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
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

test("snapshots complete Enabled Power Spot layer", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await turnOffAllLayers(page, true);
  await page
    .getByRole("button", {
      name: "Power Spot Layer Button Icon",
    })
    .click();

  // Expect Power Spots to be visible
  expect(
    await page.locator('[data-poitype="powerspot"]').count(),
  ).toBeGreaterThan(0);

  await waitForMapTilesToLoad(page);

  await enableHiddenPois(page, true);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with the Power Spot layer only
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("snapshots complete Enabled & Disabled Power Spot layer", async ({
  page,
}) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await turnOffAllLayers(page, true);
  await page
    .getByRole("button", {
      name: "Power Spot Layer Button Icon",
    })
    .click();

  // Open settings and enable hidden POIs & Disabled Power Spots
  await enableHiddenPois(page);
  await page.getByRole("switch", { name: "Show disabled power spots" }).click();
  await page.getByRole("button", { name: "Close settings view" }).click();

  // Expect Power Spots to be visible
  expect(
    await page.locator('[data-poitype="powerspot"]').count(),
  ).toBeGreaterThan(0);

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with the Power Spot layer only
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("snapshots complete Power Spot layer with blocking POIs", async ({
  page,
}) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Turn on Gym & PokeStop layers and enable No Power Spot Zones
  await turnOffAllLayers(page, true);
  await page
    .getByRole("button", {
      name: "Gym Layer Button Icon Gyms",
    })
    .click();
  await page
    .getByRole("button", {
      name: "PokéStop Layer Button Icon",
    })
    .click();
  await page
    .getByRole("checkbox", {
      name: "No Power Spot Zones (22m)",
    })
    .click();
  await page
    .getByRole("button", {
      name: "Power Spot Layer Button Icon",
    })
    .click();
  await page
    .getByRole("button", {
      name: "Close layers overlay",
    })
    .click();

  // Open settings
  await enableHiddenPois(page);
  await page.getByRole("switch", { name: "Show disabled power spots" }).click();
  await page
    .getByRole("switch", { name: "Show impossible power spots" })
    .click();
  await page.getByRole("button", { name: "Close settings view" }).click();

  // Expect Gyms, PokeStops, Power Spots, and No Power Spot Zones to be visible
  expect(await page.locator('[data-poitype="gym"]').count()).toBeGreaterThan(0);
  expect(
    await page.locator('[data-poitype="pokestop"]').count(),
  ).toBeGreaterThan(0);
  expect(
    await page.locator('[data-poitype="powerspot"]').count(),
  ).toBeGreaterThan(0);
  expect(
    await page.locator('[data-rangetype="no-power-spot"]').count(),
  ).toBeGreaterThan(0);

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with Gyms, PokeStops, Power Spots, and No Power Spot Zones
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("switches map type to extra info", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: /Open Layers/i }).click();

  await page.getByText("Extra Info", { exact: true }).click();

  const url = new URL(page.url());
  expect(url.searchParams.get("type")).toBe("extra-info");

  await turnOffAllLayers(page, false, true);
  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the extra info map tiles
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("switches map type to satellite", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: /Open Layers/i }).click();

  await page.getByText("Satellite", { exact: true }).click();

  const url = new URL(page.url());
  expect(url.searchParams.get("type")).toBe("satellite");

  await turnOffAllLayers(page, false, true);
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

  await turnOffAllLayers(page);

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

test("toggles L17 grid when L17 grid checkbox is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: /Open Layers/i,
  });
  await openLayersOverlayButton.click();

  // Expect L17 grid to be hidden
  const grid = page.locator(".l17-grid");
  await expect(grid).not.toBeVisible();

  const gridCheckbox = page.getByRole("checkbox", { name: "L17 Grid" });
  await gridCheckbox.click();

  // Expect L17 grid to be turned on
  await expect(grid).toBeVisible();

  await gridCheckbox.click();

  // Expect L17 grid to be turned back off
  await expect(grid).not.toBeVisible();
});

test("snapshots L17 grid", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const grid = page.locator(".l17-grid");

  await turnOffAllLayers(page, true);
  await page.getByRole("checkbox", { name: "L17 Grid" }).click();

  // Expect L17 grid to be turned on
  await expect(grid).toBeVisible();

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with the L17 grid only
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("toggles L14 grid when L14 grid checkbox is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: /Open Layers/i,
  });
  await openLayersOverlayButton.click();

  // Expect L14 grid to be hidden
  const grid = page.locator(".l14-grid");
  await expect(grid).not.toBeVisible();

  const gridCheckbox = page.getByRole("checkbox", { name: "L14 Grid" });
  await gridCheckbox.click();

  // Expect L14 grid to be turned on
  await expect(grid).toBeVisible();

  await gridCheckbox.click();

  // Expect L14 grid to be turned back off
  await expect(grid).not.toBeVisible();
});

test("snapshots L14 grid", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const grid = page.locator(".l14-grid");

  await turnOffAllLayers(page, true);
  await page.getByRole("checkbox", { name: "L14 Grid" }).click();

  // Expect L14 grid to be turned on
  await expect(grid).toBeVisible();

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with the L14 grid only
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("toggles L13 grid when L13 grid checkbox is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: /Open Layers/i,
  });
  await openLayersOverlayButton.click();

  // Expect L13 grid to be hidden
  const grid = page.locator(".l13-grid");
  await expect(grid).not.toBeVisible();

  const gridCheckbox = page.getByRole("checkbox", { name: "L13 Grid" });
  await gridCheckbox.click();

  // Expect L13 grid to be turned on
  await expect(grid).toBeVisible();

  await gridCheckbox.click();

  // Expect L13 grid to be turned back off
  await expect(grid).not.toBeVisible();
});

test("snapshots L13 grid", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const grid = page.locator(".l13-grid");

  await turnOffAllLayers(page, true);
  await page.getByRole("checkbox", { name: "L13 Grid" }).click();

  // Expect L13 grid to be turned on
  await expect(grid).toBeVisible();

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with the L13 grid only
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("toggles labels when labels checkbox is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await page
    .getByRole("button", {
      name: /Open Layers/i,
    })
    .click();

  // Expect labels to be visible
  const labels = page.locator(".label-map");
  expect(await labels.count()).toBeGreaterThan(0);

  const labelsCheckbox = page.getByRole("checkbox", { name: "Labels" });
  await labelsCheckbox.click();

  // Expect labels to be turned off
  expect(await labels.count()).toBe(0);

  await labelsCheckbox.click();

  // Expect labels to be turned back on
  expect(await labels.count()).toBeGreaterThan(0);
});

test("snapshots labels", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await turnOffAllLayers(page, true);
  await page.getByRole("checkbox", { name: "Labels" }).click();

  // Expect labels to be visible
  expect(await page.locator(".label-map").count()).toBeGreaterThan(0);

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with labels on
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("toggles all interaction radii when interaction radii checkbox is used", async ({
  page,
}) => {
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

  await interactionRadiiCheckbox.click();

  // Expect interaction radii to be turned back off
  expect(await interactionRadii.count()).toBe(0);
});

test("snapshots all interaction radii", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Open layers overlay
  await page
    .getByRole("button", {
      name: /Open Layers/i,
    })
    .click();

  // Turn off unnecessary layers
  await page.getByRole("button", { name: "📍 Meetup Spots" }).click();
  await page.getByRole("button", { name: "🅿️ Parking" }).click();
  await page.getByRole("button", { name: "🚻 Restrooms" }).click();
  await page.getByRole("button", { name: "🍽️ Food & Drink" }).click();
  await page.getByRole("button", { name: "Standard Raid Path" }).click();
  await page.getByRole("checkbox", { name: "Labels" }).click();

  // Enable interaction radii
  await page
    .getByRole("checkbox", {
      name: "Interaction Radii (80m)",
    })
    .click();

  // Expect interaction radii to be turned on
  expect(
    await page.locator('[data-rangetype="interaction"]').count(),
  ).toBeGreaterThan(0);

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with interaction radii turned on
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("toggles all no power spot zones when no power spot zones checkbox is used", async ({
  page,
}) => {
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

  await noPowerSpotZonesCheckbox.click();

  // Expect no power spot zones to be turned back off
  expect(await noPowerSpotZones.count()).toBe(0);
});

test("snapshots all no power spot zones", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Open layers overlay
  await page
    .getByRole("button", {
      name: /Open Layers/i,
    })
    .click();

  // Turn off unnecessary layers
  await page
    .getByRole("button", {
      name: "Power Spot Layer Button Icon",
    })
    .click();
  await page.getByRole("button", { name: "📍 Meetup Spots" }).click();
  await page.getByRole("button", { name: "🅿️ Parking" }).click();
  await page.getByRole("button", { name: "🚻 Restrooms" }).click();
  await page.getByRole("button", { name: "🍽️ Food & Drink" }).click();
  await page.getByRole("button", { name: "Standard Raid Path" }).click();
  await page.getByRole("checkbox", { name: "Labels" }).click();

  // Enable no power spot zones
  await page
    .getByRole("checkbox", {
      name: "No Power Spot Zones (22m)",
    })
    .click();

  // Expect no power spot zones to be turned on
  expect(
    await page.locator('[data-rangetype="no-power-spot"]').count(),
  ).toBeGreaterThan(0);

  await waitForMapTilesToLoad(page);

  // Hide UI overlay by pressing "h"
  await page.keyboard.press("h");

  // Close toast so it isn't in the way
  await page.getByRole("button", { name: "Close toast" }).click();

  // Screenshot the map with no power spot zones turned on
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
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
