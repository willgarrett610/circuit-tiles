import { Direction } from "../../utils/directions";
import { GraphicsTile, IOTile } from "./tile";

export default class NotTile extends GraphicsTile implements IOTile {
    label: string = "NOT Gate";

    inputs: Direction[] = [Direction.DOWN];
    outputs: Direction[] = [Direction.UP];

    drawGraphics(): void {
        if (!this.graphics) return;

        // this.graphics.
    }
}
