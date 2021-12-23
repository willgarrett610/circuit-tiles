import config from "../../config";
import CircuitLocation from "../../logic/circuit_location";
import LogicNode from "../../logic/node";
import { ConnectionType, GraphicsTile } from "./tile";

/** chip output tile */
export default class ChipOutputTile extends GraphicsTile {
    type = ChipOutputTile;
    connectionTemplate = {
        up: ConnectionType.OUTPUT,
        down: ConnectionType.OUTPUT,
        left: ConnectionType.OUTPUT,
        right: ConnectionType.OUTPUT,
    };

    label: string = "Output";

    isNode = true;

    /**
     * convert tile to node
     *
     * @returns Logic node
     */
    toNode(): LogicNode {
        const logicNode = new LogicNode(
            this.label,
            new CircuitLocation("global", this.x, this.y),
            this
        );
        logicNode.operation = (input) => input;
        logicNode.state = this.signalActive;
        return logicNode;
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
