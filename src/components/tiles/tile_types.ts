import LeverTile from "./lever_tile";
import { Tile } from "./tile";
import WireTile from "./wire_tile";

const tileTypes: any = [WireTile, LeverTile];

function getTileTypes(): Array<{ new (x: number, y: number): Tile }> {
    return tileTypes;
}

export default getTileTypes;
