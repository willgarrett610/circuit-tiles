import config from "../../config";
import { Direction, Rotation } from "../../utils/directions";
import { ConnectionType, GraphicsTile } from "./tile";

export default class NotTile extends GraphicsTile {
    type = NotTile;
    label: string = "NOT Gate";

    connectionTemplate = {
        up: ConnectionType.INPUT,
        down: ConnectionType.OUTPUT,
        left: ConnectionType.BLOCKED,
        right: ConnectionType.BLOCKED,
    };

    direction = Rotation.CLOCKWISE;

    drawGraphics(): void {
        if (!this.graphics) return;

        // this.graphics.beginFill(0x222222);

        // this.graphics.drawPolygon([40, 120, 43, 100, 77, 100, 80, 120]);

        // this.graphics.drawPolygon([40, 0, 43, 20, 77, 20, 80, 0]);

        // this.graphics.endFill();

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeTileColor
                : config.colors.inactiveTileColor
        );

        this.graphics.drawPolygon([10, 110, 60, 25, 110, 110]);

        this.graphics.drawCircle(60, 20, 15);

        this.graphics.endFill();
    }
}
