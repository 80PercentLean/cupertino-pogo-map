import { type Map } from "leaflet";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

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
  const activePopup = useStore((s) => s.activePopup);
  const setActivePopup = useStore((s) => s.setActivePopup);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id && id !== activePopup) {
      setActivePopup(id);
    } else if (!id && activePopup) {
      setActivePopup(null);
    }
  }, [activePopup, searchParams, setActivePopup]);

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
