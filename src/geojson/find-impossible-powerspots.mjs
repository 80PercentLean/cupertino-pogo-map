import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MAX_DISTANCE_METERS = 22;

/* Set input data file path. */
const dir = "cup";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readGeoJson(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function haversineDistanceMeters(coord1, coord2) {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;

  const R = 6371000;

  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const gyms = readGeoJson(`${dir}/gyms.geojson`).features;
const pokestops = readGeoJson(`${dir}/pokestops.geojson`).features;
const powerspots = readGeoJson(`${dir}/powerspots.geojson`).features;

const existingPois = [...gyms, ...pokestops];

const nearbyPowerspots = [];

for (const powerspot of powerspots) {
  if (powerspot.properties.removed) {
    continue;
  }

  const powerspotCoords = powerspot.geometry.coordinates;

  let foundMatch = false;

  for (const poi of existingPois) {
    if (poi.properties.removed) {
      continue;
    }

    const poiCoords = poi.geometry.coordinates;

    const distance = haversineDistanceMeters(powerspotCoords, poiCoords);

    if (distance <= MAX_DISTANCE_METERS) {
      nearbyPowerspots.push({
        id: powerspot.id,
        name: powerspot.properties.name,
        distanceMeters: Number(distance.toFixed(2)),
        nearbyPoiId: poi.id,
        nearbyPoiName: poi.properties.name,
      });

      foundMatch = true;
      break;
    }
  }

  if (foundMatch) {
    continue;
  }
}

console.log(`Found ${nearbyPowerspots.length} impossible power spots!`);

const OUTPUT_FILE_NAME = "powerspots-impossible.json";

fs.writeFileSync(
  path.join(__dirname, OUTPUT_FILE_NAME),
  JSON.stringify(nearbyPowerspots, null, 2),
);

console.log(`[Output]: ${__dirname}/${OUTPUT_FILE_NAME}`);
