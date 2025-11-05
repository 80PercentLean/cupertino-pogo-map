import { configDefaults, defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config.ts";

// https://vitest.dev/config/
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        enabled: true,
        reporter: ["html"],
      },
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "src/e2e/*"],
      include: [...configDefaults.include, "src/e2e/__tests__/*"],
      globals: true,
      setupFiles: ["./vitest-setup.ts"],
    },
  }),
);
