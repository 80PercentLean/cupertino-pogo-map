import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { type Plugin, defineConfig, loadEnv } from "vite";
import stylelint from "vite-plugin-stylelint";

/**
 * Installs the Google tag for Google Analytics.
 * @param measurementId The Google Analytics measurement ID
 * @returns The markup for the Google tag
 */
export const createGtag = (measurementId: string) => `
  <!-- Google tag (gtag.js) -->
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"
  ></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "${measurementId}");
  </script>
`;

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  /**
   * Custom Vite plugin that changes the content of the HTML files depending on conditions.
   */
  const htmlTitlePlugin: () => Plugin = () => {
    return {
      name: "html-transform",
      transformIndexHtml(html, ctx) {
        let transformedHtml;

        // Set favicon
        transformedHtml = html.replace(
          "__FAVICON__",
          env.VITE_IS_CENTRAL === "true" ? "/wg-favicon.png" : "/vite.svg",
        );

        // Set Google Analytics tag
        transformedHtml = transformedHtml.replace(
          "__GTAG__",
          env.VITE_GA_MEASUREMENT_ID
            ? createGtag(env.VITE_GA_MEASUREMENT_ID)
            : "",
        );

        const GROUP_NAME =
          env.VITE_IS_CENTRAL === "true" ? "Wild Goose" : "Cupertino PoGO";

        if (ctx.filename.endsWith("/index.html")) {
          // Set doc title for landing
          const CITY =
            env.VITE_IS_CENTRAL === "true" ? "Santa Clara" : "Cupertino";

          transformedHtml = transformedHtml.replace(
            "__TITLE__",
            `${GROUP_NAME} | Pokémon GO Community in ${CITY}, California`,
          );

          return transformedHtml;
        }

        if (ctx.filename.endsWith("/map.html")) {
          // Set doc title for map
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
