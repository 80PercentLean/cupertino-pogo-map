import { type LeafletEventHandlerFnMap } from "leaflet";
import { useMapEvent } from "react-leaflet";

import { IS_MOBILE } from "../constantsDom";
import PlacedMarker from "./PlacedMarker";
import { useStore } from "./hooks/store";

/**
 * Handles markers that are arbitrarily placed by the user.
 */
export default function PlacedMarkers() {
  const activePopup = useStore((s) => s.activePopup);
  const addPlacedMarkerState = useStore((s) => s.addPlacedMarkerState);
  const placedMarkerStates = useStore((s) => s.placedMarkerStates);

  let mapEvent: keyof LeafletEventHandlerFnMap = "click";
  if (IS_MOBILE) {
    mapEvent = "contextmenu";
  }

  useMapEvent(mapEvent, ({ latlng }) => {
    if (!activePopup.id) {
      addPlacedMarkerState([latlng.lat, latlng.lng]);
    }
  });

  const placedMarkers = [];
  for (const [i, { id, isVisible }] of placedMarkerStates.entries()) {
    if (isVisible) {
      placedMarkers.push(<PlacedMarker key={id} i={i} />);
    }
  }

  return placedMarkers;
}
