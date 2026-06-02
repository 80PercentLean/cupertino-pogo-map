import { cn } from "@/lib/utils";
import {
  FlameKindling,
  Info,
  List,
  Map,
  Settings,
  Toolbox,
} from "lucide-react";

import { useStore } from "./hooks/store";
import { Button } from "./ui/button";

const BTN_BASE_CLASSNAME =
  "h-14 max-w-20 cursor-pointer flex-col bg-black text-xs text-gray-300 transition-colors duration-500";
const BTN_ACTIVE_CLASSNAME = "bg-emerald-700 font-bold text-white";

/**
 * These view controls appears when the browser window is in mobile mode.
 */
export default function ViewCtrlMobile() {
  const activeMainView = useStore((s) => s.activeMainView);
  const isLayersOverlayOpen = useStore((s) => s.isLayersOverlayOpen);
  const isListViewOpen = useStore((s) => s.isListViewOpen);
  const setActiveMainView = useStore((s) => s.setActiveMainView);
  const setIsLayersOverlayOpen = useStore((s) => s.setIsLayersOverlayOpen);
  const setIsListViewOpen = useStore((s) => s.setIsListViewOpen);
  const toggleIsListViewOpen = useStore((s) => s.toggleIsListViewOpen);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  return (
    <>
      <div className="fixed top-0 left-0 z-998 m-2">
        {wayfarerMode && (
          <Button
            className="shadow-sm shadow-gray-500"
            onClick={() => setActiveMainView("tools")}
          >
            <Toolbox />
            Tools
          </Button>
        )}
      </div>
      <div className="fixed right-0 bottom-0 left-0 z-1002 flex h-20 items-center justify-evenly bg-black pb-[env(safe-area-inset-bottom)]">
        <Button
          className={cn(
            BTN_BASE_CLASSNAME,
            activeMainView === null &&
              !isLayersOverlayOpen &&
              !isListViewOpen &&
              BTN_ACTIVE_CLASSNAME,
          )}
          onClick={() => {
            if (isListViewOpen) {
              setIsListViewOpen(false);
            }

            if (activeMainView) {
              setActiveMainView(null);
            }

            if (isLayersOverlayOpen) {
              setIsLayersOverlayOpen(false);
            }
          }}
        >
          <Map className="!h-6 !w-6" />
          Map View
        </Button>
        <Button
          className={cn(
            BTN_BASE_CLASSNAME,
            isListViewOpen && BTN_ACTIVE_CLASSNAME,
          )}
          onClick={() => {
            toggleIsListViewOpen();

            if (activeMainView) {
              setActiveMainView(null);
            }

            if (isLayersOverlayOpen) {
              setIsLayersOverlayOpen(false);
            }
          }}
        >
          <List className="!h-6 !w-6" />
          List View
        </Button>
        <Button
          className={cn(
            BTN_BASE_CLASSNAME,
            activeMainView === "meetups" && BTN_ACTIVE_CLASSNAME,
          )}
          onClick={() => {
            if (activeMainView === "meetups") {
              setActiveMainView(null);
            } else {
              setActiveMainView("meetups");
            }

            if (isListViewOpen) {
              setIsListViewOpen(false);
            }

            if (isLayersOverlayOpen) {
              setIsLayersOverlayOpen(false);
            }
          }}
        >
          <FlameKindling className="!h-6 !w-6" />
          Meetups
        </Button>
        <Button
          className={cn(
            BTN_BASE_CLASSNAME,
            activeMainView === "settings" && BTN_ACTIVE_CLASSNAME,
          )}
          onClick={() => {
            if (activeMainView === "settings") {
              setActiveMainView(null);
            } else {
              setActiveMainView("settings");
            }

            if (isListViewOpen) {
              setIsListViewOpen(false);
            }

            if (isLayersOverlayOpen) {
              setIsLayersOverlayOpen(false);
            }
          }}
        >
          <Settings className="!h-6 !w-6" />
          Settings
        </Button>
        <Button
          className={cn(
            BTN_BASE_CLASSNAME,
            activeMainView === "info" && BTN_ACTIVE_CLASSNAME,
          )}
          onClick={() => {
            if (activeMainView === "info") {
              setActiveMainView(null);
            } else {
              setActiveMainView("info");
            }

            if (isListViewOpen) {
              setIsListViewOpen(false);
            }

            if (isLayersOverlayOpen) {
              setIsLayersOverlayOpen(false);
            }
          }}
        >
          <Info className="!h-6 !w-6" />
          Info
        </Button>
      </div>
    </>
  );
}
