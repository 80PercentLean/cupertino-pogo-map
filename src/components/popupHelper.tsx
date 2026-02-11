import { Separator } from "@/components/ui/separator";
import type { LatLngTuple } from "leaflet";
import { Circle, Construction, Eye, EyeClosed, Radius } from "lucide-react";
import type { ReactElement } from "react";

import BtnCopy, { classNameDefault } from "./BtnCopy";
import BtnCopyCoords from "./BtnCopyCoords";
import { Button } from "./ui/button";

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
  let btnInteractionRadiusClassName =
    "group cursor-pointer rounded-full hover:bg-blue-500 ml-2 text-white";
  if (showInteractionRadius) {
    btnInteractionRadiusClassName += " bg-blue-500";
  } else {
    btnInteractionRadiusClassName += " bg-blue-300";
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

export const createBtnNoCaPoiZone = (
  showNoCaPoiZone: boolean | undefined,
  onBtnNoCaPoiZoneClick: () => void,
) => {
  let btnNoCaPoiZoneClassName =
    "ml-2 cursor-pointer rounded-full text-white hover:bg-red-500";
  if (showNoCaPoiZone) {
    btnNoCaPoiZoneClassName += " bg-red-500";
  } else {
    btnNoCaPoiZoneClassName += " bg-red-300";
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
      <Construction />
    </Button>
  );
};

/**
 * Generates the content for a POI marker.
 * @param name Name of the POI
 * @param type Type of the POI
 * @param latlng Coordinates for the POI
 * @param desc Description of the POI in HTML
 * @param img Image of the POI
 * @returns The content of the popup as a string
 */
export const createPopupContent = (
  title: string,
  subtitle: string | undefined,
  latlng: LatLngTuple,
  desc?: string,
  img?: string,
  wayfarerMode?: boolean,
  btns?: {
    delete?: ReactElement<typeof Button>;
    hide?: ReactElement<typeof Button>;
    interactionRadius?: ReactElement<typeof Button>;
    noCaPoiZone?: ReactElement<typeof Button>;
  },
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
          href={`https://maps.google.com/maps?q=${latlng[0]},${latlng[1]}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Google Maps
        </a>{" "}
        |{" "}
        <a
          href={`https://maps.apple.com/place?coordinate=${latlng[0]},${latlng[1]}`}
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
            text={`Latitude: ${latlng[0]}`}
            value={latlng[0]}
            className={`${classNameDefault} mb-2`}
          />
          <BtnCopy
            text={`Longitude: ${latlng[1]}`}
            value={latlng[1]}
            className={`${classNameDefault} mb-2`}
          />
          <BtnCopy
            text="Copy name"
            value={title}
            className={`${classNameDefault} mb-2`}
          />
          <BtnCopyCoords
            lat={latlng[0]}
            lng={latlng[1]}
            className={`${classNameDefault} mb-2 ml-2`}
          />
          {btns && Object.keys(btns).length > 0 && (
            <div className="flex">
              {btns?.hide}
              {btns?.interactionRadius}
              {btns?.noCaPoiZone}
              {btns?.delete}
            </div>
          )}
        </>
      )}
    </>
  );
};
