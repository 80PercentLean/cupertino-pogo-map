import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";

test("opens meetups view when meetup button is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect meetups view to be closed
  await expect(
    page.getByRole("heading", { name: "Campfire Meetups" }),
  ).not.toBeVisible();

  await page.getByRole("button", { name: /Meetups/i }).click();

  // Expect meetups view to be open
  await expect(
    page.getByRole("heading", { name: "Campfire Meetups" }),
  ).toBeVisible();
});

test("closes meetups view when the close button is used", async ({ page }) => {
  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  // Expect meetups view to be closed
  await expect(
    page.getByRole("heading", { name: "Campfire Meetups" }),
  ).not.toBeVisible();

  await page.getByRole("button", { name: /Meetups/i }).click();

  // Expect meetups view to be open
  await expect(
    page.getByRole("heading", { name: "Campfire Meetups" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Close meetups view" }).click();

  // Expect meetups view to be closed again
  await expect(
    page.getByRole("heading", { name: "Campfire Meetups" }),
  ).not.toBeVisible();
});

test("starts app with meetups view open when start param is set to it", async ({
  page,
}) => {
  await page.goto("/map?start=meetups", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", { name: "Campfire Meetups" }),
  ).toBeVisible();
});
