import { Button } from "@/components/ui/button";
import { useState } from "react";

import MyLocation from "./MyLocation";
import { useStore } from "./hooks/store";

/**
 * Button that toggles My Location functionality.
 */
export default function BtnMyLocation() {
  const [isMyLocationOn, setIsMyLocationOn] = useState(false);

  const disableAnimations = useStore((s) => s.disableAnimations);

  let radiusClassName = "absolute inset-0 rounded-full";
  let markerClassName = "rounded-full";
  if (isMyLocationOn) {
    radiusClassName += " bg-[#5c84f0]";
    markerClassName += " h-4 w-4 border-2 border-white bg-[#5c84f0]";
    if (disableAnimations) {
      radiusClassName += " opacity-20";
    } else {
      radiusClassName += " animate-ping opacity-50";
    }
  } else {
    radiusClassName += " border-2 border-dotted border-gray-400";
    markerClassName += " h-3 w-3 bg-gray-400";
  }

  return (
    <Button
      size="icon"
      className="fixed right-0 bottom-0 z-1001 m-2 cursor-pointer shadow-sm"
      title="Toggle My Location"
      onClick={() => setIsMyLocationOn((s) => !s)}
    >
      <div className="relative flex h-6 w-6 items-center justify-center">
        <div className={radiusClassName} />
        <div className={markerClassName} />
        {isMyLocationOn && <MyLocation setIsMyLocationOn={setIsMyLocationOn} />}
      </div>
    </Button>
  );
}
