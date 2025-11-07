import { GeoJSON } from "react-leaflet";

import { l17CellsJson } from "./geojson/data";

/**
 * React Leaflet's <GeoJSON> specialized rendering level 17 S2 cells.
 */
export default function L17Grid() {
  return (
    <GeoJSON
      data={l17CellsJson}
      interactive={false}
      style={{ fillOpacity: 0, color: "#ffa500", weight: 1 }}
    />
  );
}
