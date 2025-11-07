import { type LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { Circle } from "react-leaflet";

import CCircleMarker, { type CCircleMarkerProps } from "./CCircleMarker";

export type LiveLocationMarkerProps = Omit<CCircleMarkerProps, "center">;

/**
 * <CCircleMarker> that represents the user's current location.
 */
export default function LiveLocationMarker(props: LiveLocationMarkerProps) {
  const [location, setLocation] = useState<LatLngExpression | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(80);

  useEffect(() => {
    let watchId: number | null = null;

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log("Live location coordinates: ", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
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
      <Circle
        center={location}
        pathOptions={{ fillColor: "#5c84f0", stroke: false }}
        radius={accuracy}
      />
    );

    return (
      <>
        {accuracyCircle}
        <CCircleMarker
          center={location}
          pathOptions={{ color: "#fff", fillColor: "#5c84f0", fillOpacity: 1 }}
          radius={10}
          data-testid={props["data-testid"]}
        />
      </>
    );
  }
  return null;
}
