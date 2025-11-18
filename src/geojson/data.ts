import type { CProperties } from "@/types";
import type { FeatureCollection, LineString, Point } from "geojson";

// import stdRaidPath from "./std-raid-path.geojson?raw";
import stdRaidPath from "./campsite-form-path.geojson?raw";
import devpois from "./devpois.geojson?raw";
import gyms from "./gyms.geojson?raw";
import l13Cells from "./l13.geojson?raw";
import l14Cells from "./l14.geojson?raw";
import l17Cells from "./l17.geojson?raw";
import labels from "./labels.geojson?raw";
import meetupSpots from "./meetup-spots.geojson?raw";
import parking from "./parking.geojson?raw";
import pokestops from "./pokestops.geojson?raw";
import powerSpots from "./powerspots.geojson?raw";
import restrooms from "./restrooms.geojson?raw";

export const devpoisJson = JSON.parse(devpois) as FeatureCollection<
  Point,
  CProperties
>;
export const gymsJson = JSON.parse(gyms) as FeatureCollection<
  Point,
  CProperties
>;
export const l13CellsJson = JSON.parse(l13Cells) as FeatureCollection<
  Point,
  CProperties
>;
export const l14CellsJson = JSON.parse(l14Cells) as FeatureCollection<
  Point,
  CProperties
>;
export const l17CellsJson = JSON.parse(l17Cells) as FeatureCollection<
  Point,
  CProperties
>;
export const labelsJson = JSON.parse(labels) as FeatureCollection<
  Point,
  CProperties
>;
export const meetupSpotsJson = JSON.parse(meetupSpots) as FeatureCollection<
  Point,
  CProperties
>;
export const parkingJson = JSON.parse(parking) as FeatureCollection<
  Point,
  CProperties
>;
export const pokestopsJson = JSON.parse(pokestops) as FeatureCollection<
  Point,
  CProperties
>;
export const powerSpotsJson = JSON.parse(powerSpots) as FeatureCollection<
  Point,
  CProperties
>;
export const restroomsJson = JSON.parse(restrooms) as FeatureCollection<
  Point,
  CProperties
>;
export const stdRaidPathJson = JSON.parse(
  stdRaidPath,
) as FeatureCollection<LineString>;
