import MapView from "./MapView";
import TopBar from "./TopBar";
import { ErrorBoundary } from "react-error-boundary";

export default function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <TopBar />
      <MapView />
    </ErrorBoundary>
  );
}
