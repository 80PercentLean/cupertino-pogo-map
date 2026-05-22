/**
 * Entry point for the app.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App.tsx";
import "./index.css";
import "./setupLeaflet.ts";

const E2E = import.meta.env.VITE_E2E as string;

if (E2E === "true") {
  console.log("App is running in E2E testing mode.", E2E);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
