import { type LatLngTuple, type LeafletEventHandlerFnMap } from "leaflet";
import { useState } from "react";
import { useMapEvent } from "react-leaflet";

import { isMobileUa } from "../util";
import PlacedMarker from "./PlacedMarker";
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

  const [coords, setCoords] = useState<LatLngTuple[]>([]);

  let mapEvent: keyof LeafletEventHandlerFnMap = "click";
  if (IS_MOBILE) {
    mapEvent = "contextmenu";
  }

  useMapEvent(mapEvent, ({ latlng }) => {
    if (!activePopup.id) {
      setCoords((prevValue) => [...prevValue, [latlng.lat, latlng.lng]]);

      if (wayfarerMode) {
        console.log("Placed marker: ", latlng);
      }
    }
  });

  return coords.map((c, i) => {
    return <PlacedMarker i={i} position={c} setCoords={setCoords} />;
  });
}
