import type { LatLng, LatLngTuple } from "leaflet";
import { Eye, EyeClosed } from "lucide-react";

import BtnCopy from "../BtnCopy";
import BtnCopyCoords from "../BtnCopyCoords";
import { Button } from "../ui/button";

/**
 * Generates the content for a POI marker.
 * @param name Name of the POI
 * @param type Type of the POI
 * @param latlng Coordinates for the POI
 * @param desc Description of the POI in HTML
 * @param img Image of the POI
 * @returns The content of the popup as a string
 */
export const genPopupContent = (
  name: string,
  type: string,
  latlng: LatLng,
  desc?: string,
  img?: string,
  wayfarerMode?: boolean,
) => {
  let popupContent = `
    <h1 class="font-bold">${name}</h1>
    <p class="italic mt-0!">${type}</p>
  `;

  if (img) {
    popupContent += `<a href="${img}" rel="noopener noreferrer" target="_blank"><img src=${img} alt="${name}"></a>`;
  }

  if (desc) {
    popupContent += desc;
  }

  popupContent += `
    <hr class="mt-2" />
    <p>
      Directions:
        <a href="https://maps.google.com/maps?q=${latlng.lat},${latlng.lng}" rel="noopener noreferrer" target="_blank">Google Maps</a> |
        <a href="https://maps.apple.com/place?coordinate=${latlng.lat},${latlng.lng}" rel="noopener noreferrer" target="_blank">Apple Maps</a>
      </ul>
    </p>
  `;

  if (wayfarerMode) {
    popupContent += `
      <hr class="mt-2" />
      <p>
        <span class="font-bold">Latitude:</span> ${latlng.lat}
        <br />
        <span class="font-bold">Longitude:</span> ${latlng.lng}
      </p>
    `;
  }

  return popupContent;
};

export const genPopupContentReact = (
  title: string,
  subtitle: string,
  latlng: LatLngTuple,
  desc?: string,
  img?: string,
  wayfarerMode?: boolean,
  onHideClick?: () => void,
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
      <p className="mt-0! italic">{subtitle}</p>
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
            {onHideClick && (
              <Button
                variant="outline"
                size="icon"
                title="Hide"
                className="group cursor-pointer rounded-full"
                onClick={() => onHideClick()}
              >
                <Eye className="group-hover:hidden" />
                <EyeClosed className="hidden group-hover:block" />
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};
