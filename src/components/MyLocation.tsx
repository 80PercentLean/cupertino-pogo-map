import { useEffect } from "react";

import { useStore } from "./hooks/store";

export default function MyLocation() {
  const setMyLocation = useStore((s) => s.setMyLocation);
  const setMyLocationAccuracy = useStore((s) => s.setMyLocationAccuracy);

  useEffect(() => {
    let watchId: number | null = null;

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log("My location coordinates: ", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
          setMyLocation([position.coords.latitude, position.coords.longitude]);
          setMyLocationAccuracy(position.coords.accuracy);
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
      console.log("Turned off my location.");
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
      setMyLocation(null);
      setMyLocationAccuracy(null);
    };
  }, [setMyLocation, setMyLocationAccuracy]);

  return null;
}
