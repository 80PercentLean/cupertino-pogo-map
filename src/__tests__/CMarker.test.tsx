import { render, screen } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import CMarker from "../CMarker";
import { CENTER } from "../constants";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER} zoom={16}>
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
