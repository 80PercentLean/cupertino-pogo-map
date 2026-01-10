import { pokestopsJson } from "@/geojson/data";
import { iconPokeStop, iconShowcase } from "@/leafletIcons";
import type { LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { useStore } from "../hooks/store";
import CaBlockedRange from "./CaBlockedRange";
import { genPopupContentReact } from "./helper";

export default function PokeStopsNew() {
  const wayfarerTools = useStore((s) => s.wayfarerTools);

  return pokestopsJson.features.map(({ geometry, properties }, i) => {
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

    return (
      <>
        <CaBlockedRange latlng={latlng} />
        <Marker key={i} icon={icon} position={latlng}>
          <Popup>
            {genPopupContentReact(
              name,
              typeTxt,
              latlng,
              desc,
              photo,
              wayfarerTools,
            )}
          </Popup>
        </Marker>
      </>
    );
  });
}
