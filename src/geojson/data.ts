import { GET_IS_CENTRAL } from "@/constants";

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
  centralStdRaidPathJson,
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

const devpoisJson = GET_IS_CENTRAL() ? centralDevpoisJson : cupDevpoisJson;
const gymsJson = GET_IS_CENTRAL() ? centralGymsJson : cupGymsJson;
const l13CellsJson = GET_IS_CENTRAL() ? centralL13CellsJson : cupL13CellsJson;
const l14CellsJson = GET_IS_CENTRAL() ? centralL14CellsJson : cupL14CellsJson;
const l17CellsJson = GET_IS_CENTRAL() ? centralL17CellsJson : cupL17CellsJson;
const labelsJson = GET_IS_CENTRAL() ? centralLabelsJson : cupLabelsJson;
const meetupspotsJson = GET_IS_CENTRAL()
  ? centralMeetupspotsJson
  : cupMeetupspotsJson;
const parkingJson = GET_IS_CENTRAL() ? centralParkingJson : cupParkingJson;
const pokestopsJson = GET_IS_CENTRAL()
  ? centralPokestopsJson
  : cupPokestopsJson;
const powerspotsJson = GET_IS_CENTRAL()
  ? centralPowerspotsJson
  : cupPowerspotsJson;
const restroomsJson = GET_IS_CENTRAL()
  ? centralRestroomsJson
  : cupRestroomsJson;
const stdRaidPathJson = GET_IS_CENTRAL()
  ? centralStdRaidPathJson
  : cupStdRaidPathJson;

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
