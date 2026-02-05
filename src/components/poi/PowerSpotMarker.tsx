import { iconPowerSpot } from "@/leafletIcons";
import L, { type LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

import CMarker from "../CMarker";
import { useStore } from "../hooks/store";
// import InteractionRadius from "./InteractionRadius";
import NoCaPoiZone from "./NoCaPoiZone";
import { genPopupContentReact } from "./helper";

export interface Props {
  desc?: string;
  id: string;
  inactive?: boolean;
  latlng: LatLngTuple;
  photo?: string;
  removed?: boolean | string;
  subtitle: string;
  title: string;
}

export default function PowerSpotMarker({
  desc,
  id,
  latlng,
  inactive,
  photo,
  removed,
  subtitle,
  title,
}: Props) {
  const activePopup = useStore((s) => s.activePopup);
  const setMarker = useStore((s) => s.setMarker);
  // const showInteractionRadius = useStore((s) => s.layers.interactionRadii);
  // const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<L.Marker | null>(null);

  const isPopupOpen = activePopup && activePopup === id;

  const onHideClick = () => {
    setMarker("powerspot", id, { isVisible: false });
    // Hack to prevent placing marker immediately on hide
    setTimeout(() => setActivePopup(null), 0);
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
        icon={iconPowerSpot}
        position={latlng}
        eventHandlers={{
          click: () => setActivePopup(id),
          popupclose: () => setActivePopup(null),
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
            )}
          </Popup>
        )}
      </CMarker>
    </>
  );
}
