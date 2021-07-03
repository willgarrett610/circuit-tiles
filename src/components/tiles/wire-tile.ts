import { Direction } from "../../utils/directions";
import Tile from "./tile";
import { TileType } from "./tile";
import * as PIXI from "pixi.js";

class Wire extends Tile {
    label = undefined;
    x: number;
    y: number;
    direction = Direction.NORMAL;
    type = TileType.PRIMITIVE;
    connect = {
        up: false,
        down: false,
        left: false,
        right: false,
    };
    texture = PIXI.Texture.from("assets/sprites/doge-icon.svg");

    constructor(x: number, y: number) {
        super(x, y);
        this.x = x;
        this.y = y;
    }
}

export default Wire;
