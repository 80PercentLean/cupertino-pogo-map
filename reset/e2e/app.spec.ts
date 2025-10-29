import { expect, test } from "@playwright/test";

import { DEV_SERVER } from "./constants";

test("has title", async ({ page }) => {
  await page.goto(DEV_SERVER);

  await expect(page).toHaveTitle(/Cupertino PoGO Map/i);
});
