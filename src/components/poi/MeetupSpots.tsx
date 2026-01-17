import { meetupSpotsJson } from "@/geojson/data";
import { type LatLngTuple } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { iconMeetupSpot } from "../../leafletIcons";
import { useStore } from "../hooks/store";
import { genPopupContentReact } from "./helper";

/**
 * Render meetup spots.
 */
export default function MeetupSpots() {
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  return meetupSpotsJson.features.map(({ geometry, properties }, i) => {
    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;
    const { desc, name } = properties;

    return (
      <Marker key={i} icon={iconMeetupSpot} position={latlng}>
        <Popup>
          {genPopupContentReact(
            name,
            "Meetup Spot",
            latlng,
            desc,
            undefined,
            wayfarerMode,
          )}
        </Popup>
      </Marker>
    );
  });
}
