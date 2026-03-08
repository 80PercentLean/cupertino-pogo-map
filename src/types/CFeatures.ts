import type { Feature, FeatureCollection, Geometry, Point } from "geojson";

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

  /** Represents if a POI originated as an Ingress portal. */
  ingress?: boolean;

  /** Flag which is true when the POI was submitted by the community through Wayfarer. */
  isCommunityContributed?: boolean;

  /** Represents if a POI is registered in the system but is not visible in-game. */
  isDisabled?: boolean;

  /** Represents if a POI is isHidden. */
  isHidden?: boolean;

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

  /** ID for the L14 cell that the POI belongs to. */
  l14Id?: string;

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

  /** Source where the POI data came from. */
  source?: "Campfire" | "Eyeball" | "Ingress" | "Wayfarer";

  /**
   * When the POI was first submitted to Wayfarer.
   * The value is in a simplified ISO 8601 format.
   */
  submitted?: string;

  /** User who submitted the Wayspot. */
  submitter?: string;

  /** Subtype of a POI. */
  subtype:
    | "all-binary"
    | "conditionally-free"
    | "free"
    | "men"
    | "paid"
    | "showcase"
    | "women";

  /** Type of POI or label. */
  type:
    | "devpoi"
    | "gym"
    | "label"
    | "meetupspot"
    | "parking"
    | "pokestop"
    | "powerspot"
    | "restroom";

  /**
   * When the POI was last verified to be seen in-game or on Campfire.
   * The value is in a simplified ISO 8601 format.
   */
  verified?: string;
}

/** A GeoJSON `Feature` representing a POI or a label. */
export type CFeature = Feature<Geometry, CProperties>;

/** A GeoJSON `FeatureCollection` a collection of POIs or labels. */
export type CFeatureCollection = FeatureCollection<Point, CProperties>;
