import { Tile } from "../components/tiles/tile";
import CircuitLocation from "./circuit_location";

/**
 * node for logic graph
 */
export default class LogicNode {
    name = "";
    inputs: Set<LogicNode> = new Set();
    outputs: Set<LogicNode> = new Set();
    originTile: Tile | undefined;
    state: boolean = false;
    /** all the locations to set the signal active value on */
    locations: CircuitLocation[];

    /**
     * constructs logic node
     *
     * @param name name of the node
     * @param locations locations of tile
     * @param originTile tile of origin
     */
    constructor(
        name: string,
        locations: CircuitLocation[] = [],
        originTile?: Tile
    ) {
        this.name = name;
        this.locations = locations;
        this.originTile = originTile;
    }

    /**
     * adds node to outputs of this node and inputs of other node
     *
     * @param node node to connect to
     */
    connectTo(node: LogicNode) {
        this.outputs.add(node);
        node.inputs.add(this);
    }

    /**
     * adds node to inputs of this node and outputs of other node
     *
     * @param node node to connect from
     */
    connectFrom(node: LogicNode) {
        this.inputs.add(node);
        node.outputs.add(this);
    }

    /**
     * removes node from inputs and outputs
     *
     * @param node node to disconnect from
     */
    disconnectTo(node: LogicNode) {
        this.outputs.delete(node);
        node.inputs.delete(this);
    }

    /**
     * removes node from outputs and inputs
     *
     * @param node node to disconnect from
     */
    disconnectFrom(node: LogicNode) {
        this.inputs.delete(node);
        node.outputs.delete(this);
    }
}
