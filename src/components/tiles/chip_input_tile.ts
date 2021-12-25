import config from "../../config";
import CircuitLocation from "../../logic/circuit_location";
import LogicNode from "../../logic/node";
import { ConnectionType, GraphicsTile } from "./tile";

/** chip input tile */
export default class ChipInputTile extends GraphicsTile {
    static chipTile = true;

    type = ChipInputTile;
    connectionTemplate = {
        up: ConnectionType.INPUT,
        down: ConnectionType.INPUT,
        left: ConnectionType.INPUT,
        right: ConnectionType.INPUT,
    };

    label: string = "Input";

    isNode = true;

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

    /** draw graphics */
    drawGraphics(): void {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeInput
                : config.colors.inactiveInput
        );
        this.graphics.lineStyle(4, 0x000000);
        this.graphics.drawRect(6, 6, 108, 108);
        this.graphics.endFill();
    }
}
