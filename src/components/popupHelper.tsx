import { Separator } from "@/components/ui/separator";
import { imgPowerspot } from "@/leafletIcons";
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
  let btnInteractionRadiusClassName = "group cursor-pointer rounded-full ml-2";
  if (showInteractionRadius) {
    btnInteractionRadiusClassName +=
      " bg-blue-500 hover:bg-blue-500 text-green-400 border-green-600";
  } else {
    btnInteractionRadiusClassName +=
      " bg-blue-300 hover:bg-blue-300 text-white";
  }

  return (
    <Button
      size="icon"
      title="Toggle Interaction Radius (80m)"
      variant="outline"
      className={btnInteractionRadiusClassName}
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
  let btnNoCaPoiZoneClassName =
    "group ml-2 cursor-pointer rounded-full text-white";
  let iconBanClassName = "absolute !h-6 !w-6 group-hover:text-black";
  if (showNoPowerSpotZone) {
    btnNoCaPoiZoneClassName += " bg-gray-400 hover:bg-gray-400 border-red-700";
    iconBanClassName += " text-red-700";
  } else {
    btnNoCaPoiZoneClassName += " bg-gray-300 hover:bg-gray-300";
    iconBanClassName += " text-white";
  }

  return (
    <Button
      size="icon"
      title="Toggle No Power Spot Build Zones (22m)"
      variant="outline"
      className={btnNoCaPoiZoneClassName}
      onClick={() => onBtnNoPowerSpotZoneClick()}
      data-testid="delete-placed-marker-btn"
    >
      <img src={imgPowerspot} alt="Power Spot Icon" className="h-4" />
      <Ban className={iconBanClassName} />
    </Button>
  );
};

export const createBtnNoCaPoiZone = (
  showNoCaPoiZone: boolean | undefined,
  onBtnNoCaPoiZoneClick: () => void,
) => {
  let btnNoCaPoiZoneClassName =
    "ml-2 cursor-pointer rounded-full text-white group";
  let iconBanClassName = "absolute !h-6 !w-6 group-hover:text-black";
  if (showNoCaPoiZone) {
    btnNoCaPoiZoneClassName +=
      " bg-red-400 hover:bg-red-400 text-red-100 border-red-700";
    iconBanClassName += " text-red-700";
  } else {
    btnNoCaPoiZoneClassName += " bg-red-300 hover:bg-red-300 text-red-900";
    iconBanClassName += " text-white";
  }

  return (
    <Button
      size="icon"
      title="Toggle No CA POI Build Zones (30m)"
      variant="outline"
      className={btnNoCaPoiZoneClassName}
      onClick={() => onBtnNoCaPoiZoneClick()}
      data-testid="delete-placed-marker-btn"
    >
      <LandPlot />
      <Ban className={iconBanClassName} />
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
          <Separator className="my-4" />
          <BtnCopy
            text={`Latitude: ${position[0]}`}
            value={position[0]}
            className={`${classNameDefault} mb-2`}
          />
          <BtnCopy
            text={`Longitude: ${position[1]}`}
            value={position[1]}
            className={`${classNameDefault} mb-2`}
          />
          <BtnCopy
            text="Copy name"
            value={title}
            className={`${classNameDefault} mb-2`}
          />
          <BtnCopyCoords
            lat={position[0]}
            lng={position[1]}
            className={`${classNameDefault} mb-2 ml-2`}
          />
          {modifierBtns && Object.keys(modifierBtns).length > 0 && (
            <div className="flex">
              {modifierBtns?.hide}
              {modifierBtns?.interactionRadius}
              {modifierBtns?.noPowerSpotZone}
              {wayfarerMode && modifierBtns?.noCaPoiZone}
              {modifierBtns?.delete}
            </div>
          )}
        </>
      )}
    </>
  );
};
