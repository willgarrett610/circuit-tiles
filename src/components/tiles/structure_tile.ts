import config from "../../config";
import { ConnectionType, GraphicsTile } from "./tile";

/** chip input tile */
export default class StructureTile extends GraphicsTile {
    static chipTile = true;

    type = StructureTile;
    connectionTemplate = {
        up: ConnectionType.BLOCKED,
        down: ConnectionType.BLOCKED,
        left: ConnectionType.BLOCKED,
        right: ConnectionType.BLOCKED,
    };

    label: string = "Block";
    id = "";

    rotatable = false;

    /** draw graphics */
    drawGraphics(): void {
        if (!this.graphics) return;

        this.graphics.beginFill(config.colors.structureTile);
        this.graphics.lineStyle(4, 0x000000);
        this.graphics.drawRect(6, 6, 108, 108);
        this.graphics.endFill();
    }
}
