import { restroomsJson } from "@/geojson/data";

import {
  iconAllBinaryRestroom,
  iconMRestroom,
  iconWRestroom,
} from "../../leafletIcons";
import Features from "./Features";

/**
 * Render restrooms.
 */
export default function Restrooms() {
  return (
    <Features
      btnModifierFlags={{ hide: true }}
      features={restroomsJson.features}
      icon={(_, subtype) => {
        switch (subtype) {
          case "men":
            return iconMRestroom;
          case "women":
            return iconWRestroom;
          default:
            return iconAllBinaryRestroom;
        }
      }}
      subtitle={(_, { subtype } = {}) => {
        switch (subtype) {
          case "men":
            return "Men's Restroom";
          case "women":
            return "Women's Restroom";
          default:
            return "All-Gender/Binary Restroom";
        }
      }}
      type="restroom"
    />
  );
}
