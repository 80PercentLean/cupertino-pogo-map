import { meetupspotsJson } from "@/geojson/data";

import { iconMeetupspot } from "../../leafletIcons";
import Features from "./Features";

/**
 * Render meetup spots.
 */
export default function MeetupSpots() {
  return (
    <Features
      features={meetupspotsJson.features}
      icon={iconMeetupspot}
      isBtnOn={{ hide: true }}
      subtitle="Meetup Spot"
      type="meetupspot"
    />
  );
}
