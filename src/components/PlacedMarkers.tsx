import { type LeafletEventHandlerFnMap } from "leaflet";
import { useState } from "react";
import { useMapEvent } from "react-leaflet";

import { isMobileUa } from "../util";
import PlacedMarker, { type PlacedMarkerState } from "./PlacedMarker";
import { useStore } from "./hooks/store";

// import InteractionRadius from "./poi/InteractionRadius";
// import NoCaPoiZone from "./poi/NoCaPoiZone";
// import NoPowerSpotZone from "./poi/NoPowerSpotZone";

const IS_MOBILE = isMobileUa();

/**
 * Handles markers that are arbitrarily placed by the user.
 */
export default function PlacedMarkers() {
  const activePopup = useStore((s) => s.activePopup);
  // const showInteractionRadius = useStore((s) => s.layers.interactionRadii);
  // const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  // const showPowerSpotZones = useStore((s) => s.layers.noPowerSpotZones);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const [placedMarkerStates, setPlacedMarkerStates] = useState<
    PlacedMarkerState[]
  >([]);

  let mapEvent: keyof LeafletEventHandlerFnMap = "click";
  if (IS_MOBILE) {
    mapEvent = "contextmenu";
  }

  useMapEvent(mapEvent, ({ latlng }) => {
    if (!activePopup.id) {
      setPlacedMarkerStates((s) => [
        ...s,
        { position: [latlng.lat, latlng.lng], isVisible: true },
      ]);

      if (wayfarerMode) {
        console.log("Placed marker: ", latlng);
      }
    }
  });

  const placedMarkers = [];
  for (const [i, { isVisible, position }] of placedMarkerStates.entries()) {
    if (isVisible) {
      const id = `placed-${i}-lat${position[0]},lng${position[1]}`;

      placedMarkers.push(
        <PlacedMarker
          key={id}
          id={id}
          i={i}
          placedMarkerState={placedMarkerStates[i]}
          position={position}
          setPlacedMarkerStates={setPlacedMarkerStates}
        />,
      );
    }
  }

  return placedMarkers;
}
