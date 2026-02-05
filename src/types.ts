import type { Feature, Geometry } from "geojson";

/** Custom properties for a GeoJSON `Feature` representing a POI or a label. */
export interface CProperties {
  /**
   * When the POI was converted from a PokeStop to a Gym.
   * The value is in a simplified ISO 8601 format.
   */
  converted?: string;

  /**
   * When the POI was created for the app. Ideally it is when created for Wayfarer.
   * The value is in a simplified ISO 8601 format.
   */
  created?: string;

  /** Description of the POI. */
  desc?: string;

  /** Represents if a POI is registered in the system but is not visible in-game. */
  inactive?: boolean;

  /** Represents if a POI originated as an Ingress portal. */
  ingress?: boolean;

  /** Represents if a POI is hidden. */
  hidden?: boolean;

  /**
   * When the POI was last updated for the app. The value is in a simplified ISO 8601 format.
   * This should only change when the POI's corresponding values in Wayfarer change.
   * That means `updated`'s timestamp is only changed when the following changes:
   * - `geometry.coordinates`
   * - `properties.name`
   * - `properties.photo`
   * - `properties.removed`
   * - `properties.type`
   */
  updated?: string;

  /** Name of the POI or label. */
  name: string;

  /** Photo of the POI. */
  photo?: string;

  /**
   * Represents a POI that was removed from the in-game map.
   * When the removed date is unknown, it is simply true.
   * When the removed date is known, the value is in a simplified ISO 8601 format.
   */
  removed?: boolean | string;

  /** Source the POI data came from. */
  source?: string;

  /** User who submitted the Wayspot. */
  submitter?: string;

  /** Type of POI or label. */
  type: "gym" | "label" | "pokestop" | "powerspot";

  /** Subtype of a POI. */
  subtype:
    | "All/Binary Gender Restroom"
    | "Conditionally Free Parking"
    | "Free Parking"
    | "Men's Restroom"
    | "showcase"
    | "Meetup Spot"
    | "Women's Restroom"
    | "?";
}

/** A GeoJSON `Feature` representing a POI or a label. */
export type CFeature = Feature<Geometry, CProperties>;
