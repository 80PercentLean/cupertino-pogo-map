import type { LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

import L14Grid from "./L14Grid";
import L17Grid from "./L17Grid";
import LiveLocationMarker from "./LiveLocationMarker";
import { isMobile } from "./util";

const CENTER: LatLngExpression = [37.32185397836693, -122.0448660850525];
const IS_MOBILE = isMobile();
const BOUNDARIES: LatLngBoundsExpression = [
  [37.33363, -122.038076],
  [37.310094, -122.049996],
];

export default function MapView() {
  return (
    <MapContainer
      id="map"
      center={CENTER}
      maxBounds={BOUNDARIES}
      minZoom={15}
      scrollWheelZoom={!IS_MOBILE}
      zoom={16}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Regular" checked>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxNativeZoom={18}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            maxNativeZoom={18}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="S2 Cells (L17)">
          <L17Grid />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="S2 Cells (L14)">
          <L14Grid />
        </LayersControl.Overlay>
      </LayersControl>
      <LiveLocationMarker data-testid="marker-live-location" />
    </MapContainer>
  );
}
