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
  latlng,
  id,
  removed,
  subtitle,
  title,
  photo,
}: Props) {
  const isPopupOpen = useStore((s) => s.markerPopups[id]);
  const showInteractionRadius = useStore((s) => s.layers.interactionRadii);
  const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  const showPowerSpotZones = useStore((s) => s.layers.noPowerSpotZones);
  const wayfarerMode = useStore((s) => s.wayfarerMode);
  const setMarkerPopup = useStore((s) => s.setMarkerPopup);

  const markerRef = useRef<L.Marker | null>(null);

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
      {!removed && showNoCaPoiZones && <NoCaPoiZone latlng={latlng} />}
      {!removed && showInteractionRadius && (
        <InteractionRadius latlng={latlng} />
      )}
      {!removed && showPowerSpotZones && <NoPowerSpotZone latlng={latlng} />}
      <CMarker
        ref={markerRef}
        icon={iconGym}
        position={latlng}
        eventHandlers={{
          click: () => setMarkerPopup(id, true),
          popupclose: () => setMarkerPopup(id, false),
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
            )}
          </Popup>
        )}
      </CMarker>
    </>
  );
}
