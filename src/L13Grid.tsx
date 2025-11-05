import type { GeoJSON as GeoJSONType } from "geojson";
import { GeoJSON } from "react-leaflet";

import l13Cells from "./geojson/l13.geojson?raw";

const l13CellsJson = JSON.parse(l13Cells) as GeoJSONType;

/**
 * Renders the Level 13 S2 cells.
 */
export default function L13Grid() {
  return (
    <GeoJSON
      data={l13CellsJson}
      interactive={false}
      style={{ fillOpacity: 0, color: "#0f0", weight: 2 }}
    />
  );
}
