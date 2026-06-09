/**
 * This file is used to write JSX to be converted into an HTML string for Leaflet icons.
 */
import type { PropsWithChildren } from "react";

import { emojiMeetupspot, emojiParking } from "./leafletImgs";
import { ICON_HIGHLIGHT_COLOR } from "./leafletStyles";
import { cn } from "./lib/utils";

export function IconEmojiHighlighted({ children }: PropsWithChildren) {
  return (
    <div className="relative h-6 w-6">
      <div
        className={`pointer-events-none absolute top-1/2 left-1/2 h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[${ICON_HIGHLIGHT_COLOR}]/33`}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl leading-none text-shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function MeetupSpot({ className }: { className?: string }) {
  return (
    <div
      className={cn("text-3xl text-shadow-sm", className)}
      data-poitype="meetupspot"
    >
      {emojiMeetupspot}
    </div>
  );
}

export function ParkingWarn(
  { className, isMarker }: { className?: string; isMarker?: boolean } = {
    isMarker: true,
  },
) {
  return (
    <div
      className={cn("relative inline-block text-xl text-shadow-sm", className)}
      data-poitype={isMarker ? "parking" : undefined}
    >
      {emojiParking}
      <div className="absolute top-0 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black ring-1 ring-black">
        !
      </div>
    </div>
  );
}

export function ParkingWarnHighlighted() {
  return (
    <div className="relative h-[26px] w-[26px]">
      <div
        className={`pointer-events-none absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[${ICON_HIGHLIGHT_COLOR}]/33`}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none">
        <ParkingWarn />
      </div>
    </div>
  );
}
