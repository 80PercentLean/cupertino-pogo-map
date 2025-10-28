import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "cupertino-pogo-map",
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
});
