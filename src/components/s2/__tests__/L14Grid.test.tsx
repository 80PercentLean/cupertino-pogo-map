import { render } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import { CENTER } from "../../../constants";
import L14Grid from "../L14Grid";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <L14Grid />
    </MapContainer>
  );
}

test("loads <L14Grid> and matches snapshot", () => {
  const { asFragment } = render(<TestComponent />);

  expect(asFragment()).toMatchSnapshot();
});
