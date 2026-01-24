import { useContext, useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

import { MapContext } from "./MapContext";
import { useStore } from "./hooks/store";

/**
 * Helps to debug Leaflet map when placed inside a <MapContainer>.
 */
export default function LeafletDebug() {
  const { setMap } = useContext(MapContext);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const map = useMap();

  useMapEvents({
    contextmenu: (e) => {
      if (wayfarerMode) {
        console.log("[EVENT] contextmenu:", e.latlng);
      }
    },
    moveend: () => {
      if (wayfarerMode) {
        console.log("[EVENT] moveend:", map.getCenter());
      }
    },
    zoomend: () => {
      if (wayfarerMode) {
        console.log("[EVENT] zoomend:", map.getZoom());
      }
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
