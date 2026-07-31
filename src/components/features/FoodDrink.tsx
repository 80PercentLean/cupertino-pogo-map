import { fooddrinkJson } from "@/geojson/data";
import {
  iconDrink,
  iconFood,
  iconFoodHighlighted,
  iconOrangeSq,
  iconOrangeSqHighlighted,
} from "@/leafletIcons";

import Features from "./Features";

export default function Fooddrink() {
  return (
    <Features
      btnModifierFlags={{ hide: true }}
      features={fooddrinkJson.features}
      icon={(_, subtype) => {
        switch (subtype) {
          case "drink":
            return iconDrink;
          case "orange-sq":
            return iconOrangeSq;
          default:
            return iconFood;
        }
      }}
      iconHighlighted={(_, subtype) => {
        switch (subtype) {
          case "drink":
            return iconDrink;
          case "orange-sq":
            return iconOrangeSqHighlighted;
          default:
            return iconFoodHighlighted;
        }
      }}
      renderHtml={true}
      type="fooddrink"
    />
  );
}
