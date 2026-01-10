import { gymsJson } from "@/geojson/data";
import { iconGym } from "@/leafletIcons";
import type { LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { useStore } from "../hooks/store";
import CaBlockedRange from "./CaBlockedRange";
import { genPopupContentReact } from "./helper";

export default function GymsNew() {
  const wayfarerTools = useStore((s) => s.wayfarerTools);

  return gymsJson.features.map((f, i) => {
    const latlng = [
      f.geometry.coordinates[1],
      f.geometry.coordinates[0],
    ] as LatLngTuple;
    return (
      <>
        <CaBlockedRange latlng={latlng} />
        <Marker key={i} icon={iconGym} position={latlng}>
          <Popup>
            {genPopupContentReact(
              f.properties.name,
              "Gym",
              latlng,
              f.properties.desc,
              f.properties.photo,
              wayfarerTools,
            )}
          </Popup>
        </Marker>
      </>
    );
  });
}
