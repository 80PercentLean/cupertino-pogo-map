import { iconGym } from "@/leafletIcons";
import L, { type LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import { Popup } from "react-leaflet";

import CMarker from "../CMarker";
import { useStore } from "../hooks/store";
import InteractionRadius from "./InteractionRadius";
import NoCaPoiZone from "./NoCaPoiZone";
import NoPowerSpotZone from "./NoPowerSpotZone";
import { genPopupContentReact } from "./helper";

export interface Props {
  desc?: string;
  id: string;
  latlng: LatLngTuple;
  removed?: boolean | string;
  subtitle: string;
  title: string;
  photo?: string;
}

export default function GymMarker({
  desc,
  id,
  latlng,
  removed,
  subtitle,
  title,
  photo,
}: Props) {
  const activePopup = useStore((s) => s.activePopup);
  const setMarker = useStore((s) => s.setMarker);
  // const showInteractionRadius = useStore((s) => s.layers.interactionRadii);
  // const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  // const showPowerSpotZones = useStore((s) => s.layers.noPowerSpotZones);
  const setActivePopup = useStore((s) => s.setActivePopup);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<L.Marker | null>(null);

  const isPopupOpen = activePopup && activePopup === id;

  const onHideClick = () => {
    setMarker("gym", id, { isVisible: false });
    // Hack to prevent placing marker immediately on hide
    setTimeout(() => setActivePopup(null), 0);
  };

  useEffect(() => {
    if (removed && markerRef.current) {
      // Add grayscale class to removed gyms
      markerRef.current?.getElement()?.classList.add("grayscale");
    }
  }, [removed]);

  useEffect(() => {
    if (markerRef.current && isPopupOpen) {
      // Hack to get openPopup to work
      setTimeout(() => markerRef.current?.openPopup(), 0);
    }
  }, [isPopupOpen]);

  return (
    <>
      {/* {!removed && showNoCaPoiZones && <NoCaPoiZone latlng={latlng} />}
      {!removed && showInteractionRadius && (
        <InteractionRadius latlng={latlng} />
      )}
      {!removed && showPowerSpotZones && <NoPowerSpotZone latlng={latlng} />} */}
      <CMarker
        ref={markerRef}
        icon={iconGym}
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
