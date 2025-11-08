import { stdRaidPathJson } from "@/geojson/data";
import L, { type LatLngExpression } from "leaflet";
// @ts-expect-error leaflet-ant-path doesn't have types
import { AntPath } from "leaflet-ant-path";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const LATLNGS = stdRaidPathJson.features[0].geometry.coordinates.map(
  ([lng, lat]) => [lat, lng],
);

export default function StdRaidPath() {
  const map = useMap();

  useEffect(() => {
    let path;
    if (import.meta.env.VITE_E2E === "true") {
      path = L.polyline(LATLNGS as LatLngExpression[], { color: "#5a9ffc" });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      path = new AntPath(LATLNGS, {
        color: "#5a9ffc",
        dashArray: [10, 20],
        delay: 1000,
        hardwareAccelerated: true,
        paused: false,
        pulseColor: "#fff",
        opacity: 0.6666,
        weight: 5,
      });
    }

    const layerGroup = L.layerGroup([path]);
    layerGroup.addTo(map);

    return () => {
      layerGroup.remove();
    };
  }, [map]);

  return null;
}
