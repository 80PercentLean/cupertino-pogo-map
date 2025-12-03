import type { LatLng } from "leaflet";

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
  wayfarerTools?: boolean,
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

  return popupContent;
};
