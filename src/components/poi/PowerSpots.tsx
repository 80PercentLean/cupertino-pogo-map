import { powerSpotsJson } from "@/geojson/data";
import L from "leaflet";

import { iconPowerSpot } from "../../leafletIcons";
import type { PoiFeature } from "../../types";
import Poi from "./Poi";

/**
 * Specialized <Poi> for rendering power spots.
 */
export default function PowerSpots() {
  return (
    <Poi
      data={powerSpotsJson}
      pointToLayer={({ properties }, latlng) => {
        const poiProperties = properties as PoiFeature["properties"];
        const marker = L.marker(latlng, {
          icon: iconPowerSpot,
        }).bindPopup(`<b>Power Spot</b><br />
          ${poiProperties.name}<br /><br />
          Directions:
          <ul>
          <li><a href="https://maps.google.com/maps?q=${latlng.lat},${latlng.lng}" rel="noopener noreferrer" target="_blank">Google Maps</a></li>
          <li><a href="https://maps.apple.com/place?coordinate=${latlng.lat},${latlng.lng}" rel="noopener noreferrer" target="_blank">Apple Maps</a></li>
          </ul>`);

        return marker;
      }}
    />
  );
}
