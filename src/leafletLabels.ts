import L from "leaflet";

export const labelQuinlan = L.divIcon({
  className: "label-map label-quinlan",
  html: "<div>Quinlan Community Center</div>",
  iconAnchor: [50, 25],
});

export const labelVeterans = L.divIcon({
  className: "label-map label-veterans",
  html: "<div>Veterans Memorial</div>",
  iconAnchor: [30, 20],
});

export const labelMp = L.divIcon({
  className: "label-map label-mp",
  html: "<div>Memorial Park</div>",
  iconAnchor: [50, 7],
});
