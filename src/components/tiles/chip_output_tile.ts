import config from "../../config";
import IOTile from "./io_tile";
import { ConnectionType } from "./tile";

/** chip output tile */
export default class ChipOutputTile extends IOTile {
    type = ChipOutputTile;
    connectionTemplate = {
        up: ConnectionType.OUTPUT,
        down: ConnectionType.OUTPUT,
        left: ConnectionType.OUTPUT,
        right: ConnectionType.OUTPUT,
    };

    label: string = "Output";

    chipTileKey: "outputTiles" = "outputTiles";

    /** draw graphics */
    drawGraphics(): void {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeOutput
                : config.colors.inactiveOutput
        );
        this.graphics.lineStyle(4, 0x000000);
        this.graphics.drawRect(6, 6, 108, 108);
        this.graphics.endFill();
    }
}
