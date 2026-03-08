import { Separator } from "@/components/ui/separator";
import { imgPowerspot } from "@/leafletIcons";
import { cn } from "@/lib/utils";
import type { LatLngTuple } from "leaflet";
import { Ban, Circle, Eye, EyeClosed, LandPlot, Radius } from "lucide-react";
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
        "group ml-2 cursor-pointer rounded-full",
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
        "group ml-2 cursor-pointer rounded-full text-white",
        showNoPowerSpotZone
          ? "border-red-700 bg-gray-400 hover:bg-gray-400"
          : "bg-gray-300 hover:bg-gray-300",
      )}
      onClick={() => onBtnNoPowerSpotZoneClick()}
      data-testid="delete-placed-marker-btn"
    >
      <img src={imgPowerspot} alt="Power Spot Icon" className="h-4" />
      <Ban
        className={cn(
          "absolute !h-6 !w-6 group-hover:text-black",
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
        "group ml-2 cursor-pointer rounded-full text-white",
        showNoCaPoiZone
          ? "border-red-700 bg-red-400 text-red-100 hover:bg-red-400"
          : "bg-red-300 text-red-900 hover:bg-red-300",
      )}
      onClick={() => onBtnNoCaPoiZoneClick()}
      data-testid="delete-placed-marker-btn"
    >
      <LandPlot />
      <Ban
        className={cn(
          "absolute !h-6 !w-6 group-hover:text-black",
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
      {subtitle && <p className="mt-0! italic">{subtitle}</p>}
      {img && (
        <div className="flex justify-center">
          <a href={img} rel="noopener noreferrer" target="_blank">
            <img src={img} alt={title ?? ""} className="h-42 object-cover" />
          </a>
        </div>
      )}
      {description}
      <Separator className="mt-2" />
      <p>
        Directions:{" "}
        <a
          href={`https://maps.google.com/maps?q=${position[0]},${position[1]}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Google Maps
        </a>{" "}
        |{" "}
        <a
          href={`https://maps.apple.com/place?coordinate=${position[0]},${position[1]}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Apple Maps
        </a>
      </p>
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
          {modifierBtns && Object.keys(modifierBtns).length > 0 && (
            <div className="mt-2 flex">
              {modifierBtns?.hide}
              {modifierBtns?.interactionRadius}
              {modifierBtns?.noPowerSpotZone}
              {wayfarerMode && modifierBtns?.noCaPoiZone}
              {modifierBtns?.delete}
            </div>
          )}
        </>
      )}
      {!wayfarerMode && modifierBtns?.delete && (
        <div className="flex-end mt-2 flex justify-end">
          {modifierBtns?.delete}
        </div>
      )}
    </>
  );
};
