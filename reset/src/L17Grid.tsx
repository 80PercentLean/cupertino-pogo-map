import { GeoJSON } from "react-leaflet";

import l17Cells from "./geojson/l17.geojson?raw";

const l17CellsJson = JSON.parse(l17Cells);

/**
 * Renders the Level 17 S2 cells.
 */
export default function L17Grid() {
  return (
    <GeoJSON
      data={l17CellsJson}
      style={{ fillOpacity: 0, color: "#ffa500", weight: 1 }}
    />
  );
}
