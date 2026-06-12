import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";

test("map view button closes all open views/overlays", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const list = page.getByTestId("list-view");
  const listViewBtn = page.getByRole("button", { name: /List View/i });
  const mapViewBtn = page.getByRole("button", { name: /Map View/i });
  const meetupsViewBtn = page.getByRole("button", { name: /Meetups/i });
  const meetupsViewHeading = page.getByRole("heading", {
    name: "Campfire Meetups",
  });
  const settingsViewBtn = page.getByRole("button", { name: /Settings/i });
  const settingsViewHeading = page.getByRole("heading", { name: /Settings/i });
  const infoViewBtn = page.getByRole("button", { name: /Info/i });
  const infoViewHeading = page.getByRole("heading", { name: /Information/i });
  const layersBtn = page.getByRole("button", { name: /Open Layers/i });
  const layersHeading = page.getByRole("heading", { name: /Layers/i });

  // Expect all views/overlays to be closed
  await expect(list).not.toBeVisible();
  await expect(meetupsViewHeading).not.toBeVisible();
  await expect(settingsViewHeading).not.toBeVisible();
  await expect(infoViewHeading).not.toBeVisible();
  await expect(layersHeading).not.toBeVisible();

  // List view test
  await listViewBtn.click();
  await expect(list).toBeVisible();

  await mapViewBtn.click();
  await expect(list).not.toBeVisible();

  // Meetups view test
  await meetupsViewBtn.click();
  await expect(meetupsViewHeading).toBeVisible();

  await mapViewBtn.click();
  await expect(meetupsViewHeading).not.toBeVisible();

  // Settings view test
  await settingsViewBtn.click();
  await expect(settingsViewHeading).toBeVisible();

  await mapViewBtn.click();
  await expect(settingsViewHeading).not.toBeVisible();

  // Info view test
  await infoViewBtn.click();
  await expect(infoViewHeading).toBeVisible();

  await mapViewBtn.click();
  await expect(infoViewHeading).not.toBeVisible();

  // Layers overlay test
  await layersBtn.click();
  await expect(layersHeading).toBeVisible();

  await mapViewBtn.click();
  await expect(layersHeading).not.toBeVisible();
});
