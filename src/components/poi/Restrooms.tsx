import { restroomsJson } from "@/geojson/data";
import { type LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import {
  iconAbRestroom,
  iconMRestroom,
  iconWRestroom,
} from "../../leafletIcons";
import { useStore } from "../hooks/store";
import { genPopupContentReact } from "./helper";

/**
 * Render restrooms.
 */
export default function Restrooms() {
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  return restroomsJson.features.map(({ geometry, properties }, i) => {
    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;
    const { desc, name, type } = properties;

    let icon;
    switch (type) {
      case "Men's Restroom":
        icon = iconMRestroom;
        break;
      case "Women's Restroom":
        icon = iconWRestroom;
        break;
      default:
        icon = iconAbRestroom;
    }

    return (
      <Marker key={i} icon={icon} position={latlng}>
        <Popup>
          {genPopupContentReact(
            name,
            "Restroom",
            latlng,
            desc,
            undefined,
            wayfarerMode,
          )}
        </Popup>
      </Marker>
    );
  });
}
