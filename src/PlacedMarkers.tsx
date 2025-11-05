import { Button } from "@/components/ui/button";
import type { LatLng, LeafletEventHandlerFnMap } from "leaflet";
import { useState } from "react";
import { Popup, useMapEvent } from "react-leaflet";

import CMarker from "./CMarker";
import { isMobileUa } from "./util";

const IS_MOBILE = isMobileUa();

/**
 * Allow markers to be placed arbitrarily on the map by the user.
 */
export default function PlacedMarkers() {
  const [coords, setCoords] = useState<LatLng[]>([]);

  let mapEvent: keyof LeafletEventHandlerFnMap = "click";
  if (IS_MOBILE) {
    mapEvent = "contextmenu";
  }

  useMapEvent(mapEvent, (e) => {
    console.log("Placed marker: ", e.latlng);
    setCoords((prevValue) => [...prevValue, e.latlng]);
  });

  return coords.map((c, i) => {
    const id = `placed-lat${c.lat},lng${c.lng}`;
    return (
      <CMarker key={id} position={c} data-testid={id}>
        <Popup>
          <Button
            onClick={() => {
              (async () => {
                try {
                  const clipboardTxt = `${c.lng},${c.lat}`;
                  await navigator.clipboard.writeText(clipboardTxt);
                  alert(`Copied "${clipboardTxt}" to your clipboard!`);
                } catch (err) {
                  // TODO: Show error message
                  console.error("Failed to copy text: ", err);
                }
              })().catch((err) => console.error("Failed to copy text: ", err)); // TODO: Show error message
            }}
          >
            Copy coordinates:
            <br />
            Longitude: {c.lng}
            <br />
            Latitude {c.lat}
          </Button>
          <br />
          <Button
            onClick={() => {
              // This is a hack to prevent a new marker from being placed after the delete button is clicked
              setTimeout(() => {
                setCoords((s) => {
                  console.log("Deleted placed marker: ", s[i]);
                  return [...s.slice(0, i), ...s.slice(i + 1)];
                });
              }, 0);
            }}
            data-testid="delete-placed-marker-btn"
          >
            Delete
          </Button>
        </Popup>
      </CMarker>
    );
  });
}
