import L from "leaflet";
import { GeoJSON, useMap } from "react-leaflet";

import gyms from "./geojson/gyms.geojson?raw";
import { iconGym } from "./leafletIcons";

const gymsJson = JSON.parse(gyms);

export default function Gyms() {
  const map = useMap();

  console.log({ map });
  return (
    <GeoJSON
      data={gymsJson}
      filter={(feature) => {
        if (feature.properties.disabled) {
          return false;
        }
        return true;
      }}
      pointToLayer={({ id, properties }, latlng) => {
        const marker = L.marker(latlng, {
          icon: iconGym,
          riseOnHover: true,
          // @ts-expect-error Add custom property to marker
          geojsonId: id,
        }).bindPopup(`Gym: ${properties.name}`);

        return marker;
      }}
    />
  );
}
