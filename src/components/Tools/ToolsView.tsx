import { useEffect, useState } from "react";

import DistanceCalcView from "../DistanceCalcView";
import UiOverlayCard from "../UiOverlayCard";
import { useStore } from "../hooks/store";
import ToolsDefaultView from "./ToolsDefaultView";
import ToolsViewBreadcrumbs from "./ToolsViewBreadcrumbs";

/**
 * Displays the Wayfarer tools view.
 */
export default function ToolsView() {
  const wayfarerTools = useStore((s) => s.wayfarerTools);
  const setWayfarerTools = useStore((s) => s.setWayfarerTools);
  const [nav, setNav] = useState<string | null>(null);

  let content;
  switch (nav) {
    case "distance-calc":
      content = <DistanceCalcView />;
      break;
    default:
      content = <ToolsDefaultView setNav={setNav} />;
  }

  useEffect(() => {
    if (!wayfarerTools) {
      setWayfarerTools(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UiOverlayCard title={<ToolsViewBreadcrumbs nav={nav} setNav={setNav} />}>
      {content}
    </UiOverlayCard>
  );
}
