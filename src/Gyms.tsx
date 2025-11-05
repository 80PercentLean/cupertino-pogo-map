import type { GeoJSON as GeoJSONType } from "geojson";
import L from "leaflet";
import { GeoJSON } from "react-leaflet";

import gyms from "./geojson/gyms.geojson?raw";
import { iconGym } from "./leafletIcons";

const gymsJson = JSON.parse(gyms) as GeoJSONType;

export default function Gyms() {
  return (
    <GeoJSON
      data={gymsJson}
      filter={(feature) => {
        if (feature.properties.removed) {
          return false;
        }
        return true;
      }}
      pointToLayer={({ properties }, latlng) => {
        const marker = L.marker(latlng, {
          icon: iconGym,
        }).bindPopup(
          `<b>Gym</b><br />
          ${properties.name}<br /><br />
          Directions:
          <ul>
          <li><a href="https://maps.google.com/maps?q=${latlng.lat},${latlng.lng}" rel="noopener noreferrer" target="_blank">Google Maps</a></li>
          <li><a href="https://maps.apple.com/place?coordinate=${latlng.lat},${latlng.lng}" rel="noopener noreferrer" target="_blank">Apple Maps</a></li>
          </ul>`,
        );

        return marker;
      }}
    />
  );
}
