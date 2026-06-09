import { l17CellsJson } from "@/geojson/data";
import { GeoJSON } from "react-leaflet";

/**
 * React Leaflet's <GeoJSON> specialized rendering level 17 S2 cells.
 */
export default function L17Grid() {
  return (
    <GeoJSON
      data={l17CellsJson}
      interactive={false}
      style={{
        className: "l17-grid",
        fillOpacity: 0,
        color: "#ffa500",
        weight: 1,
      }}
    />
  );
}
