import * as PIXI from "pixi.js";
import { ConnectionType, SpriteTile } from "./tile";
import { getTexture } from "../sprites/sprite_loader";

/**
 * Wire Tile
 */
export default class WireTile extends SpriteTile {
    type = WireTile;
    typeNumber = 0;
    label = "Wire";

    texture: PIXI.Texture = getTexture("w_");

    isWire = true;
    rotatable = false;

    connectionTemplate = {
        up: ConnectionType.BOTH,
        down: ConnectionType.BOTH,
        left: ConnectionType.BOTH,
        right: ConnectionType.BOTH,
    };

    /** updates container */
    updateContainer?(): void {
        this.texture = getTexture(
            `w_${this.connections.left ? "l" : ""}${this.connections.right ? "r" : ""}${
                this.connections.up ? "t" : ""
            }${this.connections.down ? "b" : ""}`
        );

        this.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        if (this.container?.texture) {
            this.container.texture = this.texture;
        }
        // throw new Error("Method not implemented.");
    }
}
