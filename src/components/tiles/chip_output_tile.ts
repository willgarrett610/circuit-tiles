import config from "../../config";
import { ConnectionType, GraphicsTile } from "./tile";

/** chip output tile */
export default class ChipOutputTile extends GraphicsTile {
    type = ChipOutputTile;
    connectionTemplate = {
        up: ConnectionType.OUTPUT,
        down: ConnectionType.OUTPUT,
        left: ConnectionType.OUTPUT,
        right: ConnectionType.OUTPUT,
    };

    label: string = "Output Tile";

    /** draw graphics */
    drawGraphics(): void {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeOutputColor
                : config.colors.inactiveOutputColor
        );
        this.graphics.lineStyle(4, 0x000000);
        this.graphics.drawRect(6, 6, 108, 108);
        this.graphics.endFill();
    }
}
