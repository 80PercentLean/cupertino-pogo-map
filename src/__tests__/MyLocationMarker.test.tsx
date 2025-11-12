import { render, screen } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import MyLocationMarker from "../components/MyLocationMarker";
import { CENTER } from "../constants";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyLocationMarker data-testid="live-location-marker" />
    </MapContainer>
  );
}

// Geolocation API is not available in the jsdom environment
test("does not properly load <MyLocationMarker> when Geolocation API is not available", () => {
  render(<TestComponent />);

  expect(screen.queryByTestId("live-location-marker")).not.toBeInTheDocument();
});
