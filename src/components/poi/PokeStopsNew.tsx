import { pokestopsJson } from "@/geojson/data";
import { iconPokeStop, iconShowcase } from "@/leafletIcons";
import type { LatLngTuple } from "leaflet";
import { Fragment } from "react";
import { Marker, Popup } from "react-leaflet";

import { useStore } from "../hooks/store";
import CaBlockedRange from "./CaBlockedRange";
import { genPopupContentReact } from "./helper";

export default function PokeStopsNew() {
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
          <CaBlockedRange latlng={latlng} />
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
