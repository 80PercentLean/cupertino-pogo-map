import { devpoisJson } from "../../geojson/data";
import { iconDevpoi } from "../../leafletIcons";
import Features from "./Features";

/**
 * Render POIs in development like Wayfarer submissions or Campsite POI proposals.
 */
export default function DevPois() {
  return (
    <Features
      features={devpoisJson.features}
      icon={iconDevpoi}
      isBtnOn={{ hide: true, interactionRadius: true, noCaPoiZone: true }}
      subtitle={(_, { source } = {}) => {
        return `POI In-Development [${source}]`;
      }}
      type="devpoi"
    />
  );
}
