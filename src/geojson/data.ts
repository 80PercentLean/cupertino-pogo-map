import {
  centralDevpoisJson,
  centralGymsJson,
  centralL13CellsJson,
  centralL14CellsJson,
  centralL17CellsJson,
  centralMeetupspotsJson,
  centralParkingJson,
  centralPokestopsJson,
  centralPowerspotsJson,
  centralRestroomsJson,
} from "./central/data";
import {
  cupDevpoisJson,
  cupGymsJson,
  cupL13CellsJson,
  cupL14CellsJson,
  cupL17CellsJson,
  cupLabelsJson,
  cupMeetupspotsJson,
  cupParkingJson,
  cupPokestopsJson,
  cupPowerspotsJson,
  cupRestroomsJson,
  cupStdRaidPathJson,
} from "./cup/data";

const IS_CENTRAL = import.meta.env.VITE_IS_CENTRAL as string;

const devpoisJson = IS_CENTRAL === "true" ? centralDevpoisJson : cupDevpoisJson;
const gymsJson = IS_CENTRAL === "true" ? centralGymsJson : cupGymsJson;
const l13CellsJson =
  IS_CENTRAL === "true" ? centralL13CellsJson : cupL13CellsJson;
const l14CellsJson =
  IS_CENTRAL === "true" ? centralL14CellsJson : cupL14CellsJson;
const l17CellsJson =
  IS_CENTRAL === "true" ? centralL17CellsJson : cupL17CellsJson;
const labelsJson = cupLabelsJson;
const meetupspotsJson =
  IS_CENTRAL === "true" ? centralMeetupspotsJson : cupMeetupspotsJson;
const parkingJson = IS_CENTRAL === "true" ? centralParkingJson : cupParkingJson;
const pokestopsJson =
  IS_CENTRAL === "true" ? centralPokestopsJson : cupPokestopsJson;
const powerspotsJson =
  IS_CENTRAL === "true" ? centralPowerspotsJson : cupPowerspotsJson;
const restroomsJson =
  IS_CENTRAL === "true" ? centralRestroomsJson : cupRestroomsJson;
const stdRaidPathJson = cupStdRaidPathJson;

export {
  devpoisJson,
  gymsJson,
  l13CellsJson,
  l14CellsJson,
  l17CellsJson,
  labelsJson,
  meetupspotsJson,
  parkingJson,
  pokestopsJson,
  powerspotsJson,
  restroomsJson,
  stdRaidPathJson,
};
