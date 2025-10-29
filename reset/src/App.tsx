import { ErrorBoundary } from "react-error-boundary";

import MapView from "./MapView";

export default function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <MapView />
    </ErrorBoundary>
  );
}
