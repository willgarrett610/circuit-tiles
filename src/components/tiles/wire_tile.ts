import { Connectable, GraphicsTile } from "./tile";

export default class WireTile extends GraphicsTile implements Connectable {
    connect = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    color = 0xd9514c;

    drawGraphics() {
        if (!this.graphics) return;

        this.graphics.clear();

        // have to do this to set size to draw in the center
        this.graphics.beginFill(0, 0);
        this.graphics.drawRect(0, 0, 120, 120);
        this.graphics.endFill();

        this.graphics.beginFill(this.color);
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
