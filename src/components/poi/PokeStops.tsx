import { pokestopsJson } from "@/geojson/data";
import { iconPokeStop, iconShowcase } from "@/leafletIcons";
import type { LatLngTuple } from "leaflet";

import { useStore } from "../hooks/store";
import PokeStopMarker from "./PokeStopMarker";

/**
 * Render PokeStops.
 */
export default function PokeStops() {
  const showHidden = useStore((s) => s.modifiers.hidden);
  const showRemoved = useStore((s) => s.modifiers.removed);

  const markers = [];

  for (const { id, geometry, properties } of pokestopsJson.features) {
    if (
      (!showHidden && properties.hidden) ||
      (!showRemoved && properties.removed)
    ) {
      // Skip if hidden or removed and those modifiers are off
      continue;
    }

    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;
    const { desc, name, photo, removed, type } = properties;

    let icon;
    let subtitle;
    switch (type) {
      case "Showcase":
        icon = iconShowcase;
        subtitle = "Showcase";
        break;
      default:
        icon = iconPokeStop;
        subtitle = "PokéStop";
    }
    if (properties.hidden) {
      subtitle += " (Hidden)";
    }
    if (properties.removed) {
      subtitle += " (Removed)";
    }

    markers.push(
      <PokeStopMarker
        key={id}
        desc={desc}
        icon={icon}
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
