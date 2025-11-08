import { pokestopsJson } from "@/geojson/data";
import L from "leaflet";

import { iconPokeStop, iconShowcase } from "../../leafletIcons";
import type { PoiFeature } from "../../types";
import Poi from "./Poi";
import { genPopupContent } from "./helper";

/**
 * Specialized <Poi> for rendering PokeStops.
 */
export default function PokeStops() {
  return (
    <Poi
      data={pokestopsJson}
      pointToLayer={({ properties }, latlng) => {
        const { desc, name, type } = properties as PoiFeature["properties"];

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

        return L.marker(latlng, { icon }).bindPopup(
          genPopupContent(name, typeTxt, latlng, desc),
        );
      }}
    />
  );
}
