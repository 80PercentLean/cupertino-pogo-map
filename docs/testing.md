# Working With Tests

TODO:

## Unit & Integration Tests With Vitest

## End-To-End Tests With Playwright

### Setup

In order for Playwright to work, an additional command needs to be run after following the ["Quick Start" section in the README](../README.md#quick-start).

You must run the following command to download new browsers required for Playwright to run:

```shell
npx playwright install
```

### Reducing Flakiness Of Tests

When running end-to-end tests, you should enable `VITE_E2E` in your `.env` file. This runs the app in E2E testing mode which makes it run in a more consistent way to reduce the chance of the E2E tests to fail.

For example, many of our Playwright tests are visual comparisons which involve taking and diffing screenshots. Animations like the ants on the raid path can cause them to fail, so when the app is in E2E testing mode, it will automatically disable animations in the settings.
