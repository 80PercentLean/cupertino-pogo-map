import type { GeoJSON } from "geojson";
import L from "leaflet";

import Poi from "./Poi";
import gyms from "./geojson/gyms.geojson?raw";
import { iconGym } from "./leafletIcons";
import type { PoiFeature } from "./types";

const gymsJson = JSON.parse(gyms) as GeoJSON;

export default function Gyms() {
  return (
    <Poi
      data={gymsJson}
      pointToLayer={({ properties }, latlng) => {
        const poiProperties = properties as PoiFeature["properties"];
        const marker = L.marker(latlng, {
          icon: iconGym,
        }).bindPopup(
          `<b>Gym</b><br />
          ${poiProperties.name}<br /><br />
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
