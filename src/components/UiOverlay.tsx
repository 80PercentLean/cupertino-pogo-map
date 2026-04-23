import { Activity } from "react";

import BtnLayers from "./BtnLayers";
import BtnMyLocation from "./BtnMyLocation";
import ListView from "./ListView";
import ViewCtrlDesktop from "./ViewCtrlDesktop";
import ViewCtrlMobile from "./ViewCtrlMobile";
import { useStore } from "./hooks/store";

/**
 * This is the UI that sits on top of <MapView>.
 * No matter how <MapView> is dragged or zoomed, <UiOverlay> will remain static.
 */
export default function UiOverlay() {
  const isListViewOpen = useStore((s) => s.isListViewOpen);

  const mediaQuery = window.matchMedia("(min-width: 768px)");

  let viewCtrl;
  if (mediaQuery.matches) {
    viewCtrl = <ViewCtrlDesktop />;
  } else {
    viewCtrl = <ViewCtrlMobile />;
  }

  return (
    <>
      <Activity mode={isListViewOpen ? "visible" : "hidden"}>
        <ListView />
      </Activity>
      <BtnLayers />
      <BtnMyLocation />
      {viewCtrl}
    </>
  );
}
