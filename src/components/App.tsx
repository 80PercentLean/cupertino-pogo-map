import { Toaster } from "@/components/ui/sonner";
import { MAP_PATH } from "@/constants";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router";

import BaseView from "./BaseView";
import InfoView from "./InfoView";
import SettingsView from "./SettingsView";
import ToolsView from "./Tools/ToolsView";

/**
 * Foundational component of the app that establishes the essentials for the component tree.
 */
export default function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <Toaster closeButton position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path={MAP_PATH} element={<BaseView />}>
            <Route path="info" element={<InfoView />} />
            <Route path="settings" element={<SettingsView />} />
            <Route path="tools" element={<ToolsView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
