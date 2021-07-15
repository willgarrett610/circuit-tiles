import config from "../../config";
import { ConnectionType, GraphicsTile } from "./tile";

export default class WireTile extends GraphicsTile {
    label = "Wire";

    connectionTemplate = {
        up: ConnectionType.BOTH,
        down: ConnectionType.BOTH,
        left: ConnectionType.BOTH,
        right: ConnectionType.BOTH,
    };

    drawGraphics() {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeTileColor
                : config.colors.inactiveTileColor
        );
        if (Object.entries(this.connections).some(([_, value]) => value))
            this.graphics.drawRect(40, 40, 40, 40);
        else this.graphics.drawRect(30, 30, 60, 60);

        if (this.connections.up) this.graphics.drawRect(40, 0, 40, 40);
        if (this.connections.down) this.graphics.drawRect(40, 80, 40, 40);
        if (this.connections.left) this.graphics.drawRect(0, 40, 40, 40);
        if (this.connections.right) this.graphics.drawRect(80, 40, 40, 40);
        this.graphics.endFill();
    }
}
