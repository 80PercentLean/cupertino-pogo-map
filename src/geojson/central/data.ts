import type { CFeatureCollection } from "@/types/CFeatures";
import type { FeatureCollection, LineString } from "geojson";

import devpois from "./devpois.geojson?raw";
import gyms from "./gyms.geojson?raw";
import l13Cells from "./l13.geojson?raw";
import l14Cells from "./l14.geojson?raw";
import l17Cells from "./l17.geojson?raw";
import labels from "./labels.geojson?raw";
import meetups from "./meetupspots.geojson?raw";
import parkingJson from "./parking.geojson?raw";
import pokestops from "./pokestops.geojson?raw";
import powerspots from "./powerspots.geojson?raw";
import restrooms from "./restrooms.geojson?raw";
import stdRaidPath from "./std-raid-path.geojson?raw";

export const centralDevpoisJson = JSON.parse(devpois) as CFeatureCollection;
export const centralGymsJson = JSON.parse(gyms) as CFeatureCollection;
export const centralL13CellsJson = JSON.parse(l13Cells) as CFeatureCollection;
export const centralL14CellsJson = JSON.parse(l14Cells) as CFeatureCollection;
export const centralL17CellsJson = JSON.parse(l17Cells) as CFeatureCollection;
export const centralLabelsJson = JSON.parse(labels) as CFeatureCollection;
export const centralMeetupspotsJson = JSON.parse(meetups) as CFeatureCollection;
export const centralParkingJson = JSON.parse(parkingJson) as CFeatureCollection;
export const centralPokestopsJson = JSON.parse(pokestops) as CFeatureCollection;
export const centralPowerspotsJson = JSON.parse(
  powerspots,
) as CFeatureCollection;
export const centralRestroomsJson = JSON.parse(restrooms) as CFeatureCollection;
export const centralStdRaidPathJson = JSON.parse(
  stdRaidPath,
) as FeatureCollection<LineString>;
