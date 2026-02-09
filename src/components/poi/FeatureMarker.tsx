import type { CProperties } from "@/types/CFeatures";
import L, { DivIcon, type LatLngTuple } from "leaflet";
import { Icon } from "leaflet";
import { useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

import CMarker from "../CMarker";
import { useStore } from "../hooks/store";
// import InteractionRadius from "./InteractionRadius";
// import NoCaPoiZone from "./NoCaPoiZone";
import { genPopupContentReact } from "./helper";

export interface Props {
  desc?: string;
  icon: DivIcon | Icon;
  id: string;
  inactive?: boolean;
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
  // const showInteractionRadius = useStore((s) => s.layers.interactionRadii);
  // const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<L.Marker | null>(null);

  const isPopupOpen = activePopup.id && activePopup.id === id;

  const onHideClick = () => {
    setMarker(type, id, { isVisible: false });
    // Hack to prevent placing marker immediately on hide
    setTimeout(() => setActivePopup(null, null), 0);
  };

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
      {/* {!inactive && !removed && showInteractionRadius && (
          <InteractionRadius latlng={latlng} />
        )} */}
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
            {genPopupContentReact(
              title,
              subtitle,
              latlng,
              desc,
              photo,
              wayfarerMode,
              onHideClick,
              renderHtml,
            )}
          </Popup>
        )}
      </CMarker>
    </>
  );
}
