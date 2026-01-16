import { iconPowerSpot } from "@/leafletIcons";
import L, { type LatLngTuple } from "leaflet";
import { useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";

import { useStore } from "../hooks/store";
import CaBlockedRange from "./CaBlockedRange";
import { genPopupContentReact } from "./helper";

export interface Props {
  desc?: string;
  inactive?: boolean;
  latlng: LatLngTuple;
  name: string;
  photo?: string;
}

export default function PowerSpotMarker({
  desc,
  latlng,
  inactive,
  name,
  photo,
}: Props) {
  const markerRef = useRef<L.Marker | null>(null);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  useEffect(() => {
    if (inactive && markerRef.current) {
      // Add grayscale class to inactive power spots
      markerRef.current?.getElement()?.classList.add("grayscale");
    }
  }, [inactive]);

  return (
    <>
      {/* Do not show CaBlockedRange for inactive power spots */}
      {!inactive && <CaBlockedRange latlng={latlng} />}
      <Marker icon={iconPowerSpot} position={latlng} ref={markerRef}>
        <Popup>
          {genPopupContentReact(
            name,
            "Power Spot",
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
