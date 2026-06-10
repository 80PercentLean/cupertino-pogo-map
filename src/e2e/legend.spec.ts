import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";

test("shows legend in default view", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await expect(page.getByTestId("legend")).toBeVisible();
});
