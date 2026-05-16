/**
 * Entry point for the app.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App.tsx";
import "./index.css";
import "./setupLeaflet.ts";

if (import.meta.env.VITE_E2E === "true") {
  console.log("App is running in E2E testing mode.", import.meta.env.VITE_E2E);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
