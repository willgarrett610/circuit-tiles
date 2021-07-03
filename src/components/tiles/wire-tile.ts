import { Connectable, Tile } from "./tile";
import * as PIXI from "pixi.js";

class Wire extends Tile implements Connectable {
    connect = {
        up: false,
        down: false,
        left: false,
        right: false,
    };

    color = 0xd9514c;

    generateContainer() {
        const graphics = new PIXI.Graphics();

        // have to do this to set size to draw in the center
        graphics.beginFill(0, 0);
        graphics.drawRect(0, 0, 120, 120);
        graphics.endFill();

        graphics.beginFill(this.color);
        if (Object.entries(this.connect).some(([_, value]) => value))
            graphics.drawRect(40, 40, 40, 40);
        else graphics.drawRect(35, 35, 50, 50);

        if (this.connect.up) graphics.drawRect(40, 0, 40, 40);
        if (this.connect.down) graphics.drawRect(40, 80, 40, 40);
        if (this.connect.left) graphics.drawRect(0, 40, 40, 40);
        if (this.connect.right) graphics.drawRect(80, 40, 40, 40);
        graphics.endFill();
        return graphics;
    }
}

export default Wire;
