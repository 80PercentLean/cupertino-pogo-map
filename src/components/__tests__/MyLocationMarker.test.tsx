import { useStore } from "@/components/hooks/store";
import { render, screen } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import { CENTER } from "../../constants";
import MyLocationMarker from "../MyLocationMarker";

function TestComponent() {
  return (
    <MapContainer id="map" center={CENTER} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyLocationMarker data-testid="marker-my-location" />
    </MapContainer>
  );
}

describe("loads <MyLocationMarker> by default", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("does not render marker", () => {
    render(<TestComponent />);

    expect(screen.queryByTestId("marker-my-location")).not.toBeInTheDocument();
  });
});

describe("loads <MyLocationMarker> with set location", () => {
  it("matches snapshot", () => {
    useStore.setState({ myLocation: [1, 1] });

    const { asFragment } = render(<TestComponent />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders marker", () => {
    useStore.setState({ myLocation: [1, 1] });

    render(<TestComponent />);

    expect(screen.queryByTestId("marker-my-location")).toBeInTheDocument();
  });
});
