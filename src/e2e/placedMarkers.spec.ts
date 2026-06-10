import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import {
  isMobileProject,
  isPixel7,
  longPressContextMenu,
  waitForMapTilesToLoad,
} from "./util";

const PLACED_MARKER_FIRST_DESKTOP = { x: 500, y: 100 };
const PLACED_MARKER_SECOND_DESKTOP = { x: 550, y: 100 };
const PLACED_MARKER_FIRST_MOBILE = { x: 100, y: 100 };
const PLACED_MARKER_SECOND_MOBILE = { x: 120, y: 100 };

test("loads map with no placed markers by default", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const markers = await page.locator('[data-testid*="placed-"]').all();

  expect(markers.length).toBe(0);
});

test("creates a placed marker when the map is clicked/long-pressed", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const markers = page.locator('[data-testid*="placed-"]');

  expect(await markers.count()).toBe(0);

  // Place a marker
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

  expect(await markers.count()).toBe(1);

  await waitForMapTilesToLoad(page);

  // Screenshot the map with a placed marker on it
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("creates two placed markers when the map is used at two different locations", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const markers = page.locator('[data-testid*="placed-"]');

  expect(await markers.count()).toBe(0);

  // Place a marker
  const map = page.locator("#map");
  if (IS_MOBILE) {
    await longPressContextMenu(
      page,
      PLACED_MARKER_FIRST_MOBILE,
      1000,
      isPixel7(testInfo.project.name),
    );
  } else {
    await map.click({ position: PLACED_MARKER_FIRST_DESKTOP });
  }

  expect(await markers.count()).toBe(1);

  // Place another marker
  if (IS_MOBILE) {
    await longPressContextMenu(
      page,
      PLACED_MARKER_SECOND_MOBILE,
      1000,
      isPixel7(testInfo.project.name),
    );
  } else {
    await map.click({ position: PLACED_MARKER_SECOND_DESKTOP });
  }

  expect(await markers.count()).toBe(2);

  // Screenshot the map with two placed markers on it
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("creates a popup when a placed marker is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const markers = page.locator('[data-testid*="placed-"]');
  const popup = page.locator(".leaflet-popup");

  expect(await markers.count()).toBe(0);
  await expect(popup).not.toBeVisible();

  // Placed a marker
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

  expect(await markers.count()).toBe(1);

  // Click the marker
  const allMarkerEles = await markers.all();
  await allMarkerEles[0].click();

  // Expect for popup to appear with expected content
  await expect(popup).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Placed Marker/i }),
  ).toBeVisible();
  await expect(page.getByText(/Latitude:/i)).toBeVisible();
  await expect(page.getByText(/Longitude:/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /nav/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /share/i })).toBeVisible();
  await expect(page.getByTestId("delete-placed-marker-btn")).toBeVisible();
});

test("deletes a marker when the marker delete button is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const markers = page.locator('[data-testid*="placed-"]');
  const popup = page.locator(".leaflet-popup");

  expect(await markers.count()).toBe(0);
  await expect(popup).not.toBeVisible();

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

  expect(await markers.count()).toBe(1);

  // Click the marker
  const allMarkerEles = await markers.all();
  await allMarkerEles[0].click();

  // Expect for popup to appear with expected content
  await expect(popup).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Placed Marker/i }),
  ).toBeVisible();

  // Click the delete button
  await page.getByTestId("delete-placed-marker-btn").click();

  // Expect marker to be gone
  expect(await markers.count()).toBe(0);
  await expect(popup).not.toBeVisible();
});
