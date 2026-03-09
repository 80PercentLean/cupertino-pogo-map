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
        {
          isCommunityContributed,
          isDisabled,
          isHidden,
          removed,
          wayfarerMode,
        } = {},
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
          if (isCommunityContributed) {
            subtitle += " [Community Contributed]";
          } else {
            subtitle += " [Overture Maps]";
          }
        }
        return subtitle;
      }}
      type="powerspot"
    />
  );
}
