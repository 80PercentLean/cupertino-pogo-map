import type { LatLngTuple } from "leaflet";
import { Circle, Eye, EyeClosed, Radius } from "lucide-react";
import type { ReactElement } from "react";

import BtnCopy from "./BtnCopy";
import BtnCopyCoords from "./BtnCopyCoords";
import { Button } from "./ui/button";

export const createBtnHide = (onHideClick: () => void) => {
  return (
    <Button
      variant="outline"
      size="icon"
      title="Hide This"
      className="group mr-2 cursor-pointer rounded-full"
      onClick={() => onHideClick()}
    >
      <Eye className="group-hover:hidden" />
      <EyeClosed className="hidden group-hover:block" />
    </Button>
  );
};

export const createBtnInteractionRadius = (
  showInteractionRadius: boolean | undefined,
  onInteractionRadiusBtnClick: () => void,
) => {
  let btnInteractionRadiusClassName =
    "group cursor-pointer rounded-full hover:bg-blue-500";
  if (showInteractionRadius) {
    btnInteractionRadiusClassName += " bg-blue-500";
  } else {
    btnInteractionRadiusClassName += " bg-blue-300";
  }

  return (
    <Button
      variant="outline"
      size="icon"
      title="Toggle 80m Interaction Radius"
      className={btnInteractionRadiusClassName}
      onClick={() => onInteractionRadiusBtnClick()}
    >
      {showInteractionRadius ? (
        <Radius className="text-white" />
      ) : (
        <Circle className="text-white" />
      )}
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
    hide?: ReactElement<typeof Button>;
    interactionRadius?: ReactElement<typeof Button>;
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
      <hr className="mt-2" />
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
          <hr className="my-4" />
          <BtnCopy
            text={`Latitude: ${latlng[0]}`}
            value={latlng[0]}
            className="mb-2"
          />
          <BtnCopy
            text={`Longitude: ${latlng[1]}`}
            value={latlng[1]}
            className="mb-2"
          />
          <BtnCopy text="Copy name" value={title} className="mr-2" />
          <BtnCopyCoords lat={latlng[0]} lng={latlng[1]} />
          <div className="mt-2">
            {btns?.hide}
            {btns?.interactionRadius}
          </div>
        </>
      )}
    </>
  );
};
