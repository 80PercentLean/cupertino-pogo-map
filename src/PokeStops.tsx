import type { GeoJSON } from "geojson";
import L from "leaflet";

import Poi from "./Poi";
import pokestops from "./geojson/pokestops.geojson?raw";
import { iconPokeStop, iconShowcase } from "./leafletIcons";
import type { PoiFeature } from "./types";

const pokeStopsJson = JSON.parse(pokestops) as GeoJSON;

/**
 * Specialized <Poi> for rendering PokeStops.
 */
export default function PokeStops() {
  return (
    <Poi
      data={pokeStopsJson}
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
