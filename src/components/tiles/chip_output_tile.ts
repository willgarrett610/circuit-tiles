import config from "../../config";
import { Direction } from "../../utils/directions";
import { GraphicsTile, IOTile } from "./tile";

export default class ChipOutputTile extends GraphicsTile implements IOTile {
    inputs: Direction[] = [];
    outputs: Direction[] = [
        Direction.UP,
        Direction.RIGHT,
        Direction.DOWN,
        Direction.LEFT,
    ];
    label: string = "Output Tile";

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
