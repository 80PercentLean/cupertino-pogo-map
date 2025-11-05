import type { GeoJSON as GeoJSONType } from "geojson";
import { GeoJSON } from "react-leaflet";

import l14Cells from "./geojson/l14.geojson?raw";

const l14CellsJson = JSON.parse(l14Cells) as GeoJSONType;

/**
 * Renders the Level 14 S2 cells.
 */
export default function L14Grid() {
  return (
    <GeoJSON
      data={l14CellsJson}
      interactive={false}
      style={{ fillOpacity: 0, color: "#f00", weight: 2 }}
    />
  );
}
