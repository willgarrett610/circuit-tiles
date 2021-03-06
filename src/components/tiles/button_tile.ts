import config from "../../config";
import CircuitLocation from "../../logic/circuit_location";
import { addUpdatedTile, doTick } from "../../logic/logic_manager";
import LogicNode from "../../logic/node";
import state from "../../state";
import { ConnectionType, GraphicsTile } from "./tile";

/** Button Tile */
export default class ButtonTile extends GraphicsTile {
    type = ButtonTile;
    typeNumber = 5;
    label = "Button";

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
    breakOnRotate = false;

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
     * construct button tile
     *
     * @param x
     * @param y
     */
    constructor(x: number, y: number) {
        super(x, y);
    }

    /** handle post generation */
    postGenerate() {
        if (!this.container) return;
        this.container.interactive = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.container.on("mousedown", (_: any) => {
            this.setSignalActive(true);
            this.updateContainer();
            addUpdatedTile(this);
            if (state.running) doTick();
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const release = (_: any) => {
            this.setSignalActive(false);
            this.updateContainer();
            addUpdatedTile(this);
            if (state.running) doTick();
        };
        this.container.on("mouseup", release);
        this.container.on("mouseupoutside", release);
    }

    /** draws graphics */
    drawGraphics() {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive ? this.onColor : this.offColor
        );

        this.graphics.lineStyle(3, 0x000000);
        this.graphics.drawRoundedRect(10, 10, 100, 100, 20);
        // this.graphics.drawRect(10, 10, 100, 100);

        this.graphics.endFill();

        // this.graphics.beginFill(0xffffff);
        // this.graphics.lineStyle(0);

        // if (this.signalActive) {
        //     this.graphics.drawRect(8, 72, 104, 40);
        // } else {
        //     this.graphics.drawRect(8, 8, 104, 40);
        // }
    }
}
