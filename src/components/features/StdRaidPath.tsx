import { stdRaidPathJson } from "@/geojson/data";
import { type LatLngTuple, layerGroup, polyline } from "leaflet";
// @ts-expect-error leaflet-ant-path doesn't have types
import { AntPath } from "leaflet-ant-path";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { useStore } from "../hooks/store";

const LATLNGS = stdRaidPathJson.features[0].geometry.coordinates.map(
  ([lng, lat]) => [lat, lng],
);

/**
 * Draws the standard walking path used for raids.
 */
export default function StdRaidPath() {
  const disableAnimations = useStore((s) => s.disableAnimations);
  const map = useMap();

  useEffect(() => {
    const COLOR = "#5a9ffc";
    let path;
    if (disableAnimations) {
      path = polyline(LATLNGS as LatLngTuple[], {
        color: COLOR,
        className: "std-raid-path",
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      path = new AntPath(LATLNGS, {
        color: COLOR,
        className: "std-raid-path",
        dashArray: [10, 20],
        delay: 1000,
        hardwareAccelerated: true,
        paused: false,
        pulseColor: "#fff",
        opacity: 0.6666,
        weight: 5,
      });
    }

    const lg = layerGroup([path]);
    lg.addTo(map);

    return () => {
      lg.remove();
    };
  }, [disableAnimations, map]);

  return null;
}
