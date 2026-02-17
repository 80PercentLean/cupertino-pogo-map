import { render, screen } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import { CENTER_CUP } from "../../constants";
import CMarker from "../CMarker";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER_CUP} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CMarker position={CENTER_CUP} data-testid="marker" />
    </MapContainer>
  );
}

test("matches <CMarker> default snapshot", () => {
  const { asFragment } = render(<TestComponent />);

  expect(asFragment()).toMatchSnapshot();
});

test("loads <CMarker>", () => {
  render(<TestComponent />);

  expect(screen.getByTestId("marker")).toBeInTheDocument();
});
