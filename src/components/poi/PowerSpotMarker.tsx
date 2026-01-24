import { iconPowerSpot } from "@/leafletIcons";
import L, { type LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";

import { useStore } from "../hooks/store";
// import InteractionRadius from "./InteractionRadius";
import NoCaPoiZone from "./NoCaPoiZone";
import { genPopupContentReact } from "./helper";

export interface Props {
  desc?: string;
  inactive?: boolean;
  latlng: LatLngTuple;
  photo?: string;
  removed?: boolean | string;
  subtitle: string;
  title: string;
}

export default function PowerSpotMarker({
  desc,
  latlng,
  inactive,
  photo,
  removed,
  subtitle,
  title,
}: Props) {
  // const showInteractionRadius = useStore((s) => s.layers.interactionRadii);
  const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if ((inactive || removed) && markerRef.current) {
      // Add grayscale class to inactive or removed power spots
      markerRef.current?.getElement()?.classList.add("grayscale");
    }
  }, [inactive, removed]);

  return (
    <>
      {/* Do not show NoCaPoiZone for inactive power spots */}
      {!inactive && !removed && showNoCaPoiZones && (
        <NoCaPoiZone latlng={latlng} />
      )}
      {/* Do not show interactive radius for inactive power spots */}
      {/* {!inactive && !removed && showInteractionRadius && (
        <InteractionRadius latlng={latlng} />
      )} */}
      <Marker ref={markerRef} icon={iconPowerSpot} position={latlng}>
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
      </Marker>
    </>
  );
}
