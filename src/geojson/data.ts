import { IS_CENTRAL } from "@/constants";

import {
  centralDevpoisJson,
  centralGymsJson,
  centralL13CellsJson,
  centralL14CellsJson,
  centralL17CellsJson,
  centralLabelsJson,
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

const devpoisJson = IS_CENTRAL ? centralDevpoisJson : cupDevpoisJson;
const gymsJson = IS_CENTRAL ? centralGymsJson : cupGymsJson;
const l13CellsJson = IS_CENTRAL ? centralL13CellsJson : cupL13CellsJson;
const l14CellsJson = IS_CENTRAL ? centralL14CellsJson : cupL14CellsJson;
const l17CellsJson = IS_CENTRAL ? centralL17CellsJson : cupL17CellsJson;
const labelsJson = IS_CENTRAL ? centralLabelsJson : cupLabelsJson;
const meetupspotsJson = IS_CENTRAL
  ? centralMeetupspotsJson
  : cupMeetupspotsJson;
const parkingJson = IS_CENTRAL ? centralParkingJson : cupParkingJson;
const pokestopsJson = IS_CENTRAL ? centralPokestopsJson : cupPokestopsJson;
const powerspotsJson = IS_CENTRAL ? centralPowerspotsJson : cupPowerspotsJson;
const restroomsJson = IS_CENTRAL ? centralRestroomsJson : cupRestroomsJson;
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
