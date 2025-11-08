import { restroomsJson } from "@/geojson/data";
import L from "leaflet";

import {
  iconAbRestroom,
  iconMRestroom,
  iconWRestroom,
} from "../../leafletIcons";
import type { PoiFeature } from "../../types";
import Poi from "./Poi";
import { genPopupContent } from "./helper";

/**
 * Specialized <Poi> for rendering restrooms.
 */
export default function Restrooms() {
  return (
    <Poi
      data={restroomsJson}
      pointToLayer={({ properties }, latlng) => {
        const { desc, name, type } = properties as PoiFeature["properties"];

        let icon;
        switch (type) {
          case "Men's Restroom":
            icon = iconMRestroom;
            break;
          case "Women's Restroom":
            icon = iconWRestroom;
            break;
          default:
            icon = iconAbRestroom;
        }

        return L.marker(latlng, { icon }).bindPopup(
          genPopupContent(name, "Restroom", latlng, desc),
        );
      }}
    />
  );
}
