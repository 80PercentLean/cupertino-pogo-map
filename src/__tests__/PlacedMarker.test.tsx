import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MapContainer, TileLayer } from "react-leaflet";

import PlacedMarkers from "../PlacedMarkers";
import { CENTER } from "../constants";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER} zoom={16} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PlacedMarkers />
    </MapContainer>
  );
}

test("loads <PlacedMarkerers> which has no placed markers by default", () => {
  render(<TestComponent />);

  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});

test("creates a placed marker when the map is clicked", async () => {
  const user = userEvent.setup();

  const { container } = render(<TestComponent />);

  expect(screen.queryByRole("button")).not.toBeInTheDocument();

  const map = container.querySelector("#map");
  if (map === null) {
    throw new Error("Leaflet map not found");
  }

  // Click the map to place a marker
  await user.click(map);

  const markers = screen.queryAllByRole("button");

  expect(markers[0]).toBeInTheDocument();
  expect(markers).toHaveLength(1);
});
