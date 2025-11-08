import { powerSpotsJson } from "@/geojson/data";
import L from "leaflet";

import { iconPowerSpot } from "../../leafletIcons";
import type { PoiFeature } from "../../types";
import Poi from "./Poi";
import { genPopupContent } from "./helper";

/**
 * Specialized <Poi> for rendering power spots.
 */
export default function PowerSpots() {
  return (
    <Poi
      data={powerSpotsJson}
      pointToLayer={({ properties }, latlng) => {
        const { desc, name } = properties as PoiFeature["properties"];

        return L.marker(latlng, { icon: iconPowerSpot }).bindPopup(
          genPopupContent(name, "Power Spot", latlng, desc),
        );
      }}
    />
  );
}
