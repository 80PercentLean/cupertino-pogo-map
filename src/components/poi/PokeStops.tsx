import { pokestopsJson } from "@/geojson/data";
import L from "leaflet";

import { iconPokeStop, iconShowcase } from "../../leafletIcons";
import type { PoiFeature } from "../../types";
import Poi from "./Poi";

/**
 * Specialized <Poi> for rendering PokeStops.
 */
export default function PokeStops() {
  return (
    <Poi
      data={pokestopsJson}
      pointToLayer={({ properties }, latlng) => {
        const poiProperties = properties as PoiFeature["properties"];
        let icon = iconPokeStop;
        let typeTxt = "PokéStop";
        if (poiProperties.type === "Showcase") {
          icon = iconShowcase;
          typeTxt = "Showcase";
        }

        const marker = L.marker(latlng, { icon }).bindPopup(`
          <b>${typeTxt}</b><br />
          ${poiProperties.name}<br /><br />
          Directions:
          <ul>
          <li><a href="https://maps.google.com/maps?q=${latlng.lat},${latlng.lng}" rel="noopener noreferrer" target="_blank">Google Maps</a></li>
          <li><a href="https://maps.apple.com/place?coordinate=${latlng.lat},${latlng.lng}" rel="noopener noreferrer" target="_blank">Apple Maps</a></li>
          </ul>`);

        return marker;
      }}
    />
  );
}
