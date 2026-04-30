import { parkingJson } from "@/geojson/data";

import {
  iconParking,
  iconParkingHighlighted,
  iconParkingWarn,
  iconParkingWarnHighlighted,
} from "../../leafletIcons";
import Features from "./Features";

/**
 * Render parking areas.
 */
export default function Parking() {
  return (
    <Features
      btnModifierFlags={{ hide: true }}
      features={parkingJson.features}
      icon={(_, subtype) => {
        switch (subtype) {
          case "conditionally-free":
            return iconParkingWarn;
          default:
            return iconParking;
        }
      }}
      iconHighlighted={(_, subtype) => {
        switch (subtype) {
          case "conditionally-free":
            return iconParkingWarnHighlighted;
          default:
            return iconParkingHighlighted;
        }
      }}
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
