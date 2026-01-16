import { powerSpotsJson } from "@/geojson/data";
import { type LatLngTuple } from "leaflet";

import PowerSpotMarker from "./PowerSpotMarker";

export default function PowerSpotsNew() {
  return powerSpotsJson.features.map(({ id, geometry, properties }) => {
    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;
    const { desc, inactive, name, photo } = properties;

    return (
      <PowerSpotMarker
        key={id}
        desc={desc}
        inactive={inactive}
        latlng={latlng}
        name={name}
        photo={photo}
      />
    );
  });
}
