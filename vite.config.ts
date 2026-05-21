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
        if (ctx.filename.endsWith("/index.html")) {
          return html.replace(
            "__TITLE__",
            env.VITE_IS_CENTRAL === "true"
              ? "Wild Goose | Pokémon GO Community in Santa Clara, California"
              : "Cupertino PoGO | Pokémon GO Community in Cupertino, California",
          );
        }

        if (ctx.filename.endsWith("/map.html")) {
          return html.replace(
            "__TITLE__",
            env.VITE_IS_CENTRAL === "true"
              ? "Wild Goose Map | Directions & Free Parking for Pokémon GO at Santa Clara Central Park"
              : "Cupertino PoGO Map | Directions & Free Parking for Pokémon GO at Memorial Park & De Anza College",
          );
        }

        return html;
      },
    };
  };

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
      htmlTitlePlugin(),
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
