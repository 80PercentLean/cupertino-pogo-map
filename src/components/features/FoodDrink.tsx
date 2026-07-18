import { fooddrinkJson } from "@/geojson/data";
import { iconFooddrink, iconFooddrinkHighlighted } from "@/leafletIcons";

import Features from "./Features";

export default function Fooddrink() {
  return (
    <Features
      btnModifierFlags={{ hide: true }}
      features={fooddrinkJson.features}
      icon={iconFooddrink}
      iconHighlighted={iconFooddrinkHighlighted}
      renderHtml={true}
      type="fooddrink"
    />
  );
}
