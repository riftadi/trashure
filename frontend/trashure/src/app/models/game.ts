import {GameModes} from "./gamemodes";
import {TrashBin} from "./trashbin";
export type Game = {
  id: number,
  gamemode: GameModes,
  area: { // This will specify the bounding box of the search area
    longitudeStart: number,
    latitudeStart: number,
    longitudeEnd: number,
    latitudeEnd: number,
    startingPointLatitude: number,
    startingPointLongitude: number
  },
  trashbins: TrashBin[] // In case of verification mode, send a bunch of trashbins to be verified
}
