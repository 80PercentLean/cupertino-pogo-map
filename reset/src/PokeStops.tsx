import L from "leaflet";
import { GeoJSON } from "react-leaflet";

import pokestops from "./geojson/pokestops.geojson?raw";
import { iconPokeStop } from "./leafletIcons";

const pokeStopsJson = JSON.parse(pokestops);

export default function PokeStops() {
  return (
    <GeoJSON
      data={pokeStopsJson}
      filter={(feature) => {
        if (feature.properties.disabled) {
          return false;
        }
        return true;
      }}
      pointToLayer={({ properties }, latlng) => {
        const marker = L.marker(latlng, {
          icon: iconPokeStop,
          riseOnHover: true,
        }).bindPopup(`PokéStop: ${properties.name}`);

        return marker;
      }}
    />
  );
}
