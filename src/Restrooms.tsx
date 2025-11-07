import type { GeoJSON } from "geojson";
import L from "leaflet";

import Poi from "./Poi";
import restrooms from "./geojson/restrooms.geojson?raw";
import { iconAbRestroom, iconMRestroom, iconWRestroom } from "./leafletIcons";
import type { PoiFeature } from "./types";

const restroomsJson = JSON.parse(restrooms) as GeoJSON;

/**
 * Specialized <Poi> for rendering restrooms.
 */
export default function Restrooms() {
  return (
    <Poi
      data={restroomsJson}
      pointToLayer={({ properties }, latlng) => {
        let icon;
        const poiProperties = properties as PoiFeature["properties"];
        switch (poiProperties.type) {
          case "Men's Restroom":
            icon = iconMRestroom;
            break;
          case "Women's Restroom":
            icon = iconWRestroom;
            break;
          default:
            icon = iconAbRestroom;
        }

        const marker = L.marker(latlng, { icon }).bindPopup(
          `<b>Restroom</b><br />
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
