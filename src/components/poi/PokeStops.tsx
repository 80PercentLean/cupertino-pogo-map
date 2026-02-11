import { pokestopsJson } from "@/geojson/data";
import { iconPokestop, iconShowcase } from "@/leafletIcons";

import Features from "./Features";

/**
 * Render PokeStops.
 */
export default function PokeStops() {
  return (
    <Features
      features={pokestopsJson.features}
      icon={(_, subtype) => {
        switch (subtype) {
          case "showcase":
            return iconShowcase;
          default:
            return iconPokestop;
        }
      }}
      isBtnOn={{ hide: true, interactionRadius: true, noCaPoiZone: true }}
      subtitle={(
        _,
        { hidden, removed, source, subtype, wayfarerMode } = {},
      ) => {
        let subtitle;
        switch (subtype) {
          case "showcase":
            subtitle = "Showcase";
            break;
          default:
            subtitle = "PokéStop";
        }
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
      type="pokestop"
    />
  );
}
