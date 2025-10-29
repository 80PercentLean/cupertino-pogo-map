import L from "leaflet";
import { GeoJSON } from "react-leaflet";

import powerSpots from "./geojson/powerspots.geojson?raw";
import { iconPowerSpot } from "./leafletIcons";

const powerSpotsJson = JSON.parse(powerSpots);

export default function PowerSpots() {
  return (
    <GeoJSON
      data={powerSpotsJson}
      filter={(feature) => {
        if (feature.properties.disabled) {
          return false;
        }
        return true;
      }}
      pointToLayer={({ properties }, latlng) => {
        const marker = L.marker(latlng, {
          icon: iconPowerSpot,
          riseOnHover: true,
        }).bindPopup(`Power Spot: ${properties.name}`);

        return marker;
      }}
    />
  );
}
