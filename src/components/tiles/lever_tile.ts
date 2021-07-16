import config from "../../config";
import { ConnectionType, GraphicsTile } from "./tile";

export default class LeverTile extends GraphicsTile {
    type = LeverTile;
    label = "Lever";

    onColor = config.colors.activeTileColor;
    offColor = config.colors.inactiveTileColor;

    connectionTemplate = {
        up: ConnectionType.OUTPUT,
        down: ConnectionType.OUTPUT,
        left: ConnectionType.OUTPUT,
        right: ConnectionType.OUTPUT,
    };

    constructor(x: number, y: number) {
        super(x, y);
    }

    postGenerate() {
        if (!this.container) return;
        this.container.interactive = true;
        this.container.on("click", (e: any) => {
            this.signalActive = !this.signalActive;
            this.updateContainer();
        });
    }

    drawGraphics() {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive ? this.onColor : this.offColor
        );
        this.graphics.lineStyle(3, 0x000000);
        this.graphics.drawRect(10, 10, 100, 100);

        this.graphics.endFill();

        this.graphics.beginFill(0xffffff);
        this.graphics.lineStyle(0);

        if (this.signalActive) {
            this.graphics.drawRect(8, 72, 104, 40);
        } else {
            this.graphics.drawRect(8, 8, 104, 40);
        }
    }
}
