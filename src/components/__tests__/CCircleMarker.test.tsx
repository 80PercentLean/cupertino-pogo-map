import { render, screen } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import { CENTER_CUP } from "../../constants";
import CCircleMarker from "../CCircleMarker";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER_CUP} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CCircleMarker center={CENTER_CUP} data-testid="circle-marker" />
    </MapContainer>
  );
}

test("matches <CCircleMarker> default snapshot", () => {
  const { asFragment } = render(<TestComponent />);

  expect(asFragment()).toMatchSnapshot();
});

test("loads <CCircleMarker>", () => {
  render(<TestComponent />);

  expect(screen.getByTestId("circle-marker")).toBeInTheDocument();
});
