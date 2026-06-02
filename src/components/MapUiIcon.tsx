import { jsxParkingWarn } from "@/leafletIcons";
import {
  emojiAllBinaryRestroom,
  emojiDevpoi,
  emojiMRestroom,
  emojiMeetupspot,
  emojiParking,
  emojiWRestroom,
  imgGym,
  imgLeafletMarker,
  imgPokestop,
  imgPowerspot,
  imgShowcase,
} from "@/leafletImgs";
import {
  ICON_GYM_COLOR,
  ICON_POKESTOP_COLOR,
  ICON_POWERSPOT_COLOR,
  ICON_POWERSPOT_DISABLED_COLOR,
  ICON_POWERSPOT_DISABLED_STYLE,
} from "@/leafletStyles";
import { cn } from "@/lib/utils";
import { type CProperties } from "@/types/CFeatures";

import { useStore } from "./hooks/store";

export interface Props {
  alt?: string;
  className?: string;
  isDisabled?: boolean;
  subtype?: CProperties["subtype"];
  type?: CProperties["type"];
}

/**
 * Map icon used for the UI.
 * Note this is different than the icons used on the actual map,
 * although they are visually the same.
 */
export default function UiMapIcon({
  alt,
  className,
  isDisabled,
  subtype,
  type,
}: Props) {
  const isSimpleMarkerEnabled = useStore((s) => s.isSimpleMarkerEnabled);

  if (type === "gym") {
    if (isSimpleMarkerEnabled) {
      return (
        <div className={cn(`rounded-full bg-[${ICON_GYM_COLOR}]`, className)} />
      );
    }

    return (
      <img alt={alt ?? "Icon for Gyms"} src={imgGym} className={className} />
    );
  }

  if (type === "meetupspot") {
    return <div className={className}>{emojiMeetupspot}</div>;
  }

  if (type === "parking") {
    if (subtype === "conditionally-free") {
      return <div className={className}>{jsxParkingWarn}</div>;
    }

    return <div className={className}>{emojiParking}</div>;
  }

  if (type === "pokestop") {
    if (subtype === "showcase") {
      return (
        <img
          alt={alt ?? "Icon for Showcases"}
          src={imgShowcase}
          className={className}
        />
      );
    }

    if (isSimpleMarkerEnabled) {
      return (
        <div
          className={cn(`rounded-full bg-[${ICON_POKESTOP_COLOR}]`, className)}
        />
      );
    }

    return (
      <img
        alt={alt ?? "Icon for PokéStops"}
        src={imgPokestop}
        className={className}
      />
    );
  }

  if (type === "powerspot") {
    if (isSimpleMarkerEnabled) {
      return (
        <div
          className={cn(
            `rounded-full bg-[${isDisabled ? ICON_POWERSPOT_DISABLED_COLOR : ICON_POWERSPOT_COLOR}]`,
            className,
          )}
        />
      );
    }

    return (
      <img
        alt={alt ?? "Icon for Power Spots"}
        src={imgPowerspot}
        className={cn(className, isDisabled && ICON_POWERSPOT_DISABLED_STYLE)}
      />
    );
  }

  if (type === "restroom") {
    if (subtype === "men") {
      return <div className={className}>{emojiMRestroom}</div>;
    }

    if (subtype === "women") {
      return <div className={className}>{emojiWRestroom}</div>;
    }

    return <div className={className}>{emojiAllBinaryRestroom}</div>;
  }

  if (type === "devpoi") {
    return <div className={className}>{emojiDevpoi}</div>;
  }

  return (
    <img
      alt={alt ?? "Default Marker Icon"}
      src={imgLeafletMarker}
      className={className}
    />
  );
}
