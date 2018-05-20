import {GameModes} from "./gamemodes";
export type Game = {
  id: number,
  gamemode: GameModes,
  area: { // This will specify the bounding box of the search area
    longitudeStart: number,
    latitudeStart: number,
    longitudeEnd: number,
    latitudeEnd: number
  }
}
