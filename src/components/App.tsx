import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router";

import BaseView from "./BaseView";

/**
 * Foundational component of the app that establishes the essentials for the component tree.
 */
export default function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <Toaster closeButton position="top-center" />
      <BrowserRouter>
        <BaseView />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
