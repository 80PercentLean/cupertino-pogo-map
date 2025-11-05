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
        if (feature.properties.removed) {
          return false;
        }
        return true;
      }}
      pointToLayer={({ properties }, latlng) => {
        const marker = L.marker(latlng, {
          icon: iconPowerSpot,
        }).bindPopup(`<b>Power Spot</b><br />
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
