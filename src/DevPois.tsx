import type { GeoJSON as GeoJSONType } from "geojson";
import L from "leaflet";
import { GeoJSON } from "react-leaflet";

import devpois from "./geojson/devpois.geojson?raw";
import { iconDev } from "./leafletIcons";
import type { PoiFeature } from "./types";

const devpoisJson = JSON.parse(devpois) as GeoJSONType;

export default function DevPois() {
  return (
    <GeoJSON
      data={devpoisJson}
      filter={(feature) => {
        const poiFeature = feature as PoiFeature;
        if (poiFeature.properties.removed) {
          return false;
        }
        return true;
      }}
      pointToLayer={({ properties }, latlng) => {
        const poiProperties = properties as PoiFeature["properties"];
        const marker = L.marker(latlng, { icon: iconDev }).bindPopup(
          `Wayfarer Submission: ${poiProperties.name}`,
        );

        return marker;
      }}
    />
  );
}
