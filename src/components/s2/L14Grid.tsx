import { GeoJSON } from "react-leaflet";

import { l14CellsJson } from "../../geojson/data";

/**
 * React Leaflet's <GeoJSON> specialized rendering level 14 S2 cells.
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
