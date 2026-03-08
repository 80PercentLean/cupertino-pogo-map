/**
 * A simple Node.js script that sorts features alphabetically.
 */
const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "cup/powerspots-extra.json");
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
