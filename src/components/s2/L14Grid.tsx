import { l14CellsJson } from "@/geojson/data";
import { GeoJSON } from "react-leaflet";

/**
 * React Leaflet's <GeoJSON> specialized rendering level 14 S2 cells.
 */
export default function L14Grid() {
  return (
    <GeoJSON
      data={l14CellsJson}
      interactive={false}
      style={{
        className: "l14-grid",
        fillOpacity: 0,
        color: "#f00",
        weight: 2,
      }}
    />
  );
}
