import { gymsJson } from "@/geojson/data";
import { iconGym } from "@/leafletIcons";
import type { LatLngTuple } from "leaflet";
import { Fragment } from "react";
import { Marker, Popup } from "react-leaflet";

import { useStore } from "../hooks/store";
import NoCaPoiZone from "./NoCaPoiZone";
import NoPowerSpotZone from "./NoPowerSpotZone";
import { genPopupContentReact } from "./helper";

export default function GymsNew() {
  const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  const showPowerSpotZones = useStore((s) => s.layers.noPowerSpotZones);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markers = [];

  for (const { id, geometry, properties } of gymsJson.features) {
    if (!properties.removed) {
      const latlng = [
        geometry.coordinates[1],
        geometry.coordinates[0],
      ] as LatLngTuple;

      markers.push(
        <Fragment key={id}>
          {showNoCaPoiZones && <NoCaPoiZone latlng={latlng} />}
          {showPowerSpotZones && <NoPowerSpotZone latlng={latlng} />}
          <Marker icon={iconGym} position={latlng}>
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
        </Fragment>,
      );
    }
  }

  return markers;
}
