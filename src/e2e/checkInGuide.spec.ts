import { expect, test } from "@playwright/test";

import { E2E_CHECK_IN_PATH } from "./constants";

test("has title", async ({ page }, { project }) => {
  await page.goto(E2E_CHECK_IN_PATH);

  await expect(page).toHaveTitle(
    new RegExp(
      `${project.metadata.GROUP_NAME} | How To Check Into Meetups`,
      "i",
    ),
  );
});

test("shows expected default view", async ({ page }) => {
  await page.goto(E2E_CHECK_IN_PATH, { waitUntil: "networkidle" });

  await expect(page).toHaveScreenshot("check-in-guide-viewport.png", {
    maxDiffPixelRatio: 0.0001,
  });
  await expect(page).toHaveScreenshot("check-in-guide-full.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.001,
  });
});

test("redirects to the checkin path from the check-in path", async ({
  page,
}) => {
  await page.goto("/check-in", { waitUntil: "networkidle" });

  await expect(page).toHaveURL(E2E_CHECK_IN_PATH);
});
