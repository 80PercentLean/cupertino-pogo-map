import { powerspotsJson } from "@/geojson/data";
import { iconPowerspot, iconPowerspotHighlighted } from "@/leafletIcons";

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
      iconHighlighted={iconPowerspotHighlighted}
      subtitle={(
        _,
        {
          isCommunityContributed,
          isDisabled,
          isHidden,
          isImpossible,
          removed,
          wayfarerMode,
        } = {},
      ) => {
        let subtitle = "Power Spot";
        if (isDisabled) {
          subtitle += " (Disabled)";
        } else {
          subtitle += " (Enabled)";
        }
        if (isHidden) {
          subtitle += " (Hidden)";
        }
        if (isImpossible) {
          subtitle += " (Impossible)";
        }
        if (removed) {
          subtitle += " (Removed)";
        }
        if (wayfarerMode) {
          if (isCommunityContributed) {
            subtitle += " [Community Contributed]";
          } else {
            subtitle += " [Other Source]";
          }
        }
        return subtitle;
      }}
      type="powerspot"
    />
  );
}
