import { expect, test } from "@playwright/test";

import { E2E_MAP_PATH } from "./constants";
import { isMobileProject } from "./util";

// TODO: recreate these tests for WG once WG has all POIs up-to-date
test("list view shows default layers on brand new load", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const list = page.getByTestId("list-view");
  await expect(list).toBeVisible();

  // Expect Gyms, PokeStops, meetup spots, parking, and restrooms to be visible
  const gyms = list.getByRole("button", { name: /Gym/i });
  expect(await gyms.count()).toBeGreaterThan(0);
  const pokestops = list.getByRole("button", { name: /PokéStop/i });
  expect(await pokestops.count()).toBeGreaterThan(0);
  const meetupspots = list.getByRole("button", { name: /Meetup Spot/i });
  expect(await meetupspots.count()).toBeGreaterThan(0);
  const parking = list.getByRole("button", { name: /Parking/i });
  expect(await parking.count()).toBeGreaterThan(0);
  const restrooms = list.getByRole("button", { name: /Restroom/i });
  expect(await restrooms.count()).toBeGreaterThan(0);

  // Expect only enabled power spots to be visible
  const powerspotsEnabled = list.getByRole("button", {
    name: /Power Spots \(Enabled\)/i,
  });
  expect(await powerspotsEnabled.count()).toBeGreaterThan(0);

  // Expect disabled & impossible power spots to be hidden
  const powerspotsImpossible = page.getByRole("button", {
    name: /Power Spots \(Impossible\)/i,
  });
  expect(await powerspotsImpossible.count()).toBe(0);

  const powerspotsDisabled = page.getByRole("button", {
    name: /Power Spots \(Disabled\)/i,
  });
  expect(await powerspotsDisabled.count()).toBe(0);

  // Expect POIs in development to be hidden
  const devpois = page.getByRole("button", {
    name: /POIs In-Development/i,
  });
  expect(await devpois.count()).toBe(0);

  // Expect all removed POIs to be hidden
  const removedPois = page.getByRole("button", {
    name: /\(Removed\)/i,
  });
  expect(await removedPois.count()).toBe(0);
});

test("filters list when text is typed into search bar", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 21;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("cupertino");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'gym' keyword", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 16;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("gym");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'gyms' keyword", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 16;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("gyms");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'pokestop' keyword", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 90;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("pokestop");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'pokestops' keyword", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 90;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("pokestops");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'powerspot' keyword", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 41;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("powerspot");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'powerspots' keyword", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 41;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("powerspots");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'meetupspot' keyword", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 3;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("meetupspot");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'meetupspots' keyword", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 3;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("meetupspots");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'restroom' keyword", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 42;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("restroom");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'restrooms' keyword", async ({ page }, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 42;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("restrooms");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});

test("search bar supports 'parking' semi-keyword", async ({
  page,
}, testInfo) => {
  const IS_MOBILE = isMobileProject(testInfo.project.name);
  const COUNT_TARGET = 19;

  await page.goto(E2E_MAP_PATH, { waitUntil: "networkidle" });

  if (IS_MOBILE) {
    await page.getByRole("button", { name: /List View/i }).click();
  }

  const listItems = page.getByTestId("list-view-items");
  expect(await listItems.getByRole("button").count()).toBeGreaterThan(
    COUNT_TARGET,
  );

  const searchBar = page.getByRole("textbox", {
    name: /Search for Gyms, PokéStops/i,
  });
  await searchBar.fill("parking");

  await page.waitForTimeout(500); // wait for filter to occur

  // Test that list items as been narrowed down
  expect(await listItems.getByRole("button").count()).toBe(COUNT_TARGET);
});
