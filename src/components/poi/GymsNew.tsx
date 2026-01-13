import { gymsJson } from "@/geojson/data";
import { iconGym } from "@/leafletIcons";
import type { LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { useStore } from "../hooks/store";
import CaBlockedRange from "./CaBlockedRange";
import { genPopupContentReact } from "./helper";

export default function GymsNew() {
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markers = [];

  for (const { id, geometry, properties } of gymsJson.features) {
    if (!properties.removed) {
      const latlng = [
        geometry.coordinates[1],
        geometry.coordinates[0],
      ] as LatLngTuple;

      markers.push(
        <>
          <CaBlockedRange latlng={latlng} />
          <Marker key={id} icon={iconGym} position={latlng}>
            <Popup>
              {genPopupContentReact(
                properties.name,
                "Gym",
                latlng,
                properties.desc,
                properties.photo,
                wayfarerMode,
              )}
            </Popup>
          </Marker>
        </>,
      );
    }
  }

  return markers;
}
