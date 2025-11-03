import L from "leaflet";
import { GeoJSON } from "react-leaflet";

import devpois from "./geojson/devpois.geojson?raw";
import { iconDev } from "./leafletIcons";

const devpoisJson = JSON.parse(devpois);

export default function DevPois() {
  return (
    <GeoJSON
      data={devpoisJson}
      filter={(feature) => {
        if (feature.properties.removed) {
          return false;
        }
        return true;
      }}
      pointToLayer={({ properties }, latlng) => {
        const marker = L.marker(latlng, { icon: iconDev }).bindPopup(
          `Wayfarer Submission: ${properties.name}`,
        );

        return marker;
      }}
    />
  );
}
