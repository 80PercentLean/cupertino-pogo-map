import { powerSpotsJson } from "@/geojson/data";
import { type LatLngTuple } from "leaflet";

import PowerSpotMarker from "./PowerSpotMarker";

export default function PowerSpotsNew() {
  return powerSpotsJson.features.map(({ geometry, properties }, i) => {
    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;
    const { desc, inactive, name, photo } = properties;

    return (
      <PowerSpotMarker
        id={i}
        desc={desc}
        inactive={inactive}
        latlng={latlng}
        name={name}
        photo={photo}
      />
    );
  });
}
