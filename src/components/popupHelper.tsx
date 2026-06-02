import { GROUP_NAME } from "@/constants";
import { IS_MOBILE } from "@/constantsDom";
import { imgPowerspot } from "@/leafletImgs";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/util";
import type { LatLngTuple } from "leaflet";
import {
  Ban,
  Circle,
  Eye,
  EyeClosed,
  LandPlot,
  Navigation2,
  Radius,
  Share,
} from "lucide-react";
import type { ReactElement } from "react";

import BtnCopy, { classNameDefault } from "./BtnCopy";
import BtnCopyCoords from "./BtnCopyCoords";
import { Button } from "./ui/button";

export interface ModifierBtns {
  delete?: ReactElement<typeof Button>;
  hide?: ReactElement<typeof Button>;
  interactionRadius?: ReactElement<typeof Button>;
  noCaPoiZone?: ReactElement<typeof Button>;
  noPowerSpotZone?: ReactElement<typeof Button>;
}

export const createBtnHide = (onBtnHideClick: () => void) => {
  return (
    <Button
      size="icon"
      title="Hide Marker"
      variant="outline"
      className="group cursor-pointer rounded-full"
      onClick={() => onBtnHideClick()}
    >
      <Eye className="group-hover:hidden" />
      <EyeClosed className="hidden group-hover:block" />
    </Button>
  );
};

export const createBtnInteractionRadius = (
  showInteractionRadius: boolean | undefined,
  onBtnInteractionRadiusClick: () => void,
) => {
  return (
    <Button
      size="icon"
      title="Toggle Interaction Radius (80m)"
      variant="outline"
      className={cn(
        "group cursor-pointer rounded-full",
        showInteractionRadius
          ? "border-green-600 bg-blue-500 text-green-400 hover:bg-blue-500"
          : "bg-blue-300 text-white hover:bg-blue-300",
      )}
      onClick={() => onBtnInteractionRadiusClick()}
    >
      {showInteractionRadius ? <Radius /> : <Circle />}
    </Button>
  );
};

export const createBtnNoPowerSpotZone = (
  showNoPowerSpotZone: boolean | undefined,
  onBtnNoPowerSpotZoneClick: () => void,
) => {
  return (
    <Button
      size="icon"
      title="Toggle No Power Spot Build Zones (22m)"
      variant="outline"
      className={cn(
        "group cursor-pointer rounded-full text-white",
        showNoPowerSpotZone
          ? "border-red-700 bg-gray-400 hover:bg-gray-400"
          : "bg-gray-300 hover:bg-gray-300",
      )}
      onClick={() => onBtnNoPowerSpotZoneClick()}
    >
      <img src={imgPowerspot} alt="Power Spot Icon" className="h-4" />
      <Ban
        className={cn(
          "absolute h-6! w-6! group-hover:text-black",
          showNoPowerSpotZone ? "text-red-700" : "text-white",
        )}
      />
    </Button>
  );
};

export const createBtnNoCaPoiZone = (
  showNoCaPoiZone: boolean | undefined,
  onBtnNoCaPoiZoneClick: () => void,
) => {
  return (
    <Button
      size="icon"
      title="Toggle No CA POI Build Zones (30m)"
      variant="outline"
      className={cn(
        "group cursor-pointer rounded-full text-white",
        showNoCaPoiZone
          ? "border-red-700 bg-red-400 text-red-100 hover:bg-red-400"
          : "bg-red-300 text-red-900 hover:bg-red-300",
      )}
      onClick={() => onBtnNoCaPoiZoneClick()}
    >
      <LandPlot />
      <Ban
        className={cn(
          "absolute h-6! w-6! group-hover:text-black",
          showNoCaPoiZone ? "text-red-700" : "text-white",
        )}
      />
    </Button>
  );
};

/**
 * Generates the content for a marker popup.
 * @param title Title of the popup
 * @param subtitle Subtitle of the popup
 * @param position Latitude and longitude of the marker
 * @param desc Description of the popup
 * @param img Image of the popup
 * @param wayfarerMode Flag which says if wayfarer mode is enabled or not
 * @param id The ID of the popup's POI
 * @param shareUrl The URL to share, otherwise it will default to the current page URL
 * @param modifierBtns Modifier buttons to use in the popup
 * @param renderHtml Set description HTML directly
 * @returns The content of the popup as a string
 */
export const createPopupContent = (
  title: string,
  subtitle: string | undefined,
  position: LatLngTuple,
  desc?: string,
  img?: string,
  wayfarerMode?: boolean,
  id?: string | number,
  shareUrl?: string,
  modifierBtns?: ModifierBtns,
  renderHtml?: boolean,
) => {
  let description;
  if (desc && renderHtml) {
    description = <div dangerouslySetInnerHTML={{ __html: desc }} />;
  } else {
    description = <p className="whitespace-pre-line">{desc}</p>;
  }
  return (
    <>
      <h1 className="font-bold">{title}</h1>
      {subtitle && <p className="my-0! italic">{subtitle}</p>}
      {wayfarerMode && id && (
        <p className="my-0! font-mono text-xs text-gray-500">{id}</p>
      )}
      {img && (
        <div className="mt-4 flex justify-center">
          <a href={img} rel="noopener noreferrer" target="_blank">
            <img src={img} alt={title ?? ""} className="h-42 object-cover" />
          </a>
        </div>
      )}
      {description}
      {wayfarerMode && (
        <>
          <div className="flex gap-2">
            <BtnCopy
              text="Copy name"
              value={title}
              className={`${classNameDefault}`}
            />
            <BtnCopyCoords
              lat={position[0]}
              lng={position[1]}
              className={`${classNameDefault}`}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <BtnCopy
              text={`Latitude: ${position[0]}`}
              value={position[0]}
              className={`${classNameDefault}`}
            />
            <BtnCopy
              text={`Longitude: ${position[1]}`}
              value={position[1]}
              className={`${classNameDefault}`}
            />
          </div>
        </>
      )}
      <div className="mt-2 flex gap-2">
        {wayfarerMode &&
          modifierBtns &&
          Object.keys(modifierBtns).length > 0 && (
            <>
              {modifierBtns?.hide}
              {modifierBtns?.interactionRadius}
              {modifierBtns?.noPowerSpotZone}
              {wayfarerMode && modifierBtns?.noCaPoiZone}
            </>
          )}
        <div className="ml-auto flex gap-2">
          <Button
            asChild
            size="icon"
            title="Directions via Google Maps"
            className="flex cursor-pointer flex-col gap-1 rounded-sm text-white! hover:text-emerald-500!"
          >
            <a
              href={`https://maps.google.com/maps?q=${position[0]},${position[1]}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Navigation2 />
              <span className="text-[8px] uppercase">Nav</span>
            </a>
          </Button>
          <Button
            size="icon"
            title="Share"
            className="flex cursor-pointer flex-col gap-1 rounded-sm text-white! hover:text-emerald-500!"
            onClick={() => {
              const url = shareUrl ?? window.location.href;
              if (IS_MOBILE) {
                void (async () => {
                  try {
                    await navigator.share({
                      title: `${GROUP_NAME} Map`,
                      text: `Check out the ${GROUP_NAME} map for Pokémon GO!`,
                      url,
                    });
                  } catch (err) {
                    if (
                      err instanceof DOMException &&
                      err.name === "AbortError"
                    ) {
                      // User canceled the share, so no error actually occurred
                      return;
                    }

                    console.error("Web share API failed", err);
                    copyToClipboard(url).catch((err) => {
                      console.error(err);
                    });
                  }
                })();
              } else {
                copyToClipboard(url).catch((err) => {
                  console.error(err);
                });
              }
            }}
          >
            <Share />
            <span className="text-[8px] uppercase">Share</span>
          </Button>
          {modifierBtns?.delete}
        </div>
      </div>
    </>
  );
};
