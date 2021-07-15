import config from "../../config";
import { Direction } from "../../utils/directions";
import { ConnectionType, GraphicsTile } from "./tile";

export default class ChipInputTile extends GraphicsTile {
    connectionTemplate = {
        up: ConnectionType.INPUT,
        down: ConnectionType.INPUT,
        left: ConnectionType.INPUT,
        right: ConnectionType.INPUT,
    };

    label: string = "Input Tile";

    drawGraphics(): void {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeInputColor
                : config.colors.inactiveInputColor
        );
        this.graphics.lineStyle(4, 0x000000);
        this.graphics.drawRect(6, 6, 108, 108);
        this.graphics.endFill();
    }
}
