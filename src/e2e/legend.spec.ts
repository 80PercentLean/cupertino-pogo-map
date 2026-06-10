import { expect, test } from "@playwright/test";

test("shows legend in default view", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  await expect(page.getByTestId("legend")).toBeVisible();
});
