import { Circle } from "react-leaflet";

import CCircleMarker, { type CCircleMarkerProps } from "./CCircleMarker";
import { useStore } from "./hooks/store";

export type MyLocationMarkerProps = Omit<CCircleMarkerProps, "center">;

/**
 * <CCircleMarker> that represents the user's current location.
 */
export default function MyLocationMarker(props: MyLocationMarkerProps) {
  const disableAnimations = useStore((s) => s.disableAnimations);
  const myLocation = useStore((s) => s.myLocation);
  const myLocationAccuracy = useStore((s) => s.myLocationAccuracy);
  const myLocationRangeType = useStore((s) => s.myLocationRangeType);

  let rangeSize: number;

  switch (myLocationRangeType) {
    case "location-accuracy":
      rangeSize = myLocationAccuracy ?? 0;
      break;
    case "wild-spawn":
      rangeSize = 50;
      break;
    default:
      rangeSize = 80;
  }

  if (myLocation) {
    const accuracyCircle = myLocationAccuracy && (
      <Circle
        center={myLocation}
        interactive={false}
        pathOptions={{ fillColor: "#5c84f0", stroke: false }}
        radius={rangeSize}
        className={!disableAnimations ? "animate-pulse" : undefined}
      />
    );

    return (
      <>
        {accuracyCircle}
        <CCircleMarker
          center={myLocation}
          interactive={false}
          pathOptions={{ color: "#fff", fillColor: "#5c84f0", fillOpacity: 1 }}
          radius={10}
          data-testid={props["data-testid"]}
        />
      </>
    );
  }
  return null;
}
