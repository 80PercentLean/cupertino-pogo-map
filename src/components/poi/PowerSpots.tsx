import { powerspotsJson } from "@/geojson/data";
import { iconPowerspot } from "@/leafletIcons";

import Features from "./Features";

/**
 * Render power spots.
 */
export default function PowerSpots() {
  return (
    <Features
      features={powerspotsJson.features}
      icon={iconPowerspot}
      isBtnOn={{ hide: true, interactionRadius: true, noCaPoiZone: true }}
      subtitle={(
        _,
        { hidden, inactive, removed, source, wayfarerMode } = {},
      ) => {
        let subtitle = "Power Spot";
        if (hidden) {
          subtitle += " (Hidden)";
        }
        if (inactive) {
          subtitle += " (Inactive)";
        }
        if (removed) {
          subtitle += " (Removed)";
        }
        if (wayfarerMode) {
          subtitle += ` [${source}]`;
        }
        return subtitle;
      }}
      type="powerspot"
    />
  );
}
