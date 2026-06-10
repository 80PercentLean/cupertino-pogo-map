import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { isMobileProject, waitForMapTilesToLoad } from "./util";

const POI_ID_A = "d9503dbb79bd3cac975ba3745bb01430.16";
const POI_NAME_A = "De Anza Bike Route";

const POI_ID_B = "288a4a15a212419a8c1ba425a26d4096.12";
const POI_NAME_B = "Euphrat Museum of Art";

const EMPTY_CLICK_DESKTOP = { x: 970, y: 500 };
const EMPTY_CLICK_MOBILE = { x: 340, y: 400 };

test("creates a popup when a marker is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const popup = page.locator(".leaflet-popup");

  // Expect popup to not be visible by default
  await expect(popup).not.toBeVisible();

  // Click on "De Anza Bike Route" marker
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

  // Click on "De Anza Bike Route" marker
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

  // Click on "De Anza Bike Route" marker
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
