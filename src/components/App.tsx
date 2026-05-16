import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router";

import BaseView from "./BaseView";

const queryClient = new QueryClient();

/**
 * Foundational component of the app that establishes the essentials for the component tree.
 */
export default function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <QueryClientProvider client={queryClient}>
        <Toaster closeButton position="top-center" />
        <BrowserRouter>
          <BaseView />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
