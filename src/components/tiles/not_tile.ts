import config from "../../config";
import CircuitLocation from "../../logic/circuit_location";
import LogicNode from "../../logic/node";
import { Rotation } from "../../utils/directions";
import { ConnectionType, GraphicsTile } from "./tile";

/** not tile */
export default class NotTile extends GraphicsTile {
    type = NotTile;
    typeNumber = 1;
    label: string = "NOT Gate";

    connectionTemplate = {
        up: ConnectionType.OUTPUT,
        down: ConnectionType.INPUT,
        left: ConnectionType.BLOCKED,
        right: ConnectionType.BLOCKED,
    };

    connectionForce = {
        up: true,
        right: false,
        down: true,
        left: false,
    };

    direction = Rotation.CLOCKWISE;
    rotatable = true;
    isNode = true;

    /**
     * convert tile to node
     *
     * @param scope scope
     * @returns Logic node
     */
    toNode(scope: string[]): LogicNode {
        const logicNode = new LogicNode(
            this.label,
            this.typeNumber,
            [new CircuitLocation(scope, this.x, this.y)],
            this
        );
        logicNode.state = this.signalActive;
        return logicNode;
    }

    /**
     * draws graphics
     */
    drawGraphics(): void {
        if (!this.graphics) return;

        // this.graphics.beginFill(0x222222);

        // this.graphics.drawPolygon([40, 120, 43, 100, 77, 100, 80, 120]);

        // this.graphics.drawPolygon([40, 0, 43, 20, 77, 20, 80, 0]);

        // this.graphics.endFill();

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeTile
                : config.colors.inactiveTile
        );

        this.graphics.drawPolygon([10, 110, 60, 25, 110, 110]);

        this.graphics.drawCircle(60, 20, 15);

        this.graphics.endFill();
    }
}
