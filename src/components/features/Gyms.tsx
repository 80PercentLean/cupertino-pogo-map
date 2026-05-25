import { gymsJson } from "@/geojson/data";
import { iconGymHighlighted } from "@/leafletIcons";
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
      iconHighlighted={iconGymHighlighted}
      subtitle={(
        _,
        { isCommunityContributed, isHidden, removed, wayfarerMode } = {},
      ) => {
        let subtitle = "Gym";
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
            subtitle += " [Other Source]";
          }
        }
        return subtitle;
      }}
      type="gym"
    />
  );
}
