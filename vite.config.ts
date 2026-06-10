import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { type Plugin, defineConfig, loadEnv } from "vite";
import stylelint from "vite-plugin-stylelint";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  /**
   * Custom Vite plugin that changes the titles of the HTML files depending on conditions.
   */
  const htmlTitlePlugin: () => Plugin = () => {
    return {
      name: "html-transform",
      transformIndexHtml(html, ctx) {
        let transformedHtml;
        transformedHtml = html.replace(
          "__FAVICON__",
          env.VITE_IS_CENTRAL === "true" ? "/wg-favicon.png" : "/vite.svg",
        );

        const GROUP_NAME =
          env.VITE_IS_CENTRAL === "true" ? "Wild Goose" : "Cupertino PoGO";

        if (ctx.filename.endsWith("/index.html")) {
          const CITY =
            env.VITE_IS_CENTRAL === "true" ? "Santa Clara" : "Cupertino";

          transformedHtml = transformedHtml.replace(
            "__TITLE__",
            `${GROUP_NAME} | Pokémon GO Community in ${CITY}, California`,
          );

          return transformedHtml;
        }

        if (ctx.filename.endsWith("/map.html")) {
          const MAP_NAME =
            env.VITE_IS_CENTRAL === "true"
              ? "Wild Goose Map"
              : "Cupertino PoGO Map";
          const LOCATION =
            env.VITE_IS_CENTRAL === "true"
              ? "Santa Clara Central Park"
              : "Cupertino Memorial Park & De Anza College";

          transformedHtml = transformedHtml.replace(
            "__TITLE__",
            `${MAP_NAME} | Directions & Free Parking for Pokémon GO at ${LOCATION}`,
          );

          return transformedHtml;
        }

        return transformedHtml;
      },
    };
  };

  const plugins = [
    htmlTitlePlugin(),
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
    stylelint(),
  ];

  if (!env.VITE_E2E) {
    // Only include Cloudflare Vite plugin when not running in E2E mode
    // since it causes issues there
    plugins.push(cloudflare());
  }

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
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
