import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { isMobileProject } from "./util";

test("shows legend in default view", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    // Open the legend since it is closed by default
    await page.getByRole("button", { name: "Legend" }).click();
  }

  await expect(page.getByTestId("legend")).toBeVisible();
});
