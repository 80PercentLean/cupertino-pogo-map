import { meetupspotsJson } from "@/geojson/data";

import { iconMeetupspot } from "../../leafletIcons";
import Features from "./Features";

/**
 * Render meetup spots.
 */
export default function MeetupSpots() {
  return (
    <Features
      btnModifierFlags={{ hide: true }}
      features={meetupspotsJson.features}
      icon={iconMeetupspot}
      subtitle="Meetup Spot"
      type="meetupspot"
    />
  );
}
