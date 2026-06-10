import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { isMobileProject } from "./util";

test("list view button toggles the list view", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  const list = page.getByTestId("list-view");
  const listViewBtn = page.getByRole("button", { name: /List View/i });

  if (IS_MOBILE) {
    // Expect list to start as open on mobile
    await expect(list).not.toBeVisible();
  } else {
    // Expect list to start as open on desktop
    await expect(list).toBeVisible();
  }

  await listViewBtn.click();

  if (IS_MOBILE) {
    // Expect list to close on mobile
    await expect(list).toBeVisible();
  } else {
    // Expect list to start on desktop
    await expect(list).not.toBeVisible();
  }

  await listViewBtn.click();

  if (IS_MOBILE) {
    // Expect list to close again on mobile
    await expect(list).not.toBeVisible();
  } else {
    // Expect list to open again on desktop
    await expect(list).toBeVisible();
  }
});

test("shows empty message when search results to empty results", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 0;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  // Check that list is filled with items
  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  // Check that empty message is not present yet
  const emptyMsg = listItems.getByText(/No points of interest were found/i);
  await expect(emptyMsg).not.toBeVisible();

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("asdfz");

  await page.waitForTimeout(500); // wait for filter to occur

  // Check that empty message appeared
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
  await expect(emptyMsg).toBeVisible();
});

test("resets the search query when the clear search button is used", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  // Check that list is filled with items
  const listItems = page.getByTestId("list-view-items");
  const listStartCount = await listItems.getByRole("button").count();

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("asdfz");

  await page.waitForTimeout(500); // wait for filter to occur

  // Check that the list has been filtered
  expect(await listItems.getByRole("button").count()).toBeLessThan(
    listStartCount,
  );

  await page.getByRole("button", { name: "Clear search" }).click();

  await page.waitForTimeout(1000); // wait for list to reset

  // Check that the search bar is empty and the list has reset
  await expect(searchBar).toHaveValue("");
  expect(await listItems.getByRole("button").count()).toBe(listStartCount);
});
