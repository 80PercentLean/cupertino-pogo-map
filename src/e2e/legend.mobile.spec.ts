import { expect, test } from "@playwright/test";

import { waitForMapTilesToLoad } from "./util";

test("toggles the legend when the legend button is tapped", async ({
  page,
}) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const legend = page.getByTestId("legend");
  const legendButton = page.getByRole("button", { name: "Legend" });

  // Expect legend to be hidden
  await expect(legend).not.toBeVisible();

  await legendButton.click();

  // Expect legend to open
  await expect(legend).toBeVisible();

  await waitForMapTilesToLoad(page);

  // Screenshot the mobile map with the legend open
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0001 });

  await legendButton.click();

  // Expect legend to close
  await expect(legend).not.toBeVisible();
});
