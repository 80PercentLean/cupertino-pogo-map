import { parkingJson } from "@/geojson/data";

import { iconParking, iconParkingWarn } from "../../leafletIcons";
import Features from "./Features";

/**
 * Render parking areas.
 */
export default function Parking() {
  return (
    <Features
      features={parkingJson.features}
      icon={(_, subtype) => {
        switch (subtype) {
          case "conditionally-free":
            return iconParkingWarn;
          default:
            return iconParking;
        }
      }}
      isBtnOn={{ hide: true }}
      renderHtml={true}
      subtitle={(_, { subtype } = {}) => {
        if (subtype === "conditionally-free") {
          return "Conditionally Free Parking";
        }
        return "Free Parking";
      }}
      type="parking"
    />
  );
}
