import { Button } from "@/components/ui/button";
import type { LatLng, LeafletEventHandlerFnMap } from "leaflet";
import { useState } from "react";
import { Circle, Popup, useMapEvent } from "react-leaflet";

import { isMobileUa } from "../util";
import BtnCopyCoords from "./BtnCopyCoords";
import CMarker from "./CMarker";
import { useStore } from "./hooks/store";

const IS_MOBILE = isMobileUa();

/**
 * Handles markers that are arbitrarily placed by the user.
 */
export default function PlacedMarkers() {
  const wayfarerMode = useStore((s) => s.wayfarerMode);

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
      <>
        <Circle
          center={c}
          interactive={false}
          pathOptions={{ fillColor: "red", stroke: false }}
          radius={30}
        />
        <CMarker key={id} position={c} data-testid={id}>
          <Popup>
            <p>You placed a marker at...</p>
            <p>
              <span className="font-bold">Latitude:</span> {c.lat}
              <br />
              <span className="font-bold">Longitude:</span> {c.lng}
            </p>
            <div className="flex items-center justify-between gap-1">
              {wayfarerMode && <BtnCopyCoords lat={c.lat} lng={c.lng} />}
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
                className="cursor-pointer"
                data-testid="delete-placed-marker-btn"
              >
                Delete
              </Button>
            </div>
          </Popup>
        </CMarker>
      </>
    );
  });
}
