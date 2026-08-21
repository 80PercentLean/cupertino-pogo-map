# Working With Tests

## Unit & Integration Tests With Vitest

### Vitest `package.json` Scripts

[Vitest](https://vitest.dev) can run as soon as you install the project dependencies using `npm install`.

Here are the [package.json](../package.json) scripts that involve Vitest:

- `test`: Run Vitest
- `test:coverage`: Generate [code coverage](https://vitest.dev/guide/coverage.html)
- `test:dev`: Run Vitest in [UI mode](https://vitest.dev/guide/ui.html)
- `test:watch`: [Watch for changes with Vitest](https://vitest.dev/guide/cli.html#vitest-watch) and rerun tests when they change

### Working With MSW

[Mock Service Worker (MSW)](https://mswjs.io) is setup in [`src/mocks/`](../src/mocks/). There you can mock fetch requests in tests and the build when it is running in development mode.

## End-To-End Tests With Playwright

### Setup

In order for [Playwright](https://playwright.dev) to work, an additional command needs to be run after following the ["Quick Start" section in the README](../README.md#quick-start).

You must run the following command to download new browsers required for Playwright to run:

```shell
npx playwright install
```

### Playwright `package.json` Scripts

Here are the [package.json](../package.json) scripts that involve Playwright:

- `test:e2e`: Run Playwright
- `test:e2e:dev`: Run Playwright in [UI mode](https://playwright.dev/docs/test-ui-mode)
- `test:e2e:report`: Open the last run [Playwright test report](https://playwright.dev/docs/test-reporters)

### End-To-End Testing Mode

Playwright has been configured to enable the `VITE_E2E` environment variable which runs the app in E2E testing mode which reduces the chance of E2E tests incorrectly failing.

For example, many of our Playwright tests use [visual comparisons](https://playwright.dev/docs/test-snapshots) which involve taking and diffing screenshots. Animations like the ants on the raid path can cause them to fail, so when the app is in E2E testing mode, it will disable animations in the settings by default.

## Fixtures

Fixtures for dummy data used throughout all tests can be found in [`/src/fixtures/`](../src/fixtures).
