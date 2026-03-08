import { gymsJson } from "@/geojson/data";
import { iconGym } from "@/leafletIcons";

import Features from "./Features";

/**
 * Render gyms.
 */
export default function Gyms() {
  return (
    <Features
      btnModifierFlags={{
        hide: true,
        interactionRadius: true,
        noCaPoiZone: true,
        noPowerSpotZone: true,
      }}
      features={gymsJson.features}
      icon={iconGym}
      subtitle={(_, { isHidden, removed, source, wayfarerMode } = {}) => {
        let subtitle = "Gym";
        if (isHidden) {
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
