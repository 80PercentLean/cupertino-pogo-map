import { render } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import PowerSpots from "../components/poi/PowerSpots";
import { CENTER } from "../constants";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PowerSpots />
    </MapContainer>
  );
}

test("loads <PowerSpots> and matches snapshot", () => {
  const { asFragment } = render(<TestComponent />);

  expect(asFragment()).toMatchSnapshot();
});
