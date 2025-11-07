import L from "leaflet";

import { gymsJson } from "../../geojson/data";
import { iconGym } from "../../leafletIcons";
import type { PoiFeature } from "../../types";
import Poi from "./Poi";

/**
 * Specialized <Poi> for rendering gyms.
 */
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
