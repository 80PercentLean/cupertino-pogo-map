import { meetupSpotsJson } from "@/geojson/data";
import L from "leaflet";

import { iconMeetupSpot } from "../../leafletIcons";
import type { CFeature } from "../../types";
import Poi from "./Poi";
import { genPopupContent } from "./helper";

/**
 * Specialized <Poi> for rendering meetup spots.
 */
export default function MeetupSpots() {
  return (
    <Poi
      data={meetupSpotsJson}
      pointToLayer={({ properties }, latlng) => {
        const { desc, name } = properties as CFeature["properties"];

        return L.marker(latlng, { icon: iconMeetupSpot }).bindPopup(
          genPopupContent(name, "Meetup Spot", latlng, desc),
        );
      }}
    />
  );
}
