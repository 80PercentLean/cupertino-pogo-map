import { devpoisJson } from "@/geojson/data";

import { iconDevpoi } from "../../leafletIcons";
import Features from "./Features";

/**
 * Render POIs in development like Wayfarer submissions or Campsite POI proposals.
 */
export default function DevPois() {
  return (
    <Features
      btnModifierFlags={{
        hide: true,
        interactionRadius: true,
        noCaPoiZone: true,
      }}
      features={devpoisJson.features}
      icon={iconDevpoi}
      subtitle={(_, { source } = {}) => {
        return `POI In-Development [${source}]`;
      }}
      type="devpoi"
    />
  );
}
