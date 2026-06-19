import { divIcon } from "leaflet";

// Memorial/De Anza label icons
/** Label for Memorial Park. */
const labelMp = divIcon({
  className: "label-map label-mp",
  html: '<div data-testid="label-mp">Memorial Park</div>',
  iconAnchor: [55, 7],
});

/** Label for Quinlan Community Center. */
const labelQuinlan = divIcon({
  className: "label-map label-quinlan",
  html: '<div data-testid="label-quinlan">Quinlan Community Center</div>',
  iconAnchor: [45, 25],
});

/** Label for Memorial Park Tennis Courts. */
const labelMpTennis = divIcon({
  className: "label-map label-mp-tennis",
  html: '<div data-testid="label-mp-tennis">Tennis Courts</div>',
  iconAnchor: [40, 10],
});

/** Label for amphitheatre. */
const labelAmphitheatre = divIcon({
  className: "label-map label-amphitheatre",
  html: '<div data-testid="label-amphitheatre">Amphitheatre</div>',
  iconAnchor: [40, 15],
});

/** Label for Veterans Memorial. */
const labelVeterans = divIcon({
  className: "label-map label-veterans",
  html: '<div data-testid="label-veterans">Veterans Memorial</div>',
  iconAnchor: [30, 20],
});

/** Label for Senior Center. */
const labelSenior = divIcon({
  className: "label-map label-senior",
  html: '<div data-testid="label-senior">Senior Center</div>',
  iconAnchor: [25, 20],
});

/** Label for De Anza College. */
const labelDa = divIcon({
  className: "label-map label-da",
  html: '<div data-testid="label-da">De Anza College</div>',
  iconAnchor: [30, 30],
});

/** Label for Visual & Performing Arts Center. */
const labelVpac = divIcon({
  className: "label-map label-vpac",
  html: '<div data-testid="label-vpac">Visual & Performing Arts Center (VPAC)</div>',
  iconAnchor: [55, 20],
});

/** Label for Hinson Campus Center. */
const labelHinson = divIcon({
  className: "label-map label-hinson",
  html: '<div data-testid="label-hinson">Hinson Campus Center</div>',
  iconAnchor: [25, 30],
});

/** Label for A. Robert De Hart Library. */
const labelDeHart = divIcon({
  className: "label-map label-dehart",
  html: '<div data-testid="label-dehart">A. Robert De Hart Library</div>',
  iconAnchor: [30, 30],
});

/** Label for Media & Learning Center. */
const labelMlc = divIcon({
  className: "label-map label-mlc",
  html: '<div data-testid="label-mlc">Media & Learning Center (MLC)</div>',
  iconAnchor: [30, 40],
});

/** Label for Fujitsu Planetarium. */
const labelFujitsu = divIcon({
  className: "label-map label-fujitsu",
  html: '<div data-testid="label-fujitsu">Fujitsu Planetarium</div>',
  iconAnchor: [35, 20],
});

/** Label for Kisrch Center for Environmental Studies. */
const labelKirsch = divIcon({
  className: "label-map label-kirsch",
  html: '<div data-testid="label-kirsch">Kirsch Center for Environmental Studies</div>',
  iconAnchor: [65, 20],
});

// Central Park label icons
/** Label for Central Park. */
const labelCentral = divIcon({
  className: "label-map label-central",
  html: '<div data-testid="label-central">Central Park</div>',
  iconAnchor: [50, 7],
});

/** Label for Santa Clara Tennis Center. */
const labelTennisCenter = divIcon({
  className: "label-map label-tennis-center",
  html: '<div data-testid="label-tennis-center">Santa Clara Tennis Center</div>',
  iconAnchor: [45, 20],
});

/** Label for Community Recreation Center. */
const labelCrc = divIcon({
  className: "label-map label-crc",
  html: '<div data-testid="label-crc">Community Recreation Center (CRC)</div>',
  iconAnchor: [40, 30],
});

/** Label for Veterans Memorial. */
const labelMemorial = divIcon({
  className: "label-map label-memorial",
  html: '<div data-testid="label-memorial">Veterans Memorial</div>',
  iconAnchor: [30, 20],
});

/** Label for pond. */
const labelPond = divIcon({
  className: "label-map label-pond",
  html: '<div data-testid="label-pond">Pond</div>',
  iconAnchor: [20, 15],
});

/** Label for Magical Bridge Playground. */
const labelPlayground = divIcon({
  className: "label-map label-playground",
  html: '<div data-testid="label-playground">Magical Bridge Playground</div>',
  iconAnchor: [45, 20],
});

/** Label for pavilion. */
const labelPavilion = divIcon({
  className: "label-map label-pavilion",
  html: '<div data-testid="label-pavilion">Pavilion</div>',
  iconAnchor: [25, 10],
});

/** Label for library. */
const labelLibrary = divIcon({
  className: "label-map label-library",
  html: '<div data-testid="label-library">Central Park Library</div>',
  iconAnchor: [40, 20],
});

/** Label for Kiely Plaza. */
const labelKiely = divIcon({
  className: "label-map label-kiely",
  html: '<div data-testid="label-kiely">Kiely Plaza</div>',
  iconAnchor: [30, 10],
});

/** Label for Mariposa Shopping Center. */
const labelMariposa = divIcon({
  className: "label-map label-mariposa",
  html: '<div data-testid="label-mariposa">Mariposa Shopping Center</div>',
  iconAnchor: [40, 20],
});

export const labelsIconsMpDa = [
  labelMp,
  labelQuinlan,
  labelMpTennis,
  labelAmphitheatre,
  labelVeterans,
  labelSenior,
  labelDa,
  labelVpac,
  labelHinson,
  labelDeHart,
  labelMlc,
  labelFujitsu,
  labelKirsch,
];

export const labelsIconsCentral = [
  labelCentral,
  labelTennisCenter,
  labelCrc,
  labelMemorial,
  labelPond,
  labelPlayground,
  labelPavilion,
  labelLibrary,
  labelKiely,
  labelMariposa,
];
