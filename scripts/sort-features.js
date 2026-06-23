/**
 * A simple Node.js script that sorts features by ID alphabetically.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(
  __dirname,
  "../src/geojson/cup/pokestops-extra.json",
);
const OUTPUT_FILE = "output.json";

const data = JSON.parse(fs.readFileSync(INPUT_FILE, "utf8"));

// Sort features by id
if (Array.isArray(data.features)) {
  data.features.sort((a, b) => {
    const idA = a.id || "";
    const idB = b.id || "";
    return idA.localeCompare(idB);
  });
}

// Write sorted file
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));

console.log(`Sorted features written to ${OUTPUT_FILE}`);
