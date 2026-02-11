import { gymsJson } from "@/geojson/data";
import { iconGym } from "@/leafletIcons";

import Features from "./Features";

/**
 * Render gyms.
 */
export default function Gyms() {
  return (
    <Features
      features={gymsJson.features}
      icon={iconGym}
      isBtnOn={{ hide: true, interactionRadius: true, noCaPoiZone: true }}
      subtitle={(_, { hidden, removed, source, wayfarerMode } = {}) => {
        let subtitle = "Gym";
        if (hidden) {
          subtitle += " (Hidden)";
        }
        if (removed) {
          subtitle += " (Removed)";
        }
        if (wayfarerMode) {
          subtitle += ` [${source}]`;
        }
        return subtitle;
      }}
      type="gym"
    />
  );
}
