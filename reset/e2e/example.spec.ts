import { test, expect } from "@playwright/test";

const DEV_SERVER = "http://localhost:5173/";

test("has title", async ({ page }) => {
  await page.goto(DEV_SERVER);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Cupertino PoGO Map/i);
});
