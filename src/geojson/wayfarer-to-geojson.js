import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, "central/wayfarer.json");

const raw = fs.readFileSync(inputPath, "utf8");
const json = JSON.parse(raw);

const featuresGyms = [];
const featuresPokestops = [];
const featuresPowerspots = [];

if (json.result && Array.isArray(json.result.data)) {
  json.result.data.forEach((item) => {
    if (Array.isArray(item.pois)) {
      item.pois.forEach((poi) => {
        if (
          typeof poi.latE6 === "number" &&
          typeof poi.lngE6 === "number" &&
          typeof poi.poiId === "string"
        ) {
          const f = {
            type: "Feature",
            properties: {
              name: poi.title,
              source: "Wayfarer",
              isCommunityContributed: poi.isCommunityContributed,
              l14Id: item.metadata.s2CellId,
              "marker-color": "#00fcff",
              "marker-size": "medium",
              "marker-symbol": "circle",
            },
            geometry: {
              coordinates: [
                poi.lngE6 / 1e6, // GeoJSON: [lng, lat]
                poi.latE6 / 1e6,
              ],
              type: "Point",
            },
            id: poi.poiId,
          };

          if (Array.isArray(poi.gmo) && poi.gmo[0]) {
            const entity = poi.gmo[0].entity;
            if (entity === "POKESTOP") {
              f.properties.type = "pokestop";
            } else if (entity === "GYM") {
              f.properties.type = "gym";
            } else if (entity === "POWERSPOT") {
              f.properties.type = "powerspot";
            }
          }

          if (!f.properties.type) {
            f.properties.type = "powerspot";
            f.properties.inactive = true;
          }

          if (f.properties.type === "gym") {
            featuresGyms.push(f);
          } else if (f.properties.type === "pokestop") {
            featuresPokestops.push(f);
          } else {
            featuresPowerspots.push(f);
          }
        }
      });
    }
  });
}

featuresGyms.sort((a, b) => a.id.localeCompare(b.id));
featuresPokestops.sort((a, b) => a.id.localeCompare(b.id));
featuresPowerspots.sort((a, b) => a.id.localeCompare(b.id));

const geojsonGyms = {
  type: "FeatureCollection",
  features: featuresGyms,
};

const geojsonPokestops = {
  type: "FeatureCollection",
  features: featuresPokestops,
};

const geojsonPowerspots = {
  type: "FeatureCollection",
  features: featuresPowerspots,
};

fs.writeFileSync(
  path.join(__dirname, "gyms.geojson"),
  JSON.stringify(geojsonGyms, null, 2),
);
fs.writeFileSync(
  path.join(__dirname, "pokestops.geojson"),
  JSON.stringify(geojsonPokestops, null, 2),
);
fs.writeFileSync(
  path.join(__dirname, "powerspots.geojson"),
  JSON.stringify(geojsonPowerspots, null, 2),
);

console.log("GeoJSON written to", __dirname);
