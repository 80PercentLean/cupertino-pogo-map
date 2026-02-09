import type { CProperties } from "@/types/CFeatures";
import { DivIcon, type LatLngTuple, type Marker } from "leaflet";
import { Icon } from "leaflet";
import { useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

import CMarker from "../CMarker";
import { getLayerKeyFromType, useStore } from "../hooks/store";
// import NoCaPoiZone from "./NoCaPoiZone";
import {
  createBtnHide,
  createBtnInteractionRadius,
  createPopupContent,
} from "../popupHelper";
import InteractionRadius from "./InteractionRadius";

export interface IsBtnOn {
  hide?: boolean;
  interactionRadius?: boolean;
}

export interface Props {
  desc?: string;
  icon: DivIcon | Icon;
  id: string;
  inactive?: boolean;
  isBtnOn?: IsBtnOn;
  latlng: LatLngTuple;
  photo?: string;
  removed?: boolean | string;
  renderHtml?: boolean;
  subtitle?: string;
  title: string;
  type: CProperties["type"];
}

/**
 * Render a marker for features such as POIs & labels.
 */
export default function FeatureMarker({
  desc,
  id,
  isBtnOn,
  latlng,
  icon,
  inactive,
  photo,
  removed,
  renderHtml,
  subtitle,
  title,
  type,
}: Props) {
  const activePopup = useStore((s) => s.activePopup);
  const setMarker = useStore((s) => s.setMarker);
  const showInteractionRadius = useStore(
    (s) => s[getLayerKeyFromType(type)][id].showInteractionRadius,
  );
  // const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<Marker | null>(null);

  const isPopupOpen = activePopup.id && activePopup.id === id;

  const onHideClick = () => {
    setMarker(type, id, { isVisible: false });
    // Hack to prevent placing marker immediately on hide
    setTimeout(() => setActivePopup(null, null), 0);
  };
  let btnHide;
  if (isBtnOn?.hide) {
    btnHide = createBtnHide(onHideClick);
  }

  const onInteractionRadiusBtnClick = () => {
    if (showInteractionRadius) {
      setMarker(type, id, { showInteractionRadius: false });
    } else {
      setMarker(type, id, { showInteractionRadius: true });
    }
  };
  let btnInteractionRadius;
  if (isBtnOn?.interactionRadius) {
    btnInteractionRadius = createBtnInteractionRadius(
      showInteractionRadius,
      onInteractionRadiusBtnClick,
    );
  }

  useEffect(() => {
    if ((inactive || removed) && markerRef.current) {
      // Add grayscale class to inactive or removed power spots
      markerRef.current?.getElement()?.classList.add("grayscale");
    }
  }, [inactive, removed]);

  useEffect(() => {
    if (markerRef.current && isPopupOpen) {
      // Hack to get openPopup to work
      setTimeout(() => markerRef.current?.openPopup(), 0);
    }
  }, [isPopupOpen]);

  return (
    <>
      {/* Do not show NoCaPoiZone for inactive power spots */}
      {/* {!inactive && !removed && showNoCaPoiZones && (
          <NoCaPoiZone latlng={latlng} />
        )} */}
      {/* Do not show interactive radius for inactive power spots */}
      {!inactive && !removed && showInteractionRadius && (
        <InteractionRadius latlng={latlng} />
      )}
      <CMarker
        ref={markerRef}
        icon={icon}
        position={latlng}
        eventHandlers={{
          click: () => setActivePopup(id, type),
          popupclose: () => setActivePopup(null, null),
        }}
      >
        {isPopupOpen && (
          <Popup>
            {createPopupContent(
              title,
              subtitle,
              latlng,
              desc,
              photo,
              wayfarerMode,
              {
                hide: btnHide,
                interactionRadius: btnInteractionRadius,
              },
              renderHtml,
            )}
          </Popup>
        )}
      </CMarker>
    </>
  );
}
