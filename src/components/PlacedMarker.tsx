import { Button } from "@/components/ui/button";
import { type LatLngTuple, type Marker } from "leaflet";
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

import BtnCopyCoords from "./BtnCopyCoords";
import CMarker from "./CMarker";
import { useStore } from "./hooks/store";

export interface Props {
  i: number;
  position: LatLngTuple;
  setCoords: Dispatch<SetStateAction<LatLngTuple[]>>;
}

/**
 * Render a marker for placed markers.
 */
export default function PlacedMarker({ i, position, setCoords }: Props) {
  const activePopup = useStore((s) => s.activePopup);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<Marker | null>(null);

  const id = `placed-${i}-lat${position[0]},lng${position[1]}`;
  const isPopupOpen = activePopup.id && activePopup.id === id;

  useEffect(() => {
    if (markerRef.current && isPopupOpen) {
      // Hack to get openPopup to work
      setTimeout(() => markerRef.current?.openPopup(), 0);
    }
  }, [isPopupOpen]);

  return (
    <>
      {/* {showNoCaPoiZones && <NoCaPoiZone latlng={c} />}
        {showInteractionRadius && <InteractionRadius latlng={c} />}
        {showPowerSpotZones && <NoPowerSpotZone latlng={c} />} */}
      <CMarker
        ref={markerRef}
        position={position}
        data-testid={id}
        eventHandlers={{
          click: () => setActivePopup(id, "placed"),
          popupclose: () => setActivePopup(null, null),
        }}
      >
        {isPopupOpen && (
          <Popup>
            <p>You placed a marker at...</p>
            <p>
              <span className="font-bold">Latitude:</span> {position[0]}
              <br />
              <span className="font-bold">Longitude:</span> {position[1]}
            </p>
            <div className="flex items-center justify-between gap-1">
              {wayfarerMode && (
                <BtnCopyCoords lat={position[0]} lng={position[1]} />
              )}
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
        )}
      </CMarker>
    </>
  );
}
