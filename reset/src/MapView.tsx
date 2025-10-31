import type { LatLngBoundsExpression } from "leaflet";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

import DevPois from "./DevPois";
import Gyms from "./Gyms";
import L14Grid from "./L14Grid";
import L17Grid from "./L17Grid";
import LiveLocationMarker from "./LiveLocationMarker";
import PokeStops from "./PokeStops";
import PowerSpots from "./PowerSpots";
import { CENTER } from "./constants";
import { isMobile } from "./util";

const IS_MOBILE = isMobile();
const BOUNDARIES: LatLngBoundsExpression = [
  [37.3328, -122.0554],
  [37.3107, -122.0326],
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
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Default" checked>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://www.openstreetmap.cat" target="_blank">Breton OpenStreetMap Team</a>'
            url="https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png'"
            maxNativeZoom={18}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Extra Info">
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
        <LayersControl.Overlay name="PokéStops" checked>
          <PokeStops />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Gyms" checked>
          <Gyms />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Power Spots">
          <PowerSpots />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="TBD">
          <DevPois />
        </LayersControl.Overlay>
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
