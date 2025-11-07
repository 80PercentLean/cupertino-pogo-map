import type { GeoJSON } from "geojson";

import devpois from "./devpois.geojson?raw";
import gyms from "./gyms.geojson?raw";
import l13Cells from "./l13.geojson?raw";
import l14Cells from "./l14.geojson?raw";
import l17Cells from "./l17.geojson?raw";
import labels from "./labels.geojson?raw";

export const devpoisJson = JSON.parse(devpois) as GeoJSON;
export const gymsJson = JSON.parse(gyms) as GeoJSON;
export const l13CellsJson = JSON.parse(l13Cells) as GeoJSON;
export const l14CellsJson = JSON.parse(l14Cells) as GeoJSON;
export const l17CellsJson = JSON.parse(l17Cells) as GeoJSON;
export const labelsJson = JSON.parse(labels) as GeoJSON;
