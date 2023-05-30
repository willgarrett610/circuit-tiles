import * as PIXI from "pixi.js";
import { ConnectionType, SpriteTile } from "./tile";

/**
 * Wire Tile
 */
export default class WireTile extends SpriteTile {
    type = WireTile;
    typeNumber = 0;
    label = "Wire";

    texture: PIXI.Texture = PIXI.Texture.from("w_");

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
        this.texture = PIXI.Texture.from(
            `w_${this.connections.left ? "l" : ""}${this.connections.right ? "r" : ""}${
                this.connections.up ? "t" : ""
            }${this.connections.down ? "b" : ""}`
        );
        if (this.container?.texture) {
            this.container.texture = this.texture;
        }
        // throw new Error("Method not implemented.");
    }
}
