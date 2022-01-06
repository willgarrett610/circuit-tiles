import config from "../../config";
import CircuitLocation from "../../logic/circuit_location";
import LogicNode from "../../logic/node";
import { Rotation } from "../../utils/directions";
import { map } from "../../utils/math";
import { ConnectionType, GraphicsTile, Tile } from "./tile";

/** delay tile */
export default class DelayTile extends GraphicsTile {
    type = DelayTile;
    typeNumber = 3;
    label: string = "Delay";

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

    signalActive = false;

    direction = Rotation.CLOCKWISE;
    rotatable = true;

    /** delay in milliseconds */
    delay = 1000;

    time = 0;

    isNode = true;

    /**
     * convert tile to node
     *
     * @param scope scope
     * @returns Logic node
     */
    toNode(scope: string): LogicNode {
        const logicNode = new LogicNode(
            this.label,
            this.typeNumber,
            [new CircuitLocation(scope, this.x, this.y)],
            this
        );
        logicNode.state = this.signalActive;
        return logicNode;
    }

    /** draw graphics */
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
        this.graphics.lineStyle(5);
        this.graphics.drawRect(40, 15, 40, 90);
        this.graphics.endFill();

        this.graphics.lineStyle(0);
        this.graphics.beginFill(
            this.signalActive
                ? config.colors.inactiveTile
                : config.colors.activeTile
        );
        this.graphics.drawRect(
            42.5,
            map(this.time / this.delay, 0, 1, 102.5, 17.5),
            35,
            map(this.time / this.delay, 0, 1, 0, 85)
        );
        this.graphics.endFill();

        this.graphics.beginFill(0x000000);
        this.graphics.drawPolygon([50, 80, 60, 40, 70, 80]);
        this.graphics.endFill();
    }

    /**
     * Create a clone of this tile
     *
     * @param tile Tile
     */
    createClone(tile: Tile) {
        this.delay = (tile as DelayTile).delay;
        this.time = (tile as DelayTile).time;
    }
}
