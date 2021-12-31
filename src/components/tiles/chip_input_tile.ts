import config from "../../config";
import IOTile from "./io_tile";
import { ConnectionType } from "./tile";

/** chip input tile */
export default class ChipInputTile extends IOTile {
    type = ChipInputTile;
    connectionTemplate = {
        up: ConnectionType.INPUT,
        down: ConnectionType.INPUT,
        left: ConnectionType.INPUT,
        right: ConnectionType.INPUT,
    };

    label: string = "Input";

    chipTileKey: "inputTiles" = "inputTiles";

    /** draw graphics */
    drawGraphics(): void {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeInput
                : config.colors.inactiveInput
        );
        this.graphics.lineStyle(4, 0x000000);
        this.graphics.drawRect(6, 6, 108, 108);
        this.graphics.endFill();
    }
}
