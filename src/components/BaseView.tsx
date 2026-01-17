import { type Map } from "leaflet";
import { useState } from "react";

import { MapContext } from "./MapContext";
import MapView from "./MapView";
import UiOverlay from "./UiOverlay";

/**
 * Base view that renders the map and UI overlay on top of it.
 */
export default function BaseView() {
  const [map, setMap] = useState<Map | null>(null);

  return (
    <MapContext value={{ map, setMap }}>
      <MapView />
      <UiOverlay />
    </MapContext>
  );
}
