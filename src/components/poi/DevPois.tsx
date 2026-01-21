import { type LatLngTuple } from "leaflet";
import { Fragment } from "react";
import { Marker, Popup } from "react-leaflet";

import { devpoisJson } from "../../geojson/data";
import { iconDev } from "../../leafletIcons";
import { useStore } from "../hooks/store";
import InteractionRadius from "./InteractionRadius";
import NoCaPoiZone from "./NoCaPoiZone";
import NoPowerSpotZone from "./NoPowerSpotZone";
import { genPopupContentReact } from "./helper";

/**
 * Render POIs in development like Wayfarer submissions or Campsite POI proposals.
 */
export default function DevPois() {
  const showInteractionRadius = useStore((s) => s.layers.interactionRadii);
  const showNoCaPoiZones = useStore((s) => s.layers.noCaPoiZones);
  const showPowerSpotZones = useStore((s) => s.layers.noPowerSpotZones);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  return devpoisJson.features.map(({ geometry, properties }, i) => {
    const latlng = [
      geometry.coordinates[1],
      geometry.coordinates[0],
    ] as LatLngTuple;
    const { desc, name, type } = properties;

    return (
      <Fragment key={i}>
        {showNoCaPoiZones && <NoCaPoiZone latlng={latlng} />}
        {showInteractionRadius && <InteractionRadius latlng={latlng} />}
        {showPowerSpotZones && <NoPowerSpotZone latlng={latlng} />}
        <Marker icon={iconDev} position={latlng}>
          <Popup>
            {genPopupContentReact(
              name,
              type,
              latlng,
              desc,
              undefined,
              wayfarerMode,
            )}
          </Popup>
        </Marker>
      </Fragment>
    );
  });
}
