import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import stylelint from "vite-plugin-stylelint";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_ROOT_PATH ?? "/",
    server: {
      host: "0.0.0.0",
      port: Number(env.PORT) || 5173,
    },
    build: {
      rollupOptions: {
        input: {
          landing: path.resolve(__dirname, "index.html"),
          main: path.resolve(__dirname, "map.html"),
        },
      },
    },
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
  };
});
