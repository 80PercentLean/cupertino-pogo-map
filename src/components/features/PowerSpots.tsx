import { powerspotsJson } from "@/geojson/data";
import { iconPowerspot } from "@/leafletIcons";

import Features from "./Features";

/**
 * Render power spots.
 */
export default function PowerSpots() {
  return (
    <Features
      btnModifierFlags={{
        hide: true,
        interactionRadius: true,
        noCaPoiZone: true,
      }}
      features={powerspotsJson.features}
      icon={iconPowerspot}
      subtitle={(
        _,
        { isDisabled, isHidden, removed, source, wayfarerMode } = {},
      ) => {
        let subtitle = "Power Spot";
        if (isDisabled) {
          subtitle += " (Disabled)";
        }
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
      type="powerspot"
    />
  );
}
