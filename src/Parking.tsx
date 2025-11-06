import type { GeoJSON } from "geojson";
import L from "leaflet";

import Poi from "./Poi";
import parking from "./geojson/parking.geojson?raw";
import { iconParking } from "./leafletIcons";
import type { PoiFeature } from "./types";

const parkingJson = JSON.parse(parking) as GeoJSON;

export default function Parking() {
  return (
    <Poi
      data={parkingJson}
      pointToLayer={({ properties }, latlng) => {
        const poiProperties = properties as PoiFeature["properties"];
        const marker = L.marker(latlng, { icon: iconParking }).bindPopup(
          `<b>Parking</b><br />
          ${poiProperties.name}<br /><br />
          Directions:
          <ul>
          <li><a href="https://maps.google.com/maps?q=${latlng.lat},${latlng.lng}" rel="noopener noreferrer" target="_blank">Google Maps</a></li>
          <li><a href="https://maps.apple.com/place?coordinate=${latlng.lat},${latlng.lng}" rel="noopener noreferrer" target="_blank">Apple Maps</a></li>
          </ul>`,
        );

        return marker;
      }}
    />
  );
}
