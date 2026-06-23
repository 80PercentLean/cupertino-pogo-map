/**
 * Calculates the great-circle distance between two geographic coordinates
 * using the Haversine formula.
 *
 * Coordinates must be provided as `[longitude, latitude]` in decimal degrees.
 * The returned distance is the shortest distance over the Earth's surface
 * and is expressed in meters.
 *
 * @param {[number, number]} coord1 - The first coordinate as `[longitude, latitude]`.
 * @param {[number, number]} coord2 - The second coordinate as `[longitude, latitude]`.
 * @returns {number} The distance between the two coordinates in meters.
 *
 * @example
 * const distance = calcHaversineDistance(
 *   [-122.0443, 37.3225],
 *   [-122.0450, 37.3230]
 * );
 * console.log(distance); // ~88
 */
const calcHaversineDistance = (coord1, coord2) => {
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
};

/**
 * Find impossible power spots and output them along with the POIs that block them.
 * Impossible power spots are Wayspots that would become power spots if they weren't within
 * 22m of an existing gym or PokeStop.
 * @param {Object[]} featuresGymsPokestops An array of GeoJSON features representing gyms and PokeStops.
 * @param {Object[]} featuresPowerspots An array of GeoJSON features representing power spots.
 */
const findImpossiblePowerspots = (
  featuresGymsPokestops,
  featuresPowerspots,
) => {
  const output = [];

  for (const powerspot of featuresPowerspots) {
    for (const gymPokestop of featuresGymsPokestops) {
      if (gymPokestop.properties.removed) {
        // Gym/PokeStop is removed so skip it
        continue;
      }

      const distance = calcHaversineDistance(
        powerspot.geometry.coordinates,
        gymPokestop.geometry.coordinates,
      );

      if (distance <= 22) {
        output.push({
          id: powerspot.id,
          name: powerspot.properties.name,
          distanceMeters: distance,
          blockingPoiId: gymPokestop.id,
          blockingPoiName: gymPokestop.properties.name,
        });
      }
    }
  }

  return output;
};

export default findImpossiblePowerspots;
