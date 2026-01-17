import { type Map } from "leaflet";
import { createContext } from "react";
import { type Dispatch, type SetStateAction } from "react";

interface MapContextType {
  map: Map | null;
  setMap: Dispatch<SetStateAction<MapContextType["map"]>> | null;
}

/**
 * Context that stores the Leaflet Map instance.
 */
export const MapContext = createContext<MapContextType>({
  map: null,
  setMap: null,
});
