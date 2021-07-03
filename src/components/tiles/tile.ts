import { Direction } from "../../utils/directions";
import * as PIXI from "pixi.js";

export enum TileType {
    INPUT,
    OUTPUT,
    PRIMITIVE,
}

export interface TileInterface {
    label?: string;
    type: TileType;
    x: number;
    y: number;
    direction: Direction;
    texture: PIXI.Texture;
}

export default class Tile implements TileInterface {
    label = undefined;
    type = TileType.PRIMITIVE;
    x = 0;
    y = 0;
    direction = Direction.NORMAL;
    texture = PIXI.Texture.from("assets/sprites/doge-icon.svg");

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
