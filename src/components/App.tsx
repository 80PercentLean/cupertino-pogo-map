import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router";
import { toast } from "sonner";

import BaseView from "./BaseView";
import { useStore } from "./hooks/store";

/**
 * Foundational component of the app that establishes the essentials for the component tree.
 */
export default function App() {
  const initErrMSg = useStore((s) => s.initErrMsg);

  useEffect(() => {
    if (initErrMSg) {
      toast.error(initErrMSg);
    }
  }, [initErrMSg]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <Toaster closeButton position="top-center" />
      <BrowserRouter>
        <BaseView />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
