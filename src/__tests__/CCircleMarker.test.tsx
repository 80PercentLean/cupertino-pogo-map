import { render, screen } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import CCircleMarker from "../components/CCircleMarker";
import { CENTER } from "../constants";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CCircleMarker center={CENTER} data-testid="circle-marker" />
    </MapContainer>
  );
}

test("loads <CCircleMarker>", () => {
  render(<TestComponent />);

  expect(screen.getByTestId("circle-marker")).toBeInTheDocument();
});

test("loads <CCircleMarker> and matches snapshot", () => {
  const { asFragment } = render(<TestComponent />);

  expect(asFragment()).toMatchSnapshot();
});
