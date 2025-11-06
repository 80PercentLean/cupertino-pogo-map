import { Outlet } from "react-router";

import BottomBar from "./BottomBar";

/**
 * This is the layer of UI that sits on top of <MapView>.
 * No matter how MapView is dragged or zoomed, <UiLayer> will remain static.
 */
export default function UiLayer() {
  return (
    <>
      <BottomBar />
      <Outlet />
    </>
  );
}
