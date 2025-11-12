import { Button } from "@/components/ui/button";
import type { LatLng, LeafletEventHandlerFnMap } from "leaflet";
import { useState } from "react";
import { Popup, useMapEvent } from "react-leaflet";
import { toast } from "sonner";

import { isMobileUa } from "../util";
import CMarker from "./CMarker";

const IS_MOBILE = isMobileUa();

/**
 * Handles markers be placed arbitrarily on the map by the user.
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
    const ERR_COPY_LOG = "Failed to copy to clipboard: ";

    const id = `placed-lat${c.lat},lng${c.lng}`;
    return (
      <CMarker key={id} position={c} data-testid={id}>
        <Popup>
          <p>You placed a marker at...</p>
          <p>
            <span className="font-bold">Longitude:</span> {c.lng}
            <br />
            <span className="font-bold">Latitude:</span> {c.lat}
          </p>
          <div className="flex items-center justify-between gap-1">
            <Button
              className="shadow-sm shadow-gray-500"
              onClick={() => {
                (async () => {
                  try {
                    const clipboardTxt = `${c.lng},${c.lat}`;
                    await navigator.clipboard.writeText(clipboardTxt);
                    toast(`"${clipboardTxt}" was copied your clipboard!`);
                  } catch (err) {
                    toast.error("Failed to copy coordinates to the clipboard.");
                    console.error(ERR_COPY_LOG, err);
                  }
                })().catch((err) => console.error(ERR_COPY_LOG, err)); // TODO: Show error message
              }}
            >
              Copy coords
            </Button>
            <br />
            <Button
              variant="destructive"
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
          </div>
        </Popup>
      </CMarker>
    );
  });
}
