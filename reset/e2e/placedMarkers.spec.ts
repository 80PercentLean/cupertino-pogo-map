import { expect, test } from "@playwright/test";

import { DEV_SERVER } from "./constants";

test("loads map with no placed markers by default", async ({ page }) => {
  await page.goto(DEV_SERVER, { waitUntil: "networkidle" });

  let markers = await page.locator('[data-testid*="placed-"]').all();

  expect(markers.length).toBe(0);
});

test("creates a placed marker when the map is clicked", async ({ page }) => {
  await page.goto(DEV_SERVER, { waitUntil: "networkidle" });

  let markers = await page.locator('[data-testid*="placed-"]').all();

  expect(markers.length).toBe(0);

  // Click the map to place a marker
  await page.locator("#map").click({ position: { x: 100, y: 100 } });

  markers = await page.locator('[data-testid*="placed-"]').all();
  expect(markers.length).toBe(1);
});

test("creates two placed markers when the map is clicked at two different locations", async ({
  page,
}) => {
  await page.goto(DEV_SERVER, { waitUntil: "networkidle" });

  let markers = await page.locator('[data-testid*="placed-"]').all();

  expect(markers.length).toBe(0);

  // Click the map to place a marker
  await page.locator("#map").click({ position: { x: 100, y: 100 } });

  markers = await page.locator('[data-testid*="placed-"]').all();
  expect(markers.length).toBe(1);

  // Click the map to place another marker
  await page.locator("#map").click({ position: { x: 200, y: 200 } });

  markers = await page.locator('[data-testid*="placed-"]').all();
  expect(markers.length).toBe(2);
});

test("creates a popup when a placed marker is clicked", async ({ page }) => {
  await page.goto(DEV_SERVER, { waitUntil: "networkidle" });

  let markers = await page.locator('[data-testid*="placed-"]').all();
  let popups = await page.locator(".leaflet-popup").all();

  expect(markers.length).toBe(0);
  expect(popups.length).toBe(0);

  // Click the map to place a marker
  await page.locator("#map").click({ position: { x: 200, y: 200 } });

  markers = await page.locator('[data-testid*="placed-"]').all();
  expect(markers.length).toBe(1);

  // Click the marker
  await markers[0].click();

  popups = await page.locator(".leaflet-popup").all();
  expect(popups.length).toBe(1);
});

test("deletes a marker when the marker delete button is clicked", async ({
  page,
}) => {
  await page.goto(DEV_SERVER, { waitUntil: "networkidle" });

  let markers = await page.locator('[data-testid*="placed-"]').all();
  let popups = await page.locator(".leaflet-popup").all();

  expect(markers.length).toBe(0);
  expect(popups.length).toBe(0);

  // Click the map to place a marker
  await page.locator("#map").click({ position: { x: 200, y: 200 } });

  markers = await page.locator('[data-testid*="placed-"]').all();
  expect(markers.length).toBe(1);

  // Click the marker
  await markers[0].click();

  popups = await page.locator(".leaflet-popup").all();
  expect(popups.length).toBe(1);

  // Click the delete button
  await page.getByTestId("delete-placed-marker-btn").click();
  await page.waitForTimeout(500); // wait for popup delete animation to end

  markers = await page.locator('[data-testid*="placed-"]').all();
  popups = await page.locator(".leaflet-popup").all();

  expect(markers.length).toBe(0);
  expect(popups.length).toBe(0);
});
