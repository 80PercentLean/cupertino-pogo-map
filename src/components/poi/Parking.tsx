import { parkingJson } from "@/geojson/data";
import L from "leaflet";

import { iconParking, iconParkingWarn } from "../../leafletIcons";
import type { CFeature } from "../../types";
import Poi from "./Poi";
import { genPopupContent } from "./helper";

/**
 * Specialized <Poi> for rendering parking.
 */
export default function Parking() {
  return (
    <Poi
      data={parkingJson}
      pointToLayer={({ properties }, latlng) => {
        const { desc, name, type } = properties as CFeature["properties"];

        let icon;
        switch (type) {
          case "Conditionally Free Parking":
            icon = iconParkingWarn;
            break;
          default:
            icon = iconParking;
        }

        return L.marker(latlng, { icon }).bindPopup(
          genPopupContent(name, "Parking", latlng, desc),
        );
      }}
    />
  );
}
