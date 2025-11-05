import type { GeoJSON as GeoJSONType } from "geojson";
import L from "leaflet";

import Poi from "./Poi";
import devpois from "./geojson/devpois.geojson?raw";
import { iconDev } from "./leafletIcons";
import type { PoiFeature } from "./types";

const devpoisJson = JSON.parse(devpois) as GeoJSONType;

export default function DevPois() {
  return (
    <Poi
      data={devpoisJson}
      pointToLayer={({ properties }, latlng) => {
        const poiProperties = properties as PoiFeature["properties"];
        const marker = L.marker(latlng, { icon: iconDev }).bindPopup(
          `<b>Wayfarer Submission</b><br />
          ${poiProperties.name}`,
        );

        return marker;
      }}
    />
  );
}
