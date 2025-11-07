import { Outlet } from "react-router";

import ViewCtrl from "./ViewCtrl";

/**
 * This is the layer of UI that sits on top of <MapView>.
 * No matter how MapView is dragged or zoomed, <FloatingLayer> will remain static.
 */
export default function FloatingLayer() {
  return (
    <>
      <ViewCtrl />
      <Outlet />
    </>
  );
}
