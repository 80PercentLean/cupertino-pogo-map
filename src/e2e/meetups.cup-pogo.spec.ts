import { TEST_CUP_POGO_EVENTS } from "@/fixtures/goose-api";
import { expect, test } from "@playwright/test";

test("shows meetups when successful response is received", async ({ page }) => {
  await page.route(
    "http://localhost:9001/api/v1/events?filter=cup-pogo",
    async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(TEST_CUP_POGO_EVENTS),
      });
    },
  );

  await page.goto("/map?start=meetups", { waitUntil: "networkidle" });

  await expect(page.getByText(/First Friendship Friday/i)).toBeVisible();
  await expect(page.getByText(/Kartana Raid Hour/i)).not.toBeVisible();
});
