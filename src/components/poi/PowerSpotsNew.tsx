import { powerSpotsJson } from "@/geojson/data";
import { iconPowerSpot } from "@/leafletIcons";
import type { LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { useStore } from "../hooks/store";
import CaBlockedRange from "./CaBlockedRange";
import { genPopupContentReact } from "./helper";

export default function PowerSpotsNew() {
  const wayfarerTools = useStore((s) => s.wayfarerTools);

  return powerSpotsJson.features.map(({ geometry, properties }, i) => {
    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;
    const { desc, name, photo } = properties;

    return (
      <>
        <CaBlockedRange latlng={latlng} />
        <Marker key={i} icon={iconPowerSpot} position={latlng}>
          <Popup>
            {genPopupContentReact(
              name,
              "Power Spot",
              latlng,
              desc,
              photo,
              wayfarerTools,
            )}
          </Popup>
        </Marker>
      </>
    );
  });
}
