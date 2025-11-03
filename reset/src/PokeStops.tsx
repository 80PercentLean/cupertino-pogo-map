import L from "leaflet";
import { GeoJSON } from "react-leaflet";

import pokestops from "./geojson/pokestops.geojson?raw";
import { iconPokeStop, iconShowcase } from "./leafletIcons";

const pokeStopsJson = JSON.parse(pokestops);

export default function PokeStops() {
  return (
    <GeoJSON
      data={pokeStopsJson}
      filter={(feature) => {
        if (feature.properties.removed) {
          return false;
        }
        return true;
      }}
      pointToLayer={({ properties }, latlng) => {
        let icon = iconPokeStop;
        let typeTxt = "PokéStop";
        if (properties.type === "Showcase") {
          icon = iconShowcase;
          typeTxt = "Showcase";
        }

        const marker = L.marker(latlng, { icon }).bindPopup(`
          <b>${typeTxt}</b><br />
          ${properties.name}<br /><br />
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
