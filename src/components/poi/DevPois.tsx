import L from "leaflet";

import { devpoisJson } from "../../geojson/data";
import { iconDev } from "../../leafletIcons";
import type { CFeature } from "../../types";
import Poi from "./Poi";
import { genPopupContent } from "./helper";

/**
 * Specialized <Poi> for rendering POIs in development like Wayfarer submissions.
 */
export default function DevPois() {
  return (
    <Poi
      data={devpoisJson}
      pointToLayer={({ properties }, latlng) => {
        const { name } = properties as CFeature["properties"];

        return L.marker(latlng, { icon: iconDev }).bindPopup(
          genPopupContent(
            name,
            "Wayfarer Submission",
            latlng,
            "<p>This POI is currently going through the Wayfarer submission process. It can potentially become an in-game structure like a PokéStop or power spot.</p>",
          ),
        );
      }}
    />
  );
}
