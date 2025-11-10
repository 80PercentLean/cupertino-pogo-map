import { Outlet } from "react-router";

import BtnMyLocation from "./BtnMyLocation";
import ViewCtrl from "./ViewCtrl";

/**
 * This is the UI that sits on top of <MapView>.
 * No matter how MapView is dragged or zoomed, <UiOverlay> will remain static.
 */
export default function UiOverlay() {
  return (
    <>
      <ViewCtrl />
      <BtnMyLocation />
      <Outlet />
    </>
  );
}
