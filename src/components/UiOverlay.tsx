import { Activity } from "react";
import { Outlet } from "react-router";

import BtnLayers from "./BtnLayers";
// import BtnMyLocation from "./BtnMyLocation";
import ListView from "./ListView";
import ViewCtrl from "./ViewCtrl";
import { useStore } from "./hooks/store";

/**
 * This is the UI that sits on top of <MapView>.
 * No matter how <MapView> is dragged or zoomed, <UiOverlay> will remain static.
 */
export default function UiOverlay() {
  const isListViewOpen = useStore((s) => s.isListViewOpen);

  return (
    <>
      <Activity mode={isListViewOpen ? "visible" : "hidden"}>
        <ListView />
      </Activity>
      <ViewCtrl />
      <BtnLayers />
      {/* <BtnMyLocation /> */}
      <Outlet />
    </>
  );
}
