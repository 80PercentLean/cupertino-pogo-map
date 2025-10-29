import { render, screen } from "@testing-library/react";
import type { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import CMarker from "../CMarker";

const CENTER: LatLngExpression = [37.32185397836693, -122.0448660850525];

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER} scrollWheelZoom={false} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CMarker position={CENTER} data-testid="marker" />
    </MapContainer>
  );
}

test("loads <CMarker>", () => {
  render(<TestComponent />);

  expect(screen.getByTestId("marker")).toBeInTheDocument();
});
