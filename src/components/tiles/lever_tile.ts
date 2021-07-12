import { GraphicsTile } from "./tile";

export default class LeverTile extends GraphicsTile {
    label = "Lever";

    onColor = 0xff0000;
    offColor = 0x222222;

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
        this.graphics.drawRect(35, 35, 50, 50);

        this.graphics.endFill();
    }
}
