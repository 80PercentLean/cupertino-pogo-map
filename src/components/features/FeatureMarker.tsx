import type { CProperties } from "@/types/CFeatures";
import { DivIcon, type LatLngTuple, type Marker } from "leaflet";
import { Icon } from "leaflet";
import { useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

import CMarker from "../CMarker";
import { getLayerKeyFromType, useStore } from "../hooks/store";
// import NoCaPoiZone from "./NoCaPoiZone";
import {
  type ModifierBtns,
  createBtnHide,
  createBtnInteractionRadius,
  createBtnNoCaPoiZone,
  createBtnNoPowerSpotZone,
  createPopupContent,
} from "../popupHelper";
import InteractionRadius from "./InteractionRadius";
import NoCaPoiZone from "./NoCaPoiZone";
import NoPowerSpotZone from "./NoPowerSpotZone";

export interface BtnModifierFlags {
  hide?: boolean;
  interactionRadius?: boolean;
  noCaPoiZone?: boolean;
  noPowerSpotZone?: boolean;
}

export interface Props {
  btnModifierFlags?: BtnModifierFlags;
  desc?: string;
  icon: DivIcon | Icon;
  id: string;
  inactive?: boolean;
  photo?: string;
  position: LatLngTuple;
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
  btnModifierFlags,
  desc,
  id,
  icon,
  inactive,
  photo,
  position,
  removed,
  renderHtml,
  subtitle,
  title,
  type,
}: Props) {
  const activePopup = useStore((s) => s.activePopup);
  const setMarker = useStore((s) => s.setMarker);
  const { showInteractionRadius, showNoCaPoiZone, showNoPowerSpotZone } =
    useStore((s) => s[getLayerKeyFromType(type)][id]);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<Marker | null>(null);

  const isPopupOpen = activePopup.id && activePopup.id === id;

  const onBtnHideClick = () => {
    setMarker(type, id, { isVisible: false });
    // Hack to prevent placing marker immediately on hide
    setTimeout(() => setActivePopup(null, null), 0);
  };
  let btnHide;
  if (btnModifierFlags?.hide) {
    btnHide = createBtnHide(onBtnHideClick);
  }

  const onBtnInteractionRadiusClick = () => {
    if (showInteractionRadius) {
      setMarker(type, id, { showInteractionRadius: false });
    } else {
      setMarker(type, id, { showInteractionRadius: true });
    }
  };
  let btnInteractionRadius;
  if (btnModifierFlags?.interactionRadius) {
    btnInteractionRadius = createBtnInteractionRadius(
      showInteractionRadius,
      onBtnInteractionRadiusClick,
    );
  }

  const onBtnNoPowerSpotZoneClick = () => {
    if (showNoPowerSpotZone) {
      setMarker(type, id, { showNoPowerSpotZone: false });
    } else {
      setMarker(type, id, { showNoPowerSpotZone: true });
    }
  };
  let btnNoPowerSpotZone;
  if (btnModifierFlags?.noPowerSpotZone) {
    btnNoPowerSpotZone = createBtnNoPowerSpotZone(
      showNoPowerSpotZone,
      onBtnNoPowerSpotZoneClick,
    );
  }

  const onBtnNoCaPoiZoneClick = () => {
    if (showNoCaPoiZone) {
      setMarker(type, id, { showNoCaPoiZone: false });
    } else {
      setMarker(type, id, { showNoCaPoiZone: true });
    }
  };
  let btnNoCaPoiZone;
  if (btnModifierFlags?.noCaPoiZone) {
    btnNoCaPoiZone = createBtnNoCaPoiZone(
      showNoCaPoiZone,
      onBtnNoCaPoiZoneClick,
    );
  }

  const modifierBtns: ModifierBtns = {
    hide: btnHide,
  };
  if (!removed) {
    modifierBtns.interactionRadius = btnInteractionRadius;
    modifierBtns.noCaPoiZone = btnNoCaPoiZone;
    modifierBtns.noPowerSpotZone = btnNoPowerSpotZone;
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
      {type !== "powerspot" && !inactive && !removed && showNoPowerSpotZone && (
        <NoPowerSpotZone position={position} />
      )}
      {/* Do not show NoCaPoiZone for inactive power spots */}
      {!removed && showNoCaPoiZone && <NoCaPoiZone position={position} />}
      {/* Do not show interactive radius for inactive power spots */}
      {!inactive && !removed && showInteractionRadius && (
        <InteractionRadius position={position} />
      )}
      <CMarker
        ref={markerRef}
        icon={icon}
        position={position}
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
              position,
              desc,
              photo,
              wayfarerMode,
              modifierBtns,
              renderHtml,
            )}
          </Popup>
        )}
      </CMarker>
    </>
  );
}
