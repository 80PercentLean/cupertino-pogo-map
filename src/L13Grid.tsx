import { GeoJSON } from "react-leaflet";

import { l13CellsJson } from "./geojson/data";

/**
 * React Leaflet's <GeoJSON> specialized rendering level 13 S2 cells.
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
