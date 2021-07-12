import config from "../../config";
import { Direction, Rotation } from "../../utils/directions";
import { GraphicsTile, IOTile } from "./tile";

export default class DiodeTile extends GraphicsTile implements IOTile {
    label: string = "Diode";

    inputs: Direction[] = [Direction.DOWN];
    outputs: Direction[] = [Direction.UP];

    direction = Rotation.CLOCKWISE;

    drawGraphics(): void {
        if (!this.graphics) return;

        // this.graphics.beginFill(0x222222);

        // this.graphics.drawPolygon([40, 120, 43, 100, 77, 100, 80, 120]);

        // this.graphics.drawPolygon([40, 0, 43, 20, 77, 20, 80, 0]);

        // this.graphics.endFill();

        this.graphics.beginFill(config.colors.inactiveTileColor);

        this.graphics.drawPolygon([10, 110, 60, 15, 110, 110]);

        this.graphics.endFill();
    }
}
