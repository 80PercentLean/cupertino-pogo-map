import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Set input data file path. */
const dir = "cup";
const dataInput = path.join(__dirname, `${dir}/wayfarer.json`);
const gymsExtraInput = path.join(__dirname, `${dir}/gyms-extra.json`);
const pokestopsExtraInput = path.join(__dirname, `${dir}/pokestops-extra.json`);
const powerspotsExtraInput = path.join(
  __dirname,
  `${dir}/powerspots-extra.json`,
);

const dataRaw = fs.readFileSync(dataInput, "utf8");
const dataJson = JSON.parse(dataRaw);

const downloadImage = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);
  https
    .get(url, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        cb(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close(cb);
      });
    })
    .on("error", (err) => {
      file.close();
      fs.unlink(dest, () => {});
      cb(err);
    });
};

const mergeFeaturesWithExtraData = (extraDataInput, features) => {
  try {
    // Only runs the following block if the file was successfully read
    const extraData = fs.readFileSync(extraDataInput, "utf8");
    const extraDataJson = JSON.parse(extraData);

    for (const currExtraFeature of extraDataJson.features) {
      // Merge properties of the extra feature with the existing feature, if it exists
      const i = features.findIndex((f) => f.id === currExtraFeature.id);

      if (i > -1) {
        const mergedProperties = {
          ...features[i].properties,
          ...currExtraFeature.properties,
        };
        mergedProperties.name = features[i].properties.name; // Preserve original name
        features[i].properties = mergedProperties;
      }
    }

    extraDataJson.features.forEach((f) => {
      if (
        f.properties.removed ||
        (f.properties.type === "pokestop" &&
          f.properties.name === "Community Ambassador Location")
      ) {
        // If feature is removed or is the Ambassador PokeStop, push it
        features.push(f);
      }
    });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`[Extra data]: ${extraDataInput} not found.`);
    } else {
      throw err; // Other errors should still crash
    }
  }
};

const featuresGyms = [];
const featuresPokestops = [];
const featuresPowerspots = [];

/* Convert the data into GeoJSON features. */
if (dataJson.result && Array.isArray(dataJson.result.data)) {
  const processed = new Set();

  dataJson.result.data.forEach((item) => {
    if (Array.isArray(item.pois)) {
      for (const poi of item.pois) {
        if (processed.has(poi.poiId)) {
          continue; // Skip already processed POI
        }

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

          if (
            f.properties.l14Id !== "808fb449" &&
            f.properties.l14Id !== "808fb44d" &&
            f.properties.l14Id !== "808fb44f" &&
            f.properties.l14Id !== "808fb451" &&
            f.properties.l14Id !== "808fb453"
          ) {
            // Set any POIs that are not within the specified L14 S2 cells to hidden
            f.properties.hidden = true;
          }

          if (f.properties.type === "gym") {
            featuresGyms.push(f);
          } else if (f.properties.type === "pokestop") {
            featuresPokestops.push(f);
          } else {
            featuresPowerspots.push(f);
          }

          processed.add(f.id); // Keep track of processed POI IDs to avoid duplicates
        }

        if (poi.mainImage) {
          // Create poiImages directory if it doesn't already exist
          const poiImagesDir = path.join(__dirname, "poiImages");
          if (!fs.existsSync(poiImagesDir)) {
            fs.mkdirSync(poiImagesDir);
          }

          // Download the main image for the POI if it is available
          const imageUrl = poi.mainImage;
          const imageName = `${poi.poiId}.jpg`;
          const imagePath = path.join(poiImagesDir, imageName);
          downloadImage(imageUrl, imagePath, (err) => {
            if (err) {
              console.error(
                `Failed to download image for ${poi.poiId}:`,
                err.message,
              );
            } else {
              console.log(`Downloaded image for ${poi.poiId}`);
            }
          });
        }
      }
    }
  });
}

/* Go through extra data JSON files if they are available and merge with features. */
mergeFeaturesWithExtraData(gymsExtraInput, featuresGyms);
mergeFeaturesWithExtraData(pokestopsExtraInput, featuresPokestops);
mergeFeaturesWithExtraData(powerspotsExtraInput, featuresPowerspots);

/* Sort the features by ID. */
featuresGyms.sort((a, b) => a.id.localeCompare(b.id));
featuresPokestops.sort((a, b) => a.id.localeCompare(b.id));
featuresPowerspots.sort((a, b) => a.id.localeCompare(b.id));

/* Create GeoJSON objects for each feature type. */
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

/* Create the GeoJSON files. */
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

console.log(`[Output]: ${__dirname}`);
