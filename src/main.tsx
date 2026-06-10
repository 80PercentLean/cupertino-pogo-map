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
  console.log("App is running in E2E testing mode");

  document.addEventListener("click", ({ clientX, clientY }) => {
    console.log("Clicked:", { clientX, clientY });
  });
}

async function enableMocking() {
  // @ts-expect-error process is not found, but this is only used for the dev server anyway
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking()
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  })
  .catch((err) => console.error(err));
