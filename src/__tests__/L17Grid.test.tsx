import { render } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import L17Grid from "../components/s2/L17Grid";
import { CENTER } from "../constants";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <L17Grid />
    </MapContainer>
  );
}

test("loads <L17Grid> and matches snapshot", () => {
  const { asFragment } = render(<TestComponent />);

  expect(asFragment()).toMatchSnapshot();
});
