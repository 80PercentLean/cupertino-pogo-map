import { pokestopsJson } from "@/geojson/data";
import { iconPokeStop, iconShowcase } from "@/leafletIcons";
import type { LatLngTuple } from "leaflet";
import { Fragment } from "react";
import { Marker, Popup } from "react-leaflet";

import { useStore } from "../hooks/store";
import NoCaPoiZone from "./NoCaPoiZone";
import NoPowerSpotZone from "./NoPowerSpotZone";
import { genPopupContentReact } from "./helper";

export default function PokeStopsNew() {
  const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  const showPowerSpotZones = useStore((s) => s.layers.noPowerSpotZones);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markers = [];

  for (const { id, geometry, properties } of pokestopsJson.features) {
    if (!properties.removed) {
      const latlng = [
        geometry.coordinates[1],
        geometry.coordinates[0],
      ] as LatLngTuple;
      const { desc, name, photo, type } = properties;

      let icon;
      let typeTxt;
      switch (type) {
        case "Showcase":
          icon = iconShowcase;
          typeTxt = "Showcase";
          break;
        default:
          icon = iconPokeStop;
          typeTxt = "PokéStop";
      }

      markers.push(
        <Fragment key={id}>
          {showNoCaPoiZones && <NoCaPoiZone latlng={latlng} />}
          {showPowerSpotZones && <NoPowerSpotZone latlng={latlng} />}
          <Marker icon={icon} position={latlng}>
            <Popup>
              {genPopupContentReact(
                name,
                typeTxt,
                latlng,
                desc,
                photo,
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
