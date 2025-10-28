import { useEffect, useState } from "react";
import type { LatLngExpression } from "leaflet";
import CMarker, { type CMarkerProps } from "./CMarker";

export type LiveLocationMarkerProps = Omit<CMarkerProps, "position">;

export default function LiveLocationMarker(props: LiveLocationMarkerProps) {
  const [location, setLocation] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    let watchId: number | null = null;

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log(
            "hey",
            position.coords.latitude,
            position.coords.longitude,
          );
          setLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log(`ERROR(${error.code}): ${error.message}`);
        },
      );
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  if (location) {
    return <CMarker {...props} position={location} />;
  }
  return null;
}
