import type { LatLngTuple } from "leaflet";
import { Icon } from "leaflet";
import { useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";

import { useStore } from "../hooks/store";
// import InteractionRadius from "./InteractionRadius";
import NoCaPoiZone from "./NoCaPoiZone";
import NoPowerSpotZone from "./NoPowerSpotZone";
import { genPopupContentReact } from "./helper";

export interface Props {
  desc?: string;
  icon: Icon;
  latlng: LatLngTuple;
  removed?: boolean | string;
  subtitle: string;
  title: string;
  photo?: string;
}

export default function PokeStopMarker({
  desc,
  icon,
  latlng,
  removed,
  subtitle,
  title,
  photo,
}: Props) {
  // const showInteractionRadius = useStore((s) => s.layers.interactionRadii);
  const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  const showPowerSpotZones = useStore((s) => s.layers.noPowerSpotZones);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (removed && markerRef.current) {
      // Add grayscale class to removed PokeStops
      markerRef.current?.getElement()?.classList.add("grayscale");
    }
  }, [removed]);

  return (
    <>
      {!removed && showNoCaPoiZones && <NoCaPoiZone latlng={latlng} />}
      {/* {!removed && showInteractionRadius && (
        <InteractionRadius latlng={latlng} />
      )} */}
      {!removed && showPowerSpotZones && <NoPowerSpotZone latlng={latlng} />}
      <Marker ref={markerRef} icon={icon} position={latlng}>
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
