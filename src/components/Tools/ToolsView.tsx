import { useEffect, useState } from "react";

import DistanceCalcView from "../DistanceCalcView";
import PlacedMarkerView from "../PlacedMarkerView";
import UiOverlayCard from "../UiOverlayCard";
import { useStore } from "../hooks/store";
import ToolsDefaultView from "./ToolsDefaultView";
import ToolsViewBreadcrumbs from "./ToolsViewBreadcrumbs";

/**
 * Displays the Wayfarer tools view.
 */
export default function ToolsView() {
  const wayfarerMode = useStore((s) => s.wayfarerMode);
  const setWayfarerMode = useStore((s) => s.setWayfarerMode);
  const [nav, setNav] = useState<string | null>(null);

  let content;
  switch (nav) {
    case "placed-marker":
      content = <PlacedMarkerView />;
      break;
    case "distance-calc":
      content = <DistanceCalcView />;
      break;
    default:
      content = <ToolsDefaultView setNav={setNav} />;
  }

  useEffect(() => {
    if (!wayfarerMode) {
      setWayfarerMode(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UiOverlayCard title={<ToolsViewBreadcrumbs nav={nav} setNav={setNav} />}>
      {content}
    </UiOverlayCard>
  );
}
