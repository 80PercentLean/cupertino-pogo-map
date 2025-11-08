import L from "leaflet";

import { gymsJson } from "../../geojson/data";
import { iconGym } from "../../leafletIcons";
import type { CFeature } from "../../types";
import Poi from "./Poi";
import { genPopupContent } from "./helper";

/**
 * Specialized <Poi> for rendering gyms.
 */
export default function Gyms() {
  return (
    <Poi
      data={gymsJson}
      pointToLayer={({ properties }, latlng) => {
        const { desc, name } = properties as CFeature["properties"];

        return L.marker(latlng, {
          icon: iconGym,
        }).bindPopup(genPopupContent(name, "Gym", latlng, desc));
      }}
    />
  );
}
