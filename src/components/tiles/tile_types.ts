import LeverTile from "./lever_tile";
import { Tile } from "./tile";
import WireTile from "./wire_tile";

const tileTypes: any = [
    WireTile,
    LeverTile,
];

function getTileTypes<T extends Tile>(): (Array<{ new (x: number, y: number): T }>) {
    return tileTypes;
}

export default getTileTypes;