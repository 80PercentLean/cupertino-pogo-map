import type { Feature, FeatureCollection, Point } from "geojson";

/** Custom properties for a GeoJSON `Feature` representing a POI or a label. */
export interface CProperties {
  /**
   * When the Wayfarer POI was last checked to be seen in-game or on Campfire.
   * The value is in a simplified ISO 8601 format.
   */
  checked?: string;

  /**
   * When the Wayfarer POI was converted from a PokeStop to a Gym.
   * The value is in a simplified ISO 8601 format.
   */
  converted?: string;

  /**
   * When the Wayfarer POI was created for the app. Ideally it is when it was created for Wayfarer.
   * It should be as close to the Wayfarer approval time as possible.
   * The value is in a simplified ISO 8601 format.
   */
  created?: string;

  /** Description of the POI. */
  desc?: string;

  /** Represents if a Wayfarer POI originated as an Ingress portal. */
  ingress?: boolean;

  /** Flag which is true when the Wayfarer POI was submitted by the community through Wayfarer. */
  isCommunityContributed?: boolean;

  /** Represents if a Power Spot is disabled. */
  isDisabled?: boolean;

  /** Represents if a POI is isHidden. */
  isHidden?: boolean;

  /** Represents if a Power Spot is impossible. */
  isImpossible?: boolean;

  /**
   * When the Wayfarer POI was updated for the app. Ideally it is when it was edited in Wayfarer.
   * This should only change when the POI's corresponding values in Wayfarer change.
   * The value is in a simplified ISO 8601 format.
   * That means `updated`'s timestamp is only changed when the following changes:
   * - `geometry.coordinates`
   * - `properties.converted`
   * - `properties.isDiabled`
   * - `properties.l14Id`
   * - `properties.name`
   * - `properties.photo`
   * - `properties.removed`
   * - `properties.type`
   */
  updated?: string;

  /** ID for the L14 cell that the Wayfarer POI belongs to. */
  l14Id?: string;

  /** Name of the POI or label. */
  name: string;

  /** Photo of the POI. */
  photo?: string;

  /**
   * Represents a Wayfarer POI that was removed from the app. Ideally it is when it was removed from Wayfarer.
   * When the removed date is unknown, it is simply true.
   * When the removed date is known, the value is in a simplified ISO 8601 format.
   */
  removed?: boolean | string;

  /** Source where the Wayfarer POI data came from. */
  source?:
    | "Campfire"
    | "Campsite Proposal <Gym>"
    | "Campsite Proposal <PokeStop>"
    | "Campsite Proposal <Power Spot>"
    | "Eyeball"
    | "In-Game"
    | "Ingress"
    | "Wayfarer";

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
}

/** A GeoJSON `Feature` representing a POI or a label. */
export type CFeature = Feature<Point, CProperties>;

/** A GeoJSON `FeatureCollection` a collection of POIs or labels. */
export type CFeatureCollection = FeatureCollection<Point, CProperties>;
