import L from "leaflet";

import { gymsJson } from "../../geojson/data";
import { iconGym } from "../../leafletIcons";
import type { CFeature } from "../../types";
import { useStore } from "../hooks/store";
import Poi from "./Poi";
import { genPopupContent } from "./helper";

/**
 * Specialized <Poi> for rendering gyms.
 */
export default function Gyms() {
  const wayfarerTools = useStore((s) => s.wayfarerTools);

  return (
    <Poi
      data={gymsJson}
      pointToLayer={({ properties }, latlng) => {
        const { desc, name, photo } = properties as CFeature["properties"];

        return L.marker(latlng, {
          icon: iconGym,
        }).bindPopup(
          genPopupContent(name, "Gym", latlng, desc, photo, wayfarerTools),
        );
      }}
    />
  );
}
