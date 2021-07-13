import config from "../../config";
import { Connectable, GraphicsTile } from "./tile";

export default class WireTile extends GraphicsTile implements Connectable {
    label = "Wire";

    connect = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    drawGraphics() {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeTileColor
                : config.colors.inactiveTileColor
        );
        if (Object.entries(this.connect).some(([_, value]) => value))
            this.graphics.drawRect(40, 40, 40, 40);
        else this.graphics.drawRect(35, 35, 50, 50);

        if (this.connect.up) this.graphics.drawRect(40, 0, 40, 40);
        if (this.connect.down) this.graphics.drawRect(40, 80, 40, 40);
        if (this.connect.left) this.graphics.drawRect(0, 40, 40, 40);
        if (this.connect.right) this.graphics.drawRect(80, 40, 40, 40);
        this.graphics.endFill();
    }
}
