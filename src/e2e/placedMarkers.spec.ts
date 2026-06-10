import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { isMobileProject, isPixel7, longPressContextMenu } from "./util";

const PLACED_MARKER_FIRST_DESKTOP = { x: 500, y: 100 };
const PLACED_MARKER_SECOND_DESKTOP = { x: 550, y: 100 };
const PLACED_MARKER_FIRST_MOBILE = { x: 100, y: 100 };
const PLACED_MARKER_SECOND_MOBILE = { x: 120, y: 100 };

test("loads map with no placed markers by default", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const markers = await page.locator('[data-testid*="placed-"]').all();

  expect(markers.length).toBe(0);
});

test("creates a placed marker when the map is used", async ({
  page,
}, testInfo) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const IS_MOBILE = isMobileProject(testInfo.project.name);

  let markers = await page.locator('[data-testid*="placed-"]').all();

  expect(markers.length).toBe(0);

  // Click the map to place a marker
  if (IS_MOBILE) {
    await longPressContextMenu(
      page,
      PLACED_MARKER_FIRST_MOBILE,
      1000,
      isPixel7(testInfo.project.name),
    );
  } else {
    await page.locator("#map").click({ position: PLACED_MARKER_FIRST_DESKTOP });
  }

  markers = await page.locator('[data-testid*="placed-"]').all();
  expect(markers.length).toBe(1);
});

test("creates two placed markers when the map is used at two different locations", async ({
  page,
}, testInfo) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const IS_MOBILE = isMobileProject(testInfo.project.name);

  let markers = await page.locator('[data-testid*="placed-"]').all();

  expect(markers.length).toBe(0);

  // Click the map to place a marker
  if (IS_MOBILE) {
    await longPressContextMenu(
      page,
      PLACED_MARKER_FIRST_MOBILE,
      1000,
      isPixel7(testInfo.project.name),
    );
  } else {
    await page.locator("#map").click({ position: PLACED_MARKER_FIRST_DESKTOP });
  }

  markers = await page.locator('[data-testid*="placed-"]').all();
  expect(markers.length).toBe(1);

  // Click the map to place another marker
  if (IS_MOBILE) {
    await longPressContextMenu(
      page,
      PLACED_MARKER_SECOND_MOBILE,
      1000,
      isPixel7(testInfo.project.name),
    );
  } else {
    await page
      .locator("#map")
      .click({ position: PLACED_MARKER_SECOND_DESKTOP });
  }

  markers = await page.locator('[data-testid*="placed-"]').all();
  expect(markers.length).toBe(2);
});

test("creates a popup when a placed marker is used", async ({
  page,
}, testInfo) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const IS_MOBILE = isMobileProject(testInfo.project.name);

  let markers = await page.locator('[data-testid*="placed-"]').all();
  const popups = await page.locator(".leaflet-popup").all();

  expect(markers.length).toBe(0);
  expect(popups.length).toBe(0);

  // Click the map to place a marker
  if (IS_MOBILE) {
    await longPressContextMenu(
      page,
      PLACED_MARKER_FIRST_MOBILE,
      1000,
      isPixel7(testInfo.project.name),
    );
  } else {
    await page.locator("#map").click({ position: PLACED_MARKER_FIRST_DESKTOP });
  }

  markers = await page.locator('[data-testid*="placed-"]').all();
  expect(markers.length).toBe(1);

  // Click the marker
  await markers[0].click();

  // Wait for popup to appear
  await expect(page.locator(".leaflet-popup")).toBeVisible();
});

test("deletes a marker when the marker delete button is used", async ({
  page,
}, testInfo) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const IS_MOBILE = isMobileProject(testInfo.project.name);

  let markers = await page.locator('[data-testid*="placed-"]').all();
  let popups = await page.locator(".leaflet-popup").all();

  expect(markers.length).toBe(0);
  expect(popups.length).toBe(0);

  // Click the map to place a marker
  if (IS_MOBILE) {
    await longPressContextMenu(
      page,
      PLACED_MARKER_FIRST_MOBILE,
      1000,
      isPixel7(testInfo.project.name),
    );
  } else {
    await page.locator("#map").click({ position: PLACED_MARKER_FIRST_DESKTOP });
  }

  markers = await page.locator('[data-testid*="placed-"]').all();
  expect(markers.length).toBe(1);

  // Click the marker
  await markers[0].click();

  // Wait for popup to appear
  await expect(page.locator(".leaflet-popup")).toBeVisible();

  // Click the delete button
  await page.getByTestId("delete-placed-marker-btn").click();
  await page.waitForTimeout(500); // wait for popup delete animation to end

  markers = await page.locator('[data-testid*="placed-"]').all();
  popups = await page.locator(".leaflet-popup").all();

  expect(markers.length).toBe(0);
  expect(popups.length).toBe(0);
});
