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

/* Read main JSON data */
const dataRaw = fs.readFileSync(dataInput, "utf8");
const dataJson = JSON.parse(dataRaw);

/* Promise-based image downloader */
const downloadImage = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
          return;
        }
        response.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", (err) => {
        file.close();
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
};

/* Merge extra data JSON into existing features */
const mergeFeaturesWithExtraData = (extraDataInput, features) => {
  try {
    const extraData = fs.readFileSync(extraDataInput, "utf8");
    const extraDataJson = JSON.parse(extraData);

    for (const currExtraFeature of extraDataJson.features) {
      const i = features.findIndex((f) => f.id === currExtraFeature.id);
      if (i > -1) {
        const mergedProperties = {
          ...features[i].properties,
          ...currExtraFeature.properties,
        };
        mergedProperties.name = features[i].properties.name; // preserve original name
        features[i].properties = mergedProperties;
      }
    }

    extraDataJson.features.forEach((f) => {
      if (
        f.properties.removed ||
        (f.properties.type === "pokestop" &&
          f.properties.name === "Community Ambassador Location")
      ) {
        features.push(f);
      }
    });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`[Extra data]: ${extraDataInput} not found.`);
    } else {
      throw err;
    }
  }
};

/* Main async processing function */
const processData = async () => {
  const featuresGyms = [];
  const featuresPokestops = [];
  const featuresPowerspots = [];
  const imagePromises = [];
  const processed = new Set();

  if (dataJson.result) {
    const checked = `${dataJson.result.snapshot}T08:00:00Z`;

    if (Array.isArray(dataJson.result.data)) {
      dataJson.result.data.forEach((item) => {
        if (!Array.isArray(item.pois)) return;

        for (const poi of item.pois) {
          if (processed.has(poi.poiId)) continue;

          if (
            typeof poi.latE6 === "number" &&
            typeof poi.lngE6 === "number" &&
            typeof poi.poiId === "string"
          ) {
            const f = {
              id: poi.poiId,
              properties: {
                checked,
                name: poi.title,
              },
              geometry: {
                coordinates: [poi.lngE6 / 1e6, poi.latE6 / 1e6],
                type: "Point",
              },
              type: "Feature",
            };

            if (Array.isArray(poi.gmo) && poi.gmo[0]) {
              const entity = poi.gmo[0].entity;
              if (entity === "POKESTOP") f.properties.type = "pokestop";
              else if (entity === "GYM") f.properties.type = "gym";
              else if (entity === "POWERSPOT") f.properties.type = "powerspot";
            }

            if (!f.properties.type) {
              f.properties.isDisabled = true;
              f.properties.type = "powerspot";
            }

            if (f.properties.type === "gym") {
              f.properties["marker-color"] = "#ff2600";
              f.properties["marker-size"] = "large";
              f.properties["marker-symbol"] = "circle";
            } else if (f.properties.type === "pokestop") {
              f.properties["marker-color"] = "#00fcff";
              f.properties["marker-size"] = "medium";
              f.properties["marker-symbol"] = "circle";
            } else if (f.properties.type === "powerspot") {
              f.properties["marker-color"] = "#ff40ff";
              f.properties["marker-size"] = "small";
              f.properties["marker-symbol"] = "circle";
            }

            f.properties.source = "Wayfarer";
            f.properties.isCommunityContributed = poi.isCommunityContributed;
            f.properties.l14Id = item.metadata.s2CellId;

            // Hide POIs outside allowed L14 S2 cells
            const allowedL14 = [
              // Memorial/De Anza L14 cells
              "808fb449",
              "808fb44d",
              "808fb44f",
              "808fb451",
              "808fb453",
              "808fb455",
              "808fb457",
              // Central L14 cells
              "808fca65",
              "808fca67",
              "808fca69",
              "808fca6f",
            ];
            if (!allowedL14.includes(f.properties.l14Id)) {
              f.properties.isHidden = true;
            }

            // Handle image download
            if (poi.mainImage) {
              const poiImagesDir = path.join(__dirname, "poiImages");
              if (!fs.existsSync(poiImagesDir)) fs.mkdirSync(poiImagesDir);

              const imageUrl = poi.mainImage;
              const imageName = `${poi.poiId}.jpg`;
              const imagePath = path.join(poiImagesDir, imageName);

              imagePromises.push(
                downloadImage(imageUrl, imagePath)
                  .then(() => {
                    f.properties.photo = imageName;
                  })
                  .catch((err) => {
                    console.error(
                      `Failed to download image for ${poi.poiId}:`,
                      err.message,
                    );
                  }),
              );
            }

            // Assign feature to correct array
            if (f.properties.type === "gym") featuresGyms.push(f);
            else if (f.properties.type === "pokestop")
              featuresPokestops.push(f);
            else featuresPowerspots.push(f);

            processed.add(f.id);
          }
        }
      });
    }
  }

  // Wait for all images to finish downloading
  await Promise.all(imagePromises);

  // Merge extra data
  mergeFeaturesWithExtraData(gymsExtraInput, featuresGyms);
  mergeFeaturesWithExtraData(pokestopsExtraInput, featuresPokestops);
  mergeFeaturesWithExtraData(powerspotsExtraInput, featuresPowerspots);

  // Sort features by ID
  featuresGyms.sort((a, b) => a.id.localeCompare(b.id));
  featuresPokestops.sort((a, b) => a.id.localeCompare(b.id));
  featuresPowerspots.sort((a, b) => a.id.localeCompare(b.id));

  // Write GeoJSON files
  fs.writeFileSync(
    path.join(__dirname, "gyms.geojson"),
    JSON.stringify(
      { type: "FeatureCollection", features: featuresGyms },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(__dirname, "pokestops.geojson"),
    JSON.stringify(
      { type: "FeatureCollection", features: featuresPokestops },
      null,
      2,
    ),
  );
  fs.writeFileSync(
    path.join(__dirname, "powerspots.geojson"),
    JSON.stringify(
      { type: "FeatureCollection", features: featuresPowerspots },
      null,
      2,
    ),
  );

  console.log(`[Output]: ${__dirname}`);
};

/* Run the async processing */
processData().catch(console.error);
