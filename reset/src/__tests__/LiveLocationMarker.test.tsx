import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "react-error-boundary";
import { MapContainer, TileLayer } from "react-leaflet";

import LiveLocationMarker from "../LiveLocationMarker";
import { CENTER } from "../constants";

function TestComponent() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong.</div>}>
      <MapContainer id="map" center={CENTER} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LiveLocationMarker data-testid="live-location-marker" />
      </MapContainer>
    </ErrorBoundary>
  );
}

// Geolocation API is not available in the jsdom environment
test("does not properly load <LiveLocationMarker> when Geolocation API is not available", () => {
  render(<TestComponent />);

  expect(screen.queryByTestId("live-location-marker")).not.toBeInTheDocument();
});
