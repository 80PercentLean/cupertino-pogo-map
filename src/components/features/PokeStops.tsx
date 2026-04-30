import { pokestopsJson } from "@/geojson/data";
import {
  iconPokestop,
  iconPokestopHighlighted,
  iconShowcase,
  iconShowcaseHighlighted,
} from "@/leafletIcons";

import Features from "./Features";

/**
 * Render PokeStops.
 */
export default function PokeStops() {
  return (
    <Features
      btnModifierFlags={{
        hide: true,
        interactionRadius: true,
        noCaPoiZone: true,
        noPowerSpotZone: true,
      }}
      features={pokestopsJson.features}
      icon={(_, subtype) => {
        switch (subtype) {
          case "showcase":
            return iconShowcase;
          default:
            return iconPokestop;
        }
      }}
      iconHighlighted={(_, subtype) => {
        switch (subtype) {
          case "showcase":
            return iconShowcaseHighlighted;
          default:
            return iconPokestopHighlighted;
        }
      }}
      subtitle={(
        _,
        {
          isCommunityContributed,
          isHidden,
          removed,
          subtype,
          wayfarerMode,
        } = {},
      ) => {
        let subtitle;
        switch (subtype) {
          case "showcase":
            subtitle = "Showcase";
            break;
          default:
            subtitle = "PokéStop";
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
      type="pokestop"
    />
  );
}
