import config from "../../config";
import CircuitLocation from "../../logic/circuit_location";
import LogicNode from "../../logic/node";
import { ConnectionType, GraphicsTile } from "./tile";

/** lever tile */
export default class LeverTile extends GraphicsTile {
    type = LeverTile;
    label = "Lever";

    onColor = config.colors.activeTile;
    offColor = config.colors.inactiveTile;

    connectionTemplate = {
        up: ConnectionType.OUTPUT,
        down: ConnectionType.OUTPUT,
        left: ConnectionType.OUTPUT,
        right: ConnectionType.OUTPUT,
    };

    isNode = true;
    rotatable = false;

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

    /**
     * constructs a new lever tile
     *
     * @param x x location
     * @param y y location
     */
    constructor(x: number, y: number) {
        super(x, y);
    }

    /** post generate */
    postGenerate() {
        if (!this.container) return;
        this.container.interactive = true;
        this.container.on("click", () => {
            this.signalActive = !this.signalActive;
            this.updateContainer();
        });
    }

    /** draws graphics */
    drawGraphics() {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive ? this.onColor : this.offColor
        );
        this.graphics.lineStyle(3, 0x000000);
        this.graphics.drawRect(10, 10, 100, 100);

        this.graphics.endFill();

        this.graphics.beginFill(0xffffff);
        this.graphics.lineStyle(0);

        if (this.signalActive) {
            this.graphics.drawRect(8, 72, 104, 40);
        } else {
            this.graphics.drawRect(8, 8, 104, 40);
        }
    }
}
