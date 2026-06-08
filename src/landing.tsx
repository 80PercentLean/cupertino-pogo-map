/**
 * Entry point for the app.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import CheckInGuide from "./components/CheckInGuide";
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";
import Root from "./components/Root";
import ScrollToTop from "./components/ScrollToTop";
import { CHECK_IN_PATH, ROOT_PATH } from "./constants";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROOT_PATH || "/"} element={<Root />}>
          <Route index element={<Landing />} />
          <Route path="checkin" element={<CheckInGuide />} />
          <Route
            path="check-in"
            element={<Navigate to={CHECK_IN_PATH} replace />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
