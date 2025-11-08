import type { Feature, Geometry } from "geojson";

/** Custom properties for a GeoJSON `Feature` representing a POI or a label. */
interface CProperties {
  /** Description of the POI or label. */
  desc?: string;

  /** Name of the POI or label. */
  name: string;

  /** Represents a POI that was removed from the in-game map. */
  removed?: boolean;

  /** Source the POI data came from. */
  source?: string;

  /** Type of POI or label. */
  type:
    | "All/Binary Gender Restroom"
    | "Conditionally Free Parking"
    | "Free Parking"
    | "Gym"
    | "Label"
    | "Men's Restroom"
    | "PokeStop"
    | "Power Spot"
    | "Showcase"
    | "Women's Restroom"
    | "?";
}

/** A GeoJSON `Feature` representing a POI or a label. */
export type CFeature = Feature<Geometry, CProperties>;
