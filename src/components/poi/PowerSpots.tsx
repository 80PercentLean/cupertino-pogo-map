import { powerSpotsJson } from "@/geojson/data";
import { type LatLngTuple } from "leaflet";

import { useStore } from "../hooks/store";
import PowerSpotMarker from "./PowerSpotMarker";

/**
 * Render power spots.
 */
export default function PowerSpots() {
  const showHidden = useStore((s) => s.modifiers.hidden);
  const showInactive = useStore((s) => s.modifiers.inactive);
  const showRemoved = useStore((s) => s.modifiers.removed);

  const markers = [];

  for (const { id, geometry, properties } of powerSpotsJson.features) {
    const { desc, hidden, inactive, name, photo, removed } = properties;

    if (
      (!showHidden && hidden) ||
      (!showInactive && inactive) ||
      (!showRemoved && removed)
    ) {
      // Skip if hidden or removed and those modifiers are off
      continue;
    }

    let subtitle = "Power Spot";
    if (hidden) {
      subtitle += " (Hidden)";
    }
    if (inactive) {
      subtitle += " (Inactive)";
    }
    if (removed) {
      subtitle += " (Removed)";
    }

    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;

    markers.push(
      <PowerSpotMarker
        key={id}
        desc={desc}
        inactive={inactive}
        latlng={latlng}
        photo={photo}
        removed={removed}
        subtitle={subtitle}
        title={name}
      />,
    );
  }

  return markers;
}
