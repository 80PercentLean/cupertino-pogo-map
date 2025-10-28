import type { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

import LiveLocationMarker from "./LiveLocationMarker";

const CENTER: LatLngExpression = [37.32185397836693, -122.0448660850525];

export default function MapView() {
  return (
    <MapContainer id="map" center={CENTER} scrollWheelZoom={false} zoom={16}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LiveLocationMarker data-testid="marker-live-location" />
    </MapContainer>
  );
}
