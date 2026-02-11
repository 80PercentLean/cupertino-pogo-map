import { Button } from "@/components/ui/button";
import { type Marker } from "leaflet";
import { Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

import CMarker from "./CMarker";
import { useStore } from "./hooks/store";
import InteractionRadius from "./poi/InteractionRadius";
import NoCaPoiZone from "./poi/NoCaPoiZone";
import NoPowerSpotZone from "./poi/NoPowerSpotZone";
import {
  createBtnHide,
  createBtnInteractionRadius,
  createBtnNoCaPoiZone,
  createBtnNoPowerSpotZone,
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
  const {
    id,
    isVisible,
    position,
    showInteractionRadius,
    showNoCaPoiZone,
    showNoPowerSpotZone,
  } = useStore((s) => s.placedMarkerStates[i]);
  const removePlacedMarkerState = useStore((s) => s.removePlacedMarkerState);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const updatePlacedMarkerState = useStore((s) => s.updatePlacedMarkerState);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<Marker | null>(null);

  const isPopupOpen = activePopup.id && activePopup.id === id;

  const onBtnHideClick = () => {
    updatePlacedMarkerState(i, {
      isVisible: !isVisible,
    });
    setTimeout(() => setActivePopup(null, null), 0);
  };
  const btnHide = createBtnHide(onBtnHideClick);

  const onBtnInteractionRadiusClick = () => {
    updatePlacedMarkerState(i, {
      showInteractionRadius: !showInteractionRadius,
    });
  };
  const btnInteractionRadius = createBtnInteractionRadius(
    showInteractionRadius,
    onBtnInteractionRadiusClick,
  );

  const onBtnNoPowerSpotZoneClick = () => {
    updatePlacedMarkerState(i, {
      showNoPowerSpotZone: !showNoPowerSpotZone,
    });
  };
  const btnNoPowerSpotZone = createBtnNoPowerSpotZone(
    showNoPowerSpotZone,
    onBtnNoPowerSpotZoneClick,
  );

  const onBtnNoCaPoiZoneClick = () => {
    updatePlacedMarkerState(i, {
      showNoCaPoiZone: !showNoCaPoiZone,
    });
  };
  const btnNoCaPoiZone = createBtnNoCaPoiZone(
    showNoCaPoiZone,
    onBtnNoCaPoiZoneClick,
  );

  const btnDelete = (
    <Button
      size="icon"
      title="Delete Marker"
      variant="destructive"
      onClick={() => {
        removePlacedMarkerState(i);
        // This is a hack to prevent a new marker from being placed after the delete button is clicked
        setTimeout(() => {
          setActivePopup(null, null);
        }, 0);
      }}
      className="ml-2 cursor-pointer rounded-full hover:text-black"
      data-testid="delete-placed-marker-btn"
    >
      <Trash2 />
    </Button>
  );

  useEffect(() => {
    if (markerRef.current && isPopupOpen) {
      // Hack to get openPopup to work
      setTimeout(() => markerRef.current?.openPopup(), 0);
    }
  }, [isPopupOpen]);

  return (
    <>
      {showNoPowerSpotZone && <NoPowerSpotZone position={position} />}
      {showNoCaPoiZone && <NoCaPoiZone position={position} />}
      {showInteractionRadius && <InteractionRadius position={position} />}
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
              `Placed Marker #${i + 1}`,
              undefined,
              position,
              wayfarerMode
                ? undefined
                : `<p>You placed a marker at:<ul class="list-disc px-4"><li class="mb-2">Latitude: ${position[0]}</li><li>Longitude: ${position[1]}</li></ul></p>`,
              undefined,
              wayfarerMode,
              {
                delete: btnDelete,
                hide: btnHide,
                interactionRadius: btnInteractionRadius,
                noCaPoiZone: btnNoCaPoiZone,
                noPowerSpotZone: btnNoPowerSpotZone,
              },
              true,
            )}
          </Popup>
        )}
      </CMarker>
    </>
  );
}
