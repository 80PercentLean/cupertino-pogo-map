import { render, screen } from "@testing-library/react";
import { MapContainer, TileLayer } from "react-leaflet";

import { CENTER_CUP } from "../../constants";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

async function renderTestComponent() {
  const { default: Labels } = await import("@/components/Labels");

  return render(
    <MapContainer id="map" center={CENTER_CUP} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Labels />
    </MapContainer>,
  );
}

test("matches <Labels> default snapshot when VITE_IS_CENTRAL is false", async () => {
  vi.stubEnv("VITE_IS_CENTRAL", "false");

  const { asFragment } = await renderTestComponent();

  expect(screen.getByTestId("label-mp")).toBeInTheDocument();
  expect(screen.getByTestId("label-da")).toBeInTheDocument();

  expect(asFragment()).toMatchSnapshot();
});

test("matches <Labels> default snapshot when VITE_IS_CENTRAL is true", async () => {
  vi.stubEnv("VITE_IS_CENTRAL", "true");

  const { asFragment } = await renderTestComponent();

  expect(screen.getByTestId("label-central")).toBeInTheDocument();

  expect(asFragment()).toMatchSnapshot();
});
