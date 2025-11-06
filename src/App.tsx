import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router";

import BaseView from "./BaseView";
import InfoView from "./InfoView";

export default function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="cupertino-pogo-map" element={<BaseView />}>
            <Route path="info" element={<InfoView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
