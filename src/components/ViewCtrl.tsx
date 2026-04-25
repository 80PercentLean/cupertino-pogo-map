import { getDesktopMediaQuery } from "@/util";
import { useEffect, useState } from "react";

import ViewCtrlDesktop from "./ViewCtrlDesktop";
import ViewCtrlMobile from "./ViewCtrlMobile";
import { useStore } from "./hooks/store";

const MEDIA_QUERY = getDesktopMediaQuery();

/**
 * Buttons at the bottom of the screen that allows the user to switch between views like
 * the map, list, settings, etc.
 */
export default function ViewCtrl() {
  const activeMainView = useStore((s) => s.activeMainView);
  const isLayersOverlayOpen = useStore((s) => s.isLayersOverlayOpen);
  const isListViewOpen = useStore((s) => s.isListViewOpen);
  const setIsLayersOverlayOpen = useStore((s) => s.setIsLayersOverlayOpen);
  const setIsListViewOpen = useStore((s) => s.setIsListViewOpen);

  const [isDesktop, setIsDesktop] = useState<boolean>(MEDIA_QUERY.matches);

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches === false && isDesktop) {
        // Just switched from desktop to mobile, so close conflicting views the mobile layout
        if (activeMainView) {
          if (isLayersOverlayOpen) {
            setIsLayersOverlayOpen(false);
          }

          if (isListViewOpen) {
            setIsListViewOpen(false);
          }
        } else if (isListViewOpen && isLayersOverlayOpen) {
          setIsLayersOverlayOpen(false);
        }
      }

      setIsDesktop(e.matches);
    };

    MEDIA_QUERY.addEventListener("change", handleChange);

    return () => {
      MEDIA_QUERY.removeEventListener("change", handleChange);
    };
  }, [
    activeMainView,
    isDesktop,
    isLayersOverlayOpen,
    isListViewOpen,
    setIsLayersOverlayOpen,
    setIsListViewOpen,
  ]);

  let viewCtrl;
  if (isDesktop) {
    viewCtrl = <ViewCtrlDesktop />;
  } else {
    viewCtrl = <ViewCtrlMobile />;
  }

  return viewCtrl;
}
