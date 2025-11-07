import { parkingJson } from "@/geojson/data";
import L from "leaflet";

import { iconParking, iconParkingWarn } from "../../leafletIcons";
import type { PoiFeature } from "../../types";
import Poi from "./Poi";

/**
 * Specialized <Poi> for rendering parking.
 */
export default function Parking() {
  return (
    <Poi
      data={parkingJson}
      pointToLayer={({ properties }, latlng) => {
        const poiProperties = properties as PoiFeature["properties"];

        let icon;
        switch (poiProperties.type) {
          case "Conditionally Free Parking":
            icon = iconParkingWarn;
            break;
          default:
            icon = iconParking;
        }

        const marker = L.marker(latlng, { icon }).bindPopup(
          `<b>Parking</b><br />
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
