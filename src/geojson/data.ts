import type { CFeatureCollection } from "@/types/CFeatures";
import type { FeatureCollection, LineString } from "geojson";

import devpois from "./devpois.geojson?raw";
import gyms from "./gyms.geojson?raw";
import l13Cells from "./l13.geojson?raw";
import l14Cells from "./l14.geojson?raw";
import l17Cells from "./l17.geojson?raw";
import labels from "./labels.geojson?raw";
import meetupspots from "./meetupspots.geojson?raw";
import parking from "./parking.geojson?raw";
import pokestops from "./pokestops.geojson?raw";
import powerSpots from "./powerspots.geojson?raw";
import restrooms from "./restrooms.geojson?raw";
import stdRaidPath from "./std-raid-path.geojson?raw";

export const devpoisJson = JSON.parse(devpois) as CFeatureCollection;
export const gymsJson = JSON.parse(gyms) as CFeatureCollection;
export const l13CellsJson = JSON.parse(l13Cells) as CFeatureCollection;
export const l14CellsJson = JSON.parse(l14Cells) as CFeatureCollection;
export const l17CellsJson = JSON.parse(l17Cells) as CFeatureCollection;
export const labelsJson = JSON.parse(labels) as CFeatureCollection;
export const meetupspotsJson = JSON.parse(meetupspots) as CFeatureCollection;
export const parkingJson = JSON.parse(parking) as CFeatureCollection;
export const pokestopsJson = JSON.parse(pokestops) as CFeatureCollection;
export const powerspotsJson = JSON.parse(powerSpots) as CFeatureCollection;
export const restroomsJson = JSON.parse(restrooms) as CFeatureCollection;
export const stdRaidPathJson = JSON.parse(
  stdRaidPath,
) as FeatureCollection<LineString>;
