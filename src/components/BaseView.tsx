import { type Map } from "leaflet";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import InfoView from "./InfoView";
import { MapContext } from "./MapContext";
import MapView from "./MapView";
import SettingsView from "./SettingsView";
import ToolsView from "./Tools/ToolsView";
import UiOverlay from "./UiOverlay";
import { useStore } from "./hooks/store";

/**
 * Base view that renders the map and UI overlay on top of it.
 */
export default function BaseView() {
  const [map, setMap] = useState<Map | null>(null);
  const activeMainView = useStore((s) => s.activeMainView);

  const location = useLocation();

  useEffect(() => {
    // TODO: Fly to POI when query string navigation occurs
    console.log("location", location);
  }, [location]);

  return (
    <MapContext value={{ map, setMap }}>
      <MapView />
      <UiOverlay />
      {activeMainView === "info" && <InfoView />}
      {activeMainView === "settings" && <SettingsView />}
      {activeMainView === "tools" && <ToolsView />}
    </MapContext>
  );
}
