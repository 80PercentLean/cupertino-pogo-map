import { IS_MOBILE } from "@/constantsDom";
import {
  ICON_GYM_TOOLTIP_OFFSET,
  ICON_POKESTOP_TOOLTIP_OFFSET,
  ICON_POWERSPOT_TOOLTIP_OFFSET,
  ICON_SHOWCASE_TOOLTIP_OFFSET,
} from "@/leafletIcons";
import {
  ICON_GYM_COLOR,
  ICON_HIGHLIGHT_COLOR,
  ICON_POKESTOP_COLOR,
  ICON_POWERSPOT_COLOR,
  ICON_POWERSPOT_DISABLED_COLOR,
  ICON_POWERSPOT_DISABLED_STYLE,
  ICON_POWERSPOT_IMPOSSIBLE_COLOR,
  ICON_POWERSPOT_IMPOSSIBLE_STYLE,
  ICON_REMOVED_COLOR,
  ICON_REMOVED_STYLE,
} from "@/leafletStyles";
import type { CProperties } from "@/types/CFeatures";
import {
  CircleMarker,
  DivIcon,
  type LatLngTuple,
  type Marker,
  type PointTuple,
} from "leaflet";
import { Icon } from "leaflet";
import { useEffect, useRef } from "react";
import { Popup, Tooltip } from "react-leaflet";

import CCircleMarker from "../CCircleMarker";
import CMarker from "../CMarker";
import { useRemoveIdQueryParam, useSetIdQueryParam } from "../hooks";
import { getLayerKeyFromType, useStore } from "../hooks/store";
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
  desc?: CProperties["desc"];
  icon: DivIcon | Icon;
  iconHighlighted?: DivIcon;
  id: string | number;
  isDisabled?: CProperties["isDisabled"];
  isHidden?: CProperties["isHidden"];
  isImpossible?: CProperties["isImpossible"];
  photo?: CProperties["photo"];
  position: LatLngTuple;
  removed?: CProperties["removed"];
  renderHtml?: boolean;
  subtitle?: string;
  subtype?: CProperties["subtype"];
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
  iconHighlighted,
  isDisabled,
  isHidden,
  isImpossible,
  photo,
  position,
  removed,
  renderHtml,
  subtitle,
  subtype,
  title,
  type,
}: Props) {
  const activePopup = useStore((s) => s.activePopup);
  const setMarker = useStore((s) => s.setMarker);
  const {
    isHighlighted,
    showInteractionRadius,
    showNoCaPoiZone,
    showNoPowerSpotZone,
  } = useStore((s) => s[getLayerKeyFromType(type)][id]);
  const isSimpleMarkerEnabled = useStore((s) => s.isSimpleMarkerEnabled);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<Marker | null>(null);
  const circleMarkerRef = useRef<CircleMarker | null>(null);

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

  // Do not show interactive radius for removed POIs
  if (!removed) {
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

  const DEFAULT_TOOLTIP_OFFSET = [12, 0] as PointTuple;
  let toolTipOffset;
  let isPokePoi = false;
  switch (type) {
    case "gym":
      toolTipOffset = isSimpleMarkerEnabled
        ? DEFAULT_TOOLTIP_OFFSET
        : ICON_GYM_TOOLTIP_OFFSET;
      isPokePoi = true;
      break;
    case "pokestop":
      if (subtype === "showcase") {
        toolTipOffset = isSimpleMarkerEnabled
          ? DEFAULT_TOOLTIP_OFFSET
          : ICON_SHOWCASE_TOOLTIP_OFFSET;
      } else {
        toolTipOffset = isSimpleMarkerEnabled
          ? DEFAULT_TOOLTIP_OFFSET
          : ICON_POKESTOP_TOOLTIP_OFFSET;
      }
      isPokePoi = true;
      break;
    case "powerspot":
      toolTipOffset = isSimpleMarkerEnabled
        ? DEFAULT_TOOLTIP_OFFSET
        : ICON_POWERSPOT_TOOLTIP_OFFSET;
      isPokePoi = true;
      break;
    default:
      toolTipOffset = DEFAULT_TOOLTIP_OFFSET;
  }

  useEffect(() => {
    let timeout;
    if (markerRef.current) {
      // Hack to reapply the classes since it can try to apply before the element exists
      setTimeout(() => {
        if (removed) {
          // Add zero brightness class to removed POIs
          markerRef.current?.getElement()?.classList.add(ICON_REMOVED_STYLE);
        } else if (isImpossible) {
          markerRef.current
            ?.getElement()
            ?.classList.add(ICON_POWERSPOT_IMPOSSIBLE_STYLE);
        } else if (isDisabled) {
          // Add grayscale class to disabled power spots
          markerRef.current
            ?.getElement()
            ?.classList.add(ICON_POWERSPOT_DISABLED_STYLE);
        }
      }, 0);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isDisabled, isHighlighted, isImpossible, isSimpleMarkerEnabled, removed]);

  useEffect(() => {
    let timeout;
    const activeMarker = markerRef.current ?? circleMarkerRef.current;
    if (activeMarker && isPopupOpen) {
      // Hack to get openPopup to work
      setTimeout(() => activeMarker.openPopup(), 0);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isPopupOpen]);

  const popupContent = createPopupContent(
    title,
    subtitle,
    position,
    desc,
    photo,
    wayfarerMode,
    id,
    undefined,
    modifierBtns,
    type,
    renderHtml,
  );

  let marker;
  if (isPokePoi && subtype !== "showcase" && isSimpleMarkerEnabled) {
    let fillColor;
    if (isHighlighted) {
      fillColor = ICON_HIGHLIGHT_COLOR;
    } else if (removed) {
      fillColor = ICON_REMOVED_COLOR;
    } else if (isImpossible) {
      fillColor = ICON_POWERSPOT_IMPOSSIBLE_COLOR;
    } else if (isDisabled) {
      fillColor = ICON_POWERSPOT_DISABLED_COLOR;
    } else if (type === "gym") {
      fillColor = ICON_GYM_COLOR;
    } else if (type === "pokestop") {
      fillColor = ICON_POKESTOP_COLOR;
    } else if (type === "powerspot") {
      fillColor = ICON_POWERSPOT_COLOR;
    } else {
      fillColor = "#fff";
    }

    marker = (
      <CCircleMarker
        ref={circleMarkerRef}
        bubblingMouseEvents={false}
        center={position}
        pathOptions={{ color: "#fff", fillColor, fillOpacity: 1 }}
        data-testid={String(id)}
        eventHandlers={{
          click: () => setIdQueryParam(id),
          popupclose: () => removeIdQueryParam(),
        }}
      >
        {!IS_MOBILE && <Tooltip offset={toolTipOffset}>{title}</Tooltip>}
        {isPopupOpen && <Popup>{popupContent}</Popup>}
      </CCircleMarker>
    );
  } else {
    marker = (
      <CMarker
        ref={markerRef}
        alt={`Marker for "${title}"`}
        icon={iconHighlighted && isHighlighted ? iconHighlighted : icon}
        position={position}
        zIndexOffset={isHighlighted ? 10000 : 0}
        data-isdisabled={
          typeof isDisabled === "boolean" ? String(isDisabled) : undefined
        }
        data-ishidden={
          typeof isHidden === "boolean" ? String(isHidden) : undefined
        }
        data-isimpossible={
          typeof isImpossible === "boolean" ? String(isImpossible) : undefined
        }
        data-poitype={type}
        data-removed={removed ? "true" : undefined}
        data-testid={String(id)}
        eventHandlers={{
          click: () => setIdQueryParam(id),
          popupclose: () => removeIdQueryParam(),
        }}
      >
        {!IS_MOBILE && <Tooltip offset={toolTipOffset}>{title}</Tooltip>}
        {isPopupOpen && <Popup>{popupContent}</Popup>}
      </CMarker>
    );
  }

  return (
    <>
      {noPowerSpotZone}
      {noCaPoiZone}
      {interactionRadius}
      {marker}
    </>
  );
}
