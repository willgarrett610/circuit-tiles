import { Direction } from "../../utils/directions";
import Tile, { TileType } from "./tile";

class Wire implements Tile {
    label?: string | undefined;
    type: TileType;
    x: number;
    y: number;
    direction: Direction;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.direction = Direction.NORMAL;
        this.type = TileType.PRIMITIVE;
    }
}

export default Wire;
