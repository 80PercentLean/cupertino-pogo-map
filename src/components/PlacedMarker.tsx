import { Button } from "@/components/ui/button";
import { IS_MOBILE } from "@/constantsDom";
import { iconDefault, iconDefaultHighlighted } from "@/leafletIcons";
import { type Marker } from "leaflet";
import { Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Popup, Tooltip } from "react-leaflet";
import { useSearchParams } from "react-router";

import CMarker from "./CMarker";
import InteractionRadius from "./features/InteractionRadius";
import NoCaPoiZone from "./features/NoCaPoiZone";
import NoPowerSpotZone from "./features/NoPowerSpotZone";
import { useRemoveIdQueryParam } from "./hooks";
import { useStore } from "./hooks/store";
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
    isHighlighted,
    isVisible,
    position,
    showInteractionRadius,
    showNoCaPoiZone,
    showNoPowerSpotZone,
  } = useStore((s) => s.placedMarkerStates[i]);
  const removePlacedMarkerState = useStore((s) => s.removePlacedMarkerState);
  const updatePlacedMarkerState = useStore((s) => s.updatePlacedMarkerState);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<Marker | null>(null);

  const [, setSearchParams] = useSearchParams();
  const removeIdQueryParam = useRemoveIdQueryParam();

  const isPopupOpen = activePopup && activePopup === id;

  const onBtnHideClick = () => {
    updatePlacedMarkerState(i, {
      isVisible: !isVisible,
    });
    removeIdQueryParam();
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
        removeIdQueryParam();
      }}
      className="flex cursor-pointer flex-col gap-1 rounded-sm hover:text-black"
      data-testid="delete-placed-marker-btn"
    >
      <Trash2 />
      <span className="text-[8px] uppercase">Del</span>
    </Button>
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (markerRef.current && isPopupOpen) {
      // Hack to get openPopup to work
      timeout = setTimeout(() => markerRef.current?.openPopup(), 0);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isPopupOpen]);

  const shareUrl = new URL(window.location.href);
  shareUrl.search = "";
  shareUrl.searchParams.set("latlng", position.toString());

  const title = `Placed Marker #${i + 1}`;

  return (
    <>
      {showNoPowerSpotZone && <NoPowerSpotZone position={position} />}
      {showNoCaPoiZone && <NoCaPoiZone position={position} />}
      {showInteractionRadius && <InteractionRadius position={position} />}
      <CMarker
        ref={markerRef}
        alt={title}
        icon={
          iconDefaultHighlighted && isHighlighted
            ? iconDefaultHighlighted
            : iconDefault
        }
        position={position}
        zIndexOffset={isHighlighted ? 10000 : 0}
        data-testid={id}
        eventHandlers={{
          click: () => {
            setSearchParams(
              (s) => {
                s.set("id", id);
                s.set("latlng", position.toString());
                return s;
              },
              { replace: true },
            );
          },
          popupclose: () => {
            setSearchParams(
              (s) => {
                s.delete("id");
                s.delete("latlng");
                return s;
              },
              { replace: true },
            );
          },
        }}
      >
        {!IS_MOBILE && <Tooltip>{title}</Tooltip>}
        {isPopupOpen && (
          <Popup>
            {createPopupContent(
              title,
              undefined,
              position,
              wayfarerMode
                ? undefined
                : `<p>You placed a marker at:<ul class="list-disc px-4"><li class="mb-2">Latitude: <span class="font-mono">${position[0]}</span></li><li>Longitude: <span class="font-mono">${position[1]}</span></li></ul></p>`,
              undefined,
              wayfarerMode,
              undefined,
              shareUrl.toString(),
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
