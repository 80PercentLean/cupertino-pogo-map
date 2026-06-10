import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { isMobileProject, waitForMapTilesToLoad } from "./util";

test("opens layers overlay when layers button is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect layers overlay to be closed
  await expect(page.getByRole("heading", { name: "Layers" })).not.toBeVisible();

  await page.getByRole("button", { name: "Open Layers" }).click();

  // Expect layers overlay to be open
  await expect(page.getByRole("heading", { name: "Layers" })).toBeVisible();
});

test("closes layers overlay when its close button is used", async ({
  page,
}) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect layers overlay to be closed
  await expect(page.getByRole("heading", { name: "Layers" })).not.toBeVisible();

  await page.getByRole("button", { name: "Open Layers" }).click();

  // Expect layers overlay to be open
  await expect(page.getByRole("heading", { name: "Layers" })).toBeVisible();

  await page.getByRole("button", { name: "Close layers overlay" }).click();

  // Expect layers overlay to be closed again
  await expect(page.getByRole("heading", { name: "Layers" })).not.toBeVisible();
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

  await page.getByRole("button", { name: "Open Layers" }).click();

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

  await page.getByRole("button", { name: "Open Layers" }).click();

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

  await page.getByRole("button", { name: "Open Layers" }).click();

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

  await page.getByRole("button", { name: "Open Layers" }).click();

  await page.getByText("Extra Info", { exact: true }).click();

  const url = new URL(page.url());
  expect(url.searchParams.get("type")).toBe("extra-info");

  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await page.getByRole("button", { name: "Close layers overlay" }).click();
  }

  await waitForMapTilesToLoad(page);

  // Screenshot the extra info map tiles
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("switches map type to satellite", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Open Layers" }).click();

  await page.getByText("Satellite", { exact: true }).click();

  const url = new URL(page.url());
  expect(url.searchParams.get("type")).toBe("satellite");

  if (IS_MOBILE) {
    // Close the layers overlay since it blocks the map on mobile
    await page.getByRole("button", { name: "Close layers overlay" }).click();
  }

  await waitForMapTilesToLoad(page);

  // Screenshot the satellite map tiles
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("switches map type to satellite and back to default", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: "Open Layers",
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

  // Screenshot that the map tiles have changed to satellite
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

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

  // Screenshot that the map tiles have changed back to default
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("toggles L17 grid when L17 grid checkbox is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const openLayersOverlayButton = page.getByRole("button", {
    name: "Open Layers",
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

  // Screenshot the L17 grid
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

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
    name: "Open Layers",
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

  // Screenshot the L14 grid
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

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
    name: "Open Layers",
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

  // Screenshot the L13 grid
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

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
    name: "Open Layers",
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

  // Screenshot the map with labels off
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

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
    name: "Open Layers",
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

  // Screenshot the map with interaction radii turned on
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

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
    name: "Open Layers",
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

  // Screenshot the map with no power spot zones turned on
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

  if (IS_MOBILE) {
    // Reopen the layers overlay
    await openLayersOverlayButton.click();
  }

  await noPowerSpotZonesCheckbox.click();

  // Expect no power spot zones to be turned back off
  expect(await noPowerSpotZones.count()).toBe(0);
});
