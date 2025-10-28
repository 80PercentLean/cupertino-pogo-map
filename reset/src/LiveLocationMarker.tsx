import { useEffect, useState } from "react";
import { Circle } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import CMarker, { type CMarkerProps } from "./CMarker";

export type LiveLocationMarkerProps = Omit<CMarkerProps, "position">;

export default function LiveLocationMarker(props: LiveLocationMarkerProps) {
  const [location, setLocation] = useState<LatLngExpression | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(80);

  useEffect(() => {
    let watchId: number | null = null;

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log(
            "GPS coordinates",
            position.coords.latitude,
            position.coords.longitude,
            position.coords.accuracy,
          );
          setLocation([position.coords.latitude, position.coords.longitude]);
          setAccuracy(position.coords.accuracy);
        },
        (error) => {
          console.log(`ERROR(${error.code}): ${error.message}`);
        },
      );
    } else {
      // TODO: Show error message
      console.error("Geolocation API is not available.");
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  if (location) {
    const accuracyCircle = accuracy && (
      <Circle center={location} radius={accuracy} />
    );

    return (
      <>
        {accuracyCircle}
        <CMarker {...props} position={location} />
      </>
    );
  }
  return null;
}
