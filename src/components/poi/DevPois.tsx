import L from "leaflet";

import { devpoisJson } from "../../geojson/data";
import { iconDev } from "../../leafletIcons";
import type { PoiFeature } from "../../types";
import Poi from "./Poi";

/**
 * Specialized <Poi> for rendering POIs in development like Wayfarer submissions.
 */
export default function DevPois() {
  return (
    <Poi
      data={devpoisJson}
      pointToLayer={({ properties }, latlng) => {
        const poiProperties = properties as PoiFeature["properties"];
        const marker = L.marker(latlng, { icon: iconDev }).bindPopup(
          `<b>Wayfarer Submission</b><br />
          ${poiProperties.name}`,
        );

        return marker;
      }}
    />
  );
}
