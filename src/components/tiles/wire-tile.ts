import { Direction } from "../../utils/directions";
import { SpriteTile, Tile } from "./tile";
import * as PIXI from "pixi.js";

class Wire extends Tile {
    connect = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    generateContainer() {
        return new PIXI.Graphics();
    }

}

export default Wire;
