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
import { ParkingWarn } from "@/leafletJsxComponents";
import {
  ICON_GYM_COLOR,
  ICON_POKESTOP_COLOR,
  ICON_POWERSPOT_COLOR,
  ICON_POWERSPOT_DISABLED_COLOR,
  ICON_POWERSPOT_DISABLED_STYLE,
  ICON_POWERSPOT_IMPOSSIBLE_COLOR,
  ICON_POWERSPOT_IMPOSSIBLE_STYLE,
  ICON_REMOVED_COLOR,
  ICON_REMOVED_STYLE,
} from "@/leafletStyles";
import { cn } from "@/lib/utils";
import { type CProperties } from "@/types/CFeatures";

import { useStore } from "./hooks/store";

export interface Props {
  alt?: string;
  className?: string;
  isDisabled?: CProperties["isDisabled"];
  isImpossible?: CProperties["isImpossible"];
  removed?: CProperties["removed"];
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
  isImpossible,
  removed,
  subtype,
  type,
}: Props) {
  const isSimpleMarkerEnabled = useStore((s) => s.isSimpleMarkerEnabled);

  if (type === "gym") {
    if (isSimpleMarkerEnabled) {
      return (
        <div
          className={cn(
            `rounded-full bg-[${removed ? ICON_REMOVED_COLOR : ICON_GYM_COLOR}]`,
            className,
          )}
        />
      );
    }

    let gymAltTxt;
    if (alt) {
      gymAltTxt = alt;
    } else {
      gymAltTxt = "Icon for Gyms";

      if (removed) {
        gymAltTxt += " (Removed)";
      }
    }

    return (
      <img
        alt={gymAltTxt}
        src={imgGym}
        className={cn(removed && ICON_REMOVED_STYLE, className)}
      />
    );
  }

  if (type === "meetupspot") {
    return <div className={className}>{emojiMeetupspot}</div>;
  }

  if (type === "parking") {
    if (subtype === "conditionally-free") {
      return <ParkingWarn isMarker={false} className={className} />;
    }

    return <div className={className}>{emojiParking}</div>;
  }

  if (type === "pokestop") {
    if (subtype === "showcase") {
      let showcaseAltTxt;
      if (alt) {
        showcaseAltTxt = alt;
      } else {
        showcaseAltTxt = "Icon for PokéStop Showcases";

        if (removed) {
          showcaseAltTxt += " (Removed)";
        }
      }

      return (
        <img
          alt={showcaseAltTxt}
          src={imgShowcase}
          className={cn(removed && ICON_REMOVED_STYLE, className)}
        />
      );
    }

    if (isSimpleMarkerEnabled) {
      return (
        <div
          className={cn(
            `rounded-full bg-[${removed ? ICON_REMOVED_COLOR : ICON_POKESTOP_COLOR}]`,
            className,
          )}
        />
      );
    }

    let pokestopAltTxt;
    if (alt) {
      pokestopAltTxt = alt;
    } else {
      pokestopAltTxt = "Icon for PokéStops";

      if (removed) {
        pokestopAltTxt += " (Removed)";
      }
    }

    return (
      <img
        alt={pokestopAltTxt}
        src={imgPokestop}
        className={cn(removed && ICON_REMOVED_STYLE, className)}
      />
    );
  }

  if (type === "powerspot") {
    if (isSimpleMarkerEnabled) {
      let color;
      if (removed) {
        color = ICON_REMOVED_COLOR;
      } else if (isImpossible) {
        color = ICON_POWERSPOT_IMPOSSIBLE_COLOR;
      } else if (isDisabled) {
        color = ICON_POWERSPOT_DISABLED_COLOR;
      } else {
        color = ICON_POWERSPOT_COLOR;
      }

      return <div className={cn(`rounded-full bg-[${color}]`, className)} />;
    }

    let style;
    if (removed) {
      style = ICON_REMOVED_STYLE;
    } else if (isImpossible) {
      style = ICON_POWERSPOT_IMPOSSIBLE_STYLE;
    } else if (isDisabled) {
      style = ICON_POWERSPOT_DISABLED_STYLE;
    }

    let powerspotAltTxt;
    if (alt) {
      powerspotAltTxt = alt;
    } else {
      powerspotAltTxt = "Icon for Power Spots";

      if (removed) {
        powerspotAltTxt += " (Removed)";
      } else if (isImpossible) {
        powerspotAltTxt += " (Impossible)";
      } else if (isDisabled) {
        powerspotAltTxt += " (Disabled)";
      } else {
        powerspotAltTxt += " (Enabled)";
      }
    }

    return (
      <img
        alt={powerspotAltTxt}
        src={imgPowerspot}
        className={cn(style, className)}
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
    return (
      <div
        aria-label="Icon for POIs In-Development"
        role="img"
        className={className}
      >
        {emojiDevpoi}
      </div>
    );
  }

  return (
    <img
      alt={alt ?? "Default Marker Icon"}
      src={imgLeafletMarker}
      className={className}
    />
  );
}
