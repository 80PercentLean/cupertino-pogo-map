import { Button } from "@/components/ui/button";
import { type Marker } from "leaflet";
import { useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

import BtnCopyCoords from "./BtnCopyCoords";
import CMarker from "./CMarker";
import { useStore } from "./hooks/store";
import InteractionRadius from "./poi/InteractionRadius";
import {
  createBtnHide,
  createBtnInteractionRadius,
  createPopupContent,
} from "./popupHelper";

export interface Props {
  i: number;
}

/**
 * Render a marker for placed markers.
 */
export default function PlacedMarker({ i }: Props) {
  const activePopup = useStore((s) => s.activePopup);
  const { id, isVisible, position, showInteractionRadius } = useStore(
    (s) => s.placedMarkerStates[i],
  );
  const removePlacedMarkerState = useStore((s) => s.removePlacedMarkerState);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const updatePlacedMarkerState = useStore((s) => s.updatePlacedMarkerState);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<Marker | null>(null);

  const isPopupOpen = activePopup.id && activePopup.id === id;

  const onHideClick = () => {
    updatePlacedMarkerState(i, {
      isVisible: !isVisible,
    });
    setTimeout(() => setActivePopup(null, null), 0);
  };
  const btnHide = createBtnHide(onHideClick);

  const onInteractionRadiusBtnClick = () => {
    updatePlacedMarkerState(i, {
      showInteractionRadius: !showInteractionRadius,
    });
  };
  const btnInteractionRadius = createBtnInteractionRadius(
    showInteractionRadius,
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
      {showInteractionRadius && <InteractionRadius latlng={position} />}
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
                  removePlacedMarkerState(i);
                  // This is a hack to prevent a new marker from being placed after the delete button is clicked
                  setTimeout(() => {
                    setActivePopup(null, null);
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
