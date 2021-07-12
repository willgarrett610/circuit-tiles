import config from "../../config";
import { GraphicsTile } from "./tile";

export default class ButtonTile extends GraphicsTile {
    label = "Button";

    onColor = config.colors.activeTileColor;
    offColor = config.colors.inactiveTileColor;

    constructor(x: number, y: number) {
        super(x, y);
    }

    postGenerate() {
        if (!this.container) return;
        this.container.interactive = true;
        this.container.on("mousedown", (e: any) => {
            this.signalActive = true;
            this.updateContainer();
        });
        const release = (e: any) => {
            this.signalActive = false;
            this.updateContainer();
        };
        this.container.on("mouseup", release);
        this.container.on("mouseupoutside", release);
    }

    drawGraphics() {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive ? this.onColor : this.offColor
        );

        this.graphics.lineStyle(3, 0x000000);
        this.graphics.drawRoundedRect(10, 10, 100, 100, 20);
        // this.graphics.drawRect(10, 10, 100, 100);

        this.graphics.endFill();

        // this.graphics.beginFill(0xffffff);
        // this.graphics.lineStyle(0);

        // if (this.signalActive) {
        //     this.graphics.drawRect(8, 72, 104, 40);
        // } else {
        //     this.graphics.drawRect(8, 8, 104, 40);
        // }
    }
}
