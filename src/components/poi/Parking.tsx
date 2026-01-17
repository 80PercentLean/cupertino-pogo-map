import { parkingJson } from "@/geojson/data";
import { type LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { iconParking, iconParkingWarn } from "../../leafletIcons";
import { useStore } from "../hooks/store";
import { genPopupContentReact } from "./helper";

/**
 * Render parking.
 */
export default function Parking() {
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  return parkingJson.features.map(({ geometry, properties }, i) => {
    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;
    const { desc, name, type } = properties;

    let icon;
    switch (type) {
      case "Conditionally Free Parking":
        icon = iconParkingWarn;
        break;
      default:
        icon = iconParking;
    }

    return (
      <Marker key={i} icon={icon} position={latlng}>
        <Popup>
          {genPopupContentReact(
            name,
            type,
            latlng,
            desc,
            undefined,
            wayfarerMode,
            true,
          )}
        </Popup>
      </Marker>
    );
  });
}
