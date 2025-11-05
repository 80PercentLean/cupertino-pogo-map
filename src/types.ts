import type { Feature, Geometry } from "geojson";

interface PoiProperties {
  removed?: boolean;
  name: string;
  type:
    | "Gym"
    | "Label"
    | "Parking"
    | "PokeStop"
    | "Power Spot"
    | "Showcase"
    | "?";
}

export type PoiFeature = Feature<Geometry, PoiProperties>;
