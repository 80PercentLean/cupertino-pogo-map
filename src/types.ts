import type { Feature, Geometry } from "geojson";

interface LabelProperties {
  name: string;
  type: "Label";
}

export type LabelFeature = Feature<Geometry, LabelProperties>;

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
