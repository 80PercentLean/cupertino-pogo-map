import { expect, test } from "@playwright/test";

test("shows legend in default view", async ({ page }) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  await expect(page.getByTestId("legend")).toBeVisible();
});
