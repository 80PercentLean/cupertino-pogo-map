import type { LatLng, LatLngTuple } from "leaflet";

import BtnCopyCoords from "../BtnCopyCoords";

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
  name: string,
  type: string,
  latlng: LatLngTuple,
  desc?: string,
  img?: string,
  wayfarerMode?: boolean,
) => {
  return (
    <>
      <h1 className="font-bold">{name}</h1>
      <p className="mt-0! italic">{type}</p>
      {img && (
        <a href={img} rel="noopener noreferrer" target="_blank">
          <img src={img} alt="${name}" />
        </a>
      )}
      {desc && <p className="whitespace-pre-line">{desc}</p>}
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
          <hr className="mt-2" />
          <p>
            <span className="font-bold">Latitude:</span> {latlng[0]}
            <br />
            <span className="font-bold">Longitude:</span> {latlng[1]}
          </p>
          <hr className="my-2" />
          <BtnCopyCoords lat={latlng[0]} lng={latlng[1]} />
        </>
      )}
    </>
  );
};
