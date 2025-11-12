import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router";

import BaseView from "./BaseView";
import InfoView from "./InfoView";
import SettingsView from "./SettingsView";

/**
 * Core component of the app that sets up error boundary and routing.
 */
export default function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <Toaster closeButton position="top-center" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="cupertino-pogo-map" element={<BaseView />}>
            <Route path="info" element={<InfoView />} />
            <Route path="settings" element={<SettingsView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
