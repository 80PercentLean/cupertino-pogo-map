import { useContext, useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import { MapContext } from "./MapContext";

/**
 * Helps to debug Leaflet map when placed inside a <MapContainer>.
 */
export default function LeafletDebug() {
  const { setMap } = useContext(MapContext);
  const map = useMap();

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
    if (setMap) {
      // Store Leaflet Map instance in context
      setMap(map);
    }
  }, [map, setMap]);

  return null;
}
