import CircuitLocation from "./circuit_location";
import LogicNode from "./node";

/**
 * node for logic graph
 */
export default class LogicEdge {
    /** all nodes that are inputs to the edge */
    inputs: LogicNode[] = [];
    /** all nodes that the edge outputs into */
    outputs: LogicNode[] = [];
    locations: CircuitLocation[] = [];
    state: boolean = false;
    operation: (inputs: boolean[]) => boolean[] = (inputs) => inputs;

    /**
     *  constructs logic edge
     *
     * @param locations all locations of the edge
     */
    constructor(locations: CircuitLocation[] = []) {
        this.locations = locations;
    }
}
