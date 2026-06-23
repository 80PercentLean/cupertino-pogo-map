import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import findImpossiblePowerspots from "./findImpossiblePowerspots.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Set directory where the input data is relative to this script file location. */
const RELATIVE_INPUT_DIR = "../src/geojson/cup";
const OUTPUT_FILE_NAME = "powerspots-impossible.json";

const readGeoJson = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf8"));
};

const featuresGyms = readGeoJson(
  path.join(__dirname, RELATIVE_INPUT_DIR, "gyms.geojson"),
).features;
const featuresPokestops = readGeoJson(
  path.join(__dirname, RELATIVE_INPUT_DIR, "pokestops.geojson"),
).features;
const featuresPowerspots = readGeoJson(
  path.join(__dirname, RELATIVE_INPUT_DIR, "powerspots.geojson"),
).features;

// Merge gym & PokeStop features as that's what findImpossiblePowerspots expects as input
const featuresGymsPokestops = [...featuresGyms, ...featuresPokestops];
const impossiblePowerspotData = findImpossiblePowerspots(
  featuresGymsPokestops,
  featuresPowerspots,
);

console.log(`Found ${impossiblePowerspotData.length} impossible power spots!`);

const outputFile = path.join(__dirname, OUTPUT_FILE_NAME);

fs.writeFileSync(
  path.join(__dirname, OUTPUT_FILE_NAME),
  JSON.stringify(impossiblePowerspotData, null, 2),
);

console.log(`[Output]: ${outputFile}`);
