import { type LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { devpoisJson } from "../../geojson/data";
import { iconDev } from "../../leafletIcons";
import { useStore } from "../hooks/store";
import { genPopupContentReact } from "./helper";

export default function DevPois() {
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  return devpoisJson.features.map(({ geometry, properties }, i) => {
    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;
    const { name } = properties;

    return (
      <Marker key={i} icon={iconDev} position={latlng}>
        <Popup>
          {genPopupContentReact(
            name,
            "Wayfarer Submission",
            latlng,
            "<p>This POI is currently going through the Wayfarer submission process. It can potentially become an in-game structure like a PokéStop or power spot.</p>",
            undefined,
            wayfarerMode,
          )}
        </Popup>
      </Marker>
    );
  });
}
