import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import { useStore } from "./hooks/store";

/**
 * Helps to debug Leaflet map when placed inside a <MapContainer>.
 */
export default function LeafletDebug() {
  const map = useMap();
  const setMap = useStore((s) => s.setMap);

  useMapEvents({
    contextmenu: (e) => {
      console.log("[EVENT] contextmenu:", e.latlng);
    },
    moveend: () => {
      console.log("[EVENT] moveend:", map.getCenter());
    },
    zoomend: () => {
      console.log("[EVENT] zoomend:", map.getZoom());
    },
  });

  useEffect(() => {
    setMap(map);
  }, [map, setMap]);

  return null;
}
