import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import stylelint from "vite-plugin-stylelint";

import { ROOT_PATH } from "./src/constants";

// https://vite.dev/config/
export default defineConfig({
  base: ROOT_PATH,
  server: { host: "0.0.0.0" },
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
    stylelint(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
