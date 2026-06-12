import { cn } from "@/lib/utils";
import { FlameKindling, Info, List, Settings, Toolbox } from "lucide-react";

import { useStore } from "./hooks/store";
import { Button } from "./ui/button";

const BTN_BASE_CLASSNAME =
  "h-10 w-32 flex-1 cursor-pointer shadow-sm shadow-gray-500";
const BTN_ACTIVE_CLASSNAME = "bg-emerald-700 text-white hover:bg-emerald-600";

/**
 * These view controls appear when the browser window is in desktop mode.
 */
export default function ViewCtrlDesktop() {
  const activeMainView = useStore((s) => s.activeMainView);
  const isListViewOpen = useStore((s) => s.isListViewOpen);
  const setActiveMainView = useStore((s) => s.setActiveMainView);
  const toggleIsListViewOpen = useStore((s) => s.toggleIsListViewOpen);
  const wayfarerMode = useStore((s) => s.wayfarerMode);

  return (
    <div
      className="fixed bottom-0 left-0 z-1001 m-2 flex gap-2"
      data-testid="view-ctrl-main-bar"
    >
      <Button
        className={cn(
          BTN_BASE_CLASSNAME,
          isListViewOpen && BTN_ACTIVE_CLASSNAME,
        )}
        onClick={() => toggleIsListViewOpen()}
      >
        <List /> List View
      </Button>
      <Button
        className={cn(
          BTN_BASE_CLASSNAME,
          "relative",
          activeMainView === "meetups" && BTN_ACTIVE_CLASSNAME,
        )}
        onClick={() => setActiveMainView("meetups")}
      >
        <FlameKindling /> Meetups
        {/* TODO: Add new icon when meetups are starting soon */}
        {/* <span className="ring-background absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 ring-2" /> */}
      </Button>
      <Button
        className={cn(
          BTN_BASE_CLASSNAME,
          activeMainView === "settings" && BTN_ACTIVE_CLASSNAME,
        )}
        onClick={() => setActiveMainView("settings")}
      >
        <Settings /> Settings
      </Button>
      <Button
        className={cn(
          BTN_BASE_CLASSNAME,
          activeMainView === "info" && BTN_ACTIVE_CLASSNAME,
        )}
        onClick={() => setActiveMainView("info")}
      >
        <Info /> Info
      </Button>
      {wayfarerMode && (
        <Button
          className={cn(
            BTN_BASE_CLASSNAME,
            activeMainView === "tools" && BTN_ACTIVE_CLASSNAME,
          )}
          onClick={() => setActiveMainView("tools")}
        >
          <Toolbox />
          Tools
        </Button>
      )}
    </div>
  );
}
