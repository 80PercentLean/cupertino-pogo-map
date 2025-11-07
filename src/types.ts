import type { Feature, Geometry } from "geojson";

/** Custom properties for a GeoJSON `Feature` representing a label. */
interface LabelProperties {
  /** Name of the label and text to be displayed on the map. */
  name: string;
  type: "Label";
}

/** Custom properties for a GeoJSON `Feature` representing a label. */
export type LabelFeature = Feature<Geometry, LabelProperties>;

/** Custom properties for a GeoJSON `Feature` representing a POI. */
interface PoiProperties {
  /** Represents a POI that was removed from the in-game map. */
  removed?: boolean;

  /** Source the POI data came from. */
  source?: string;

  /** Name of the POI. */
  name: string;

  /** Type of POI. */
  type:
    | "Gym"
    | "Label"
    | "Parking"
    | "PokeStop"
    | "Power Spot"
    | "Showcase"
    | "?";
}

/** A GeoJSON `Feature` representing a POI. */
export type PoiFeature = Feature<Geometry, PoiProperties>;
