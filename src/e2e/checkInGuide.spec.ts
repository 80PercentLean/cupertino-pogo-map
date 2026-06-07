import { expect, test } from "@playwright/test";

test("has title", async ({ page }, { project }) => {
  await page.goto("/checkin");

  await expect(page).toHaveTitle(
    new RegExp(
      `${project.metadata.GROUP_NAME} | How To Check Into Meetups`,
      "i",
    ),
  );
});

test("shows expected default view", async ({ page }) => {
  await page.goto("/checkin", { waitUntil: "networkidle" });

  await expect(page).toHaveScreenshot("check-in-guide-viewport.png", {
    maxDiffPixelRatio: 0.0001,
  });
  await expect(page).toHaveScreenshot("check-in-guide-full.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.001,
  });
});
