import * as PIXI from "pixi.js";

import config from "../../config";
import CircuitLocation from "../../logic/circuit_location";
import LogicNode from "../../logic/node";
import { CMouseEvent } from "../../utils";
import { displayContextMenu } from "../../utils/context_menu";
import { ConnectionType, GraphicsTile } from "./tile";

/** chip output tile */
export default class ChipOutputTile extends GraphicsTile {
    static chipTile = true;

    type = ChipOutputTile;
    connectionTemplate = {
        up: ConnectionType.OUTPUT,
        down: ConnectionType.OUTPUT,
        left: ConnectionType.OUTPUT,
        right: ConnectionType.OUTPUT,
    };

    label: string = "Output";

    isNode = true;
    rotatable = false;

    id: string = "";

    /**
     * display context menu for io tile
     *
     * @param e Mouse event
     */
    onContext(e: CMouseEvent) {
        if (this.forGraphicOnly) return;
        displayContextMenu(e.pageX, e.pageY, "ioTile", (name) => {
            console.log(name);
            if (name === "rename") {
                // rename
            }
        });
    }

    /**
     * convert tile to node
     *
     * @returns Logic node
     */
    toNode(): LogicNode {
        const logicNode = new LogicNode(
            this.label,
            [new CircuitLocation("global", this.x, this.y)],
            this
        );
        logicNode.state = this.signalActive;
        return logicNode;
    }

    /** Generate text component */
    generateText(): void {
        if (this.container) {
            const idText = new PIXI.Text(this.id, {
                fontFamily: "Arial",
                fontSize: 20,
                fill: 0xffffff,
            });
            idText.anchor.set(0, 0);
            idText.x =
                this.container.width / (this.container.scale.x * 2) -
                idText.width / 2;
            idText.y =
                this.container.height / (this.container.scale.y * 2) -
                idText.height / 2;
            this.container.addChild(idText);
        }
    }

    /** draw graphics */
    drawGraphics(): void {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeOutput
                : config.colors.inactiveOutput
        );
        this.graphics.lineStyle(4, 0x000000);
        this.graphics.drawRect(6, 6, 108, 108);
        this.graphics.endFill();
    }
}
