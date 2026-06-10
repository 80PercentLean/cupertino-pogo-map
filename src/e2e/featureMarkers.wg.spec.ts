import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { isMobileProject, waitForMapTilesToLoad } from "./util";

const POI_ID_A = "1e1fea3c8b1e40108e5103efa0b1ea9e.16";
const POI_NAME_A = "Central Park Pavilion";

const POI_ID_B = "90004617204d496ea8075de605bda492.12";
const POI_NAME_B = "Santa Clara City Library";

const EMPTY_CLICK_DESKTOP = { x: 970, y: 470 };
const EMPTY_CLICK_MOBILE = { x: 320, y: 320 };

test("creates a popup when a marker is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const popup = page.locator(".leaflet-popup");

  // Expect popup to not be visible by default
  await expect(popup).not.toBeVisible();

  // Click on "Central Park Pavilion" marker
  await page.getByTestId(POI_ID_A).click();

  // Wait for popup to appear
  await expect(popup).toBeVisible();

  // Check that the popup has the expected content
  await expect(page.getByRole("heading", { name: POI_NAME_A })).toBeVisible();
  await expect(page.getByRole("link", { name: "Nav" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Share" })).toBeVisible();

  await waitForMapTilesToLoad(page);

  // Screenshot popup
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });
});

test("closes the popup when a popup when the close button is used", async ({
  page,
}) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const popup = page.locator(".leaflet-popup");

  // Click on "Central Park Pavilion" marker
  await page.getByTestId(POI_ID_A).click();

  // Wait for popup to appear
  const heading = page.getByRole("heading", { name: POI_NAME_A });
  await expect(popup).toBeVisible();
  await expect(heading).toBeVisible();

  // Click on close popup button
  await page.getByRole("button", { name: "Close popup" }).click();

  // Expect popup to be closed
  await expect(popup).not.toBeVisible();
  await expect(heading).not.toBeVisible();
});

test("closes the popup when an empty area of the map is clicked/tapped", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const popup = page.locator(".leaflet-popup");

  // Click on "Central Park Pavilion" marker
  await page.getByTestId(POI_ID_A).click();

  // Wait for popup to appear
  const heading = page.getByRole("heading", { name: POI_NAME_A });
  await expect(popup).toBeVisible();
  await expect(heading).toBeVisible();

  // Click on an empty area of the map
  const map = page.locator("#map");
  if (IS_MOBILE) {
    await map.click({ position: EMPTY_CLICK_MOBILE });
  } else {
    await map.click({ position: EMPTY_CLICK_DESKTOP });
  }

  // Expect popup to be closed
  await expect(popup).not.toBeVisible();
  await expect(heading).not.toBeVisible();
});

test("closes the popup when a different marker is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const popup = page.locator(".leaflet-popup");

  // Click on first marker
  await page.getByTestId(POI_ID_A).click();

  // Wait for popup to appear
  const headingA = page.getByRole("heading", { name: POI_NAME_A });
  await expect(popup).toBeVisible();
  await expect(headingA).toBeVisible();

  // Click on different marker
  await page.getByTestId(POI_ID_B).click();

  // Expect previous popup to be closed
  await expect(headingA).not.toBeVisible();
  await page.waitForTimeout(500); // wait for first popup close animation to end

  // Expect popup to still be found since a second one should have opened
  await expect(page.getByRole("heading", { name: POI_NAME_B })).toBeVisible();
  await expect(popup).toBeVisible();
});
