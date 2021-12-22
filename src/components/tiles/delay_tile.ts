import config from "../../config";
import { Rotation } from "../../utils/directions";
import { ConnectionType, GraphicsTile } from "./tile";

/** delay tile */
export default class DelayTile extends GraphicsTile {
    type = DelayTile;
    label: string = "Delay";

    connectionTemplate = {
        up: ConnectionType.INPUT,
        down: ConnectionType.OUTPUT,
        left: ConnectionType.BLOCKED,
        right: ConnectionType.BLOCKED,
    };

    direction = Rotation.CLOCKWISE;
    rotatable = true;

    /** draw graphics */
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
        this.graphics.lineStyle(5);
        this.graphics.drawRect(40, 15, 40, 90);
        this.graphics.endFill();

        this.graphics.beginFill(0x000000);
        this.graphics.drawPolygon([50, 80, 60, 40, 70, 80]);
        this.graphics.endFill();
    }
}
