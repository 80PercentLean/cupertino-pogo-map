import type { CProperties } from "@/types/CFeatures";
import { DivIcon, type LatLngTuple, type Marker } from "leaflet";
import { Icon } from "leaflet";
import { useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

import CMarker from "../CMarker";
import { useRemoveIdQueryParam, useSetIdQueryParam } from "../hooks";
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
  id: string | number;
  isDisabled?: boolean;
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
  isDisabled,
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
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<Marker | null>(null);

  const removeIdQueryParam = useRemoveIdQueryParam();
  const setIdQueryParam = useSetIdQueryParam();

  const isPopupOpen = activePopup && activePopup === String(id);

  const onBtnHideClick = () => {
    setMarker(type, String(id), { isVisible: false });
    removeIdQueryParam();
  };
  let btnHide;
  if (btnModifierFlags?.hide) {
    btnHide = createBtnHide(onBtnHideClick);
  }

  const onBtnInteractionRadiusClick = () => {
    if (showInteractionRadius) {
      setMarker(type, String(id), { showInteractionRadius: false });
    } else {
      setMarker(type, String(id), { showInteractionRadius: true });
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
      setMarker(type, String(id), { showNoPowerSpotZone: false });
    } else {
      setMarker(type, String(id), { showNoPowerSpotZone: true });
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
      setMarker(type, String(id), { showNoCaPoiZone: false });
    } else {
      setMarker(type, String(id), { showNoCaPoiZone: true });
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
  let interactionRadius;
  let noCaPoiZone;
  let noPowerSpotZone;

  // Do not show interactive radius for disabled power spots & removed POIs
  if (!isDisabled && !removed) {
    modifierBtns.interactionRadius = btnInteractionRadius;

    if (showInteractionRadius) {
      interactionRadius = <InteractionRadius position={position} />;
    }
  }

  // Do not show NoCaPoiZone for removed POIs
  if (!removed) {
    modifierBtns.noCaPoiZone = btnNoCaPoiZone;

    if (showNoCaPoiZone) {
      noCaPoiZone = <NoCaPoiZone position={position} />;
    }
  }

  // Do not show no power spot zone for power spots & removed POIs
  if (type !== "powerspot" && !removed) {
    modifierBtns.noPowerSpotZone = btnNoPowerSpotZone;

    if (showNoPowerSpotZone) {
      noPowerSpotZone = <NoPowerSpotZone position={position} />;
    }
  }

  useEffect(() => {
    if (markerRef.current) {
      if (removed) {
        // Add zero brightness class to removed POIs
        markerRef.current?.getElement()?.classList.add("brightness-0");
      } else if (isDisabled) {
        // Add grayscale class to disabled power spots
        markerRef.current?.getElement()?.classList.add("grayscale");
      }
    }
  }, [isDisabled, removed]);

  useEffect(() => {
    if (markerRef.current && isPopupOpen) {
      // Hack to get openPopup to work
      setTimeout(() => markerRef.current?.openPopup(), 0);
    }
  }, [isPopupOpen]);

  return (
    <>
      {noPowerSpotZone}
      {noCaPoiZone}
      {interactionRadius}
      <CMarker
        ref={markerRef}
        icon={icon}
        position={position}
        eventHandlers={{
          click: () => setIdQueryParam(id),
          popupclose: () => removeIdQueryParam(),
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
