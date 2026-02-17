import { render } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import { CENTER_CUP } from "../../../constants";
import DevPois from "../DevPois";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER_CUP} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DevPois />
    </MapContainer>
  );
}

test("matches <DevPois> default snapshot", () => {
  const { asFragment } = render(<TestComponent />);

  expect(asFragment()).toMatchSnapshot();
});
