import L from "leaflet";
import { GeoJSON } from "react-leaflet";

import gyms from "./geojson/gyms.geojson?raw";
import { iconGym } from "./leafletIcons";

const gymsJson = JSON.parse(gyms);

export default function Gyms() {
  return (
    <GeoJSON
      data={gymsJson}
      filter={(feature) => {
        if (feature.properties.disabled) {
          return false;
        }
        return true;
      }}
      pointToLayer={({ properties }, latlng) => {
        const marker = L.marker(latlng, {
          icon: iconGym,
        }).bindPopup(`Gym: ${properties.name}`);

        return marker;
      }}
    />
  );
}
