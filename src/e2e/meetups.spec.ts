import { expect, test } from "@playwright/test";

test("opens meetups view when meetup button is used", async ({ page }) => {
  await page.goto("/map", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", { name: "Campfire Meetups" }),
  ).not.toBeVisible();

  await page.getByRole("button", { name: /Meetups/i }).click();

  await expect(
    page.getByRole("heading", { name: "Campfire Meetups" }),
  ).toBeVisible();
});

test("starts app with meetups view open when start param is set to it", async ({
  page,
}) => {
  await page.goto("/map?start=meetups", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", { name: "Campfire Meetups" }),
  ).toBeVisible();
});
