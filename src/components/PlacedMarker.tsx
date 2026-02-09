import { Button } from "@/components/ui/button";
import { type LatLngTuple, type Marker } from "leaflet";
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

import BtnCopyCoords from "./BtnCopyCoords";
import CMarker from "./CMarker";
import { useStore } from "./hooks/store";
import { type MarkerState } from "./hooks/store";
import InteractionRadius from "./poi/InteractionRadius";
import {
  createBtnHide,
  createBtnInteractionRadius,
  createPopupContent,
} from "./popupHelper";

export interface PlacedMarkerState extends MarkerState {
  position: LatLngTuple;
}

export interface Props {
  id: string;
  i: number;
  placedMarkerState: PlacedMarkerState;
  position: LatLngTuple;
  setPlacedMarkerStates: Dispatch<SetStateAction<PlacedMarkerState[]>>;
}

/**
 * Render a marker for placed markers.
 */
export default function PlacedMarker({
  id,
  i,
  placedMarkerState,
  position,
  setPlacedMarkerStates,
}: Props) {
  const activePopup = useStore((s) => s.activePopup);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<Marker | null>(null);

  const isPopupOpen = activePopup.id && activePopup.id === id;

  const onHideClick = () => {
    setPlacedMarkerStates((s) => [
      ...s.slice(0, i),
      {
        ...s[i],
        isVisible: false,
      },
      ...s.slice(i + 1),
    ]);
    setTimeout(() => setActivePopup(null, null), 0);
  };
  const btnHide = createBtnHide(onHideClick);

  const onInteractionRadiusBtnClick = () => {
    setPlacedMarkerStates((s) => [
      ...s.slice(0, i),
      {
        ...s[i],
        showInteractionRadius: !s[i].showInteractionRadius,
      },
      ...s.slice(i + 1),
    ]);
  };
  const btnInteractionRadius = createBtnInteractionRadius(
    placedMarkerState.showInteractionRadius,
    onInteractionRadiusBtnClick,
  );

  useEffect(() => {
    if (markerRef.current && isPopupOpen) {
      // Hack to get openPopup to work
      setTimeout(() => markerRef.current?.openPopup(), 0);
    }
  }, [isPopupOpen]);

  return (
    <>
      {/* {showNoCaPoiZones && <NoCaPoiZone latlng={c} />} */}
      {placedMarkerState.showInteractionRadius && (
        <InteractionRadius latlng={position} />
      )}
      {/*{showPowerSpotZones && <NoPowerSpotZone latlng={c} />} */}
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
            {createPopupContent(
              "Placed Marker",
              undefined,
              position,
              `You placed a marker at ${position[0]}, ${position[1]}).`,
              undefined,
              wayfarerMode,
              { hide: btnHide, interactionRadius: btnInteractionRadius },
            )}
            <div className="flex items-center justify-between gap-1">
              {wayfarerMode && (
                <BtnCopyCoords lat={position[0]} lng={position[1]} />
              )}
              <Button
                variant="destructive"
                onClick={() => {
                  // This is a hack to prevent a new marker from being placed after the delete button is clicked
                  setTimeout(() => {
                    setPlacedMarkerStates((s) => {
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
