import { gymsJson } from "@/geojson/data";
import type { LatLngTuple } from "leaflet";

import { useStore } from "../hooks/store";
import GymMarker from "./GymMarker";

/**
 * Render gyms.
 */
export default function Gyms() {
  const showHidden = useStore((s) => s.modifiers.hidden);
  const showRemoved = useStore((s) => s.modifiers.removed);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markers = [];

  for (const { id, geometry, properties } of gymsJson.features) {
    const { desc, hidden, name, photo, source, removed } = properties;

    if ((!showHidden && hidden) || (!showRemoved && removed)) {
      // Skip if hidden or removed and those modifiers are off
      continue;
    }

    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;

    let subtitle = "Gym";
    if (hidden) {
      subtitle += " (Hidden)";
    }
    if (removed) {
      subtitle += " (Removed)";
    }
    if (wayfarerMode) {
      subtitle += ` [${source}]`;
    }

    markers.push(
      <GymMarker
        key={id}
        id={id as string}
        desc={desc}
        latlng={latlng}
        removed={removed}
        subtitle={subtitle}
        title={name}
        photo={photo}
      />,
    );
  }

  return markers;
}
