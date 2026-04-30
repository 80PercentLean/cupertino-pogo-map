import { meetupspotsJson } from "@/geojson/data";

import { iconMeetupspot, iconMeetupspotHighlighted } from "../../leafletIcons";
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
      iconHighlighted={iconMeetupspotHighlighted}
      subtitle="Meetup Spot"
      type="meetupspot"
    />
  );
}
