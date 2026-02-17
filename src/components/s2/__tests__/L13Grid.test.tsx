import { render } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import { CENTER_CUP } from "../../../constants";
import L13Grid from "../L13Grid";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER_CUP} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <L13Grid />
    </MapContainer>
  );
}

test("matches <L13Grid> the default snapshot", () => {
  const { asFragment } = render(<TestComponent />);

  expect(asFragment()).toMatchSnapshot();
});
