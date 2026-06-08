import { defineConfig, devices } from "@playwright/test";

const BASE_URL_CUP_POGO = "http://localhost:8787";
const BASE_URL_WG = "http://localhost:8788";
const METADATA_CUP_POGO = {
  CITY: "Cupertino",
  GROUP_NAME: "Cupertino Pogo",
  LOCATION: "Cupertino Memorial Park & De Anza College",
};
const METADATA_WG = {
  CITY: "Santa Clara",
  GROUP_NAME: "Wild Goose",
  LOCATION: "Santa Clara Central Park",
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./src/e2e",
  testIgnore: ["__tests__/**"],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: BASE_URL_CUP_POGO, // Default to cup-pogo build

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium-cup-pogo",
      use: { ...devices["Desktop Chrome"], baseURL: BASE_URL_CUP_POGO },
      testIgnore: ["**/*.wg.spec.ts", "**/*.mobile.spec.ts"],
      metadata: METADATA_CUP_POGO,
    },

    {
      name: "chromium-wg",
      use: { ...devices["Desktop Chrome"], baseURL: BASE_URL_WG },
      testIgnore: ["**/*.cup-pogo.spec.ts", "**/*.mobile.spec.ts"],
      metadata: METADATA_WG,
    },

    {
      name: "firefox-cup-pogo",
      use: { ...devices["Desktop Firefox"], baseURL: BASE_URL_CUP_POGO },
      testIgnore: ["**/*.wg.spec.ts", "**/*.mobile.spec.ts"],
      metadata: METADATA_CUP_POGO,
    },

    {
      name: "firefox-wg",
      use: { ...devices["Desktop Firefox"], baseURL: BASE_URL_WG },
      testIgnore: ["**/*.cup-pogo.spec.ts", "**/*.mobile.spec.ts"],
      metadata: METADATA_WG,
    },

    {
      name: "pixel7-cup-pogo",
      use: { ...devices["Pixel 7"], baseURL: BASE_URL_CUP_POGO },
      testIgnore: ["**/*.wg.spec.ts", "**/*.wg.mobile.spec.ts"],
      metadata: METADATA_CUP_POGO,
    },

    {
      name: "pixel7-wg",
      use: { ...devices["Pixel 7"], baseURL: BASE_URL_WG },
      testIgnore: ["**/*.cup-pogo.spec.ts", "**/*.cup-pogo.mobile.spec.ts"],
      metadata: METADATA_WG,
    },

    {
      name: "iphone15-cup-pogo",
      use: {
        ...devices["iPhone 15"],
        baseURL: BASE_URL_CUP_POGO,
        browserName: "chromium", // TODO: remove this when Safari testing is setup
      },
      testIgnore: ["**/*.wg.spec.ts", "**/*.wg.mobile.spec.ts"],
      metadata: METADATA_CUP_POGO,
    },

    {
      name: "iphone15-wg",
      use: {
        ...devices["iPhone 15"],
        baseURL: BASE_URL_WG,
        browserName: "chromium", // TODO: remove this when Safari testing is setup
      },
      testIgnore: ["**/*.cup-pogo.spec.ts", "**/*.cup-pogo.mobile.spec.ts"],
      metadata: METADATA_WG,
    },

    // TODO: enable this when Safari testing setup
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: "npm run dev:cup-pogo:e2e",
      url: "http://localhost:8787",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev:wg:e2e",
      url: "http://localhost:8788",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
