import { type Dispatch, type SetStateAction, useEffect } from "react";
import { toast } from "sonner";

import { useStore } from "./hooks/store";

export interface Props {
  setIsMyLocationOn: Dispatch<SetStateAction<boolean>>;
}

/**
 * This component handles the imperative code for the geolocation API.
 * It does not render any visual UI.
 */
export default function MyLocation({ setIsMyLocationOn }: Props) {
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
          const MSG_ERR = `An error occurred: ${error.code} - ${error.message}`;
          toast.error(MSG_ERR);
          console.error(MSG_ERR);
          setIsMyLocationOn(false);
        },
      );

      const MSG_ON = "My location functionality has been turned on.";
      console.log(MSG_ON);
      toast(MSG_ON);
    } else {
      const MSG_ERR = "An error occurred: Geolocation API is not available.";
      toast.error(MSG_ERR);
      console.error(MSG_ERR);
      setIsMyLocationOn(false);
    }

    return () => {
      const MSG_OFF = "My location functionality has been turned off.";
      toast(MSG_OFF);
      console.log(MSG_OFF);

      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
      setMyLocation(null);
      setMyLocationAccuracy(null);
    };
  }, [setIsMyLocationOn, setMyLocation, setMyLocationAccuracy]);

  return null;
}
